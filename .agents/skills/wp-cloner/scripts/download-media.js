#!/usr/bin/env node
/**
 * WordPress Media Downloader
 * Baixa todas as mídias listadas em media.json
 *
 * Usage:
 *   node download-media.js --media-list ./data/media.json --output ./media
 *
 * Alternativa mais rápida com wget:
 *   wget -r -np -nH --cut-dirs=2 -A "*.jpg,*.png,*.webp,*.svg" -P ./media https://site.com/wp-content/uploads/
 */

const https = require('https')
const http = require('http')
const fs = require('fs')
const path = require('path')
const { URL } = require('url')

const args = process.argv.slice(2)
const getArg = (flag) => {
  const idx = args.indexOf(flag)
  return idx !== -1 ? args[idx + 1] : null
}

const MEDIA_LIST = getArg('--media-list') || './wp-extracted/media.json'
const OUTPUT_DIR = getArg('--output') || './media'
const CONCURRENT = parseInt(getArg('--concurrent') || '3')
const DELAY_MS = parseInt(getArg('--delay') || '300')

if (!fs.existsSync(MEDIA_LIST)) {
  console.error(`❌ Arquivo de mídias não encontrado: ${MEDIA_LIST}`)
  console.error('   Execute primeiro: node extract-wp-api.js')
  process.exit(1)
}

const mediaItems = JSON.parse(fs.readFileSync(MEDIA_LIST, 'utf8'))

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

const downloadFile = (url, destPath) => new Promise((resolve, reject) => {
  if (!url) return resolve({ skipped: true, reason: 'no url' })

  // Pular se já existe
  if (fs.existsSync(destPath)) {
    return resolve({ skipped: true, reason: 'already exists' })
  }

  ensureDir(path.dirname(destPath))

  const parsed = new URL(url)
  const lib = parsed.protocol === 'https:' ? https : http

  const file = fs.createWriteStream(destPath)

  const req = lib.get(url, {
    headers: { 'User-Agent': 'WP-Cloner/1.0' }
  }, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      file.close()
      fs.unlinkSync(destPath)
      return downloadFile(res.headers.location, destPath).then(resolve).catch(reject)
    }

    if (res.statusCode !== 200) {
      file.close()
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath)
      return resolve({ skipped: true, reason: `HTTP ${res.statusCode}` })
    }

    res.pipe(file)
    file.on('finish', () => {
      file.close()
      resolve({ success: true })
    })
  })

  req.setTimeout(30000, () => {
    req.destroy()
    file.close()
    if (fs.existsSync(destPath)) fs.unlinkSync(destPath)
    resolve({ skipped: true, reason: 'timeout' })
  })

  req.on('error', (e) => {
    file.close()
    if (fs.existsSync(destPath)) fs.unlinkSync(destPath)
    resolve({ skipped: true, reason: e.message })
  })
})

const sleep = (ms) => new Promise(r => setTimeout(r, ms))

async function downloadBatch(items) {
  const results = await Promise.all(items.map(item => downloadFile(item.url, item.dest)))
  return results
}

async function main() {
  console.log(`\n📥 WordPress Media Downloader`)
  console.log(`📋 Lista: ${path.resolve(MEDIA_LIST)}`)
  console.log(`📁 Saída: ${path.resolve(OUTPUT_DIR)}`)
  console.log(`📊 Total de itens: ${mediaItems.length}\n`)

  ensureDir(OUTPUT_DIR)

  // Preparar lista de downloads
  const downloadItems = mediaItems
    .filter(m => m.url)
    .map(m => {
      // Preservar estrutura de pastas (ano/mês) como no WP
      let relativePath
      try {
        const parsed = new URL(m.url)
        // Extrair /wp-content/uploads/2025/05/imagem.jpg → 2025/05/imagem.jpg
        relativePath = parsed.pathname.replace(/.*\/wp-content\/uploads\//, '')
        if (!relativePath || relativePath === parsed.pathname) {
          relativePath = path.basename(parsed.pathname)
        }
      } catch {
        relativePath = m.filename || path.basename(m.url)
      }

      return {
        url: m.url,
        dest: path.join(OUTPUT_DIR, relativePath),
        filename: m.filename
      }
    })

  console.log(`🔄 Baixando ${downloadItems.length} arquivos (${CONCURRENT} simultâneos)...\n`)

  let downloaded = 0
  let skipped = 0
  let failed = 0

  // Processar em lotes
  for (let i = 0; i < downloadItems.length; i += CONCURRENT) {
    const batch = downloadItems.slice(i, i + CONCURRENT)
    const results = await downloadBatch(batch)

    results.forEach((result, j) => {
      const item = batch[j]
      if (result.success) {
        downloaded++
        process.stdout.write(`✅ ${path.basename(item.dest)}\n`)
      } else {
        skipped++
        if (result.reason !== 'already exists') {
          process.stdout.write(`⚠️  ${path.basename(item.dest)} (${result.reason})\n`)
        }
      }
    })

    // Progress
    const total = downloadItems.length
    const done = Math.min(i + CONCURRENT, total)
    const pct = Math.round((done / total) * 100)
    process.stdout.write(`\n[${pct}%] ${done}/${total} processados\n\n`)

    // Delay entre lotes para não sobrecarregar
    if (i + CONCURRENT < downloadItems.length) {
      await sleep(DELAY_MS)
    }
  }

  console.log(`\n${'═'.repeat(50)}`)
  console.log(`✅ DOWNLOAD CONCLUÍDO!`)
  console.log(`${'═'.repeat(50)}`)
  console.log(`   ✅ Baixados:  ${downloaded}`)
  console.log(`   ⚠️  Pulados:   ${skipped}`)
  console.log(`   ❌ Falhos:    ${failed}`)
  console.log(`\n📁 Mídias em: ${path.resolve(OUTPUT_DIR)}`)
  console.log(`\n🧹 Próximo passo: limpar HTML Elementor`)
  console.log(`   node clean-content.js --input ./data --output ./content`)
}

main().catch(err => {
  console.error(`\n❌ Erro: ${err.message}`)
  process.exit(1)
})
