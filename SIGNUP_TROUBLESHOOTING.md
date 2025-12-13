# 🔧 Troubleshooting - Sign Up No Funciona

## Problemas Comunes y Soluciones

### 1. Verificar Configuración en Clerk Dashboard

Ve a [Clerk Dashboard](https://dashboard.clerk.com) → Tu Aplicación → **Paths** y verifica:

- ✅ **Sign-in path:** `/sign-in`
- ✅ **Sign-up path:** `/sign-up`
- ✅ **After sign-in URL:** `/dashboard`
- ✅ **After sign-up URL:** `/dashboard`

### 2. Verificar Variables de Entorno en Vercel

Asegúrate de tener estas variables en **Vercel Dashboard → Settings → Environment Variables**:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### 3. Verificar Rutas Públicas en Middleware

El archivo `proxy.ts` debe tener `/sign-up(.*)` en las rutas públicas:

```typescript
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',  // ← Debe estar aquí
  '/api/webhooks(.*)',
])
```

### 4. Verificar Webhook de Clerk (Opcional)

Si el signup funciona pero el perfil no se crea en Supabase:

1. Ve a **Clerk Dashboard → Webhooks**
2. Verifica que el endpoint esté configurado: `https://tu-proyecto.vercel.app/api/webhooks/clerk`
3. Verifica que `CLERK_WEBHOOK_SECRET` esté en Vercel
4. Revisa los logs del webhook en Clerk Dashboard

### 5. Probar Sign Up Manualmente

1. Ve a: `https://tu-proyecto.vercel.app/sign-up`
2. Intenta crear una cuenta
3. Revisa la consola del navegador (F12 → Console) para ver errores
4. Revisa los logs de Vercel (Deployments → Latest → Functions)

### 6. Errores Comunes

#### Error: "Clerk: Missing publishableKey"
- **Solución:** Agrega `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` en Vercel y redeploy

#### Error: "Redirect loop"
- **Solución:** Verifica que `/sign-up` esté en las rutas públicas del middleware

#### Error: "User created but profile not in Supabase"
- **Solución:** Verifica que el webhook de Clerk esté configurado y funcionando

#### Error: "Cannot read property of undefined"
- **Solución:** Verifica que todas las variables de entorno estén configuradas

### 7. Verificar que el Componente SignUp Esté Correcto

El componente debe tener:

```typescript
<SignUp 
  routing="path"
  path="/sign-up"
  signInUrl="/sign-in"
  afterSignUpUrl="/dashboard"
  afterSignInUrl="/dashboard"
/>
```

### 8. Limpiar Caché y Probar

1. **Limpiar caché del navegador:**
   - Chrome/Edge: Ctrl+Shift+Delete
   - Firefox: Ctrl+Shift+Delete
   - Safari: Cmd+Option+E

2. **Probar en modo incógnito:**
   - Abre una ventana incógnita
   - Ve a `/sign-up`
   - Intenta crear cuenta

3. **Verificar cookies:**
   - Asegúrate de que las cookies no estén bloqueadas
   - Clerk necesita cookies para funcionar

### 9. Verificar Logs en Tiempo Real

1. Ve a **Vercel Dashboard → Tu Proyecto → Deployments**
2. Selecciona el deployment más reciente
3. Haz clic en **"Functions"** o **"Runtime Logs"**
4. Intenta hacer sign-up y observa los logs en tiempo real

### 10. Probar con Email de Prueba

1. Usa un email válido pero que no esté registrado
2. Usa una contraseña fuerte (mínimo 8 caracteres)
3. Verifica el email si Clerk lo requiere

## ✅ Checklist Rápido

- [ ] Variables de entorno configuradas en Vercel
- [ ] Rutas configuradas en Clerk Dashboard
- [ ] `/sign-up` está en rutas públicas del middleware
- [ ] Componente SignUp tiene `afterSignUpUrl="/dashboard"`
- [ ] Webhook de Clerk configurado (opcional, para Supabase)
- [ ] Caché del navegador limpiada
- [ ] Probado en modo incógnito

## 🆘 Si Nada Funciona

1. **Copia el error exacto** de la consola del navegador
2. **Revisa los logs de Vercel** para ver errores del servidor
3. **Verifica la configuración de Clerk** en el dashboard
4. **Prueba crear una cuenta directamente en Clerk Dashboard** para verificar que Clerk funciona

