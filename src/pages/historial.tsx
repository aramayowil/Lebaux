import { useState, useEffect } from 'react'
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
  Skeleton, // Importamos Skeleton
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
import { HiOutlineSearch } from 'react-icons/hi'
import { FaHistory } from 'react-icons/fa'

const historialPresupuestos = [
  {
    id: 'COT-2024-001',
    cliente: 'Juan Pérez',
    fecha: '20 de Marzo, 2024',
    total: 450800,
    items: 5,
  },
  {
    id: 'COT-2024-002',
    cliente: 'Estudio Arquitectos S.A',
    fecha: '18 de Marzo, 2024',
    total: 1200500,
    items: 12,
  },
  {
    id: 'COT-2024-003',
    cliente: 'Marta Gomez',
    fecha: '15 de Marzo, 2024',
    total: 85400,
    items: 2,
  },
]

export default function Historial() {
  //const [filter, setFilter] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Simulación de Fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Componente de Skeleton para reutilizar
  const SkeletonCard = () => (
    <div className='flex flex-col md:flex-row items-center gap-6 p-3 pr-6 bg-zinc-900/40 border border-white/5 rounded-3xl w-full'>
      <Skeleton className='rounded-2xl w-50 h-18 bg-zinc-800' />
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

  return (
    <DefaultLayout>
      <div className='fixed inset-0 overflow-hidden pointer-events-none bg-linear-to-b from-zinc-900 via-[#0a0a0f] to-black' />

      <section className='relative max-w-6xl mx-auto px-6 py-4 flex flex-col gap-8 font-sans antialiased'>
        {/* HEADER */}
        <header className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-zinc-900/60 p-8 rounded-4xl border border-white/5 backdrop-blur-xl'>
          <div className='flex items-center gap-6'>
            <Skeleton isLoaded={!isLoading} className='rounded-2xl'>
              <div className='p-4 bg-linear-to-br from-amber-400 to-amber-600 rounded-2xl text-zinc-950'>
                <FaHistory size={28} />
              </div>
            </Skeleton>
            <div className='flex flex-col gap-1'>
              <h1 className='text-3xl font-extrabold tracking-tight text-white'>
                LEBAUX{' '}
                <span className='text-amber-500 font-light'>| HISTORIAL</span>
              </h1>
              <p className='text-zinc-500 text-sm font-medium'>
                Gestión de historial de cotizaciones
              </p>
            </div>
          </div>

          <div className='flex items-center gap-3 w-full lg:w-auto'>
            <Input
              isClearable
              variant='flat'
              placeholder='Buscar cotización...'
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

        {/* LISTADO CON LOGICA DE CARGA */}
        <ScrollShadow className='h-[65vh] pr-4' hideScrollBar>
          <div className='flex flex-col gap-4'>
            {isLoading ? (
              // Mostramos 3 esqueletos mientras carga
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : (
              // Mapeo real de datos
              historialPresupuestos.map((item) => (
                <article
                  key={item.id}
                  className='group relative flex flex-col md:flex-row items-center gap-6 p-3 pr-6 bg-zinc-900/40 border border-white/5 hover:bg-white/0.03 hover:border-amber-500/40 transition-all duration-500 rounded-3xl backdrop-blur-sm'
                >
                  {/* ID SECTION */}
                  <div className='flex items-center gap-4 bg-black/40 p-4 rounded-2xl min-w-50 border border-white/5 group-hover:border-amber-500/30 transition-all'>
                    <div className='p-3 bg-amber-500/10 rounded-xl text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all duration-300'>
                      <HiOutlineCalendarDays size={22} />
                    </div>
                    <div className='flex flex-col'>
                      <span className='text-[10px] font-black text-zinc-500 uppercase tracking-widest'>
                        Referencia
                      </span>
                      <span className='text-sm font-bold text-zinc-200'>
                        {item.id}
                      </span>
                    </div>
                  </div>

                  {/* INFO GRID */}
                  <div className='grow grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <div className='flex items-center gap-3'>
                      <div className='p-2.5 rounded-xl bg-white/5 text-zinc-400 group-hover:text-amber-500 transition-colors'>
                        <HiOutlineUser size={18} />
                      </div>
                      <div className='flex flex-col'>
                        <span className='text-[10px] font-bold text-zinc-500 uppercase tracking-widest'>
                          Cliente
                        </span>
                        <span className='text-sm font-semibold text-zinc-100'>
                          {item.cliente}
                        </span>
                      </div>
                    </div>

                    <div className='flex items-center gap-3'>
                      <div className='p-2.5 rounded-xl bg-white/5 text-zinc-400'>
                        <HiOutlineCube size={18} />
                      </div>
                      <div className='flex flex-col'>
                        <span className='text-[10px] font-bold text-zinc-500 uppercase tracking-widest'>
                          Volumen
                        </span>
                        <span className='text-sm font-semibold text-zinc-300'>
                          {item.items} Aberturas
                        </span>
                      </div>
                    </div>

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

                  {/* ACCIONES CON DIVIDER REPARADO */}
                  <div className='flex items-center gap-4'>
                    {/* DIVIDER: Agregada altura y color explícito */}
                    <Divider
                      orientation='vertical'
                      className='h-10 bg-white/10'
                    />

                    <Button
                      size='sm'
                      isIconOnly
                      className='hidden sm:flex bg-amber-500 text-zinc-950 font-black rounded-xl hover:scale-105 hover:shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-all'
                    >
                      <HiOutlineEye size={20} />
                    </Button>

                    <Dropdown
                      backdrop='blur'
                      classNames={{
                        content: 'bg-zinc-950 border border-white/10',
                      }}
                    >
                      <DropdownTrigger>
                        <Button
                          isIconOnly
                          variant='light'
                          className='text-zinc-500 hover:text-white rounded-xl'
                        >
                          <HiOutlineEllipsisVertical size={24} />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label='Opciones' variant='flat'>
                        <DropdownItem
                          key='edit'
                          startContent={<HiOutlinePencilSquare size={18} />}
                        >
                          Editar Copia
                        </DropdownItem>
                        <DropdownItem
                          key='download'
                          className='text-amber-500'
                          startContent={
                            <HiOutlineDocumentArrowDown size={18} />
                          }
                          onPress={() =>
                            addToast({
                              title: 'Generando PDF',
                              color: 'warning',
                            })
                          }
                        >
                          Descargar PDF
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </article>
              ))
            )}
          </div>
        </ScrollShadow>
      </section>
    </DefaultLayout>
  )
}
