import { Link } from '@heroui/link'
import { Input } from '@heroui/input'
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@heroui/navbar'
import { ThemeSwitch } from '@/components/theme-switch'
import { Image } from '@heroui/react'
import { HiSearch } from 'react-icons/hi'
import clsx from 'clsx'

// 1. Importamos hooks y componentes de navegación de Vite
import { useLocation, Link as RouterLink } from 'react-router-dom'

export const Navbar = () => {
  // 2. Obtenemos la ruta actual
  const { pathname } = useLocation()

  // 3. Definimos los items para poder usarlos tanto en desktop como en mobile
  const navItems = [
    { label: 'Presupuesto', href: '/' },
    { label: 'Historial', href: '/Historial' },
    { label: 'Línea Modena', href: '/ventanaModena' },
    { label: 'Cálculo DVH', href: '/dvhCalc' },
  ]

  const searchInput = (
    <Input
      aria-label='Buscar'
      classNames={{
        inputWrapper:
          'bg-zinc-900/40 border border-zinc-800/50 group-data-[focus=true]:border-warning/50 h-8',
        input: 'text-[12px] font-sans',
      }}
      placeholder='Buscar...'
      startContent={<HiSearch className='text-zinc-500' size={14} />}
      type='search'
    />
  )

  return (
    <HeroUINavbar
      maxWidth='full'
      position='sticky'
      className='bg-black/70 backdrop-blur-xl border-b border-zinc-800/40 h-18'
    >
      <div className='flex w-full max-w-450 mx-auto items-center px-4 md:px-8'>
        {/* Logo */}
        <NavbarBrand className='max-w-fit mr-12'>
          <Link as={RouterLink} href='/'>
            <Image
              alt='Lebaux Logo'
              className='h-8 md:h-10 w-auto object-contain'
              src='./images/LEBAUX-LOGO.png'
              radius='none'
            />
          </Link>
        </NavbarBrand>

        {/* Navegación Desktop */}
        <NavbarContent className='hidden lg:flex gap-4' justify='start'>
          {navItems.map((item) => {
            // 4. Lógica de resaltado dinámico
            const isActive = pathname === item.href

            return (
              <NavbarItem key={item.href} isActive={isActive}>
                <Link
                  as={RouterLink} // Importante para que no recargue la página
                  href={item.href}
                  className={clsx(
                    'text-xs uppercase tracking-widest font-bold transition-colors ',
                    isActive
                      ? 'text-warning' // Color si estás en la página
                      : 'text-zinc-250 hover:text-zinc-200', // Color si no estás
                  )}
                >
                  {item.label}
                </Link>
              </NavbarItem>
            )
          })}
        </NavbarContent>

        {/* Lado Derecho */}
        <NavbarContent className='flex gap-4' justify='end'>
          <NavbarItem className='hidden md:flex w-48 xl:w-64'>
            {searchInput}
          </NavbarItem>
          <NavbarItem className='flex items-center'>
            <ThemeSwitch />
          </NavbarItem>
          <NavbarMenuToggle className='lg:hidden text-zinc-400' />
        </NavbarContent>
      </div>

      {/* Menú Móvil Resaltado */}
      <NavbarMenu className='bg-black/95 pt-8 gap-4'>
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <NavbarMenuItem key={item.href}>
              <Link
                as={RouterLink}
                href={item.href}
                className={clsx(
                  'text-lg font-bold uppercase tracking-widest font-sans',
                  isActive ? 'text-warning' : 'text-zinc-400',
                )}
                size='lg'
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          )
        })}
      </NavbarMenu>
    </HeroUINavbar>
  )
}
