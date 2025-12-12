import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Si no hay variables, retornar un cliente "mock" que no hace nada
  // Esto permite que la app funcione sin Supabase configurado
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      '⚠️ Supabase no está configurado. Usando modo demo.\n' +
      'Para funcionalidad completa, agrega NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY a tu .env.local'
    )
    
    // Retornar un cliente mock que no falla pero no hace nada
    return createBrowserClient(
      'https://placeholder.supabase.co',
      'placeholder-key'
    )
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

