# TASKS: Migração WordPress → Next.js (A Ideal)

## Metadata
- **Feature ID**: FEAT-001
- **SPEC**: [SPEC.md](./SPEC.md)
- **PLAN**: [PLAN.md](./PLAN.md)
- **Data**: 2026-03-18

## Legenda de Status
- ⬜ Pendente
- 🔄 Em progresso
- ✅ Concluída
- ⏸️ Bloqueada
- ❌ Cancelada

## Tasks

### Fase 1: Setup e Infraestrutura

#### TASK-001: Inicializar projeto Next.js 14
- **Status**: ⬜
- **Prioridade**: P0
- **Estimativa**: 30 min
- **Dependências**: Nenhuma
- **Descrição**: Criar projeto com `create-next-app`, TypeScript, Tailwind, App Router. Configurar `tsconfig`, `next.config`.
- **Critério de Done**: `npm run dev` roda sem erros

#### TASK-002: Configurar Supabase
- **Status**: ⬜
- **Prioridade**: P0
- **Estimativa**: 20 min
- **Dependências**: TASK-001
- **Descrição**: Instalar `@supabase/supabase-js`, criar `lib/supabase.ts`, variáveis de ambiente. Criar tabela `contact_submissions` no Supabase.
- **Critério de Done**: Cliente Supabase conecta, tabela existe

#### TASK-003: Copiar conteúdo e mídia
- **Status**: ⬜
- **Prioridade**: P0
- **Estimativa**: 15 min
- **Dependências**: TASK-001
- **Descrição**: Copiar `aideal-clone/content/` e `aideal-clone/data/` para `data/` no projeto. Copiar mídias para `public/images/` ou configurar `remotePatterns` para aideal.com.br.
- **Critério de Done**: JSONs e imagens acessíveis no projeto

### Fase 2: Core (Conteúdo e Roteamento)

#### TASK-004: Criar lib de conteúdo
- **Status**: ⬜
- **Prioridade**: P0
- **Estimativa**: 45 min
- **Dependências**: TASK-003
- **Descrição**: Implementar `lib/content.ts`: `getAllSlugs()`, `getPageBySlug(slug)`, mapeamento `home-aideal` → `/`, `acesso-por-cordas-cloned-346` → `hidrojateamento` (DEC-001).
- **Critério de Done**: Funções retornam dados corretos para todas as páginas

#### TASK-005: Implementar roteamento dinâmico
- **Status**: ⬜
- **Prioridade**: P0
- **Estimativa**: 1h
- **Dependências**: TASK-004
- **Descrição**: Criar `app/[slug]/page.tsx` com `generateStaticParams`, `generateMetadata`. Página genérica que renderiza headings, paragraphs, images, buttons a partir do JSON.
- **Critério de Done**: Todas as 21 páginas acessíveis por slug

#### TASK-006: Implementar página Home
- **Status**: ⬜
- **Prioridade**: P0
- **Estimativa**: 1h
- **Dependências**: TASK-004
- **Descrição**: Criar `app/page.tsx` com layout específico da home: hero, serviços em grid, clientes, CTA. Usar dados de `home-aideal.json`.
- **Critério de Done**: Home renderiza com estrutura e conteúdo corretos

### Fase 3: Componentes e UI

#### TASK-007: Criar Header e Footer
- **Status**: ⬜
- **Prioridade**: P0
- **Estimativa**: 1h
- **Dependências**: TASK-004
- **Descrição**: Header com logo AIDEAL, menu: Home | Sobre nós | Serviços (dropdown) | Atestado Técnico | Clientes | Contato | CTA "FAÇA UM ORÇAMENTO". Footer 3 colunas: logo/redes (Instagram, LinkedIn), atendimento (62) 3442-1958, contato@aideal.com.br, endereço, Google Maps. Ver REFERENCIA-PRINTS.md.
- **Critério de Done**: Navegação funcional em todas as páginas

#### TASK-008: Componente WhatsAppButton
- **Status**: ⬜
- **Prioridade**: P1
- **Estimativa**: 20 min
- **Dependências**: Nenhuma
- **Descrição**: Componente reutilizável para links wa.me. URL: `https://wa.me/556293089724?text=Tenho%20interesse%20em%20receber%20um%20orcamento`. Incluir botão flutuante (canto inferior direito) e variante CTA.
- **Critério de Done**: Botões abrem WhatsApp corretamente

#### TASK-009: Componente CookieConsent
- **Status**: ⬜
- **Prioridade**: P1
- **Estimativa**: 45 min
- **Dependências**: TASK-001
- **Descrição**: Banner LGPD com aceitar/rejeitar, persistência em localStorage.
- **Critério de Done**: Banner exibido na primeira visita, preferência salva

#### TASK-010: Layout e design system
- **Status**: ⬜
- **Prioridade**: P1
- **Estimativa**: 1h
- **Dependências**: TASK-001
- **Descrição**: Definir cores (vermelho #E80000, azul #005596, verde #5cb85c, navy), tipografia sans-serif, badge "+ DE 20 ANOS...", selo "SATISFAÇÃO GARANTIDA". Configurar Tailwind. Ver REFERENCIA-PRINTS.md.
- **Critério de Done**: Variáveis CSS e classes consistentes

### Fase 4: Funcionalidades Avançadas

#### TASK-011: Formulário de contato e API
- **Status**: ⬜
- **Prioridade**: P1
- **Estimativa**: 1h
- **Dependências**: TASK-002
- **Descrição**: Criar formulário (nome, email, telefone, mensagem) e `app/api/contact/route.ts` que insere no Supabase.
- **Critério de Done**: Envio salva no Supabase, feedback ao usuário

#### TASK-012: Páginas PDF
- **Status**: ⬜
- **Prioridade**: P1
- **Estimativa**: 45 min
- **Dependências**: TASK-005
- **Descrição**: Tratar páginas com wordCount < 10: exibir viewer de PDF ou link de download. Páginas: manual-de-codigo-de-conduta, missao-visao-voleres, nota-institucional, politica_integrada_assinada, relatorio-de-iqualdade-salarial.
- **Critério de Done**: PDFs acessíveis nas páginas corretas

#### TASK-012b: Componente FAQ Accordion
- **Status**: ⬜
- **Prioridade**: P1
- **Estimativa**: 45 min
- **Dependências**: TASK-005
- **Descrição**: Criar FaqAccordion para páginas de serviço. Fundo azul escuro, container cinza claro, 4 perguntas por serviço. Padrão observado nos prints: Acesso por Cordas, Hidrojateamento, Jateamento, Borracha Líquida, Atestado Técnico.
- **Critério de Done**: FAQ renderizado nas páginas de serviço com conteúdo dos JSONs ou extração

#### TASK-013: Integração Trustindex (Google Reviews)
- **Status**: ⬜
- **Prioridade**: P2
- **Estimativa**: 30 min
- **Dependências**: TASK-006
- **Descrição**: Inserir widget Trustindex na seção "O que Falam de Nós" (iframe ou script).
- **Critério de Done**: Reviews do Google exibidos na home

#### TASK-014: SEO por página
- **Status**: ⬜
- **Prioridade**: P1
- **Estimativa**: 30 min
- **Dependências**: TASK-005
- **Descrição**: `generateMetadata` com title, description (yoast ou fallback para título).
- **Critério de Done**: Meta tags corretas em todas as páginas

### Fase 5: Design Moderno e Animações

#### TASK-015: Instalar e configurar GSAP
- **Status**: ⬜
- **Prioridade**: P2
- **Estimativa**: 30 min
- **Dependências**: TASK-001
- **Descrição**: Instalar gsap, @gsap/react. Configurar ScrollTrigger.
- **Critério de Done**: GSAP disponível para animações

#### TASK-016: Animações de scroll e entrada
- **Status**: ⬜
- **Prioridade**: P2
- **Estimativa**: 2h
- **Dependências**: TASK-015, TASK-006
- **Descrição**: Animações de fade-in, parallax leve em seções. Elementos que reagem ao scroll.
- **Critério de Done**: Home e páginas de serviço com animações suaves

#### TASK-017: Backgrounds artísticos (Canvas/WebGL)
- **Status**: ⬜
- **Prioridade**: P2
- **Estimativa**: 2h
- **Dependências**: TASK-001
- **Descrição**: Background decorativo em hero ou seções (Three.js ou Canvas 2D) — efeitos hipnóticos, matemáticos.
- **Critério de Done**: Pelo menos uma seção com background animado

### Fase 6: Testes e Deploy

#### TASK-018: Testes manuais e ajustes
- **Status**: ⬜
- **Prioridade**: P1
- **Estimativa**: 1h
- **Dependências**: TASK-011, TASK-012, TASK-014
- **Descrição**: Testar todas as páginas, links, formulário, responsividade.
- **Critério de Done**: Nenhum link quebrado, formulário funcional

#### TASK-019: Configurar Vercel e deploy
- **Status**: ⬜
- **Prioridade**: P0
- **Estimativa**: 30 min
- **Dependências**: TASK-018
- **Descrição**: Conectar repositório à Vercel, configurar env vars, deploy.
- **Critério de Done**: Site acessível em URL da Vercel

#### TASK-020: Otimização e Lighthouse
- **Status**: ⬜
- **Prioridade**: P2
- **Estimativa**: 45 min
- **Dependências**: TASK-019
- **Descrição**: Otimizar imagens, lazy load, verificar Core Web Vitals. Lighthouse Performance > 80.
- **Critério de Done**: Lighthouse verde em Performance

## Resumo

| Fase | Total | Pendente | Em Progresso | Concluída |
|------|-------|----------|-------------|-----------|
| Setup | 3 | 3 | 0 | 0 |
| Core | 3 | 3 | 0 | 0 |
| UI | 4 | 4 | 0 | 0 |
| Avançado | 5 | 5 | 0 | 0 |
| Design | 3 | 3 | 0 | 0 |
| Deploy | 3 | 3 | 0 | 0 |
| **Total** | **21** | **21** | **0** | **0** |
