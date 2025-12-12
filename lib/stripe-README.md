# Configuración de Stripe

## Variables de Entorno Requeridas

Agrega estas variables a tu `.env.local`:

```env
# Stripe (Test Mode)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Opcional: Price IDs para mapeo automático
STRIPE_STARTER_PRICE_ID=price_...
STRIPE_PRO_PRICE_ID=price_...

# App URL (para redirects)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Configuración en Stripe Dashboard

### 1. Obtener API Keys (Test Mode)

1. Ve a [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. Copia:
   - **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - **Secret key** → `STRIPE_SECRET_KEY`

### 2. Crear Productos y Precios

1. Ve a **Products** en Stripe Dashboard
2. Crea productos para cada plan:
   - **Starter Plan**: $29/mes
   - **Pro Plan**: $99/mes
3. Copia los **Price IDs** (price_xxx) y úsalos en tu código

### 3. Configurar Webhook

1. Ve a **Developers > Webhooks**
2. Click en **Add endpoint**
3. URL: `https://[tuapp].vercel.app/api/webhooks/stripe`
4. Selecciona eventos:
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
   - `customer.subscription.deleted`
5. Copia el **Signing secret** → `STRIPE_WEBHOOK_SECRET`

### 4. Testing Local con Stripe CLI

Para probar webhooks localmente:

```bash
# Instalar Stripe CLI
# https://stripe.com/docs/stripe-cli

# Login
stripe login

# Forward webhooks a localhost
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Copiar el webhook secret que aparece
# Ejemplo: whsec_xxx → usar en STRIPE_WEBHOOK_SECRET
```

## Uso

### Crear Checkout Session

```typescript
import { createCheckoutSessionAction } from '@/app/actions/stripe'

// En un Server Component o Server Action
await createCheckoutSessionAction('price_xxx')
```

### Verificar Estado de Suscripción

```typescript
import { createClient } from '@/lib/supabase/server'

const supabase = await createClient()
const { data: profile } = await supabase
  .from('profiles')
  .select('plan, stripe_subscription_id')
  .eq('id', userId)
  .single()
```

## Flujo de Pago

1. Usuario hace clic en "Elegir Plan"
2. `createCheckoutSessionAction()` se ejecuta
3. Redirige a Stripe Checkout
4. Usuario completa el pago
5. Stripe envía webhook `checkout.session.completed`
6. Webhook actualiza `profiles` en Supabase:
   - `stripe_customer_id`
   - `stripe_subscription_id`
   - `plan` (starter/pro)

## Eventos de Webhook

- **checkout.session.completed**: Crea suscripción en Supabase
- **invoice.payment_succeeded**: Renovación exitosa
- **customer.subscription.deleted**: Cancela suscripción, marca como 'free'

## Notas Importantes

- ⚠️ Usa **TEST MODE** durante desarrollo
- 🔒 El webhook verifica la firma de Stripe
- 📝 Los `priceId` deben mapearse a planes en `mapPriceIdToPlan()`
- 🔄 Las renovaciones se manejan automáticamente

