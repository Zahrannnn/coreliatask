/**
 * Contacts slice - manages user contacts
 */
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Contact, ContactsState } from '../types'

const initialState: ContactsState = {
  byUserId: {}
}

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<{ userId: string; name: string; phone: string }>) => {
      const { userId, name, phone } = action.payload
      
      if (!state.byUserId[userId]) {
        state.byUserId[userId] = []
      }

      const now = Date.now()
      const contact: Contact = {
        id: crypto.randomUUID(),
        name: name.trim(),
        phone: phone.trim(),
        createdAt: now,
        updatedAt: now
      }

      state.byUserId[userId].push(contact)
    },

    updateContact: (state, action: PayloadAction<{ userId: string; id: string; name: string; phone: string }>) => {
      const { userId, id, name, phone } = action.payload
      const contacts = state.byUserId[userId]

      if (contacts) {
        const index = contacts.findIndex(c => c.id === id)
        if (index !== -1) {
          contacts[index] = {
            ...contacts[index],
            name: name.trim(),
            phone: phone.trim(),
            updatedAt: Date.now()
          }
        }
      }
    },

    deleteContact: (state, action: PayloadAction<{ userId: string; id: string }>) => {
      const { userId, id } = action.payload
      const contacts = state.byUserId[userId]

      if (contacts) {
        state.byUserId[userId] = contacts.filter(c => c.id !== id)
      }
    }
  }
})

export const { addContact, updateContact, deleteContact } = contactsSlice.actions
export default contactsSlice.reducer

