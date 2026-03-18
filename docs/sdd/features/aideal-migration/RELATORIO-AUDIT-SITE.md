# Relatório de Auditoria Visual — Site A Ideal (Next.js)

## Metadata
- **Data**: 2026-03-18
- **Método**: agent-browser + MCP cursor-ide-browser
- **URL auditada**: http://localhost:3000
- **Páginas analisadas**: Home, Sobre nós, Contato, Acesso por Cordas
- **Objetivo**: Identificar falhas visuais, de organização e de estética para alinhar o site a padrões corporativos modernos

---

## 1. Resumo Executivo

O site em migração apresenta **problemas técnicos de imagens** (distorção, proporção), **inconsistências de layout** e **áreas vazias** em páginas de serviço. A comparação com sites corporativos de referência (OMC GROUP, KPI Engenharia, Belsys, MSE, GreyLogix) indica necessidade de ajustes em proporções de imagens, hierarquia visual, densidade de conteúdo e padronização de CTAs.

---

## 2. Falhas Técnicas Identificadas

### 2.1 Imagens distorcidas (P0 — Crítico)

| Imagem | Local | Problema | Causa provável |
|--------|-------|----------|----------------|
| `hero-paint.webp` | Home — Hero | Width ou height alterados via CSS sem manter proporção | `img { max-width: 100% }` global altera dimensões; falta `height: auto` |
| `brazil_01.webp` | Home — Seção Brasil | Mesmo aviso do Next.js | Container `.map-layout` ou grid altera dimensões sem `object-fit` |

**Evidência (log Next.js):**
```
Image with src "/assets/hero-paint.webp" has either width or height modified, but not the other.
Image with src "/assets/brazil_01.webp" has either width or height modified, but not the other.
```

**Correção recomendada:**
- Adicionar `style={{ width: "100%", height: "auto" }}` ou `objectFit: "contain"` nas imagens do hero e do mapa.
- Garantir que o container `.hero-media-frame` e `.map-layout div` não forcem altura fixa que estique a imagem.

### 2.2 Imagens externas em páginas de serviço (P1)

| Página | Problema | Causa |
|--------|----------|-------|
| Acesso por Cordas | Grande área branca vazia | Imagens em `https://aideal.com.br/...` podem falhar (CORS, rede, domínio) ou demorar a carregar |
| Outras páginas de serviço | Risco de falha de carregamento | Mesma dependência de URLs remotas |

**Correção recomendada:**
- Baixar imagens para `public/images/` (conforme DEC-003) ou usar fallback local quando `heroImage` falhar.
- Adicionar `onError` no componente Image para exibir placeholder ou imagem padrão.

### 2.3 Imagem circular em Sobre nós (P1)

- **Problema**: Imagem que deveria ser circular aparece em formato oval (esticada verticalmente).
- **Causa**: `border-radius: 50%` com container que não mantém aspect ratio 1:1.
- **Correção**: Garantir `aspect-ratio: 1` ou `width` e `height` iguais no container, e `object-fit: cover` na imagem.

---

## 3. Falhas por Página

### 3.1 Home (`/`)

| Item | Severidade | Descrição |
|------|------------|-----------|
| Hero | P0 | Imagem hero distorcida; visual escuro e pouco impactante |
| Menu | P2 | Em viewports ≤1090px o menu hamburger aparece — em tablets pode parecer “desktop” com hamburger; considerar breakpoint 1024px |
| Layout | P2 | Elementos desconectados; layout esparso em algumas seções |
| Sombras | P2 | Sombras pesadas (`box-shadow: 0 30px 60px`) em hero-media-frame; visual desatualizado |
| CTAs | P1 | Botão "FAÇA UM ORÇAMENTO" duplicado (hero + seção Brasil); padronizar e evitar redundância |
| Selo | P2 | Borda amarela/dourada em "SATISFAÇÃO GARANTIDA" fora do padrão de cores (vermelho/azul/verde) |

### 3.2 Sobre nós (`/sobre-nos`)

| Item | Severidade | Descrição |
|------|------------|-----------|
| Imagem principal | P1 | Formato oval em vez de circular/retangular consistente |
| Alinhamento | P2 | Inconsistência entre logo, menu e blocos de texto |
| Menu | P2 | Mesmo comportamento do hamburger em viewports médios |

### 3.3 Acesso por Cordas (`/acesso-por-cordas`)

| Item | Severidade | Descrição |
|------|------------|-----------|
| Área vazia | P0 | Grande área branca onde deveriam aparecer imagens ou conteúdo |
| CTAs | P1 | Botão "Faça um orçamento" repetido em Obras Realizadas e FAQ |
| Espaço em branco | P2 | Excessivo entre seções |

### 3.4 Contato (`/contato`)

| Item | Severidade | Descrição |
|------|------------|-----------|
| Layout | P2 | Revisar hierarquia e densidade do formulário + dados de contato |

---

## 4. Comparação com Sites Corporativos de Referência

Sites analisados: **OMC GROUP**, **KPI Engenharia**, **Belsys Engenharia**, **MSE**, **GreyLogix** (engenharia industrial, design atual).

### 4.1 Estética e formato de imagens

| Critério | Sites de referência | Site A Ideal (atual) |
|----------|---------------------|----------------------|
| Proporção | Imagens com aspect ratio preservado, `object-fit: cover` | Hero e mapa com distorção |
| Hero | Imagens de alta qualidade, bem iluminadas | Hero escuro, pouco impactante |
| Galeria | Grid uniforme, imagens quadradas ou 16:9 | Galeria ok; imagens externas podem falhar |

### 4.2 Organização do site

| Critério | Sites de referência | Site A Ideal (atual) |
|----------|---------------------|----------------------|
| Navegação desktop | Menu horizontal sempre visível em desktop | Hamburger a partir de 1090px |
| Hierarquia | Seções claras, espaçamento consistente | Algumas seções esparsas |
| CTAs | Um CTA principal por contexto | CTAs duplicados em várias seções |
| Footer | 3 colunas, dados de contato destacados | Estrutura similar; validar conteúdo |

### 4.3 Tamanho e consistência de imagens

| Critério | Sites de referência | Site A Ideal (atual) |
|----------|---------------------|----------------------|
| Logos clientes | Tamanho uniforme, altura controlada | `width={130} height={56}` — verificar se não distorce |
| Imagens de serviço | Proporção fixa (ex.: 4:3 ou 1:1) | Variável; algumas 667x1000, outras 700x700 |
| Hero | Largura total ou ~16:9 | Proporção alterada por CSS |

---

## 5. Recomendações por Prioridade

### P0 — Crítico (corrigir imediatamente)

1. **Imagens hero e mapa**: Adicionar `style={{ width: "100%", height: "auto" }}` ou `objectFit: "contain"` em `HomeSections.tsx` para `hero-paint.webp` e `brazil_01.webp`.
2. **Área vazia em Acesso por Cordas**: Implementar fallback para imagens externas; considerar download local das imagens.

### P1 — Alto

1. **Imagem Sobre nós**: Corrigir proporção (circular ou retangular consistente) com `aspect-ratio` e `object-fit`.
2. **CTAs duplicados**: Manter um CTA principal por seção; remover ou unificar repetições.
3. **Imagens remotas**: Avaliar migração para `public/images/` (DEC-003).

### P2 — Médio

1. **Breakpoint do menu**: Avaliar aumento para 1200px ou 1280px para manter menu horizontal em mais dispositivos.
2. **Sombras do hero**: Reduzir intensidade (`0 20px 40px` em vez de `0 30px 60px`).
3. **Selo "Satisfação garantida"**: Alinhar borda/cor ao design system (vermelho/azul/verde).
4. **Espaçamento**: Revisar `section-block` e gaps para densidade mais equilibrada.

---

## 6. Checklist de Implementação

- [x] Corrigir proporção de `hero-paint.webp` e `brazil_01.webp` (HomeSections.tsx)
- [x] Grid de serviços uniforme 3 colunas (como WordPress)
- [x] Header da seção serviços centralizado
- [x] Adicionar fallback/placeholder para imagens externas em ServicePage (SafeImage com fallbackSrc)
- [x] Corrigir imagem circular/oval em AboutPage (aspect-ratio: 1, object-fit: cover)
- [x] Reduzir duplicação de CTAs (hero, Brasil, Obras, FAQ) — CTA FAQ alterado para "Falar com especialista"
- [x] Revisar breakpoint do menu (Header + globals.css) — aumentado para 1200px
- [x] Suavizar sombras do hero-media-frame (0 20px 40px)
- [x] Padronizar selo "Satisfação garantida" com design system (verde alinhado ao brand)
- [ ] Baixar imagens de serviços para `public/images/` (opcional, conforme DEC-003)

### Atualização 2026-03-18 — Alinhamento com WordPress

- [x] Hero com imagem de fundo bandesk5.webp (estilo WordPress)
- [x] Badge hero em azul (+ de 20 anos...)
- [x] Selo "Satisfação garantida" em dourado
- [x] Seção "Especialistas em Pintura Industrial" (2 colunas, imagem 2149878738.webp)
- [x] Seção Clientes: grid com todos os logos visíveis (sem carousel)

---

## 7. Referências

- [REFERENCIA-PRINTS.md](./REFERENCIA-PRINTS.md) — Design system e estrutura do site WordPress
- [DECISIONS.md](./DECISIONS.md) — Decisões de migração (DEC-003: imagens)
- [PLAN.md](./PLAN.md) — Plano geral da migração
