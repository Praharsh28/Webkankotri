// Supabase Database Types
// Auto-generated types from database schema

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          full_name: string | null
          phone: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      templates: {
        Row: {
          id: string
          template_id: string
          name: string
          description: string | null
          category: string
          thumbnail_url: string | null
          preview_video_url: string | null
          price_tier: string
          price: number
          config: Json
          is_active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          template_id: string
          name: string
          description?: string | null
          category: string
          thumbnail_url?: string | null
          preview_video_url?: string | null
          price_tier?: string
          price?: number
          config?: Json
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          template_id?: string
          name?: string
          description?: string | null
          category?: string
          thumbnail_url?: string | null
          preview_video_url?: string | null
          price_tier?: string
          price?: number
          config?: Json
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      invitations: {
        Row: {
          id: string
          user_id: string
          template_id: string
          title: string
          slug: string
          data: Json
          customizations: Json | null
          status: string
          is_paid: boolean
          payment_id: string | null
          view_count: number
          unique_view_count: number
          wedding_date: string | null
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          template_id: string
          title: string
          slug: string
          data?: Json
          customizations?: Json | null
          status?: string
          is_paid?: boolean
          payment_id?: string | null
          view_count?: number
          unique_view_count?: number
          wedding_date?: string | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          template_id?: string
          title?: string
          slug?: string
          data?: Json
          customizations?: Json | null
          status?: string
          is_paid?: boolean
          payment_id?: string | null
          view_count?: number
          unique_view_count?: number
          wedding_date?: string | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      guests: {
        Row: {
          id: string
          invitation_id: string
          name: string
          email: string | null
          phone: string | null
          guest_code: string | null
          has_viewed: boolean
          view_count: number
          last_viewed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          invitation_id: string
          name: string
          email?: string | null
          phone?: string | null
          guest_code?: string | null
          has_viewed?: boolean
          view_count?: number
          last_viewed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          invitation_id?: string
          name?: string
          email?: string | null
          phone?: string | null
          guest_code?: string | null
          has_viewed?: boolean
          view_count?: number
          last_viewed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      rsvps: {
        Row: {
          id: string
          invitation_id: string
          guest_id: string | null
          name: string
          email: string | null
          phone: string | null
          attending: string
          guest_count: number | null
          meal_preference: string | null
          message: string | null
          custom_fields: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          invitation_id: string
          guest_id?: string | null
          name: string
          email?: string | null
          phone?: string | null
          attending: string
          guest_count?: number | null
          meal_preference?: string | null
          message?: string | null
          custom_fields?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          invitation_id?: string
          guest_id?: string | null
          name?: string
          email?: string | null
          phone?: string | null
          attending?: string
          guest_count?: number | null
          meal_preference?: string | null
          message?: string | null
          custom_fields?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          user_id: string
          invitation_id: string | null
          template_id: string
          amount: number
          currency: string
          status: string
          razorpay_order_id: string | null
          razorpay_payment_id: string | null
          razorpay_signature: string | null
          payment_method: string | null
          error_message: string | null
          paid_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          invitation_id?: string | null
          template_id: string
          amount: number
          currency?: string
          status?: string
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          razorpay_signature?: string | null
          payment_method?: string | null
          error_message?: string | null
          paid_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          invitation_id?: string | null
          template_id?: string
          amount?: number
          currency?: string
          status?: string
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          razorpay_signature?: string | null
          payment_method?: string | null
          error_message?: string | null
          paid_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      media_files: {
        Row: {
          id: string
          user_id: string
          invitation_id: string | null
          file_name: string
          file_path: string
          file_url: string
          file_type: string
          file_size: number | null
          mime_type: string | null
          width: number | null
          height: number | null
          thumbnail_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          invitation_id?: string | null
          file_name: string
          file_path: string
          file_url: string
          file_type: string
          file_size?: number | null
          mime_type?: string | null
          width?: number | null
          height?: number | null
          thumbnail_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          invitation_id?: string | null
          file_name?: string
          file_path?: string
          file_url?: string
          file_type?: string
          file_size?: number | null
          mime_type?: string | null
          width?: number | null
          height?: number | null
          thumbnail_url?: string | null
          created_at?: string
        }
      }
      analytics_events: {
        Row: {
          id: string
          invitation_id: string
          event_type: string
          visitor_id: string | null
          ip_address: string | null
          user_agent: string | null
          referrer: string | null
          country: string | null
          city: string | null
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          invitation_id: string
          event_type: string
          visitor_id?: string | null
          ip_address?: string | null
          user_agent?: string | null
          referrer?: string | null
          country?: string | null
          city?: string | null
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          invitation_id?: string
          event_type?: string
          visitor_id?: string | null
          ip_address?: string | null
          user_agent?: string | null
          referrer?: string | null
          country?: string | null
          city?: string | null
          metadata?: Json | null
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
