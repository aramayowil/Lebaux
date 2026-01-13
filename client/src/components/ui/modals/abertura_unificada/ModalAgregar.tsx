import { useState } from 'react'
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@heroui/react'
import { catalogo } from '@/data'
import { IAbertura } from '@/interfaces/IAbertura'

import PropiedadesAbertura from '../../inputs/PropiedadesAbertura'
import SelectorCatalogo from '../../inputs/SelectorCatalogo'
import TabsAberturaComp from './TabsAberturaComp'

interface ModalAgregarProps {
  onClose: () => void
  handleConfirmarModulo: () => void
  abertura: IAbertura
  setAbertura: (val: IAbertura) => void
}

function ModalAgregar({
  onClose,
  handleConfirmarModulo,
  abertura,
  setAbertura,
}: ModalAgregarProps) {
  const [form, setForm] = useState<IAbertura>({
    ...abertura,
    linea: abertura.linea || '',
    abertura_id: abertura.abertura_id || '',
    nombre_abertura: abertura.nombre_abertura || '',
    medidas: abertura.medidas || { base: 0, altura: 0 },
  })
  const handleChange = (field: string, value: any) => {
    let updatedForm = { ...form }

    if (field === 'ancho') {
      updatedForm.medidas = { ...updatedForm.medidas, base: value }
    } else if (field === 'altura') {
      updatedForm.medidas = { ...updatedForm.medidas, altura: value }
    } else if (field === 'linea') {
      updatedForm.linea = value
      // Resetear dependencias
      updatedForm.abertura_id = ''
      updatedForm.nombre_abertura = ''
    } else if (field === 'abertura_id') {
      updatedForm.abertura_id = value
      // Actualizar nombre automáticamente
      if (updatedForm.linea && value) {
        const item = catalogo[updatedForm.linea]?.find((i) => i.id === value)
        if (item) {
          updatedForm.nombre_abertura = item.abertura
        }
      }
    } else {
      updatedForm = { ...updatedForm, [field]: value }
    }

    setForm(updatedForm)
    setAbertura(updatedForm)
  }

  const handleUpdateVariante = (varianteData: {
    descripcion_abertura: string
    cod_abertura: string
    img: string
    variantKey: number
  }) => {
    setForm((prev) => {
      const { img, ...rest } = varianteData
      const nuevoEstado = { ...prev, ...rest, img }
      setTimeout(() => setAbertura(nuevoEstado), 0)
      return nuevoEstado
    })
  }

  const onConfirm = () => {
    handleConfirmarModulo()
    onClose()
  }

  const formParaPropiedades = {
    ...form,
    ancho: form.medidas.base,
    altura: form.medidas.altura,
  }

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
                {form.abertura_id ? 'Editar abertura' : 'Agregar abertura'}
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
                    {form.linea && form.abertura_id && (
                      <TabsAberturaComp
                        selectedAbertura={catalogo[form.linea]?.find(
                          (i) => i.id === form.abertura_id,
                        )}
                        onVarianteChange={handleUpdateVariante}
                        setTabSelected={form.variantKey || 0}
                      />
                    )}
                  </div>

                  <PropiedadesAbertura
                    form={formParaPropiedades}
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
                Confirmar cambios
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ModalAgregar
