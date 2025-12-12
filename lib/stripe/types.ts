// Tipos TypeScript para Stripe

export interface StripeConfig {
  publishableKey: string;
  secretKey: string;
  webhookSecret?: string;
}

export interface CreateCheckoutSessionRequest {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
}

export interface CreateCheckoutSessionResponse {
  sessionId: string;
  url: string;
}

