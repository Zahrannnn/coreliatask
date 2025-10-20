
import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
  helperText?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const inputId = id || `input-${label?.toLowerCase().replace(/\s/g, '-')}`
    
    const baseStyles = 'w-full rounded-md border bg-white px-4 py-3 outline-none transition-colors'
    const normalStyles = 'border-zinc-300 focus:border-teal-600'
    const errorStyles = 'border-red-500 focus:border-red-600'
    
    const inputClasses = [
      baseStyles,
      error ? errorStyles : normalStyles,
      className
    ].join(' ')

    return (
      <div className='w-full'>
        {label ? (
          <label htmlFor={inputId} className='mb-1.5 block text-sm font-medium text-zinc-700'>
            {label}
          </label>
        ) : null}
        
        <input
          ref={ref}
          id={inputId}
          className={inputClasses}
          {...(error && { 'aria-invalid': 'true' })}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        
        {error ? (
          <p id={`${inputId}-error`} className='mt-1.5 text-sm text-red-600' role='alert'>
            {error}
          </p>
        ) : helperText ? (
          <p id={`${inputId}-helper`} className='mt-1.5 text-sm text-zinc-500'>
            {helperText}
          </p>
        ) : null}
      </div>
    )
  }
)

Input.displayName = 'Input'

