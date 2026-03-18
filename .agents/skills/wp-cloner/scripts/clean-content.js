#!/usr/bin/env node
/**
 * WordPress/Elementor Content Cleaner
 * Remove markup do Elementor/WordPress e extrai conteúdo estruturado limpo
 *
 * Usage:
 *   node clean-content.js --input ./data --output ./content
 *
 * Requer: npm install jsdom
 */

const fs = require('fs')
const path = require('path')

const args = process.argv.slice(2)
if (args.includes('--help')) {
  console.log(`
WordPress Content Cleaner

Usage:
  node clean-content.js --input ./data --output ./content

Requires: npm install jsdom

Options:
  --input    Diretório com dados extraídos (padrão: ./wp-extracted)
  --output   Diretório de saída limpa (padrão: ./content)
  `)
  process.exit(0)
}

const getArg = (flag) => {
  const idx = args.indexOf(flag)
  return idx !== -1 ? args[idx + 1] : null
}

const INPUT_DIR = getArg('--input') || './wp-extracted'
const OUTPUT_DIR = getArg('--output') || './content'

// Verificar jsdom
let JSDOM
try {
  JSDOM = require('jsdom').JSDOM
} catch (e) {
  console.error('❌ jsdom não encontrado. Instale: npm install jsdom')
  process.exit(1)
}

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

/**
 * Limpa e estrutura o HTML do WordPress/Elementor
 * Extrai todos os elementos de conteúdo de forma hierárquica
 */
function cleanHTML(html, pageSlug = '') {
  if (!html || html.trim() === '') {
    return {
      headings: [], paragraphs: [], images: [],
      buttons: [], listItems: [], sections: [],
      plainText: '', hasElementor: false
    }
  }

  const dom = new JSDOM(html)
  const doc = dom.window.document
  const hasElementor = html.includes('elementor')

  // ─── Headings ─────────────────────────────────────────────────────────────
  const headings = [...doc.querySelectorAll('h1,h2,h3,h4,h5,h6')]
    .map(h => ({
      level: parseInt(h.tagName[1]),
      text: h.textContent.trim()
    }))
    .filter(h => h.text && h.text.length > 0)

  // ─── Parágrafos ────────────────────────────────────────────────────────────
  const paragraphs = [...doc.querySelectorAll('p')]
    .map(p => p.textContent.trim())
    .filter(t => t.length > 0)

  // ─── Imagens ───────────────────────────────────────────────────────────────
  const images = [...doc.querySelectorAll('img')]
    .map(img => ({
      src: img.getAttribute('src') || img.src || '',
      alt: img.getAttribute('alt') || '',
      width: img.getAttribute('width') || null,
      height: img.getAttribute('height') || null,
      srcset: img.getAttribute('srcset') || null,
      // Tentar pegar URL original (sem crop)
      originalSrc: (img.getAttribute('src') || '')
        .replace(/-\d+x\d+(\.\w+)$/, '$1') // remove dimensões do nome
    }))
    .filter(img => img.src && !img.src.startsWith('data:') && img.src.length > 0)

  // ─── Botões / CTAs ─────────────────────────────────────────────────────────
  const buttons = [
    ...doc.querySelectorAll('a.elementor-button-link'),
    ...doc.querySelectorAll('.elementor-button'),
    ...doc.querySelectorAll('a[class*="btn"]'),
    ...doc.querySelectorAll('a[class*="button"]'),
    ...doc.querySelectorAll('.wp-block-button a')
  ]
    .map(a => ({
      text: a.textContent.trim(),
      href: a.getAttribute('href') || '',
      target: a.getAttribute('target') || '_self'
    }))
    .filter(b => b.text && b.text.length > 0)
    // Remover duplicatas
    .filter((b, i, arr) => arr.findIndex(x => x.text === b.text && x.href === b.href) === i)

  // ─── Listas ────────────────────────────────────────────────────────────────
  const listItems = [...doc.querySelectorAll('li')]
    .map(li => li.textContent.trim())
    .filter(t => t.length > 0)

  // ─── Estrutura de seções (Elementor) ───────────────────────────────────────
  // Mapear a estrutura visual em seções lógicas
  const sections = []

  // Tentar extrair seções do Elementor
  const sectionSelectors = [
    '[data-element_type="section"]',
    '.elementor-section',
    '.elementor-top-level-column',
    '.wp-block-group'
  ]

  let sectionElements = []
  for (const selector of sectionSelectors) {
    sectionElements = [...doc.querySelectorAll(selector)]
    if (sectionElements.length > 0) break
  }

  // Se não encontrou seções do Elementor, usar o body todo como uma seção
  if (sectionElements.length === 0) {
    sectionElements = [doc.body].filter(Boolean)
  }

  sectionElements.forEach((section, i) => {
    const sHeadings = [...section.querySelectorAll('h1,h2,h3,h4')]
      .map(h => ({ level: parseInt(h.tagName[1]), text: h.textContent.trim() }))
      .filter(h => h.text)

    const sTexts = [...section.querySelectorAll('p')]
      .map(p => p.textContent.trim())
      .filter(t => t.length > 2)

    const sImages = [...section.querySelectorAll('img')]
      .map(img => ({
        src: img.getAttribute('src') || '',
        alt: img.getAttribute('alt') || ''
      }))
      .filter(img => img.src && !img.src.startsWith('data:'))

    const sButtons = [...section.querySelectorAll('a[href]')]
      .filter(a => a.classList.toString().match(/button|btn/i) || a.closest('[class*="button"]'))
      .map(a => ({ text: a.textContent.trim(), href: a.getAttribute('href') }))
      .filter(b => b.text)

    if (sHeadings.length > 0 || sTexts.length > 0 || sImages.length > 0) {
      sections.push({
        index: i,
        heading: sHeadings[0]?.text || null,
        subheadings: sHeadings.slice(1).map(h => h.text),
        paragraphs: sTexts,
        images: sImages,
        buttons: sButtons,
        hasBackground: section.getAttribute('data-settings')?.includes('background') || false
      })
    }
  })

  // ─── Texto puro ────────────────────────────────────────────────────────────
  const plainText = (doc.body?.textContent || '')
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 10000) // limitar para arquivo não ficar enorme

  // ─── Links internos ────────────────────────────────────────────────────────
  const internalLinks = [...doc.querySelectorAll('a[href]')]
    .map(a => ({
      text: a.textContent.trim(),
      href: a.getAttribute('href')
    }))
    .filter(l => l.href && !l.href.startsWith('#') && l.text)
    .filter((l, i, arr) => arr.findIndex(x => x.href === l.href) === i)

  return {
    hasElementor,
    headings,
    paragraphs,
    images,
    buttons,
    listItems,
    sections,
    internalLinks,
    plainText,
    stats: {
      headingCount: headings.length,
      paragraphCount: paragraphs.length,
      imageCount: images.length,
      buttonCount: buttons.length,
      sectionCount: sections.length,
      wordCount: plainText.split(/\s+/).length
    }
  }
}

function processDirectory(type) {
  const inputDir = path.join(INPUT_DIR, type)
  const outputDir = path.join(OUTPUT_DIR, type)

  if (!fs.existsSync(inputDir)) {
    console.log(`  ⚠️  Diretório ${type} não encontrado, pulando`)
    return 0
  }

  ensureDir(outputDir)

  const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.json'))
  let count = 0

  files.forEach(file => {
    try {
      const data = JSON.parse(fs.readFileSync(path.join(inputDir, file), 'utf8'))
      const cleaned = cleanHTML(data.content || '', data.slug)

      const output = {
        // Metadados
        id: data.id,
        slug: data.slug,
        title: data.title,
        link: data.link,
        date: data.date,
        modified: data.modified,
        seo: data.seo || null,
        featured_image_url: data.featured_image_url || null,

        // Conteúdo limpo e estruturado
        ...cleaned,

        // HTML original preservado (para referência)
        raw_html: data.content || ''
      }

      fs.writeFileSync(
        path.join(outputDir, file),
        JSON.stringify(output, null, 2),
        'utf8'
      )
      count++
      process.stdout.write('.')
    } catch (e) {
      console.log(`\n  ⚠️  Erro em ${file}: ${e.message}`)
    }
  })

  console.log('')
  return count
}

async function main() {
  console.log(`\n🧹 WordPress Content Cleaner`)
  console.log(`📂 Input:  ${path.resolve(INPUT_DIR)}`)
  console.log(`📁 Output: ${path.resolve(OUTPUT_DIR)}\n`)

  if (!fs.existsSync(INPUT_DIR)) {
    console.error(`❌ Diretório de input não encontrado: ${INPUT_DIR}`)
    console.error('   Execute primeiro: node extract-wp-api.js')
    process.exit(1)
  }

  ensureDir(OUTPUT_DIR)

  // Copiar site-info.json
  const siteInfoSrc = path.join(INPUT_DIR, 'site-info.json')
  if (fs.existsSync(siteInfoSrc)) {
    fs.copyFileSync(siteInfoSrc, path.join(OUTPUT_DIR, 'site-info.json'))
  }

  // Processar páginas
  process.stdout.write('📄 Limpando páginas ')
  const pageCount = processDirectory('pages')
  console.log(`✅ ${pageCount} páginas processadas`)

  // Processar posts
  process.stdout.write('📝 Limpando posts ')
  const postCount = processDirectory('posts')
  console.log(`✅ ${postCount} posts processados`)

  // Gerar índice de conteúdo
  const contentIndex = {
    generated_at: new Date().toISOString(),
    pages: [],
    posts: []
  }

  const pagesOutputDir = path.join(OUTPUT_DIR, 'pages')
  if (fs.existsSync(pagesOutputDir)) {
    fs.readdirSync(pagesOutputDir).forEach(file => {
      if (!file.endsWith('.json')) return
      const data = JSON.parse(fs.readFileSync(path.join(pagesOutputDir, file), 'utf8'))
      contentIndex.pages.push({
        slug: data.slug,
        title: data.title,
        link: data.link,
        wordCount: data.stats?.wordCount || 0,
        sectionCount: data.stats?.sectionCount || 0,
        imageCount: data.stats?.imageCount || 0,
        hasElementor: data.hasElementor
      })
    })
  }

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'content-index.json'),
    JSON.stringify(contentIndex, null, 2),
    'utf8'
  )

  console.log(`\n✅ LIMPEZA CONCLUÍDA!`)
  console.log(`📁 Conteúdo limpo em: ${path.resolve(OUTPUT_DIR)}`)
  console.log(`\n🏗️  Próximo passo: gerar scaffold Next.js`)
  console.log(`   node generate-nextjs.js --content ${OUTPUT_DIR} --data ${INPUT_DIR} --output ./next-scaffold`)
}

main().catch(err => {
  console.error(`\n❌ Erro: ${err.message}`)
  process.exit(1)
})
