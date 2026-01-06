import {
  addToast,
  Button,
  Divider,
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
import useAberturasStore from '@/stores/useAberturasStore'
import useAberturasCompuestasStore from '@/stores/useAberturasCompustasStore'
import ModalAbertura from '../modals/ModalAbertura'
import { useState } from 'react'
import TableEmpty from '../TableEmpty'
import { HiDotsVertical } from 'react-icons/hi'

const formatCurrency = (valor: number) => {
  return valor.toLocaleString('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}
const formatCurrencyWithDecimals = (valor: number) => {
  return valor.toLocaleString('es-ES', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
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

  // controles modal editar (Simples)
  const [keyAbertura, setKeyAbertura] = useState<string>('')
  const [isOpenEditModal, setIsOpenEditModal] = useState(false)

  const handlekeyAbertura = (key: string) => setKeyAbertura(key)
  const onOpenEditModal = () => setIsOpenEditModal(true)
  const onCloseEditModal = () => {
    setIsOpenEditModal(false)
    setKeyAbertura('')
  }

  const isEmpty = aberturas.length === 0 && aberturasCompuestas.length === 0

  return (
    <section className='flex flex-col gap-2 py-1 md:pt-1 lg:pb-2 bg-opacity-60'>
      {isEmpty ? (
        <TableEmpty />
      ) : (
        <ScrollShadow hideScrollBar className='h-[60vh]'>
          {/* --- RENDER ABERTURAS SIMPLES --- */}
          {aberturas.map((abertura, index) => (
            <article
              key={`simple-${abertura.key || index}`}
              className='relative lg:flex flex-col w-full p-2 lg:p-0 hover:bg-neutral-900 rounded-lg '
            >
              <div className='flex flex-row gap-2 items-center w-full px-3 py-1.5 border-b border-neutral-700'>
                <div className='flex flex-row gap-2 md:basis-4/12 items-center w-full lg:p-0 '>
                  <Image
                    radius='none'
                    src={abertura.img}
                    alt='img abertura'
                    width={70}
                    height={70}
                    className='aspect-square object-contain'
                  />
                  <div className='flex flex-col'>
                    <span className='capitalize text-neutral-400 text-sm'>
                      {abertura.linea}
                    </span>
                    <span className='capitalize text-base font-semibold'>
                      {abertura.name_abertura}
                    </span>
                    <span className='text-sm text-neutral-400'>
                      Cantidad: {abertura.cantidad}
                    </span>
                  </div>
                </div>

                <div className='hidden md:flex flex-col md:basis-6/12 '>
                  <span className='text-base font-medium'>
                    {abertura.descripcion_abertura}
                  </span>
                  <div className='flex flex-wrap flex-col '>
                    <span className='text-sm text-neutral-400'>
                      {abertura.medidas.base}x{abertura.medidas.altura}
                    </span>
                    <span className='capitalize text-sm text-neutral-400'>
                      {vidrios.find((v) => v.key === abertura.vidrio)?.label ||
                        abertura.vidrio}
                    </span>
                    <span className='capitalize text-sm text-neutral-400'>
                      {colors.find((c) => c.key === abertura.color)?.label ||
                        abertura.color}
                    </span>
                  </div>
                </div>

                <div className='flex md:basis-1/12 gap-1 items-center'>
                  <span className='text-base font-medium'>
                    $&nbsp;
                    {formatCurrencyWithDecimals(
                      (abertura.precio +
                        abertura.accesorios.mosquitero +
                        abertura.accesorios.premarco) *
                        abertura.cantidad,
                    )}
                  </span>
                  <Popover showArrow offset={10} placement='top-end'>
                    <PopoverTrigger>
                      <Button
                        isIconOnly
                        variant='light'
                        radius='full'
                        size='sm'
                        className='min-w-2 min-h-2 h-6.5 w-6.5'
                      >
                        <IoIosInformationCircleOutline size={20} />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className='px-1 py-2 w-47.5'>
                        <div className='text-md font-bold mb-2'>Detalles</div>
                        <div className='flex flex-col gap-1'>
                          <div className='flex justify-between text-sm text-neutral-400'>
                            <span>Precio Unit.:</span>
                            <span>${formatCurrency(abertura.precio)}</span>
                          </div>
                          <Divider className='my-1' />
                          <div className='flex justify-between text-sm font-bold'>
                            <span>Total:</span>
                            <span>
                              $
                              {formatCurrency(
                                (abertura.precio +
                                  abertura.accesorios.mosquitero +
                                  abertura.accesorios.premarco) *
                                  abertura.cantidad,
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className='absolute right-0 top-0 md:relative md:flex md:basis-1/12 md:justify-center'>
                  <Dropdown placement='bottom-end'>
                    <DropdownTrigger>
                      <Button isIconOnly size='sm' variant='light'>
                        <HiDotsVertical size={20} />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem
                        key='edit'
                        startContent={<IoMdCreate size={16} />}
                        onPress={() => {
                          handlekeyAbertura(abertura.key)
                          onOpenEditModal()
                        }}
                      >
                        Editar
                      </DropdownItem>
                      <DropdownItem
                        key='delete'
                        className='text-danger'
                        color='danger'
                        startContent={<GoTrash size={16} />}
                        onPress={() => {
                          eliminarAberturaStore(abertura.key)
                          addToast({
                            color: 'warning',
                            title: 'Abertura eliminada',
                          })
                        }}
                      >
                        Eliminar
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            </article>
          ))}

          {/* --- RENDER ABERTURAS COMPUESTAS --- */}
          {aberturasCompuestas.map((comp, index) => (
            <article
              key={`comp-${comp.key || index}`}
              /* Cambio: border-blue-500 -> border-warning y bg-blue-500/5 -> bg-warning-50/10 o bg-warning/5 */
              className='relative lg:flex flex-col w-full p-2 lg:p-0 border-l-4 border-warning bg-warning/5 hover:bg-neutral-900 rounded-lg mt-2 transition-colors'
            >
              <div className='flex flex-row gap-2 items-center w-full px-3 py-1.5 border-b border-neutral-700/50'>
                <div className='flex flex-row gap-2 md:basis-4/12 items-center w-full'>
                  <Image
                    radius='sm' /* Un radio pequeño suaviza el diseño */
                    src={comp.capturedImageBase64}
                    alt='img abertura'
                    width={70}
                    height={70}
                    className='aspect-square object-contain bg-white/10'
                  />
                  <div className='flex flex-col'>
                    {/* Cambio: text-blue-500 -> text-warning */}
                    <span className='text-[10px] text-warning font-bold uppercase tracking-wider'>
                      Abertura Compuesta
                    </span>
                    <span className='capitalize text-base font-semibold'>
                      Medidas
                    </span>
                    <span className='text-sm text-neutral-400'>
                      Cantidad: {comp.cantidad}
                    </span>
                  </div>
                </div>

                <div className='hidden md:flex flex-col md:basis-6/12 '>
                  <span className='text-sm text-neutral-400 italic'>
                    Diseño a medida
                    <br />
                    <span className='text-neutral-200 not-italic font-medium'>
                      {comp.medidas.base} x {comp.medidas.altura}
                    </span>
                  </span>
                </div>

                <div className='flex md:basis-1/12 gap-1 items-center'>
                  {/* Cambio: text-blue-400 -> text-warning-400 o warning */}
                  <span className='text-base font-bold text-warning'>
                    $&nbsp;
                    {formatCurrencyWithDecimals(comp.precio * comp.cantidad)}
                  </span>
                </div>

                <div className='absolute right-0 top-0 md:relative md:flex md:basis-1/12 md:justify-center'>
                  <Dropdown placement='bottom-end'>
                    <DropdownTrigger>
                      <Button
                        isIconOnly
                        size='sm'
                        variant='light'
                        radius='full'
                      >
                        <HiDotsVertical
                          size={20}
                          className='text-neutral-400'
                        />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label='Acciones de abertura'>
                      <DropdownItem
                        key='delete'
                        className='text-danger'
                        color='danger'
                        description='Se eliminará permanentemente'
                        startContent={<GoTrash size={16} />}
                        onPress={() => {
                          eliminarAberturaCompuestaStore(comp.key)
                          addToast({
                            color: 'danger',
                            title: 'Compuesta eliminada',
                          })
                        }}
                      >
                        Eliminar
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            </article>
          ))}
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
