import { Route, Routes } from 'react-router-dom'

import IndexPage from '@/pages/index'
import CalcVidrioDVH from './pages/CalcVidrioDVH'
import CotizarVentana from './pages/ventanaModena'
import BlogPage from '@/pages/presupuesto'
import AboutPage from '@/pages/about'

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path='/' />
      <Route element={<CalcVidrioDVH />} path='/dvhCalc' />
      <Route element={<CotizarVentana />} path='/ventanaModena' />
      <Route element={<BlogPage />} path='/blog' />
      <Route element={<AboutPage />} path='/about' />
    </Routes>
  )
}

export default App
