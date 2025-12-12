import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'
import { syncClerkUserToSupabase } from '@/lib/clerk-supabase'

/**
 * Webhook de Clerk para sincronizar usuarios con Supabase
 * URL: https://[tuapp].vercel.app/api/webhooks/clerk
 * 
 * Configurar en Clerk Dashboard:
 * 1. Ir a Webhooks
 * 2. Agregar endpoint: https://[tuapp].vercel.app/api/webhooks/clerk
 * 3. Seleccionar eventos: user.created, user.updated, user.deleted
 * 4. Copiar el webhook secret a CLERK_WEBHOOK_SECRET
 */
export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET to your .env.local')
  }

  // Obtener headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400,
    })
  }

  // Obtener body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Crear nuevo Svix instance con el secret
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verificar el payload
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occurred', {
      status: 400,
    })
  }

  // Manejar el webhook
  const eventType = evt.type

  if (eventType === 'user.created') {
    const { id, email_addresses } = evt.data

    if (email_addresses && email_addresses.length > 0) {
      const email = email_addresses[0].email_address

      try {
        await syncClerkUserToSupabase(id, email)
        console.log(`User ${id} synced to Supabase`)
      } catch (error) {
        console.error('Error syncing user to Supabase:', error)
      }
    }
  }

  if (eventType === 'user.updated') {
    const { id, email_addresses } = evt.data

    if (email_addresses && email_addresses.length > 0) {
      const email = email_addresses[0].email_address

      // Actualizar email en Supabase si cambió
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      await supabase
        .from('profiles')
        .update({ email })
        .eq('id', id)
    }
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data

    // Eliminar perfil de Supabase (cascade eliminará datos relacionados)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    await supabase
      .from('profiles')
      .delete()
      .eq('id', id)
  }

  return new Response('', { status: 200 })
}

