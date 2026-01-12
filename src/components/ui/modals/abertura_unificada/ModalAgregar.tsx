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
  // 1. Mantenemos un estado local para el formulario.
  // IMPORTANTE: Eliminamos el useEffect que sincronizaba automáticamente.
  const [form, setForm] = useState<IAbertura>(abertura)

  const handleChange = (field: string, value: any) => {
    // 2. Actualizamos el estado local inmediatamente.
    // Manejamos la conversión de campos planos (ancho/altura) a la estructura anidada de IAbertura (medidas).
    let updatedForm = { ...form }

    if (field === 'ancho') {
      updatedForm.medidas = { ...updatedForm.medidas, base: value }
    } else if (field === 'altura') {
      updatedForm.medidas = { ...updatedForm.medidas, altura: value }
    } else {
      updatedForm = { ...updatedForm, [field]: value }
    }

    setForm(updatedForm)

    // 3. Sincronizamos con el padre de forma imperativa.
    setAbertura(updatedForm)
  }

  const handleUpdateVariante = (varianteData: {
    descripcion: string
    codigo: string
    imgSrc: string
    variantKey: number
  }) => {
    setForm((prev) => {
      // Mapeamos imgSrc (de Tabs) a img (de IAbertura)
      const { imgSrc, ...rest } = varianteData
      const nuevoEstado = { ...prev, ...rest, img: imgSrc }

      // Usamos el callback para evitar el error de "renderizado simultáneo"
      setTimeout(() => setAbertura(nuevoEstado), 0)

      return nuevoEstado
    })
  }

  const onConfirm = () => {
    handleConfirmarModulo()
    onClose()
  }

  // Preparamos el objeto form para PropiedadesAbertura, que espera 'ancho' y 'altura' planos.
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
                        setTabSelected={form.variantKey}
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
