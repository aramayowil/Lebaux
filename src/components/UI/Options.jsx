import React from 'react'
import { Input } from '@heroui/input'
import { useState } from 'react'
import { Button } from '@heroui/button'
import { FiUser } from 'react-icons/fi'
import { Divider } from '@heroui/divider'
import { RiResetLeftFill } from 'react-icons/ri'
import { SlOptionsVertical } from 'react-icons/sl'
import DropdownOptions from './DropdownOptions'
import useClientStore from '../../stores/useClienteDetailsStore'

function Options() {
  const clientName = useClientStore((state) => state.clientName)
  const setClientName = useClientStore((state) => state.setClientName)

  return (
    <div>
      <div className="flex justify-between items-center">
        <Input
          label="Cliente"
          type="text"
          placeholder="Nombre del cliente"
          className="w-60 m-0"
          variant="bordered"
          value={clientName}
          onValueChange={setClientName}
          startContent={<FiUser size={18} className="mr-1" />}
        />
        <DropdownOptions />
      </div>
      <Divider className="my-4" />
    </div>
  )
}

export default Options
