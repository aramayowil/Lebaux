import { UserResponse } from '@/interfaces/IResponse.api'
import DefaultLayout from '@/layouts/default'
import capitalize from '@/utils/capitalize_text'
import {
  Avatar,
  Button,
  Card,
  CardBody,
  Input,
  Tabs,
  Tab,
  Chip,
  Divider,
} from '@heroui/react'
import { useEffect } from 'react'
import {
  PiUserBold,
  PiLockKeyBold,
  PiEnvelopeSimpleBold,
  PiPencilSimpleFill,
} from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate()
  const userString = localStorage.getItem('user')

  if (!userString) {
    navigate('/login')
    return null
  }
  const user = JSON.parse(userString) as UserResponse

  // ESTILO IMPORTADO DE REGISTER (Sin tracking, font-sans)
  const styleInput = {
    label: 'text-zinc-300 font-medium text-sm font-sans',
    inputWrapper: [
      'h-14',
      'bg-[#0A0A0A]',
      'border-zinc-800',
      'transition-all duration-200',
      'data-[focus=true]:ring-0',
    ].join(' '),
    input: 'text-base font-sans placeholder:text-zinc-700 text-white',
  }

  useEffect(() => {
    if (!user) navigate('/login')
  }, [navigate, user])

  return (
    <DefaultLayout>
      <div className='min-h-screen bg-[#050505] text-white p-6 lg:p-8 font-sans selection:bg-yellow-500/30'>
        <div className='max-w-4xl mx-auto space-y-12'>
          {/* HEADER SECCIÓN */}
          <header className='flex flex-col md:flex-row items-center gap-10 bg-[#0A0A0A] p-8 rounded-[2.5rem] border border-zinc-900'>
            <div className='relative'>
              <div className='p-1.5 bg-zinc-800/30 rounded-full border border-zinc-800'>
                <Avatar
                  src={user.photo_profile}
                  className='w-32 h-32 md:w-44 md:h-44'
                  isBordered
                  color='warning'
                />
              </div>
              <Button
                isIconOnly
                radius='full'
                className='absolute bottom-1 right-1 bg-yellow-600 text-black w-12 h-12 min-w-12 border-[5px] border-[#0A0A0A] hover:scale-110 active:scale-90 transition-all shadow-none z-10'
                onPress={() => navigate('/profile/settings-avatar')}
              >
                <PiPencilSimpleFill size={20} />
              </Button>
            </div>

            <div className='flex-1 text-center md:text-left space-y-4'>
              <div className='space-y-1'>
                <h1 className='text-3xl md:text-4xl font-black tracking-tighter text-white'>
                  {user.apellido.toUpperCase()},{' '}
                  {user.nombre.toUpperCase().split(' ')[0]}
                </h1>
              </div>

              <div className='flex flex-wrap justify-center md:justify-start gap-3'>
                <Chip
                  variant='flat'
                  color='warning'
                  className='text-[10px] font-black uppercase px-4 h-8 rounded-full'
                >
                  {user.role}
                </Chip>
                <div className='flex items-center gap-2 px-4 py-1.5 bg-zinc-900/50 rounded-full border border-zinc-800'>
                  <PiEnvelopeSimpleBold className='text-yellow-600' size={14} />
                  <span className='text-[11px] font-bold uppercase text-zinc-400'>
                    {user.email}
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* CUERPO TABS */}
          <Card className='bg-[#0A0A0A] border border-zinc-900 rounded-4xl shadow-none overflow-hidden'>
            <CardBody className='p-0'>
              <Tabs
                aria-label='Configuración'
                variant='underlined'
                disableAnimation
                classNames={{
                  tabList: 'px-10 pt-8 gap-10 border-b border-zinc-900/50',
                  cursor: 'bg-yellow-600 h-[3px] rounded-full',
                  tab: 'h-12 px-0',
                  tabContent:
                    'group-data-[selected=true]:text-yellow-600 text-zinc-500 font-black uppercase text-[11px] transition-all',
                }}
              >
                <Tab
                  key='personal'
                  title={
                    <div className='flex items-center gap-2'>
                      <PiUserBold size={18} />
                      <span>Información</span>
                    </div>
                  }
                >
                  <div className='p-10 md:p-14 space-y-10'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <Input
                        label='Nombre'
                        defaultValue={capitalize(user.nombre)}
                        variant='bordered'
                        labelPlacement='outside'
                        radius='sm'
                        size='lg'
                        classNames={styleInput}
                      />
                      <Input
                        label='Apellido'
                        defaultValue={capitalize(user.apellido)}
                        variant='bordered'
                        labelPlacement='outside'
                        radius='sm'
                        size='lg'
                        classNames={styleInput}
                      />
                    </div>
                    <div className='flex justify-end'>
                      <Button className='bg-yellow-600 text-black font-bold px-12 h-14 rounded-xl text-sm transition-all shadow-none hover:bg-yellow-500'>
                        Guardar Cambios
                      </Button>
                    </div>
                  </div>
                </Tab>

                <Tab
                  key='security'
                  title={
                    <div className='flex items-center gap-2'>
                      <PiLockKeyBold size={18} />
                      <span>Seguridad</span>
                    </div>
                  }
                >
                  <div className='p-10 md:p-14 space-y-10'>
                    <div className='max-w-md space-y-6'>
                      <Input
                        type='password'
                        label='Contraseña Actual'
                        variant='bordered'
                        labelPlacement='outside'
                        placeholder='********'
                        radius='sm'
                        size='lg'
                        classNames={styleInput}
                      />
                      <Input
                        type='password'
                        label='Nueva Contraseña'
                        variant='bordered'
                        labelPlacement='outside'
                        placeholder='********'
                        radius='sm'
                        size='lg'
                        classNames={styleInput}
                      />
                      <Button className='bg-zinc-100 text-black font-bold px-12 h-14 rounded-xl text-sm transition-all shadow-none hover:bg-white'>
                        Actualizar Acceso
                      </Button>
                    </div>

                    <Divider className='bg-zinc-900' />

                    <div className='p-8 rounded-2xl bg-red-950/10 border border-red-900/20 flex flex-col md:flex-row items-center justify-between gap-6'>
                      <div>
                        <p className='text-red-500 font-black text-[10px] uppercase mb-1'>
                          Zona de Peligro
                        </p>
                        <p className='text-zinc-500 text-xs'>
                          Eliminar cuenta permanentemente
                        </p>
                      </div>
                      <Button
                        variant='light'
                        color='danger'
                        className='font-bold text-xs uppercase px-8 rounded-xl border border-red-900/30 hover:bg-red-500/10'
                      >
                        Eliminar Perfil
                      </Button>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default Profile
