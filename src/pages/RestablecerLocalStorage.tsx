import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, CardBody, Progress, Divider } from '@heroui/react' // Asegúrate de tener instalado @heroui/react
import {
  HiOutlineRefresh,
  HiOutlineTrash,
  HiOutlineShieldCheck,
  HiOutlineExclamation,
} from 'react-icons/hi' // react-icons/hi para un look limpio

function RestablecerLocalStorage() {
  const [isCleaning, setIsCleaning] = useState(false)
  const [progress, setProgress] = useState(0)
  const navigate = useNavigate()

  const handleClearData = () => {
    setIsCleaning(true)
  }

  useEffect(() => {
    if (isCleaning) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 5
        })
      }, 100)

      // Proceso de limpieza real
      if (progress === 100) {
        localStorage.clear()
        sessionStorage.clear()

        setTimeout(() => {
          navigate('/')
          window.location.reload()
        }, 800)
      }

      return () => clearInterval(interval)
    }
  }, [isCleaning, progress, navigate])

  return (
    <div className='min-h-screen bg-zinc-950 flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-black'>
      <Card className='max-w-[450px] w-full bg-zinc-900/50 border-zinc-800/50 backdrop-blur-md shadow-2xl rounded-[2.5rem]'>
        <CardBody className='p-10 flex flex-col items-center text-center'>
          {/* Icono Principal con Efecto de Brillo */}
          <div className='relative mb-8'>
            <div className='absolute inset-0 bg-warning/20 blur-2xl rounded-full' />
            <div className='relative bg-zinc-900 border-2 border-zinc-800 p-5 rounded-3xl shadow-xl'>
              <HiOutlineRefresh
                className={`text-4xl text-warning ${isCleaning ? 'animate-spin' : ''}`}
              />
            </div>
          </div>

          <h2 className='text-2xl font-black text-white tracking-tighter mb-3 uppercase italic'>
            Sincronización de Versión
          </h2>

          <p className='text-zinc-400 text-sm leading-relaxed mb-8'>
            Se ha detectado una actualización en el sistema de aberturas.
            Necesitamos limpiar los datos antiguos para asegurar que las nuevas
            fórmulas y medidas funcionen correctamente.
          </p>

          <Divider className='bg-zinc-800 mb-8' />

          {!isCleaning ? (
            <div className='w-full space-y-3'>
              <Button
                onPress={handleClearData}
                color='warning'
                variant='shadow'
                size='lg'
                fullWidth
                className='font-black h-14 rounded-2xl text-black'
                startContent={<HiOutlineTrash size={20} />}
              >
                LIMPIAR Y ACTUALIZAR
              </Button>

              <div className='flex items-center justify-center gap-2 text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] mt-4'>
                <HiOutlineShieldCheck className='text-emerald-500 text-sm' />
                Datos de usuario protegidos
              </div>
            </div>
          ) : (
            <div className='w-full space-y-6'>
              <Progress
                aria-label='Progreso de limpieza'
                value={progress}
                color='warning'
                size='md'
                className='max-w-md'
                showValueLabel={true}
                formatOptions={{ style: 'percent' }}
                classNames={{
                  base: 'max-w-md',
                  track: 'bg-zinc-800',
                  value: 'text-zinc-400 font-mono font-bold text-xs',
                }}
              />

              <div className='flex flex-col gap-1 items-center animate-pulse'>
                <span className='text-warning text-[10px] font-black uppercase tracking-widest'>
                  {progress < 100
                    ? 'Eliminando caché de medidas...'
                    : '¡Hecho! Reiniciando app'}
                </span>
                <HiOutlineExclamation className='text-warning/50' />
              </div>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Marca de agua o versión al pie */}
      <div className='absolute bottom-8 text-[10px] text-zinc-700 font-bold uppercase tracking-[0.5em]'>
        System Core v2.0.6 • 2026
      </div>
    </div>
  )
}

export default RestablecerLocalStorage
