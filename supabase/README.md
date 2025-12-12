# Schema de Base de Datos - Supabase

Este archivo contiene el schema SQL completo para crear las tablas necesarias en Supabase.

## 📋 Tablas Creadas

1. **profiles** - Perfiles de usuario con información de Stripe y TikTok Shop
2. **sync_logs** - Logs de sincronización de inventario
3. **tiktok_products** - Productos mapeados entre TikTok Shop y Shopify

## 🚀 Cómo Ejecutar

### Opción 1: SQL Editor en Supabase Dashboard

1. Ve a tu proyecto en [Supabase Dashboard](https://app.supabase.com)
2. Navega a **SQL Editor**
3. Crea una nueva query
4. Copia y pega el contenido completo de `schema.sql`
5. Ejecuta la query

### Opción 2: Supabase CLI

```bash
# Si tienes Supabase CLI instalado
supabase db push
```

## 🔐 Características de Seguridad

- **Row Level Security (RLS)** habilitado en todas las tablas
- Políticas RLS configuradas para que los usuarios solo accedan a sus propios datos
- Trigger automático para crear perfil cuando se registra un nuevo usuario
- Trigger automático para actualizar `updated_at` en la tabla `profiles`

## 📊 Índices Creados

Se han creado índices en las columnas más consultadas para optimizar el rendimiento:
- `profiles.email`
- `profiles.stripe_customer_id`
- `sync_logs.user_id`, `created_at`, `status`
- `tiktok_products.user_id`, `tiktok_product_id`, `shopify_product_id`

## ⚠️ Notas Importantes

- El campo `tiktok_access_token` está marcado como TEXT pero debería ser encriptado en producción
- La tabla `profiles` se vincula automáticamente con `auth.users` de Supabase
- Los timestamps usan `TIMEZONE('utc'::text, NOW())` para consistencia

