# 🔗 Integración TikTok Shop API

## 📋 Estado Actual

### ✅ Implementado:
- Cliente TikTok Shop API (`lib/tiktok-shop/client.ts`)
- Cliente Shopify API (`lib/shopify/client.ts`)
- Endpoint de sincronización con soporte para API real y dummy data
- Tipos TypeScript para TikTok Shop

### ⚠️ Modo Actual: DUMMY DATA (para MVP/demos)

El MVP funciona con **dummy data** para:
- ✅ Demostración a clientes
- ✅ Pruebas de funcionalidad
- ✅ Desarrollo sin credenciales reales

---

## 🚀 Cómo Activar la API Real de TikTok

### Paso 1: Obtener Credenciales de TikTok Shop

1. Ve a [TikTok Shop Partner Center](https://partner.tiktokshop.com)
2. Crea una aplicación o usa una existente
3. Obtén:
   - **App Key**
   - **App Secret**
   - **Access Token** (se obtiene vía OAuth)

### Paso 2: Configurar OAuth de TikTok Shop

**IMPORTANTE:** Necesitas implementar el flujo OAuth real en `/app/api/integrations/tiktok/connect/route.ts`

Flujo OAuth:
1. Usuario hace clic en "Conectar TikTok Shop"
2. Redirigir a TikTok OAuth URL
3. TikTok redirige de vuelta con `code`
4. Intercambiar `code` por `access_token`
5. Guardar `access_token` en Supabase

### Paso 3: Agregar Variables de Entorno

En **Vercel Dashboard → Environment Variables**, agrega:

```env
# TikTok Shop API
TIKTOK_SHOP_APP_KEY=tu_app_key
TIKTOK_SHOP_APP_SECRET=tu_app_secret

# Activar API real (opcional - por defecto usa dummy data)
USE_REAL_TIKTOK_API=true
```

### Paso 4: Activar API Real

El código detecta automáticamente si debe usar la API real basándose en:
- `USE_REAL_TIKTOK_API=true` en variables de entorno
- `tiktok_access_token` válido en el perfil del usuario

---

## 📚 Documentación de TikTok Shop API

- **Base URL:** `https://open-api.tiktokglobalshop.com`
- **Documentación:** https://partner.tiktokshop.com/docv2
- **Endpoints usados:**
  - `GET /product/202309/products` - Listar productos
  - `GET /product/202309/inventory/search` - Buscar inventario
  - `POST /product/202309/inventory/update` - Actualizar inventario

---

## 🔄 Flujo de Sincronización con API Real

1. **Obtener productos de TikTok:**
   ```typescript
   const tiktokClient = createTikTokShopClient(accessToken)
   const products = await tiktokClient.getAllProducts()
   ```

2. **Obtener inventario de cada producto:**
   ```typescript
   const tiktokStock = await tiktokClient.getProductInventory(productId)
   ```

3. **Comparar con Shopify:**
   ```typescript
   const shopifyClient = createShopifyClient(shopDomain, shopifyToken)
   const shopifyStock = await shopifyClient.getVariantInventory(variantId)
   ```

4. **Actualizar si TikTok = 0 y Shopify > 0:**
   ```typescript
   await tiktokClient.updateInventory({
     productId,
     skuId,
     quantity: shopifyStock
   })
   ```

---

## ⚠️ Limitaciones Actuales

### Para usar API real necesitas:

1. **Mapeo de productos:** 
   - Necesitas crear registros en `tiktok_products` que mapeen:
     - `tiktok_product_id` ↔ `shopify_product_id`
   - Esto se puede hacer manualmente o vía UI

2. **Credenciales de Shopify:**
   - Agregar `shopify_store_url` y `shopify_access_token` al schema
   - O usar el inventario guardado en `tiktok_products.current_inventory`

3. **OAuth de TikTok:**
   - Implementar flujo OAuth completo
   - O usar access token manual (no recomendado para producción)

---

## 🎯 Para MVP: Dummy Data es Suficiente

**El MVP funciona perfectamente con dummy data para:**
- ✅ Demostrar la funcionalidad
- ✅ Probar el flujo completo
- ✅ Mostrar a inversores/clientes
- ✅ Desarrollo y testing

**Puedes lanzar el MVP con dummy data y agregar la API real después.**

---

## 📝 Próximos Pasos para API Real

1. **Implementar OAuth de TikTok Shop** (2-3 horas)
2. **Agregar mapeo de productos** (1-2 horas)
3. **Integrar Shopify API** (2-3 horas)
4. **Testing end-to-end** (1-2 horas)

**Tiempo total:** ~6-10 horas de desarrollo

---

## ✅ Conclusión

**Para lanzar el MVP:** No necesitas la API real todavía. El dummy data funciona perfectamente.

**Para producción real:** Sí necesitas integrar la API real, pero puedes hacerlo después del lanzamiento del MVP.

