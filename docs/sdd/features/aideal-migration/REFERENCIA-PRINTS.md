# Referência Visual — Prints do Site WordPress Atual

## Metadata
- **Fonte**: 14 prints em `prints-site-atual/`
- **Data da análise**: 2026-03-18
- **Objetivo**: Documentar estrutura, design e conteúdo observados para guiar a migração

---

## 1. Header e Navegação

### Menu Principal (Desktop)
| Ordem | Item | Tipo | Destino |
|-------|------|------|---------|
| 1 | Home | Link | `/` |
| 2 | Sobre nós | Link | `/sobre-nos` |
| 3 | Serviços | Dropdown | — |
| 4 | Atestado Técnico | Link | `/atestado-tecnico` |
| 5 | Clientes | Link | `#clientes` ou `/` (âncora) |
| 6 | Contato | Link | `/contato` ou âncora |
| — | **FAÇA UM ORÇAMENTO** | CTA (botão verde) | WhatsApp |

### Dropdown "Serviços"
1. Acesso por Cordas
2. Hidrojateamento
3. Jateamento Abrasivo
4. Pintura Industrial Anticorrosiva
5. Piso Industrial Uretano
6. Piso Industrial MMA
7. Revestimento de Borracha líquida

*Nota: No site há 12 páginas de serviços. O dropdown mostra 7. Os demais (Isolamento Térmico, Montagem Andaime Tobo Roll, Montagem de Quick Deck, Piso Industrial Epoxi) podem estar em submenu ou na página Clientes.*

### Menu Alternativo (Mobile/Compacto)
Print 162306 mostra header amarelo com lista densa de todos os links:
- Institucional: A Ideal, Sobre nós, Missão – Visão – Valores
- Serviços: todos listados
- Legal: Manual de Código de Conduta, Nota Institucional, Política de Privacidade, Política Integrada, Relatório Igualdade Salarial, Termos de Uso

---

## 2. WhatsApp — Dados Confirmados

| Campo | Valor |
|-------|-------|
| Número | 6293089724 (DDD 62, Goiás) |
| URL completa | `https://wa.me/556293089724?text=Tenho%20interesse%20em%20receber%20um%20orcamento` |
| Mensagem padrão | "Tenho interesse em receber um orçamento" |
| Uso | Botão header, CTAs em páginas, botão flutuante |

*Confirmado pelo usuário: o CTA "Faça um orçamento" direciona para este número.*

---

## 3. Footer

### Estrutura (3 colunas)
| Coluna | Conteúdo |
|--------|----------|
| Esquerda | Logo AIDEAL (branco), REDES SOCIAIS (Instagram, LinkedIn) |
| Centro | ATENDIMENTO: Telefone (62) 3442-1958, Email contato@aideal.com.br, Endereço |
| Direita | Google Maps (embed) |

### Dados de Contato
- **Telefone**: (62) 3442-1958
- **Email**: contato@aideal.com.br
- **Endereço**: Rua Apucarana, S/N, QD-66-A, Jardim Marista - Trindade - GO CEP: 75383-372
- *Obs.: Um print mostrou QD-88-A — validar no site ao vivo.*

### Barra Inferior
- Copyright: "Todos os direitos Autorais Reservados A Ideal 2010 – 2026"
- Botão flutuante WhatsApp (canto inferior direito)

---

## 4. Design System (Extraído dos Prints)

### Paleta de Cores
| Uso | Cor | Hex (aprox.) |
|-----|-----|--------------|
| Vermelho (ênfase, badge) | #C32127 / #E80000 / #c00000 | — |
| Azul (logo, links, headings) | #005596 / #0070c0 / #007bff | — |
| Verde (CTAs, checkmarks) | #5cb85c / #66CC66 / #5CCB74 | — |
| Azul escuro (hero, FAQ) | Navy | #001a33 ou similar |
| Fundo branco | #FFFFFF | — |
| Cinza claro (cards, FAQ) | #F5F5F5 / #F9F9F9 | — |
| Amarelo (footer alt., badge) | — | Usado em variações |

### Tipografia
- Sans-serif moderna (Roboto, Open Sans, Montserrat ou similar)
- Headings em bold, corpo em peso normal
- Palavras-chave em vermelho ou azul nos títulos

### Componentes Recorrentes
| Componente | Descrição |
|------------|-----------|
| Badge hero | Pill vermelho: "+ DE 20 ANOS ATENDENDO TODO O BRASIL" |
| Selo confiança | Círculo dourado: "SATISFAÇÃO GARANTIDA" / "DESDE 1997" |
| CTA principal | Botão verde retangular: "FAÇA UM ORÇAMENTO" |
| Cards de serviço | Fundo branco, sombra, ícone check vermelho, link "CLIQUE AQUI E CONHEÇA" |
| FAQ | Fundo azul escuro, container cinza claro, accordion |
| Galeria "Obras Realizadas" | 5 imagens em linha, cantos arredondados |

---

## 5. Seções por Tipo de Página

### Home
- Hero (imagem, badge, H1, selo)
- Intro "Especialistas em Pintura Industrial"
- Grid de serviços (9 cards)
- "Atendemos em todo o Brasil" (mapa Brasil, 3 checkmarks)
- "Alguns Clientes" (logos)
- "O que Falam de Nós" (Trustindex carousel, 4.6/5, 12 reviews)
- CTA final

### Páginas de Serviço (ex.: Acesso por Cordas, Hidrojateamento, Jateamento, Borracha Líquida, Atestado Técnico)
- Hero (badge, título do serviço, CTA)
- "Principais Vantagens" (2 colunas: imagem + texto com checkmarks)
- "Obras Realizadas" (galeria 5 imagens)
- "Perguntas Frequentes" (accordion, 4 itens)
- CTA antes/depois do FAQ

### Sobre Nós
- "Quem Somos" (Missão, Visão, imagem circular)
- "Nossos Valores" (6 ícones: Responsabilidade Social, Valorização Humana, Transparência, Ética, Qualidade, Pontualidade)
- Texto detalhado com imagens

---

## 6. Trustindex (Google Reviews)

- **Seção**: "O que Falam de Nós"
- **Layout**: Carousel horizontal de cards
- **Conteúdo por card**: Foto/iniciais, nome, data, ícone Google, 5 estrelas, texto
- **Resumo**: "Avaliação totalizada Google 4.6 de 5, com base em 12 avaliações"
- **Implementação sugerida**: iframe ou script Trustindex (AMB-001)

---

## 7. FAQ — Padrão por Serviço

Cada página de serviço tem FAQ com 4 perguntas. Exemplos:
- **Acesso por Cordas**: "O que é o serviço de acesso por cordas e quando ele é indicado?"
- **Hidrojateamento**: "O que é o hidrojateamento e para que ele é utilizado?"
- **Jateamento Abrasivo**: "O que é o jateamento abrasivo e qual sua função na pintura industrial?"
- **Borracha Líquida**: "Para quais aplicações o revestimento com borracha líquida é indicado?"
- **Atestado Técnico**: "Quais certificações e qualificações a Ideal possui?"

*Os JSONs extraídos podem não conter o conteúdo completo do FAQ — verificar em `content/pages/`.*

---

## 8. Resolução de Ambiguidades (DECISIONS)

| Item | Resolução com base nos prints |
|------|-------------------------------|
| **DEC-002 Menu** | ✅ Estrutura completa documentada acima |
| **AMB-003 Formulário** | Página "Contato" existe no menu; não há print do formulário. Provável página dedicada com formulário + dados de contato. |
| **AMB-001 Trustindex** | Carousel de cards com rating. iframe é opção segura para manter layout idêntico. |
| **RF-04 WhatsApp** | URL confirmada: `wa.me/556293089724` (com código país 55) |

---

## 9. Checklist de Implementação (baseado nos prints)

- [ ] Header com logo, menu (dropdown Serviços), CTA WhatsApp
- [ ] Footer com 3 colunas, mapa, redes sociais
- [ ] Botão flutuante WhatsApp
- [ ] Badge "+ DE 20 ANOS ATENDENDO TODO O BRASIL"
- [ ] Selo "SATISFAÇÃO GARANTIDA / DESDE 1997"
- [ ] Componente FAQ (accordion)
- [ ] Galeria "Obras Realizadas" (5 imagens)
- [ ] Seção "Principais Vantagens" (2 colunas)
- [ ] Trustindex na home
- [ ] Design system (cores, tipografia)
