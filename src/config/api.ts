/**
 * API Configuration for microservices
 */

// Get API URLs from environment variables or use defaults
export const API_CONFIG = {
  CMS_API_URL: import.meta.env.VITE_CMS_API_URL || 'http://localhost:8001',
  LEAD_API_URL: import.meta.env.VITE_LEAD_API_URL || 'http://localhost:8002',
} as const

// API Endpoints
export const API_ENDPOINTS = {
  // CMS Service endpoints
  articles: {
    list: `${API_CONFIG.CMS_API_URL}/articles`,
    get: (id: string) => `${API_CONFIG.CMS_API_URL}/articles/${id}`,
    getBySlug: (slug: string) => `${API_CONFIG.CMS_API_URL}/articles/slug/${slug}`,
    create: `${API_CONFIG.CMS_API_URL}/articles`,
    update: (id: string) => `${API_CONFIG.CMS_API_URL}/articles/${id}`,
    delete: (id: string) => `${API_CONFIG.CMS_API_URL}/articles/${id}`,
  },

  // Lead Service endpoints
  leads: {
    list: `${API_CONFIG.LEAD_API_URL}/leads`,
    get: (id: string) => `${API_CONFIG.LEAD_API_URL}/leads/${id}`,
    create: `${API_CONFIG.LEAD_API_URL}/leads`,
    updateStatus: (id: string) => `${API_CONFIG.LEAD_API_URL}/leads/${id}/status`,
    delete: (id: string) => `${API_CONFIG.LEAD_API_URL}/leads/${id}`,
  },
} as const
