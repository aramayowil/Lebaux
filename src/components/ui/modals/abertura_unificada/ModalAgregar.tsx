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

import PropiedadesAbertura from '../../inputs/PropiedadesAbertura'
import SelectorCatalogo from '../../inputs/SelectorCatalogo'
import TabsAberturaComp from './TabsAberturaComp'

interface abertura {
  linea: string
  abertura: string
  ancho: number
  altura: number
  color: string
  vidrio: string
  cantidad: number
  precio: number
  codigo: string
  descripcion: string
  mosquitero: { checked: boolean; precio: number }
  premarco: { checked: boolean; precio: number }
  imgSrc: string
  variantKey: number
}

interface ModalAgregarProps {
  onClose: () => void
  handleConfirmarModulo: () => void
  abertura: abertura
  setAbertura: (val: abertura) => void
}

function ModalAgregar({
  onClose,
  handleConfirmarModulo,
  abertura,
  setAbertura,
}: ModalAgregarProps) {
  // 1. Mantenemos un estado local para el formulario.
  // IMPORTANTE: Eliminamos el useEffect que sincronizaba automáticamente.
  const [form, setForm] = useState<abertura>(abertura)

  const handleChange = (field: string, value: any) => {
    // 2. Actualizamos el estado local inmediatamente para que el UI responda
    const updatedForm = { ...form, [field]: value }
    setForm(updatedForm)

    // 3. Sincronizamos con el padre de forma imperativa solo cuando hay un cambio.
    // Esto evita el bucle infinito porque el cambio nace de una acción del usuario.
    setAbertura(updatedForm)
  }
  // En ModalAgregar.tsx
  // En ModalAgregar.tsx

  const handleUpdateVariante = (varianteData: {
    descripcion: string
    codigo: string
    imgSrc: string
    variantKey: number
  }) => {
    setForm((prev) => {
      const nuevoEstado = { ...prev, ...varianteData }

      // Usamos el callback para evitar el error de "renderizado simultáneo"
      setTimeout(() => setAbertura(nuevoEstado), 0)

      return nuevoEstado
    })
  }

  const onConfirm = () => {
    // 4. Al confirmar, el padre ya tiene el último estado gracias a handleChange
    handleConfirmarModulo()
    onClose()
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
                {form.abertura ? 'Editar abertura' : 'Agregar abertura'}
              </h2>
              <p className='text-small text-default-500 font-normal'>
                Configura las dimensiones y materiales.
              </p>
            </ModalHeader>

            <ModalBody className='p-6'>
              <div className='flex flex-col gap-4'>
                <div className='grid grid-cols-6 gap-2'>
                  {/* SelectorCatalogo usa nuestro handleChange manual */}
                  <SelectorCatalogo form={form} onChange={handleChange} />

                  <div className='col-span-6'>
                    {form.linea && form.abertura && (
                      <TabsAberturaComp
                        selectedAbertura={catalogo[form.linea]?.find(
                          (i) => i.id === form.abertura,
                        )}
                        onVarianteChange={handleUpdateVariante}
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