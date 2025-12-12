/**
 * Tipos TypeScript generados para la base de datos Supabase
 * Basado en el schema.sql
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Plan = 'free' | 'starter' | 'pro'
export type SyncStatus = 'pending' | 'success' | 'failed'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string // Clerk user ID
          email: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          plan: Plan
          tiktok_shop_connected: boolean
          tiktok_access_token: string | null
          tiktok_shop_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          plan?: Plan
          tiktok_shop_connected?: boolean
          tiktok_access_token?: string | null
          tiktok_shop_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          plan?: Plan
          tiktok_shop_connected?: boolean
          tiktok_access_token?: string | null
          tiktok_shop_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      sync_logs: {
        Row: {
          id: string
          user_id: string
          tiktok_shop_id: string
          status: SyncStatus
          items_synced: number
          items_fixed: number
          error_message: string | null
          synced_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          tiktok_shop_id: string
          status: SyncStatus
          items_synced?: number
          items_fixed?: number
          error_message?: string | null
          synced_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          tiktok_shop_id?: string
          status?: SyncStatus
          items_synced?: number
          items_fixed?: number
          error_message?: string | null
          synced_at?: string | null
          created_at?: string
        }
      }
      tiktok_products: {
        Row: {
          id: string
          user_id: string
          tiktok_product_id: string
          shopify_product_id: string
          title: string | null
          current_inventory: number
          tiktok_inventory: number
          last_sync: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          tiktok_product_id: string
          shopify_product_id: string
          title?: string | null
          current_inventory?: number
          tiktok_inventory?: number
          last_sync?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          tiktok_product_id?: string
          shopify_product_id?: string
          title?: string | null
          current_inventory?: number
          tiktok_inventory?: number
          last_sync?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

