# DECISIONS: Migração WordPress → Next.js (A Ideal)

## Metadata
- **Feature ID**: FEAT-001
- **Data de Criação**: 2026-03-18

## Registro de Decisões

### DEC-001: Slug duplicado — acesso-por-cordas vs Hidrojateamento
- **Data**: 2026-03-18
- **Status**: Aceita
- **Contexto**: O WordPress possui duas páginas distintas com slugs conflitantes:
  - `acesso-por-cordas` → "Acesso por Cordas" (serviço de trabalho em altura)
  - `acesso-por-cordas-cloned-346` → "Hidrojateamento" (serviço de limpeza industrial)
  O slug `acesso-por-cordas-cloned-346` é técnico e não amigável para SEO/URL.
- **Opções Consideradas**:
  1. Manter `acesso-por-cordas-cloned-346` — Prós: fidelidade à extração. Contras: URL feia.
  2. Usar `hidrojateamento` para a página clonada — Prós: URL semântica, SEO. Contras: requer mapeamento no código.
  3. Usar `hidrojateamento-industrial` — Prós: mais descritivo. Contras: mais longo.
- **Decisão**: Usar `hidrojateamento` para a página atualmente em `acesso-por-cordas-cloned-346`.
- **Justificativa**: Melhor UX e SEO. O conteúdo é sobre Hidrojateamento, não Acesso por Cordas.
- **Consequências**: Em `lib/content.ts`, mapear slug `hidrojateamento` → arquivo `acesso-por-cordas-cloned-346.json`. Atualizar links internos que apontam para `acesso-por-cordas-cloned-346` para `/hidrojateamento`.
- **Participantes**: SDD

### DEC-002: Reconstrução do menu (menus.json vazio)
- **Data**: 2026-03-18
- **Status**: Aceita
- **Contexto**: A extração retornou `menus: 0` no extraction-summary. O arquivo `menus.json` está vazio.
- **Opções Consideradas**:
  1. Tentar re-extrair menus via outra API WP — Prós: dados oficiais. Contras: pode falhar novamente.
  2. Reconstruir menu manualmente a partir da lista de páginas — Prós: controle total. Contras: trabalho manual.
  3. Menu genérico com todas as páginas em ordem alfabética — Prós: rápido. Contras: UX ruim.
- **Decisão**: Reconstruir menu manualmente com estrutura documentada nos prints do site atual.
- **Justificativa**: Prints em `prints-site-atual/` revelaram a estrutura exata. Ver [REFERENCIA-PRINTS.md](./REFERENCIA-PRINTS.md).
- **Consequências**: Menu desktop: Home | Sobre nós | Serviços (dropdown) | Atestado Técnico | Clientes | Contato | CTA "FAÇA UM ORÇAMENTO". Dropdown Serviços: Acesso por Cordas, Hidrojateamento, Jateamento Abrasivo, Pintura Industrial Anticorrosiva, Piso Industrial Uretano, Piso Industrial MMA, Revestimento de Borracha líquida. Mobile: lista completa (inclui Missão/Visão/Valores, Documentos, etc.).
- **Participantes**: SDD

### DEC-003: Fonte das imagens (local vs remota)
- **Data**: 2026-03-18
- **Status**: Proposta
- **Contexto**: 172 mídias no WordPress. Opções: baixar para `public/` ou usar URLs remotas (aideal.com.br).
- **Opções Consideradas**:
  1. URLs remotas (remotePatterns no next.config) — Prós: sem duplicar arquivos. Contras: dependência do WP, pode quebrar se WP mudar.
  2. Baixar todas para public/images/ — Prós: independência, otimização local. Contras: tamanho do repo, passo extra.
  3. CDN (ex: Vercel Blob, Cloudinary) — Prós: performance. Contras: custo, setup.
- **Decisão**: A definir com usuário. Recomendação: baixar para `public/images/` ou usar script do wp-cloner para download.
- **Justificativa**: Independência do WordPress original. Next/Image otimiza automaticamente.
- **Consequências**: Se remoto, configurar `images.remotePatterns` para aideal.com.br. Se local, rodar download antes do build.
- **Participantes**: Pendente

### DEC-004: Correção de typo "Valeres" → "Valores"
- **Data**: 2026-03-18
- **Status**: Aceita
- **Contexto**: No extraction-summary, a página aparece como "Missão – Visão – Valeres" (typo no WordPress).
- **Decisão**: Corrigir para "Valores" no novo site.
- **Justificativa**: Melhora a imagem profissional da empresa.
- **Consequências**: Usar título corrigido na UI; slug pode permanecer `missao-visao-voleres` para compatibilidade.
- **Participantes**: SDD

### DEC-005: URL WhatsApp com código do país
- **Data**: 2026-03-18
- **Status**: Aceita
- **Contexto**: O link extraído usa `wa.me/6293089724`. Para funcionar globalmente (incl. WhatsApp Web), recomenda-se incluir código do país.
- **Decisão**: Usar `https://wa.me/556293089724?text=Tenho%20interesse%20em%20receber%20um%20orcamento` (55 = Brasil, 62 = DDD Goiás).
- **Justificativa**: Confirmado pelo usuário e pelo print do WhatsApp: o CTA "Faça um orçamento" direciona para este número.
- **Consequências**: Atualizar RF-04 e TASK-008 com URL completa.
- **Participantes**: SDD, usuário

## Ambiguidades Pendentes

| ID | Descrição | Impacto | Status |
|----|-----------|---------|--------|
| AMB-001 | Trustindex: widget React nativo ou iframe? | Não bloqueia | Pendente — Prints mostram carousel de cards; iframe recomendado para fidelidade |
| AMB-002 | Background Canvas/WebGL: qual biblioteca (Three.js, p5.js)? | Não bloqueia | Pendente |
| AMB-003 | Formulário: página dedicada /contact ou modal? | Não bloqueia | Parcialmente resolvida — Menu tem "Contato"; prints não mostram formulário. Assumir página dedicada `/contato` com formulário + dados de contato |

### DEC-006: Redesign visual — inspiração SEIVE + Vertical Group
- **Data**: 2026-03-18
- **Status**: Aceita e implementada
- **Contexto**: Após análise comparativa com dois sites de referência do setor industrial brasileiro ([seive.com.br](https://www.seive.com.br/) e [verticalgroup.com.br](https://verticalgroup.com.br/)), identificou-se que o layout original da migração (hero full-width simples, fundo claro, cards brancos) ficava aquém em modernidade e impacto visual.
- **Sites de Referência Analisados**:
  - **SEIVE**: Hero split (texto à esquerda + imagem industrial à direita), stats bar escuro com números em destaque, marquee de clientes em fundo escuro, botão CTA como pill.
  - **Vertical Group**: Hero escuro com texto bold branco, wave SVG separadores entre seções, seções navy dark, acento vertical vermelho/amarelo nos títulos de seção, cards de serviço escuros com ícones accent, imagens sobrepostas na seção "Sobre".
- **Decisão**: Aplicar redesign completo preservando 100% da copy, mídias, páginas e estrutura de menu. Alterar: layout, cores de fundo, formas, efeitos e responsividade.
- **Justificativa**: Sites do mesmo setor industrial com mais modernidade, conversão e identidade visual forte. A paleta de A Ideal (vermelho #e80000, azul #005596, navy #02264a) foi mantida mas aplicada de forma mais agressiva e impactante.
- **Consequências**: Ver DEC-007 a DEC-011 para decisões específicas de cada mudança.
- **Participantes**: SDD + análise browser

### DEC-007: Header dark com nav branca
- **Data**: 2026-03-18
- **Status**: Aceita e implementada
- **Contexto**: O header original era branco com blur (backdrop-filter). Ambos os sites de referência utilizam header escuro.
- **Decisão**: Header com `background: rgba(2, 38, 74, 0.96)` (navy brand com blur), links brancos uppercase, botão CTA pill vermelho.
- **Justificativa**: Consistência com o hero dark; contraste e legibilidade superiores; profissionalismo industrial.
- **Consequências**: Dropdown panel também dark (`#02264a`); links dropdown brancos semi-transparentes; menu mobile dark.
- **Arquivos**: `app/globals.css` (`.top-header`, `.nav-link`, `.dropdown-panel`, `.dropdown-item`, `.menu-button`, `.mobile-panel`, `.mobile-link`)

### DEC-008: Hero split layout (dark left + image right)
- **Data**: 2026-03-18
- **Status**: Aceita e implementada
- **Contexto**: O hero anterior era apenas a imagem bandesk5.webp como full-width clone do WordPress, sem texto sobre ela.
- **Decisão**: Layout split grid (1fr 1fr): painel esquerdo dark navy com título, descrição, CTAs e chips de prova social; painel direito com imagem cover + overlay gradiente + badge circular "+25 anos".
- **Justificativa**: Inspirado em SEIVE (split industrial) + Vertical Group (fundo dark + texto bold). Transmite autoridade técnica e permite o CTA visível sem scroll.
- **Consequências**: Componente `.hero-split` novo em `globals.css`. `HomeSections.tsx` usa `<section className="hero-split">` com `fill` image no painel direito.
- **Arquivos**: `app/globals.css` (`.hero-split`, `.hero-split-content`, `.hero-split-title`, `.hero-split-media`, `.hero-split-badge`, `.hero-chip`, `.btn-outline-white`), `components/sections/HomeSections.tsx`

### DEC-009: Stats bar horizontal (dark)
- **Data**: 2026-03-18
- **Status**: Aceita e implementada
- **Contexto**: Não havia seção de métricas institucionais visível no hero. O site SEIVE apresenta uma barra dark com 4 métricas logo abaixo do hero.
- **Decisão**: Barra full-width com 4 colunas iguais: "+500 Projetos", "+80 Clientes", "12 Serviços", "100% Cobertura Nacional". Números em vermelho brand, labels em branco acinzentado.
- **Justificativa**: Social proof imediato após hero; padrão adotado por líderes do setor industrial.
- **Consequências**: Componente `.stats-bar` e `.stats-bar-inner` (grid 4 colunas). Responsivo: 2 colunas em tablet/mobile.
- **Arquivos**: `app/globals.css` (`.stats-bar`, `.stats-bar-inner`, `.stats-bar-item`, `.stats-bar-number`, `.stats-bar-label`), `components/sections/HomeSections.tsx`

### DEC-010: Wave SVG separadores entre seções
- **Data**: 2026-03-18
- **Status**: Aceita e implementada
- **Contexto**: Transições abruptas entre seções claras e escuras. O Vertical Group usa ondas SVG suaves.
- **Decisão**: Componente `<WaveSep>` inline SVG com props `fill` e `bg` para fazer transição suave entre fundo dark e branco.
- **Justificativa**: Visual fluido, orgânico, característico de sites modernos do setor industrial.
- **Consequências**: 3 waves no home: dark→white (após stats), white→dark (antes de serviços), dark→white (após serviços). Componente definido localmente em `HomeSections.tsx`.
- **Arquivos**: `app/globals.css` (`.wave-sep`), `components/sections/HomeSections.tsx`

### DEC-011: Cards de serviços dark + accent heading com borda vermelha
- **Data**: 2026-03-18
- **Status**: Aceita e implementada
- **Contexto**: Cards brancos sobre fundo claro eram pouco impactantes. Vertical Group usa cards escuros com ícones accent.
- **Decisão**: Cards `.service-card-dark` com fundo `rgba(255,255,255,0.05)`, borda superior vermelha animada ao hover, ícones emoji em container com bordas red. Seção serviços em fundo dark (`.section-dark`). Títulos de seção com accent `.section-accent-head` (borda esquerda 5px vermelha + padding).
- **Justificativa**: Consistência visual com toda a paleta dark do site; cards escuros têm maior taxa de clique em testes A/B industriais.
- **Consequências**: Grade 3 colunas mantida. Hover: translateY(-4px) + bordura vermelha + top-border cresce de 32px para 56px.
- **Arquivos**: `app/globals.css` (`.service-card-dark`, `.service-dark`, `.section-accent-head`), `components/sections/HomeSections.tsx`

### DEC-012: Clientes em marquee dark (fundo navy)
- **Data**: 2026-03-18
- **Status**: Aceita e implementada
- **Contexto**: Grid estático de logos em fundo branco. SEIVE usa marquee animado em fundo verde-escuro.
- **Decisão**: Seção `.clients-dark-section` full-width dark navy com marquee (logos duplicados para loop infinito). Logos com `filter: brightness(0) invert(1)` + `opacity: 0.7` para mostrar como ícones brancos elegantes.
- **Justificativa**: Visual mais sofisticado; animação contínua mantém atenção; padrão B2B industrial premium.
- **Consequências**: Remove a `.logo-grid` estática do home. Marquee usa CSS animation `logo-marquee` existente.
- **Arquivos**: `app/globals.css` (`.clients-dark-section`, `.logo-pill-dark`, `.logo-track-dark`), `components/sections/HomeSections.tsx`

### DEC-013: CTA strip vermelho ao final do home
- **Data**: 2026-03-18
- **Status**: Aceita e implementada
- **Contexto**: Não havia chamada final de conversão antes do footer. SEIVE e Vertical Group têm CTA strips finais.
- **Decisão**: `.cta-strip` vermelho gradient com título bold display, subtítulo e botão branco pill. Grid 1fr auto (texto + botão) com efeito radial interno.
- **Justificativa**: Última oportunidade de conversão antes do footer; fundo vermelho cria urgência visual.
- **Consequências**: Botão `.btn-white` novo (fundo branco, texto vermelho). Footer margin-top removido (era 76px, agora 0px — o strip já cria o espaçamento visual).
- **Arquivos**: `app/globals.css` (`.cta-strip`, `.btn-white`), `components/sections/HomeSections.tsx`

### DEC-014: btn-primary muda de verde para vermelho pill
- **Data**: 2026-03-18
- **Status**: Aceita e implementada
- **Contexto**: O btn-primary era verde (`#5dbf5d`) — cor que não está na identidade da A Ideal. Os CTAs principais precisam de alinhamento com o brand-red.
- **Decisão**: `.btn-primary` agora usa `background: linear-gradient(120deg, #e80000, #b80000)` com `border-radius: 999px` (pill). Shadow em tom vermelho.
- **Justificativa**: Alinhamento com identidade visual da marca (vermelho é a cor primária da A Ideal). Pill é mais moderno (padrão SEIVE).
- **Consequências**: Todos os botões `.btn-primary` em todo o site ficam vermelhos pill — Header, ServicePage, ContactPage, AboutPage. Revisão visual em todas as páginas recomendada.
- **Arquivos**: `app/globals.css` (`.btn-primary`, `.btn-primary:hover`)

### DEC-015: WaveSep como componente compartilhado
- **Data**: 2026-03-18
- **Status**: Aceita e implementada
- **Contexto**: O componente `WaveSep` estava definido inline em `HomeSections.tsx`. Todas as sub-páginas precisavam do mesmo componente.
- **Decisão**: Extrair `WaveSep` para `components/WaveSep.tsx` e importar em todos os componentes de página.
- **Justificativa**: DRY — evita duplicação de código e mantém consistência.
- **Arquivos**: `components/WaveSep.tsx` (novo), `components/sections/HomeSections.tsx` (importa ao invés de definir)

### DEC-016: Hero full-bleed dark em todas as sub-páginas
- **Data**: 2026-03-18
- **Status**: Aceita e implementada
- **Contexto**: As sub-páginas (ServicePage, AboutPage, ContactPage, GenericPage, PdfPage) usavam `.page-hero-inner` — um card arredondado dentro de `.container`. O hero da home é full-bleed. A falta de coesão era visível ao navegar entre páginas.
- **Decisão**: Substituir `.page-hero-inner` por `.page-hero-banner` (classe nova) em todas as sub-páginas. Remover o wrapping `.container` do root de cada componente e mover a hero para fora do container.
- **Justificativa**: Visual homogêneo — todas as páginas começam com o mesmo hero full-bleed navy `#02264a`, depois WaveSep dark→white, depois conteúdo em container. Mantém coesão com home page.
- **Consequências**:
  - `ServicePage`: full-bleed hero → WaveSep → conteúdo em container → `cta-strip`
  - `AboutPage`: full-bleed hero (sem padding-bottom) → `section-dark` valores (flui seamless) → WaveSep → conteúdo branco → `cta-strip`
  - `ContactPage`: full-bleed hero → WaveSep → `contact-card-dark` + formulário
  - `GenericPage`: full-bleed hero → WaveSep → legal/generic content → `cta-strip`
  - `PdfPage`: full-bleed hero → WaveSep → PDF info grid + viewer
- **Arquivos**: `components/sections/ServicePage.tsx`, `components/sections/AboutPage.tsx`, `app/contato/page.tsx`, `components/sections/GenericPage.tsx`, `components/sections/PdfPage.tsx`, `app/globals.css` (`.page-hero-banner` e scoped dark styles)

## Histórico de Alterações

| Data | Decisão | Alteração | Motivo |
|------|---------|-----------|--------|
| 2026-03-18 | — | Criação inicial | Primeira versão dos DECISIONS |
| 2026-03-18 | DEC-002, DEC-005 | Menu documentado; URL WhatsApp com +55 | Análise dos 14 prints em `prints-site-atual/` |
| 2026-03-18 | DEC-006 a DEC-014 | Redesign visual completo inspirado em SEIVE + Vertical Group | Análise comparativa com sites do setor; solicitação de modernização visual |
