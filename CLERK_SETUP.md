# Configuración de Clerk

## ⚠️ ORDEN IMPORTANTE

**Primero:** Haz deploy a Vercel (ver `VERCEL_DEPLOY.md`)  
**Después:** Configura el webhook de Clerk con la URL de producción

---

## 📋 Pasos para Configurar Clerk

### 1. Crear cuenta en Clerk

1. Ve a [clerk.com](https://clerk.com)
2. Crea una cuenta gratuita
3. Crea una nueva aplicación

**Nota:** Clerk generará automáticamente las keys necesarias. No necesitas configurarlas manualmente al inicio.

### 2. Obtener API Keys

1. En Clerk Dashboard, ve a **API Keys**
2. Copia:
   - **Publishable Key** → `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - **Secret Key** → `CLERK_SECRET_KEY`

### 3. Configurar Variables de Entorno

**En Vercel Dashboard:**
1. Ve a tu proyecto → **Settings → Environment Variables**
2. Agrega:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   ```
3. **NO agregues `CLERK_WEBHOOK_SECRET` todavía** (lo harás después)

**En Local (.env.local):**
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### 4. Hacer Deploy a Vercel (PRIMERO)

**⚠️ IMPORTANTE:** Debes hacer deploy ANTES de configurar el webhook.

Sigue las instrucciones en `VERCEL_DEPLOY.md` para:
1. Hacer deploy a Vercel
2. Obtener tu URL de producción: `https://tu-proyecto.vercel.app`

### 5. Configurar Webhook de Clerk (DESPUÉS del deploy)

1. En Clerk Dashboard, ve a **Webhooks**
2. Click en **Add Endpoint**
3. **URL:** `https://tu-proyecto.vercel.app/api/webhooks/clerk`
   - ⚠️ Reemplaza `tu-proyecto` con tu URL real de Vercel
4. Selecciona eventos:
   - ✅ `user.created`
   - ✅ `user.updated`
   - ✅ `user.deleted`
5. Click en **Create**
6. **Copia el Signing Secret** → `whsec_...`

### 6. Agregar Webhook Secret a Vercel

1. En Vercel Dashboard → **Settings → Environment Variables**
2. Agrega:
   ```env
   CLERK_WEBHOOK_SECRET=whsec_...
   ```
3. **Redeploy** el proyecto (Vercel lo hará automáticamente o haz clic en "Redeploy")

### 7. Configurar Rutas de Autenticación

En Clerk Dashboard → **Paths**:
- Sign-in path: `/sign-in`
- Sign-up path: `/sign-up`

### 8. Verificar

1. Visita `https://tu-proyecto.vercel.app/sign-up`
2. Crea una cuenta de prueba
3. Verifica en Supabase que se creó el perfil en la tabla `profiles`

## 🔄 Sincronización Clerk ↔ Supabase

El webhook automáticamente:
- Crea perfil en Supabase cuando usuario se registra en Clerk
- Actualiza email si cambia en Clerk
- Elimina perfil si usuario se elimina en Clerk

## ✅ Verificación

1. Ve a `/sign-up` y crea una cuenta
2. Verifica en Supabase que se creó el perfil en tabla `profiles`
3. Ve a `/dashboard` - deberías estar autenticado

## 🐛 Troubleshooting

**Error: "Clerk: Missing publishableKey"**
- Verifica que `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` esté en `.env.local`
- Reinicia el servidor

**Usuario no se sincroniza con Supabase**
- Verifica que el webhook esté configurado
- Revisa logs en Clerk Dashboard → Webhooks
- Verifica `CLERK_WEBHOOK_SECRET` en `.env.local`

