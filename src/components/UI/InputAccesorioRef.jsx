import { NumberInput } from '@heroui/number-input'
import React, { use, useState, useEffect } from 'react'
import { searchReference } from '../../xlsx/CorredizaModena'
import { Button } from '@heroui/button'
import { MdAttachMoney } from 'react-icons/md'
import { Input } from '@heroui/input'

const InputAccesorioRef = ({ name_accesorio, base, altura }) => {
  // 1 - MOSQUITERO
  // 2 - PREMARCO
  switch (name_accesorio) {
    case 1:
      name_accesorio = 'MOSQUITERO'
      break
    case 2:
      name_accesorio = 'PREMARCO'
      break
    default:
      console.log('Error: name_accesorio no válido')
      return null
  }

  //dentro de las planillas de referencia, las medidas estan en mts, por lo que se divide entre 10
  const fixBase = (base / 10).toFixed(2) // Convert base to cm and fix to 2 decimal places
  const fixAltura = (altura / 10).toFixed(2) // Convert altura to cm and fix to 2 decimal places

  const [value, setValue] = useState('')

  // Inicializa la referencia con valores por defecto
  let reference = {
    Medidas: '0x0',
    MOSQUITERO: '0',
    'PREMARCO / CONTRA': '0',
    AREA: null,
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
    if (reference.AREA === null) {
      return 'No hay referencias para estas medidas'
    }

    return ''
  }

  useEffect(() => {
    //estanblece en el input a 0 si base o altura son NaN
    if (Number.isNaN(base) || Number.isNaN(altura)) {
      setValue('Error')
    } else {
      const reference = searchReference(fixBase, fixAltura)
      setValue(
        reference.AREA === null
          ? 'No hay referencias'
          : reference[name_accesorio]
      )
    }
  }, [base, altura])

  return (
    <>
      <Input
        className="col-span-3 pointer-events-none"
        value={value}
        onValueChange={(e) => setValue(e)}
        label={`Referencia ${name_accesorio.toLowerCase()}`}
        minValue={0}
        description={`Referencia de medidas: ${reference.Medidas}`}
        startContent={<MdAttachMoney size={20} style={{ margin: '0 auto' }} />}
        isInvalid={isInvalid()}
        errorMessage={errorMessage()}
      />
    </>
  )
}

export default InputAccesorioRef
