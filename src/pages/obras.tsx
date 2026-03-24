import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom' // Asumiendo que usas react-router
import DefaultLayout from '@/layouts/default'
import {
  Button,
  Input,
  ScrollShadow,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Chip,
  addToast,
  Tooltip,
} from '@heroui/react'
import {
  HiOutlineEye,
  HiOutlinePencilSquare,
  HiOutlineDocumentArrowDown,
  HiOutlineEllipsisVertical,
  HiOutlineCube,
  HiOutlineTag,
  HiOutlineChatBubbleLeftEllipsis,
} from 'react-icons/hi2'
import { HiOutlineSearch, HiOutlineTrash } from 'react-icons/hi'
import { FaHistory } from 'react-icons/fa'

// HOOKS Y STORES
import { usePresupuestosDB } from '@/hooks/usePresupuestosDB'
import { useConfigObraStore } from '@/stores/useConfigObraStore'
import useAberturasStore from '@/stores/useAberturasStore'
import useAberturasCompuestasStore from '@/stores/useAberturasCompustasStore'

// INTERFACES
import IPresupuesto from '@/interfaces/IPresupuesto'
import { IAbertura } from '@/interfaces/IAbertura'
import { IAbertura_Compuesta } from '@/interfaces/IAberturaCompuesta'
import { pdf } from '@react-pdf/renderer'
import PDF from '@/components/PdfLayout'

const esCompuesta = (item: any): item is IAbertura_Compuesta =>
  'configuracion' in item

export default function Obras() {
  const navigate = useNavigate()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { presupuestos, eliminarPresupuesto, actualizarEstado } =
    usePresupuestosDB()

  // Stores para cargar datos al editar
  const setAberturas = useAberturasStore((state) => state.setAberturas)
  const setAberturasComps = useAberturasCompuestasStore(
    (state) => state.setAberturasComps,
  )

  const [selected, setSelected] = useState<IPresupuesto | null>(null)
  const [filter, setFilter] = useState('')

  const filteredData = useMemo(() => {
    const q = filter.toLowerCase()
    return presupuestos.filter(
      (p) =>
        p.cliente.toLowerCase().includes(q) || p.id.toLowerCase().includes(q),
    )
  }, [presupuestos, filter])

  // --- LÓGICA DE ACCIONES ---

  // --- LÓGICA PARA CAMBIAR ESTADO ---
  const handleCambiarEstado = async (p: IPresupuesto) => {
    const nuevoEstado = p.estado === 'pendiente' ? 'aprobado' : 'pendiente'

    try {
      await actualizarEstado(p.id, nuevoEstado)

      addToast({
        title: 'Estado Actualizado',
        description: `El presupuesto ahora está ${nuevoEstado.toUpperCase()}`,
        color: nuevoEstado === 'aprobado' ? 'success' : 'warning',
      })
    } catch (error) {
      addToast({
        title: 'Error',
        description: 'No se pudo cambiar el estado',
        color: 'danger',
      })
    }
  }

  const handleEditar = (p: IPresupuesto) => {
    // 1. Separar ítems
    const simples = p.items.filter((item) => !esCompuesta(item)) as IAbertura[]
    const compuestas = p.items.filter((item) =>
      esCompuesta(item),
    ) as IAbertura_Compuesta[]

    // 2. Cargar en los stores globales
    setAberturas(simples)
    setAberturasComps(compuestas)
    useConfigObraStore.getState().setDatosObra({
      id: p.id,
      cliente: p.cliente,
      observaciones: p.observaciones,
      esEdicion: true,
    })

    // 3. Guardamos en el store de borrador

    navigate(`/obra/${p.id}`, { replace: true })
    addToast({
      title: 'Presupuesto Cargado',
      description: 'Puedes modificar los ítems ahora',
      color: 'success',
    })
  }

  const handleDescargarPdf = async (p: IPresupuesto) => {
    // 1. Separar ítems
    const simples = p.items.filter((item) => !esCompuesta(item)) as IAbertura[]
    const compuestas = p.items.filter((item) =>
      esCompuesta(item),
    ) as IAbertura_Compuesta[]

    // 2. Cargar en los stores globales
    setAberturas(simples)
    setAberturasComps(compuestas)
    useConfigObraStore.getState().setDatosObra({
      id: p.id,
      cliente: p.cliente,
      observaciones: p.observaciones,
      esEdicion: false,
    })

    const blob = await pdf(
      <PDF
        idPresupuesto={p.id}
        aberturas={simples}
        aberturasCompuestas={compuestas}
        detalleCompra={p.detalleCompra}
        nameCliente={p.cliente.trim()}
        observaciones={p.observaciones}
      />,
    ).toBlob()

    console.log('hay un error en la linea 129')
    const url = URL.createObjectURL(blob)
    const enlace = document.createElement('a')
    enlace.href = url
    enlace.download = `${p.id}-${p.cliente.replace(/\s+/g, '_').toUpperCase()}-${p.fecha}.pdf`
    enlace.click()

    // 3. Redirigir al cotizador (ajusta la ruta según tu app)

    addToast({
      title: 'Presupuesto Cargado',
      description: 'Puedes modificar los ítems ahora',
      color: 'success',
    })
  }

  const verDetalle = (p: IPresupuesto) => {
    setSelected(p)
    onOpen()
  }

  return (
    <DefaultLayout>
      <div className='fixed inset-0 overflow-hidden pointer-events-none bg-linear-to-b from-zinc-900 via-[#0a0a0f] to-black' />

      <section className='relative max-w-6xl mx-auto px-4 flex flex-col gap-6 font-sans antialiased pb-20'>
        <header className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-zinc-900/60 p-6 rounded-4xl border border-white/5 backdrop-blur-xl mt-4'>
          <div className='flex items-center gap-4'>
            <div className='p-4 bg-linear-to-br from-amber-400 to-amber-600 rounded-2xl text-zinc-950 shadow-lg'>
              <FaHistory size={28} />
            </div>
            <div>
              <h1 className='text-3xl font-extrabold text-white'>
                OBRAS REALIZADAS
              </h1>
              <p className='text-zinc-500 text-sm'>
                {presupuestos.length} registros encontrados
              </p>
            </div>
          </div>
          <Input
            isClearable
            placeholder='Buscar por nombre o ID...'
            value={filter}
            onValueChange={setFilter}
            className='max-w-xs'
            startContent={<HiOutlineSearch className='text-amber-500' />}
          />
        </header>

        <ScrollShadow className='h-[70vh]'>
          <div className='flex flex-col gap-4'>
            {filteredData.map((p) => (
              <article
                key={p.id}
                className='group bg-zinc-900/40 border border-white/5 p-4 rounded-3xl hover:border-amber-500/50 transition-all'
              >
                <div className='flex flex-col md:flex-row justify-between gap-4'>
                  {/* Izquierda: Info básica */}
                  <div className='flex gap-4'>
                    <div className='hidden sm:flex flex-col items-center justify-center bg-black/40 px-4 rounded-2xl border border-white/5'>
                      <span className='text-[10px] text-zinc-500 font-bold uppercase'>
                        Fecha
                      </span>
                      <span className='text-sm text-zinc-200'>{p.fecha}</span>
                    </div>

                    <div className='flex flex-col justify-center'>
                      <div className='flex items-center gap-2'>
                        <span className='text-amber-500 font-mono font-bold text-xs'>
                          {p.id}
                        </span>

                        <Tooltip
                          content={`Cambiar a ${p.estado === 'pendiente' ? 'Aprobado' : 'Pendiente'}`}
                          delay={500}
                          closeDelay={0}
                          className='text-[10px] font-bold uppercase'
                        >
                          <button
                            onClick={() => handleCambiarEstado(p)}
                            className='transition-transform active:scale-90 outline-none'
                          >
                            <Chip
                              size='sm'
                              variant='dot'
                              // Agregamos cursor pointer y un hover sutil
                              className='cursor-pointer hover:bg-white/10 border-white/5 transition-colors'
                              color={
                                p.estado === 'pendiente' ? 'warning' : 'success'
                              }
                            >
                              <span className='capitalize'>{p.estado}</span>
                            </Chip>
                          </button>
                        </Tooltip>
                      </div>
                      <h3 className='text-lg font-bold text-white uppercase tracking-tighter'>
                        {p.cliente}
                      </h3>
                    </div>
                  </div>

                  {/* Centro: Métricas Rápidas */}
                  <div className='flex flex-wrap items-center gap-6 grow md:justify-center'>
                    <div className='flex flex-col'>
                      <span className='text-[10px] text-zinc-500 font-bold flex items-center gap-1'>
                        <HiOutlineCube /> ÍTEMS
                      </span>
                      <span className='text-zinc-200 font-bold'>
                        {p.items.length} unid.
                      </span>
                    </div>
                    {p.detalleCompra.descuento > 0 && (
                      <div className='flex flex-col'>
                        <span className='text-[10px] text-zinc-500 font-bold flex items-center gap-1'>
                          <HiOutlineTag /> DESC.
                        </span>
                        <span className='text-red-400 font-bold'>
                          $ {p.detalleCompra.descuento}
                        </span>
                      </div>
                    )}
                    <div className='flex flex-col'>
                      <span className='text-[10px] text-amber-500/70 font-bold'>
                        TOTAL FINAL
                      </span>
                      <span className='text-xl font-black text-white'>
                        ${p.detalleCompra.importeFinal.toLocaleString('es-AR')}
                      </span>
                    </div>
                  </div>

                  {/* Derecha: Acciones */}
                  <div className='flex items-center gap-2 self-end md:self-center'>
                    <Button
                      isIconOnly
                      variant='flat'
                      className='bg-white/5 text-zinc-300 hover:bg-amber-500 hover:text-black transition-all'
                      onPress={() => verDetalle(p)}
                    >
                      <HiOutlineEye size={20} />
                    </Button>
                    <Button
                      isIconOnly
                      variant='flat'
                      className='bg-white/5 text-zinc-300 hover:bg-blue-500 hover:text-white transition-all'
                      onPress={() => handleEditar(p)}
                    >
                      <HiOutlinePencilSquare size={20} />
                    </Button>

                    <Dropdown>
                      <DropdownTrigger>
                        <Button isIconOnly variant='light'>
                          <HiOutlineEllipsisVertical size={20} />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu>
                        <DropdownItem
                          key='pdf'
                          startContent={<HiOutlineDocumentArrowDown />}
                          onPress={() => handleDescargarPdf(p)}
                        >
                          Descargar PDF
                        </DropdownItem>

                        <DropdownItem
                          key='del'
                          color='danger'
                          className='text-danger'
                          startContent={<HiOutlineTrash />}
                          onPress={() => eliminarPresupuesto(p.id)}
                        >
                          Eliminar
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>

                {p.observaciones && (
                  <div className='mt-3 pt-3 border-t border-white/5 flex items-start gap-2 text-zinc-500 italic text-xs'>
                    <HiOutlineChatBubbleLeftEllipsis className='mt-0.5' />
                    <p className='truncate'>{p.observaciones}</p>
                  </div>
                )}
              </article>
            ))}
          </div>
        </ScrollShadow>

        {/* MODAL DE DETALLE TÉCNICO */}
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          size='4xl'
          scrollBehavior='inside'
          className='bg-zinc-950 border border-white/10'
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className='flex justify-between items-center border-b border-white/5 p-6'>
                  <div className='flex flex-col'>
                    <h2 className='text-2xl font-black text-white italic'>
                      REVISIÓN DE COTIZACIÓN
                    </h2>
                    <span className='text-amber-500 font-mono'>
                      {selected?.id} | {selected?.cliente}
                    </span>
                  </div>
                </ModalHeader>
                <ModalBody className='p-6'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {/* Columna Info General */}
                    <div className='bg-white/5 p-4 rounded-2xl flex flex-col gap-3'>
                      <h4 className='text-xs font-bold text-zinc-500 uppercase tracking-widest border-b border-white/10 pb-2'>
                        Resumen
                      </h4>
                      <div className='flex justify-between'>
                        <span className='text-zinc-400'>Fecha:</span>
                        <span className='text-zinc-100 font-bold'>
                          {selected?.fecha}
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-zinc-400'>Subtotal:</span>
                        <span className='text-zinc-100'>
                          ${' '}
                          {(
                            selected?.detalleCompra.total || 0
                          ).toLocaleString()}
                        </span>
                      </div>
                      <div className='flex justify-between text-red-400'>
                        <span>Descuento Aplicado:</span>
                        <span>
                          - ${' '}
                          {(
                            selected?.detalleCompra.descuento || 0
                          ).toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <div className='flex justify-between'>
                          <span className='text-zinc-400'>
                            Saldo Pendiente:
                          </span>
                          <span className='text-zinc-100'>
                            ${' '}
                            {(
                              selected?.detalleCompra.saldoPendiente || 0
                            ).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className='flex justify-between text-xl border-t border-white/10 pt-2'>
                        <span className='text-amber-500 font-bold'>TOTAL:</span>
                        <span className='text-white font-black'>
                          $
                          {selected?.detalleCompra.importeFinal.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Columna Observaciones */}
                    <div className='bg-zinc-900/60 p-4 rounded-2xl border border-white/5'>
                      <h4 className='text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2'>
                        Notas del Presupuesto
                      </h4>
                      <p className='text-sm text-zinc-300 leading-relaxed'>
                        {selected?.observaciones ||
                          'Sin observaciones adicionales.'}
                      </p>
                    </div>
                  </div>

                  <h3 className='text-lg font-bold text-white mt-8 mb-4 flex items-center gap-2'>
                    <HiOutlineCube className='text-amber-500' /> Desglose de
                    Productos
                  </h3>

                  <div className='flex flex-col gap-3'>
                    {selected?.items.map((item, i) => {
                      const isC = esCompuesta(item)
                      return (
                        <div
                          key={i}
                          className='bg-white/5 border border-white/5 p-4 rounded-2xl flex justify-between items-center group hover:bg-white/10 transition-colors'
                        >
                          <div className='flex flex-col gap-1'>
                            <span className='text-xs font-black text-amber-500/50 uppercase'>
                              {isC
                                ? 'Estructura Compuesta'
                                : `Línea: ${item.linea}`}
                            </span>
                            <span className='text-white font-bold text-lg'>
                              {isC
                                ? item.nombre_compuesta
                                : item.nombre_abertura}
                            </span>
                            <div className='flex gap-4 text-xs text-zinc-400'>
                              <span>
                                Cantidad: <b>{!isC ? item.cantidad : '-'}</b>
                              </span>
                              <span>
                                Ancho:{' '}
                                <b>{!isC ? item.medidas.base : '-'} mm</b>
                              </span>
                              <span>
                                Alto:{' '}
                                <b>{!isC ? item.medidas.altura : '-'} mm</b>
                              </span>
                              <span>
                                Vidrio: <b>{!isC ? item.vidrio : 'Varios'}</b>
                              </span>
                            </div>
                          </div>
                          <div className='text-right'>
                            <span className='text-2xl font-mono font-bold text-white'>
                              $
                              {(isC
                                ? (item.precio_compuesta +
                                    item.precioColocacion_compuesta) *
                                  item.cantidad_compuesta
                                : item.precioFinal
                              ).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </ModalBody>
                <ModalFooter className='bg-zinc-900/50 border-t border-white/5 p-4'>
                  <Button
                    variant='light'
                    onPress={onClose}
                    className='text-zinc-500 font-bold'
                  >
                    CERRAR VENTANA
                  </Button>
                  <Button
                    className='bg-amber-500 text-black font-black'
                    onPress={() => selected && handleEditar(selected)}
                  >
                    MODIFICAR PRESUPUESTO
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
