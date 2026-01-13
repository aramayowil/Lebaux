import { Image } from '@heroui/react'

const Footer = () => {
  return (
    <footer className='lg:hidden w-full flex items-center justify-center py-2 mt-4 lg:mt-6'>
      <div className='grid grid-cols-3 gap-2 px-4 '>
        <div className='col-span-3 place-items-center'>
          <Image
            src='./images/LEBAUX-LOGO.png'
            alt='Lebaux Logo'
            width={200}
            height={50}
          />
        </div>

        <div className='col-span-3 text-center text-sm text-gray-500'>
          &copy; {new Date().getFullYear()} Lebaux. Todos los derechos
          reservados.
        </div>
      </div>

      {/* <div className='mt-6 text-center text-xs text-gray-500'>
        &copy; {new Date().getFullYear()} Natura. Todos los derechos reservados.
      </div> */}
    </footer>
  )
}

export default Footer
