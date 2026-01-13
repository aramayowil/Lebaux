import { FaTrashAlt } from 'react-icons/fa'
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  addToast,
  Divider,
} from '@heroui/react'
import { useState } from 'react'
import { HiOutlineExclamationTriangle } from 'react-icons/hi2'
import useAberturasStore from '@/stores/useAberturasStore'
import useAberturasCompuestasStore from '@/stores/useAberturasCompustasStore'

export default function ButtonReset() {
  const aberturasStore = useAberturasStore((state) => state.aberturas)
  const deleteAberturasStore = useAberturasStore(
    (state) => state.limpiarAberturas,
  )

  const aberturasCompStore = useAberturasCompuestasStore(
    (state) => state.aberturasComps,
  )
  const deleteAberturasCompStore = useAberturasCompuestasStore(
    (state) => state.limpiarAberturasComp,
  )

  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onOpenChange = () => setIsOpen(!isOpen)

  if (aberturasStore.length === 0 && aberturasCompStore.length === 0)
    return null

  return (
    <>
      <div className='w-full'>
        <Button
          variant='bordered'
          color='warning'
          size='sm'
          fullWidth
          startContent={<FaTrashAlt size={14} />}
          onPress={onOpenChange}
          className='font-sans font-bold uppercase tracking-widest text-[10px] border-warning/20 hover:border-warning/50 hover:bg-warning/5 rounded-xl h-10 transition-all'
        >
          Limpiar Cotización
        </Button>
      </div>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hideCloseButton
        backdrop='opaque'
        size='md' // Tamaño aumentado para mayor presencia
        classNames={{
          base: 'bg-zinc-950 border border-zinc-400/60 shadow-2xl',
          backdrop: 'bg-black/80 backdrop-blur-md',
          closeButton: 'hover:bg-zinc-800 active:scale-95 transition-all',
        }}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: { duration: 0.3, ease: 'easeOut' },
            },
            exit: {
              y: 20,
              opacity: 0,
              transition: { duration: 0.2, ease: 'easeIn' },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className='pt-10 pb-6 px-10'>
                <div className='flex flex-col sm:flex-row items-center sm:items-start gap-6'>
                  {/* Icono con badge de advertencia estilizado */}
                  <div className='shrink-0 w-16 h-16 bg-warning/10 rounded-2xl flex items-center justify-center border border-warning/20'>
                    <HiOutlineExclamationTriangle
                      size={32}
                      className='text-warning'
                    />
                  </div>

                  <div className='flex flex-col gap-2 text-center sm:text-left'>
                    <h3 className='font-sans text-xl font-black text-white uppercase tracking-tight'>
                      Confirmar Reinicio
                    </h3>
                    <p className='text-sm text-zinc-400 font-sans leading-relaxed'>
                      Estás a punto de borrar{' '}
                      <span className='text-warning font-bold'>
                        {aberturasStore.length} items
                      </span>{' '}
                      de tu presupuesto actual. Esta acción limpiará la mesa de
                      trabajo por completo.
                    </p>

                    <div className='mt-4 p-3 bg-zinc-900/50 rounded-lg border border-zinc-800/50'>
                      <p className='text-[10px] text-zinc-500 uppercase font-bold tracking-widest'>
                        Aviso de seguridad
                      </p>
                      <p className='text-[11px] text-zinc-600 font-sans italic'>
                        Los datos no guardados se perderán permanentemente.
                      </p>
                    </div>
                  </div>
                </div>
              </ModalBody>

              <Divider className='bg-zinc-800/50 mx-10 w-auto' />

              <ModalFooter className='px-10 py-6'>
                <div className='flex flex-col sm:flex-row gap-3 w-full justify-end'>
                  <Button
                    variant='light'
                    onPress={onClose}
                    className='font-bold text-xs uppercase tracking-widest text-zinc-500 hover:text-zinc-300 px-8'
                  >
                    Mantener items
                  </Button>
                  <Button
                    color='warning'
                    variant='shadow'
                    isLoading={isLoading}
                    className='font-black text-xs uppercase tracking-widest px-10 h-11 shadow-warning/5'
                    onPress={() => {
                      setIsLoading(true)
                      deleteAberturasStore()
                      deleteAberturasCompStore()
                      setTimeout(() => {
                        setIsLoading(false)
                        onClose()
                        addToast({
                          title: 'Sistema Reiniciado',
                          description: 'La lista de aberturas ha sido vaciada.',
                          color: 'warning',
                        })
                      }, 1000)
                    }}
                  >
                    Si, Limpiar Todo
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
