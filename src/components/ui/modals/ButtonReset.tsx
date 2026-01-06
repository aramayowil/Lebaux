import { FaTrash } from 'react-icons/fa'
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  addToast,
} from '@heroui/react'
import { useState } from 'react'
import useBreakpoint from '@/config/breakpoints'
import { IoWarningOutline } from 'react-icons/io5'
import useAberturasStore from '@/stores/useAberturasStore'

export default function ButtonReset() {
  const aberturasStore = useAberturasStore((state) => state.aberturas)
  const deleteAberturasStore = useAberturasStore(
    (state) => state.limpiarAberturas,
  )
  const { isSm } = useBreakpoint()
  const [isOpen, setIsOpen] = useState(false)
  const onOpenChange = () => {
    setIsOpen(!isOpen)
  }
  const [isLoading, setIsLoading] = useState(false)
  const handleLoading = (loading: boolean) => {
    setIsLoading(loading)
  }

  return (
    <>
      <div className='my-4 mx-auto w-full lg:w-55'>
        {aberturasStore.length > 0 && (
          <Button
            variant='flat'
            isDisabled={aberturasStore.length === 0}
            color='warning'
            size={isSm ? 'lg' : 'md'}
            fullWidth
            startContent={<FaTrash />}
            onPress={onOpenChange}
          >
            ¡Eliminar Todo!
          </Button>
        )}
      </div>

      {isOpen && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalBody>
                  <div className='flex flex-col items-center justify-center gap-2 my-4'>
                    <IoWarningOutline
                      size={isSm ? 80 : 70}
                      className='text-warning'
                    />
                    <p className='font-sans text-lg lg:text-2xl font-semibold text-neutral-200 text-center'>
                      ¿Estás seguro de eliminar todo?
                    </p>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <div className='flex justify-evenly w-full'>
                    <Button
                      color='default'
                      variant='light'
                      onPress={onClose}
                      className='max-w-[40%] w-full'
                    >
                      Cancelar
                    </Button>
                    <Button
                      color='warning'
                      variant='solid'
                      isLoading={isLoading}
                      className='max-w-[40%] w-full'
                      onPress={() => {
                        handleLoading(true)
                        deleteAberturasStore()

                        // Simulate a network request
                        setTimeout(() => {
                          handleLoading(false)
                          onClose()

                          addToast({
                            title: 'Todo eliminado',
                            description:
                              'Todas las aberturas han sido eliminadas.',
                            color: 'success',
                          })
                        }, 1000)
                      }}
                    >
                      Confirmar
                    </Button>
                  </div>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  )
}
