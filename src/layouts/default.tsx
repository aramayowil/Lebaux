import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/navbar'

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // min-h-screen para asegurar que el footer siempre esté al fondo
    <div className='flex flex-col min-h-screen bg-black'>
      <Navbar />
      <main
        className='
        grow w-full mx-auto
        max-w-450 
        px-0 sm:px-4 md:px-6 lg:px-8
        py-4 md:py-4 lg:py-6
      '
      >
        {children}
      </main>
      <Footer />
    </div>
  )
}
