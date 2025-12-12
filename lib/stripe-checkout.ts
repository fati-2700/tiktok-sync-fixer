import Stripe from 'stripe'
import { initializeStripe, createCustomer } from './stripe'

/**
 * Crea una sesión de Checkout de Stripe
 */
export async function createCheckoutSession({
  priceId,
  userId,
  userEmail,
  customerId,
}: {
  priceId: string
  userId: string
  userEmail: string
  customerId?: string
}): Promise<string> {
  const stripe = initializeStripe()
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  // Si no hay customerId, crear un nuevo cliente
  let finalCustomerId = customerId
  if (!finalCustomerId) {
    const customer = await createCustomer(userEmail, userId)
    finalCustomerId = customer.id
  }

  // Crear sesión de Checkout
  const session = await stripe.checkout.sessions.create({
    customer: finalCustomerId,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${appUrl}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/pricing?canceled=true`,
    metadata: {
      userId, // Guardar userId en metadata
    },
    subscription_data: {
      metadata: {
        userId, // También en la suscripción
      },
    },
  })

  if (!session.url) {
    throw new Error('No se pudo crear la URL de checkout')
  }

  return session.url
}

