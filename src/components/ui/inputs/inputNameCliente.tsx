import { Input } from '@heroui/input'
import { useNameCliente } from '@/stores/useNameClient'

import { IoPersonOutline } from 'react-icons/io5'

export default function InputNameCliente() {
  const { setNameCliente, nameCliente } = useNameCliente()
  return (
    <Input
      className='w-50 sm:max-w-[44%]'
      isClearable
      startContent={<IoPersonOutline size={16} />}
      placeholder='Nombre del Cliente'
      type='text'
      value={nameCliente}
      onValueChange={(e) => setNameCliente(e)}
    />
  )
}
