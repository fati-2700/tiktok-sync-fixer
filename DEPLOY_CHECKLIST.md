# ✅ Checklist de Deploy

## 📋 Orden Correcto de Pasos

### Fase 1: Preparación Local ✅

- [ ] Instalar dependencias: `npm install`
- [ ] Configurar `.env.local` con variables básicas
- [ ] Ejecutar `npm run build` sin errores
- [ ] Probar localmente: `npm run dev`

### Fase 2: Configurar Servicios Externos ✅

- [ ] Crear cuenta en Supabase
- [ ] Ejecutar `supabase/schema.sql` en Supabase
- [ ] Crear cuenta en Clerk
- [ ] Obtener API keys de Clerk
- [ ] Crear cuenta en Stripe (modo test)
- [ ] Obtener API keys de Stripe (test mode)

### Fase 3: Deploy a Vercel 🚀

- [ ] Crear cuenta en Vercel
- [ ] Conectar repositorio GitHub (o usar CLI)
- [ ] Agregar variables de entorno en Vercel:
  - [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
  - [ ] `CLERK_SECRET_KEY`
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY`
  - [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
  - [ ] `STRIPE_SECRET_KEY`
  - [ ] `NEXT_PUBLIC_APP_URL` (opcional, se actualiza automáticamente)
- [ ] Hacer deploy
- [ ] Verificar que la app carga: `https://tu-proyecto.vercel.app`
- [ ] **Copiar URL de producción**

### Fase 4: Configurar Webhooks (DESPUÉS del deploy) 🔗

#### Webhook de Clerk

- [ ] Ir a Clerk Dashboard → Webhooks
- [ ] Crear endpoint: `https://tu-proyecto.vercel.app/api/webhooks/clerk`
- [ ] Seleccionar eventos: `user.created`, `user.updated`, `user.deleted`
- [ ] Copiar `CLERK_WEBHOOK_SECRET`
- [ ] Agregar `CLERK_WEBHOOK_SECRET` a Vercel
- [ ] Redeploy en Vercel

#### Webhook de Stripe

- [ ] Ir a Stripe Dashboard → Webhooks
- [ ] Crear endpoint: `https://tu-proyecto.vercel.app/api/webhooks/stripe`
- [ ] Seleccionar eventos: `checkout.session.completed`, `invoice.payment_succeeded`, `customer.subscription.deleted`
- [ ] Copiar `STRIPE_WEBHOOK_SECRET`
- [ ] Agregar `STRIPE_WEBHOOK_SECRET` a Vercel
- [ ] Redeploy en Vercel

### Fase 5: Verificación Final ✅

- [ ] Visitar landing page: `https://tu-proyecto.vercel.app`
- [ ] Probar sign-up: `https://tu-proyecto.vercel.app/sign-up`
- [ ] Verificar que se crea perfil en Supabase
- [ ] Probar sign-in: `https://tu-proyecto.vercel.app/sign-in`
- [ ] Acceder a dashboard: `https://tu-proyecto.vercel.app/dashboard`
- [ ] Probar conexión TikTok Shop (fake): `/integrations`
- [ ] Probar sync manual: Click en "Forzar Sincronización"

## 📚 Documentación de Referencia

- **Deploy:** `VERCEL_DEPLOY.md`
- **Clerk:** `CLERK_SETUP.md`
- **Stripe:** `lib/stripe-README.md`
- **Supabase:** `supabase/README.md`
- **Variables de Entorno:** `ENV_SETUP.md`

## 🐛 Troubleshooting

Si algo falla, revisa:
1. Logs en Vercel Dashboard
2. Variables de entorno en Vercel
3. Webhooks configurados correctamente
4. Base de datos Supabase accesible

