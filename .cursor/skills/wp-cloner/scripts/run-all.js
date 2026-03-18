#!/usr/bin/env node
/**
 * WP Cloner — Runner completo
 * Executa todas as etapas em sequência:
 *   1. Extrai dados via REST API
 *   2. Baixa mídias
 *   3. Limpa HTML do Elementor
 *   4. Gera scaffold Next.js
 *
 * Usage:
 *   node run-all.js --url https://aideal.com.br --project aideal --output ./cloned
 */

const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

const args = process.argv.slice(2)
const getArg = (flag) => {
  const idx = args.indexOf(flag)
  return idx !== -1 ? args[idx + 1] : null
}

const SITE_URL = (getArg('--url') || '').replace(/\/$/, '')
const PROJECT = getArg('--project') || 'cloned-site'
const BASE_OUTPUT = getArg('--output') || `./${PROJECT}`
const SKIP_MEDIA = args.includes('--skip-media')
const SCRIPTS_DIR = path.dirname(__filename)

if (!SITE_URL) {
  console.log(`
WP Cloner — Execução completa

Usage:
  node run-all.js --url https://site.com --project nome-do-projeto [--output ./pasta] [--skip-media]

Exemplo:
  node run-all.js --url https://aideal.com.br --project aideal
  `)
  process.exit(0)
}

const DATA_DIR = path.join(BASE_OUTPUT, 'data')
const MEDIA_DIR = path.join(BASE_OUTPUT, 'media')
const CONTENT_DIR = path.join(BASE_OUTPUT, 'content')
const NEXTJS_DIR = path.join(BASE_OUTPUT, 'next-scaffold')

const run = (label, cmd) => {
  console.log(`\n${'─'.repeat(60)}`)
  console.log(`🔄 ${label}`)
  console.log(`${'─'.repeat(60)}`)
  console.log(`$ ${cmd}\n`)
  try {
    execSync(cmd, { stdio: 'inherit', cwd: BASE_OUTPUT })
  } catch (e) {
    console.error(`\n❌ Erro na etapa: ${label}`)
    throw e
  }
}

async function main() {
  console.log(`\n${'═'.repeat(60)}`)
  console.log(`  🕷️  WP CLONER — Clonagem Completa`)
  console.log(`${'═'.repeat(60)}`)
  console.log(`  Site:    ${SITE_URL}`)
  console.log(`  Projeto: ${PROJECT}`)
  console.log(`  Saída:   ${path.resolve(BASE_OUTPUT)}`)
  console.log(`${'═'.repeat(60)}\n`)

  // Criar diretório base
  if (!fs.existsSync(BASE_OUTPUT)) {
    fs.mkdirSync(BASE_OUTPUT, { recursive: true })
  }

  // ── Etapa 1: Extração via API ──────────────────────────────────────────────
  run(
    'ETAPA 1/4 — Extraindo dados do WordPress',
    `node "${path.join(SCRIPTS_DIR, 'extract-wp-api.js')}" --url ${SITE_URL} --output "${DATA_DIR}"`
  )

  // ── Etapa 2: Download de mídias ───────────────────────────────────────────
  if (!SKIP_MEDIA) {
    console.log(`\n${'─'.repeat(60)}`)
    console.log(`🔄 ETAPA 2/4 — Baixando mídias`)
    console.log(`${'─'.repeat(60)}`)
    console.log(`\n💡 Usando wget para espelhar /wp-content/uploads/`)
    console.log(`   (Se wget não estiver disponível, instale via: choco install wget)\n`)

    try {
      run(
        'Download de mídias via wget',
        `wget -r -np -nH --cut-dirs=2 -A "*.jpg,*.jpeg,*.png,*.webp,*.svg,*.gif,*.pdf" --reject "index.html*" --user-agent="Mozilla/5.0" --timeout=30 --tries=2 --wait=1 -P "${MEDIA_DIR}" ${SITE_URL}/wp-content/uploads/`
      )
    } catch {
      console.log(`\n⚠️  wget falhou — tentando download via Node.js`)
      run(
        'Download via Node.js',
        `node "${path.join(SCRIPTS_DIR, 'download-media.js')}" --media-list "${DATA_DIR}/media.json" --output "${MEDIA_DIR}"`
      )
    }
  } else {
    console.log(`\n⏭️  ETAPA 2/4 — Download de mídias pulado (--skip-media)`)
  }

  // ── Etapa 3: Limpeza do HTML ──────────────────────────────────────────────
  // Verificar se jsdom está instalado
  try {
    require.resolve('jsdom')
  } catch {
    console.log(`\n📦 Instalando jsdom (necessário para limpeza de HTML)...`)
    execSync('npm install jsdom', { stdio: 'inherit', cwd: BASE_OUTPUT })
  }

  run(
    'ETAPA 3/4 — Limpando HTML do Elementor',
    `node "${path.join(SCRIPTS_DIR, 'clean-content.js')}" --input "${DATA_DIR}" --output "${CONTENT_DIR}"`
  )

  // ── Etapa 4: Gerar Next.js ────────────────────────────────────────────────
  run(
    'ETAPA 4/4 — Gerando scaffold Next.js',
    `node "${path.join(SCRIPTS_DIR, 'generate-nextjs.js')}" --content "${CONTENT_DIR}" --data "${DATA_DIR}" --media "${MEDIA_DIR}" --output "${NEXTJS_DIR}"`
  )

  // ── Relatório final ───────────────────────────────────────────────────────
  console.log(`\n${'═'.repeat(60)}`)
  console.log(`  ✅ CLONAGEM CONCLUÍDA!`)
  console.log(`${'═'.repeat(60)}`)
  console.log(`
📁 Estrutura gerada:

  ${BASE_OUTPUT}/
  ├── data/          ← Dados extraídos do WordPress (JSON)
  ├── media/         ← Imagens e mídias baixadas
  ├── content/       ← HTML limpo + texto estruturado
  └── next-scaffold/ ← Projeto Next.js 14 pronto!

🚀 Para iniciar o projeto Next.js:
  cd ${NEXTJS_DIR}
  npm install
  npm run dev

🌐 Para fazer deploy na Vercel:
  cd ${NEXTJS_DIR}
  vercel --prod

📋 Próximos passos:
  1. Revisar cores em tailwind.config.js
  2. Adicionar logo real no components/Header.tsx
  3. Completar conteúdo de cada página em app/
  4. Configurar .env.local com credenciais Supabase
  5. Deploy na Vercel (ou conectar GitHub)
`)
}

main().catch(err => {
  console.error(`\n❌ Erro fatal: ${err.message}`)
  process.exit(1)
})
