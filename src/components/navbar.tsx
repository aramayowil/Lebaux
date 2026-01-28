import { Link } from '@heroui/link'
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
} from '@heroui/navbar'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Image,
  Button,
} from '@heroui/react'
import { ThemeSwitch } from '@/components/theme-switch'
import { HiOutlineCog, HiOutlineLogout } from 'react-icons/hi'
import { IoPersonSharp } from 'react-icons/io5'
import clsx from 'clsx'
import logo from '../../public/images/logos/LEBAUX-LOGO.png'
import { useLocation, Link as RouterLink, useNavigate } from 'react-router-dom'
import { useTheme } from '@heroui/use-theme'
import { FiMoon, FiSun } from 'react-icons/fi'

export const Navbar = () => {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'
  const { pathname } = useLocation()
  const isLoggedIn = true
  const navigate = useNavigate()

  const handleThemeChange = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const navItems = [
    { label: 'Presupuesto', href: '/home' },
    { label: 'Historial', href: '/Historial' },
    { label: 'Línea Modena', href: '/ventanaModena' },
    { label: 'Cálculo DVH', href: '/dvhCalc' },
  ]

  return (
    <HeroUINavbar
      maxWidth='full'
      position='sticky'
      className='bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 h-20 font-sans'
    >
      <div className='flex w-full max-w-[1280px] mx-auto items-center px-4'>
        {/* Logo */}
        <NavbarBrand className='max-w-fit mr-10'>
          <Link as={RouterLink} to='/'>
            <Image
              alt='Lebaux Logo'
              className='h-10 w-auto object-contain'
              src={logo}
              radius='none'
            />
          </Link>
        </NavbarBrand>

        {/* Navegación Desktop */}
        <NavbarContent className='hidden lg:flex gap-10' justify='start'>
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <NavbarItem key={item.href}>
                <Link
                  as={RouterLink}
                  to={item.href}
                  className={clsx(
                    'text-base font-medium transition-all duration-300',
                    isActive
                      ? 'text-yellow-600 dark:text-warning font-semibold'
                      : 'text-zinc-500 dark:text-zinc-400 hover:text-yellow-600 dark:hover:text-warning',
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
          <div className='flex items-center gap-2'>
            <NavbarItem className='flex items-center ml-2'>
              {isLoggedIn ? (
                <Dropdown
                  placement='bottom-end'
                  classNames={{
                    content:
                      'bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-2 min-w-[240px]',
                  }}
                >
                  <DropdownTrigger>
                    <Avatar
                      isBordered
                      as='button'
                      className='transition-transform w-10 h-10 border-zinc-200 dark:border-zinc-800'
                      color='warning'
                      src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
                    />
                  </DropdownTrigger>
                  <DropdownMenu
                    key='profile_menu'
                    aria-label='Acciones de perfil'
                    variant='flat'
                    itemClasses={{
                      base: 'rounded-xl px-4 py-3 gap-3',
                      title: 'text-sm font-medium',
                    }}
                  >
                    {/* Header de Usuario */}
                    <DropdownItem
                      key='profile_header'
                      textValue='Perfil de usuario'
                      className='h-14 border border-zinc-100 dark:border-zinc-900 mb-2 pointer-events-none'
                    >
                      <p className='text-[10px] text-zinc-400 uppercase tracking-tight'>
                        Usuario
                      </p>
                      <p className='text-sm font-semibold text-zinc-900 dark:text-white'>
                        admin@lebaux.com
                      </p>
                    </DropdownItem>

                    <DropdownItem
                      key='profile'
                      startContent={
                        <IoPersonSharp size={18} className='text-zinc-500' />
                      }
                    >
                      Mi Perfil
                    </DropdownItem>

                    <DropdownItem
                      key='settings'
                      startContent={
                        <HiOutlineCog size={20} className='text-zinc-500' />
                      }
                    >
                      Configuración
                    </DropdownItem>

                    {/* INTERRUPTOR DE TEMA DENTRO DEL DROPDOWN */}
                    <DropdownItem
                      key='theme'
                      closeOnSelect={false}
                      onPress={handleThemeChange} // Ahora toda la fila detecta el clic
                      startContent={
                        isDark ? (
                          <FiMoon size={21} className='text-zinc-500' />
                        ) : (
                          <FiSun size={21} className='text-zinc-500' />
                        )
                      }
                      classNames={{
                        base: 'transition-colors duration-200',
                      }}
                    >
                      {/* Texto dinámico que cambia con el estado */}
                      {isDark ? 'Modo Oscuro' : 'Modo Claro'}
                    </DropdownItem>

                    <DropdownItem
                      key='logout'
                      color='danger'
                      className='text-danger border-t border-zinc-100 dark:border-zinc-900 mt-2 pt-4'
                      startContent={<HiOutlineLogout size={20} />}
                      onPress={handleLogout}
                    >
                      Cerrar sesión
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <div className='flex items-center gap-4'>
                  <ThemeSwitch />{' '}
                  {/* Mostrar fuera solo si no está logueado, opcional */}
                  <Button
                    as={RouterLink}
                    to='/login'
                    color='warning'
                    variant='flat'
                    className='rounded-full font-semibold text-sm px-6'
                  >
                    Ingresar
                  </Button>
                </div>
              )}
            </NavbarItem>
          </div>

          <NavbarMenuToggle className='lg:hidden text-zinc-500 ml-2' />
        </NavbarContent>
      </div>
    </HeroUINavbar>
  )
}
