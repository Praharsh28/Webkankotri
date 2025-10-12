// Formatting Utilities

import { format as dateFnsFormat } from 'date-fns'

/**
 * Format currency (Indian Rupees)
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format date for display
 */
export function formatDate(date: string | Date, formatStr: string = 'EEEE, MMMM d, yyyy'): string {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return dateFnsFormat(dateObj, formatStr)
  } catch {
    return String(date)
  }
}

/**
 * Format phone number (Indian format)
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`
  }
  
  return phone
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

/**
 * Generate random slug
 */
export function generateSlug(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15)
}
