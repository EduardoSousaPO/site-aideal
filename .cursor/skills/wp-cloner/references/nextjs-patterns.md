# Referências: Padrões Next.js 14 para migração WordPress

## App Router (obrigatório no Next.js 14)

Sempre usar App Router — não Pages Router.

```
app/
├── layout.tsx        # Layout raiz (html, body, header, footer)
├── page.tsx          # Homepage /
├── sobre-nos/
│   └── page.tsx      # /sobre-nos
└── [slug]/
    └── page.tsx      # Rota dinâmica (opcional)
```

## Metadata (SEO)

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Título da Página | Nome do Site',
  description: 'Descrição de 150-160 caracteres',
  openGraph: {
    title: 'Título OG',
    description: 'Descrição OG',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
}
```

## Imagens com next/image

```tsx
import Image from 'next/image'

// Imagem local (em public/)
<Image src="/images/banner.jpg" alt="Banner" width={1200} height={600} />

// Imagem externa (precisa configurar em next.config.js)
<Image src="https://aideal.com.br/wp-content/uploads/..." fill alt="..." />
```

## Componente Server vs Client

- Por padrão, tudo é Server Component (sem `'use client'`)
- Usar `'use client'` apenas quando precisa de: hooks (useState, useEffect), eventos (onClick), browser APIs
- Header com menu mobile precisa de `'use client'`

## Variáveis de ambiente

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=...   # Exposto ao browser
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_KEY=...       # Só servidor (sem NEXT_PUBLIC_)
```

## Formulário de contato com Supabase

```tsx
// app/contato/page.tsx
'use client'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function handleSubmit(formData: FormData) {
  const { error } = await supabase
    .from('contatos')
    .insert({
      nome: formData.get('nome'),
      email: formData.get('email'),
      mensagem: formData.get('mensagem'),
    })
}
```

## Deploy Vercel

```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "next build",
  "outputDirectory": ".next"
}
```

Variáveis de ambiente configurar no dashboard da Vercel em Settings > Environment Variables.

## Tailwind utilities comuns

```css
/* Container responsivo */
.container-custom { @apply max-w-6xl mx-auto px-4 sm:px-6 lg:px-8; }

/* Seção com padding vertical */
<section className="py-16 md:py-24">

/* Grid responsivo */
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

/* Cores de texto */
className="text-gray-900"    /* Título */
className="text-gray-600"    /* Subtítulo */
className="text-gray-400"    /* Caption */
```

## WhatsApp link (comum em sites brasileiros)

```tsx
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511999999999'
const message = encodeURIComponent('Olá! Gostaria de um orçamento.')

<a
  href={`https://wa.me/${WHATSAPP}?text=${message}`}
  target="_blank"
  rel="noopener noreferrer"
  className="btn-primary"
>
  WhatsApp
</a>
```
