/**
 * API Configuration for CMS Service
 */

// Get API URLs from environment variables or use defaults
export const API_CONFIG = {
  // CMS Service API
  CMS_API_URL:
    import.meta.env.PUBLIC_CMS_API_URL ||
    (import.meta.env.PROD
      ? 'https://facundogrowth.com'
      : 'http://localhost:8001'),

  // Webhook externo para leads (Google Sheets)
  WEBHOOK_URL: 'https://hooksnochon.facundo.click/webhook/contacto-perso',
} as const

// API Endpoints
export const API_ENDPOINTS = {
  // CMS Service endpoints (Blog)
  posts: {
    list: `${API_CONFIG.CMS_API_URL}/api/posts`,
    get: (slug: string) => `${API_CONFIG.CMS_API_URL}/api/posts/${slug}`,
    create: `${API_CONFIG.CMS_API_URL}/api/admin/posts`,
    update: (id: number) => `${API_CONFIG.CMS_API_URL}/api/admin/posts/${id}`,
    delete: (id: number) => `${API_CONFIG.CMS_API_URL}/api/admin/posts/${id}`,
  },

  // Webhook para leads
  leads: {
    create: API_CONFIG.WEBHOOK_URL,
  },
} as const
