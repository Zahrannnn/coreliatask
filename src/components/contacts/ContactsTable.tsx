
import type { Contact } from '../../types'
import { Button } from '../common/Button'

type ContactsTableProps = {
  contacts: Contact[]
  currentPage: number
  pageSize: number
  onEdit: (contact: Contact) => void
  onDelete: (id: string) => void
}

export const ContactsTable = ({
  contacts,
  currentPage,
  pageSize,
  onEdit,
  onDelete
}: ContactsTableProps) => {
  const startIndex = (currentPage - 1) * pageSize

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      onDelete(id)
    }
  }

  if (contacts.length === 0) {
    return (
      <div className='rounded-lg border border-zinc-200 bg-white p-12 text-center'>
        <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100'>
          <svg className='h-8 w-8 text-zinc-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
          </svg>
        </div>
        <h3 className='mb-2 text-lg font-semibold text-zinc-900'>No contacts yet</h3>
        <p className='text-sm text-zinc-500'>Get started by adding your first contact</p>
      </div>
    )
  }

  return (
    <div className='overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm'>
      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-zinc-200'>
          <thead className='bg-zinc-50'>
            <tr>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500'>
                #
              </th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500'>
                Name
              </th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500'>
                Phone Number
              </th>
              <th scope='col' className='px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-zinc-500'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-zinc-200 bg-white'>
            {contacts.map((contact, index) => (
              <tr key={contact.id} className='transition-colors hover:bg-zinc-50'>
                <td className='whitespace-nowrap px-6 py-4 text-sm text-zinc-500'>
                  {startIndex + index + 1}
                </td>
                <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-zinc-900'>
                  {contact.name}
                </td>
                <td className='whitespace-nowrap px-6 py-4 text-sm text-zinc-700'>
                  {contact.phone}
                </td>
                <td className='whitespace-nowrap px-6 py-4 text-right text-sm'>
                  <div className='flex items-center justify-end gap-2'>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => onEdit(contact)}
                      aria-label={`Edit ${contact.name}`}
                    >
                      <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
                      </svg>
                    </Button>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => handleDelete(contact.id, contact.name)}
                      aria-label={`Delete ${contact.name}`}
                      className='text-red-600 hover:bg-red-50'
                    >
                      <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                      </svg>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

