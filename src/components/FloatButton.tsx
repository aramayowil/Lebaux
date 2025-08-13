import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Divider,
  Switch,
  NumberInput,
  Button,
  Accordion,
  AccordionItem,
} from '@heroui/react'
import { VscSettings } from 'react-icons/vsc'

import { useState } from 'react'

type FloatButtonProps = {
  isCheckedDescuento: boolean
  handleCheckDescuento: () => void
  inputDescuento: number
  handleInputDescuento: (value: number) => void
  isCheckedACuenta: boolean
  handleCheckACuenta: () => void
  inputACuenta: number
  handleInputACuenta: (value: number) => void
  isCheckedIva: boolean
  handleCheckIva: () => void
  IVA: number
}
export default function FloatButton({
  isCheckedDescuento,
  handleCheckDescuento,
  inputDescuento,
  handleInputDescuento,
  isCheckedACuenta,
  handleCheckACuenta,
  inputACuenta,
  handleInputACuenta,
  isCheckedIva,
  handleCheckIva,
  IVA,
}: FloatButtonProps) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(!open)
  }

  return (
    <div className='flex items-center gap-4'>
      <Dropdown
        placement='top-end'
        showArrow
        closeOnSelect={false}
        onOpenChange={handleOpen}
      >
        <DropdownTrigger>
          <Button
            isIconOnly
            variant='solid'
            color='warning'
            radius='full'
            size='lg'
            className='!opacity-100'
          >
            <VscSettings
              size={22}
              className={`transition-transform duration-300 ${open ? 'rotate-90' : 'rotate-0'}`}
            />
          </Button>
        </DropdownTrigger>
        <DropdownMenu className='max-w-[190px] pt-2'>
          <DropdownItem
            key='card'
            textValue='Configuración adicional'
            classNames={{ base: 'data-[hover=true]:bg-transparent' }}
          >
            <p className='text-tiny uppercase font-bold pb-2'>
              resumen presupuesto
            </p>

            <div className='flex flex-col w-full items-star justify-center'>
              <Divider className='my-1' />
              <Switch
                isSelected={isCheckedDescuento}
                onValueChange={handleCheckDescuento}
                color='warning'
                size='sm'
                className='my-2'
              >
                Aplicar descuento
              </Switch>

              {isCheckedDescuento && (
                <NumberInput
                  isWheelDisabled
                  className='max-w-xs mb-2'
                  label='Descuento'
                  minValue={0}
                  value={inputDescuento}
                  onValueChange={handleInputDescuento}
                  placeholder='Ingrese descuento'
                  formatOptions={{
                    style: 'percent',
                  }}
                  variant='bordered'
                />
              )}
              <Divider className='my-1' />

              <Accordion
                keepContentMounted={true}
                itemClasses={{
                  title: 'text-default-700 text-sm',
                  trigger: 'h-12',
                  base: 'py-0 w-full',
                  subtitle: 'text-default-500 text-xs',
                  content: 'p-0',
                }}
              >
                <AccordionItem
                  key='1'
                  aria-label='Accordion 1'
                  title='Cargos adicionales'
                >
                  <div className='border-t border-neutral-700'>
                    <Switch
                      isSelected={isCheckedACuenta}
                      onValueChange={handleCheckACuenta}
                      color='warning'
                      size='sm'
                      className='my-2'
                    >
                      Saldo pendiente
                    </Switch>
                    {isCheckedACuenta && (
                      <NumberInput
                        isClearable
                        isWheelDisabled
                        className='max-w-xs mb-2'
                        label='Saldo a cuenta'
                        minValue={0}
                        value={inputACuenta}
                        onValueChange={handleInputACuenta}
                        placeholder='Ingrese saldo pendiente'
                        formatOptions={{
                          style: 'currency',
                          currency: 'USD',
                        }}
                        variant='bordered'
                      />
                    )}
                    <Divider className='my-1' />
                    <Switch
                      isSelected={isCheckedIva}
                      onValueChange={handleCheckIva}
                      color='warning'
                      size='sm'
                      className='my-2'
                    >
                      Incluir IVA ({IVA * 100}%)
                    </Switch>
                  </div>
                </AccordionItem>
              </Accordion>
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}
