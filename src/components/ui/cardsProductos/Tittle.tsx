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

  const totalItems =
    aberturasStore.reduce((acc, ab) => acc + ab.cantidad, 0) +
    aberturasComps.length

  return (
    <div className='w-full mb-8 px-2'>
      {/* Botón de Reset para móviles */}
      <div className='flex items-center justify-center w-full mb-6 lg:hidden'>
        <ButtonReset />
      </div>

      {/* CONTENEDOR PRINCIPAL: Flex Wrap para evitar desbordes */}
      <div className='w-full flex flex-wrap items-center justify-between gap-y-6 gap-x-2'>
        {/* LADO IZQUIERDO: Branding y Contador */}
        <div className='flex flex-col min-w-[250px] flex-1'>
          <div className='flex items-center gap-3 flex-wrap'>
            <h1 className='text-3xl md:text-4xl font-black tracking-tight text-white whitespace-nowrap'>
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

          <p className='text-zinc-500 text-sm mt-1 font-medium italic'>
            Gestiona los módulos de tu presupuesto.
          </p>
        </div>

        {/* LADO DERECHO: Barra de Acciones */}
        <div className='flex flex-wrap items-center gap-2 bg-zinc-900/40 p-2 rounded-2xl border border-zinc-800/50 backdrop-blur-md w-full md:w-auto'>
          {/* Botón Diseñar (Componente Externo) */}
          <div className='flex-1 sm:flex-initial'>
            <AberturaCompuesta />
          </div>

          {/* Separador vertical: Solo en escritorio */}
          <div className='hidden sm:block h-8 w-1px bg-zinc-800/60 mx-1' />

          {/* Botón Cargar */}
          <Button
            variant='flat'
            onPress={onOpenModal}
            className='flex-1 sm:flex-initial min-w-[160px] bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 font-bold px-6 h-11 rounded-xl border border-zinc-700/50 transition-all flex justify-center gap-2 group'
          >
            <HiOutlineViewGridAdd
              size={20}
              className='text-zinc-500 group-hover:text-zinc-300 transition-colors'
            />
            <span className='whitespace-nowrap'>Cargar Abertura</span>
          </Button>
        </div>
      </div>

      {/* Divisor inferior de sección */}
      <Divider className='mt-8 bg-zinc-800/50' />

      {/* Modal Lógica */}
      {isOpenModal && (
        <Modal isOpen={isOpenModal} onClose={onCloseModal} aberturaKey={''} />
      )}
    </div>
  )
}

export default Tittle
