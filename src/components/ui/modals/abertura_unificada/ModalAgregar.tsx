import { useState, useEffect } from 'react'
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@heroui/react'
import { catalogo } from '@/data'

import PropiedadesAbertura from '../../inputs/PropiedadesAbertura'
import SelectorCatalogo from '../../inputs/SelectorCatalogo'
import TabsAbertura from '../../TabsAbertura'

type ModalAgregarProps = {
  onClose: () => void
  setAncho: React.Dispatch<React.SetStateAction<number>>
  setAlto: React.Dispatch<React.SetStateAction<number>>
  setTipo: React.Dispatch<React.SetStateAction<string>>
  setImgSrc: React.Dispatch<React.SetStateAction<string>>
  handleConfirmarModulo: (data: any) => void
}

const INITIAL_STATE = {
  linea: 'modena',
  abertura: '',
  ancho: 1000,
  altura: 1000,
  color: 'blanco',
  vidrio: 'float4mm',
  cantidad: 1,
  precio: 0,
  codigo: '',
  descripcion: '',
  mosquitero: { checked: false, precio: 0 },
  premarco: { checked: false, precio: 0 },
  variantKey: 0,
  imgSrc: '',
}

function ModalAgregar({
  onClose,
  handleConfirmarModulo,
  setAlto,
  setAncho,
  setTipo,
  setImgSrc,
}: ModalAgregarProps) {
  const [form, setForm] = useState(INITIAL_STATE)

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const onConfirm = () => {
    handleConfirmarModulo(form)
    onClose()
  }

  useEffect(() => {
    setAlto(form.altura)
    setAncho(form.ancho)
    setTipo(form.abertura)
    setImgSrc(form.imgSrc)
  }, [form.altura, form.ancho, form.abertura, form.imgSrc])

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      size='lg'
      scrollBehavior='inside'
      // Backdrop-blur para que se note la profundidad sobre el editor
      backdrop='blur'
    >
      <ModalContent>
        {(onCloseModal) => (
          <>
            <ModalHeader className='flex flex-col gap-1 p-6'>
              <h2 className='text-xl font-bold text-default-900'>
                Agregar abertura
              </h2>
              <p className='text-small text-default-500 font-normal'>
                Configura las dimensiones y materiales.
              </p>
            </ModalHeader>

            <ModalBody className='p-6'>
              <div className='flex flex-col gap-4'>
                <div className='grid grid-cols-6 gap-2'>
                  <SelectorCatalogo form={form} onChange={handleChange} />
                  <div className='col-span-6'>
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
                  </div>
                  <PropiedadesAbertura
                    form={form}
                    onChange={handleChange}
                    isDisabled={false}
                  />
                </div>
              </div>
            </ModalBody>

            <ModalFooter className='p-4'>
              <Button variant='flat' onPress={onCloseModal}>
                Cancelar
              </Button>
              <Button
                color='warning'
                className='font-bold shadow-lg shadow-warning/20'
                onPress={onConfirm}
              >
                Añadir al diseño
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ModalAgregar
