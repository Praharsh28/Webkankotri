// Template Type Definitions

export interface BaseTemplateData {
  groomName: string
  brideName: string
  weddingDate: string // ISO date string
  venue: string
  primaryColor: string // Hex color
}

export interface GarbaNightData extends BaseTemplateData {
  groomParents?: string
  brideParents?: string
  customMessage?: string
}

export interface TemplateConfig {
  id: string
  name: string
  description: string
  category: 'kankotri' | 'card'
  subcategory: string
  price: number
  is_popular: boolean
  preview_image_url: string
  preview_video_url: string
  fields: {
    [key: string]: FieldConfig
  }
}

export interface FieldConfig {
  type: 'text' | 'date' | 'color' | 'textarea' | 'number' | 'email' | 'phone'
  label: string
  required: boolean
  default?: any
  placeholder?: string
  validation?: {
    min?: number
    max?: number
    pattern?: string
  }
}

export interface Template {
  id: string
  name: string
  description: string
  category: 'kankotri' | 'card'
  subcategory: string
  price: number
  is_popular: boolean
  preview_image_url: string
  preview_video_url: string
  config: TemplateConfig
  created_at: string
  updated_at: string
}

export interface Invitation {
  id: string
  user_id: string
  template_id: string
  data: Record<string, any>
  slug: string
  status: 'draft' | 'published' | 'archived'
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded'
  payment_id?: string
  created_at: string
  updated_at: string
}
