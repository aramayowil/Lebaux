import { NumberInput, Autocomplete, AutocompleteItem } from '@heroui/react'
import { RxWidth, RxHeight } from 'react-icons/rx'
import { IoColorPalette } from 'react-icons/io5'
import { RiCheckboxMultipleBlankFill, RiNumbersFill } from 'react-icons/ri'
import { MdAttachMoney } from 'react-icons/md'
import { colors } from '@/models/IColors'
import { vidrios } from '@/models/IVidrios'

interface PropiedadesAberturaProps {
  form: any
  onChange: (field: string, value: any) => void
  isDisabled: boolean
}

export default function PropiedadesAbertura({
  form,
  onChange,
  isDisabled,
}: PropiedadesAberturaProps) {
  return (
    <>
      {/* ANCHO */}
      <NumberInput
        label='Ancho'
        className='col-span-3'
        variant='bordered'
        isRequired
        minValue={1}
        value={form.ancho}
        formatOptions={{
          useGrouping: false, // Esto quita los puntos de miles (1.000 -> 1000)
          minimumFractionDigits: 0, // Asegura que no haya decimales
          maximumFractionDigits: 0,
        }}
        isDisabled={isDisabled}
        onValueChange={(v) => onChange('ancho', v)}
        startContent={<RxWidth size={21} />}
        endContent={<span className='text-sm text-default-400'>mm</span>}
      />

      {/* ALTURA */}
      <NumberInput
        label='Altura'
        className='col-span-3'
        variant='bordered'
        isRequired
        minValue={1}
        value={form.altura}
        formatOptions={{
          useGrouping: false, // Esto quita los puntos de miles (1.000 -> 1000)
          minimumFractionDigits: 0, // Asegura que no haya decimales
          maximumFractionDigits: 0,
        }}
        isDisabled={isDisabled}
        onValueChange={(v) => onChange('altura', v)}
        startContent={<RxHeight size={20} />}
        endContent={<span className='text-sm text-default-400'>mm</span>}
      />

      {/* COLOR */}
      <Autocomplete
        label='Color'
        className='col-span-3'
        variant='bordered'
        isRequired
        defaultItems={colors}
        selectedKey={form.color}
        isDisabled={isDisabled}
        onSelectionChange={(k) => onChange('color', k?.toString())}
        startContent={<IoColorPalette size={20} />}
      >
        {(color) => (
          <AutocompleteItem key={color.key}>{color.label}</AutocompleteItem>
        )}
      </Autocomplete>

      {/* VIDRIO */}
      <Autocomplete
        label='Vidrio'
        className='col-span-3'
        variant='bordered'
        isRequired
        defaultItems={vidrios}
        selectedKey={form.vidrio}
        isDisabled={isDisabled}
        onSelectionChange={(k) => onChange('vidrio', k?.toString())}
        startContent={<RiCheckboxMultipleBlankFill />}
      >
        {(vidrio) => (
          <AutocompleteItem key={vidrio.key}>{vidrio.label}</AutocompleteItem>
        )}
      </Autocomplete>

      {/* CANTIDAD */}
      <NumberInput
        label='Cantidad'
        className='col-span-3'
        variant='bordered'
        isRequired
        minValue={1}
        value={form.cantidad}
        isDisabled={isDisabled}
        onValueChange={(v) => onChange('cantidad', v)}
        startContent={<RiNumbersFill size={20} />}
      />

      {/* PRECIO UNITARIO */}
      <NumberInput
        label='Precio Unitario'
        className='col-span-3'
        variant='bordered'
        isRequired
        minValue={0}
        value={form.precio}
        isDisabled={isDisabled}
        onValueChange={(v) => onChange('precio', v)}
        startContent={<MdAttachMoney size={20} />}
      />
    </>
  )
}