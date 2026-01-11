import { Select, SelectItem } from '@heroui/react'
import { useMemo } from 'react'
import { catalogo } from '@/data'
import { lineas } from '@/models/ILineas'

type FormValue = string | number | boolean | null

interface FormState {
  linea: string
  abertura: string
  [key: string]: FormValue
}

interface SelectorCatalogoProps {
  form: FormState
  onChange: (field: keyof FormState, value: string) => void
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
          onChange('abertura', '')
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
        // Deshabilitado si no hay línea o si la línea seleccionada no tiene aberturas
        isDisabled={!form.linea || opcionesAbertura.length === 0}
        selectedKeys={new Set(form.abertura ? [form.abertura] : [])}
        onSelectionChange={(keys) => {
          const value = Array.from(keys)[0]?.toString() || ''
          onChange('abertura', value)
        }}
      >
        {opcionesAbertura.map((i) => (
          <SelectItem key={i.id} textValue={i.abertura}>
            {i.abertura}
          </SelectItem>
        ))}
      </Select>
    </>
  )
}
