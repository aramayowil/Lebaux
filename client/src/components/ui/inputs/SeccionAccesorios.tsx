import { Checkbox, NumberInput, Accordion, AccordionItem } from '@heroui/react'
import { MdAttachMoney } from 'react-icons/md'
import InputAccesorioRef from '../inputs/InputAccesorioRef'

interface SeccionAccesoriosProps {
  form: any
  onChange: (field: string, value: any) => void
  isDisabled: boolean
}

export default function SeccionAccesorios({
  form,
  onChange,
  isDisabled,
}: SeccionAccesoriosProps) {
  // Handler específico para actualizar sub-objetos (mosquitero y premarco)
  const handleToggle = (field: 'mosquitero' | 'premarco') => {
    onChange(field, {
      ...form[field],
      checked: !form[field].checked,
    })
  }

  const handlePrice = (field: 'mosquitero' | 'premarco', price: number) => {
    onChange(field, {
      ...form[field],
      precio: price,
    })
  }

  return (
    <Accordion
      keepContentMounted
      variant='bordered'
      className='col-span-6 p-2'
      itemClasses={{
        base: 'py-0 w-full',
        title: 'font-normal text-base',
        trigger: 'px-0 py-4 h-14 flex items-center',
        content: 'text-small px-2 mb-2',
      }}
    >
      <AccordionItem key='1' aria-label='Accesorios' title='Accesorios'>
        <div className='grid grid-cols-6 gap-4'>
          {/* SECCIÓN MOSQUITERO */}
          <div className='col-span-6 border-b pb-2 border-default-100'>
            <Checkbox
              color='warning'
              isSelected={form.mosquitero.checked}
              onValueChange={() => handleToggle('mosquitero')}
              isDisabled={isDisabled}
            >
              Mosquitero
            </Checkbox>
            {form.mosquitero.checked && (
              <div className='grid grid-cols-6 gap-2 mt-2'>
                <NumberInput
                  label='Precio Mosquitero'
                  className='col-span-3'
                  variant='bordered'
                  isRequired
                  value={form.mosquitero.precio}
                  onValueChange={(v) => handlePrice('mosquitero', v)}
                  startContent={<MdAttachMoney size={20} />}
                />
                <div className='col-span-3'>
                  <InputAccesorioRef
                    accesorio='MOSQUITERO'
                    base={form.ancho}
                    altura={form.altura}
                  />
                </div>
              </div>
            )}
          </div>

          {/* SECCIÓN PREMARCO */}
          <div className='col-span-6'>
            <Checkbox
              color='warning'
              isSelected={form.premarco.checked}
              onValueChange={() => handleToggle('premarco')}
              isDisabled={isDisabled}
            >
              Premarco y Tapajunta
            </Checkbox>
            {form.premarco.checked && (
              <div className='grid grid-cols-6 gap-2 mt-2'>
                <NumberInput
                  label='Precio Premarco'
                  className='col-span-3'
                  variant='bordered'
                  isRequired
                  value={form.premarco.precio}
                  onValueChange={(v) => handlePrice('premarco', v)}
                  startContent={<MdAttachMoney size={20} />}
                />
                <div className='col-span-3'>
                  <InputAccesorioRef
                    accesorio='PREMARCO'
                    base={form.ancho}
                    altura={form.altura}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  )
}
