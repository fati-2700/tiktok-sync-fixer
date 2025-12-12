import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'

/**
 * Endpoint FAKE para conectar TikTok Shop
 * POST /api/integrations/tiktok/connect
 * 
 * TODO: Implementar OAuth real de TikTok Shop
 */
export async function POST(request: NextRequest) {
  try {
    // Obtener usuario autenticado con Clerk
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Crear cliente de Supabase con service role para poder actualizar
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // FAKE: Generar token y shop ID fake
    const fakeToken = `fake_tiktok_token_${Date.now()}_${Math.random().toString(36).substring(7)}`
    const fakeShopId = `shop_${Math.random().toString(36).substring(2, 9)}`
    const fakeShopName = `Mi Tienda TikTok ${fakeShopId.substring(5)}`

    // Actualizar perfil en Supabase
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        tiktok_shop_connected: true,
        tiktok_access_token: fakeToken,
        tiktok_shop_id: fakeShopId,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)

    if (updateError) {
      console.error('Error updating profile:', updateError)
      return NextResponse.json(
        { error: 'Failed to update profile', details: updateError.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'TikTok Shop connected successfully',
      shopId: fakeShopId,
      shopName: fakeShopName,
    })
  } catch (error: any) {
    console.error('Error in connect endpoint:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}

