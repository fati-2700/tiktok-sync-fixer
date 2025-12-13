import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function MarketingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary">
                TikTok Sync Fixer
              </Link>
            </div>
            <div>
              <Link href="/sign-in">
                <Button variant="outline">Iniciar Sesión</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
          Nunca Pierdas Ventas por Sync Fallido
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Sincroniza TikTok Shop ↔ Shopify cada 15 minutos. Sin errores.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/sign-up">
            <Button size="lg" className="text-lg px-8">
              Empezar Gratis
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="text-lg px-8">
            Ver Demo
          </Button>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-secondary py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground mb-6">
            Confían en nosotros
          </p>
          <div className="flex justify-center items-center gap-8 mb-6">
            <div className="w-32 h-16 bg-gray-300 rounded opacity-50"></div>
            <div className="w-32 h-16 bg-gray-300 rounded opacity-50"></div>
            <div className="w-32 h-16 bg-gray-300 rounded opacity-50"></div>
          </div>
          <p className="text-center text-sm font-semibold text-foreground">
            500+ dropshippers activos
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <div className="text-4xl mb-4">🔄</div>
              <CardTitle>Sincronización Automática</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Cada 15 minutos detecta errores de inventory y los arregla automáticamente
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="text-4xl mb-4">⚡</div>
              <CardTitle>Recupera Ventas Perdidas</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Productos que aparecen como &apos;Out of Stock&apos; vuelven a estar a la venta
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="text-4xl mb-4">📊</div>
              <CardTitle>Dashboard en Tiempo Real</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Ve qué fue sincronizado, qué falló y cuánto dinero recuperaste
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-secondary py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Planes y Precios</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card>
              <CardHeader>
                <CardTitle>Free</CardTitle>
                <div className="text-3xl font-bold mt-4">
                  $0<span className="text-lg font-normal text-muted-foreground">/mes</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span>1 tienda</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span>Sync cada hora</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full">
                  Empezar Gratis
                </Button>
              </CardContent>
            </Card>

            {/* Starter Plan */}
            <Card className="border-primary border-2">
              <CardHeader>
                <CardTitle>Starter</CardTitle>
                <div className="text-3xl font-bold mt-4">
                  $29<span className="text-lg font-normal text-muted-foreground">/mes</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span>3 tiendas</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span>Sync cada 15 min</span>
                  </li>
                </ul>
                <Button className="w-full">
                  Elegir Starter
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card>
              <CardHeader>
                <CardTitle>Pro</CardTitle>
                <div className="text-3xl font-bold mt-4">
                  $99<span className="text-lg font-normal text-muted-foreground">/mes</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span>Tiendas ilimitadas</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span>Sync cada 5 min</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span>Soporte prioritario</span>
                  </li>
                </ul>
                <Button className="w-full">
                  Elegir Pro
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-auto py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-muted-foreground">
                © 2024 TikTok Sync Fixer. Todos los derechos reservados.
              </p>
            </div>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

