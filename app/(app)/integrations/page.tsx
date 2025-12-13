'use client'

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useUser } from "@clerk/nextjs"
import { createClient } from "@supabase/supabase-js"
import { formatDistanceToNow } from "date-fns"
import { enUS } from "date-fns/locale/en-US"

export default function IntegrationsPage() {
  const router = useRouter()
  const { user } = useUser()
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  )
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isDisconnecting, setIsDisconnecting] = useState(false)
  const [shopName, setShopName] = useState<string | null>(null)
  const [lastSync, setLastSync] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)

  const loadConnectionStatus = useCallback(async () => {
    try {
      if (!user || !user.id) {
        router.push('/sign-in')
        return
      }

      setUserId(user.id)

      // Get user profile
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('tiktok_shop_connected, tiktok_shop_id, tiktok_access_token')
        .eq('id', user.id)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading profile:', error)
      }

      if (profile) {
        setIsConnected(profile.tiktok_shop_connected || false)
        setShopName(profile.tiktok_shop_id || 'My TikTok Shop')
        
        // Get last sync
        if (profile.tiktok_shop_id) {
          const { data: lastSyncData } = await supabase
            .from('sync_logs')
            .select('synced_at')
            .eq('user_id', user.id)
            .eq('tiktok_shop_id', profile.tiktok_shop_id)
            .order('synced_at', { ascending: false })
            .limit(1)
            .single()

          if (lastSyncData?.synced_at) {
            setLastSync(lastSyncData.synced_at)
          }
        }
      }
    } catch (error) {
      console.error('Error loading connection status:', error)
    } finally {
      setIsLoading(false)
    }
  }, [user, router, supabase])

  useEffect(() => {
    loadConnectionStatus()
  }, [loadConnectionStatus])

  const handleConnect = async () => {
    if (!userId) return

    setIsConnecting(true)
    try {
      // Call API endpoint to connect (fake)
      const response = await fetch('/api/integrations/tiktok/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        // Reload status
        await loadConnectionStatus()
        router.refresh()
      } else {
        const error = await response.json()
        console.error('Error connecting:', error)
        alert('Error connecting. Please try again.')
      }
    } catch (error) {
      console.error('Error connecting:', error)
      alert('Error connecting. Please try again.')
    } finally {
      setIsConnecting(false)
    }
  }

  const handleDisconnect = async () => {
    if (!userId) return

    if (!confirm('Are you sure you want to disconnect TikTok Shop?')) {
      return
    }

    setIsDisconnecting(true)
    try {
      const response = await fetch('/api/integrations/tiktok/disconnect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        await loadConnectionStatus()
        router.refresh()
      } else {
        const error = await response.json()
        console.error('Error disconnecting:', error)
        alert('Error disconnecting. Please try again.')
      }
    } catch (error) {
      console.error('Error disconnecting:', error)
      alert('Error disconnecting. Please try again.')
    } finally {
      setIsDisconnecting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-2xl font-bold text-primary">
                TikTok Sync Fixer
              </Link>
              <div className="hidden md:flex items-center gap-6">
                <Link href="/dashboard" className="text-sm font-medium hover:text-primary">
                  Dashboard
                </Link>
                <Link href="/integrations" className="text-sm font-medium text-primary">
                  Integrations
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold mb-8">Connect TikTok Shop</h1>

        {!isConnected ? (
          <>
            {/* Instruction Card */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4 list-decimal list-inside">
                  <li className="text-base">
                    Click the button below
                  </li>
                  <li className="text-base">
                    Authorize our app to access your TikTok Shop
                  </li>
                  <li className="text-base">
                    We will have access to inventory to sync
                  </li>
                </ol>
              </CardContent>
            </Card>

            {/* Connect Button */}
            <div className="flex justify-center">
              <Button
                size="lg"
                className="text-lg px-8"
                onClick={handleConnect}
                disabled={isConnecting}
              >
                {isConnecting ? "Connecting..." : "Connect with TikTok Shop OAuth"}
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Connected Status Card */}
            <Card className="mb-8 border-primary">
              <CardHeader>
                <CardTitle className="text-green-600">✓ Connected</CardTitle>
                <CardDescription>
                  Your TikTok Shop account is connected and ready to sync
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Connected to:</p>
                  <p className="text-lg font-semibold">{shopName}</p>
                </div>
                {lastSync && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Last sync:</p>
                    <p className="text-lg font-semibold">
                      {formatDistanceToNow(new Date(lastSync), {
                        addSuffix: true,
                        locale: enUS,
                      })}
                    </p>
                  </div>
                )}
                <div className="pt-4">
                  <Button
                    variant="destructive"
                    onClick={handleDisconnect}
                    disabled={isDisconnecting}
                  >
                    {isDisconnecting ? "Disconnecting..." : "Disconnect"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  )
}
