#!/usr/bin/env node
/**
 * Next.js 14 Scaffold Generator
 * Cria projeto Next.js completo a partir do conteúdo extraído do WordPress
 *
 * Usage:
 *   node generate-nextjs.js --content ./content --data ./data --output ./nextjs-project
 */

const fs = require('fs')
const path = require('path')

const args = process.argv.slice(2)
if (args.includes('--help')) {
  console.log(`
Next.js Scaffold Generator

Usage:
  node generate-nextjs.js --content ./content --data ./wp-extracted --output ./nextjs-project

Options:
  --content  Diretório com conteúdo limpo (padrão: ./content)
  --data     Diretório com dados brutos do WP (padrão: ./wp-extracted)
  --media    Diretório com mídias baixadas (padrão: ./media)
  --output   Diretório do projeto Next.js (padrão: ./nextjs-project)
  `)
  process.exit(0)
}

const getArg = (flag) => {
  const idx = args.indexOf(flag)
  return idx !== -1 ? args[idx + 1] : null
}

const CONTENT_DIR = getArg('--content') || './content'
const DATA_DIR = getArg('--data') || './wp-extracted'
const MEDIA_DIR = getArg('--media') || './media'
const OUTPUT_DIR = getArg('--output') || './nextjs-project'

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

const writeFile = (filepath, content) => {
  ensureDir(path.dirname(filepath))
  fs.writeFileSync(filepath, content, 'utf8')
  process.stdout.write('.')
}

const toPascalCase = (str = '') =>
  str.split(/[-_\s]/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join('')

const escapeHtml = (str = '') =>
  str.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

// Detectar qual slug é a homepage
const isHomepage = (slug = '', title = '') => {
  const homeKeys = ['home', 'pagina-inicial', 'inicio', 'principal', 'a-ideal', 'index']
  return homeKeys.some(k => slug === k || title.toLowerCase().includes('principal'))
}

// ─── Templates de código ─────────────────────────────────────────────────────

const generatePackageJSON = (name) => JSON.stringify({
  name: name.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-'),
  version: '0.1.0',
  private: true,
  scripts: {
    dev: 'next dev',
    build: 'next build',
    start: 'next start',
    lint: 'next lint'
  },
  dependencies: {
    next: '^14.2.0',
    react: '^18.3.0',
    'react-dom': '^18.3.0',
    '@supabase/supabase-js': '^2.45.0'
  },
  devDependencies: {
    typescript: '^5.5.0',
    '@types/node': '^20.0.0',
    '@types/react': '^18.3.0',
    '@types/react-dom': '^18.3.0',
    tailwindcss: '^3.4.0',
    autoprefixer: '^10.4.0',
    postcss: '^8.4.0',
    eslint: '^8.57.0',
    'eslint-config-next': '^14.2.0'
  }
}, null, 2)

const generateTsConfig = () => JSON.stringify({
  compilerOptions: {
    target: 'ES2017',
    lib: ['dom', 'dom.iterable', 'esnext'],
    allowJs: true,
    skipLibCheck: true,
    strict: true,
    noEmit: true,
    esModuleInterop: true,
    module: 'esnext',
    moduleResolution: 'bundler',
    resolveJsonModule: true,
    isolatedModules: true,
    jsx: 'preserve',
    incremental: true,
    plugins: [{ name: 'next' }],
    paths: { '@/*': ['./*'] }
  },
  include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
  exclude: ['node_modules']
}, null, 2)

const generateNextConfig = () => `/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig
`

const generateTailwindConfig = () => `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // TODO: Ajustar para as cores da marca original
        primary: {
          DEFAULT: '#1a3a6b',
          light: '#2d5aa0',
          dark: '#0f2244',
        },
        secondary: '#f5a623',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
`

const generatePostCssConfig = () => `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`

const generateGlobalCSS = () => `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary: #1a3a6b;
  --secondary: #f5a623;
}

@layer base {
  html {
    scroll-behavior: smooth;
  }
}

@layer components {
  .btn-primary {
    @apply bg-primary text-white px-6 py-3 rounded font-semibold
           hover:bg-primary-dark transition-colors duration-200;
  }

  .btn-secondary {
    @apply border-2 border-primary text-primary px-6 py-3 rounded font-semibold
           hover:bg-primary hover:text-white transition-colors duration-200;
  }

  .container-custom {
    @apply max-w-6xl mx-auto px-4 sm:px-6 lg:px-8;
  }

  .section-title {
    @apply text-3xl md:text-4xl font-bold text-gray-900 mb-4;
  }

  .section-subtitle {
    @apply text-lg text-gray-600 mb-8;
  }
}
`

const generateEnvTemplate = (siteUrl = '') => `# ─── Supabase ────────────────────────────────────────────────
# Crie seu projeto em https://supabase.com
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# ─── Site ────────────────────────────────────────────────────
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_WP_ORIGINAL_URL=${siteUrl}

# ─── WhatsApp (para botão de contato) ────────────────────────
NEXT_PUBLIC_WHATSAPP_NUMBER=5511999999999
`

const generateVercelJSON = () => JSON.stringify({
  framework: 'nextjs',
  buildCommand: 'next build',
  outputDirectory: '.next',
  installCommand: 'npm install'
}, null, 2)

// ─── Componentes ─────────────────────────────────────────────────────────────

const generateHeader = (siteName, pages) => {
  const navLinks = pages
    .filter(p => p.parent === 0 && !isHomepage(p.slug, p.title))
    .slice(0, 8)
    .map(p => `        { href: '/${p.slug}', label: '${escapeHtml(p.title)}' },`)
    .join('\n')

  return `'use client'

import Link from 'next/link'
import { useState } from 'react'

const navLinks = [
${navLinks || "        { href: '/', label: 'Início' },"}
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            {/* TODO: Substituir pelo logo real */}
            <span className="text-xl font-bold text-primary">${escapeHtml(siteName)}</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-primary font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contato"
              className="btn-primary text-sm"
            >
              Solicitar Orçamento
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <nav className="md:hidden py-4 border-t">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-gray-700 hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
`
}

const generateFooter = (siteName, siteUrl) => `import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sobre */}
          <div>
            <h3 className="text-lg font-bold mb-4">${escapeHtml(siteName)}</h3>
            <p className="text-gray-400 text-sm">
              {/* TODO: Adicionar descrição da empresa */}
            </p>
          </div>

          {/* Links rápidos */}
          <div>
            <h3 className="text-lg font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Início</Link></li>
              <li><Link href="/sobre-nos" className="hover:text-white transition-colors">Sobre Nós</Link></li>
              <li><Link href="/contato" className="hover:text-white transition-colors">Contato</Link></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contato</h3>
            <div className="text-gray-400 text-sm space-y-2">
              {/* TODO: Preencher com dados reais do site original */}
              <p>📧 contato@empresa.com.br</p>
              <p>📱 (11) 99999-9999</p>
              <p>📍 São Paulo, SP</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()} ${escapeHtml(siteName)}. Todos os direitos reservados.
          </p>
          <p className="mt-1">
            <Link href="/politica-de-privacidade" className="hover:text-white transition-colors">
              Política de Privacidade
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
`

const generateLayout = (siteName, siteDescription) => `import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: {
    default: '${escapeHtml(siteName)}',
    template: '%s | ${escapeHtml(siteName)}',
  },
  description: '${escapeHtml(siteDescription)}',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: '${escapeHtml(siteName)}',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
`

const generatePageComponent = (page) => {
  const title = page.title || 'Página'
  const slug = page.slug || 'pagina'
  const componentName = toPascalCase(slug) + 'Page'
  const firstParagraph = page.paragraphs?.[0] || ''
  const description = firstParagraph.substring(0, 160).replace(/"/g, '\\"')

  // Gerar seções a partir do conteúdo limpo
  const sectionsCode = (page.sections || []).map((section, i) => {
    const heading = section.heading ? `<h2 className="section-title">${escapeHtml(section.heading)}</h2>` : ''
    const texts = (section.paragraphs || []).slice(0, 3)
      .map(t => `          <p className="text-gray-700 text-lg leading-relaxed">${escapeHtml(t.substring(0, 300))}</p>`)
      .join('\n')
    const image = section.images?.[0]
    const imgCode = image?.src
      ? `          {/* TODO: Trocar por next/image */}
          {/* <img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt)}" className="w-full rounded-lg" /> */}`
      : ''
    const btns = (section.buttons || []).map(b =>
      `          <a href="${escapeHtml(b.href)}" className="btn-primary inline-block">${escapeHtml(b.text)}</a>`
    ).join('\n')

    return `
      {/* ── Seção ${i + 1}${section.heading ? ': ' + section.heading : ''} ── */}
      <section className="py-16 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}">
        <div className="container-custom">
          ${heading}
          ${texts}
          ${imgCode}
          ${btns ? `<div className="flex flex-wrap gap-4 mt-8">\n${btns}\n          </div>` : ''}
        </div>
      </section>`
  }).join('\n') || `
      <section className="py-16">
        <div className="container-custom">
          ${(page.paragraphs || []).slice(0, 3)
            .map(p => `<p className="text-lg text-gray-700 mb-4">${escapeHtml(p.substring(0, 300))}</p>`)
            .join('\n          ')}
          {/* TODO: Adicionar conteúdo de content/pages/${slug}.json */}
        </div>
      </section>`

  return `import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '${escapeHtml(title)}',
  description: '${description}',
}

/**
 * Página: ${title}
 * Slug WordPress: /${slug}
 * Seções encontradas: ${page.sections?.length || 0}
 * Parágrafos: ${page.paragraphs?.length || 0}
 * Imagens: ${page.images?.length || 0}
 *
 * TODO: Revisar conteúdo em content/pages/${slug}.json
 */
export default function ${componentName}() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-primary text-white py-24">
        <div className="container-custom">
          <h1 className="text-5xl font-bold mb-6">${escapeHtml(title)}</h1>
          ${firstParagraph ? `<p className="text-xl max-w-2xl text-blue-100">${escapeHtml(firstParagraph.substring(0, 200))}</p>` : ''}
        </div>
      </section>
${sectionsCode}
    </>
  )
}
`
}

const generateHomepage = (page, siteName) => {
  const firstHeading = page.headings?.[0]?.text || siteName
  const firstParagraph = page.paragraphs?.[0] || ''
  const whatsappBtn = page.buttons?.find(b => b.href?.includes('wa.me'))

  return `import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '${escapeHtml(siteName)} | Início',
  description: '${escapeHtml(firstParagraph.substring(0, 160))}',
}

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-primary text-white py-24 md:py-32">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            ${escapeHtml(firstHeading)}
          </h1>
          ${firstParagraph ? `<p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10">
            ${escapeHtml(firstParagraph.substring(0, 250))}
          </p>` : ''}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            ${whatsappBtn
              ? `<a href="${escapeHtml(whatsappBtn.href)}" className="btn-primary">
              ${escapeHtml(whatsappBtn.text || 'Solicitar Orçamento')}
            </a>`
              : `<Link href="/contato" className="btn-primary">
              Solicitar Orçamento
            </Link>`
            }
            <Link href="/sobre-nos" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">
              Saiba Mais
            </Link>
          </div>
        </div>
      </section>

      {/* ── Seções da homepage ── */}
      {/* TODO: Preencher com seções extraídas de content/pages/${page.slug}.json */}
      {/* Total de seções encontradas: ${page.sections?.length || 0} */}
      {/* Total de parágrafos: ${page.paragraphs?.length || 0} */}

      {/* ── CTA Final ── */}
      <section className="bg-secondary py-20">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Pronto para começar?
          </h2>
          <Link href="/contato" className="bg-white text-secondary font-bold px-8 py-4 rounded hover:bg-gray-100 transition-colors">
            Entre em Contato
          </Link>
        </div>
      </section>
    </>
  )
}
`
}

const generateReadme = (siteName, siteUrl, pageCount, postCount) => `# ${siteName}

Projeto migrado do WordPress para **Next.js 14** com App Router.

- **Original**: ${siteUrl}
- **Stack**: Next.js 14 + Tailwind CSS + TypeScript + Supabase
- **Deploy**: Vercel

---

## 🚀 Início rápido

\`\`\`bash
npm install
cp .env.local.example .env.local   # preencher variáveis
npm run dev
\`\`\`

Abra [http://localhost:3000](http://localhost:3000)

---

## 📁 Estrutura

\`\`\`
app/
├── page.tsx              # Homepage (migrada do WP)
├── [slug]/page.tsx       # ${pageCount - 1} outras páginas migradas
├── layout.tsx            # Layout global (Header + Footer)
└── globals.css           # Estilos globais + Tailwind

components/
├── Header.tsx            # Gerado a partir dos menus do WP
└── Footer.tsx            # Rodapé

public/images/            # Imagens baixadas do WordPress
data/                     # Dados estáticos exportados do WP
\`\`\`

---

## 🎨 TODO após geração

- [ ] Revisar cores em \`tailwind.config.js\` (ajustar \`primary\` e \`secondary\`)
- [ ] Adicionar logo real no \`Header.tsx\`
- [ ] Preencher dados de contato no \`Footer.tsx\`
- [ ] Revisar cada página em \`app/\` e completar conteúdo
- [ ] Configurar Supabase para formulários de contato
- [ ] Verificar imagens em \`public/images/\`
- [ ] Configurar domínio na Vercel

---

## 🌐 Deploy na Vercel

\`\`\`bash
# Via CLI
npm i -g vercel
vercel --prod

# Ou conecte o repositório GitHub em vercel.com
\`\`\`

---

## 📊 Páginas migradas: ${pageCount}

Conteúdo extraído de \`data/extraction-summary.json\`.
Revise cada página em \`app/\` e complete com o conteúdo de \`data/content/pages/\`.

---

Gerado por **WP Cloner** — ${new Date().toLocaleDateString('pt-BR')}
`

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🏗️  Next.js Scaffold Generator`)
  console.log(`📂 Content: ${path.resolve(CONTENT_DIR)}`)
  console.log(`📁 Output:  ${path.resolve(OUTPUT_DIR)}\n`)

  ensureDir(OUTPUT_DIR)

  // Carregar site-info
  let siteInfo = { name: 'Meu Site', description: '', url: '' }
  const siteInfoPath = path.join(DATA_DIR, 'site-info.json')
  if (fs.existsSync(siteInfoPath)) {
    siteInfo = { ...siteInfo, ...JSON.parse(fs.readFileSync(siteInfoPath, 'utf8')) }
    console.log(`✅ Site: "${siteInfo.name}"`)
  }

  // Carregar páginas limpas
  let pages = []
  const pagesDir = path.join(CONTENT_DIR, 'pages')
  if (fs.existsSync(pagesDir)) {
    pages = fs.readdirSync(pagesDir)
      .filter(f => f.endsWith('.json'))
      .map(f => JSON.parse(fs.readFileSync(path.join(pagesDir, f), 'utf8')))
      .sort((a, b) => (a.menu_order || 0) - (b.menu_order || 0))
    console.log(`✅ ${pages.length} páginas carregadas`)
  }

  // Carregar páginas brutas (fallback se content não existir)
  if (pages.length === 0) {
    const rawPagesDir = path.join(DATA_DIR, 'pages')
    if (fs.existsSync(rawPagesDir)) {
      pages = fs.readdirSync(rawPagesDir)
        .filter(f => f.endsWith('.json'))
        .map(f => JSON.parse(fs.readFileSync(path.join(rawPagesDir, f), 'utf8')))
      console.log(`⚠️  Usando páginas brutas (sem limpeza de Elementor)`)
    }
  }

  // ─── Arquivos de configuração ──────────────────────────────────────────────
  process.stdout.write('\n📦 Criando arquivos de configuração ')
  writeFile(path.join(OUTPUT_DIR, 'package.json'), generatePackageJSON(siteInfo.name))
  writeFile(path.join(OUTPUT_DIR, 'tsconfig.json'), generateTsConfig())
  writeFile(path.join(OUTPUT_DIR, 'next.config.js'), generateNextConfig())
  writeFile(path.join(OUTPUT_DIR, 'tailwind.config.js'), generateTailwindConfig())
  writeFile(path.join(OUTPUT_DIR, 'postcss.config.js'), generatePostCssConfig())
  writeFile(path.join(OUTPUT_DIR, '.env.local'), generateEnvTemplate(siteInfo.url))
  writeFile(path.join(OUTPUT_DIR, 'vercel.json'), generateVercelJSON())
  writeFile(path.join(OUTPUT_DIR, '.gitignore'), `.next\nnode_modules\n.env.local\n.DS_Store\n`)
  console.log(' ✅')

  // ─── App directory ────────────────────────────────────────────────────────
  process.stdout.write('🗂️  Criando estrutura app/ ')
  writeFile(path.join(OUTPUT_DIR, 'app', 'globals.css'), generateGlobalCSS())
  writeFile(path.join(OUTPUT_DIR, 'app', 'layout.tsx'), generateLayout(siteInfo.name, siteInfo.description))

  // Homepage
  const homePage = pages.find(p => isHomepage(p.slug, p.title)) || pages[0]
  if (homePage) {
    writeFile(path.join(OUTPUT_DIR, 'app', 'page.tsx'), generateHomepage(homePage, siteInfo.name))
  }

  // Demais páginas
  pages.forEach(page => {
    if (!page.slug || isHomepage(page.slug, page.title)) return
    writeFile(
      path.join(OUTPUT_DIR, 'app', page.slug, 'page.tsx'),
      generatePageComponent(page)
    )
  })
  console.log(' ✅')

  // ─── Componentes ──────────────────────────────────────────────────────────
  process.stdout.write('🧩 Criando componentes ')
  const pagesForMenu = pages.map(p => ({ slug: p.slug, title: p.title, parent: p.parent || 0 }))
  writeFile(path.join(OUTPUT_DIR, 'components', 'Header.tsx'), generateHeader(siteInfo.name, pagesForMenu))
  writeFile(path.join(OUTPUT_DIR, 'components', 'Footer.tsx'), generateFooter(siteInfo.name, siteInfo.url))
  console.log(' ✅')

  // ─── Copiar dados ─────────────────────────────────────────────────────────
  process.stdout.write('📊 Copiando dados ')
  const dataFiles = ['site-info.json', 'menus.json', 'media.json', 'extraction-summary.json']
  dataFiles.forEach(file => {
    const src = path.join(DATA_DIR, file)
    if (fs.existsSync(src)) {
      ensureDir(path.join(OUTPUT_DIR, 'data'))
      fs.copyFileSync(src, path.join(OUTPUT_DIR, 'data', file))
      process.stdout.write('.')
    }
  })
  console.log(' ✅')

  // ─── Copiar mídias ────────────────────────────────────────────────────────
  if (fs.existsSync(MEDIA_DIR)) {
    console.log('🖼️  Copiando mídias (pode demorar)...')
    const copyDir = (src, dest) => {
      ensureDir(dest)
      fs.readdirSync(src).forEach(item => {
        const srcPath = path.join(src, item)
        const destPath = path.join(dest, item)
        if (fs.statSync(srcPath).isDirectory()) {
          copyDir(srcPath, destPath)
        } else {
          fs.copyFileSync(srcPath, destPath)
        }
      })
    }
    copyDir(MEDIA_DIR, path.join(OUTPUT_DIR, 'public', 'images'))
    console.log('  ✅ Mídias copiadas')
  } else {
    ensureDir(path.join(OUTPUT_DIR, 'public', 'images'))
    writeFile(
      path.join(OUTPUT_DIR, 'public', 'images', '.gitkeep'),
      '# Coloque as imagens baixadas do WordPress aqui\n'
    )
  }

  // ─── README ───────────────────────────────────────────────────────────────
  writeFile(path.join(OUTPUT_DIR, 'README.md'), generateReadme(
    siteInfo.name, siteInfo.url, pages.length, 0
  ))

  // ─── Resultado ─────────────────────────────────────────────────────────────
  console.log(`\n${'═'.repeat(50)}`)
  console.log(`✅ SCAFFOLD NEXT.JS GERADO!`)
  console.log(`${'═'.repeat(50)}`)
  console.log(`📁 Projeto em: ${path.resolve(OUTPUT_DIR)}`)
  console.log(`\n📊 Gerado:`)
  console.log(`   ${pages.length} rotas de página`)
  console.log(`   Header + Footer com menus`)
  console.log(`   Layout global com Tailwind`)
  console.log(`   Configurações Next.js 14 + Vercel`)
  console.log(`\n🚀 Para iniciar:`)
  console.log(`   cd ${OUTPUT_DIR}`)
  console.log(`   npm install`)
  console.log(`   cp .env.local .env.local.bak  # já tem o template`)
  console.log(`   npm run dev`)
}

main().catch(err => {
  console.error(`\n❌ Erro: ${err.message}`)
  process.exit(1)
})
