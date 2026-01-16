import { useState, useEffect, useMemo } from 'react'
import DefaultLayout from '@/layouts/default'
import {
  Button,
  Input,
  ScrollShadow,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  addToast,
  Divider,
  Skeleton,
  Modal,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@heroui/react'
import {
  HiOutlineEye,
  HiOutlinePencilSquare,
  HiOutlineDocumentArrowDown,
  HiOutlineEllipsisVertical,
  HiOutlineCalendarDays,
  HiOutlineUser,
  HiOutlineCube,
} from 'react-icons/hi2'
import { HiOutlineSearch, HiOutlineTrash } from 'react-icons/hi'
import { FaHistory } from 'react-icons/fa'
import usePresupuestoStore from '@/stores/usePresupuestosStore'
import IPresupuesto from '@/interfaces/IPresupuesto'
import capitalize from '@/utils/capitalize_text'
import { IAbertura } from '@/interfaces/IAbertura'
import { IAbertura_Compuesta } from '@/interfaces/IAberturaCompuesta'

const INITIAL_PRESUPUESTO: IPresupuesto = {
  id: '',
  cliente: '',
  fecha: '',
  items: [],
  total: 0,
  descuento: 0,
  observaciones: '',
  estado: 'pendiente',
}

const esCompuesta = (
  item: IAbertura | IAbertura_Compuesta,
): item is IAbertura_Compuesta => {
  return 'configuracion' in item
}

export default function Historial() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const [presupuestoSeleccionado, setPresupuestoSeleccionado] =
    useState<IPresupuesto>(INITIAL_PRESUPUESTO)

  const [filter, setFilter] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // 1. Obtenemos los presupuestos del store
  const presupuestosStore = usePresupuestoStore((state) => state.presupuestos)

  // 2. Lógica de Filtrado y Ordenamiento (Memoizada para rendimiento)
  const presupuestosFiltrados = useMemo(() => {
    const query = filter.toLowerCase().trim()
    const filtrados = presupuestosStore.filter(
      (p) =>
        p.cliente.toLowerCase().includes(query) ||
        p.id.toLowerCase().includes(query),
    )
    // Invertimos para que el más nuevo (ID más alto) aparezca primero
    return [...filtrados].reverse()
  }, [presupuestosStore, filter])

  // Simulación de carga inicial
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  // Componente de Skeleton para reutilizar
  const SkeletonCard = () => (
    <div className='flex flex-col md:flex-row items-center gap-6 p-3 pr-6 bg-zinc-900/40 border border-white/5 rounded-3xl w-full'>
      <Skeleton className='rounded-2xl w-52 h-18 bg-zinc-800' />
      <div className='grow grid grid-cols-1 md:grid-cols-3 gap-6 w-full'>
        <Skeleton className='rounded-xl h-12 bg-zinc-800' />
        <Skeleton className='rounded-xl h-12 bg-zinc-800' />
        <Skeleton className='rounded-xl h-12 bg-zinc-800' />
      </div>
      <div className='flex items-center gap-4'>
        <Skeleton className='rounded-full w-10 h-10 bg-zinc-800' />
        <Skeleton className='rounded-xl w-10 h-10 bg-zinc-800' />
      </div>
    </div>
  )

  // Función para abrir el detalle
  const verDetalle = (presupuesto: IPresupuesto) => {
    setPresupuestoSeleccionado(presupuesto)
    onOpen()
  }

  return (
    <DefaultLayout>
      {/* BACKGROUND DECORATION */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none bg-linear-to-b from-zinc-900 via-[#0a0a0f] to-black' />

      <section className='relative max-w-6xl mx-auto px-4 flex flex-col gap-4 font-sans antialiased'>
        {/* HEADER */}
        <header className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-zinc-900/60 p-4 rounded-4xl border border-white/5 backdrop-blur-xl'>
          <div className='flex items-center gap-4'>
            <div className='p-4 bg-linear-to-br from-amber-400 to-amber-600 rounded-2xl text-zinc-950 shadow-[0_0_20px_rgba(245,158,11,0.2)]'>
              <FaHistory size={28} />
            </div>
            <div className='flex flex-col gap-1'>
              <h1 className='text-3xl font-extrabold tracking-tight text-white'>
                LEBAUX{' '}
                <span className='text-amber-500 font-light'>| HISTORIAL</span>
              </h1>
              <p className='text-zinc-500 text-sm font-medium'>
                {presupuestosStore.length} registros encontrados
              </p>
            </div>
          </div>

          <div className='flex items-center gap-3 w-full lg:w-96'>
            <Input
              isClearable
              variant='flat'
              placeholder='Buscar cliente o referencia...'
              value={filter}
              onValueChange={setFilter}
              startContent={
                <HiOutlineSearch className='text-amber-500/70' size={20} />
              }
              classNames={{
                inputWrapper:
                  'bg-black/40 border border-white/10 hover:border-amber-500/50 h-12 rounded-xl transition-all',
              }}
            />
          </div>
        </header>

        {/* LISTADO PRINCIPAL */}
        <ScrollShadow className='h-[60vh] pr-2' hideScrollBar>
          <div className='flex flex-col gap-4'>
            {isLoading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : presupuestosFiltrados.length > 0 ? (
              presupuestosFiltrados.map((item) => (
                <article
                  key={item.id}
                  className='group relative flex flex-col md:flex-row items-center gap-6 p-3 pr-6 bg-zinc-900/40 border border-white/5 hover:bg-white/5 hover:border-amber-500/40 transition-all duration-500 rounded-3xl backdrop-blur-sm'
                >
                  {/* REFERENCIA SECTION */}
                  <div className='flex items-center gap-4 bg-black/40 p-4 rounded-2xl min-w-52 border border-white/5 group-hover:border-amber-500/30 transition-all'>
                    <div className='p-3 bg-amber-500/10 rounded-xl text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all duration-300'>
                      <HiOutlineCalendarDays size={22} />
                    </div>
                    <div className='flex flex-col'>
                      <span className='text-[10px] font-black text-zinc-500 uppercase tracking-widest'>
                        Referencia
                      </span>
                      <span className='text-sm font-bold text-zinc-200 tracking-tight'>
                        {item.id}
                      </span>
                    </div>
                  </div>

                  {/* INFO GRID */}
                  <div className='grow grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {/* CLIENTE */}
                    <div className='flex items-center gap-3'>
                      <div className='p-2.5 rounded-xl bg-white/5 text-zinc-400 group-hover:text-amber-500 transition-colors'>
                        <HiOutlineUser size={18} />
                      </div>
                      <div className='flex flex-col'>
                        <span className='text-[10px] font-bold text-zinc-500 uppercase tracking-widest'>
                          Cliente
                        </span>
                        <span className='text-sm font-semibold text-zinc-100 truncate max-w-[160px]'>
                          {item.cliente}
                        </span>
                      </div>
                    </div>

                    {/* ITEMS */}
                    <div className='flex items-center gap-3'>
                      <div className='p-2.5 rounded-xl bg-white/5 text-zinc-400'>
                        <HiOutlineCube size={18} />
                      </div>
                      <div className='flex flex-col'>
                        <span className='text-[10px] font-bold text-zinc-500 uppercase tracking-widest'>
                          Contenido
                        </span>
                        <span className='text-sm font-semibold text-zinc-300'>
                          {item.items.length}{' '}
                          {item.items.length === 1 ? 'Abertura' : 'Aberturas'}
                        </span>
                      </div>
                    </div>

                    {/* TOTAL */}
                    <div className='flex items-center gap-3 md:justify-end'>
                      <div className='flex flex-col md:items-end'>
                        <span className='text-[10px] font-bold text-amber-500/80 uppercase tracking-widest'>
                          Importe Total
                        </span>
                        <span className='text-xl font-black text-white group-hover:text-amber-400 transition-colors'>
                          ${item.total.toLocaleString('es-AR')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ACCIONES */}
                  <div className='flex items-center gap-4'>
                    <Divider
                      orientation='vertical'
                      className='h-10 bg-white/10'
                    />

                    <Button
                      size='sm'
                      isIconOnly
                      onPress={() => verDetalle(item)}
                      className='hidden sm:flex bg-amber-500 text-zinc-950 font-black rounded-xl hover:scale-105 hover:shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all'
                    >
                      <HiOutlineEye size={20} />
                    </Button>

                    <Dropdown
                      backdrop='transparent'
                      classNames={{
                        content:
                          'bg-zinc-950 border border-white/10 shadow-2xl',
                      }}
                    >
                      <DropdownTrigger>
                        <Button
                          isIconOnly
                          variant='light'
                          className='text-zinc-500 hover:text-white rounded-xl transition-all'
                        >
                          <HiOutlineEllipsisVertical size={24} />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label='Opciones de presupuesto'
                        variant='flat'
                      >
                        {/* Opción Editar */}
                        <DropdownItem
                          key='edit'
                          startContent={<HiOutlinePencilSquare size={18} />}
                          className='text-zinc-300 hover:text-white'
                        >
                          Editar Copia
                        </DropdownItem>

                        {/* Opción Descargar */}
                        <DropdownItem
                          key='download'
                          className='text-amber-500'
                          startContent={
                            <HiOutlineDocumentArrowDown size={18} />
                          }
                          onPress={() =>
                            addToast({
                              title: 'Generando PDF...',
                              description: 'El archivo se descargará en breve.',
                              color: 'warning',
                            })
                          }
                        >
                          Descargar PDF
                        </DropdownItem>

                        {/* Opción Eliminar (Reemplaza a Ver Resumen) */}
                        <DropdownItem
                          key='delete'
                          className='text-red-500 data-[hover=true]:bg-red-500 data-[hover=true]:text-white transition-all duration-200 group'
                          startContent={<HiOutlineTrash size={19} />}
                          description='Esta acción no se puede deshacer'
                          onPress={() => {
                            console.log('Eliminando presupuesto...')
                          }}
                        >
                          Eliminar Presupuesto
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </article>
              ))
            ) : (
              /* EMPTY STATE */
              <div className='flex flex-col items-center justify-center py-24 bg-zinc-900/20 border border-dashed border-white/10 rounded-4xl backdrop-blur-sm'>
                <div className='p-6 bg-zinc-800/50 rounded-full mb-4 text-zinc-600'>
                  <HiOutlineSearch size={40} />
                </div>
                <h3 className='text-white font-bold text-lg'>
                  No se encontraron resultados
                </h3>
                <p className='text-zinc-500 text-sm mt-1'>
                  Intenta con otro nombre o número de referencia.
                </p>
                {filter && (
                  <Button
                    size='sm'
                    variant='light'
                    color='warning'
                    onPress={() => setFilter('')}
                    className='mt-4'
                  >
                    Limpiar filtros
                  </Button>
                )}
              </div>
            )}
          </div>
        </ScrollShadow>

        {/* Modal */}
        <Modal
          isOpen={isOpen}
          onOpenChange={(open) => {
            onOpenChange()
            if (!open)
              setTimeout(
                () => setPresupuestoSeleccionado(INITIAL_PRESUPUESTO),
                300,
              )
          }}
          size='4xl'
          scrollBehavior='inside'
          backdrop='blur'
          classNames={{
            base: 'bg-zinc-900 border border-white/10 shadow-2xl rounded-[1.5rem] ',
            header:
              'border-b border-white/5 bg-zinc-900/50 p-6 rounded-t-[1.5rem]',
            footer:
              'bg-zinc-900/50 p-4 border-t border-white/5 rounded-b-[1.5rem]',
            closeButton:
              'hover:bg-white/10 active:scale-95 transition-transform',
          }}
          radius='lg'
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className='flex justify-between items-center'>
                  <div className='flex flex-col gap-1'>
                    <h2 className='text-xl font-bold tracking-tight text-white uppercase italic'>
                      Detalle Técnico{' '}
                      <span className='text-amber-500 font-light'>
                        | Cotización
                      </span>
                    </h2>
                    <div className='flex gap-3 items-center'>
                      <span className='text-xs font-mono text-zinc-500'>
                        REF:
                      </span>
                      <span className='text-sm font-bold text-amber-500/90'>
                        {presupuestoSeleccionado.id}
                      </span>
                      <Divider
                        orientation='vertical'
                        className='h-4 bg-white/10'
                      />
                      <span className='text-sm text-zinc-400 font-medium italic'>
                        {presupuestoSeleccionado.cliente}
                      </span>
                    </div>
                  </div>
                </ModalHeader>

                <ModalBody className='py-6 px-8'>
                  <div className='flex flex-col gap-6'>
                    {/* Cabecera de Tabla Manual para Mejor Control */}
                    <div className='grid grid-cols-12 gap-4 pb-2 border-b border-white/10 text-[10px] font-black uppercase tracking-widest text-zinc-500'>
                      <div className='col-span-7'>Descripción del Producto</div>
                      <div className='col-span-1 text-center'>Cant.</div>
                      <div className='col-span-2 text-right'>Unitario</div>
                      <div className='col-span-2 text-right'>Subtotal</div>
                    </div>

                    {/* Listado de Items */}
                    <div className='flex flex-col divide-y divide-white/5'>
                      {presupuestoSeleccionado.items.map((item, index) => {
                        // NORMALIZACIÓN: Extraemos los datos según el tipo de interfaz
                        const isCompuesta = esCompuesta(item)

                        const data = {
                          linea: isCompuesta
                            ? 'Abertura Compuesta'
                            : item.linea,
                          nombre: isCompuesta
                            ? item.nombre_compuesta
                            : item.nombre_abertura,
                          descripcion: isCompuesta
                            ? item.descripcion_compuesta
                            : item.descripcion_abertura,
                          precio: isCompuesta
                            ? item.precio_compuesta
                            : item.precio,
                          cantidad: isCompuesta
                            ? item.cantidad_compuesta
                            : item.cantidad,
                          color: isCompuesta
                            ? item.color_compuesta
                            : item.color,
                          img: isCompuesta ? item.img_compuesta : item.img,
                          vidrio: isCompuesta ? '' : item.vidrio,

                          base: isCompuesta
                            ? item.medidas_compuesta.base
                            : item.medidas.base,
                          altura: isCompuesta
                            ? item.medidas_compuesta.altura
                            : item.medidas.altura,
                        }
                        return (
                          <div
                            key={index}
                            className='grid grid-cols-12 gap-4 py-6 group hover:bg-white/1 transition-colors rounded-xl px-2'
                          >
                            {/* Detalles del Producto */}
                            <div className='col-span-7 flex flex-col gap-2'>
                              <span className='font-bold text-zinc-100 text-sm uppercase tracking-tight'>
                                {data.descripcion}
                              </span>

                              {/* Tags Técnicos con tamaños estándar */}
                              <div className='flex flex-wrap gap-2'>
                                <span className='px-2 py-1 rounded bg-cyan-500/10 text-cyan-400 text-xs font-medium border border-cyan-500/20'>
                                  {data.base} x {data.altura} mm
                                </span>
                                <span className='px-2 py-1 rounded bg-zinc-800 text-zinc-400 text-xs border border-white/5'>
                                  Línea: {capitalize(data.linea) || 'Módena'}
                                </span>
                                <span className='px-2 py-1 rounded bg-zinc-800 text-zinc-400 text-xs border border-white/5'>
                                  Color:{' '}
                                  {capitalize(data.color) || 'Negro Aluar'}
                                </span>
                                {!isCompuesta && (
                                  <span className='px-2 py-1 rounded bg-indigo-500/10 text-indigo-300 text-xs border border-indigo-500/20'>
                                    Vidrio: {capitalize(data.vidrio)}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Cantidad */}
                            <div className='col-span-1 flex items-start justify-center pt-1'>
                              <span className='text-sm font-bold text-zinc-300'>
                                {data.cantidad || 1}
                              </span>
                            </div>

                            {/* Precio Unitario */}
                            <div className='col-span-2 flex items-start justify-end pt-1'>
                              <span className='text-sm font-medium text-zinc-500 font-mono'>
                                ${data.precio.toLocaleString('es-AR')}
                              </span>
                            </div>

                            {/* Subtotal Item */}
                            <div className='col-span-2 flex items-start justify-end pt-1'>
                              <span className='text-sm font-bold text-white font-mono'>
                                ${data.precio.toLocaleString('es-AR')}
                              </span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Panel de Resumen Final */}
                  <div className='mt-8 flex flex-col md:flex-row gap-6 items-stretch'>
                    <div className='flex-1 p-4 rounded-xl bg-zinc-950/50 border border-white/5'>
                      <span className='text-[10px] font-black uppercase text-zinc-600 tracking-tighter'>
                        Observaciones
                      </span>
                      <p className='text-sm text-zinc-400 mt-2 leading-relaxed italic'>
                        {presupuestoSeleccionado.observaciones ||
                          'Sin especificaciones adicionales.'}
                      </p>
                    </div>

                    <div className='w-full md:w-80 p-5 rounded-xl bg-linear-to-br from-zinc-800 to-zinc-900 border border-white/10 shadow-xl flex flex-col gap-3'>
                      <div className='flex justify-between items-center text-xs font-medium'>
                        <span className='text-zinc-400 uppercase'>
                          Bonificación
                        </span>
                        <span className='text-emerald-400 font-bold text-xs'>
                          -$
                          {presupuestoSeleccionado.descuento?.toLocaleString(
                            'es-AR',
                          ) || 0}
                        </span>
                      </div>
                      <Divider className='bg-white/5' />
                      <div className='flex flex-col items-end gap-1 mt-2'>
                        <span className='text-[10px] font-black text-amber-500 uppercase tracking-widest'>
                          Total Presupuestado
                        </span>
                        <span className='text-3xl font-black text-white tracking-tighter'>
                          $
                          {presupuestoSeleccionado.total.toLocaleString(
                            'es-AR',
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </ModalBody>

                <ModalFooter className='gap-4'>
                  <Button
                    variant='flat'
                    className='rounded-xl font-bold text-zinc-400 px-6'
                    onPress={onClose}
                  >
                    Cerrar Detalle
                  </Button>
                  <Button
                    className='bg-amber-500 text-zinc-950 font-black rounded-xl px-8 hover:scale-105 transition-transform'
                    startContent={<HiOutlineDocumentArrowDown size={20} />}
                  >
                    DESCARGAR PDF
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </section>
    </DefaultLayout>
  )
}
