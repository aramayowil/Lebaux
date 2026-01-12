import { Select, SelectItem } from '@heroui/react'
import { catalogo } from '@/data'
import { lineas } from '@/models/ILineas'

interface SelectorCatalogoProps {
  form: any
  onChange: (field: string, value: any) => void
}

export default function SelectorCatalogo({
  form,
  onChange,
}: SelectorCatalogoProps) {
  return (
    <>
      <Select
        label='Línea'
        className='col-span-3'
        isRequired
        variant='bordered'
        selectedKeys={form.linea ? [form.linea] : []}
        onSelectionChange={(keys) => {
          const value = Array.from(keys)[0]
          onChange('linea', value?.toString())
          onChange('abertura_id', '') // Reset automático
        }}
      >
        {lineas.map((i) => (
          <SelectItem key={i.key} textValue={i.label}>{i.label}</SelectItem>
        ))}
      </Select>

      <Select
        label='Tipo de abertura'
        className='col-span-3'
        isRequired
        variant='bordered'
        isDisabled={!form.linea}
        selectedKeys={form.abertura_id ? [form.abertura_id] : []}
        onSelectionChange={(keys) => {
          const value = Array.from(keys)[0]
          onChange('abertura_id', value?.toString())
        }}
      >
        {(catalogo[form.linea] || []).map((i) => (
          <SelectItem key={i.id} textValue={i.abertura}>{i.abertura}</SelectItem>
        ))}
      </Select>
    </>
  )
}