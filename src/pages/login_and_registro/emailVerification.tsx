import { Button, Card, CardBody, Link } from '@heroui/react'
import LayoutLogin from '@/layouts/layoutLogin'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { client } from '@/api/client'
import { IUser } from '@/interfaces/IUser'
import {
  PiEnvelopeOpenBold,
  PiArrowLeftBold,
  PiCheckCircleFill,
} from 'react-icons/pi'

interface LocationState {
  email: string
}

const EmailVerification = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // Cambio 5: Persistencia temporal por si refresca la página (F5)
  const state = location.state as LocationState
  const [email, setEmail] = useState<string | null>(() => {
    return state?.email || sessionStorage.getItem('pending_verif_email')
  })

  const [isResending, setIsResending] = useState(false)
  const [countdown, setCountdown] = useState(0)

  // Guardar en sessionStorage para sobrevivir al F5
  useEffect(() => {
    if (state?.email) {
      sessionStorage.setItem('pending_verif_email', state.email)
      setEmail(state.email)
    }
  }, [state])

  // Cambio 2: Uso de setInterval para mayor precisión y limpieza de memoria
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(timer) // Limpieza total al desmontar
  }, [countdown])

  // Cambio 1 y 5: Redirección si no hay email (y limpieza de sessionStorage al salir)
  useEffect(() => {
    if (!email) {
      navigate('/login', { replace: true })
    }
  }, [email, navigate])

  // Redirigir si ya está logueado
  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      navigate('/home', { replace: true })
    }
  }, [navigate])

  const handleResendEmail = async () => {
    if (!email) return

    try {
      setIsResending(true)
      // Cambio 3: Asegúrate de que el backend maneje el rate limiting (60s)
      await client<IUser>('/users/resend-verification-email', {
        method: 'POST',
        body: JSON.stringify({ email }),
      })

      setCountdown(60)
    } catch (error: any) {
      console.error('Error al enviar el correo:', error)
    } finally {
      setIsResending(false)
    }
  }

  // Cambio 1 (Mejorado): Decodificación segura de Base64
  const EmailSupport = () => {
    const handleSupportClick = () => {
      const encodedEmail = 'bGViYXV4YWJlcnR1cmFzMTkzMEBnbWFpbC5jb20='

      const decodedEmail = decodeURIComponent(atob(encodedEmail))

      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${decodedEmail}&su=Ayuda%20con%20Verificacion&body=Hola,%20no%20he%20recibido%20el%20correo%20de%20verificaci%C3%B3n...`

      window.open(gmailUrl, '_blank', 'noopener,noreferrer')
    }

    return (
      <button
        onClick={handleSupportClick}
        className='text-zinc-500 text-xs underline cursor-pointer hover:text-yellow-600 transition-colors bg-transparent border-none p-0'
      >
        Contacta con el equipo de soporte
      </button>
    )
  }

  return (
    <LayoutLogin>
      <div className='w-full flex flex-col items-center justify-center py-10 selection:bg-yellow-500/30'>
        <div className='max-w-[420px] w-full flex flex-col gap-8 px-4 sm:px-0'>
          <header className='flex flex-col items-center text-center w-full'>
            <div className='relative mb-6'>
              <div className='bg-yellow-600/10 p-5 rounded-full border border-yellow-600/20'>
                <PiEnvelopeOpenBold size={48} className='text-yellow-600' />
              </div>
              <PiCheckCircleFill
                size={24}
                className='text-emerald-500 absolute bottom-0 right-0 bg-[#0A0A0A] rounded-full'
              />
            </div>

            <h2 className='text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3'>
              ¡Casi listo!
            </h2>
            <p className='text-zinc-400 text-sm sm:text-base font-normal text-balance'>
              Hemos enviado un enlace de verificación a <br />
              <span className='text-white font-medium'>{email}</span>
            </p>
          </header>

          <Card
            className='bg-[#0A0A0A] border border-zinc-900 shadow-xl'
            radius='lg'
          >
            <CardBody className='p-6 flex flex-col gap-6 text-center'>
              <div className='space-y-4'>
                <p className='text-zinc-400 text-sm'>
                  Revisa tu bandeja de entrada y sigue las instrucciones para
                  activar tu cuenta. Si no lo ves, revisa la carpeta de{' '}
                  <b>spam</b>.
                </p>
              </div>

              <div className='flex flex-col gap-3'>
                <Button
                  isLoading={isResending}
                  isDisabled={countdown > 0}
                  onPress={handleResendEmail}
                  variant='flat'
                  className='w-full font-bold text-sm h-12 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-yellow-600 border border-zinc-800'
                >
                  {countdown > 0
                    ? `Reenviar en ${countdown}s`
                    : 'No recibí el correo, reenviar'}
                </Button>

                <Button
                  as={Link}
                  href='/login'
                  variant='light'
                  startContent={<PiArrowLeftBold />}
                  className='text-zinc-500 hover:text-white transition-colors'
                  onPress={() =>
                    sessionStorage.removeItem('pending_verif_email')
                  }
                >
                  Volver al inicio de sesión
                </Button>
              </div>
            </CardBody>
          </Card>

          <footer className='text-center'>
            <p className='text-xs text-zinc-600'>
              ¿Tienes problemas? <EmailSupport />
            </p>
          </footer>
        </div>
      </div>
    </LayoutLogin>
  )
}

export default EmailVerification
