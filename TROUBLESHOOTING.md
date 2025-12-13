# 🔧 Troubleshooting - Errores de Servidor

## Error: "Application error: a server-side exception has occurred"

Este error generalmente ocurre por variables de entorno faltantes o mal configuradas.

### 📋 Checklist de Variables de Entorno en Vercel

Ve a **Vercel Dashboard → Tu Proyecto → Settings → Environment Variables** y verifica que tengas:

#### ✅ Variables OBLIGATORIAS (mínimas para que funcione):

```env
# Clerk (OBLIGATORIO)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

#### ⚠️ Variables OPCIONALES (pero recomendadas):

```env
# Supabase (opcional - la app funcionará sin ellas pero con funcionalidad limitada)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Stripe (opcional - solo necesario para pagos)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

### 🔍 Cómo Ver los Logs de Error en Vercel

1. Ve a **Vercel Dashboard → Tu Proyecto**
2. Haz clic en **"Deployments"**
3. Selecciona el deployment más reciente
4. Haz clic en **"Functions"** o **"Runtime Logs"**
5. Busca errores en rojo

### 🐛 Errores Comunes y Soluciones

#### Error 1: "Missing Clerk publishable key"

**Solución:**
1. Ve a [clerk.com](https://clerk.com) → Tu aplicación → API Keys
2. Copia `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
3. Agrega a Vercel → Environment Variables
4. **Redeploy** el proyecto

#### Error 2: "Missing Supabase environment variables"

**Solución:**
- La app ahora funciona sin Supabase (modo demo)
- Para funcionalidad completa, agrega las variables de Supabase
- O simplemente ignora este warning si no necesitas Supabase todavía

#### Error 3: Error en middleware (proxy.ts)

**Solución:**
- El middleware ahora maneja errores gracefully
- Si Clerk no está configurado, permite acceso a rutas públicas
- Verifica que `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` esté configurada

### ✅ Verificación Rápida

1. **¿Tienes `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` en Vercel?**
   - ✅ Sí → Continúa
   - ❌ No → Agrega y redeploy

2. **¿Hiciste redeploy después de agregar variables?**
   - ✅ Sí → Los cambios deberían estar activos
   - ❌ No → Ve a Deployments → Latest → ⋮ → Redeploy

3. **¿El error persiste?**
   - Revisa los logs en Vercel (pasos arriba)
   - Copia el error completo y busca en la documentación

### 🚀 Pasos para Solucionar

1. **Agrega variables mínimas:**
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   ```

2. **Redeploy:**
   - Vercel Dashboard → Deployments → Latest → Redeploy

3. **Verifica:**
   - Visita tu URL: `https://tu-proyecto.vercel.app`
   - Deberías ver la landing page o la página de sign-in

### 📞 Si el Error Persiste

1. **Copia el error completo** de los logs de Vercel
2. **Verifica todas las variables** en Vercel Dashboard
3. **Revisa la consola del navegador** (F12 → Console)
4. **Verifica que el build pasó** sin errores

### 🔄 Código Mejorado

El código ahora es más resiliente:
- ✅ Maneja errores de Clerk gracefully
- ✅ Funciona sin Supabase (modo demo)
- ✅ Muestra mensajes de error amigables
- ✅ No crashea si faltan variables opcionales

