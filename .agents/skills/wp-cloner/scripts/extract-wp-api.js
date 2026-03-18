#!/usr/bin/env node
/**
 * WordPress REST API Extractor
 * Extrai todo o conteúdo de um site WordPress via REST API nativa
 *
 * Usage:
 *   node extract-wp-api.js --url https://aideal.com.br --output ./data
 *
 * Options:
 *   --url      URL do site WordPress (obrigatório)
 *   --output   Diretório de saída (padrão: ./wp-extracted)
 *   --help     Mostrar ajuda
 */

const https = require('https')
const http = require('http')
const fs = require('fs')
const path = require('path')
const { URL } = require('url')

const args = process.argv.slice(2)
if (args.includes('--help')) {
  console.log(`
WordPress REST API Extractor

Usage:
  node extract-wp-api.js --url https://site.com --output ./data

Options:
  --url      URL do site WordPress (obrigatório)
  --output   Diretório de saída (padrão: ./wp-extracted)
  --help     Mostrar ajuda
  `)
  process.exit(0)
}

const getArg = (flag) => {
  const idx = args.indexOf(flag)
  return idx !== -1 ? args[idx + 1] : null
}

const SITE_URL = (getArg('--url') || '').replace(/\/$/, '')
const OUTPUT_DIR = getArg('--output') || './wp-extracted'

if (!SITE_URL) {
  console.error('❌ Erro: --url é obrigatório')
  console.error('Exemplo: node extract-wp-api.js --url https://aideal.com.br --output ./data')
  process.exit(1)
}

// HTTP fetch simples (sem dependências externas)
const fetchURL = (url, timeoutMs = 30000) => new Promise((resolve, reject) => {
  const parsed = new URL(url)
  const lib = parsed.protocol === 'https:' ? https : http
  const req = lib.get(url, {
    headers: {
      'User-Agent': 'WP-Cloner/1.0 (Migration Tool)',
      'Accept': 'application/json'
    }
  }, (res) => {
    // Seguir redirecionamentos
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      return fetchURL(res.headers.location, timeoutMs).then(resolve).catch(reject)
    }

    let data = ''
    res.on('data', chunk => data += chunk)
    res.on('end', () => {
      try {
        resolve({
          data: JSON.parse(data),
          headers: res.headers,
          status: res.statusCode
        })
      } catch (e) {
        resolve({ data: null, raw: data, headers: res.headers, status: res.statusCode })
      }
    })
  })
  req.on('error', reject)
  req.setTimeout(timeoutMs, () => {
    req.destroy()
    reject(new Error(`Timeout ao acessar: ${url}`))
  })
})

// Buscar todos os itens de um endpoint (com paginação automática)
const fetchAll = async (endpoint, extraParams = '') => {
  const items = []
  let page = 1

  while (true) {
    const url = `${SITE_URL}/wp-json/wp/v2/${endpoint}?per_page=100&page=${page}${extraParams}`
    process.stdout.write(`  Buscando ${endpoint} (página ${page})... `)

    try {
      const { data, headers, status } = await fetchURL(url)

      if (status === 400 || status === 404) {
        console.log(`fim`)
        break
      }

      if (!data || !Array.isArray(data) || data.length === 0) {
        console.log(`fim`)
        break
      }

      console.log(`${data.length} itens`)
      items.push(...data)

      const totalPages = parseInt(headers['x-wp-totalpages'] || '1')
      if (page >= totalPages) break
      page++

      // Delay entre requests para não sobrecarregar o servidor
      await new Promise(r => setTimeout(r, 500))
    } catch (e) {
      console.log(`erro: ${e.message}`)
      break
    }
  }

  return items
}

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

const saveJSON = (filepath, data) => {
  ensureDir(path.dirname(filepath))
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8')
}

async function main() {
  console.log(`\n🔍 WordPress REST API Extractor`)
  console.log(`📌 Site: ${SITE_URL}`)
  console.log(`📁 Saída: ${OUTPUT_DIR}`)
  console.log(`⏰ Iniciado: ${new Date().toLocaleString('pt-BR')}\n`)

  ensureDir(OUTPUT_DIR)
  ensureDir(path.join(OUTPUT_DIR, 'pages'))
  ensureDir(path.join(OUTPUT_DIR, 'posts'))

  // ─── Testar acesso à API ───────────────────────────────────────────────────
  console.log('🔗 Testando acesso à REST API...')
  let apiInfo = null
  try {
    const res = await fetchURL(`${SITE_URL}/wp-json/`)
    apiInfo = res.data
    if (!apiInfo || !apiInfo.name) throw new Error('Resposta inválida')
    console.log(`✅ API acessível! Site: "${apiInfo.name}"`)
  } catch (e) {
    // Tentar rota alternativa
    try {
      const res = await fetchURL(`${SITE_URL}/?rest_route=/`)
      apiInfo = res.data
      console.log(`✅ API acessível via rota alternativa`)
    } catch (e2) {
      console.error(`❌ REST API não acessível: ${e.message}`)
      console.error('   Tente desativar plugins de segurança/cache no admin do WordPress')
      process.exit(1)
    }
  }

  // ─── Informações do site ───────────────────────────────────────────────────
  const siteInfo = {
    name: apiInfo.name || '',
    description: apiInfo.description || '',
    url: apiInfo.url || SITE_URL,
    gmt_offset: apiInfo.gmt_offset,
    timezone_string: apiInfo.timezone_string,
    namespaces: apiInfo.namespaces || [],
    extracted_at: new Date().toISOString(),
    extractor_version: '1.0.0'
  }
  saveJSON(path.join(OUTPUT_DIR, 'site-info.json'), siteInfo)
  console.log(`✅ Info do site salva\n`)

  // ─── Páginas ───────────────────────────────────────────────────────────────
  console.log('📄 Extraindo páginas...')
  const pages = await fetchAll('pages', '&_embed=true')
  let pageCount = 0

  pages.forEach(page => {
    const filename = `${page.slug || page.id}.json`
    saveJSON(path.join(OUTPUT_DIR, 'pages', filename), {
      id: page.id,
      slug: page.slug,
      title: page.title?.rendered || '',
      content: page.content?.rendered || '',
      excerpt: page.excerpt?.rendered || '',
      status: page.status,
      link: page.link,
      date: page.date,
      modified: page.modified,
      parent: page.parent,
      menu_order: page.menu_order,
      featured_media: page.featured_media,
      featured_image_url: page._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
      seo: {
        yoast_title: page.yoast_head_json?.title || null,
        yoast_description: page.yoast_head_json?.description || null,
        og_image: page.yoast_head_json?.og_image?.[0]?.url || null
      },
      template: page.template || ''
    })
    pageCount++
  })

  console.log(`✅ ${pageCount} páginas extraídas\n`)

  // ─── Posts ─────────────────────────────────────────────────────────────────
  console.log('📝 Extraindo posts...')
  const posts = await fetchAll('posts', '&_embed=true')
  let postCount = 0

  posts.forEach(post => {
    const filename = `${post.slug || post.id}.json`
    saveJSON(path.join(OUTPUT_DIR, 'posts', filename), {
      id: post.id,
      slug: post.slug,
      title: post.title?.rendered || '',
      content: post.content?.rendered || '',
      excerpt: post.excerpt?.rendered || '',
      status: post.status,
      link: post.link,
      date: post.date,
      modified: post.modified,
      categories: post.categories || [],
      tags: post.tags || [],
      featured_media: post.featured_media,
      featured_image_url: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
      author: post._embedded?.author?.[0]?.name || null
    })
    postCount++
  })

  console.log(`✅ ${postCount} posts extraídos\n`)

  // ─── Mídia ─────────────────────────────────────────────────────────────────
  console.log('🖼️  Extraindo lista de mídia...')
  const mediaItems = await fetchAll('media')
  const mediaList = mediaItems.map(m => ({
    id: m.id,
    filename: path.basename(m.source_url || ''),
    url: m.source_url,
    alt: m.alt_text || '',
    caption: m.caption?.rendered || '',
    title: m.title?.rendered || '',
    mime_type: m.mime_type || '',
    date: m.date,
    width: m.media_details?.width || null,
    height: m.media_details?.height || null,
    file_size: m.media_details?.filesize || null,
    sizes: m.media_details?.sizes
      ? Object.entries(m.media_details.sizes).reduce((acc, [key, val]) => {
          acc[key] = { url: val.source_url, width: val.width, height: val.height }
          return acc
        }, {})
      : {}
  }))

  saveJSON(path.join(OUTPUT_DIR, 'media.json'), mediaList)
  console.log(`✅ ${mediaList.length} itens de mídia listados\n`)

  // ─── Categorias e Tags ─────────────────────────────────────────────────────
  console.log('🏷️  Extraindo categorias e tags...')
  const categories = await fetchAll('categories')
  saveJSON(path.join(OUTPUT_DIR, 'categories.json'), categories.map(c => ({
    id: c.id, name: c.name, slug: c.slug, description: c.description, count: c.count
  })))

  const tags = await fetchAll('tags')
  saveJSON(path.join(OUTPUT_DIR, 'tags.json'), tags.map(t => ({
    id: t.id, name: t.name, slug: t.slug, count: t.count
  })))
  console.log(`✅ ${categories.length} categorias, ${tags.length} tags\n`)

  // ─── Menus ─────────────────────────────────────────────────────────────────
  console.log('🔗 Tentando extrair menus...')
  let menus = []
  try {
    // WP 5.9+ tem menus na API v2
    const { data: menuData } = await fetchURL(`${SITE_URL}/wp-json/wp/v2/menus`)
    if (menuData && Array.isArray(menuData)) {
      menus = menuData
      console.log(`✅ ${menus.length} menus extraídos`)
    } else {
      // Tentar endpoint alternativo (plugin WP REST API Menus)
      const { data: altMenus } = await fetchURL(`${SITE_URL}/wp-json/menus/v1/menus`)
      if (altMenus && Array.isArray(altMenus)) {
        menus = altMenus
        console.log(`✅ ${menus.length} menus via plugin`)
      }
    }
  } catch (e) {
    console.log(`⚠️  Menus não acessíveis via API (normal em WP < 5.9)`)
    console.log(`   Extraia manualmente inspecionando o HTML do header`)
  }
  saveJSON(path.join(OUTPUT_DIR, 'menus.json'), menus)

  // ─── Resumo da extração ────────────────────────────────────────────────────
  const summary = {
    site: siteInfo.name,
    url: SITE_URL,
    extracted_at: new Date().toISOString(),
    totals: {
      pages: pageCount,
      posts: postCount,
      media: mediaList.length,
      categories: categories.length,
      tags: tags.length,
      menus: menus.length
    },
    page_list: pages.map(p => ({
      id: p.id,
      slug: p.slug,
      title: p.title?.rendered || '',
      link: p.link,
      parent: p.parent,
      menu_order: p.menu_order
    })).sort((a, b) => a.menu_order - b.menu_order),
    media_urls: mediaList.map(m => m.url).filter(Boolean)
  }

  saveJSON(path.join(OUTPUT_DIR, 'extraction-summary.json'), summary)

  // ─── Relatório final ───────────────────────────────────────────────────────
  console.log(`\n${'═'.repeat(50)}`)
  console.log(`✅ EXTRAÇÃO CONCLUÍDA!`)
  console.log(`${'═'.repeat(50)}`)
  console.log(`📊 Resultado:`)
  console.log(`   Páginas:    ${pageCount}`)
  console.log(`   Posts:      ${postCount}`)
  console.log(`   Mídias:     ${mediaList.length} itens listados`)
  console.log(`   Categorias: ${categories.length}`)
  console.log(`   Tags:       ${tags.length}`)
  console.log(`\n📁 Dados salvos em: ${path.resolve(OUTPUT_DIR)}`)
  console.log(`\n⬇️  Próximo passo: baixar mídias`)
  console.log(`   wget -r -np -nH --cut-dirs=2 -A "*.jpg,*.png,*.webp,*.svg" -P ./media ${SITE_URL}/wp-content/uploads/`)
  console.log(`\n🧹 Depois: limpar HTML do Elementor`)
  console.log(`   node clean-content.js --input ${OUTPUT_DIR} --output ./content`)
}

main().catch(err => {
  console.error(`\n❌ Erro fatal: ${err.message}`)
  if (process.env.DEBUG) console.error(err.stack)
  process.exit(1)
})
