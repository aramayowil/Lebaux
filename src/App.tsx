import { Route, Routes } from 'react-router-dom'

import IndexPage from '@/pages/index'
import CalculadorVidrioDVH from '@/pages/calculadoraVidrioDVH'
import CotizarVentana from '@/pages/ventanaModena'
import BlogPage from '@/pages/arbol'
import AboutPage from '@/pages/about'
import Historial from '@/pages/historial'
import Login from '@/pages/login_and_registro/login'
import Register from './pages/login_and_registro/register'
import EmailVerification from './pages/login_and_registro/emailVerification'

function App() {
  return (
    <Routes>
      {/* Páginas principales y Navbar*/}
      <Route element={<IndexPage />} path='/' />
      <Route element={<Historial />} path='/historial' />
      <Route element={<CalculadorVidrioDVH />} path='/dvhCalc' />
      <Route element={<CotizarVentana />} path='/ventanaModena' />
      <Route element={<BlogPage />} path='/blog' />
      <Route element={<AboutPage />} path='/about' />

      {/* Login y Registro */}
      <Route element={<Login />} path='/login' />
      <Route element={<Register />} path='/register' />
      <Route element={<EmailVerification />} path='/email-verification' />
    </Routes>
  )
}

export default App
