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
      <div className='w-full h-full flex lg:grid lg:grid-cols-[70vw_1fr] xl:grid-cols-[54vw_1fr] xl:px-14 2xl:grid-cols-[57vw_1fr] flex-col gap-4 lg:gap-8'>
        <div className='w-full h-fit flex flex-col gap-4 mb-8 lg:mb-0'>
          <Productos />
        </div>
        <div className='hidden lg:flex flex-col w-full h-fit gap-4'>
          <ButtonReset />
          <Card />
        </div>
      </div>

      <div className='flex flex-col gap-4 w-full h-fit lg:hidden'>
        {!isLg && <BottomBar />}
      </div>
    </DefaultLayout>
  )
}
