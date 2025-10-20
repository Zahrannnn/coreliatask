
import type { ReactNode } from 'react'
import { Header } from './Header'

type PageLayoutProps = {
  children: ReactNode
  showHeader?: boolean
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const maxWidthStyles = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full'
}

export const PageLayout = ({ 
  children, 
  showHeader = true,
  maxWidth = 'xl'
}: PageLayoutProps) => {
  return (
    <div className='min-h-dvh bg-zinc-50'>
      {showHeader ? <Header /> : null}
      
      <main className={`mx-auto w-full ${maxWidthStyles[maxWidth]} px-4 py-8 sm:px-6 lg:px-8`}>
        {children}
      </main>
    </div>
  )
}

