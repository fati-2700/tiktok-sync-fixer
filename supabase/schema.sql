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
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sync_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tiktok_products ENABLE ROW LEVEL SECURITY;

-- ============================================
-- POLÍTICAS RLS para profiles
-- ============================================
-- Los usuarios solo pueden ver su propio perfil
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Los usuarios solo pueden actualizar su propio perfil
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Permitir inserción automática cuando se crea un usuario en auth.users
CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ============================================
-- POLÍTICAS RLS para sync_logs
-- ============================================
-- Los usuarios solo pueden ver sus propios logs de sincronización
CREATE POLICY "Users can view own sync logs"
  ON public.sync_logs
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = sync_logs.user_id
      AND profiles.id = auth.uid()
    )
  );

-- Los usuarios solo pueden insertar sus propios logs
CREATE POLICY "Users can insert own sync logs"
  ON public.sync_logs
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = sync_logs.user_id
      AND profiles.id = auth.uid()
    )
  );

-- Los usuarios solo pueden actualizar sus propios logs
CREATE POLICY "Users can update own sync logs"
  ON public.sync_logs
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = sync_logs.user_id
      AND profiles.id = auth.uid()
    )
  );

-- ============================================
-- POLÍTICAS RLS para tiktok_products
-- ============================================
-- Los usuarios solo pueden ver sus propios productos
CREATE POLICY "Users can view own products"
  ON public.tiktok_products
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = tiktok_products.user_id
      AND profiles.id = auth.uid()
    )
  );

-- Los usuarios solo pueden insertar sus propios productos
CREATE POLICY "Users can insert own products"
  ON public.tiktok_products
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = tiktok_products.user_id
      AND profiles.id = auth.uid()
    )
  );

-- Los usuarios solo pueden actualizar sus propios productos
CREATE POLICY "Users can update own products"
  ON public.tiktok_products
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = tiktok_products.user_id
      AND profiles.id = auth.uid()
    )
  );

-- Los usuarios solo pueden eliminar sus propios productos
CREATE POLICY "Users can delete own products"
  ON public.tiktok_products
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = tiktok_products.user_id
      AND profiles.id = auth.uid()
    )
  );

-- ============================================
-- NOTA: Los perfiles se crean automáticamente vía webhook de Clerk
-- No se necesita trigger porque usamos Clerk para autenticación
-- ============================================

