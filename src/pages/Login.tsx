/**
 * Login page
 */
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { loginUser } from '../store/authSlice'
import { Input } from '../components/common/Input'
import { PasswordInput } from '../components/common/PasswordInput'
import { Button } from '../components/common/Button'

const LoginPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const users = useAppSelector(s => s.auth.users)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email || !password) {
      setError('Please enter your email and password')
      return
    }

    // Check credentials
    const normalizedEmail = email.toLowerCase().trim()
    const user = users.find(u => u.email === normalizedEmail && u.password === password)
    
    if (!user) {
      setError('Invalid email or password')
      return
    }

    setIsSubmitting(true)
    dispatch(loginUser({ email, password, remember: rememberMe }))
    setIsSubmitting(false)
    navigate('/contacts')
  }

  return (
    <div className='flex min-h-dvh items-center justify-center bg-gradient-to-br from-teal-50 to-violet-50 px-4'>
      <div className='w-full max-w-md'>
        <div className='rounded-2xl bg-white p-8 shadow-lg'>
          {/* Logo */}
          <div className='mb-8 text-center'>
           <img src="/Corelia_RICOH_logo.svg" alt="" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-4'>
            <Input
              label='Email Address'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
              required
              autoFocus
            />

            <PasswordInput
              label='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your password'
              required
            />

            <div className='flex items-center justify-between pt-2'>
              <label className='flex cursor-pointer items-center gap-2'>
                <input
                  type='checkbox'
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className='h-4 w-4 cursor-pointer rounded border-zinc-300 accent-teal-600 text-teal-600 '
                />
                <span className='text-sm text-zinc-700'>Remember me</span>
              </label>

              <button type='button' className='text-sm text-zinc-400 hover:text-zinc-600' disabled>
                Forgot Password?
              </button>
            </div>

            {error ? (
              <div className='rounded-md bg-red-50 p-3'>
                <p className='text-sm text-red-800' role='alert'>{error}</p>
              </div>
            ) : null}

            <Button type='submit' fullWidth isLoading={isSubmitting}>
              Sign In
            </Button>
          </form>

          {/* Footer */}
          <p className='mt-6 text-center text-sm text-zinc-600'>
            Don&apos;t have an account?{' '}
            <Link to='/register' className='font-medium text-teal-700 hover:text-teal-800 hover:underline'>
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
