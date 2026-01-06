import {
  addToast,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollShadow,
} from '@heroui/react'
import { colors } from '@/models/IColors'
import { vidrios } from '@/models/IVidrios'
import { GoTrash } from 'react-icons/go'
import { IoIosInformationCircleOutline, IoMdCreate } from 'react-icons/io'
import { HiOutlineViewColumns } from 'react-icons/hi2'
import useAberturasStore from '@/stores/useAberturasStore'
import useAberturasCompuestasStore from '@/stores/useAberturasCompustasStore'
import ModalAbertura from '../modals/ModalAbertura'
import { useState } from 'react'
import TableEmpty from '../TableEmpty'
import { HiDotsVertical } from 'react-icons/hi'

const formatCurrency = (valor: number) => {
  return valor.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  })
}

export default function Body() {
  const aberturas = useAberturasStore((state) => state.aberturas)
  const eliminarAberturaStore = useAberturasStore(
    (state) => state.eliminarAbertura,
  )
  const aberturasCompuestas = useAberturasCompuestasStore(
    (state) => state.aberturasComps,
  )
  const eliminarAberturaCompuestaStore = useAberturasCompuestasStore(
    (state) => state.eliminarAberturaComp,
  )

  const [keyAbertura, setKeyAbertura] = useState<string>('')
  const [isOpenEditModal, setIsOpenEditModal] = useState(false)

  const onOpenEditModal = (key: string) => {
    setKeyAbertura(key)
    setIsOpenEditModal(true)
  }
  const onCloseEditModal = () => {
    setIsOpenEditModal(false)
    setKeyAbertura('')
  }

  const isEmpty = aberturas.length === 0 && aberturasCompuestas.length === 0

  return (
    <section className='w-full max-w-5xl mx-auto px-1 py-4'>
      {isEmpty ? (
        <TableEmpty />
      ) : (
        <ScrollShadow className='h-[65vh] pr-4' size={20}>
          <div className='flex flex-col gap-3'>
            {/* --- RENDER ABERTURAS SIMPLES --- */}
            {aberturas.map((abertura) => (
              <article
                key={`simple-${abertura.key}`}
                className='group relative flex items-center gap-4 p-2 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl hover:bg-zinc-900/80 hover:border-zinc-700 transition-all duration-300'
              >
                <div className='relative shrink-0 bg-white/5 rounded-md p-1 border border-zinc-800'>
                  <Image
                    src={abertura.img}
                    alt='abertura'
                    width={64}
                    className='aspect-square object-contain'
                  />
                </div>

                <div className='grow grid grid-cols-1 md:grid-cols-3 gap-2 items-center'>
                  <div className='flex flex-col'>
                    <span className='text-[10px] font-black uppercase tracking-widest text-zinc-500'>
                      Línea {abertura.linea}
                    </span>
                    <h4 className='text-sm font-bold text-zinc-100 capitalize'>
                      {abertura.name_abertura}
                    </h4>
                    <span className='text-xs text-zinc-500'>
                      Cantidad: {abertura.cantidad}
                    </span>
                  </div>

                  <div className='hidden md:flex flex-col gap-0.5 border-x border-zinc-800/50 px-4'>
                    <span className='text-xs font-medium text-zinc-300'>
                      {abertura.medidas.base} x {abertura.medidas.altura} mm
                    </span>
                    <span className='text-[10px] text-zinc-500 uppercase font-semibold'>
                      {vidrios.find((v) => v.key === abertura.vidrio)?.label ||
                        'DVH'}{' '}
                      •{' '}
                      {colors.find((c) => c.key === abertura.color)?.label ||
                        'Blanco'}
                    </span>
                  </div>

                  <div className='flex flex-col md:items-end pr-4'>
                    <span className='text-xs text-zinc-500 uppercase tracking-tighter'>
                      Subtotal
                    </span>
                    <span className='text-lg font-black text-white tracking-tight'>
                      {formatCurrency(
                        (abertura.precio +
                          abertura.accesorios.mosquitero +
                          abertura.accesorios.premarco) *
                          abertura.cantidad,
                      )}
                    </span>
                  </div>
                </div>

                <div className='flex items-center gap-1'>
                  <Popover placement='top'>
                    <PopoverTrigger>
                      <Button
                        isIconOnly
                        variant='light'
                        size='sm'
                        className='text-zinc-500 hover:text-zinc-200'
                      >
                        <IoIosInformationCircleOutline size={20} />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='bg-zinc-950 border border-zinc-800'>
                      <div className='p-2 text-xs'>
                        <p className='font-bold border-b border-zinc-800 pb-1 mb-1'>
                          Cargos Unitarios
                        </p>
                        <div className='space-y-1 text-zinc-400'>
                          <div className='flex justify-between gap-4'>
                            <span>Base:</span>{' '}
                            <span>{formatCurrency(abertura.precio)}</span>
                          </div>
                          <div className='flex justify-between gap-4'>
                            <span>Adicionales:</span>{' '}
                            <span>
                              {formatCurrency(
                                abertura.accesorios.mosquitero +
                                  abertura.accesorios.premarco,
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>

                  <Dropdown
                    backdrop='transparent'
                    classNames={{
                      content:
                        'bg-zinc-950 border border-zinc-800 shadow-2xl min-w-45 p-1.5',
                    }}
                  >
                    <DropdownTrigger>
                      <Button
                        isIconOnly
                        variant='light'
                        size='sm'
                        className='h-8 w-8 rounded-lg hover:bg-zinc-800 transition-all group'
                      >
                        <HiDotsVertical
                          size={18}
                          className='text-zinc-500 group-hover:text-zinc-200 transition-colors'
                        />
                      </Button>
                    </DropdownTrigger>

                    <DropdownMenu
                      aria-label='Acciones de item'
                      variant='flat'
                      itemClasses={{
                        base: [
                          'rounded-lg',
                          'py-2.5',
                          'transition-all',
                          'duration-200',
                        ],
                      }}
                    >
                      {/* ITEM: EDITAR (Gris Titanio / Acero) */}
                      <DropdownItem
                        key='edit'
                        onPress={() => onOpenEditModal(abertura.key)}
                        className='group data-[hover=true]:bg-zinc-800/50'
                        startContent={
                          <div className='p-1.5 rounded-md bg-zinc-900 border border-zinc-800 group-hover:border-zinc-400 group-hover:text-zinc-100 transition-all shadow-sm'>
                            <IoMdCreate
                              size={16}
                              className='text-zinc-500 group-hover:text-zinc-100'
                            />
                          </div>
                        }
                      >
                        <span className='text-[11px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-zinc-100 transition-colors'>
                          Editar Ficha
                        </span>
                      </DropdownItem>

                      {/* ITEM: ELIMINAR (Rojo Intenso y Sólido) */}
                      <DropdownItem
                        key='delete'
                        onPress={() => {
                          eliminarAberturaStore(abertura.key)
                          addToast({
                            title: 'REGISTRO ELIMINADO',
                            description:
                              'La abertura se ha quitado del presupuesto correctamente.',
                            variant: 'flat',
                            color: 'danger',
                            // Si tu librería de toast lo permite, podrías añadir un ícono aquí
                          })
                        }}
                        className='group data-[hover=true]:bg-red-500/10'
                        startContent={
                          <div className='p-1.5 rounded-md bg-zinc-900 border border-zinc-800 group-hover:border-red-600 group-hover:bg-red-600 transition-all shadow-md'>
                            <GoTrash
                              size={16}
                              className='text-zinc-500 group-hover:text-white'
                            />
                          </div>
                        }
                      >
                        <span className='text-[11px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-red-500 transition-colors'>
                          Eliminar Registro
                        </span>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </article>
            ))}

            {/* --- RENDER ABERTURAS COMPUESTAS --- */}
            {aberturasCompuestas.map((comp) => (
              <article
                key={`comp-${comp.key}`}
                className='group relative flex items-center gap-4 p-2 bg-zinc-900/20 border border-zinc-700/30 rounded-2xl hover:bg-zinc-900/60 transition-all duration-300'
              >
                {/* Indicador visual de Compuesta (Sutil) */}
                <div className='absolute left-0 top-1/4 bottom-1/4 w-1 bg-warning/40 rounded-r-full' />

                <div className='relative shrink-0 bg-zinc-800 rounded-xl p-2 border border-zinc-700'>
                  <Image
                    src={comp.capturedImageBase64}
                    alt='compuesta'
                    width={64}
                    className='aspect-square object-contain grayscale group-hover:grayscale-0 transition-all'
                  />
                </div>

                <div className='grow grid grid-cols-1 md:grid-cols-3 gap-2 items-center'>
                  <div className='flex flex-col'>
                    <div className='flex items-center gap-1.5'>
                      <HiOutlineViewColumns
                        className='text-warning/60'
                        size={12}
                      />
                      <span className='text-[10px] font-black uppercase tracking-widest text-warning/60'>
                        Estructura Compuesta
                      </span>
                    </div>
                    <h4 className='text-sm font-bold text-zinc-100'>
                      Diseño Personalizado
                    </h4>
                    <span className='text-xs text-zinc-500'>
                      Cantidad: {comp.cantidad}
                    </span>
                  </div>

                  <div className='hidden md:flex flex-col border-x border-zinc-800/50 px-4'>
                    <span className='text-xs font-bold text-zinc-400 italic'>
                      Configuración Especial
                    </span>
                    <span className='text-xs text-zinc-200'>
                      {comp.medidas.base} x {comp.medidas.altura} mm
                    </span>
                  </div>

                  <div className='flex flex-col md:items-end pr-4'>
                    <span className='text-xs text-zinc-500 uppercase tracking-tighter'>
                      Subtotal
                    </span>
                    <span className='text-lg font-black text-warning/90 tracking-tight'>
                      {formatCurrency(comp.precio * comp.cantidad)}
                    </span>
                  </div>
                </div>

                <div className='flex items-center gap-1'>
                  <Dropdown
                    backdrop='transparent'
                    classNames={{
                      content:
                        'bg-zinc-950 border border-zinc-800 shadow-2xl min-w-45 p-1.5',
                    }}
                  >
                    <DropdownTrigger>
                      <Button
                        isIconOnly
                        variant='light'
                        size='sm'
                        className='h-8 w-8 rounded-lg hover:bg-zinc-800 transition-all group'
                      >
                        <HiDotsVertical
                          size={18}
                          className='text-zinc-500 group-hover:text-zinc-200 transition-colors'
                        />
                      </Button>
                    </DropdownTrigger>

                    <DropdownMenu
                      aria-label='Acciones de item'
                      variant='flat'
                      itemClasses={{
                        base: [
                          'rounded-lg',
                          'py-2.5',
                          'transition-all',
                          'duration-200',
                        ],
                      }}
                    >
                      {/* ITEM: ELIMINAR (Rojo Intenso y Sólido) */}
                      <DropdownItem
                        key='delete'
                        onPress={() => {
                          eliminarAberturaCompuestaStore(comp.key)
                          addToast({
                            title: 'REGISTRO ELIMINADO',
                            description:
                              'La abertura se ha quitado del presupuesto correctamente.',
                            variant: 'flat',
                            color: 'danger',
                            // Si tu librería de toast lo permite, podrías añadir un ícono aquí
                          })
                        }}
                        className='group data-[hover=true]:bg-red-500/10'
                        startContent={
                          <div className='p-1.5 rounded-md bg-zinc-900 border border-zinc-800 group-hover:border-red-600 group-hover:bg-red-600 transition-all shadow-md'>
                            <GoTrash
                              size={16}
                              className='text-zinc-500 group-hover:text-white'
                            />
                          </div>
                        }
                      >
                        <span className='text-[11px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-red-500 transition-colors'>
                          Eliminar Registro
                        </span>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </article>
            ))}
          </div>
        </ScrollShadow>
      )}

      {isOpenEditModal && (
        <ModalAbertura
          aberturaKey={keyAbertura}
          isOpen={isOpenEditModal}
          onClose={onCloseEditModal}
        />
      )}
    </section>
  )
}
