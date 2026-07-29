import { useNavigate } from 'react-router-dom'
import { HiOutlineClock } from 'react-icons/hi'
import DefaultLayout from '@/layouts/default'

export default function OpcionesPage() {
  const navigate = useNavigate()

  return (
    <DefaultLayout>
      <main className='relative w-full min-h-[calc(100vh-140px)] flex flex-col items-center justify-center px-6 overflow-hidden'>
        {/* ELEMENTOS DE FONDO - LUCES DE NEÓN SUTILES */}
        <div className='absolute top-1/4 -left-20 w-80 h-80 bg-warning/20 dark:bg-warning/10 rounded-full blur-[120px] pointer-events-none' />
        <div className='absolute bottom-1/4 -right-20 w-80 h-80 bg-zinc-400/10 dark:bg-zinc-800/20 rounded-full blur-[120px] pointer-events-none' />

        {/* BIENVENIDA IZQUIERDA */}
        <div className='absolute top-8 left-6 md:left-12 border-l-4 border-warning pl-4 animate-in fade-in slide-in-from-left-4 duration-1000'>
          <p className='text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.3em]'>
            Plataforma
          </p>
          <h2 className='text-2xl font-black text-zinc-800 dark:text-zinc-100 uppercase tracking-tighter'>
            Lebaux
          </h2>
        </div>

        {/* CONTENIDO CENTRAL */}
        <section className='w-full max-w-lg flex flex-col items-center gap-6 relative z-10 text-center'>
          {/* ICONO DE RELOJ ANIMADO */}
          <div className='relative group'>
            <div className='absolute inset-0 bg-warning/20 blur-2xl rounded-full group-hover:bg-warning/40 transition-all duration-700' />
            <div className='relative w-20 h-20 md:w-24 md:h-24 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-4xl flex items-center justify-center shadow-xl mb-4'>
              <HiOutlineClock className='text-4xl md:text-5xl text-warning animate-pulse' />
            </div>
          </div>

          <div className='space-y-3'>
            <h1 className='text-4xl md:text-6xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase italic'>
              Próximamente
            </h1>
            <div className='h-1.5 w-24 bg-warning mx-auto rounded-full' />
            <p className='text-zinc-500 dark:text-zinc-400 text-sm md:text-base font-medium max-w-xs mx-auto leading-relaxed pt-2'>
              Estamos perfeccionando las herramientas de cálculo para tus
              proyectos.
            </p>
          </div>

          {/* BOTÓN DE REGRESO (CON TU ESTILO DISCONTINUO) */}
          <button
            onClick={() => navigate('/')}
            className='group relative w-full max-w-xs h-32 mt-8 flex items-center justify-center transition-all duration-500 active:scale-95'
          >
            <div
              className='absolute inset-0 
              bg-zinc-50/50 dark:bg-zinc-900/40 backdrop-blur-md
              border-2 border-dashed border-zinc-300 dark:border-zinc-800 
              rounded-4xl 
              group-hover:border-warning/50 group-hover:bg-white dark:group-hover:bg-zinc-800/50
              transition-all duration-500 shadow-sm'
            />

            <div className='relative flex flex-col items-center gap-2'>
              <span className='text-lg font-black text-zinc-800 dark:text-zinc-200 uppercase tracking-tighter'>
                Volver al Inicio
              </span>
              <span className='text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest'>
                Regresar al panel
              </span>
            </div>
          </button>
        </section>
      </main>
    </DefaultLayout>
  )
}
