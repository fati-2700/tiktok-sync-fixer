import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Rutas públicas (no requieren autenticación)
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhooks(.*)',
])

export default clerkMiddleware(async (auth, request) => {
  try {
    // Proteger todas las rutas excepto las públicas
    if (!isPublicRoute(request)) {
      const { userId } = await auth()
      
      if (!userId) {
        // Redirigir a sign-in si no está autenticado
        const signInUrl = new URL('/sign-in', request.url)
        signInUrl.searchParams.set('redirect_url', request.url)
        return NextResponse.redirect(signInUrl)
      }
    }
  } catch (error) {
    // Si hay un error con Clerk (por ejemplo, variables no configuradas),
    // permitir acceso a rutas públicas
    console.error('Error in Clerk middleware:', error)
    if (isPublicRoute(request)) {
      return NextResponse.next()
    }
    // Para rutas protegidas, redirigir a sign-in
    const signInUrl = new URL('/sign-in', request.url)
    return NextResponse.redirect(signInUrl)
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}

