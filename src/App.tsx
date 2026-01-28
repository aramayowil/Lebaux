import { Route, Routes } from 'react-router-dom'
import CalculadorVidrioDVH from '@/pages/calculadoraVidrioDVH'
import CotizarVentana from '@/pages/ventanaModena'
import BlogPage from '@/pages/arbol'
import AboutPage from '@/pages/about'
import Historial from '@/pages/historial'
import Login from '@/pages/login_and_registro/login'
import Register from './pages/login_and_registro/register'
import EmailVerification from './pages/login_and_registro/emailVerification'
import Profile from './pages/login_and_registro/profile'
import VerifyAccount from './pages/login_and_registro/verifyAccont'
import ProtectedRoute from './pages/protectedRoute'
import Lading from './pages/lading'
import Presupuesto from './pages/presupuesto'
import ForgotPassword from './pages/reset_password/forgotPassword'
import ResetPassword from './pages/reset_password/resetPassword'

function App() {
  return (
    <Routes>
      {/* Páginas principales y Navbar*/}
      <Route element={<Lading />} index />
      <Route element={<Lading />} path='/lading' />

      {/* Login y Registro */}
      <Route element={<Login />} path='/login' />
      <Route element={<Register />} path='/register' />
      <Route element={<EmailVerification />} path='/email-verification' />
      <Route element={<VerifyAccount />} path='/verify-account' />

      {/* Reset Password */}
      <Route element={<ForgotPassword />} path='/password/reset' />
      <Route element={<ResetPassword />} path='/reset-password' />

      {/* Rutas protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Profile />} path='/profile' />
        <Route element={<Presupuesto />} path='/home' />
        <Route element={<Historial />} path='/historial' />
        <Route element={<CalculadorVidrioDVH />} path='/dvhCalc' />
        <Route element={<CotizarVentana />} path='/ventanaModena' />
        <Route element={<BlogPage />} path='/blog' />
        <Route element={<AboutPage />} path='/about' />
      </Route>
    </Routes>
  )
}

export default App
