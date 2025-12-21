/**
 * Auth slice - manages user authentication
 */
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { User, AuthState } from '../types'
import { getFromStorage } from '../utils/storage'

const defaultState: AuthState = {
  users: [],
  currentUserId: null,
  remember: true
}

const initialState: AuthState = getFromStorage('auth', defaultState)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<{ name: string; email: string; password: string }>) => {
      const { name, email, password } = action.payload
      const normalizedEmail = email.toLowerCase().trim()
      
      // Check if email already exists
      if (state.users.some(u => u.email === normalizedEmail)) {
        return
      }

      const user: User = {
        id: crypto.randomUUID(),
        name: name.trim(),
        email: normalizedEmail,
        password,
        createdAt: Date.now()
      }
      
      state.users.push(user)
      state.currentUserId = user.id
      state.remember = true
    },

    loginUser: (state, action: PayloadAction<{ email: string; password: string; remember: boolean }>) => {
      const { email, password, remember } = action.payload
      const normalizedEmail = email.toLowerCase().trim()
      
      const user = state.users.find(
        u => u.email === normalizedEmail && u.password === password
      )

      if (user) {
        state.currentUserId = user.id
        state.remember = remember
      }
    },

    logout: (state) => {
      state.currentUserId = null
    }
  }
})

export const { registerUser, loginUser, logout } = authSlice.actions
export default authSlice.reducer

