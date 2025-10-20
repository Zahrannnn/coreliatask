
import { Button } from '../common/Button'

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  canGoNext: boolean
  canGoPrev: boolean
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  canGoNext,
  canGoPrev
}: PaginationProps) => {
  if (totalPages <= 1) return null

  return (
    <div className='flex items-center justify-center gap-2'>
      <Button
        variant='secondary'
        size='sm'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrev}
        aria-label='Previous page'
      >
        <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
        </svg>
      </Button>

      <span className='min-w-[100px] text-center text-sm text-zinc-700'>
        Page <span className='font-semibold'>{currentPage}</span> of{' '}
        <span className='font-semibold'>{totalPages}</span>
      </span>

      <Button
        variant='secondary'
        size='sm'
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        aria-label='Next page'
      >
        <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
        </svg>
      </Button>
    </div>
  )
}

