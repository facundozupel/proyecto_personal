/**
 * Client-side authentication utilities
 * Handles JWT token storage and validation in browser
 */

const TOKEN_KEY = 'auth_token'

export interface AuthUser {
  id: string
  username: string
  email: string
}

export interface LoginResponse {
  token: string
  expiresIn: string
  user: AuthUser
}

/**
 * Save auth token to localStorage
 */
export function saveToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token)
  }
}

/**
 * Get auth token from localStorage
 */
export function getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY)
  }
  return null
}

/**
 * Remove auth token from localStorage
 */
export function removeToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY)
  }
}

/**
 * Check if user is authenticated (has valid token)
 */
export function isAuthenticated(): boolean {
  return getToken() !== null
}

/**
 * Login user with credentials
 */
export async function login(username: string, password: string): Promise<LoginResponse> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Login failed')
  }

  const data: LoginResponse = await response.json()
  saveToken(data.token)
  return data
}

/**
 * Logout user (remove token)
 */
export function logout(): void {
  removeToken()
  if (typeof window !== 'undefined') {
    window.location.href = '/admin/login'
  }
}

/**
 * Redirect to login if not authenticated
 */
export function requireAuth(): void {
  if (typeof window !== 'undefined' && !isAuthenticated()) {
    window.location.href = '/admin/login'
  }
}
