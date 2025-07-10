import React from 'react'
import { useState } from 'react'
import { input, Switch } from '@heroui/react'
import { NumberInput } from '@heroui/number-input'
import { MdAttachMoney } from 'react-icons/md'

function CheckSaldoACuenta({ saldo, check }) {
  const [IsChecked, setIsChecked] = useState(false)

  const handleCheck = (event) => {
    setIsChecked(event)
    check(event)
  }

  const [inputPrecio, setInputPrecio] = useState(NaN)

  const handleValuePrecio = (event) => {
    setInputPrecio(event)
  }

  return (
    <div className="mt-2">
      <Switch
        isSelected={IsChecked}
        onValueChange={handleCheck}
        color="warning"
        size="sm"
        className="mt-4"
      >
        Saldo a cuenta
      </Switch>
      {IsChecked && (
        <NumberInput
          label="Saldo a cuenta"
          minValue={0}
          className="mt-2"
          placeholder="Ingrese saldo"
          variant="bordered"
          startContent={
            <MdAttachMoney size={20} style={{ margin: '0 auto' }} />
          }
          value={inputPrecio}
          onValueChange={(e) => saldo(e) || handleValuePrecio(e)}
        />
      )}
    </div>
  )
}

export default CheckSaldoACuenta
