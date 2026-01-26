import { NavbarLogin } from '@/components/navbar_login'
import { Footer } from '@/components/Footer'

export default function LayoutLogin({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex flex-col min-h-screen bg-black'>
      <NavbarLogin />
      <main
        className='
        grow w-full mx-auto
        max-w-450 
        px-0 sm:px-4 md:px-6 lg:px-8
        py-0 md:py-4 lg:py-6
      '
      >
        {children}
      </main>
      <Footer />
    </div>
  )
}
