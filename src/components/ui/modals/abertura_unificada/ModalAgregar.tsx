import { Select, SelectItem } from '@heroui/react'
import { useMemo } from 'react'
import { catalogo } from '@/data'
import { lineas } from '@/models/ILineas'
import { IAbertura } from '@/interfaces/IAbertura'

interface SelectorCatalogoProps {
  form: IAbertura
  onChange: (field: keyof IAbertura, value: string) => void
}

export default function SelectorCatalogo({
  form,
  onChange,
}: SelectorCatalogoProps) {
  const opcionesAbertura = useMemo(() => {
    if (!form.linea) return []
    return catalogo[form.linea] || []
  }, [form.linea])

  return (
    <>
      <Select
        label='Línea'
        className='col-span-3'
        isRequired
        variant='bordered'
        selectedKeys={new Set(form.linea ? [form.linea] : [])}
        onSelectionChange={(keys) => {
          const value = Array.from(keys)[0]?.toString() || ''
          onChange('linea', value)
          onChange('abertura_id', '') // Reset usando el campo correcto
        }}
      >
        {lineas.map((i) => (
          <SelectItem key={i.key} textValue={i.label}>
            {i.label}
          </SelectItem>
        ))}
      </Select>

      <Select
        label='Tipo de abertura'
        className='col-span-3'
        isRequired
        variant='bordered'
        isDisabled={!form.linea || opcionesAbertura.length === 0}
        selectedKeys={new Set(form.abertura_id ? [form.abertura_id] : [])}
        onSelectionChange={(keys) => {
          const idSeleccionado = Array.from(keys)[0]?.toString() || ''
          onChange('abertura_id', idSeleccionado)

          // Opcional: Actualizar el nombre_abertura automáticamente
          const item = opcionesAbertura.find((i) => i.id === idSeleccionado)
          if (item) onChange('nombre_abertura', item.abertura)
        }}
      >
        {opcionesAbertura.map((i: any) => (
          <SelectItem key={i.id} textValue={i.abertura}>
            {i.abertura}
          </SelectItem>
        ))}
      </Select>
    </>
  )
}
