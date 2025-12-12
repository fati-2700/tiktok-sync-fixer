import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'

/**
 * Endpoint para desconectar TikTok Shop
 * POST /api/integrations/tiktok/disconnect
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

    // Desconectar: limpiar tokens y marcar como desconectado
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        tiktok_shop_connected: false,
        tiktok_access_token: null,
        tiktok_shop_id: null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)

    if (updateError) {
      console.error('Error updating profile:', updateError)
      return NextResponse.json(
        { error: 'Failed to disconnect', details: updateError.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'TikTok Shop disconnected successfully',
    })
  } catch (error: any) {
    console.error('Error in disconnect endpoint:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}

