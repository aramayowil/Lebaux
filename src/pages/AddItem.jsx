import { useState } from 'react'
import dataModena from '../dataModena.js'
import CardMain from '../components/UI/CardMain.jsx'

function AddItem() {
  const [selectAbertura, setSelectAbertura] = useState('')

  const handleSelectAbertura = (event) => {
    setSelectAbertura(event.target.value)
  }
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col">
        <div className="flex max-w-md gap-4">
          <select defaultValue="modena" className="select">
            <option disabled={true}>Seleccione una Linea</option>
            <option value={'modena'}>Módena</option>
            <option value={'herrero'}>Herrero</option>
          </select>
          <select
            className="select"
            value={selectAbertura}
            onChange={handleSelectAbertura}
          >
            <option disabled={true} value={''}>
              Tipo de abertura
            </option>
            <option value={'pf'}>Paño Fijo</option>
            <option value={'corrediza'}>Corrediza</option>
            <option value={'raja'}>Raja</option>
            <option value={'oscilobatiente'}>Oscilobatiente</option>
            <option value={'proyectante'}>Proyectante</option>
            <option value={'puerta'}>Puerta</option>
          </select>
        </div>

        <CardMain linea={'modena'} tipoAbertura={selectAbertura} />
      </div>
    </div>
  )
}

export default AddItem
