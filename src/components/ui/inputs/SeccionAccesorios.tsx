import { useEffect } from 'react'
import { Checkbox, Accordion, AccordionItem, Input } from '@heroui/react'
import { MdAttachMoney } from 'react-icons/md'
import { obtenerDatosAccesorio } from '@/utils/referencia_precios_accesorios'

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
  // Obtenemos los datos de referencia en tiempo real para la descripción (UI)
  const infoMosquitero = obtenerDatosAccesorio(
    'MOSQUITERO',
    form.ancho,
    form.altura,
  )
  const infoPremarco = obtenerDatosAccesorio(
    'PREMARCO',
    form.ancho,
    form.altura,
  )

  /**
   * REGLA DE SINCRONIZACIÓN:
   * Solo actualizamos el precio automáticamente cuando el usuario cambia el ANCHO o el ALTO.
   * Esto permite que si el usuario edita el precio manualmente, no se borre hasta que
   * se modifiquen las medidas de la ventana.
   */
  useEffect(() => {
    if (form.mosquitero.checked) {
      handleUpdate('mosquitero', infoMosquitero.precio)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.ancho, form.altura, form.mosquitero.checked])

  useEffect(() => {
    if (form.premarco.checked) {
      handleUpdate('premarco', infoPremarco.precio)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.ancho, form.altura, form.premarco.checked])

  const handleToggle = (field: 'mosquitero' | 'premarco' | 'persiana') => {
    onChange(field, { ...form[field], checked: !form[field].checked })
  }

  const handleUpdate = (
    field: 'mosquitero' | 'premarco' | 'persiana',
    price: number,
  ) => {
    onChange(field, { ...form[field], precio: price })
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
        <div className='flex flex-col gap-6'>
          {/* SECCIÓN MOSQUITERO */}
          <div className='flex flex-col border-b pb-4 border-default-100'>
            <Checkbox
              color='warning'
              isSelected={form.mosquitero.checked}
              onValueChange={() => handleToggle('mosquitero')}
              isDisabled={isDisabled}
            >
              Mosquitero
            </Checkbox>
            {form.mosquitero.checked && (
              <div className='mt-2'>
                <Input
                  type='number' // Cambiado a number para facilitar edición
                  variant='bordered'
                  label='Precio Mosquitero'
                  value={form.mosquitero.precio.toString()}
                  onValueChange={(val) =>
                    handleUpdate('mosquitero', Number(val))
                  }
                  description={`Referencia de medidas: ${infoMosquitero.medidasRef}`}
                  startContent={<MdAttachMoney size={20} />}
                  isDisabled={isDisabled}
                />
              </div>
            )}
          </div>

          {/* SECCIÓN PREMARCO */}
          <div className='flex flex-col border-b pb-4 border-default-100'>
            <Checkbox
              color='warning'
              isSelected={form.premarco.checked}
              onValueChange={() => handleToggle('premarco')}
              isDisabled={isDisabled}
            >
              Premarco y Tapajunta
            </Checkbox>
            {form.premarco.checked && (
              <div className='mt-2'>
                <Input
                  type='number'
                  variant='bordered'
                  label='Precio Premarco'
                  value={form.premarco.precio.toString()}
                  onValueChange={(val) => handleUpdate('premarco', Number(val))}
                  description={`Referencia de medidas: ${infoPremarco.medidasRef}`}
                  startContent={<MdAttachMoney size={20} />}
                  isDisabled={isDisabled}
                />
              </div>
            )}
          </div>

          {/* SECCIÓN PERSIANA */}
          <div className='flex flex-col'>
            <Checkbox
              color='warning'
              isSelected={form.persiana.checked}
              onValueChange={() => handleToggle('persiana')}
              isDisabled={isDisabled}
            >
              Persiana
            </Checkbox>
            {form.persiana.checked && (
              <div className='mt-2'>
                <Input
                  type='number'
                  variant='bordered'
                  label='Precio Persiana'
                  value={form.persiana.precio.toString()}
                  onValueChange={(val) => handleUpdate('persiana', Number(val))}
                  startContent={<MdAttachMoney size={20} />}
                  isDisabled={isDisabled}
                />
              </div>
            )}
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  )
}
