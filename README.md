# TikTok Sync Fixer

Proyecto Next.js 15 con TypeScript para sincronización de inventario entre Shopify y TikTok Shop.

## Estructura del Proyecto

```
tiktok-sync-fixer/
├── app/                          # Next.js App Router
│   ├── api/                     # API Routes
│   │   ├── tiktok-shop/        # Endpoints TikTok Shop API
│   │   │   ├── inventory/update/
│   │   │   └── product/list/
│   │   └── stripe/             # Endpoints Stripe
│   │       └── webhook/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/                         # Utilidades y tipos
│   ├── tiktok-shop/
│   │   └── types.ts            # Tipos TypeScript para TikTok Shop API
│   └── stripe/
│       └── types.ts             # Tipos TypeScript para Stripe
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
└── .env.example
```

## 🚀 Quick Start

### 0. Crear Repositorio en GitHub (Primero)

Si aún no has creado el repositorio, sigue `QUICK_START.md` (3 pasos simples).

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Configurar Variables de Entorno

Copia `.env.example` a `.env.local` y completa las variables (ver `ENV_SETUP.md`).

### 3. Configurar Base de Datos

Ejecuta el schema SQL en Supabase (ver `supabase/README.md`).

### 4. Desarrollo Local

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### 5. Deploy a Producción

**⚠️ IMPORTANTE:** Haz deploy a Vercel ANTES de configurar webhooks.

1. Sigue las instrucciones en `VERCEL_DEPLOY.md`
2. Después del deploy, configura webhooks:
   - Clerk: `CLERK_SETUP.md`
   - Stripe: `lib/stripe-README.md`

## Endpoints Preparados

### TikTok Shop API
- `POST /api/tiktok-shop/inventory/update` - Actualizar inventario
- `GET /api/tiktok-shop/product/list` - Listar productos

### Stripe
- `POST /api/stripe/webhook` - Webhook para procesar pagos

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript** (modo estricto)
- **Tailwind CSS**
- **Stripe** (modo test)
- **TikTok Shop API**

## Próximos Pasos

Implementar la lógica de negocio en los endpoints preparados.

