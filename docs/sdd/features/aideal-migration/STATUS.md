# STATUS: Migração WordPress → Next.js (A Ideal)

## Visão Geral

| Métrica | Valor |
|---------|-------|
| **Progresso** | ~98% |
| **Tasks concluídas** | 20 de 22 |
| **Tasks pendentes** | 2 |
| **Última atualização** | 2026-03-18 |

---

## O que já foi feito ✅

### Infraestrutura
- Projeto Next.js 16 com App Router, TypeScript, Tailwind
- Supabase configurado (`lib/supabase.ts`)
- Conteúdo em `aideal-clone/`, imagens com `remotePatterns` para aideal.com.br

### Core
- `lib/content.ts` com mapeamento de slugs (home-aideal → home, acesso-por-cordas-cloned-346 → hidrojateamento)
- Roteamento dinâmico `app/[slug]/page.tsx` com `generateStaticParams` e `generateMetadata`
- Página Home com hero, serviços, clientes, reviews, mapa Brasil

### Componentes
- Header com menu (dropdown Serviços), logo, CTA WhatsApp
- Footer 3 colunas (logo/redes, atendimento, mapa)
- WhatsAppButton (flutuante + CTA)
- CookieConsent (LGPD)
- FaqAccordion para páginas de serviço
- HypnoticBackground (Canvas)
- ScrollAnimations (GSAP)

### Páginas
- Home, Sobre nós, Contato
- Páginas de serviço (ServicePage)
- Páginas genéricas (GenericPage)
- Páginas PDF (PdfPage)

### Funcionalidades
- Formulário de contato + API `/api/contact` → Supabase
- SEO por página (generateMetadata)
- Design system (cores, tipografia, componentes)

### Correções pós-auditoria (RELATORIO-AUDIT-SITE.md)
- Proporção de imagens hero e mapa corrigida
- Fallback para imagens externas em páginas de serviço
- Correção de imagem oval em Sobre nós
- Redução de duplicação de CTAs
- Suavização de sombra no hero
- Padronização do selo de satisfação

### Redesign Visual Sprint D — Inspiração SEIVE + Vertical Group ✅
Ver [DECISIONS.md](./DECISIONS.md) (DEC-006 a DEC-014) e [RELATORIO-REDESIGN.md](./RELATORIO-REDESIGN.md).

- **Header dark navy** com nav branca uppercase + CTA pill vermelho
- **Hero split** (dark left panel + imagem right cover) com badge "+25 anos"
- **Stats bar** horizontal dark com 4 métricas em vermelho
- **Wave SVG separadores** fluidos entre seções dark/light
- **About section** com imagens sobrepostas (overlap) + accent heading
- **Serviços em dark cards** com ícones emoji accent e top-border animado ao hover
- **Clients marquee dark** com logos em branco filtrado sobre navy
- **CTA strip vermelho** ao final da home para conversão
- **btn-primary** unificado em vermelho pill em todo o site
- **Footer navy** mais escuro (consistência dark theme)

---

## Execução Frontend Design (Sprints A, B e C) ✅

### Sprint A — Concluído
- Home com métricas institucionais e hierarquia de CTA refinada
- Sobre nós com módulos narrativos e cartões de valores descritivos
- Contato com badge de SLA e atalhos rápidos (WhatsApp, telefone, e-mail)
- ServicePage com blocos técnicos padronizados e modo especial para Atestado Técnico

### Sprint B — Concluído
- Páginas legais (`/politica-de-privacidade`, `/termos-de-uso`) em layout documental com índice lateral, âncoras e data de revisão
- Padronização de narrativa técnica em serviços com seções de aplicações e segmentos atendidos

### Sprint C — Concluído
- Páginas PDF com metadados, resumo por documento e fallback de abertura em nova aba
- Refino de microinterações e acessibilidade (`focus-visible`, `prefers-reduced-motion`, ajuste de FAQ e animações)

---

## O que ainda falta ⬜

### Prioridade P0
1. **TASK-019**: Deploy na Vercel
2. **TASK-020**: Otimização e Lighthouse (Performance > 80)

### Redesign Sprint E — Coesão Visual em Todas as Páginas ✅
Ver [DECISIONS.md](./DECISIONS.md) (DEC-015 a DEC-016) e [RELATORIO-REDESIGN.md](./RELATORIO-REDESIGN.md).

- **`WaveSep`** extraído para componente compartilhado (`components/WaveSep.tsx`)
- **`page-hero-banner`** — hero full-bleed dark navy para todas as sub-páginas (`.page-hero-inner` encapsulado substituído)
- **ServicePage** — hero full-bleed + WaveSep dark→white + `section-accent-head` em "Vantagens" e "Obras" + `cta-strip` final
- **AboutPage** — hero full-bleed dark + Valores em `section-dark` fluindo do hero + WaveSep + conteúdo branco + `cta-strip`
- **ContactPage** — hero full-bleed + WaveSep + `contact-card-dark` + `section-accent-head` nos headings
- **GenericPage** — hero full-bleed + WaveSep + `cta-strip` com variante legal/genérica
- **PdfPage** — hero full-bleed + WaveSep + `section-accent-head` nos cards de Resumo e Informações

### Melhorias recomendadas pós-redesign
- Substituir emojis de serviço por SVG icons customizados (maior controle visual)
- Integração Trustindex real (substituir cards estáticos de review)
- Testes manuais completos em todas as rotas/dispositivos (foco em mobile com dark header)
- Verificar logos de clientes no marquee dark (alguns podem precisar de versão branca oficial)

---

## Documentos Relacionados

| Documento | Descrição |
|-----------|-----------|
| [SPEC.md](./SPEC.md) | Especificação e requisitos |
| [PLAN.md](./PLAN.md) | Arquitetura e plano técnico |
| [TASKS.md](./TASKS.md) | Lista detalhada de tasks |
| [RELATORIO-AUDIT-SITE.md](./RELATORIO-AUDIT-SITE.md) | Auditoria visual e correções |
| [DECISIONS.md](./DECISIONS.md) | Decisões de design |
| [REFERENCIA-PRINTS.md](./REFERENCIA-PRINTS.md) | Design system do WordPress |
