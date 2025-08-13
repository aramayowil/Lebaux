import { Navbar } from '@/components/navbar'
import Footer from '@/components/footer'

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='grid min-h-dvh grid-rows-[auto_1fr_auto]'>
      <Navbar />
      <main className='container mx-auto max-w-7xl flex-grow px-0 pt-0 md:pt-4 md:px-4 lg:pt-6 lg:px-6'>
        {children}
      </main>
      <Footer />
    </div>
  )
}
