import { Input, Textarea } from '@heroui/react'
import { MdLabel, MdDescription } from 'react-icons/md'

interface SeccionDetallesProps {
  form: any
  onChange: (field: string, value: any) => void
  isDisabled: boolean
}

export default function SeccionDetalles({
  form,
  onChange,
  isDisabled,
}: SeccionDetallesProps) {
  return (
    <>
      <div className='flex-1 gap-4 space-y-4'>
        {/* CÓDIGO / REFERENCIA DE OBRA */}
        <Input
          label='Código'
          placeholder='Ej: V1'
          className='col-span-2'
          variant='bordered'
          value={form.codigo}
          isDisabled={isDisabled}
          onValueChange={(v) => onChange('codigo', v)}
          startContent={<MdLabel className='text-default-400' size={20} />}
        />

        {/* DESCRIPCIÓN O NOTAS ADICIONALES */}
        <Textarea
          label='Notas adicionales'
          placeholder='Ej: Vidrio con borde pulido, herrajes especiales...'
          className='col-span-4'
          variant='bordered'
          value={form.descripcion}
          isDisabled={isDisabled}
          onValueChange={(v) => onChange('descripcion', v)}
          startContent={
            <MdDescription className='text-default-400' size={20} />
          }
          minRows={2}
        />
      </div>
    </>
  )
}
