/**
 * Input validation utilities
 */
import { z } from 'zod'

export const userSchema = z.object({
  name: z.string()
    .min(3, 'Name must be at least 3 characters')
    .max(100, 'Name is too long'),
  email: z.string()
    .email('Enter a valid email address')
    .toLowerCase()
    .trim(),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .max(128, 'Password is too long')
})

export const contactSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name is too long')
    .trim(),
  phone: z.string()
    .regex(/^\+?\d{7,15}$/, 'Enter a valid phone number (7-15 digits)')
    .trim()
})

export const validateUser = (data: unknown) => userSchema.safeParse(data)
export const validateContact = (data: unknown) => contactSchema.safeParse(data)

