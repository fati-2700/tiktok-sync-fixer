import Stripe from 'stripe'

/**
 * Inicializa el cliente de Stripe
 */
export function initializeStripe(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY

  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not set in environment variables')
  }

  return new Stripe(secretKey, {
    apiVersion: '2023-10-16',
    typescript: true,
  })
}

/**
 * Crea un cliente en Stripe
 */
export async function createCustomer(
  email: string,
  userId: string,
  name?: string
): Promise<Stripe.Customer> {
  const stripe = initializeStripe()

  const customer = await stripe.customers.create({
    email,
    name,
    metadata: {
      userId, // Guardar userId en metadata para referencia
    },
  })

  return customer
}

/**
 * Crea una suscripción en Stripe
 */
export async function createSubscription(
  customerId: string,
  priceId: string
): Promise<Stripe.Subscription> {
  const stripe = initializeStripe()

  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [
      {
        price: priceId,
      },
    ],
    payment_behavior: 'default_incomplete',
    payment_settings: { save_default_payment_method: 'on_subscription' },
    expand: ['latest_invoice.payment_intent'],
  })

  return subscription
}

/**
 * Obtiene un cliente de Stripe por ID
 */
export async function getCustomer(
  customerId: string
): Promise<Stripe.Customer | null> {
  try {
    const stripe = initializeStripe()
    return await stripe.customers.retrieve(customerId) as Stripe.Customer
  } catch (error) {
    console.error('Error retrieving customer:', error)
    return null
  }
}

/**
 * Obtiene una suscripción de Stripe por ID
 */
export async function getSubscription(
  subscriptionId: string
): Promise<Stripe.Subscription | null> {
  try {
    const stripe = initializeStripe()
    return await stripe.subscriptions.retrieve(subscriptionId)
  } catch (error) {
    console.error('Error retrieving subscription:', error)
    return null
  }
}

/**
 * Cancela una suscripción en Stripe
 */
export async function cancelSubscription(
  subscriptionId: string
): Promise<Stripe.Subscription> {
  const stripe = initializeStripe()
  return await stripe.subscriptions.cancel(subscriptionId)
}

