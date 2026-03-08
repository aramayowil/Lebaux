import { useState, useEffect } from 'react'
import { Avatar, Button, Card, CardBody } from '@heroui/react'
import { HiCheckCircle, HiOutlineArrowLeft } from 'react-icons/hi'
import DefaultLayout from '@/layouts/default'
import { client } from '@/api/client'
import { AuthResponse, UserResponse } from '@/interfaces/IResponse.api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

// Función para generar avatares rápidamente
const generateAvatars = (
  path: string,
  prefix: string,
  count: number,
  extension: string,
) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${prefix}-${i + 1}`,
    url: `/assets/avatars/${path}/${prefix}-${i + 1}.${extension}`,
  }))
}

const avatarGroups = [
  {
    title: 'Originales Lebaux',
    avatars: generateAvatars('FormalAvatars', 'formal', 11, 'webp'),
  },
  {
    title: 'Abstract',
    avatars: generateAvatars('DiceBears', 'DB', 6, 'svg'),
  },
  {
    title: 'GTA V',
    avatars: generateAvatars('GtaV', 'gtav', 9, 'jpg'),
  },
  {
    title: 'Cartoons',
    avatars: generateAvatars('Cartoons', 'cartoon', 8, 'webp'),
  },
  {
    title: 'Dreams World',
    avatars: generateAvatars('DreamsWorld', 'DW', 7, 'webp'),
  },
  {
    title: 'Stranger Things',
    avatars: generateAvatars('StrangerThings', 'ST', 9, 'webp'),
  },
]

export default function SettingAvatar() {
  const navigate = useNavigate()
  const [isSaving, setIsSaving] = useState(false)

  // 1. Inicializamos como null para que no haya selección arbitraria
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null)

  // 2. Efecto para cargar el avatar actual del perfil
  useEffect(() => {
    const userStorage = localStorage.getItem('user')
    if (userStorage) {
      const user = JSON.parse(userStorage) as UserResponse
      // Si el usuario ya tiene una foto en su perfil, la marcamos como seleccionada
      if (user.photo_profile) {
        setSelectedAvatar(user.photo_profile)
      }
    }
  }, [])

  const handleSave = async () => {
    if (!selectedAvatar) {
      toast.error('Por favor, selecciona un personaje primero')
      return
    }

    try {
      setIsSaving(true)
      const userStorage = localStorage.getItem('user')

      if (!userStorage) {
        localStorage.clear()
        toast.error('Sesión expirada')
        return navigate('/login', { replace: true })
      }

      const user = JSON.parse(userStorage) as UserResponse

      const response = await client<AuthResponse>(
        '/users/update-photo-profile',
        {
          method: 'PUT',
          body: JSON.stringify({
            id: user.usuario_id,
            scrPhoto: selectedAvatar,
          }),
        },
      )

      // Actualizamos el objeto local del usuario
      const updatedUser: UserResponse = {
        ...user,
        photo_profile: selectedAvatar,
      }

      localStorage.setItem('user', JSON.stringify(updatedUser))

      toast.success(response.message || 'Avatar actualizado', {
        theme: 'dark',
      })

      // Pequeño delay para que el usuario vea el feedback antes de redirigir
      setTimeout(() => navigate('/profile', { replace: true }), 500)
    } catch (error) {
      toast.error('Error al actualizar la foto', {
        theme: 'dark',
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <DefaultLayout>
      <div className='min-h-screen bg-black text-white pb-40 font-sans selection:bg-yellow-500/30'>
        {/* HEADER */}
        <div className='p-6 md:px-12 flex items-center gap-4'>
          <Button
            isIconOnly
            variant='light'
            radius='full'
            className='text-white hover:bg-white/10'
            onPress={() => navigate('/profile')}
          >
            <HiOutlineArrowLeft size={24} />
          </Button>
          <h1 className='text-xl md:text-2xl font-bold tracking-tight uppercase'>
            Elige un Personaje
          </h1>
        </div>

        {/* GRID DE AVATARES */}
        <div className='max-w-[1400px] mx-auto px-6 md:px-12 space-y-16'>
          {avatarGroups.map((group) => (
            <section key={group.title} className='space-y-8'>
              <h2 className='text-zinc-500 font-bold text-sm md:text-base uppercase tracking-widest ml-2'>
                {group.title}
              </h2>

              <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-8 md:gap-12'>
                {group.avatars.map((avatar) => {
                  const isSelected = selectedAvatar === avatar.url
                  return (
                    <button
                      key={avatar.id}
                      onClick={() => setSelectedAvatar(avatar.url)}
                      className='relative group flex flex-col items-center outline-none'
                    >
                      <div
                        className={`
                          relative rounded-full transition-all duration-400 ease-out
                          ${
                            isSelected
                              ? 'ring-4 ring-warning scale-110 shadow-[0_0_40px_rgba(234,179,8,0.2)] opacity-100'
                              : 'opacity-80 group-hover:opacity-100 group-hover:scale-105'
                          }
                        `}
                      >
                        <Avatar
                          src={avatar.url}
                          className='w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32'
                          isBordered={isSelected}
                          color={isSelected ? 'warning' : 'default'}
                        />

                        {/* INDICADOR DE SELECCIÓN */}
                        {isSelected && (
                          <div className='absolute -top-1 -right-1 bg-black rounded-full z-20 scale-110 animate-appearance-in'>
                            <HiCheckCircle className='text-warning text-2xl md:text-3xl' />
                          </div>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </section>
          ))}
        </div>

        {/* BARRA INFERIOR PERSISTENTE */}
        <div className='fixed bottom-0 left-0 w-full z-50 p-4 md:p-6 bg-linear-to-t from-black via-black/90 to-transparent'>
          <Card
            isBlurred
            className='max-w-4xl mx-auto bg-zinc-900/70 border border-zinc-800 shadow-2xl rounded-4xl'
          >
            <CardBody className='flex flex-row items-center justify-between px-8 py-4'>
              <div className='hidden sm:block'>
                <h4 className='text-white font-bold'>
                  ¿Confirmar nuevo avatar?
                </h4>
                <p className='text-zinc-500 text-xs'>
                  Podrás volver a cambiarlo cuando quieras.
                </p>
              </div>

              <div className='flex gap-4 w-full sm:w-auto'>
                <Button
                  variant='flat'
                  className='text-zinc-400 font-bold hover:bg-zinc-800 flex-1 sm:flex-none rounded-xl'
                  onPress={() => navigate('/profile')}
                >
                  Cancelar
                </Button>
                <Button
                  color='warning'
                  className='font-black px-10 flex-1 sm:flex-none uppercase text-black rounded-xl'
                  isLoading={isSaving}
                  isDisabled={!selectedAvatar}
                  onPress={handleSave}
                >
                  Guardar
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </DefaultLayout>
  )
}
