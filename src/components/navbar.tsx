import { Kbd } from '@heroui/kbd'
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
import { link as linkStyles } from '@heroui/theme'
import clsx from 'clsx'
import { siteConfig } from '@/config/site'
import { ThemeSwitch } from '@/components/theme-switch'
import { Image } from '@heroui/react'
import { FcSearch } from 'react-icons/fc'

export const Navbar = () => {
  const searchInput = (
    <Input
      aria-label='Search'
      classNames={{
        inputWrapper: 'bg-default-100',
        input: 'text-sm',
      }}
      endContent={
        <Kbd className='hidden lg:inline-block' keys={['command']}>
          K
        </Kbd>
      }
      labelPlacement='outside'
      placeholder='Search...'
      startContent={
        <FcSearch className='text-base text-default-400 pointer-events-none shrink-0' />
      }
      type='search'
    />
  )

  return (
    <HeroUINavbar maxWidth='xl' position='sticky' isBordered isBlurred={false}>
      {/* <NavbarBrand className='gap-3 max-w-fit'> */}
      <NavbarBrand className='gap-3'>
        <Image
          alt='Lebaux Logo'
          className='h-8 min-w-30 w-auto'
          src='./images/LEBAUX-LOGO.png'
        />
      </NavbarBrand>
      <NavbarContent className='basis-1/5 sm:basis-full' justify='start'>
        <div className='hidden lg:flex gap-4 justify-start ml-2'>
          <NavbarItem isActive>
            <Link
              className={clsx(
                linkStyles({ color: 'warning' }),
                'data-[active=true]:text-primary data-[active=true]:font-medium font-semibold',
              )}
              color='warning'
              href='/'
            >
              Presupuesto
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              className={clsx(
                linkStyles({ color: 'foreground' }),
                'data-[active=true]:text-primary data-[active=true]:font-medium',
              )}
              color='foreground'
              href='/ventanaModena'
            >
              Ventanas
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              className={clsx(
                linkStyles({ color: 'foreground' }),
                'data-[active=true]:text-primary data-[active=true]:font-medium',
              )}
              color='foreground'
              href='/dvhCalc'
            >
              CALC DVH
            </Link>
          </NavbarItem>
          <Link
            className={clsx(
              linkStyles({ color: 'foreground' }),
              'data-[active=true]:text-primary data-[active=true]:font-medium',
            )}
            color='foreground'
            href='/presupuesto'
          >
            Presupuesto
          </Link>
        </div>
      </NavbarContent>

      <NavbarContent
        className='hidden sm:flex basis-1/5 sm:basis-full'
        justify='end'
      >
        <NavbarItem className='hidden sm:flex gap-2'>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className='sm:hidden basis-1 pl-4' justify='end'>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className='mx-4 mt-2 flex flex-col gap-2'>
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? 'primary'
                    : index === siteConfig.navMenuItems.length - 1
                      ? 'danger'
                      : 'foreground'
                }
                href='#'
                size='lg'
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  )
}
