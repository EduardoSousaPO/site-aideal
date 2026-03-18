# PLAN: Migração WordPress → Next.js (A Ideal)

## Metadata
- **Feature ID**: FEAT-001
- **SPEC**: [SPEC.md](./SPEC.md)
- **Autor**: SDD
- **Data**: 2026-03-18

## Visão Geral da Arquitetura

```
┌─────────────────────────────────────────────────────────────────┐
│                         Vercel (Deploy)                          │
├─────────────────────────────────────────────────────────────────┤
│  Next.js 14+ (App Router)                                        │
│  ├── app/                                                        │
│  │   ├── layout.tsx          # Layout global, Header, Footer     │
│  │   ├── page.tsx            # Home (/)                          │
│  │   ├── [slug]/page.tsx     # Páginas dinâmicas                 │
│  │   └── api/                # API routes (formulários)           │
│  ├── components/                                                 │
│  │   ├── Header.tsx, Footer.tsx                                  │
│  │   ├── CookieConsent.tsx                                        │
│  │   ├── WhatsAppButton.tsx                                       │
│  │   └── sections/           # Seções reutilizáveis               │
│  ├── lib/                                                         │
│  │   ├── content.ts          # Leitura dos JSONs                  │
│  │   └── supabase.ts         # Cliente Supabase                   │
│  └── public/                                                      │
│      └── images/              # Mídias (ou CDN)                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Supabase                                                        │
│  ├── leads / contact_submissions                                 │
│  └── cookie_consent (opcional, ou localStorage)                  │
└─────────────────────────────────────────────────────────────────┘
```

## Componentes Afetados

### Backend
| Componente | Ação | Descrição |
|------------|------|-----------|
| `app/api/contact/route.ts` | Criar | POST para salvar formulário no Supabase |
| `lib/supabase.ts` | Criar | Cliente Supabase server/client |
| `lib/content.ts` | Criar | Funções para ler JSONs de conteúdo |

### Frontend
| Componente | Ação | Descrição |
|------------|------|-----------|
| `app/layout.tsx` | Criar | Layout raiz, metadata global |
| `app/page.tsx` | Criar | Home (dados de home-aideal.json) |
| `app/[slug]/page.tsx` | Criar | Página dinâmica por slug |
| `components/Header.tsx` | Criar | Menu (dropdown Serviços), logo, CTA WhatsApp. Ver [REFERENCIA-PRINTS.md](./REFERENCIA-PRINTS.md) |
| `components/Footer.tsx` | Criar | 3 colunas: logo/redes, atendimento (tel, email, endereço), mapa |
| `components/CookieConsent.tsx` | Criar | Banner LGPD |
| `components/WhatsAppButton.tsx` | Criar | Botão flutuante + CTA. URL: wa.me/556293089724 |
| `components/FaqAccordion.tsx` | Criar | Accordion para páginas de serviço |
| `components/sections/*` | Criar | Hero, Services, Clients, ObrasRealizadas, etc. |

### Banco de Dados
| Tabela/Collection | Ação | Descrição |
|-------------------|------|-----------|
| `contact_submissions` ou `leads` | Criar | Nome, email, telefone, mensagem, created_at |

## Modelo de Dados

```sql
-- Tabela para formulários de contato
CREATE TABLE contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT,
    source TEXT DEFAULT 'website',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: permitir insert anônimo, select apenas autenticado
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert" ON contact_submissions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated select" ON contact_submissions
    FOR SELECT USING (auth.role() = 'authenticated');
```

## API Endpoints

### POST /api/contact
- **Descrição**: Recebe dados do formulário e persiste no Supabase
- **Auth**: Pública (com rate limit recomendado)
- **Request Body**:
```json
{
  "name": "string",
  "email": "string",
  "phone": "string?",
  "message": "string"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Mensagem enviada com sucesso"
}
```

## Fluxo de Dados

1. **Build**: Next.js lê JSONs de `aideal-clone/content/pages/` e gera páginas estáticas (SSG)
2. **Navegação**: Cliente acessa rota → Next.js serve página pré-renderizada
3. **Formulário**: Usuário preenche → POST /api/contact → Supabase insert → Resposta
4. **Imagens**: Next/Image com `remotePatterns` para aideal.com.br ou imagens locais em `/public`

## Estratégia de Testes

- **Unitários**: Funções em `lib/content.ts` (mapeamento slug, leitura JSON)
- **Integração**: API /api/contact com Supabase (mock ou test DB)
- **E2E**: Navegação principal, envio de formulário, clique WhatsApp

## Considerações de Segurança

- Variáveis `NEXT_PUBLIC_SUPABASE_URL` e `SUPABASE_ANON_KEY` em env (não commitar)
- Rate limit em /api/contact (ex: 5 req/min por IP)
- Sanitização de inputs no backend
- Cookie consent antes de qualquer tracking

## Plano de Rollback

- Manter WordPress em produção até validação completa
- Deploy em subdomínio (ex: novo.aideal.com.br) para testes
- Rollback na Vercel: redeploy da versão anterior

## Design System (REFERENCIA-PRINTS.md)

- **Cores**: Vermelho #E80000, Azul #005596, Verde CTAs #5cb85c, Navy (hero/FAQ)
- **Componentes**: Badge "+ DE 20 ANOS...", Selo "SATISFAÇÃO GARANTIDA", FAQ accordion, Galeria "Obras Realizadas"
- **Footer**: Telefone (62) 3442-1958, contato@aideal.com.br, Rua Apucarana S/N, QD-66-A, Trindade-GO

## Estimativa de Complexidade

| Área | Complexidade | Justificativa |
|------|--------------|---------------|
| Backend | Baixa | API simples, Supabase já configurado |
| Frontend | Alta | 21 páginas, design custom, animações, componentes |
| Database | Baixa | Uma tabela, RLS simples |
