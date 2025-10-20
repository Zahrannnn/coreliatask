/**
 * Registration page
 */
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { registerUser } from '../store/authSlice'
import { validateUser } from '../utils/validation'
import { Input } from '../components/common/Input'
import { PasswordInput } from '../components/common/PasswordInput'
import { Button } from '../components/common/Button'

const RegisterPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const users = useAppSelector(s => s.auth.users)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validate input
    const result = validateUser({ name, email, password })
    if (!result.success) {
      setError(result.error.issues[0].message)
      return
    }

    // Check if email already exists
    if (users.some(u => u.email === email.toLowerCase().trim())) {
      setError('Email already registered')
      return
    }

    setIsSubmitting(true)
    dispatch(registerUser(result.data))
    setIsSubmitting(false)
    navigate('/contacts')
  }

  return (
    <div className='flex min-h-dvh items-center justify-center bg-gradient-to-br from-teal-50 to-violet-50 px-4'>
      <div className='w-full max-w-md'>
        <div className='rounded-2xl bg-white p-8 shadow-lg'>
          {/* Logo */}
          <div className='mb-8 text-center'>
            <h1 className='text-3xl font-bold tracking-widest text-violet-700'>CORELIA</h1>
            <p className='text-xs tracking-wide text-zinc-500'>A RICOH Company</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-4'>
            <Input
              label='Full Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter your full name'
              required
              autoFocus
            />

            <Input
              label='Email Address'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
              required
            />

            <PasswordInput
              label='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Create a password'
              required
            />

            {error ? (
              <div className='rounded-md bg-red-50 p-3'>
                <p className='text-sm text-red-800' role='alert'>{error}</p>
              </div>
            ) : null}

            <Button type='submit' fullWidth isLoading={isSubmitting}>
              Register
            </Button>
          </form>

          {/* Footer */}
          <p className='mt-6 text-center text-sm text-zinc-600'>
            Already have an account?{' '}
            <Link to='/login' className='font-medium text-teal-700 hover:text-teal-800 hover:underline'>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
