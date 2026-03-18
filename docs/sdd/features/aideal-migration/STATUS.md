# STATUS: Migração WordPress → Next.js (A Ideal)

## Visão Geral

| Métrica | Valor |
|---------|-------|
| **Progresso** | ~90% |
| **Tasks concluídas** | 17 de 21 |
| **Tasks pendentes** | 4 |
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

### Prioridade P2
1. **TASK-013**: Integração Trustindex (reviews Google) — atualmente usa cards estáticos
2. **TASK-018**: Testes manuais (links, formulário, responsividade)

### Prioridade P0
3. **TASK-019**: Deploy na Vercel
4. **TASK-020**: Otimização e Lighthouse (Performance > 80)

### Melhorias recomendadas (RELATORIO-AUDIT-SITE.md)
- Integração Trustindex real (substituir cards estáticos)
- Testes manuais completos em todas as rotas/dispositivos
- Deploy na Vercel
- Otimização final de performance (Lighthouse > 80)

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
