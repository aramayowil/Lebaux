import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

const ProtectedRoute = () => {
  const token = localStorage.getItem('auth_token')
  const location = useLocation()

  if (!token) {
    return <Navigate to='/login' replace state={{ from: location }} />
  }

  try {
    // Intentamos decodificarlo
    const decoded = jwtDecode(token)

    // Validar si ya expiró (exp está en segundos)
    const currentTime = Date.now() / 1000
    if (decoded.exp && decoded.exp < currentTime) {
      throw new Error('Token expirado')
    }

    // Si todo está bien, lo dejamos pasar
    return <Outlet />
  } catch (error) {
    // token manipulado o expirado
    console.error('Token inválido o malformado')
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')

    return <Navigate to='/login' replace state={{ from: location }} />
  }
}

export default ProtectedRoute
