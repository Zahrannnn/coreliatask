import { useState, useMemo } from 'react'

export const useSorting = <T extends { name: string }>(items: T[]) => {
  const [ascending, setAscending] = useState(true)

  const sortedItems = useMemo(() => {
    const dir = ascending ? 1 : -1
    return [...items].sort((a, b) => dir * a.name.localeCompare(b.name))
  }, [items, ascending])

  return {
    sortedItems,
    ascending,
    toggleSort: () => setAscending(prev => !prev)
  }
}

