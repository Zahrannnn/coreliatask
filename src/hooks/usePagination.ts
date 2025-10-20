/**
 * Pagination hook
 */
import { useState, useMemo, useEffect } from 'react'

export const usePagination = <T>(items: T[], pageSize = 5) => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))

  // Reset to page 1 if current page exceeds total pages
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1)
    }
  }, [totalPages, currentPage])

  const paginatedItems = useMemo((): T[] => {
    const start = (currentPage - 1) * pageSize
    return items.slice(start, start + pageSize)
  }, [items, currentPage, pageSize])

  const goToPage = (page: number) => {
    /* 
    !! Ensure page number is in the valid range:
     -  Not less than 1 (first page)
     - Not greater than totalPages (last page)
    */
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  return {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    canGoNext: currentPage < totalPages,
    canGoPrev: currentPage > 1,
    pageSize
  }
}

