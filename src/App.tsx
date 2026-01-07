import { Route, Routes } from 'react-router-dom'

import IndexPage from '@/pages/index'
import CalculadorVidrioDVH from '@/pages/calculadoraVidrioDVH'
import CotizarVentana from '@/pages/ventanaModena'
import BlogPage from '@/pages/arbol'
import AboutPage from '@/pages/about'
import Historial from '@/pages/historial'

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path='/' />
      <Route element={<Historial />} path='/historial' />
      <Route element={<CalculadorVidrioDVH />} path='/dvhCalc' />
      <Route element={<CotizarVentana />} path='/ventanaModena' />
      <Route element={<BlogPage />} path='/blog' />
      <Route element={<AboutPage />} path='/about' />
    </Routes>
  )
}

export default App
