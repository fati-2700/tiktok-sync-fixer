/**
 * Cliente para Shopify API
 * Documentación: https://shopify.dev/api/admin-rest
 */

export interface ShopifyConfig {
  shopDomain: string; // e.g., "mi-tienda.myshopify.com"
  accessToken: string;
}

export interface ShopifyVariant {
  id: string;
  product_id: string;
  inventory_quantity: number;
  sku: string;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  variants: ShopifyVariant[];
}

export class ShopifyClient {
  private config: ShopifyConfig
  private baseUrl: string

  constructor(config: ShopifyConfig) {
    this.config = config
    this.baseUrl = `https://${config.shopDomain}`
  }

  /**
   * Obtiene el inventario de un variant específico
   * Endpoint: GET /admin/api/2024-01/variants/{variant_id}.json
   */
  async getVariantInventory(variantId: string): Promise<number> {
    const url = `${this.baseUrl}/admin/api/2024-01/variants/${variantId}.json`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': this.config.accessToken,
      },
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unknown error' }))
      throw new Error(`Shopify API error: ${error.message || response.statusText}`)
    }

    const data = await response.json()
    return data.variant?.inventory_quantity || 0
  }

  /**
   * Obtiene un producto por ID
   * Endpoint: GET /admin/api/2024-01/products/{product_id}.json
   */
  async getProduct(productId: string): Promise<ShopifyProduct> {
    const url = `${this.baseUrl}/admin/api/2024-01/products/${productId}.json`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': this.config.accessToken,
      },
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unknown error' }))
      throw new Error(`Shopify API error: ${error.message || response.statusText}`)
    }

    const data = await response.json()
    return data.product
  }

  /**
   * Actualiza el inventario de un variant
   * Endpoint: PUT /admin/api/2024-01/variants/{variant_id}.json
   */
  async updateVariantInventory(variantId: string, quantity: number): Promise<void> {
    const url = `${this.baseUrl}/admin/api/2024-01/variants/${variantId}.json`

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': this.config.accessToken,
      },
      body: JSON.stringify({
        variant: {
          id: variantId,
          inventory_quantity: quantity,
        },
      }),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unknown error' }))
      throw new Error(`Shopify API error: ${error.message || response.statusText}`)
    }
  }
}

/**
 * Crea una instancia del cliente Shopify
 */
export function createShopifyClient(shopDomain: string, accessToken: string): ShopifyClient {
  return new ShopifyClient({
    shopDomain,
    accessToken,
  })
}

