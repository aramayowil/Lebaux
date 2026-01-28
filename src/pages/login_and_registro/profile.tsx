import LayoutLogin from '@/layouts/layoutLogin'
import {
  Avatar,
  Button,
  Card,
  CardBody,
  Divider,
  Input,
  Tabs,
  Tab,
} from '@heroui/react'
import {
  PiUserBold,
  PiLockKeyBold,
  PiEnvelopeSimpleBold,
  PiSignOutBold,
} from 'react-icons/pi'

const Profile = () => {
  const styleInput = {
    label: 'text-zinc-400 font-medium text-sm',
    inputWrapper: [
      'h-12',
      'bg-[#0A0A0A]',
      'border-zinc-800',
      'data-[focus=true]:border-yellow-600',
      'transition-all',
    ].join(' '),
    input: 'text-white placeholder:text-zinc-700',
  }

  return (
    <LayoutLogin>
      <div className='min-h-screen bg-black text-white p-4 lg:p-8 font-sans'>
        <div className='max-w-4xl mx-auto flex flex-col gap-8'>
          {/* HEADER DEL PERFIL */}
          <header className='flex flex-col sm:flex-row items-center gap-6 bg-[#0A0A0A] p-8 rounded-2xl border border-zinc-900'>
            <Avatar
              src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
              className='w-24 h-24 text-large ring-2 ring-yellow-600 ring-offset-4 ring-offset-black'
            />
            <div className='flex flex-col items-center sm:items-start text-center sm:text-left'>
              <h1 className='text-3xl font-bold tracking-tight'>Juan Pérez</h1>
              <p className='text-zinc-500'>
                Cliente Premium • Miembro desde Enero 2024
              </p>
              <Button
                size='sm'
                variant='flat'
                className='mt-3 bg-yellow-600/10 text-yellow-600 font-semibold'
              >
                Editar Avatar
              </Button>
            </div>
          </header>

          {/* NAVEGACIÓN Y CONTENIDO */}
          <Tabs
            aria-label='Opciones de perfil'
            variant='underlined'
            classNames={{
              tabList:
                'gap-6 w-full relative rounded-none p-0 border-b border-zinc-900',
              cursor: 'w-full bg-yellow-600',
              tab: 'max-w-fit px-0 h-12',
              tabContent:
                'group-data-[selected=true]:text-yellow-600 text-zinc-500 font-medium',
            }}
          >
            <Tab
              key='info'
              title={
                <div className='flex items-center space-x-2'>
                  <PiUserBold size={20} />
                  <span>Información Personal</span>
                </div>
              }
            >
              <Card className='bg-transparent shadow-none border-none mt-4'>
                <CardBody className='p-0 grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <Input
                    label='Nombre completo'
                    defaultValue='Juan Pérez'
                    variant='bordered'
                    labelPlacement='outside'
                    classNames={styleInput}
                  />
                  <Input
                    label='Correo electrónico'
                    defaultValue='juan.perez@ejemplo.com'
                    variant='bordered'
                    labelPlacement='outside'
                    startContent={
                      <PiEnvelopeSimpleBold className='text-zinc-500' />
                    }
                    classNames={styleInput}
                  />
                  <Input
                    label='Teléfono'
                    placeholder='+54 9 11 0000-0000'
                    variant='bordered'
                    labelPlacement='outside'
                    classNames={styleInput}
                  />
                  <div className='flex items-end'>
                    <Button className='w-full bg-yellow-600 text-black font-bold h-12 rounded-lg'>
                      Guardar Cambios
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Tab>

            <Tab
              key='security'
              title={
                <div className='flex items-center space-x-2'>
                  <PiLockKeyBold size={20} />
                  <span>Seguridad</span>
                </div>
              }
            >
              <Card className='bg-transparent shadow-none border-none mt-4'>
                <CardBody className='p-0 flex flex-col gap-6 max-w-md'>
                  <div className='space-y-4'>
                    <h3 className='text-lg font-semibold'>
                      Cambiar contraseña
                    </h3>
                    <Input
                      type='password'
                      label='Contraseña actual'
                      variant='bordered'
                      labelPlacement='outside'
                      classNames={styleInput}
                    />
                    <Input
                      type='password'
                      label='Nueva contraseña'
                      variant='bordered'
                      labelPlacement='outside'
                      classNames={styleInput}
                    />
                    <Button
                      color='warning'
                      variant='flat'
                      className='font-bold'
                    >
                      Actualizar seguridad
                    </Button>
                  </div>

                  <Divider className='my-4 bg-zinc-900' />

                  <div className='p-4 rounded-xl border border-red-900/20 bg-red-900/5'>
                    <h3 className='text-red-500 font-semibold mb-2'>
                      Zona de peligro
                    </h3>
                    <p className='text-zinc-500 text-sm mb-4'>
                      Una vez que elimines tu cuenta, no hay vuelta atrás.
                    </p>
                    <Button
                      color='danger'
                      variant='light'
                      size='sm'
                      className='font-bold'
                    >
                      Eliminar cuenta definitivamente
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>

          {/* BOTÓN DE CERRAR SESIÓN */}
          <footer className='mt-8 pt-8 border-t border-zinc-900 flex justify-center'>
            <Button
              variant='light'
              color='danger'
              startContent={<PiSignOutBold size={20} />}
              className='font-semibold'
            >
              Cerrar sesión en este dispositivo
            </Button>
          </footer>
        </div>
      </div>
    </LayoutLogin>
  )
}

export default Profile
