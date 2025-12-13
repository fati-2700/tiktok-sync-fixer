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
                <Button variant="outline">Sign In</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
          Never Lose Sales Due to Failed Sync
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Sync TikTok Shop ↔ Shopify every 15 minutes. No errors.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/sign-up">
            <Button size="lg" className="text-lg px-8">
              Start Free
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="text-lg px-8">
            View Demo
          </Button>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-secondary py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground mb-6">
            Trusted by
          </p>
          <div className="flex justify-center items-center gap-8 mb-6">
            <div className="w-32 h-16 bg-gray-300 rounded opacity-50"></div>
            <div className="w-32 h-16 bg-gray-300 rounded opacity-50"></div>
            <div className="w-32 h-16 bg-gray-300 rounded opacity-50"></div>
          </div>
          <p className="text-center text-sm font-semibold text-foreground">
            500+ active dropshippers
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <div className="text-4xl mb-4">🔄</div>
              <CardTitle>Automatic Sync</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Every 15 minutes detects inventory errors and fixes them automatically
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="text-4xl mb-4">⚡</div>
              <CardTitle>Recover Lost Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Products showing as &apos;Out of Stock&apos; are back on sale
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="text-4xl mb-4">📊</div>
              <CardTitle>Real-Time Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                See what was synced, what failed, and how much money you recovered
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-secondary py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Plans & Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card>
              <CardHeader>
                <CardTitle>Free</CardTitle>
                <div className="text-3xl font-bold mt-4">
                  $0<span className="text-lg font-normal text-muted-foreground">/mo</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span>1 store</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span>Sync every hour</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full">
                  Start Free
                </Button>
              </CardContent>
            </Card>

            {/* Starter Plan */}
            <Card className="border-primary border-2">
              <CardHeader>
                <CardTitle>Starter</CardTitle>
                <div className="text-3xl font-bold mt-4">
                  $29<span className="text-lg font-normal text-muted-foreground">/mo</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span>3 stores</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span>Sync every 15 min</span>
                  </li>
                </ul>
                <Button className="w-full">
                  Choose Starter
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card>
              <CardHeader>
                <CardTitle>Pro</CardTitle>
                <div className="text-3xl font-bold mt-4">
                  $99<span className="text-lg font-normal text-muted-foreground">/mo</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span>Unlimited stores</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span>Sync every 5 min</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    <span>Priority support</span>
                  </li>
                </ul>
                <Button className="w-full">
                  Choose Pro
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
                © 2024 TikTok Sync Fixer. All rights reserved.
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
