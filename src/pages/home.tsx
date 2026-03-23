import { useNavigate } from 'react-router-dom'
import { HiOutlinePlus } from 'react-icons/hi'
import DefaultLayout from '@/layouts/default'
import { usePresupuestosDB } from '@/hooks/usePresupuestosDB'

export default function Home() {
  const navigate = useNavigate()
  const { createId } = usePresupuestosDB()

  const handleNavigate = async () => {
    const id = await createId()
    navigate(`/obra/${id}`)
  }

  return (
    <DefaultLayout>
      <main className='relative w-full min-h-[calc(100vh-140px)] flex flex-col items-center justify-center px-6 overflow-hidden'>
        {/* DECORACIÓN DE FONDO (Glow sutil) */}
        <div className='absolute -top-24 -left-24 w-96 h-96 bg-warning/10 dark:bg-warning/5 rounded-full blur-[100px] pointer-events-none' />

        {/* BIENVENIDA IZQUIERDA */}
        <div className='absolute top-8 left-6 md:left-12 border-l-4 border-warning pl-4 animate-in fade-in slide-in-from-left-2 duration-700'>
          <p className='text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest'>
            Panel Principal
          </p>
          <h2 className='text-2xl font-black text-zinc-800 dark:text-zinc-100 uppercase tracking-tighter'>
            Lebaux
          </h2>
        </div>

        {/* CONTENIDO CENTRAL */}
        <section className='w-full max-w-sm flex flex-col items-center gap-10 relative z-10'>
          <div className='text-center'>
            <h1 className='text-4xl font-black text-zinc-900 dark:text-white tracking-tight uppercase italic'>
              Presupuestos
            </h1>
            <p className='text-zinc-500 dark:text-zinc-400 text-sm font-medium mt-1'>
              Cotización técnica de aberturas
            </p>
          </div>

          {/* BOTÓN RECTANGULAR REDONDEADO DISCONTINUO */}
          <button
            onClick={handleNavigate}
            className='group relative w-full h-52 flex items-center justify-center transition-all duration-500 active:scale-95'
          >
            {/* El borde discontinuo _ _ _ con esquinas muy redondeadas */}
            <div
              className='absolute inset-0 
              bg-zinc-50/30 dark:bg-zinc-900/40 backdrop-blur-sm
              border-2 border-dashed border-zinc-300 dark:border-zinc-800 
              rounded-[3rem] 
              group-hover:border-warning/50 group-hover:bg-white dark:group-hover:bg-zinc-800/50
              transition-all duration-500 shadow-sm group-hover:shadow-2xl group-hover:shadow-warning/10'
            />

            <div className='relative flex flex-col items-center gap-4'>
              {/* Contenedor del Icono */}
              <div
                className='w-16 h-16 rounded-2xl 
                bg-zinc-100 dark:bg-zinc-800 
                flex items-center justify-center 
                group-hover:rotate-90 transition-all duration-500'
              >
                {/* EL "+" CAMBIA A WARNING EN HOVER */}
                <HiOutlinePlus className='text-3xl text-zinc-400 dark:text-zinc-500 group-hover:text-warning transition-colors duration-500' />
              </div>

              <div className='flex flex-col items-center'>
                <span className='text-2xl font-black text-zinc-800 dark:text-zinc-100 uppercase tracking-tighter'>
                  NUEVA OBRA
                </span>
                <span className='text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mt-1'>
                  Click para comenzar
                </span>
              </div>
            </div>
          </button>
        </section>
      </main>
    </DefaultLayout>
  )
}

// {lastId && (
//             <button
//               onClick={handleContinuarObra}
//               className='group flex items-center gap-4 px-8 py-4 bg-white/50 border border-zinc-200 rounded-2xl hover:border-zinc-400 transition-all duration-300 animate-in fade-in zoom-in duration-700'
//             >
//               <div className='flex flex-col items-start'>
//                 <span className='text-[10px] text-zinc-400 font-black uppercase tracking-widest'>
//                   Obra detectada en curso
//                 </span>
//                 <span className='text-sm font-bold text-zinc-700'>
//                   Continuar con el presupuesto anterior
//                 </span>
//               </div>
//               <div className='w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center group-hover:translate-x-1 transition-transform'>
//                 <HiOutlineArrowRight className='text-white text-sm' />
//               </div>
//             </button>
//           )}
