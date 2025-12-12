'use server'

import { createCheckoutSession } from '@/lib/stripe-checkout'
import { auth, currentUser } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'

/**
 * Server Action para crear una sesión de Checkout de Stripe
 * @param priceId - ID del precio de Stripe (price_xxx)
 * @returns URL de redirección a Stripe Checkout
 */
export async function createCheckoutSessionAction(priceId: string) {
  try {
    // Obtener usuario actual desde Clerk
    const { userId } = await auth()
    const user = await currentUser()

    if (!userId || !user) {
      throw new Error('Usuario no autenticado')
    }

    // Obtener email de Clerk
    const userEmail = user.emailAddresses[0]?.emailAddress

    if (!userEmail) {
      throw new Error('Email no encontrado')
    }

    // Obtener perfil del usuario desde Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', userId)
      .single()

    // Crear sesión de Checkout
    const checkoutUrl = await createCheckoutSession({
      priceId,
      userId: userId,
      userEmail: userEmail,
      customerId: profile?.stripe_customer_id || undefined,
    })

    // Redirigir a la URL de pago
    redirect(checkoutUrl)
  } catch (error: any) {
    console.error('Error creating checkout session:', error)
    throw new Error(error.message || 'Error al crear sesión de pago')
  }
}

