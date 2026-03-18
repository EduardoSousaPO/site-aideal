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

## Histórico de Alterações

| Data | Decisão | Alteração | Motivo |
|------|---------|-----------|--------|
| 2026-03-18 | — | Criação inicial | Primeira versão dos DECISIONS |
| 2026-03-18 | DEC-002, DEC-005 | Menu documentado; URL WhatsApp com +55 | Análise dos 14 prints em `prints-site-atual/` |
