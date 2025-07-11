import React from 'react'
import { useState } from 'react'
import { input, Switch } from '@heroui/react'
import { NumberInput } from '@heroui/number-input'
import { MdAttachMoney } from 'react-icons/md'
import usePresupuestoDetails from '../stores/usePresupuestoDetailsStore'

function CheckSaldoACuenta({ check }) {
  const details = usePresupuestoDetails((state) => state.Details)
  const updateDetails = usePresupuestoDetails((state) => state.updateDetails)

  const [IsChecked, setIsChecked] = useState(false)

  const handleCheck = (event) => {
    setIsChecked(event)
    check(event)
    if (event === false) {
      updateDetails({ saldoPendiente: 0 }) // Reset saldoPendiente when unchecked
    }
  }

  const handleInputSaldo = (e) => {
    const value = Number.isNaN(e) ? 0 : e
    updateDetails({ saldoPendiente: value })
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
          value={details.saldoPendiente}
          onValueChange={handleInputSaldo}
        />
      )}
    </div>
  )
}

export default CheckSaldoACuenta
