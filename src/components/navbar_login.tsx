import { Link } from '@heroui/link'
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@heroui/navbar'
import { ThemeSwitch } from '@/components/theme-switch'
import { Image } from '@heroui/react'
import { Link as RouterLink } from 'react-router-dom'

export const NavbarLogin = () => {
  return (
    <HeroUINavbar
      isBlurred={false}
      maxWidth='full'
      position='sticky'
      shouldHideOnScroll
      className='bg-black/97 border-b border-zinc-800/50'
    >
      <div className='flex w-full max-w-[1200px] mx-auto items-center px-2'>
        {/* LOGO A LA IZQUIERDA */}
        <NavbarBrand className='justify-start'>
          <Link as={RouterLink} to='/'>
            <Image
              alt='Lebaux Logo'
              className='h-8 md:h-10 w-auto object-contain'
              src='./images/LEBAUX-LOGO.png'
              radius='none'
            />
          </Link>
        </NavbarBrand>

        {/* CONTENIDO DERECHO */}
        <NavbarContent justify='end'>
          <NavbarItem className='flex items-center gap-4'>
            <ThemeSwitch />
          </NavbarItem>
        </NavbarContent>
      </div>
    </HeroUINavbar>
  )
}
