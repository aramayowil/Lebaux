import { Button, Input, Link, Card, CardBody } from '@heroui/react'
import LayoutLogin from '@/layouts/layoutLogin'
import { useMemo, useState } from 'react'
import {
  PiEyeBold,
  PiEyeClosedBold,
  PiCheckCircleBold,
  PiEnvelopeOpenBold,
} from 'react-icons/pi'
import { validateName } from '@/utils/regex/nameRegex'
import validatePassword from '@/utils/regex/PasswordRegex'
import validateEmail from '@/utils/regex/emailRegex'
import { useNavigate } from 'react-router-dom'
import { client } from '@/api/client'
import { IUser } from '@/interfaces/IUser'
import { toast, ToastContainer } from 'react-toastify'

const Register = () => {
  const navigate = useNavigate()
  const [isSuccess, setIsSuccess] = useState(false) // Estado para la vista de éxito
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    lastName: '',
    password: '',
    password2: '',
  })

  const [error, setError] = useState<{
    status: number
    message: string
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isVisiblePassword, setIsVisiblePassword] = useState(false)
  const [isVisiblePassword2, setIsVisiblePassword2] = useState(false)

  // Validaciones
  const isInvalidName = useMemo(
    () => formData.name !== '' && !validateName(formData.name),
    [formData.name],
  )
  const isInvalidLastName = useMemo(
    () => formData.lastName !== '' && !validateName(formData.lastName),
    [formData.lastName],
  )
  const isInvalidEmail = useMemo(
    () => formData.email !== '' && !validateEmail(formData.email),
    [formData.email],
  )
  const isInvalidPassword = useMemo(
    () => validatePassword(formData.password),
    [formData.password],
  )
  const passwordsMatch = useMemo(
    () => formData.password2 === '' || formData.password === formData.password2,
    [formData.password, formData.password2],
  )

  const isFormValid = useMemo(
    () =>
      validateName(formData.name) &&
      validateName(formData.lastName) &&
      validateEmail(formData.email) &&
      isInvalidPassword.isValid &&
      formData.password === formData.password2 &&
      formData.password2 !== '',
    [formData, isInvalidPassword.isValid],
  )

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
    setError(null)

    try {
      setIsLoading(true)
      await client<IUser>('/users/register', {
        method: 'POST',
        body: JSON.stringify({
          email: formData.email,
          nombre: formData.name,
          apellido: formData.lastName,
          password: formData.password,
        }),
      })

      setIsSuccess(true) // Activamos la vista de éxito
      toast.success('Registro completado con éxito')
    } catch (error: any) {
      const mensajeDeError = error.error || error.message || 'Error desconocido'
      setError({ status: error.status, message: mensajeDeError })
      toast.error(mensajeDeError)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <LayoutLogin>
      <div className='w-full flex flex-col items-center justify-center py-10 selection:bg-yellow-500/30'>
        <div className='max-w-[400px] w-full flex flex-col gap-8 px-4'>
          {!isSuccess ? (
            <>
              {/* FORMULARIO DE REGISTRO */}
              <header className='flex flex-col items-start text-left w-full'>
                <h2 className='text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2 uppercase'>
                  Crear nueva cuenta
                </h2>
                <p className='text-zinc-400 text-sm sm:text-base font-normal'>
                  Completa los campos para registrarte
                </p>
                <div className='h-1 w-full bg-yellow-600 mt-4 rounded-full' />
              </header>

              <Card
                className='bg-transparent border-none shadow-none'
                radius='none'
              >
                <CardBody className='p-0 flex flex-col gap-6'>
                  <form className='flex flex-col gap-4' onSubmit={onSubmit}>
                    <Input
                      isRequired
                      label='Correo electrónico'
                      labelPlacement='outside'
                      placeholder='ejemplo@correo.com'
                      variant='bordered'
                      radius='sm'
                      size='lg'
                      isInvalid={isInvalidEmail || error?.status === 409}
                      errorMessage={
                        error?.status === 409
                          ? error.message
                          : isInvalidEmail
                            ? 'Email inválido'
                            : ''
                      }
                      value={formData.email}
                      onValueChange={(val) => {
                        setFormData({ ...formData, email: val })
                        if (error?.status === 409) {
                          setError({
                            status: 0,
                            message: '',
                          })
                        }
                      }}
                      classNames={styleInput}
                    />

                    <div className='grid grid-cols-2 gap-4'>
                      <Input
                        isRequired
                        label='Nombre'
                        labelPlacement='outside'
                        placeholder='Nombre'
                        variant='bordered'
                        radius='sm'
                        size='lg'
                        isInvalid={isInvalidName}
                        value={formData.name}
                        onValueChange={(val) =>
                          setFormData({ ...formData, name: val })
                        }
                        classNames={styleInput}
                      />
                      <Input
                        isRequired
                        label='Apellido'
                        labelPlacement='outside'
                        placeholder='Apellido'
                        variant='bordered'
                        radius='sm'
                        size='lg'
                        isInvalid={isInvalidLastName}
                        value={formData.lastName}
                        onValueChange={(val) =>
                          setFormData({ ...formData, lastName: val })
                        }
                        classNames={styleInput}
                      />
                    </div>

                    <Input
                      isRequired
                      type={isVisiblePassword ? 'text' : 'password'}
                      label='Contraseña'
                      labelPlacement='outside'
                      placeholder='Crea tu contraseña'
                      variant='bordered'
                      radius='sm'
                      size='lg'
                      isInvalid={
                        formData.password !== '' && !isInvalidPassword.isValid
                      }
                      errorMessage={() => (
                        <ul className='text-xs space-y-1'>
                          {isInvalidPassword.errors.map((err, i) => (
                            <li key={i}>• {err}</li>
                          ))}
                        </ul>
                      )}
                      value={formData.password}
                      onValueChange={(val) =>
                        setFormData({ ...formData, password: val })
                      }
                      endContent={
                        <button
                          type='button'
                          onClick={() =>
                            setIsVisiblePassword(!isVisiblePassword)
                          }
                        >
                          {isVisiblePassword ? (
                            <PiEyeBold size={20} className='text-zinc-500' />
                          ) : (
                            <PiEyeClosedBold
                              size={20}
                              className='text-zinc-500'
                            />
                          )}
                        </button>
                      }
                      classNames={styleInput}
                    />

                    <Input
                      isRequired
                      type={isVisiblePassword2 ? 'text' : 'password'}
                      label='Confirmar contraseña'
                      labelPlacement='outside'
                      placeholder='Repite tu contraseña'
                      variant='bordered'
                      radius='sm'
                      size='lg'
                      isInvalid={!passwordsMatch}
                      errorMessage={
                        !passwordsMatch ? 'Las contraseñas no coinciden' : ''
                      }
                      value={formData.password2}
                      onValueChange={(val) =>
                        setFormData({ ...formData, password2: val })
                      }
                      endContent={
                        <button
                          type='button'
                          onClick={() =>
                            setIsVisiblePassword2(!isVisiblePassword2)
                          }
                        >
                          {isVisiblePassword2 ? (
                            <PiEyeBold size={20} className='text-zinc-500' />
                          ) : (
                            <PiEyeClosedBold
                              size={20}
                              className='text-zinc-500'
                            />
                          )}
                        </button>
                      }
                      classNames={styleInput}
                    />

                    <Button
                      isDisabled={!isFormValid}
                      isLoading={isLoading}
                      type='submit'
                      className='w-full font-bold text-base h-14 rounded-xl mt-6 transition-all bg-yellow-600 hover:bg-yellow-500 text-black'
                    >
                      Registrarme ahora
                    </Button>
                  </form>

                  <div className='w-full py-6 text-center border-t border-zinc-900 mt-4'>
                    <p className='text-sm text-zinc-500'>
                      ¿Ya tienes una cuenta?
                      <Link
                        href='/login'
                        className='text-yellow-600 font-bold ml-2 hover:underline'
                      >
                        Inicia sesión
                      </Link>
                    </p>
                  </div>
                </CardBody>
              </Card>
            </>
          ) : (
            /* VISTA DE ÉXITO */
            <div className='flex flex-col items-center text-center gap-8 py-10 animate-appearance-in'>
              <div className='relative'>
                <div className='bg-zinc-900/50 p-8 rounded-full border border-zinc-800 shadow-2xl'>
                  <PiEnvelopeOpenBold size={60} className='text-yellow-600' />
                </div>
                <PiCheckCircleBold
                  size={30}
                  className='absolute -bottom-2 -right-2 text-emerald-500 bg-zinc-950 rounded-full'
                />
              </div>

              <div className='space-y-4'>
                <h2 className='text-3xl font-bold text-white uppercase tracking-tighter'>
                  ¡Registro Exitoso!
                </h2>
                <p className='text-zinc-400 text-base font-light leading-relaxed'>
                  Hemos enviado un correo de verificación a:
                  <br />
                  <span className='text-zinc-100 font-semibold'>
                    {formData.email}
                  </span>
                </p>
                <p className='text-zinc-500 text-sm italic'>
                  Por favor, revisa tu bandeja de entrada (y la carpeta de spam)
                  para activar tu cuenta.
                </p>
              </div>

              <Button
                onPress={() => navigate('/login')}
                className='bg-zinc-900 text-yellow-600 font-bold rounded-xl h-14 w-full border border-zinc-800 hover:bg-zinc-800 transition-all'
              >
                Volver al Login
              </Button>
            </div>
          )}
        </div>
      </div>
      <ToastContainer theme='dark' />
    </LayoutLogin>
  )
}

export default Register
