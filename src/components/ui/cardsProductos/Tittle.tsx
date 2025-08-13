import { Button } from '@heroui/button'
import { useState } from 'react'
import { IoMdCreate } from 'react-icons/io'
import Modal from '../modals/ModalCreateAbert'
import useAberturasStore from '@/stores/useAberturasStore'
import ButtonReset from '../modals/ButtonReset'

function Tittle() {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const onOpenModal = () => setIsOpenModal(true)
  const onCloseModal = () => setIsOpenModal(false)
  const aberturasStore = useAberturasStore((state) => state.aberturas)
  const cantAberturas = aberturasStore.reduce(
    (acc, abertura) => acc + abertura.cantidad,
    0,
  )
  return (
    // <div className='sticky top-17 z-10 bg-[#000000]'>
    <div>
      <div className='flex items-center justify-center max-w-full mx-auto lg:hidden'>
        <ButtonReset />
      </div>
      <h1 className='text-2xl md:text-3xl font-semibold '>Mis Aberturas</h1>
      <section className='flex flex-col item-center justify-between mt-4 pb-4 border-neutral-100  lg:border-0'>
        <div className='flex w-full items-center justify-between'>
          <div className='flex flex-wrap gap-2'>{cantAberturas} productos</div>
          <Button
            variant='ghost'
            color='warning'
            onPress={onOpenModal}
            startContent={<IoMdCreate size={20} />}
          >
            Cargar abertura
          </Button>
          {isOpenModal && <Modal isOpen={isOpenModal} onClose={onCloseModal} />}
        </div>
      </section>
    </div>
  )
}

export default Tittle
