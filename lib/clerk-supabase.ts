import { auth } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'

/**
 * Obtiene el cliente de Supabase usando el userId de Clerk
 * Esto sincroniza el usuario de Clerk con Supabase
 */
export async function getSupabaseClientForClerk() {
  const { userId } = await auth()
  
  if (!userId) {
    throw new Error('User not authenticated')
  }

  // Crear cliente de Supabase con service role para operaciones admin
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  return { supabase, userId }
}

/**
 * Sincroniza usuario de Clerk con perfil en Supabase
 * Se llama después de que el usuario se registra en Clerk
 */
export async function syncClerkUserToSupabase(clerkUserId: string, email: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Verificar si el perfil ya existe
  const { data: existingProfile } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', clerkUserId)
    .single()

  if (!existingProfile) {
    // Crear perfil en Supabase usando el userId de Clerk como ID
    const { error } = await supabase
      .from('profiles')
      .insert({
        id: clerkUserId, // Usar el mismo ID de Clerk
        email: email,
        plan: 'free',
      })

    if (error) {
      console.error('Error syncing user to Supabase:', error)
      throw error
    }
  }

  return true
}

/**
 * Obtiene el perfil del usuario desde Supabase usando Clerk userId
 */
export async function getUserProfile(userId: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error getting user profile:', error)
    return null
  }

  return profile
}

