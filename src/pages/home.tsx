import { useNavigate } from 'react-router-dom'
import { HiOutlinePlus, HiOutlineArrowRight } from 'react-icons/hi'
import DefaultLayout from '@/layouts/default'
import { usePresupuestosDB } from '@/hooks/usePresupuestosDB'
import useAberturasStore from '@/stores/useAberturasStore'
import useBorradorObraStore from '@/stores/useBorradorObraStore'
import useAberturasCompuestasStore from '@/stores/useAberturasCompustasStore'
import { useConfigObraStore } from '@/stores/useConfigObraStore'

export default function Home() {
  const navigate = useNavigate()
  const { createId } = usePresupuestosDB()

  const aberturasCargadas = useBorradorObraStore((state) => state.aberturas)
  const aberturasCompsCargadas = useBorradorObraStore(
    (state) => state.aberturasComps,
  )

  const hayObraEnCurso =
    aberturasCargadas.length > 0 || aberturasCompsCargadas.length > 0

  const handleNuevaObra = async () => {
    const id = await createId()
    // Limpieza total para nueva obra
    localStorage.clear()
    localStorage.setItem('heroui-theme', 'dark')
    useAberturasStore.getState().setAberturas([])
    useAberturasCompuestasStore.getState().setAberturasComps([])
    useConfigObraStore.getState().setDatosObra({
      id: '',
      cliente: '',
      observaciones: '',
      esEdicion: false,
    })
    navigate(`/obra/${id}`)
  }

  const handleContinuarObra = async () => {
    const id = await createId()
    // Si ya tenemos un ID, navegamos a ese, sino generamos uno (por si solo había ítems en el store)

    //cargo los datos del store
    useAberturasStore.getState().setAberturas(aberturasCargadas)
    useAberturasCompuestasStore
      .getState()
      .setAberturasComps(aberturasCompsCargadas)

    useConfigObraStore.getState().setDatosObra({
      id: id,
      cliente: '',
      observaciones: '',
      esEdicion: false,
    })

    navigate(`/obra/${id}`)
  }

  return (
    <DefaultLayout>
      <main className='relative w-full min-h-[calc(100vh-140px)] flex flex-col items-center justify-center px-6 overflow-hidden'>
        <section className='w-full max-w-sm flex flex-col items-center gap-6 relative z-10'>
          <div className='text-center mb-4'>
            <h1 className='text-4xl font-black text-zinc-900 dark:text-white tracking-tight uppercase italic leading-none'>
              Presupuestos
            </h1>
            <p className='text-zinc-500 dark:text-zinc-400 text-sm font-medium mt-2'>
              Cotización técnica de aberturas
            </p>
          </div>

          {/* BOTÓN NUEVA OBRA */}
          <button
            onClick={handleNuevaObra}
            className='group relative w-full h-52 flex items-center justify-center transition-all duration-500 active:scale-95'
          >
            <div className='absolute inset-0 bg-zinc-50/30 dark:bg-zinc-900/40 backdrop-blur-sm border-2 border-dashed border-zinc-300 dark:border-zinc-800 rounded-[3rem] group-hover:border-warning/50 group-hover:bg-white dark:group-hover:bg-zinc-800/50 transition-all duration-500 shadow-sm group-hover:shadow-2xl group-hover:shadow-warning/10' />

            <div className='relative flex flex-col items-center gap-4'>
              <div className='w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:rotate-90 transition-all duration-500'>
                <HiOutlinePlus className='text-3xl text-zinc-400 dark:text-zinc-500 group-hover:text-warning transition-colors duration-500' />
              </div>
              <div className='flex flex-col items-center'>
                <span className='text-2xl font-black text-zinc-800 dark:text-zinc-100 uppercase tracking-tighter'>
                  NUEVA OBRA
                </span>
                <span className='text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mt-1'>
                  Click para comenzar de cero
                </span>
              </div>
            </div>
          </button>

          {/* BOTÓN CONTINUAR (Condicional) */}
          {hayObraEnCurso && (
            <button
              onClick={handleContinuarObra}
              className='group w-full flex items-center justify-between gap-4 p-5 bg-white/50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-3xl hover:border-warning/40 transition-all animate-in fade-in slide-in-from-bottom-4 duration-700'
            >
              <div className='flex flex-col items-start'>
                <span className='text-[10px] text-amber-500 font-black uppercase tracking-[0.2em]'>
                  Obra detectada en curso
                </span>
                <span className='text-sm font-bold text-zinc-700 dark:text-zinc-200'>
                  Retomar borrador anterior
                </span>
              </div>
              <div className='w-10 h-10 rounded-xl bg-zinc-900 dark:bg-warning flex items-center justify-center group-hover:translate-x-1 transition-transform'>
                <HiOutlineArrowRight className='text-white dark:text-black text-lg' />
              </div>
            </button>
          )}
        </section>
      </main>
    </DefaultLayout>
  )
}
