// Dynamic URL Utilities
// CRITICAL: Never hardcode URLs!

/**
 * Get the base application URL
 * Works in development, preview, and production
 */
export function getAppUrl(): string {
  // Client-side
  if (typeof window !== 'undefined') {
    return window.location.origin
  }

  // Server-side
  const appUrl = process.env.NEXT_PUBLIC_APP_URL
  if (appUrl) {
    return appUrl
  }

  // Fallback for Vercel deployments
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  // Development fallback
  return 'http://localhost:3000'
}

/**
 * Get the full URL for an invitation
 */
export function getInvitationUrl(slug: string): string {
  return `${getAppUrl()}/i/${slug}`
}

/**
 * Get the full URL for a template preview
 */
export function getTemplatePreviewUrl(templateId: string): string {
  return `${getAppUrl()}/templates/${templateId}`
}

/**
 * Get the full URL for the editor
 */
export function getEditorUrl(invitationId: string): string {
  return `${getAppUrl()}/editor/${invitationId}`
}

/**
 * Get the API base URL
 */
export function getApiUrl(): string {
  return `${getAppUrl()}/api`
}
