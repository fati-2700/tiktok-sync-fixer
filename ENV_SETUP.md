# Configuración de Variables de Entorno

## ⚠️ IMPORTANTE: Reiniciar el servidor después de agregar variables

Después de crear o modificar `.env.local`, **DEBES reiniciar el servidor de desarrollo**.

1. Detén el servidor (Ctrl+C)
2. Inicia de nuevo: `npm run dev`

## Archivo `.env.local`

Crea un archivo `.env.local` en la raíz del proyecto con:

```env
# Supabase (OBLIGATORIO)
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key_aqui

# Stripe (Opcional para desarrollo)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Obtener credenciales de Supabase

1. Ve a https://supabase.com/dashboard
2. Selecciona tu proyecto
3. Ve a **Settings** > **API**
4. Copia:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

## Verificar que funciona

Después de reiniciar el servidor, deberías poder acceder a:
- http://localhost:3000 (o el puerto que esté usando)

Si ves el error de Supabase, verifica:
- ✅ El archivo se llama exactamente `.env.local` (no `.env` ni `.env.example`)
- ✅ Está en la raíz del proyecto (mismo nivel que `package.json`)
- ✅ Reiniciaste el servidor después de crear/modificar el archivo
- ✅ Las variables no tienen espacios extra ni comillas

