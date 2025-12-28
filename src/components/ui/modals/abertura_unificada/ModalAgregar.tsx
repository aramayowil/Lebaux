import { useState } from 'react'
import { Button, Card, CardBody, Divider } from '@heroui/react'
import { RiCloseLine } from 'react-icons/ri'
import { catalogo } from '@/data'

// Importamos los componentes modulares
import PropiedadesAbertura from '../../inputs/PropiedadesAbertura'
import SeccionAccesorios from '../../inputs/SeccionAccesorios'
import SeccionDetalles from '../../inputs/SeccionDetalles'
import SelectorCatalogo from '../../inputs/SelectorCatalogo'
import TabsAbertura from '../../TabsAbertura'

type ModalAgregarProps = {
  onClose: () => void
  handleConfirmarModulo: (data: any) => void
}

const INITIAL_STATE = {
  linea: 'modena',
  abertura: '',
  ancho: 0,
  altura: 0,
  color: '',
  vidrio: '',
  cantidad: 1,
  precio: 0,
  codigo: '',
  descripcion: '',
  mosquitero: { checked: false, precio: 0 },
  premarco: { checked: false, precio: 0 },
  variantKey: 0,
  imgSrc: '',
}

function ModalAgregar({ onClose, handleConfirmarModulo }: ModalAgregarProps) {
  const [form, setForm] = useState(INITIAL_STATE)

  // Handler unificado
  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const onConfirm = () => {
    handleConfirmarModulo(form)
    onClose()
  }

  return (
    <div className='fixed inset-0 bg-slate-950/40 backdrop-blur-md flex items-center justify-center z-50 p-4'>
      <Card className='w-full max-w-2xl shadow-2xl border border-default-200/50'>
        {/* HEADER */}
        <div className='flex items-center justify-between p-6 pb-2'>
          <div>
            <h2 className='text-xl font-bold text-default-900'>
              Agregar abertura
            </h2>
            <p className='text-small text-default-500'>
              Configura las dimensiones y materiales.
            </p>
          </div>
          <Button
            isIconOnly
            variant='light'
            radius='full'
            onPress={onClose}
            className='text-default-400'
          >
            <RiCloseLine size={24} />
          </Button>
        </div>

        <CardBody className='p-6 overflow-y-auto max-h-[70vh]'>
          <div className='flex flex-col gap-4'>
            <SelectorCatalogo form={form} onChange={handleChange} />

            {form.abertura && (
              <TabsAbertura
                selectedAbertura={catalogo[form.linea].find(
                  (i) => i.id === form.abertura,
                )}
                getDescripcion={(v) => handleChange('descripcion', v)}
                getCodigo={(v) => handleChange('codigo', v)}
                getImg={(v) => handleChange('imgSrc', v)}
                getVariantKey={(v) => handleChange('variantKey', v)}
                setTabSelected={form.variantKey}
              />
            )}

            {/* 1. Usamos el componente de Medidas, Color, Vidrio y Precio */}
            <PropiedadesAbertura
              form={form}
              onChange={handleChange}
              isDisabled={false}
            />

            <Divider className='my-2' />

            {/* 2. Accesorios (opcional, si los necesitas en este modal) */}
            <SeccionAccesorios
              form={form}
              onChange={handleChange}
              isDisabled={false}
            />

            <Divider className='my-2' />

            {/* 3. Identificación */}
            <SeccionDetalles
              form={form}
              onChange={handleChange}
              isDisabled={false}
            />

            {/* ÁREA DE PREVISUALIZACIÓN */}
            <div className='bg-default-100/50 rounded-xl p-6 flex items-center justify-center border-2 border-dashed border-default-200 mt-4'>
              <p className='text-tiny text-default-400 uppercase tracking-widest font-semibold italic'>
                Escala: {form.ancho || 0} x {form.altura || 0} mm
              </p>
            </div>
          </div>
        </CardBody>

        <Divider />

        {/* FOOTER */}
        <div className='flex justify-end gap-3 p-4 bg-default-50/50'>
          <Button variant='flat' onPress={onClose}>
            Cancelar
          </Button>
          <Button
            color='warning'
            className='font-bold shadow-lg shadow-warning/20'
            onPress={onConfirm}
          >
            Añadir al diseño
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default ModalAgregar
