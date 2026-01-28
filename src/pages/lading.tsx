import {
  Button,
  Image,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Card,
  CardFooter,
  Divider, // Añadido Divider
} from '@heroui/react'
import {
  PiArrowRightBold,
  PiShieldCheckBold,
  PiWindBold,
  PiHouseLineBold,
  PiArrowUpRightBold,
} from 'react-icons/pi'
import { Link as RouterLink } from 'react-router-dom'
import { ThemeSwitch } from '@/components/theme-switch' // Asegúrate de tener esta importación
import img_house_front from '../../public/images/photos/photo-house.jpg'
import img_house_interior from '../../public/images/photos/photo-interior.jpg'
import img_banner from '../../public/images/photos/home_modern-styled-entryway.webp'
import logo from '../../public/images/logos/LEBAUX-LOGO.png'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      navigate('/home', { replace: true })
    }
  }, [navigate])

  return (
    <div className='min-h-screen bg-black text-white font-sans selection:bg-yellow-500/30'>
      {/* NAVBAR MINIMALISTA ACTUALIZADA */}
      <Navbar
        isBlurred={true}
        isBordered
        maxWidth='xl'
        className='bg-black/80 backdrop-blur-md border-zinc-900 fixed top-0'
      >
        <NavbarBrand>
          <Link as={RouterLink} to='/'>
            <Image
              alt='Lebaux Logo'
              className='h-8 md:h-10 w-auto object-contain'
              src={logo}
              radius='none'
            />
          </Link>
        </NavbarBrand>

        <NavbarContent className='hidden sm:flex gap-8' justify='center'>
          <NavbarItem>
            <Link href='#' className='text-zinc-300 text-md hover:text-white'>
              Productos
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href='#' className='text-zinc-300 text-md hover:text-white'>
              Proyectos
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href='#' className='text-zinc-300 text-md hover:text-white'>
              Tecnología
            </Link>
          </NavbarItem>
        </NavbarContent>

        {/* LADO DERECHO: TEMA + DIVISOR + BOTÓN */}
        <NavbarContent justify='end'>
          <NavbarItem className='flex items-center gap-4'>
            {/* Switch de Tema */}
            <ThemeSwitch />

            {/* Barrita separadora */}
            <Divider orientation='vertical' className='h-6 bg-zinc-800' />

            {/* Botón de Ingresar */}
            <Button
              as={RouterLink}
              to='/login'
              variant='flat'
              color='warning'
              size='sm'
              className='rounded-full font-semibold px-6'
            >
              Ingresar
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      {/* HERO SECTION */}
      <section className='relative h-screen flex items-center justify-center overflow-hidden'>
        <div className='absolute inset-0 z-0'>
          <Image
            src={img_banner}
            alt='Tecnología industrial aluminio'
            className='w-full h-full object-cover opacity-30 rounded-none '
          />
          <div className='absolute inset-0 bg-linear-to-b from-black/20 via-black/30 to-black z-10' />
        </div>

        <div className='relative z-20 max-w-5xl px-6 text-center flex flex-col items-center gap-6'>
          <h1 className='text-zinc-300 text-3xl md:text-6xl font-bold mt-6 tracking-tight leading-[1.1] uppercase'>
            Presupuestos de <br />
            <span className='text-yellow-600 italic font-medium'>
              precisión técnica.
            </span>
          </h1>

          <p className='text-white text-lg md:text-xl max-w-3xl text-balance font-light leading-relaxed'>
            La plataforma definitiva para la gestión de carpinterías. Calcula
            despieces, optimiza cortes y genera presupuestos profesionales en
            segundos para sistemas
            <span className='text-white font-semibold italic ml-1 text-lg'>
              Aluar.
            </span>
          </p>

          <div className='flex flex-col sm:flex-row gap-4 mt-4'>
            <Button
              as={Link}
              href='/register'
              size='lg'
              className='bg-yellow-600 text-black font-bold h-14 px-10 rounded-xl hover:bg-yellow-500 transition-transform active:scale-95 shadow-[0_0_20px_rgba(202,138,4,0.3)]'
              endContent={<PiArrowRightBold size={20} />}
            >
              Comenzar ahora
            </Button>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: GRID DE PRODUCTOS (LÍNEAS DE ALUMINIO) */}
      <section className='py-24 px-6 max-w-[1400px] mx-auto'>
        <div className='flex flex-col md:flex-row justify-between items-end mb-12 gap-6'>
          <div className='max-w-xl'>
            <h2 className='text-sm uppercase tracking-[0.3em] text-yellow-600 font-bold mb-4'>
              Sistemas Soportados
            </h2>
            <p className='text-3xl md:text-4xl font-semibold leading-snug'>
              Optimizado para los estándares del mercado argentino.
            </p>
          </div>
          <Link
            href='#'
            className='text-zinc-400 hover:text-white flex items-center gap-2 transition-colors'
          >
            Ver fichas técnicas <PiArrowUpRightBold />
          </Link>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
          <Card
            className='md:col-span-8 h-[450px] bg-zinc-900 border-none'
            radius='lg'
          >
            <Image
              removeWrapper
              alt='Sistema Corredizo'
              className='z-0 w-full h-full object-cover'
              src={img_house_front}
            />
            <CardFooter className='absolute bg-black/40 bottom-0 z-10 border-t border-zinc-800 justify-between py-6'>
              <div>
                <p className='text-white font-bold text-xl uppercase tracking-widest'>
                  Módulo Modena & A30
                </p>
                <p className='text-zinc-300 text-sm font-light'>
                  Cálculo automático de despieces y accesorios.
                </p>
              </div>
              <Button
                className='bg-white text-black font-bold'
                radius='full'
                size='sm'
              >
                Configurar
              </Button>
            </CardFooter>
          </Card>

          <Card
            className='md:col-span-4 h-[450px] bg-zinc-900 border-none'
            radius='lg'
          >
            <Image
              removeWrapper
              alt='Línea Herrero'
              className='z-0 w-full h-full object-cover'
              src={img_house_interior}
            />
            <CardFooter className='absolute bg-black/40 bottom-0 z-10 border-t border-zinc-800 flex-col items-start py-6'>
              <p className='text-white font-bold text-lg uppercase'>
                Línea Herrero
              </p>
              <p className='text-zinc-300 text-xs'>
                Plantillas rápidas para aberturas estándar.
              </p>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* SECCIÓN 3: CARACTERÍSTICAS TÉCNICAS */}
      <section className='bg-zinc-950 py-24 border-y border-zinc-900'>
        <div className='max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16'>
          <div className='group'>
            <div className='w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center mb-6 border border-zinc-800 group-hover:border-yellow-600 transition-colors'>
              <PiShieldCheckBold size={28} className='text-yellow-600' />
            </div>
            <h3 className='text-xl font-bold mb-4 uppercase tracking-tighter'>
              Cálculo de Desperdicio
            </h3>
            <p className='text-zinc-500 leading-relaxed font-light'>
              Optimización de barras de 6 metros para reducir el scrap y
              maximizar tu rentabilidad en cada obra.
            </p>
          </div>

          <div className='group'>
            <div className='w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center mb-6 border border-zinc-800 group-hover:border-yellow-600 transition-colors'>
              <PiWindBold size={28} className='text-yellow-600' />
            </div>
            <h3 className='text-xl font-bold mb-4 uppercase tracking-tighter'>
              Precios en Tiempo Real
            </h3>
            <p className='text-zinc-500 leading-relaxed font-light'>
              Actualiza listas de precios de perfiles y accesorios para mantener
              tus presupuestos siempre competitivos.
            </p>
          </div>

          <div className='group'>
            <div className='w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center mb-6 border border-zinc-800 group-hover:border-yellow-600 transition-colors'>
              <PiHouseLineBold size={28} className='text-yellow-600' />
            </div>
            <h3 className='text-xl font-bold mb-4 uppercase tracking-tighter'>
              Gestión de Obras
            </h3>
            <p className='text-zinc-500 leading-relaxed font-light'>
              Organiza tus proyectos, clientes y estados de fabricación en un
              solo lugar, accesible desde cualquier dispositivo.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className='bg-black pt-20 pb-10 px-6 border-t border-zinc-900'>
        <div className='max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10'>
          <div className='flex flex-col items-center md:items-start gap-4'>
            <p className='font-black text-3xl tracking-tighter'>
              LEBAUX<span className='text-yellow-600'>.</span>
            </p>
            <p className='text-zinc-500 text-sm max-w-xs text-center md:text-left font-light italic'>
              Eficiencia técnica para el carpintero de aluminio moderno.
            </p>
          </div>
          <div className='flex gap-12 text-sm text-zinc-500 uppercase tracking-widest'>
            <Link href='#' className='hover:text-yellow-600'>
              Soporte
            </Link>
            <Link href='#' className='hover:text-yellow-600'>
              Manuales
            </Link>
            <Link
              href='#'
              className='hover:text-yellow-600 font-bold text-white'
            >
              Demo Gratis
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
