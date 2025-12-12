# 🚀 Deploy a Vercel

## 📋 Pasos para Deploy

### 1. Preparar el Proyecto

Asegúrate de que tu proyecto esté listo:

```bash
# Verificar que el build funciona localmente
npm run build
```

Si hay errores, corrígelos antes de hacer deploy.

### 2. Crear Cuenta en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Crea una cuenta (puedes usar GitHub para conectar)
3. Haz clic en **"Add New Project"**

### 3. Conectar Repositorio

**⚠️ IMPORTANTE:** Primero debes crear el repositorio en GitHub (ver `GITHUB_SETUP.md`)

**Opción A: Desde GitHub (Recomendado)**
1. En Vercel, haz clic en **"Add New Project"**
2. Conecta tu cuenta de GitHub si no está conectada
3. Selecciona el repositorio `tiktok-sync-fixer`
4. Vercel detectará automáticamente que es un proyecto Next.js

**Opción B: Deploy Manual**
1. Instala Vercel CLI:
   ```bash
   npm i -g vercel
   ```
2. En la raíz del proyecto:
   ```bash
   vercel
   ```
3. Sigue las instrucciones en la terminal

### 4. Configurar Variables de Entorno en Vercel

En el dashboard de Vercel, ve a **Settings → Environment Variables** y agrega:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Stripe (Test Mode)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# TikTok Shop API (opcional por ahora)
TIKTOK_SHOP_APP_KEY=...
TIKTOK_SHOP_APP_SECRET=...

# App URL (se actualiza automáticamente, pero puedes agregarlo)
NEXT_PUBLIC_APP_URL=https://tu-proyecto.vercel.app
```

**⚠️ IMPORTANTE:**
- NO agregues `CLERK_WEBHOOK_SECRET` todavía (lo harás después de configurar el webhook)
- NO agregues `STRIPE_WEBHOOK_SECRET` todavía (lo harás después de configurar el webhook)

### 5. Hacer Deploy

**Si usas GitHub:**
- Haz push a tu repositorio
- Vercel desplegará automáticamente

**Si usas CLI:**
```bash
vercel --prod
```

### 6. Verificar Deploy

1. Espera a que el deploy termine (verás la URL en el dashboard)
2. Visita tu URL: `https://tu-proyecto.vercel.app`
3. Verifica que la landing page carga correctamente

### 7. Obtener URL de Producción

Copia la URL de tu proyecto:
```
https://tu-proyecto.vercel.app
```

Esta URL la necesitarás para:
- Configurar webhook de Clerk
- Configurar webhook de Stripe

## ✅ Checklist Pre-Deploy

- [ ] `npm run build` funciona sin errores
- [ ] Variables de entorno preparadas (sin webhook secrets todavía)
- [ ] Repositorio conectado a Vercel o CLI instalado
- [ ] Proyecto desplegado y accesible

## 🔄 Próximos Pasos

Después del deploy:
1. **Configurar Webhook de Clerk** (ver `CLERK_SETUP.md`)
2. **Configurar Webhook de Stripe** (ver `lib/stripe-README.md`)

## 🐛 Troubleshooting

**Error: "Build failed"**
- Revisa los logs en Vercel Dashboard
- Verifica que todas las dependencias estén en `package.json`
- Asegúrate de que `npm run build` funciona localmente

**Error: "Environment variables missing"**
- Verifica que todas las variables estén en Vercel Dashboard
- Reinicia el deploy después de agregar variables

**Error: "Module not found"**
- Verifica que todas las dependencias estén instaladas
- Ejecuta `npm install` localmente y haz commit de `package-lock.json`

