import { useState, useEffect } from 'react'
import { searchReference } from '@/xlsx/CorredizaModena'
import { MdAttachMoney } from 'react-icons/md'
import { Input } from '@heroui/input'

interface Ventanas {
  Medidas: string
  'DVH 4/9/4': string
  'DVH 3+3/9/4': string
  '3+3 LAM S': string
  'FLOAT 4MM': string
  MOSQUITERO: string
  PREMARCO: string
  'CONTRAMARCO SOLO': string
  field9: string
  'GUIA DE PERSIANA': string
  ID_ROW?: number
  AREA?: number
}

type accesorio = 'MOSQUITERO' | 'PREMARCO'

type accesorioProps = {
  accesorio: accesorio
  base: number
  altura: number
}
const InputAccesorioRef = ({ accesorio, base, altura }: accesorioProps) => {
  //dentro de las planillas de referencia, las medidas estan en mts, por lo que se divide entre 10
  const fixBase = Number((base / 10).toFixed(2)) // Convert base to cm and fix to 2 decimal places
  const fixAltura = Number((altura / 10).toFixed(2)) // Convert altura to cm and fix to 2 decimal places

  const [value, setValue] = useState('')

  // Inicializa la referencia con valores por defecto
  let reference: Ventanas = {
    Medidas: '0x0',
    'DVH 4/9/4': '0',
    'DVH 3+3/9/4': '0',
    '3+3 LAM S': '0',
    'FLOAT 4MM': '0',
    'CONTRAMARCO SOLO': '0',
    'GUIA DE PERSIANA': '0',
    field9: '0',
    MOSQUITERO: '0',
    PREMARCO: '0',
    AREA: 0,
  }

  if (!Number.isNaN(base) && !Number.isNaN(altura)) {
    reference = searchReference(fixBase, fixAltura)
  }

  const isInvalid = () => {
    if (Number.isNaN(base) || Number.isNaN(altura)) {
      return true
    }
    if (reference.AREA === null) {
      return true
    }
    return false
  }

  const errorMessage = () => {
    if (Number.isNaN(base) || Number.isNaN(altura)) {
      return 'Base o altura no válida'
    }

    return ''
  }

  useEffect(() => {
    //estanblece en el input a 0 si base o altura son NaN
    if (Number.isNaN(base) || Number.isNaN(altura)) {
      setValue('Error')
    } else {
      const reference = searchReference(fixBase, fixAltura)
      setValue(reference[accesorio])
    }
  }, [base, altura])

  return (
    <>
      <Input
        className='pointer-events-none'
        value={value}
        onValueChange={(e) => setValue(e)}
        label={`Referencia ${accesorio.toLowerCase()}`}
        description={`Referencia de medidas: ${reference.Medidas}`}
        startContent={<MdAttachMoney size={20} style={{ margin: '0 auto' }} />}
        isInvalid={isInvalid()}
        errorMessage={errorMessage()}
      />
    </>
  )
}

export default InputAccesorioRef
