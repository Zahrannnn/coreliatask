/**
 * Core application types
 */

export type User = {
  id: string
  name: string
  email: string
  password: string
  createdAt: number
}

export type Contact = {
  id: string
  name: string
  phone: string
  createdAt: number
  updatedAt: number
}

export interface AuthState {
  users: User[]
  currentUserId: string | null
  remember: boolean
}

export interface ContactsState {
  byUserId: Record<string, Contact[]>
}

