import { Button, Image, Input, Link } from '@heroui/react'
import LayoutLogin from '@/layouts/layoutLogin'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { client } from '@/api/client'
import { useLocation, useNavigate } from 'react-router-dom'
import { ApiError, AuthResponse } from '@/interfaces/IResponse.api'
import imgInterior from '../../../public/images/photos/img_interior_login.avif'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // Si existe 'from', lo usamos. Si no, lo mandamos al profile por defecto.
  const destination = location.state?.from?.pathname || '/home'

  const [isLoading, setIsLoading] = useState(false)
  const [errorResponse, setErrorResponse] = useState<{
    status: number
    message: string
    error: string
  } | null>(null)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const styleInput = {
    label: 'text-zinc-300 font-medium text-sm',
    inputWrapper: [
      'h-14',
      'bg-[#0A0A0A]',
      'border-zinc-800',
      'transition-all duration-200',
      'data-[focus=true]:ring-0',
    ].join(' '),
    input: 'text-base font-sans placeholder:text-zinc-700 text-white',
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email.trim() || !formData.password.trim()) {
      toast.warning('Campos incompletos', {
        theme: 'dark',
        style: {
          background: '#0A0A0A',
          color: '#fff',
          border: '1px solid #ca8a04',
        },
      })
      return
    }

    try {
      setIsLoading(true)
      const response = await client<AuthResponse>('/users/login', {
        method: 'POST',
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        // Almacenar el token y el usuario en localStorage
        localStorage.setItem('auth_token', response.auth_token)
        localStorage.setItem('user', JSON.stringify(response.user))

        navigate(destination, { replace: true })
      }
    } catch (err: unknown) {
      const error = err as ApiError
      // Si el backend dice "Email no verificado" (Status 403)
      if (error.status === 403) {
        navigate('/email-verification', {
          state: {
            email: formData.email.trim().toLowerCase(),
          },
        })
      }
      setErrorResponse({
        status: error.status,
        message: error.message,
        error: error.error,
      })
      toast.error(error.error, {
        theme: 'dark',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      navigate('/home', { replace: true })
    }
  }, [navigate])

  return (
    <LayoutLogin>
      <div className='h-full w-full flex bg-black text-white font-sans selection:bg-yellow-500/30 overflow-hidden'>
        {/* SECCIÓN IZQUIERDA: Imagen */}
        <div className='hidden lg:flex w-1/2 min-h-screen relative overflow-hidden'>
          <Image
            src={imgInterior}
            alt='Aberturas Lebaux'
            radius='md'
            className='w-screen h-screen object-cover'
          />
          <div className='absolute inset-0 bg-black/30 z-10' />
        </div>

        {/* SECCIÓN DERECHA: Formulario */}
        <div className='w-full lg:w-1/2 flex flex-col items-center justify-center p-8 lg:p-2 bg-black'>
          <div className='max-w-[400px] w-full flex flex-col items-center gap-8'>
            <div className='w-full mb-2'>
              <h2 className='text-3xl font-semibold tracking-tight text-white dark:text-white'>
                Iniciar sesión
              </h2>
              <p className='text-zinc-500 text-base mt-2'>
                Ingresa al panel técnico de gestión.
              </p>
            </div>

            <form className='w-full flex flex-col gap-4' onSubmit={onSubmit}>
              <Input
                placeholder='Correo electrónico'
                variant='bordered'
                type='email'
                radius='sm'
                size='lg'
                classNames={styleInput}
                value={formData.email}
                onValueChange={(value) => {
                  setFormData({
                    ...formData,
                    email: value.toLowerCase(),
                  })
                  if (errorResponse?.status === 401) {
                    setErrorResponse(null)
                  }
                }}
              />
              <Input
                type='password'
                placeholder='Contraseña'
                variant='bordered'
                radius='sm'
                size='lg'
                classNames={styleInput}
                value={formData.password}
                onValueChange={(value) => {
                  setFormData({ ...formData, password: value })
                  if (errorResponse?.status === 401) {
                    setErrorResponse(null)
                  }
                }}
              />
              {errorResponse?.status === 401 && (
                <p className='text-[#f31260] text-sm text-center'>
                  {`¡${errorResponse?.error}!`}
                </p>
              )}

              <Button
                isLoading={isLoading}
                color='warning'
                variant='solid'
                type='submit'
                className={
                  errorResponse?.status === 401
                    ? 'w-full font-bold text-lg h-14 rounded-lg mt-1 transition-transform active:scale-95'
                    : 'w-full font-bold text-lg h-14 rounded-lg mt-4 transition-transform active:scale-95'
                }
              >
                Iniciar sesión
              </Button>
              <ToastContainer />

              <Link
                href='/password/reset'
                className='text-sm text-zinc-500 self-center mt-2 font-normal hover:text-yellow-500 transition-colors'
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </form>

            <div className='w-full border border-zinc-900 py-6 px-6 text-center mt-4 rounded-sm'>
              <p className='text-base text-zinc-300'>
                ¿No tienes una cuenta?
                <Link
                  href='/register'
                  className='text-yellow-600 font-semibold text-base ml-1 hover:text-yellow-500'
                >
                  Regístrate
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </LayoutLogin>
  )
}

export default Login
