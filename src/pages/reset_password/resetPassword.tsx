import { Button, Input, Link } from '@heroui/react'
import LayoutLogin from '@/layouts/layoutLogin'
import { useEffect, useMemo, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { client } from '@/api/client'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { PiEyeBold, PiEyeClosedBold, PiCheckCircleBold } from 'react-icons/pi'
import validatePassword from '@/utils/regex/PasswordRegex'

const ResetPassword = () => {
  const [searchParams] = useSearchParams()

  // Datos de la URL
  const email = searchParams.get('email')
  const vToken = searchParams.get('vToken')

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const [isVisiblePassword, setIsVisiblePassword] = useState(false)
  const [isVisiblePassword2, setIsVisiblePassword2] = useState(false)

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  })

  // Handlers de visibilidad
  const toggleVisibilityPassword = () =>
    setIsVisiblePassword(!isVisiblePassword)
  const toggleVisibilityPassword2 = () =>
    setIsVisiblePassword2(!isVisiblePassword2)

  // Validaciones (Misma lógica que Register)
  const passwordValidation = useMemo(() => {
    return validatePassword(formData.password)
  }, [formData.password])

  const passwordsMatch = useMemo(() => {
    if (formData.confirmPassword === '') return true
    return formData.password === formData.confirmPassword
  }, [formData.password, formData.confirmPassword])

  const isFormValid = useMemo(() => {
    return (
      passwordValidation.isValid &&
      formData.password === formData.confirmPassword &&
      formData.confirmPassword !== ''
    )
  }, [formData, passwordValidation.isValid])

  // Estilo exacto de Register
  const styleInput = {
    label: 'text-zinc-300 font-medium text-sm',
    inputWrapper: [
      'h-14',
      'border-zinc-800',
      'transition-all duration-200',
      'data-[focus=true]:ring-0',
    ].join(' '),
    input: 'text-base font-sans placeholder:text-zinc-700 text-white',
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !vToken) {
      toast.error('Enlace de recuperación inválido o expirado')
      return
    }

    try {
      setIsLoading(true)
      await client('/users/reset-password', {
        method: 'PUT',
        body: JSON.stringify({
          email,
          vToken,
          new_password: formData.password,
        }),
      })

      setIsSuccess(true)
      toast.success('Contraseña actualizada correctamente')
    } catch (error: any) {
      toast.error(error.error || 'Error al restablecer la contraseña')
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
      <div className='h-full w-full flex items-center justify-center bg-zinc-950 text-white font-sans p-6'>
        <div className='max-w-[400px] w-full flex flex-col gap-8'>
          {!isSuccess ? (
            <>
              <header className='flex flex-col gap-2'>
                <h2 className='text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase'>
                  Nueva contraseña
                </h2>
                <p className='text-zinc-400 text-sm sm:text-base font-normal'>
                  Establece una clave segura para acceder a tu cuenta.
                </p>
                <div className='h-1 w-full bg-yellow-600 mt-4 rounded-full' />
              </header>

              <form className='flex flex-col gap-4' onSubmit={onSubmit}>
                {/* Nueva Contraseña */}
                <Input
                  isRequired
                  label='Nueva contraseña'
                  labelPlacement='outside'
                  placeholder='Ingresa tu nueva contraseña'
                  variant='bordered'
                  radius='sm'
                  size='lg'
                  type={isVisiblePassword ? 'text' : 'password'}
                  classNames={styleInput}
                  value={formData.password}
                  onValueChange={(val) =>
                    setFormData({ ...formData, password: val })
                  }
                  isInvalid={
                    formData.password !== '' && !passwordValidation.isValid
                  }
                  errorMessage={() => (
                    <ul>
                      {passwordValidation.errors.map((error, index) => (
                        <li key={index}>• {error}</li>
                      ))}
                    </ul>
                  )}
                  endContent={
                    <button type='button' onClick={toggleVisibilityPassword}>
                      {isVisiblePassword ? (
                        <PiEyeBold size={20} className='text-default-400' />
                      ) : (
                        <PiEyeClosedBold
                          size={20}
                          className='text-default-400'
                        />
                      )}
                    </button>
                  }
                />

                {/* Confirmar Contraseña */}
                <Input
                  isRequired
                  label='Confirmar contraseña'
                  labelPlacement='outside'
                  placeholder='Repite tu nueva contraseña'
                  variant='bordered'
                  radius='sm'
                  size='lg'
                  type={isVisiblePassword2 ? 'text' : 'password'}
                  classNames={styleInput}
                  value={formData.confirmPassword}
                  onValueChange={(val) =>
                    setFormData({ ...formData, confirmPassword: val })
                  }
                  isInvalid={
                    formData.confirmPassword !== '' &&
                    (!passwordsMatch || !passwordValidation.isValid)
                  }
                  errorMessage={() => {
                    if (formData.confirmPassword === '') return null
                    if (!passwordsMatch)
                      return <span>Las contraseñas no coinciden</span>
                    if (!passwordValidation.isValid)
                      return <p>La contraseña base debe ser válida</p>
                    return null
                  }}
                  endContent={
                    <button type='button' onClick={toggleVisibilityPassword2}>
                      {isVisiblePassword2 ? (
                        <PiEyeBold size={20} className='text-default-400' />
                      ) : (
                        <PiEyeClosedBold
                          size={20}
                          className='text-default-400'
                        />
                      )}
                    </button>
                  }
                />

                <Button
                  isDisabled={!isFormValid}
                  isLoading={isLoading}
                  color='warning'
                  type='submit'
                  className='w-full font-bold text-base h-14 rounded-xl mt-6 transition-all active:scale-[0.98] bg-yellow-600 hover:bg-yellow-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-black'
                >
                  Actualizar contraseña
                </Button>
              </form>
            </>
          ) : (
            /* Vista de éxito optimizada */
            <div className='flex flex-col items-center text-center gap-6 py-10 animate-appearance-in'>
              <div className='bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800 shadow-2xl relative'>
                <PiCheckCircleBold size={60} className='text-yellow-600' />
              </div>
              <div className='space-y-2'>
                <h2 className='text-2xl font-bold text-zinc-100 uppercase tracking-tight'>
                  ¡Cambio Exitoso!
                </h2>
                <p className='text-zinc-500 font-light text-balance text-sm'>
                  Tu contraseña ha sido actualizada correctamente
                </p>
              </div>
              <Button
                as={Link}
                href='/login'
                className='bg-yellow-600 text-black font-bold rounded-xl h-12 px-8'
              >
                Ir al Login ahora
              </Button>
            </div>
          )}
        </div>
      </div>
      <ToastContainer theme='dark' />
    </LayoutLogin>
  )
}

export default ResetPassword
