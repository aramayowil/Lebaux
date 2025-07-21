import NavBar from './components/UI/NavBar'
import MyRouter from './routers/MyRouter'
import Footer from './components/UI/Footer'
import AberturaConDimensiones from './components/UI/Abertura'
import ImagenEscalada from './components/UI/ImagenEscalada'

export default function App() {
  return (
    <>
      <NavBar />
      <MyRouter />
      {/* <ImagenEscalada /> */}
      <Footer />
    </>
  )
}
