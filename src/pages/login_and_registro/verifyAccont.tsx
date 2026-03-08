import { Button, Card, CardBody, Link, Spinner } from '@heroui/react'
import LayoutLogin from '@/layouts/layoutLogin'
import {
  PiWarningCircleBold,
  PiArrowRightBold,
  PiSealCheckFill,
} from 'react-icons/pi'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { client } from '@/api/client'
import { useEffect, useState } from 'react'
import { IoHomeOutline } from 'react-icons/io5'

const VerifyAccount = () => {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading',
  )
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      navigate('/home', { replace: true })
    }
  }, [navigate])

  const content = {
    success: {
      // Usamos un icono de sello para que el amarillo destaque más
      icon: <PiSealCheckFill size={80} className='text-yellow-600' />,
      title: '¡Cuenta verificada!',
      description:
        'Tu identidad ha sido confirmada con éxito. Ya puedes acceder a todas las funciones de la plataforma.',
      buttonText: 'Iniciar Sesión',
      buttonLink: '/login',
      buttonIcon: <PiArrowRightBold size={20} />,
      color: 'border-yellow-600/30',
      glow: 'bg-yellow-600/10',
    },
    error: {
      icon: <PiWarningCircleBold size={80} className='text-red-500' />,
      title: 'Enlace inválido',
      description:
        'Lo sentimos, este enlace de verificación ya no es válido o ha expirado. Por seguridad, los enlaces expiran tras 3 horas. Por favor, solicita un nuevo enlace de verificación iniciando sesión.',
      buttonText: 'Ir al Login',
      buttonLink: '/login',
      buttonIcon: <PiArrowRightBold size={20} />,
      color: 'border-red-500/30',
      glow: 'bg-red-500/10',
    },
  }

  useEffect(() => {
    const verify = async () => {
      const email = searchParams.get('email')
      const vToken = searchParams.get('vToken')

      if (!email || !vToken) {
        setStatus('error')
        return
      }

      try {
        // Asegúrate que el endpoint coincida con tu backend (/verify-account o /verify-email)
        await client(`/users/verify-account?email=${email}&vToken=${vToken}`, {
          method: 'GET',
        })
        setStatus('success')
      } catch (err: any) {
        console.error('Error verificando cuenta', err)
        setStatus('error')
      }
    }
    verify()
  }, [searchParams])

  const current = status === 'error' ? content.error : content.success

  if (status === 'loading') {
    return (
      <LayoutLogin>
        <div className='w-full flex flex-col items-center justify-center py-10'>
          <div className='max-w-[450px] w-full px-4'>
            <Card
              className='bg-[#0A0A0A] border-zinc-800 shadow-2xl p-8'
              radius='lg'
            >
              <CardBody className='flex flex-col items-center gap-8 py-10'>
                <div className='relative flex items-center justify-center'>
                  <div className='absolute inset-0 bg-yellow-600/20 blur-3xl rounded-full animate-pulse' />
                  <Spinner color='warning' size='lg' className='scale-150' />
                </div>
                <div className='space-y-4 w-full text-center'>
                  <div className='space-y-2'>
                    <h2 className='text-2xl font-bold text-white tracking-tight'>
                      Validando enlace
                    </h2>
                    <p className='text-zinc-500 text-sm italic'>
                      Confirmando información con el servidor...
                    </p>
                  </div>
                  <div className='w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden relative'>
                    <div className='absolute inset-y-0 left-0 bg-yellow-600 w-1/3 animate-loading-bar shadow-[0_0_15px_rgba(202,138,4,0.5)]' />
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
        <style>{`
          @keyframes loading-bar {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(300%); }
          }
          .animate-loading-bar { animation: loading-bar 2s infinite ease-in-out; }
        `}</style>
      </LayoutLogin>
    )
  }

  return (
    <LayoutLogin>
      <div className='w-full flex flex-col items-center justify-center py-10 selection:bg-yellow-500/30'>
        <div className='max-w-[450px] w-full px-4'>
          <Card
            className={`bg-[#0A0A0A] border ${current.color} shadow-2xl p-4 sm:p-8 relative overflow-hidden`}
            radius='lg'
          >
            {/* Efecto de resplandor de fondo según el estado */}
            <div
              className={`absolute -top-24 -left-24 w-48 h-48 ${current.glow} blur-[80px] rounded-full`}
            />

            <CardBody className='flex flex-col items-center text-center gap-6 relative z-10'>
              <div className='animate-appearance-in'>{current.icon}</div>

              <div className='space-y-3'>
                <h2 className='text-3xl font-bold tracking-tight text-white'>
                  {current.title}
                </h2>
                <p className='text-zinc-400 text-base leading-relaxed'>
                  {current.description}
                </p>
              </div>

              <Button
                as={Link}
                href={current.buttonLink}
                color='warning'
                variant={status === 'success' ? 'solid' : 'flat'}
                size='lg'
                endContent={current.buttonIcon}
                className={`w-full h-14 font-bold text-base rounded-xl mt-4 
                  ${status === 'success' ? 'bg-yellow-600 text-black hover:bg-yellow-500' : 'bg-zinc-900 text-white border border-zinc-800'}`}
              >
                {current.buttonText}
              </Button>

              <Link
                href='/'
                className='text-zinc-500 text-sm hover:text-yellow-600 transition-colors flex items-center gap-2'
              >
                <IoHomeOutline />
                Volver al inicio
              </Link>
            </CardBody>
          </Card>

          {/* Indicadores visuales inferiores */}
          <div className='mt-8 flex justify-center gap-2'>
            <div
              className={`h-1 w-12 rounded-full ${status === 'success' ? 'bg-yellow-600/40' : 'bg-red-500/20'}`}
            />
            <div
              className={`h-1 w-4 rounded-full ${status === 'success' ? 'bg-yellow-600/60' : 'bg-red-500/40'}`}
            />
          </div>
        </div>
      </div>
    </LayoutLogin>
  )
}

export default VerifyAccount
