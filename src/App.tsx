import { Route, Routes } from 'react-router-dom'

import IndexPage from '@/pages/index'
import CalculadorVidrioDVH from './pages/CalcVidrioDVH'
import CotizarVentana from './pages/ventanaModena'
import BlogPage from '@/pages/arbol'
import AboutPage from '@/pages/about'

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path='/' />
      <Route element={<CalculadorVidrioDVH />} path='/dvhCalc' />
      <Route element={<CotizarVentana />} path='/ventanaModena' />
      <Route element={<BlogPage />} path='/blog' />
      <Route element={<AboutPage />} path='/about' />
    </Routes>
  )
}

export default App
