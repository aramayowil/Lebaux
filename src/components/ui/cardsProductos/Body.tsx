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
import { GoTrash } from 'react-icons/go'
import { IoIosInformationCircleOutline, IoMdCreate } from 'react-icons/io'
import useAberturasStore from '@/stores/useAberturasStore'
import ModalEditAbertura from '../modals/ModalEditAbert'
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

  //controles modal editar
  const [keyAbertura, setKeyAbertura] = useState<number | null>(null)
  const handlekeyAbertura = (key: number) => {
    setKeyAbertura(key)
  }
  const [isOpenEditModal, setIsOpenEditModal] = useState(false)
  const onOpenEditModal = () => setIsOpenEditModal(true)
  const onCloseEditModal = () => {
    setIsOpenEditModal(false)
    setKeyAbertura(null) // Reset keyAbertura when closing the modal
  }
  return (
    <section className='flex flex-col gap-2 py-1 md:pt-1 lg:pb-2 bg-opacity-60'>
      {aberturas.length === 0 ? (
        <TableEmpty />
      ) : (
        <ScrollShadow hideScrollBar className='h-[50vh]'>
          {aberturas.map((abertura, index) => (
            <article
              key={index}
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
                    <div className='flex md:hidden flex-wrap flex-row w-full'>
                      <span className='text-sm text-neutral-400 mr-2'>
                        {abertura.medidas.base}x{abertura.medidas.altura}
                      </span>
                      <span className='capitalize text-sm text-neutral-400 mr-2'>
                        {abertura.vidrio}
                      </span>
                      <span className='capitalize text-sm text-neutral-400'>
                        {abertura.color}
                      </span>
                    </div>
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
                      {abertura.vidrio}
                    </span>
                    <span className='capitalize text-sm text-neutral-400'>
                      {abertura.color}
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
                        className='min-w-2 min-h-2 h-[26px] w-[26px]'
                      >
                        <IoIosInformationCircleOutline size={20} />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className='px-1 py-2 w-[190px]'>
                        <div className='text-md font-bold mb-2'>Detalles</div>
                        <div className='flex flex-col'>
                          <div className='flex justify-between w-full'>
                            <span className='text-sm text-neutral-400'>
                              Cantidad: {abertura.cantidad}
                            </span>
                          </div>
                          <div className='flex justify-between w-full'>
                            <span className='text-sm text-neutral-400'>
                              Precio Unit.:
                            </span>
                            <span className='text-sm text-neutral-400'>
                              $&nbsp;{formatCurrency(abertura.precio)}
                            </span>
                          </div>
                          <div className='flex justify-between w-full'>
                            <span className='text-sm text-neutral-400'>
                              Mosquitero:
                            </span>
                            <span className='text-sm text-neutral-400'>
                              $&nbsp;
                              {formatCurrency(abertura.accesorios.mosquitero)}
                            </span>
                          </div>
                          <div className='flex justify-between w-full'>
                            <span className='text-sm text-neutral-400'>
                              Premarco:
                            </span>
                            <span className='text-sm text-neutral-400'>
                              $&nbsp;
                              {formatCurrency(abertura.accesorios.premarco)}
                            </span>
                          </div>
                          <Divider className='my-2' />
                          <div className='flex justify-between w-full'>
                            <span className='text-sm text-neutral-400'>
                              Total:
                            </span>
                            <span className='text-sm text-neutral-400'>
                              $&nbsp;
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
                <div className='absolute right-0 top-0 md:relative md:flex md:basis-1/12 md:justify-center md:items-end lg:basis-1/12 '>
                  <div className='relative flex justify-center items-center gap-2 '>
                    <Dropdown
                      placement='bottom-end'
                      showArrow
                      classNames={{
                        content: 'min-w-35',
                      }}
                    >
                      <DropdownTrigger>
                        <Button isIconOnly size='sm' variant='light'>
                          <HiDotsVertical />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu>
                        <DropdownItem
                          showDivider
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
                          startContent={<GoTrash size={16} />}
                          onPress={() => {
                            eliminarAberturaStore(abertura.key)
                            addToast({
                              color: 'warning',
                              title: 'Abertura eliminada',
                              description:
                                'La abertura se ha eliminado correctamente.',
                            })
                          }}
                        >
                          Eliminar
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </ScrollShadow>
      )}

      {isOpenEditModal && (
        <ModalEditAbertura
          key_abertura={keyAbertura}
          isOpen={isOpenEditModal}
          onClose={onCloseEditModal}
        />
      )}
    </section>
  )
}
