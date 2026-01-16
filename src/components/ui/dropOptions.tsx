import {
  Dropdown,
  DropdownSection,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@heroui/react'
import { FcAddDatabase, FcFullTrash, FcSupport } from 'react-icons/fc'

export default function DropdownOptions() {
  return (
    <Dropdown
      showArrow
      //   classNames={{
      //     base: 'before:bg-default-200', // change arrow background
      //     content: 'p-0 border-small border-divider bg-background',
      //   }}
      radius='sm'
    >
      <DropdownTrigger>
        <Button
          size='md'
          disableRipple
          variant='ghost'
          startContent={<FcSupport size={16} />}
        >
          Opciones
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant='flat'>
        <DropdownSection title='Acciones'>
          <DropdownItem
            key='new'
            description='Crear un nuevo presupuesto'
            startContent={<FcAddDatabase size={28} />}
          >
            Nuevo Presupuesto
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title='Restablecer'>
          <DropdownItem
            key='delete'
            className='text-danger'
            color='danger'
            description='Borrar el presupuesto actual'
            startContent={<FcFullTrash size={28} />}
          >
            Eliminar todo
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}
