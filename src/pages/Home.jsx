import CardResum from '../components/CardDetalles'
import TableHeroUI from '../components/Table'
import Options from '../components/UI/Options'

function Home() {
  return (
    <div className="grid grid-cols-[2fr_1fr] gap-4 p-4">
      <div className="">
        <TableHeroUI />
      </div>
      <div className="">
        <CardResum />
      </div>
    </div>
  )
}

export default Home
