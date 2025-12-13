// Tipos TypeScript para TikTok Shop API

export interface TikTokShopConfig {
  appKey: string;
  appSecret: string;
  accessToken: string;
  baseUrl?: string;
}

export interface InventoryUpdateRequest {
  productId: string;
  skuId: string;
  quantity: number;
}

export interface InventoryUpdateResponse {
  success: boolean;
  message?: string;
  data?: unknown;
}

export interface ProductListRequest {
  pageSize?: number;
  pageToken?: string;
}

export interface ProductListResponse {
  products: TikTokProduct[];
  nextPageToken?: string;
  total?: number;
}

export interface TikTokProduct {
  id: string;
  title: string;
  skus: TikTokSKU[];
  // Agregar más campos según la documentación de TikTok Shop API
}

export interface TikTokSKU {
  id: string;
  skuCode: string;
  availableStock: number;
  // Agregar más campos según la documentación de TikTok Shop API
}

export interface TikTokInventoryResponse {
  inventory?: {
    available_stock: number;
    reserved_stock?: number;
  };
  product_id?: string;
  sku_id?: string;
}

