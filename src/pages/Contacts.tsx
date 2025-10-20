/**
 * Contacts management page
 */
import { useState } from 'react'
import type { Contact } from '../types'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { addContact, updateContact, deleteContact } from '../store/contactsSlice'
import { validateContact } from '../utils/validation'
import { useSorting } from '../hooks/useSorting'
import { usePagination } from '../hooks/usePagination'
import { PageLayout } from '../components/layout/PageLayout'
import { ContactsTable } from '../components/contacts/ContactsTable'
import { ContactModal } from '../components/contacts/ContactModal'
import { Pagination } from '../components/contacts/Pagination'
import { Button } from '../components/common/Button'

const ContactsPage = () => {
  const dispatch = useAppDispatch()
  const currentUserId = useAppSelector(s => s.auth.currentUserId)!
  const contacts = useAppSelector(s => s.contacts.byUserId[currentUserId] || [])
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingContact, setEditingContact] = useState<Contact>()

  // Sort and paginate
  const { sortedItems, ascending, toggleSort } = useSorting(contacts)
  const { paginatedItems, currentPage, totalPages, goToPage, canGoNext, canGoPrev, pageSize } = 
    usePagination(sortedItems, 5)

  const handleOpenAddModal = () => {
    setEditingContact(undefined)
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (contact: Contact) => {
    setEditingContact(contact)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingContact(undefined)
  }

  const handleSaveContact = (name: string, phone: string) => {
    const result = validateContact({ name, phone })
    if (!result.success) {
      return result.error.issues[0].message
    }

    if (editingContact) {
      dispatch(updateContact({ userId: currentUserId, id: editingContact.id, ...result.data }))
    } else {
      dispatch(addContact({ userId: currentUserId, ...result.data }))
    }
    
    return null
  }

  const handleDelete = (id: string) => {
    dispatch(deleteContact({ userId: currentUserId, id }))
  }

  return (
    <PageLayout>
      <div className='space-y-6'>
        {/* Header */}
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h1 className='text-2xl font-bold text-zinc-900'>Contacts</h1>
            <p className='mt-1 text-sm text-zinc-500'>
              You have {contacts.length} {contacts.length === 1 ? 'contact' : 'contacts'}
            </p>
          </div>

          <Button onClick={handleOpenAddModal}>
            
            Add Contact
          </Button>
        </div>

        {/* Controls */}
        <div className='flex items-center justify-between'>
          <Button variant='secondary' size='sm' onClick={toggleSort} className='flex items-center justify-center'>
            Sort by Name
            <svg 
              className={`ml-2 h-4 w-4 transition-transform ${ascending ? '' : 'rotate-180'}`}
              fill='none' 
              stroke='currentColor' 
              viewBox='0 0 24 24'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 15l7-7 7 7' />
            </svg>
          </Button>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            canGoNext={canGoNext}
            canGoPrev={canGoPrev}
          />
        </div>

        {/* Table */}
        <ContactsTable
          contacts={paginatedItems}
          currentPage={currentPage}
          pageSize={pageSize}
          onEdit={handleOpenEditModal}
          onDelete={handleDelete}
        />

        {/* Bottom Pagination */}
        {totalPages > 1 ? (
          <div className='flex justify-center'>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
              canGoNext={canGoNext}
              canGoPrev={canGoPrev}
            />
          </div>
        ) : null}
      </div>

      {/* Modal */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveContact}
        contact={editingContact}
      />
    </PageLayout>
  )
}

export default ContactsPage
