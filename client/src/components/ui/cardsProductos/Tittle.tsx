import { Button, Chip, Divider } from '@heroui/react'
import { useState } from 'react'
import { HiOutlineCollection, HiOutlineViewGridAdd } from 'react-icons/hi'
import Modal from '../modals/ModalAbertura'
import useAberturasStore from '@/stores/useAberturasStore'
import ButtonReset from '../modals/ButtonReset'
import AberturaCompuesta from '../modals/abertura_unificada/AberturaCompuesta'
import useAberturasCompuestasStore from '@/stores/useAberturasCompustasStore'

function Tittle() {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const onOpenModal = () => setIsOpenModal(true)
  const onCloseModal = () => setIsOpenModal(false)

  const aberturasStore = useAberturasStore((state) => state.aberturas)
  const aberturasComps = useAberturasCompuestasStore(
    (state) => state.aberturasComps,
  )

  // Cálculo de totales
  const cantSimples = aberturasStore.reduce(
    (acc, abertura) => acc + abertura.cantidad,
    0,
  )
  const cantCompuestas = aberturasComps.length
  const totalItems = cantSimples + cantCompuestas

  return (
    <div className='w-full mb-8'>
      {/* Botón de Reset para móviles */}
      <div className='flex items-center justify-center w-full mb-4 lg:hidden'>
        <ButtonReset />
      </div>

      <div className='flex flex-col md:flex-row md:items-end justify-between gap-4'>
        {/* Título y Estadísticas */}
        <div className='flex flex-col gap-1'>
          <div className='flex items-center gap-3'>
            <h1 className='text-3xl md:text-4xl font-black tracking-tight text-white'>
              Mis Aberturas
            </h1>
            <Chip
              startContent={<HiOutlineCollection size={14} />}
              variant='flat'
              color='warning'
              className='font-bold uppercase text-[10px] h-6 shadow-lg'
            >
              {totalItems} Total
            </Chip>
          </div>
          <p className='text-zinc-500 text-sm font-medium'>
            Gestiona los módulos de tu presupuesto.
          </p>
        </div>

        {/* Acciones */}
        <div className='flex items-center gap-3 bg-zinc-900/40 p-2 rounded-2xl border border-zinc-800/50 backdrop-blur-md'>
          {/* Componente de Abertura Compuesta (asumiendo que tiene su propio botón dentro) */}
          <AberturaCompuesta />

          <Divider orientation='vertical' className='h-8 bg-zinc-800' />

          <Button
            variant='flat'
            onPress={onOpenModal}
            className='bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold px-6 h-10 rounded-xl border border-zinc-700/50 transition-all'
            startContent={
              <HiOutlineViewGridAdd size={18} className='text-zinc-400' />
            }
          >
            Cargar Abertura
          </Button>
        </div>
      </div>

      <Divider className='mt-6 bg-zinc-800/50' />

      {/* Modal de Carga Simple */}
      {isOpenModal && (
        <Modal isOpen={isOpenModal} onClose={onCloseModal} aberturaKey={''} />
      )}
    </div>
  )
}

export default Tittle
