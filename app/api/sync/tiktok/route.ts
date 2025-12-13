import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'

/**
 * Endpoint para forzar sincronización de inventario TikTok Shop
 * POST /api/sync/tiktok
 * 
 * TODO: Reemplazar dummy data con llamadas reales a TikTok API
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Verificar autenticación con Clerk
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // 2. Obtener perfil del usuario con tiktok_access_token
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('tiktok_access_token, tiktok_shop_id, tiktok_shop_connected')
      .eq('id', userId)
      .single()

    if (profileError || !profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      )
    }

    // Para MVP con dummy data, permitir sync incluso sin conexión real
    // En producción, esto debería requerir conexión real
    const useDummyData = !profile.tiktok_shop_connected || !profile.tiktok_access_token
    
    if (useDummyData) {
      console.log('Using dummy data mode - TikTok Shop not connected')
    }

    // 3. Crear log inicial de sincronización
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: syncLog, error: logError } = await supabase
      .from('sync_logs')
      .insert({
        user_id: userId,
        tiktok_shop_id: profile.tiktok_shop_id || 'unknown',
        status: 'pending',
        items_synced: 0,
        items_fixed: 0,
        synced_at: null,
      })
      .select()
      .single()

    if (logError) {
      console.error('Error creating sync log:', logError)
      return NextResponse.json(
        { error: 'Failed to create sync log' },
        { status: 500 }
      )
    }

    // 4. Obtener productos de TikTok Shop
    const useRealAPI = process.env.USE_REAL_TIKTOK_API === 'true' && !useDummyData && profile.tiktok_access_token
    
    let itemsChecked = 0
    let itemsFixed = 0
    const fixedProducts: Array<{ productId: string; shopifyStock: number; tiktokStock: number }> = []

    if (useRealAPI) {
      // REAL MODE: Use real TikTok Shop API
      // TODO: Implement real API integration when credentials are available
      // For now, fall through to dummy data mode
      console.log('Real API mode requested but not fully implemented yet')
    }
    
    // DUMMY MODE: Use simulated data (for MVP/demos)
    {
      // MODO DUMMY: Usar datos simulados (para MVP/demos)
      const dummyTikTokProducts = generateDummyTikTokProducts(124)
      itemsChecked = dummyTikTokProducts.length

      for (const tiktokProduct of dummyTikTokProducts) {
        const shopifyStock = Math.floor(Math.random() * 50) + 1
        const tiktokStock = tiktokProduct.inventory

        if (tiktokStock === 0 && shopifyStock > 0) {
          const updateSuccess = Math.random() > 0.1
          if (updateSuccess) {
            itemsFixed++
            fixedProducts.push({
              productId: tiktokProduct.id,
              shopifyStock,
              tiktokStock,
            })
            console.log(`[DUMMY] Fixed product ${tiktokProduct.id}: ${tiktokStock} → ${shopifyStock}`)
          }
        }
      }
    }

    // 7. Actualizar sync_log con resultados
    const { error: updateLogError } = await supabaseAdmin
      .from('sync_logs')
      .update({
        status: itemsFixed > 0 ? 'success' : 'success',
        items_synced: itemsChecked,
        items_fixed: itemsFixed,
        synced_at: new Date().toISOString(),
      })
      .eq('id', syncLog.id)

    if (updateLogError) {
      console.error('Error updating sync log:', updateLogError)
    }

    // 8. Retornar JSON con resultados
    return NextResponse.json({
      success: true,
      items_checked: itemsChecked,
      items_fixed: itemsFixed,
      timestamp: new Date().toISOString(),
      fixed_products: fixedProducts.slice(0, 10), // Solo primeros 10 para no saturar respuesta
    })
  } catch (error: any) {
    console.error('Error in sync endpoint:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error.message 
      },
      { status: 500 }
    )
  }
}

/**
 * Genera productos dummy de TikTok para simulación
 * TODO: Reemplazar con llamada real a TikTok API
 */
function generateDummyTikTokProducts(count: number): Array<{
  id: string
  skuId: string
  shopifyVariantId: string
  inventory: number
  title: string
}> {
  const products: Array<{
    id: string
    skuId: string
    shopifyVariantId: string
    inventory: number
    title: string
  }> = []

  // Simular que ~7 productos tienen inventario 0 (sync fallido)
  const brokenProducts = Math.floor(count * 0.06) // ~6% de productos rotos

  for (let i = 0; i < count; i++) {
    const isBroken = i < brokenProducts
    products.push({
      id: `tiktok_product_${i + 1}`,
      skuId: `sku_${i + 1}`,
      shopifyVariantId: `shopify_variant_${i + 1}`,
      inventory: isBroken ? 0 : Math.floor(Math.random() * 30) + 1, // 0 si está roto, 1-30 si está bien
      title: `Product ${i + 1}`,
    })
  }

  // Mezclar para que no estén todos al inicio
  return products.sort(() => Math.random() - 0.5)
}
