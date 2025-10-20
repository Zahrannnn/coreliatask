
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { logout } from '../../store/authSlice'
import { Button } from '../common/Button'

export const Header = () => {
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(s => s.auth.users.find(u => u.id === s.auth.currentUserId))

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      dispatch(logout())
    }
  }

  return (
    <header className='sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-sm'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-4  sm:px-6 lg:px-8'>
       <img src="Corelia_RICOH_logo.svg" className=' size-20' alt="" />
        {/* Logo */}

        {/* User Actions */}
        {currentUser ? (
          <div className='flex items-center gap-4'>
            <div className='hidden flex-col items-end sm:flex'>
              <span className='text-sm font-medium text-zinc-900'>
                {currentUser.name}
              </span>
              <span className='text-xs text-zinc-500'>
                {currentUser.email}
              </span>
            </div>
            
            <Button
              variant='primary'
              size='sm'
              onClick={handleLogout}
              aria-label='Logout'
            >
              Logout
            </Button>
          </div>
        ) : null}
      </div>
    </header>
  )
}

