import { Button, Input, Link } from '@heroui/react'
import LayoutLogin from '@/layouts/layoutLogin'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { client } from '@/api/client'
import { Link as RouterLink } from 'react-router-dom'
import { PiArrowLeftBold, PiEnvelopeSimpleBold } from 'react-icons/pi'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const styleInput = {
    label: 'text-zinc-400 font-medium text-sm',
    inputWrapper: [
      'h-14',
      'bg-zinc-900/40',
      'border-zinc-800',
      'group-data-[focus=true]:border-yellow-600/50',
      'transition-all duration-200',
    ].join(' '),
    input: 'text-base font-sans placeholder:text-zinc-600 text-zinc-100',
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) {
      toast.warning('Ingresa tu correo electrónico')
      return
    }

    try {
      setIsLoading(true)
      // Cambia el endpoint según tu API (ej: /users/forgot-password)
      await client('/users/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      })

      setIsSent(true)
      toast.success('Correo enviado correctamente')
    } catch (error: any) {
      toast.error(error.error || 'No se pudo enviar el correo')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <LayoutLogin>
      <div className='h-full w-full flex items-center justify-center rounded-xl bg-zinc-950 text-white font-sans p-6'>
        <div className='max-w-[400px] w-full flex flex-col gap-8'>
          {/* Botón Volver */}
          <Link
            as={RouterLink}
            to='/'
            className='flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors text-sm w-fit'
          >
            <PiArrowLeftBold /> Volver al inicio
          </Link>

          {!isSent ? (
            <>
              <div className='flex flex-col gap-2'>
                <h2 className='text-3xl font-bold tracking-tight text-zinc-100 uppercase'>
                  Restablecer contraseña
                </h2>
                <p className='text-zinc-400 text-base font-light'>
                  Ingresa tu correo y te enviaremos las instrucciones para
                  restablecer tu contraseña
                </p>
              </div>

              <form className='flex flex-col gap-6' onSubmit={onSubmit}>
                <Input
                  isRequired
                  type='email'
                  placeholder='ejemplo@email.com'
                  label='Correo electrónico'
                  labelPlacement='outside'
                  variant='bordered'
                  radius='lg'
                  size='lg'
                  classNames={styleInput}
                  value={email}
                  onValueChange={setEmail}
                  startContent={
                    <PiEnvelopeSimpleBold size={20} className='text-zinc-500' />
                  }
                />

                <Button
                  isLoading={isLoading}
                  color='warning'
                  type='submit'
                  className='w-full font-bold text-lg h-14 rounded-xl bg-yellow-600 text-black transition-all active:scale-95'
                >
                  Enviar correo de recuperación
                </Button>
              </form>
            </>
          ) : (
            /* Vista de éxito */
            <div className='flex flex-col items-center text-center gap-6 py-10 animate-appearance-in'>
              <div className='w-20 h-20 bg-yellow-600/10 rounded-full flex items-center justify-center border border-yellow-600/20'>
                <PiEnvelopeSimpleBold size={40} className='text-yellow-600' />
              </div>
              <div className='space-y-2'>
                <h2 className='text-2xl font-bold text-zinc-100 uppercase'>
                  ¡Correo enviado!
                </h2>
                <p className='text-zinc-400 font-light'>
                  Hemos enviado un enlace a{' '}
                  <span className='text-zinc-200 font-medium'>{email}</span>.
                  Revisa tu bandeja de entrada o spam.
                </p>
              </div>
              <Button
                as={RouterLink}
                to='/login'
                variant='bordered'
                className='border-zinc-800 text-zinc-300 hover:bg-zinc-900 rounded-xl px-8'
              >
                Regresar al login
              </Button>
            </div>
          )}

          <ToastContainer theme='dark' />
        </div>
      </div>
    </LayoutLogin>
  )
}

export default ForgotPassword
