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
  Image,
  User,
} from '@heroui/react'
import { HiOutlineCog, HiOutlineLogout } from 'react-icons/hi'
import { IoPersonSharp } from 'react-icons/io5'
import clsx from 'clsx'
import logo from '../../public/images/logos/LEBAUX-LOGO.png'
import { useLocation, Link as RouterLink, useNavigate } from 'react-router-dom'
import { useTheme } from '@heroui/use-theme'
import { FiMoon, FiSun } from 'react-icons/fi'
import { IUser } from '@/interfaces/IUser'
import capitalize from '@/utils/capitalize_text'

export const Navbar = () => {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const user: IUser = JSON.parse(localStorage.getItem('user') || '{}')

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
              <Dropdown
                placement='bottom-end'
                classNames={{
                  content:
                    'bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-2 min-w-[240px]',
                }}
              >
                <DropdownTrigger>
                  <User
                    as='button'
                    avatarProps={{
                      showFallback: true,
                      name: capitalize(user.nombre),
                      src: `${user.photo_profile}`,
                    }}
                    className='transition-transform'
                    description={`${capitalize(user.role || 'Cliente')}`}
                    name={capitalize(user.nombre)}
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
                      {user.email}
                    </p>
                  </DropdownItem>

                  <DropdownItem
                    key='profile'
                    startContent={
                      <IoPersonSharp size={18} className='text-zinc-500' />
                    }
                    onPress={() => navigate('/profile')}
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
            </NavbarItem>
          </div>

          <NavbarMenuToggle className='lg:hidden text-zinc-500 ml-2' />
        </NavbarContent>
      </div>
    </HeroUINavbar>
  )
}
