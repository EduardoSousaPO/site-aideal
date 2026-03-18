# Relatório Frontend Design — Análise por Página

## Contexto
- Data: 2026-03-18
- Skill utilizada: `frontend-design`
- Escopo: todas as rotas públicas do site Next.js (home, contato, sobre, serviços, páginas legais e PDFs)
- Direção visual recomendada: **Industrial Editorial** (tipografia forte, blocos técnicos claros, contraste alto, informação escaneável)
- Status de execução: **Sprints A, B e C implementados em 2026-03-18**

---

## Melhorias globais (aplicar em todo o site)

1. Estruturar tokens de design por tipo de página (`home`, `service`, `institutional`, `legal`, `pdf`) para reduzir uso de estilos inline.
2. Criar escala tipográfica consistente (`display`, `h1`, `h2`, `body-lg`, `body`) com ritmo vertical fixo por breakpoint.
3. Padronizar “blocos de prova” em todas as páginas de serviço: certificações, segmentos atendidos, escopo técnico, CTA final.
4. Substituir cards estáticos de review por Trustindex real (ou iframe com fallback) para credibilidade contínua.
5. Unificar padrões de imagem: grid 16:9 para galeria e fallback local sempre ativo para qualquer mídia remota.
6. Melhorar microinterações: `hover`, `focus-visible`, entrada por scroll com stagger curto e consistente.
7. Em páginas legais/PDF, usar layout documental (índice, data de revisão, download e versão) em vez de layout comercial.

---

## Melhorias por rota

| Rota | Tipo | Melhorias recomendadas | Prioridade |
|------|------|-------------------------|------------|
| `/` | Home | Reforçar hero com proposta de valor técnica + métricas (anos, obras, estados); reduzir ruído visual no fundo; manter 1 CTA principal e 1 secundário contextual | P0 |
| `/sobre-nos` | Institucional | Trocar bloco textual longo por narrativa em 3 módulos (História, Método, Diferenciais); transformar valores em cards com ícones e descrição curta | P1 |
| `/contato` | Contato | Adicionar badge de SLA (“retorno em até X horas”), opções rápidas (WhatsApp/Telefone/E-mail) e mapa com ações claras | P1 |
| `/acesso-por-cordas` | Serviço | Inserir bloco “Segurança e Normas” (NR-35/IRATA), fluxo de execução em etapas e prova de segurança operacional | P1 |
| `/hidrojateamento` | Serviço | Criar seção técnica com faixa de pressão, aplicações e tipos de resíduos removidos; destacar quando hidrojateamento supera abrasivo | P1 |
| `/jateamento-abrasivo` | Serviço | Exibir padrões de preparação de superfície (ex.: Sa) e matriz substrato x abrasivo para decisão rápida | P1 |
| `/pintura-industrial-anticorrosiva` | Serviço | Página mais rica em mídia: converter galeria em sequência de casos com contexto (problema, solução, resultado) | P1 |
| `/piso-industrial-uretano` | Serviço | Incluir comparação objetiva com MMA e Epóxi (resistência química, cura, temperatura) | P1 |
| `/piso-industrial-mma` | Serviço | Reforçar diferencial de cura rápida e janela de operação com tabela de tempos por temperatura | P1 |
| `/piso-industrial-epoxy` | Serviço | Mostrar limitações e aplicações ideais para reduzir ambiguidade comercial | P1 |
| `/revestimento-de-borracha-liquida` | Serviço | Adicionar matriz de compatibilidade química e cenários típicos de uso industrial | P1 |
| `/isolamento-termico` | Serviço | Incluir bloco de impacto energético (antes/depois) e seção de materiais aplicados | P2 |
| `/montagem-andaime-tobo-roll` | Serviço | Inserir bloco com classes de carga, inspeção e checklist de liberação | P2 |
| `/montagem-de-quick-deck` | Serviço | Hoje com pouca mídia: criar seção processual visual (planejamento, montagem, inspeção, entrega) | P1 |
| `/atestado-tecnico` | Serviço/Documento | Reestruturar como centro documental (certificados, ART, laudos) com download e validade | P0 |
| `/politica-de-privacidade` | Legal | Aplicar layout de leitura com índice lateral, âncoras e data de atualização no topo | P1 |
| `/termos-de-uso` | Legal | Mesmo padrão documental da privacidade; remover tom comercial no bloco final | P1 |
| `/manual-de-codigo-de-conduta` | PDF | Incluir card de metadados (versão, data, responsável) e fallback “abrir em nova aba” explícito | P2 |
| `/missao-visao-voleres` | PDF | Corrigir naming visual para “Valores” na UI e manter slug legado apenas técnico | P1 |
| `/nota-institucional` | PDF | Melhorar contexto com resumo executivo acima do viewer | P2 |
| `/politica_integrada_assinada` | PDF | Normalizar título legível e incluir “última revisão” | P2 |
| `/relatorio-de-iqualdade-salarial` | PDF | Exibir resumo dos principais números antes do PDF para leitura rápida | P2 |

---

## Backlog recomendado (execução)

1. Sprint A (P0/P1): Home, Sobre, Contato, Atestado Técnico, Serviços com maior tráfego. ✅
2. Sprint B (P1): Páginas legais e padronização de narrativa técnica por serviço. ✅
3. Sprint C (P2): Páginas PDF e refinos de motion/microinteração. ✅

---

## Pendências Pós-Sprint

1. Integrar Trustindex real na Home (substituir reviews estáticos).
2. Executar bateria de testes manuais ponta a ponta (desktop/tablet/mobile).
3. Publicar em Vercel e concluir otimização de performance (Lighthouse > 80).

---

## Observações técnicas

- O site já tem boa base de componentes (`HomeSections`, `ServicePage`, `AboutPage`, `GenericPage`, `PdfPage`), então a maior parte das melhorias pode ser feita com evolução de layout e conteúdo, sem refatoração estrutural pesada.
- A migração definitiva de imagens para `public/images` (DEC-003) continua recomendada para reduzir risco operacional e melhorar consistência visual.
