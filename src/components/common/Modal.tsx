
import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
  size?: 'sm' | 'md' | 'lg'
}

const sizeStyles = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl'
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md'
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('mousedown', handleClickOutside)

    // Prevent body scroll
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const modalContent = (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center p-4'
      role='dialog'
      aria-modal='true'
      aria-labelledby='modal-title'
    >
      {/* Backdrop */}
      <div className='absolute inset-0 bg-black/50 transition-opacity' />

      {/* Modal */}
      <div
        ref={modalRef}
        className={`relative w-full ${sizeStyles[size]} rounded-lg bg-white shadow-xl transition-all`}
      >
        {/* Header */}
        <div className='flex items-center justify-between border-b border-zinc-200 px-6 py-4'>
          <h2 id='modal-title' className='text-lg font-semibold text-zinc-900'>
            {title}
          </h2>
          <button
            onClick={onClose}
            className='rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-teal-500'
            aria-label='Close modal'
          >
            <svg className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className='px-6 py-4'>
          {children}
        </div>

        {/* Footer */}
        {footer ? (
          <div className='flex items-center justify-end gap-3 border-t border-zinc-200 px-6 py-4'>
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}

