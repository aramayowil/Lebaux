import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useDisclosure,
} from '@heroui/react'
import { useState } from 'react'
import { BsCheck2Circle } from 'react-icons/bs'
import { RxDownload } from 'react-icons/rx'
import useBreakpoint from '@/config/breakpoints'

function Prueba() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { isSm } = useBreakpoint()
  const [nameCliente, setNameCliente] = useState('')

  return (
    <>
      <Button onPress={onOpen}>Abrir Modal</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className='flex flex-col items-center justify-center gap-2 my-4'>
                  <BsCheck2Circle
                    size={isSm ? 110 : 80}
                    className='text-warning'
                  />
                  <p className='font-sans text-2xl lg:text-3xl font-semibold text-neutral-200'>
                    ¡Casi terminamos!
                  </p>
                </div>
                <Input
                  label='Nombre del cliente'
                  className='max-w-full'
                  variant='faded'
                  value={nameCliente.toLocaleUpperCase()}
                  description='Este nombre se usará en el PDF'
                  onValueChange={setNameCliente}
                  classNames={{
                    input: [
                      'bg-transparent',
                      'border-transparent',
                      'text-black/90 dark:text-white/90',
                      'placeholder:text-default-700/50 dark:placeholder:text-white/60',
                    ],
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color='warning'
                  fullWidth
                  startContent={<RxDownload size={19} />}
                  onPress={onClose}
                >
                  Generando PDF...
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default Prueba
