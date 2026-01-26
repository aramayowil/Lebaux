import { Button, Input, Link, Card, CardBody } from '@heroui/react'
import LayoutLogin from '@/layouts/layoutLogin'
import { useMemo, useState } from 'react'
import { PiEyeBold, PiEyeClosedBold } from 'react-icons/pi'
import { validateName } from '@/utils/regex/nameRegex'
import validatePassword from '@/utils/regex/PasswordRegex'
import validateEmail from '@/utils/regex/emailRegex'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    lastName: '',
    password: '',
    password2: '',
  })

  const [isVisiblePassword, setIsVisiblePassword] = useState(false)
  const toggleVisibilityPassword = () =>
    setIsVisiblePassword(!isVisiblePassword)

  const [isVisiblePassword2, setIsVisiblePassword2] = useState(false)
  const toggleVisibilityPassword2 = () =>
    setIsVisiblePassword2(!isVisiblePassword2)

  const isInvalidName = useMemo(() => {
    if (formData.name === '') return false

    return validateName(formData.name) ? false : true
  }, [formData.name])

  const isInvalidLastName = useMemo(() => {
    if (formData.lastName === '') return false

    return validateName(formData.lastName) ? false : true
  }, [formData.lastName])

  const isInvalidEmail = useMemo(() => {
    if (formData.email === '') return false

    return validateEmail(formData.email) ? false : true
  }, [formData.email])

  const isInvalidPassword = useMemo(() => {
    return validatePassword(formData.password)
  }, [formData.password])

  const passwordsMatch = useMemo(() => {
    if (formData.password2 === '') return true
    return formData.password === formData.password2
  }, [formData.password, formData.password2])

  // Determinar si el formulario es válido para habilitar el botón
  const isFormValid = useMemo(() => {
    return (
      validateName(formData.name) &&
      validateName(formData.lastName) &&
      validateEmail(formData.email) &&
      isInvalidPassword.isValid &&
      formData.password === formData.password2 &&
      formData.password2 !== ''
    )
  }, [formData, isInvalidPassword.isValid])

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

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Si es válido, procede con la lógica de registro aquí
    console.log('Formulario enviado:', formData)

    navigate('/email-verification')
  }

  return (
    <LayoutLogin>
      {/* Contenedor alineado al inicio en pantallas pequeñas y centrado en el layout */}
      <div className='w-full flex flex-col items-center justify-center py-10 selection:bg-yellow-500/30'>
        {/* CONTENEDOR DE ANCHO CONTROLADO (400px para evitar estiramiento) */}
        <div className='max-w-[400px] w-full flex flex-col gap-8 px-4 sm:px-0'>
          {/* HEADER ALINEADO AL INICIO */}
          <header className='flex flex-col items-start text-left w-full'>
            <h2 className='text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2'>
              Crear nueva cuenta
            </h2>
            <p className='text-zinc-400 text-sm sm:text-base font-normal'>
              Completa los campos para registrarte
            </p>
            {/* Línea decorativa técnica */}
            <div className='h-1 w-full bg-yellow-600 mt-4 rounded-full' />
          </header>

          <Card
            className='bg-transparent border-none shadow-none'
            radius='none'
          >
            <CardBody className='p-0 flex flex-col gap-6'>
              <form className='flex flex-col gap-4' onSubmit={onSubmit}>
                <div className='flex flex-col gap-4'>
                  <Input
                    isRequired
                    type='email'
                    label='Correo electrónico'
                    labelPlacement='outside'
                    placeholder='ejemplo@correo.com'
                    variant='bordered'
                    radius='sm'
                    size='lg'
                    isInvalid={isInvalidEmail}
                    errorMessage={() => {
                      if (formData.email === '') return null
                      if (!validateEmail(formData.email))
                        return <p>• Formato de correo electrónico inválido</p>
                      return null
                    }}
                    value={formData.email}
                    onValueChange={(value) =>
                      setFormData({ ...formData, email: value })
                    }
                    classNames={styleInput}
                  />

                  <Input
                    isRequired
                    label='Nombre'
                    labelPlacement='outside'
                    placeholder='Tu nombre'
                    variant='bordered'
                    radius='sm'
                    size='lg'
                    isInvalid={isInvalidName}
                    errorMessage={isInvalidName ? 'El nombre es requerido' : ''}
                    value={formData.name}
                    onValueChange={(value) =>
                      setFormData({ ...formData, name: value })
                    }
                    classNames={styleInput}
                  />

                  <Input
                    isRequired
                    label='Apellido'
                    labelPlacement='outside'
                    placeholder='Tu apellido'
                    variant='bordered'
                    radius='sm'
                    size='lg'
                    isInvalid={isInvalidLastName}
                    value={formData.lastName}
                    onValueChange={(value) =>
                      setFormData({ ...formData, lastName: value })
                    }
                    classNames={styleInput}
                  />

                  <Input
                    isRequired
                    type={isVisiblePassword ? 'text' : 'password'}
                    label='Contraseña'
                    labelPlacement='outside'
                    placeholder='Ingresa tu contraseña'
                    variant='bordered'
                    radius='sm'
                    size='lg'
                    isInvalid={
                      formData.password !== '' && !isInvalidPassword.isValid
                    }
                    errorMessage={() => {
                      return (
                        <ul>
                          {isInvalidPassword.errors.map((error, index) => (
                            <li key={index}>• {error}</li>
                          ))}
                        </ul>
                      )
                    }}
                    value={formData.password}
                    onValueChange={(value) =>
                      setFormData({ ...formData, password: value })
                    }
                    endContent={
                      <button
                        aria-label='toggle password visibility'
                        className='focus:outline-solid outline-transparent'
                        type='button'
                        onClick={toggleVisibilityPassword}
                      >
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
                    classNames={styleInput}
                  />

                  <Input
                    isRequired
                    type={isVisiblePassword2 ? 'text' : 'password'}
                    label='Confirmar contraseña'
                    labelPlacement='outside'
                    variant='bordered'
                    placeholder='Repite tu contraseña'
                    radius='sm'
                    size='lg'
                    isInvalid={
                      formData.password2 !== '' &&
                      (!passwordsMatch || !isInvalidPassword.isValid)
                    }
                    errorMessage={() => {
                      if (formData.password2 === '') return null
                      if (!passwordsMatch)
                        return <span>Las contraseñas no coinciden</span>
                      if (!isInvalidPassword.isValid)
                        return <p>La contraseña base debe ser válida</p>
                      return null
                    }}
                    value={formData.password2}
                    onValueChange={(value) =>
                      setFormData({ ...formData, password2: value })
                    }
                    endContent={
                      <button
                        aria-label='toggle password visibility'
                        className='focus:outline-solid outline-transparent'
                        type='button'
                        onClick={toggleVisibilityPassword2}
                      >
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
                    classNames={styleInput}
                  />
                </div>

                <Button
                  isDisabled={!isFormValid}
                  color='warning'
                  variant='solid'
                  type='submit'
                  className='w-full font-bold text-base h-14 rounded-xl mt-6 transition-all active:scale-[0.98] bg-yellow-600 hover:bg-yellow-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-black'
                >
                  Registrarme ahora
                </Button>
              </form>

              {/* Bloque inferior con mejor espaciado */}
              <div className='w-full py-6 text-center border-t border-zinc-900 mt-4'>
                <p className='text-sm text-zinc-500 font-sans'>
                  ¿Ya tienes una cuenta?
                  <Link
                    href='/login'
                    className='text-yellow-600 font-bold ml-2 hover:underline transition-all'
                  >
                    Inicia sesión
                  </Link>
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </LayoutLogin>
  )
}

export default Register
