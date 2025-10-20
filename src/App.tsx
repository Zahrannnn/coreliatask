
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAppSelector } from './store/hooks'
import RegisterPage from './pages/Register'
import LoginPage from './pages/Login'
import ContactsPage from './pages/Contacts'

const App = () => {
  const isAuthenticated = useAppSelector(s => s.auth.currentUserId !== null)

  return (
    <Routes>
      <Route 
        path='/' 
        element={<Navigate to={isAuthenticated ? '/contacts' : '/login'} replace />} 
      />
      
      <Route 
        path='/register' 
        element={isAuthenticated ? <Navigate to='/contacts' replace /> : <RegisterPage />} 
      />
      
      <Route 
        path='/login' 
        element={isAuthenticated ? <Navigate to='/contacts' replace /> : <LoginPage />} 
      />
      
      <Route 
        path='/contacts' 
        element={isAuthenticated ? <ContactsPage /> : <Navigate to='/login' replace />} 
      />
      
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  )
}

export default App
