// SelectorCatalogo.tsx
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
          onChange('abertura', '') // Reset automático
        }}
      >
        {lineas.map((i) => (
          <SelectItem key={i.key}>{i.label}</SelectItem>
        ))}
      </Select>

      <Select
        label='Tipo de abertura'
        className='col-span-3'
        isRequired
        variant='bordered'
        isDisabled={!form.linea}
        selectedKeys={form.abertura ? [form.abertura] : []}
        onSelectionChange={(keys) => {
          const value = Array.from(keys)[0]
          onChange('abertura', value?.toString())
        }}
      >
        {(catalogo[form.linea] || []).map((i) => (
          <SelectItem key={i.id}>{i.abertura}</SelectItem>
        ))}
      </Select>
    </>
  )
}
