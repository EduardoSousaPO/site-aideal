# SPEC: Migração WordPress → Next.js (A Ideal Soluções Anticorrosivas)

## Metadata
- **Feature ID**: FEAT-001
- **Autor**: SDD
- **Data**: 2026-03-18
- **Status**: Em desenvolvimento (≈95% concluído) — Sprint D (Redesign Visual) concluído
- **Última atualização**: 2026-03-18

## Resumo

Migrar o site institucional da A Ideal Soluções Anticorrosivas (aideal.com.br) de WordPress para Next.js/React, preservando toda a copy, mídia e estrutura, com design moderno, animações avançadas e integração Supabase para formulários. Deploy na Vercel.

## Problema

O site atual em WordPress está lento, com performance ruim e funcionamento inadequado. A stack atual (Elementor, múltiplos plugins) gera sobrecarga e dificulta manutenção. É necessário uma solução moderna, performática e escalável.

## Solução Proposta

Recriar o site em Next.js 14+ com React, utilizando o conteúdo extraído via wp-cloner (`aideal-clone`), Supabase para dados dinâmicos (formulários, leads), e deploy na Vercel. Design moderno com efeitos visuais (GSAP, Canvas/WebGL), layouts complexos (Grid/Flexbox) e elementos interativos que reagem a scroll, mouse e toque.

## Requisitos Funcionais

### RF-01: Migração de Conteúdo
- **Descrição**: Todas as 21 páginas do site WordPress devem ser recriadas com copy, headings, parágrafos e estrutura preservados.
- **Entrada**: JSONs em `aideal-clone/content/pages/` e `aideal-clone/data/`
- **Saída**: Páginas Next.js renderizando conteúdo equivalente
- **Regras**: Home em `/`, demais páginas em `/[slug]`. Slug `home-aideal` mapeia para `/`.

### RF-02: Migração de Mídia
- **Descrição**: 172 itens de mídia (imagens, PDFs) devem estar disponíveis no novo site.
- **Entrada**: `aideal-clone/data/media.json`, URLs em `extraction-summary.json`
- **Saída**: Imagens otimizadas (Next/Image), PDFs acessíveis
- **Regras**: Imagens com alt text, srcset quando disponível. PDFs em páginas específicas (Manual de Código, Missão/Visão/Valores, Nota Institucional, Política Integrada, Relatório Igualdade Salarial)

### RF-03: Navegação e Menu
- **Descrição**: Menu principal e footer devem permitir navegação entre todas as páginas relevantes.
- **Entrada**: Estrutura documentada em [REFERENCIA-PRINTS.md](./REFERENCIA-PRINTS.md) (extraída dos prints do site atual)
- **Saída**: Header com menu (dropdown Serviços), Footer com 3 colunas (logo/redes, atendimento, mapa)
- **Regras**: Menu desktop: Home | Sobre nós | Serviços (dropdown) | Atestado Técnico | Clientes | Contato | CTA WhatsApp. Footer: telefone (62) 3442-1958, email contato@aideal.com.br, endereço, Instagram, LinkedIn, Google Maps

### RF-04: Integração WhatsApp
- **Descrição**: CTAs "faça um orçamento" e similares devem abrir WhatsApp com mensagem pré-definida.
- **Entrada**: URL `https://wa.me/556293089724?text=Tenho%20interesse%20em%20receber%20um%20orcamento` (DEC-005)
- **Saída**: Botões funcionais que abrem WhatsApp (web ou app)
- **Regras**: Links internos "CLIQUE AQUI E CONHEÇA" devem apontar para páginas corretas do novo site. Botão flutuante no canto inferior direito em todas as páginas.

### RF-05: Formulários e Supabase
- **Descrição**: Formulários de contato/orçamento devem persistir dados no Supabase.
- **Entrada**: Dados do formulário (nome, email, telefone, mensagem)
- **Saída**: Registro em tabela Supabase, feedback ao usuário
- **Regras**: Validação client-side, LGPD (cookie consent antes de analytics)

### RF-06: Cookie Consent (LGPD)
- **Descrição**: Banner de consentimento de cookies conforme LGPD, equivalente ao plugin Adopt do WordPress.
- **Entrada**: Preferência do usuário (aceitar/rejeitar)
- **Saída**: Estado persistido, scripts de analytics condicionais
- **Regras**: Exibir na primeira visita, permitir alteração posterior

### RF-07: SEO
- **Descrição**: Meta tags, títulos e descrições por página, equivalente ao Yoast SEO.
- **Entrada**: Dados de `seo` nos JSONs (quando disponíveis), título da página
- **Saída**: `<title>`, `<meta name="description">`, Open Graph
- **Regras**: Fallback para título da página quando yoast vazio

### RF-08: Avaliações Google (Trustindex)
- **Descrição**: Seção "O que Falam de Nós" com avaliações do Google.
- **Entrada**: Widget Trustindex ou API alternativa
- **Saída**: Exibição de reviews do Google
- **Regras**: Manter funcionalidade equivalente ao shortcode `[trustindex no-registration=google]`

### RF-09: Páginas PDF
- **Descrição**: Páginas que exibem apenas PDF embarcado (Manual de Código, Missão/Visão/Valores, Nota Institucional, Política Integrada, Relatório Igualdade Salarial).
- **Entrada**: URLs dos PDFs em `media.json`
- **Saída**: Página com viewer de PDF ou link de download
- **Regras**: Manter URLs amigáveis (slug da página)

### RF-10: Design Moderno e Interativo
- **Descrição**: Layout com Grid/Flexbox, animações (GSAP/CSS keyframes), efeitos de scroll, backgrounds artísticos (Canvas/WebGL).
- **Entrada**: Conteúdo estruturado dos JSONs; design system em [REFERENCIA-PRINTS.md](./REFERENCIA-PRINTS.md)
- **Saída**: UI moderna, responsiva, com micro-interações
- **Regras**: Manter identidade visual: vermelho (#E80000), azul (#005596), verde CTAs (#5cb85c), badge "+ DE 20 ANOS ATENDENDO TODO O BRASIL", selo "SATISFAÇÃO GARANTIDA / DESDE 1997", componentes FAQ accordion e galeria "Obras Realizadas"

## Requisitos Não-Funcionais

- **Performance**: LCP < 2.5s, FID < 100ms, CLS < 0.1 (Core Web Vitals)
- **Segurança**: Variáveis sensíveis em env, validação de inputs em formulários
- **Escalabilidade**: SSG/ISR para páginas estáticas, API routes para formulários
- **Acessibilidade**: Contraste adequado, navegação por teclado, alt em imagens

## Critérios de Aceite

- [x] CA-01: Todas as 21 páginas acessíveis e com conteúdo correto
- [x] CA-02: Imagens carregando com Next/Image (otimização automática)
- [x] CA-03: Menu e footer navegáveis em todas as páginas
- [x] CA-04: Botões WhatsApp abrindo conversa correta
- [x] CA-05: Formulário de contato salvando no Supabase
- [x] CA-06: Cookie consent exibido e funcional
- [x] CA-07: Meta tags SEO por página
- [x] CA-08: Páginas PDF exibindo ou permitindo download
- [x] CA-09: Site responsivo (mobile, tablet, desktop)
- [ ] CA-10: Deploy na Vercel funcionando
- [ ] CA-11: Lighthouse Performance > 80

## Fora do Escopo

- Blog ou posts (0 posts no WordPress)
- Sistema de autenticação de usuários
- E-commerce
- Migração do WordPress em tempo real (conteúdo estático da extração)

## Dependências

- Supabase (MCP já conectado)
- Conta Vercel
- Conteúdo em `aideal-clone/`
- Trustindex ou alternativa para reviews Google

## Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Trustindex não funcionar em React | Média | Médio | Usar iframe ou API Trustindex; fallback para link ao Google |
| PDFs muito grandes | Baixa | Baixo | Hospedar em CDN, usar viewer leve |
| Menu sem estrutura do WP | Alta | Baixo | Reconstruir manualmente a partir das páginas |
| Slug duplicado (acesso-por-cordas) | Média | Médio | Usar slug `hidrojateamento` para página clonada (DEC-001) |

## Documentos SDD

- [STATUS.md](./STATUS.md) — O que foi feito e o que falta
- [TASKS.md](./TASKS.md) — Lista de tasks com status
- [PLAN.md](./PLAN.md) — Arquitetura técnica

## Referências

- `aideal-clone/data/extraction-summary.json`
- `aideal-clone/content/content-index.json`
- [REFERENCIA-PRINTS.md](./REFERENCIA-PRINTS.md) — Estrutura visual extraída dos 14 prints do site atual
- Site original: https://aideal.com.br
- Plugins WordPress (PDF): Elementor, Yoast, Adopt, Joinchat, Trustindex, Smush
