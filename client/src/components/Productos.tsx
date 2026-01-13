import Header from './ui/cardsProductos/Header'
import Body from './ui/cardsProductos/Body'
import Tittle from './ui/cardsProductos/Tittle'

function Productos() {
  return (
    <div className='w-full h-fit flex flex-col gap-4'>
      <aside className='w-full h-fit p-4'>
        <Tittle />
        <Header />
        <Body />
      </aside>
    </div>
  )
}

export default Productos
