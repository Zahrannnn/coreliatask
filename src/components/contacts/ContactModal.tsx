
import { useState, useEffect } from 'react'
import type { Contact } from '../../types'
import { Modal } from '../common/Modal'
import { Input } from '../common/Input'
import { Button } from '../common/Button'

type ContactModalProps = {
  isOpen: boolean
  onClose: () => void
  onSave: (name: string, phone: string) => string | null
  contact?: Contact
}

export const ContactModal = ({
  isOpen,
  onClose,
  onSave,
  contact
}: ContactModalProps) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isEditMode = !!contact

  useEffect(() => {
    if (isOpen) {
      setName(contact?.name || '')
      setPhone(contact?.phone || '')
      setError(null)
    }
  }, [isOpen, contact])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    const validationError = onSave(name, phone)
    
    setIsSubmitting(false)

    if (validationError) {
      setError(validationError)
      return
    }

    handleClose()
  }

  const handleClose = () => {
    setName('')
    setPhone('')
    setError(null)
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditMode ? 'Edit Contact' : 'Add New Contact'}
      footer={
        <>
          <Button variant='secondary' onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} isLoading={isSubmitting}>
            {isEditMode ? 'Update' : 'Add Contact'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className='space-y-4'>
        <Input
          label='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Enter contact name'
          required
          autoFocus
        />

        <Input
          label='Phone Number'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder='e.g., +201234567890'
          type='tel'
          required
          helperText='Enter 7-15 digits, optionally starting with +'
        />

        {error ? (
          <div className='rounded-md bg-red-50 p-3'>
            <p className='text-sm text-red-800' role='alert'>{error}</p>
          </div>
        ) : null}
      </form>
    </Modal>
  )
}

