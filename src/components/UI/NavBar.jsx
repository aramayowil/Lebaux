import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from '@heroui/react'

export default function NavBar() {
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <img src="./img/LEBAUX-LOGO.png" alt="logo" className="w-21 h-10" />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem color="foreground">
          <Link color="warning" aria-current="page" href="#">
            Presupuesto
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Configuración
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Historial
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#" color="warning">
            Login
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="warning" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
