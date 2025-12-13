import { TikTokShopConfig, InventoryUpdateRequest, InventoryUpdateResponse, ProductListResponse, TikTokProduct } from './types'

/**
 * Cliente para TikTok Shop API
 * Documentación: https://partner.tiktokshop.com/docv2/page/64e0d3c4c4e5c1001f4c0e6a
 */
export class TikTokShopClient {
  private config: TikTokShopConfig
  private baseUrl: string

  constructor(config: TikTokShopConfig) {
    this.config = config
    this.baseUrl = config.baseUrl || 'https://open-api.tiktokglobalshop.com'
  }

  /**
   * Obtiene la lista de productos de TikTok Shop
   * Endpoint: GET /product/202309/products
   */
  async getProducts(pageSize: number = 20, pageToken?: string): Promise<ProductListResponse> {
    const url = new URL(`${this.baseUrl}/product/202309/products`)
    url.searchParams.set('page_size', pageSize.toString())
    if (pageToken) {
      url.searchParams.set('page_token', pageToken)
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': this.config.accessToken,
      },
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unknown error' }))
      throw new Error(`TikTok API error: ${error.message || response.statusText}`)
    }

    const data = await response.json()
    return data
  }

  /**
   * Obtiene el inventario de un producto específico
   * Endpoint: GET /product/202309/inventory/search
   */
  async getProductInventory(productId: string): Promise<number> {
    const url = new URL(`${this.baseUrl}/product/202309/inventory/search`)
    url.searchParams.set('product_id', productId)

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': this.config.accessToken,
    },
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unknown error' }))
      throw new Error(`TikTok API error: ${error.message || response.statusText}`)
    }

    const data = await response.json()
    // TikTok API retorna el inventario en data.inventory.available_stock
    return data.inventory?.available_stock || 0
  }

  /**
   * Actualiza el inventario de un SKU en TikTok Shop
   * Endpoint: POST /product/202309/inventory/update
   */
  async updateInventory(request: InventoryUpdateRequest): Promise<InventoryUpdateResponse> {
    const url = `${this.baseUrl}/product/202309/inventory/update`

    const payload = {
      product_id: request.productId,
      sku_id: request.skuId,
      available_stock: request.quantity,
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': this.config.accessToken,
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unknown error' }))
      throw new Error(`TikTok API error: ${error.message || response.statusText}`)
    }

    const data = await response.json()
    return {
      success: true,
      data,
    }
  }

  /**
   * Obtiene todos los productos con paginación
   */
  async getAllProducts(): Promise<TikTokProduct[]> {
    const allProducts: TikTokProduct[] = []
    let pageToken: string | undefined
    let hasMore = true

    while (hasMore) {
      const response = await this.getProducts(100, pageToken)
      if (response.products) {
        allProducts.push(...response.products)
      }
      pageToken = response.nextPageToken
      hasMore = !!pageToken
    }

    return allProducts
  }
}

/**
 * Crea una instancia del cliente TikTok Shop
 */
export function createTikTokShopClient(accessToken: string): TikTokShopClient {
  return new TikTokShopClient({
    appKey: process.env.TIKTOK_SHOP_APP_KEY || '',
    appSecret: process.env.TIKTOK_SHOP_APP_SECRET || '',
    accessToken,
    baseUrl: 'https://open-api.tiktokglobalshop.com',
  })
}

