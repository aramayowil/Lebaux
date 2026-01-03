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
  handleConfirmarModulo: (data: any) => void
  setLinea: React.Dispatch<React.SetStateAction<string>>
  setAbertura: React.Dispatch<React.SetStateAction<string>>
  setDescripcion: React.Dispatch<React.SetStateAction<string>>
  setAncho: React.Dispatch<React.SetStateAction<number>>
  setAlto: React.Dispatch<React.SetStateAction<number>>
  setImgSrc: React.Dispatch<React.SetStateAction<string>>
  setColor: React.Dispatch<React.SetStateAction<string>>
  setVidrio: React.Dispatch<React.SetStateAction<string>>
  setCantidad: React.Dispatch<React.SetStateAction<number>>
  setPrecio: React.Dispatch<React.SetStateAction<number>>
  setMosquitero: React.Dispatch<
    React.SetStateAction<{ checked: boolean; precio: number }>
  >
  setPremarco: React.Dispatch<
    React.SetStateAction<{ checked: boolean; precio: number }>
  >
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
  setLinea,
  setAbertura,
  setDescripcion,
  setAlto,
  setAncho,
  setImgSrc,
  setVidrio,
  setColor,
  setCantidad,
  setPrecio,
  setMosquitero,
  setPremarco,
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
    setLinea(form.linea)
    setAbertura(form.abertura)
    setDescripcion(form.descripcion)
    setAlto(form.altura)
    setAncho(form.ancho)
    setImgSrc(form.imgSrc)
    setVidrio(form.vidrio)
    setColor(form.color)
    setCantidad(form.cantidad)
    setPrecio(form.precio)
    setMosquitero(form.mosquitero)
    setPremarco(form.premarco)
  }, [
    form.linea,
    form.abertura,
    form.descripcion,
    form.altura,
    form.ancho,
    form.imgSrc,
    form.descripcion,
    form.vidrio,
    form.color,
    form.cantidad,
    form.precio,
    form.mosquitero,
    form.premarco,
  ])

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      size='lg'
      scrollBehavior='inside'
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
