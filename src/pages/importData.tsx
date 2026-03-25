import { useState } from 'react'
import Papa from 'papaparse'
import { Button, Card, Chip } from '@heroui/react'
import { HiOutlineCloudUpload, HiCheckCircle, HiXCircle } from 'react-icons/hi'
import { preciosDB, RegistroPrecio } from '@/class/DB.class'
import DefaultLayout from '@/layouts/default'

export default function VistaImportacion() {
  const [cargando, setCargando] = useState(false)
  const [logs, setLogs] = useState<
    { nombre: string; estado: 'ok' | 'error'; detalle: string }[]
  >([])

  const limpiarPrecio = (valor: any): number => {
    if (valor === undefined || valor === null || valor === '') return 0

    // 1. Limpiar símbolos y espacios
    let str = String(valor).trim().replace('$', '').replace(/\s/g, '')

    // 2. Identificar el separador decimal real
    // Buscamos la posición del último punto y la última coma
    const lastDot = str.lastIndexOf('.')
    const lastComma = str.lastIndexOf(',')

    // El que esté más al final es nuestro separador decimal
    const deciSeparator = lastDot > lastComma ? '.' : ','

    if (deciSeparator === '.') {
      // Formato 178,040.00 -> Quitamos comas, mantenemos punto
      str = str.replace(/,/g, '')
    } else {
      // Formato 178.040,00 -> Quitamos puntos, cambiamos coma por punto
      str = str.replace(/\./g, '').replace(',', '.')
    }

    // 3. Extraer solo números y el punto decimal final
    const soloNumerosPunto = str.replace(/[^0-9.]/g, '')

    const resultado = parseFloat(soloNumerosPunto)
    return isNaN(resultado) ? 0 : resultado
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setCargando(true)
    setLogs([])

    for (const file of Array.from(files)) {
      try {
        await procesarArchivo(file)
        setLogs((prev) => [
          ...prev,
          {
            nombre: file.name,
            estado: 'ok',
            detalle: 'Importado Independiente',
          },
        ])
      } catch (error: any) {
        setLogs((prev) => [
          ...prev,
          { nombre: file.name, estado: 'error', detalle: 'Error de proceso' },
        ])
      }
    }
    setCargando(false)
    e.target.value = ''
  }

  const procesarArchivo = (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        delimiter: ';',
        transformHeader: (h) => h.trim(),
        complete: (results) => {
          try {
            const headersOriginales = Object.keys(results.data[0] || {})
            // Nombre del archivo como identificador de grupo
            const nombreArchivo = file.name
            const tipologia = file.name.split('.')[0]

            const registros: RegistroPrecio[] = results.data
              .map((fila: any) => {
                const colMedida =
                  headersOriginales.find((h) =>
                    String(fila[h]).toLowerCase().includes('x'),
                  ) || headersOriginales[0]

                const medidaRaw = fila[colMedida]
                if (
                  !medidaRaw ||
                  !String(medidaRaw).toLowerCase().includes('x')
                )
                  return null

                const preciosDinamicos: Record<string, number> = {}

                headersOriginales.forEach((header) => {
                  if (header === colMedida) return
                  const valor = limpiarPrecio(fila[header])
                  if (valor > 0) {
                    preciosDinamicos[header] = valor
                  }
                })

                const partes = String(medidaRaw).toLowerCase().split('x')

                return {
                  // EL ID ahora incluye el nombre del archivo para que sean independientes
                  id: `${nombreArchivo}-${medidaRaw}`
                    .toLowerCase()
                    .replace(/\s+/g, '-'),
                  linea: 'Modena',
                  tipologia: tipologia,
                  archivo: nombreArchivo, // Guardamos la fuente para filtrar en la tabla
                  ancho: parseInt(partes[0].trim()) || 0,
                  alto: parseInt(partes[1].trim()) || 0,
                  precios: preciosDinamicos,
                  fechaActualizacion: new Date().toLocaleDateString('es-AR'),
                }
              })
              .filter((r): r is RegistroPrecio => r !== null)

            if (registros.length > 0) {
              // bulkPut actualizará si el ID (Archivo + Medida) ya existe,
              // pero no tocará datos de otros archivos.
              preciosDB.bulkPut(registros)
              resolve()
            } else {
              reject(new Error('Sin datos válidos'))
            }
          } catch (err) {
            reject(err)
          }
        },
        error: (error) => reject(error),
      })
    })
  }

  return (
    <DefaultLayout>
      <div className='max-w-2xl mx-auto p-6 space-y-6'>
        <div className='flex items-center gap-3 mb-2'>
          <div className='h-8 w-1 bg-warning rounded-full' />
          <h1 className='text-2xl font-black text-white uppercase italic tracking-tighter'>
            Importación <span className='text-warning'>Separada</span>
          </h1>
        </div>

        <Card className='bg-zinc-900/60 border-2 border-dashed border-zinc-800 p-10 flex flex-col items-center gap-6'>
          <HiOutlineCloudUpload size={48} className='text-warning' />
          <div className='text-center space-y-1'>
            <p className='text-zinc-200 font-bold text-lg tracking-tight uppercase italic'>
              Cargar Listas Independientes
            </p>
            <p className='text-zinc-500 text-xs px-4'>
              Cada archivo generará su propio set de datos y columnas sin
              sobreescribir otros archivos.
            </p>
          </div>

          <input
            type='file'
            multiple
            accept='.csv'
            onChange={handleFileChange}
            className='hidden'
            id='file-upload'
            disabled={cargando}
          />

          <label htmlFor='file-upload'>
            <Button
              as='span'
              color='warning'
              variant='shadow'
              size='lg'
              className='font-black uppercase italic px-10'
              isLoading={cargando}
            >
              {cargando ? 'Procesando...' : 'Seleccionar Archivos'}
            </Button>
          </label>
        </Card>

        <div className='space-y-3'>
          {logs.map((log, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-4 rounded-2xl border ${log.estado === 'ok' ? 'bg-success/5 border-success/20 text-success' : 'bg-danger/5 border-danger/20 text-danger'}`}
            >
              <div className='flex items-center gap-3'>
                {log.estado === 'ok' ? (
                  <HiCheckCircle size={22} />
                ) : (
                  <HiXCircle size={22} />
                )}
                <span className='font-mono text-xs font-bold text-zinc-300'>
                  {log.nombre}
                </span>
              </div>
              <Chip
                size='sm'
                variant='flat'
                color={log.estado === 'ok' ? 'success' : 'danger'}
                className='font-black uppercase text-[10px]'
              >
                {log.detalle}
              </Chip>
            </div>
          ))}
        </div>
      </div>
    </DefaultLayout>
  )
}
