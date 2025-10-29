/**
 * User type definitions
 */

export interface User {
  id: string
  username: string
  passwordHash: string
  email: string
  createdAt: string
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface AuthToken {
  token: string
  expiresIn: string
}

export interface JWTPayload {
  userId: string
  username: string
  email: string
}
