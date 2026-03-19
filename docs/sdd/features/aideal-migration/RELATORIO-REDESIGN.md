# RELATÓRIO DE REDESIGN VISUAL — Sprint D
## Migração WordPress → Next.js (A Ideal Soluções Anticorrosivas)

**Data**: 2026-03-18
**Referências analisadas**: [seive.com.br](https://www.seive.com.br/) | [verticalgroup.com.br](https://verticalgroup.com.br/)
**Critérios preservados**: copy, mídias, páginas, menu
**Critérios alterados**: layout, formas, efeitos, responsividade, dinamismo

---

## 1. Análise dos Sites de Referência

### 1.1 SEIVE (seive.com.br)
Empresa de supressão de incêndio — segmento industrial B2B similar.

**Elementos extraídos para a A Ideal:**
| Elemento | Descrição | Aplicado em |
|----------|-----------|-------------|
| Hero split | Layout 50/50: texto à esquerda (dark panel) + imagem industrial à direita | `HomeSections.tsx` → `.hero-split` |
| Stats bar | Faixa escura com 4 métricas numéricas logo abaixo do hero | `HomeSections.tsx` → `.stats-bar` |
| Marquee clientes dark | Logos em fundo escuro, rolagem infinita horizontal | `HomeSections.tsx` → `.clients-dark-section` |
| CTA pill | Botão com border-radius: 999px (formato cápsula/comprimido) | `globals.css` → `.btn-primary` |
| Paleta profissional | Fundo escuro profissional contrastando com seções claras | Design system geral |

### 1.2 Vertical Group (verticalgroup.com.br)
Empresa de inspeção naval/industrial — serviços técnicos de altura.

**Elementos extraídos para a A Ideal:**
| Elemento | Descrição | Aplicado em |
|----------|-----------|-------------|
| Header dark | Nav escuro com links brancos uppercase | `globals.css` → `.top-header`, `.nav-link` |
| Wave SVG separadores | Ondas SVG fluidas entre transições dark/light | `HomeSections.tsx` → `<WaveSep>` |
| Accent heading | Borda esquerda colorida (5px) em títulos de seção | `globals.css` → `.section-accent-head` |
| Cards dark de serviço | Fundo escuro semi-transparente, icon badge, hover animado | `globals.css` → `.service-card-dark` |
| Imagens sobrepostas | Duas imagens em camadas com offset na seção "Sobre" | `globals.css` → `.about-overlap-*` |
| CTA strip final | Seção de conversão colorida antes do footer | `globals.css` → `.cta-strip` |
| Footer escuro | Footer mais dark/profundo que o header | `globals.css` → `.site-footer` |

---

## 2. Alterações por Arquivo

### 2.1 `app/globals.css`

#### Seção Global
| Propriedade | Antes | Depois | Motivo |
|-------------|-------|--------|--------|
| `body background` | Radial gradient claro (`#f8f4f4 → #edf2f8`) | `#ffffff` sólido | Background limpo para contrastar com seções dark; gradient conflitava com seções navy |

#### Header
| Seletor | Propriedade | Antes | Depois |
|---------|-------------|-------|--------|
| `.top-header` | `background` | `rgba(255,255,255,0.88)` branco blur | `rgba(2,38,74,0.96)` navy blur |
| `.top-header` | `border-bottom` | `rgba(10,38,66,0.08)` sutil | `rgba(255,255,255,0.08)` |
| `.nav-link` | `color` | `#143a63` azul escuro | `rgba(255,255,255,0.85)` branco |
| `.nav-link` | `background` | não definido | `transparent` (fix browser button default) |
| `.nav-link` | `text-transform` | não aplicado | `uppercase` |
| `.nav-link` | `letter-spacing` | não aplicado | `0.04em` |
| `.nav-link:hover` | `background` | `rgba(0,85,150,0.12)` | `rgba(255,255,255,0.1)` |
| `.nav-link:hover` | `color` | `var(--brand-blue)` | `#ffffff` |
| `.dropdown-panel` | `background` | `#fff` | `#02264a` |
| `.dropdown-panel` | `border` | `1px solid var(--line)` | `1px solid rgba(255,255,255,0.12)` |
| `.dropdown-panel` | `box-shadow` | `var(--shadow-soft)` | `0 20px 40px rgba(0,0,0,0.4)` |
| `.dropdown-item` | `color` | `#23486f` | `rgba(255,255,255,0.82)` |
| `.dropdown-item:hover` | `background` | `#edf3f9` | `rgba(255,255,255,0.1)` |
| `.menu-button` | `color` | `var(--brand-blue)` | `#ffffff` |
| `.mobile-panel` | `background` | `#f5f9ff` | `#02264a` |
| `.mobile-link` | `color` | `#194161` | `rgba(255,255,255,0.82)` |
| `.mobile-link:hover` | `background` | `#ddebf9` | `rgba(255,255,255,0.08)` |

#### Botões
| Seletor | Propriedade | Antes | Depois |
|---------|-------------|-------|--------|
| `.btn-primary` | `background` | `linear-gradient(120deg, #5dbf5d, #53a953)` (verde) | `linear-gradient(120deg, #e80000, #b80000)` (vermelho) |
| `.btn-primary` | `box-shadow` | `rgba(51,127,51,0.28)` verde | `rgba(232,0,0,0.32)` vermelho |
| `.btn-primary` | `border-radius` | `10px` | `999px` (pill) |

#### Novos componentes CSS adicionados

**Hero Split** (`.hero-split`, `.hero-split-content`, `.hero-split-title`, `.hero-split-desc`, `.hero-split-actions`, `.hero-split-media`, `.hero-split-media-overlay`, `.hero-split-badge`, `.hero-split-chips`, `.hero-chip`, `.hero-split-eyebrow`, `.btn-outline-white`)

**Stats Bar** (`.stats-bar`, `.stats-bar-inner`, `.stats-bar-item`, `.stats-bar-number`, `.stats-bar-label`)

**Wave Separator** (`.wave-sep`)

**Section Accent Heading** (`.section-accent-head`)

**Section Dark** (`.section-dark`)

**About Overlap Images** (`.about-overlap`, `.about-overlap-img-main`, `.about-overlap-img-secondary`)

**Service Dark Cards** (`.service-card-dark`, `.service-card-dark-icon`, `.service-card-dark h3`, `.service-card-dark p`)

**Clients Dark Marquee** (`.clients-dark-section`, `.clients-dark-header`, `.logo-track-dark`, `.logo-pill-dark`)

**Review card** — adicionado `border-top: 3px solid var(--brand-red)` e hover com `translateY(-4px)`

**CTA Strip** (`.cta-strip`, `.cta-strip-title`, `.cta-strip-sub`, `.btn-white`)

**Footer** — `background` de `linear-gradient(160deg, #00579b, #00457c)` para `linear-gradient(160deg, #011d3c, #02264a)`; `margin-top` de `76px` para `0`

#### Alterações em responsividade (`@media max-width: 1200px`)
- `.hero-split` → `grid-template-columns: 1fr` (stacked)
- `.hero-split-media` → `min-height: 340px; order: -1` (imagem acima do texto)
- `.stats-bar-inner` → `grid-template-columns: repeat(2, 1fr)` (2 colunas)
- `.about-overlap-img-secondary` → posição ajustada (`bottom: -20px; right: -14px`)
- `.cta-strip` → `grid-template-columns: 1fr; text-align: center`

#### Alterações em responsividade (`@media max-width: 680px`)
- `.hero-split-title` → `font-size: clamp(2.4rem, 9vw, 3.4rem)`
- `.stats-bar-item` → `padding: 20px 16px`
- `.about-overlap-img-secondary` → `display: none` (muito pequeno em mobile)

---

### 2.2 `components/sections/HomeSections.tsx`

**Reescrita completa** — mantendo toda a lógica de dados existente (`serviceCardDescription`, `serviceDisplayName`, props) e adicionando novos elementos visuais.

#### Estrutura de seções (antes → depois)

**Antes:**
```
1. hero-shell (imagem full-width clone WordPress)
2. especialistas-section (grid imagem + texto)
3. section#servicos (cards brancos 3col)
4. map-layout (mapa Brasil)
5. clients-section (logo-grid estático)
6. reviews (review-grid)
```

**Depois:**
```
1. hero-split (dark left + image right + badge)
2. stats-bar (4 métricas)
3. WaveSep dark→white
4. about/especialistas (about-overlap images + section-accent-head)
5. WaveSep white→dark
6. section-dark#servicos (service-card-dark grid)
7. WaveSep dark→white
8. map-layout (mapa Brasil + section-accent-head)
9. clients-dark-section (marquee dark)
10. WaveSep dark→white
11. reviews (aprimorado)
12. cta-strip (vermelho)
```

#### Novos elementos adicionados

**`<WaveSep>`** — Componente SVG inline local:
```tsx
function WaveSep({ fill, bg }: { fill?: string; bg?: string }) {
  return (
    <div className="wave-sep" style={{ background: bg }}>
      <svg viewBox="0 0 1440 64" preserveAspectRatio="none">
        <path d="M0,40 C240,0 480,64 720,36..." fill={fill} />
      </svg>
    </div>
  );
}
```

**`SERVICE_ICONS`** — Mapa de emojis por slug de serviço para os dark cards.

**Hero Split** — Layout div com 2 painéis, eyebrow tag, título display com `.accent`, chips de prova social.

**Stats Bar** — Grid 4 colunas dentro de `.container`.

**About Overlap** — Div `.about-overlap` com `.about-overlap-img-main` (imagem principal) e `.about-overlap-img-secondary` (imagem menor sobreposta, posicionada absolute).

**Service Dark Cards** — `<article className="service-card-dark">` com ícone em container colorido, título e descrição.

**Clients Dark Marquee** — Array duplicado `[...clientLogos, ...clientLogos]` para loop contínuo, logos com filtro CSS branco.

**CTA Strip** — Seção final antes do footer com botão `.btn-white`.

---

### 2.3 `.claude/launch.json` (novo)

Criado para suporte ao `preview_start` do Claude Preview MCP:
```json
{
  "version": "0.0.1",
  "configurations": [{
    "name": "dev",
    "runtimeExecutable": "npm",
    "runtimeArgs": ["run", "dev"],
    "port": 3000,
    "autoPort": true
  }]
}
```

---

## 3. O que foi preservado (sem alterações de conteúdo)

| Item | Status |
|------|--------|
| Copy (headlines, parágrafos, textos) | ✅ 100% preservado |
| Estrutura de menu (Home, Sobre, Serviços, etc.) | ✅ 100% preservado |
| Dropdown de Serviços (12 serviços) | ✅ 100% preservado |
| Logo A Ideal | ✅ 100% preservado |
| Imagens (hero, mapa, about) | ✅ 100% preservadas (mesmos arquivos) |
| Logos de clientes (28 logos) | ✅ 100% preservados |
| Reviews (3 cards estáticos) | ✅ 100% preservados |
| Links (WhatsApp, páginas internas) | ✅ 100% preservados |
| Roteamento (`/[slug]`) | ✅ sem alteração |
| Formulário de contato | ✅ sem alteração |
| SEO/metadata por página | ✅ sem alteração |
| Páginas de serviço individuais | ✅ sem alteração (layout ServicePage) |
| Página Sobre nós | ✅ sem alteração (layout AboutPage) |
| Páginas PDF | ✅ sem alteração |

---

## 4. Comparação Visual (antes × depois)

| Seção | Antes | Depois |
|-------|-------|--------|
| Header | Branco com blur, links azuis | Navy dark com blur, links brancos uppercase, CTA pill vermelho |
| Hero | Imagem full-width simples (sem texto sobre ela) | Split: painel dark com título bold + imagem industrial com badge |
| Métricas | Ausentes | Stats bar horizontal dark com 4 números vermelhos |
| Transições | Abruptas | Wave SVG suaves (3x no home) |
| About | Grid imagem plana + texto | Overlap de duas imagens em camadas + heading com borda vermelha |
| Serviços | Cards brancos com borda leve | Cards dark semi-transparentes com top-border animado |
| Clientes | Grid estático branco 4-5 col | Marquee infinito em fundo navy, logos brancos |
| Botão primário | Verde (#5dbf5d), border-radius 10px | Vermelho (#e80000), pill (999px) |
| Footer | Azul médio (#00579b) | Navy escuro (#011d3c) |
| CTA final | Ausente | Strip vermelho com botão branco |

---

## 5. Pendências pós-redesign

| Item | Prioridade | Descrição |
|------|-----------|-----------|
| Ícones SVG customizados | P2 | Substituir emojis por SVGs industriais para os cards de serviço |
| Logos brancos dos clientes | P2 | Verificar se todos os 28 logos ficam legíveis com `filter: brightness(0) invert(1)` — logos com fundo transparente ficam melhores |
| Consistency check AboutPage | P2 | Aplicar `.section-accent-head` e dark design tokens também em AboutPage e ServicePage |
| Testes mobile (dark header) | P1 | Validar menu hamburger, dropdown e CTA pill em iOS/Android |
| Deploy Vercel | P0 | Build já passa sem erros (confirmado em `next build`) |
| Lighthouse > 80 | P0 | Medir após deploy — hero split com `fill` image pode precisar de ajuste de `priority` |
