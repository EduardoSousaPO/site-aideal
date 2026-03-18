---
name: wp-cloner
description: Clone and migrate WordPress sites to Next.js/React. Use this skill SEMPRE que o usuário quiser: clonar um site WordPress, migrar de WordPress para Next.js ou React, extrair conteúdo de um site WordPress, baixar imagens e mídia de um site WordPress, recriar um site WordPress em framework moderno, ou mencionar "clonar site", "migrar wordpress", "extrair conteúdo wordpress", "wordpress to next.js", "clone wordpress", "wp migration", "recriar site", "copiar site". Também ativar quando o usuário tiver acesso ao admin do WordPress e quiser fazer download de todo o conteúdo para rebuild. TRIGGER on any mention of cloning, migrating, or rebuilding a WordPress site, even if the user doesn't say "skill" explicitly.
---

# WordPress Site Cloner → Next.js

Esta skill extrai **todo o conteúdo** de um site WordPress (copy, mídia, estrutura HTML, menus, SEO) e organiza em uma estrutura local pronta para recriar em Next.js + Vercel + Supabase.

## O que esta skill produz

```
[nome-do-projeto]/
├── data/
│   ├── site-info.json        # Título, descrição, URL, idioma
│   ├── pages/                # Um JSON por página (slug, título, conteúdo, SEO)
│   ├── posts/                # Um JSON por post
│   ├── media.json            # Lista de todas as mídias com URLs
│   ├── menus.json            # Estrutura de navegação
│   ├── categories.json
│   └── extraction-summary.json
├── media/                    # Imagens e arquivos baixados
├── content/
│   ├── pages/                # HTML limpo + texto extraído por página
│   └── posts/                # HTML limpo + texto extraído por post
├── next-scaffold/            # Projeto Next.js 14 pronto para uso
│   ├── app/                  # Uma rota por página WordPress
│   ├── components/           # Header, Footer gerados
│   ├── public/images/        # Mídias copiadas
│   ├── data/                 # JSONs de dados
│   ├── .env.local            # Template com variáveis Supabase/Vercel
│   ├── vercel.json
│   └── package.json
└── extraction-report.md      # Resumo: páginas, mídias, issues, próximos passos
```

---

## Processo passo a passo

### ETAPA 1 — Coletar informações

Perguntar ao usuário:
- **URL do site WordPress** (ex: `https://aideal.com.br`)
- **Nome do projeto** para o diretório local (ex: `aideal-nextjs`)
- **Diretório de saída** (padrão: diretório atual do projeto aberto na IDE)
- **Stack preferida**: Tailwind CSS? Supabase para formulários/blog dinâmico?
- **Acesso adicional** (opcional): FTP/cPanel, credenciais do admin WP?

### ETAPA 2 — Testar acesso à REST API do WordPress

A REST API do WordPress é nativa (sem plugins), mais rápida que o admin, e funciona mesmo em sites lentos. Verificar:

```bash
curl -s "https://[SITE]/wp-json/" | head -50
curl -s "https://[SITE]/wp-json/wp/v2/pages?per_page=1"
```

Se a API estiver acessível → usar scripts de extração automática.
Se bloqueada → usar extração via browser (Claude in Chrome MCP).

### ETAPA 3 — Extrair dados via REST API

Instalar dependência e executar:

```bash
cd [OUTPUT_DIR]/[PROJECT_NAME]
npm install jsdom   # única dependência necessária
node [SKILL_DIR]/scripts/extract-wp-api.js \
  --url https://[SITE] \
  --output ./data
```

O script extrai automaticamente:
- Todas as páginas (com paginação automática)
- Todos os posts
- Lista de mídias com URLs originais
- Menus de navegação
- Categorias e tags
- Info do site (título, descrição, idioma)

Ver `scripts/extract-wp-api.js` para documentação completa.

### ETAPA 4 — Baixar mídias

**Opção A — wget (recomendado, baixa tudo de uma vez):**
```bash
wget -r -np -nH --cut-dirs=2 \
  -A "*.jpg,*.jpeg,*.png,*.webp,*.svg,*.gif,*.pdf" \
  --reject "index.html*" \
  --user-agent="Mozilla/5.0" \
  --timeout=30 --tries=3 --wait=1 \
  -P ./media \
  https://[SITE]/wp-content/uploads/
```

**Opção B — Script com lista da API (se wget não funcionar):**
```bash
node [SKILL_DIR]/scripts/download-media.js \
  --media-list ./data/media.json \
  --output ./media
```

**Opção C — FTP direto** (se tiver acesso ao hosting):
Baixar a pasta `wp-content/uploads/` inteira via FileZilla ou similar.

### ETAPA 5 — Limpar HTML do Elementor/WordPress

O conteúdo bruto da API vem com markup do Elementor (divs gigantes, classes como `elementor-widget-heading`). Limpar para extrair conteúdo real:

```bash
node [SKILL_DIR]/scripts/clean-content.js \
  --input ./data \
  --output ./content
```

O script extrai de cada página:
- Headings (h1-h4) com hierarquia
- Parágrafos de texto
- URLs de imagens com alt text
- Texto e URLs dos botões (CTAs)
- Estrutura de seções do Elementor
- Texto plain para referência rápida

### ETAPA 6 — Gerar scaffold Next.js

```bash
node [SKILL_DIR]/scripts/generate-nextjs.js \
  --content ./content \
  --data ./data \
  --media ./media \
  --output ./next-scaffold
```

Gera:
- `app/layout.tsx` com Header e Footer do menu WP
- Uma rota `app/[slug]/page.tsx` por página WordPress
- `components/Header.tsx` e `components/Footer.tsx`
- `public/images/` com mídias copiadas
- `package.json` com Next.js 14, Tailwind, TypeScript
- `.env.local` template para Supabase e Vercel
- `vercel.json` configurado

### ETAPA 7 — Gerar relatório de extração

Criar `extraction-report.md` com:
- Total de páginas, posts e mídias extraídas
- Lista de páginas com slug, título e URL original
- Mídias que falharam no download
- Seções do site que precisam de atenção manual
- Próximos passos para o desenvolvedor

---

## Extração via Browser (fallback)

Se a REST API estiver bloqueada, usar o Claude in Chrome MCP para extração visual:

1. Abrir o site no browser
2. Para cada página listada no sitemap (`/sitemap.xml` ou `/sitemap_index.xml`):
   - Navegar até a página
   - Extrair texto via `document.querySelectorAll('h1,h2,h3,p,a')`
   - Capturar URLs de imagens via `document.querySelectorAll('img')`
   - Salvar em `content/pages/[slug].json`
3. Para o WordPress admin (se tiver acesso):
   - Ir em `Ferramentas > Exportar > Exportar tudo`
   - Baixar o XML com todo o conteúdo
   - Parsear com `scripts/parse-wx-export.js`

---

## Próximos passos após extração

Guiar o usuário para:

1. **Revisar** `extraction-report.md` para verificar gaps
2. **Abrir** `next-scaffold/` na IDE
3. **Instalar dependências**:
   ```bash
   cd next-scaffold && npm install
   ```
4. **Rodar localmente**:
   ```bash
   npm run dev
   # Abrir http://localhost:3000
   ```
5. **Configurar Supabase** (se necessário para formulários/blog):
   - Criar projeto em supabase.com
   - Copiar URL e anon key para `.env.local`
6. **Deploy na Vercel**:
   ```bash
   vercel --prod
   # ou conectar repositório GitHub no dashboard da Vercel
   ```

---

## Troubleshooting

| Problema | Solução |
|---|---|
| REST API retorna 404 | Tentar `?rest_route=/wp/v2/pages` na URL |
| API bloqueada por plugin de segurança | Desativar plugins temporariamente no admin WP |
| Download de mídia lento/falha | Usar FTP direto ou baixar em lotes menores |
| Elementor com widgets customizados | Inspecionar manualmente e extrair via browser |
| Site muito lento para acessar | Rodar extração em horários de baixo tráfego |
| Imagens com URL relativa | Prefixar com URL base do site |

---

## Scripts disponíveis

Ver pasta `scripts/`:
- `extract-wp-api.js` — Extração via REST API (principal)
- `clean-content.js` — Limpeza de HTML Elementor/WP
- `generate-nextjs.js` — Geração do scaffold Next.js
- `download-media.js` — Download de mídias via lista JSON
- `parse-wxr-export.js` — Parser do XML de exportação do WP

Cada script aceita `--help` para ver opções.
