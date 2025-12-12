import { NextRequest, NextResponse } from 'next/server'
import { initializeStripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

/**
 * Webhook endpoint para eventos de Stripe
 * URL: https://[tuapp].vercel.app/api/webhooks/stripe
 * 
 * Configurar en Stripe Dashboard:
 * 1. Ir a Developers > Webhooks
 * 2. Agregar endpoint: https://[tuapp].vercel.app/api/webhooks/stripe
 * 3. Seleccionar eventos:
 *    - checkout.session.completed
 *    - invoice.payment_succeeded
 *    - customer.subscription.deleted
 * 4. Copiar el webhook secret a STRIPE_WEBHOOK_SECRET
 */
export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    )
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not set')
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    )
  }

  const stripe = initializeStripe()
  let event: Stripe.Event

  try {
    // Verificar la firma del webhook
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    )
  }

  // Crear cliente de Supabase con service role
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  try {
    // Manejar diferentes tipos de eventos
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        if (session.mode === 'subscription' && session.subscription) {
          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
          )

          const userId = session.metadata?.userId || subscription.metadata?.userId

          if (!userId) {
            console.error('No userId found in session metadata')
            break
          }

          // Mapear priceId a plan
          const priceId = subscription.items.data[0]?.price.id
          const plan = mapPriceIdToPlan(priceId)

          // Actualizar perfil del usuario
          await supabase
            .from('profiles')
            .update({
              stripe_customer_id: session.customer as string,
              stripe_subscription_id: subscription.id,
              plan: plan,
              updated_at: new Date().toISOString(),
            })
            .eq('id', userId)

          console.log(`Subscription created for user ${userId}`)
        }
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice

        if (invoice.subscription) {
          const subscription = await stripe.subscriptions.retrieve(
            invoice.subscription as string
          )

          // Buscar usuario por subscription_id en profiles
          const { data: profile } = await supabase
            .from('profiles')
            .select('id')
            .eq('stripe_subscription_id', subscription.id)
            .single()

          if (profile) {
            // La renovación se maneja automáticamente por Stripe
            // Solo actualizamos el updated_at para registrar la actividad
            await supabase
              .from('profiles')
              .update({
                updated_at: new Date().toISOString(),
              })
              .eq('id', profile.id)

            console.log(`Payment succeeded for user ${profile.id}`)
          }
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription

        // Buscar usuario por subscription_id en profiles
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('stripe_subscription_id', subscription.id)
          .single()

        if (profile) {
          // Actualizar perfil: marcar como free y limpiar subscription_id
          await supabase
            .from('profiles')
            .update({
              plan: 'free',
              stripe_subscription_id: null,
              updated_at: new Date().toISOString(),
            })
            .eq('id', profile.id)

          console.log(`Subscription canceled for user ${profile.id}`)
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed', details: error.message },
      { status: 500 }
    )
  }
}

/**
 * Mapea un priceId de Stripe a un plan
 * TODO: Configurar estos priceIds en Stripe Dashboard y actualizar aquí
 */
function mapPriceIdToPlan(priceId: string | undefined): 'free' | 'starter' | 'pro' {
  if (!priceId) return 'free'

  // Estos son ejemplos - reemplazar con tus priceIds reales de Stripe
  if (priceId.includes('starter') || priceId === process.env.STRIPE_STARTER_PRICE_ID) {
    return 'starter'
  }
  if (priceId.includes('pro') || priceId === process.env.STRIPE_PRO_PRICE_ID) {
    return 'pro'
  }

  return 'free'
}

