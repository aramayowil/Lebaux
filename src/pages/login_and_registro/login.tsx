import { Button, Image, Input, Link } from '@heroui/react'
import LayoutLogin from '@/layouts/layoutLogin'

const imgInterior = '/images/aberturas_interiores/img_interior_login.avif'

const Login = () => {
  const currentYear = new Date().getFullYear()

  return (
    <LayoutLogin>
      <div className='h-full w-full flex bg-black text-white font-sans selection:bg-yellow-500/30 overflow-hidden'>
        {/* SECCIÓN IZQUIERDA: Imagen */}
        <div className='hidden lg:flex w-1/2 relative overflow-hidden'>
          <Image
            src={imgInterior}
            alt='Aberturas Lebaux'
            radius='sm'
            className='w-full h-full object-cover'
          />
        </div>

        {/* SECCIÓN DERECHA: Formulario */}
        <div className='w-full lg:w-1/2 flex flex-col items-center justify-center p-8 lg:p-2 bg-black'>
          <div className='max-w-[400px] w-full flex flex-col items-center gap-8'>
            <div className='w-full mb-2'>
              <h2 className='text-3xl font-semibold tracking-tight text-white dark:text-white'>
                Iniciar sesión
              </h2>
              <p className='text-zinc-500 text-base mt-2'>
                Ingresa al panel técnico de gestión.
              </p>
            </div>

            <form
              className='w-full flex flex-col gap-4'
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                placeholder='Correo electrónico'
                variant='bordered'
                radius='sm'
                size='lg'
                classNames={{
                  inputWrapper:
                    'h-14 border-zinc-800 bg-[#121212] group-data-[focus=true]:border-yellow-600 transition-all',
                  input:
                    'text-base font-normal placeholder:text-zinc-500 text-white',
                }}
              />
              <Input
                type='password'
                placeholder='Contraseña'
                variant='bordered'
                radius='sm'
                size='lg'
                classNames={{
                  inputWrapper:
                    'h-14 border-zinc-800 bg-[#121212] group-data-[focus=true]:border-yellow-600 transition-all',
                  input:
                    'text-base font-normal placeholder:text-zinc-500 text-white',
                }}
              />

              <Button
                color='warning'
                variant='solid'
                type='submit'
                className='w-full font-bold text-lg h-14 rounded-lg mt-4 transition-transform active:scale-95'
              >
                Iniciar sesión
              </Button>

              <Link
                href='#'
                className='text-sm text-zinc-500 self-center mt-2 font-normal hover:text-yellow-500 transition-colors'
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </form>

            <div className='w-full border border-zinc-900 py-6 px-6 text-center mt-4 rounded-sm'>
              <p className='text-base text-zinc-300'>
                ¿No tienes una cuenta?
                <Link
                  href='/register'
                  className='text-yellow-600 font-semibold text-base ml-1 hover:text-yellow-500'
                >
                  Regístrate
                </Link>
              </p>
            </div>

            <footer className='mt-12 flex flex-col items-center gap-2'>
              <img
                src='./images/LEBAUX-LOGO.png'
                alt='Logo Lebaux'
                className='h-10 w-auto opacity-90 brightness-110'
              />
              <p className='text-xs font-medium text-zinc-400 tracking-widest uppercase'>
                © {currentYear}{' '}
                <span className='text-zinc-400'>Aberturas Lebaux</span>
              </p>
            </footer>
          </div>
        </div>
      </div>
    </LayoutLogin>
  )
}

export default Login
