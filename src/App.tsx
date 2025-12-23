import { Route, Routes } from 'react-router-dom'

import IndexPage from '@/pages/index'
import DocsPage from '@/pages/docs'
import BlogPage from '@/pages/presupuesto'
import AboutPage from '@/pages/about'
import Presupuesto from '@/pages/presupuesto'

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path='/' />
      <Route element={<DocsPage />} path='/docs' />
      <Route element={<Presupuesto />} path='/Presupuestooo' />
      <Route element={<BlogPage />} path='/blog' />
      <Route element={<AboutPage />} path='/about' />
    </Routes>
  )
}

export default App
