/**
 * Redux store configuration
 */
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import contactsReducer from './contactsSlice'
import { saveToStorage } from '../utils/storage'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contacts: contactsReducer
  }
})

// Auto-save to localStorage
store.subscribe(() => {
  const state = store.getState()
  saveToStorage('auth', state.auth)
  saveToStorage('contacts', state.contacts)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

