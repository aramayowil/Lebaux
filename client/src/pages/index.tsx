import Card from '@/components/ui/cardsProductos/checkout'
import Productos from '@/components/Productos'
import { BottomBar } from '@/components/BottomBar'
import DefaultLayout from '@/layouts/default'
import ButtonReset from '@/components/ui/modals/ButtonReset'
import useBreakpoint from '@/config/breakpoints'

export default function IndexPage() {
  const { isLg } = useBreakpoint()

  return (
    <DefaultLayout>
      {/* Contenedor Principal con Grid mejorado */}
      <div className='relative w-full flex flex-col lg:grid lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_350px] gap-8 xl:px-5 2xl:px-20'>
        {/* Columna de Productos (Izquierda) */}
        <main className='w-full flex flex-col gap-6'>
          <Productos />
        </main>

        {/* Columna de Resumen (Derecha) - Sticky para que no se pierda al scrollear */}
        <aside className='hidden lg:flex flex-col gap-4 sticky top-24 h-fit'>
          <div className='flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-500'>
            <ButtonReset />
            <Card />

            {/* Opcional: Un pequeño texto informativo debajo del resumen */}
            <p className='px-4 text-[10px] text-zinc-500 uppercase tracking-widest leading-relaxed'>
              Los precios están sujetos a cambios según la configuración de
              accesorios.
            </p>
          </div>
        </aside>
      </div>

      {/* Navegación Móvil */}
      <div className='lg:hidden'>{!isLg && <BottomBar />}</div>
    </DefaultLayout>
  )
}
