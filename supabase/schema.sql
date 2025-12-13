-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLA: profiles
-- ============================================
-- NOTA: id es el userId de Clerk (string), no UUID de auth.users
CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY, -- Clerk user ID
  email TEXT NOT NULL,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'starter', 'pro')),
  tiktok_shop_connected BOOLEAN NOT NULL DEFAULT FALSE,
  tiktok_access_token TEXT,
  tiktok_shop_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ============================================
-- TABLA: sync_logs
-- ============================================
CREATE TABLE IF NOT EXISTS public.sync_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL, -- Clerk user ID
  tiktok_shop_id TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'success', 'failed')),
  items_synced INTEGER NOT NULL DEFAULT 0,
  items_fixed INTEGER NOT NULL DEFAULT 0,
  error_message TEXT,
  synced_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ============================================
-- TABLA: tiktok_products
-- ============================================
CREATE TABLE IF NOT EXISTS public.tiktok_products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL, -- Clerk user ID
  tiktok_product_id TEXT NOT NULL,
  shopify_product_id TEXT NOT NULL,
  title TEXT,
  current_inventory INTEGER NOT NULL DEFAULT 0,
  tiktok_inventory INTEGER NOT NULL DEFAULT 0,
  last_sync TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id, tiktok_product_id, shopify_product_id)
);

-- ============================================
-- ÍNDICES para mejorar performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_stripe_customer_id ON public.profiles(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_sync_logs_user_id ON public.sync_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_sync_logs_created_at ON public.sync_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sync_logs_status ON public.sync_logs(status);
CREATE INDEX IF NOT EXISTS idx_tiktok_products_user_id ON public.tiktok_products(user_id);
CREATE INDEX IF NOT EXISTS idx_tiktok_products_tiktok_product_id ON public.tiktok_products(tiktok_product_id);
CREATE INDEX IF NOT EXISTS idx_tiktok_products_shopify_product_id ON public.tiktok_products(shopify_product_id);

-- ============================================
-- FUNCIÓN para actualizar updated_at automáticamente
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- ============================================
-- TRIGGERS para updated_at
-- ============================================
-- Eliminar trigger si existe antes de crearlo (para que el script sea idempotente)
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
-- NOTA: RLS está deshabilitado porque usamos Clerk para autenticación
-- y el código usa SUPABASE_SERVICE_ROLE_KEY que bypassa RLS.
-- En producción, considera implementar políticas RLS personalizadas
-- que funcionen con Clerk o usar Supabase Auth en lugar de Clerk.

-- Deshabilitar RLS temporalmente para MVP
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.sync_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.tiktok_products DISABLE ROW LEVEL SECURITY;

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
-- NOTA: RLS está deshabilitado porque usamos Clerk para autenticación
-- y el código usa SUPABASE_SERVICE_ROLE_KEY que bypassa RLS.
-- En producción, considera implementar políticas RLS personalizadas
-- que funcionen con Clerk o usar Supabase Auth en lugar de Clerk.

-- Deshabilitar RLS temporalmente para MVP
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.sync_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.tiktok_products DISABLE ROW LEVEL SECURITY;

-- Las políticas RLS están deshabilitadas porque:
-- 1. Usamos Clerk para autenticación (no Supabase Auth)
-- 2. El código usa SUPABASE_SERVICE_ROLE_KEY que bypassa RLS
-- 3. La seguridad se maneja a nivel de aplicación (verificación de userId en el código)

-- ============================================
-- NOTA: Los perfiles se crean automáticamente vía webhook de Clerk
-- No se necesita trigger porque usamos Clerk para autenticación
-- ============================================

