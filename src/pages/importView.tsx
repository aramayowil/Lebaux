import { useState, useMemo, useEffect } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Select,
  SelectItem,
  Input,
  Button,
} from '@heroui/react'
import { preciosDB, RegistroPrecio } from '@/class/DB.class'
import DefaultLayout from '@/layouts/default'
import { FaCheckCircle, FaRegCopy, FaSearch } from 'react-icons/fa'

export default function VistaPrecios() {
  const [todosLosPrecios, setTodosLosPrecios] = useState<RegistroPrecio[]>([])
  const [archivoSeleccionado, setArchivoSeleccionado] = useState<string>('')
  const [filtroMedida, setFiltroMedida] = useState('')
  const [cargando, setCargando] = useState(true)
  const [copiadoId, setCopiadoId] = useState<string | null>(null)

  const cargarDatos = async () => {
    try {
      setCargando(true)
      // Cambio clave: await para IndexedDB
      const data = await preciosDB.getAll()
      setTodosLosPrecios(data)
    } catch (error) {
      console.error('Error al leer IndexedDB:', error)
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarDatos()
  }, [])

  const listaArchivos = useMemo(() => {
    const nombres = new Set<string>()
    todosLosPrecios.forEach((p) => {
      if (p.archivo) nombres.add(p.archivo)
    })
    return Array.from(nombres)
  }, [todosLosPrecios])

  const datosFiltrados = useMemo(() => {
    return todosLosPrecios.filter((p) => {
      const coincideArchivo = p.archivo === archivoSeleccionado
      const coincideFiltro = `${p.ancho}x${p.alto}`.includes(filtroMedida)
      return coincideArchivo && coincideFiltro
    })
  }, [todosLosPrecios, archivoSeleccionado, filtroMedida])

  const columnas = useMemo(() => {
    const keys = new Set<string>()
    datosFiltrados.forEach((reg) => {
      if (reg.precios) Object.keys(reg.precios).forEach((k) => keys.add(k))
    })
    const cols = [{ key: 'medida', label: 'MEDIDAS (Ancho x Alto)' }]
    Array.from(keys)
      .sort()
      .forEach((key) => {
        cols.push({ key: key, label: key.toUpperCase() })
      })
    return cols
  }, [datosFiltrados])

  useEffect(() => {
    if (listaArchivos.length > 0 && !archivoSeleccionado) {
      setArchivoSeleccionado(listaArchivos[0])
    }
  }, [listaArchivos, archivoSeleccionado])

  const manejarCopiado = (valor: number, id: string) => {
    navigator.clipboard.writeText(valor.toString())
    setCopiadoId(id)
    setTimeout(() => setCopiadoId(null), 1500)
  }

  return (
    <DefaultLayout>
      <div className='max-w-[1200px] mx-auto p-6 space-y-8'>
        {/* Cabecera */}
        <header className='flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-800 pb-8'>
          <div>
            <h1 className='text-xl font-bold tracking-tight text-white flex items-center gap-3'>
              <span className='w-1 h-6 bg-warning rounded-full' />
              Lista de Precios
            </h1>
            <p className='text-zinc-500 text-sm mt-1'>
              Visualización centralizada • lebaux_db
            </p>
          </div>

          <div className='flex items-center gap-3'>
            <Input
              isClearable
              className='w-64'
              placeholder='Filtrar medidas...'
              startContent={<FaSearch className='text-zinc-600' />}
              variant='bordered'
              size='sm'
              onValueChange={setFiltroMedida}
            />
            <Select
              className='w-48'
              size='sm'
              variant='bordered'
              aria-label='Seleccionar archivo'
              selectedKeys={archivoSeleccionado ? [archivoSeleccionado] : []}
              onChange={(e) => setArchivoSeleccionado(e.target.value)}
            >
              {listaArchivos.map((n) => (
                <SelectItem key={n} textValue={n}>
                  {n.replace('.csv', '').toUpperCase()}
                </SelectItem>
              ))}
            </Select>
          </div>
        </header>

        {/* Tabla */}
        <Table
          aria-label='Precios Lebaux'
          isHeaderSticky
          removeWrapper
          classNames={{
            base: 'max-h-[65vh] overflow-y-auto rounded-lg border border-zinc-800/50',
            th: 'bg-zinc-900 text-zinc-400 font-bold text-[11px] uppercase tracking-wider py-5 px-6 border-b border-zinc-800 text-left',
            td: 'px-6 py-4 group-hover:bg-warning/5 transition-colors',
            tbody: 'bg-zinc-900/30',
          }}
        >
          <TableHeader columns={columnas}>
            {(column) => (
              <TableColumn key={column.key} align='start'>
                {column.label}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={datosFiltrados}
            emptyContent={
              cargando
                ? 'Accediendo a IndexedDB...'
                : 'No se encontraron registros'
            }
          >
            {(item) => (
              <TableRow
                key={item.id}
                className='border-b border-zinc-800/20 last:border-none'
              >
                {(columnKey) => (
                  <TableCell>
                    {columnKey === 'medida' ? (
                      <div className='flex items-center gap-2'>
                        <span className='font-bold text-zinc-100'>
                          {item.ancho}
                        </span>
                        <span className='text-zinc-600 font-light text-xs'>
                          x
                        </span>
                        <span className='font-bold text-zinc-100'>
                          {item.alto}
                        </span>
                      </div>
                    ) : (
                      <div className='flex items-center justify-start gap-4'>
                        <span className='font-mono text-sm font-semibold text-zinc-300 min-w-[85px]'>
                          {item.precios[columnKey as string]
                            ? `$ ${item.precios[columnKey as string].toLocaleString('es-AR')}`
                            : '—'}
                        </span>

                        {item.precios[columnKey as string] && (
                          <Button
                            isIconOnly
                            size='sm'
                            variant='flat'
                            className={`h-7 w-7 min-w-7 rounded-md transition-all duration-300 ${
                              copiadoId === `${item.id}-${columnKey}`
                                ? 'bg-success/20 text-success scale-110'
                                : 'bg-zinc-800/40 text-zinc-500 hover:text-warning hover:bg-zinc-800'
                            }`}
                            onPress={() =>
                              manejarCopiado(
                                item.precios[columnKey as string],
                                `${item.id}-${columnKey}`,
                              )
                            }
                          >
                            {copiadoId === `${item.id}-${columnKey}` ? (
                              <FaCheckCircle
                                size={14}
                                className='animate-in zoom-in duration-300'
                              />
                            ) : (
                              <FaRegCopy size={13} />
                            )}
                          </Button>
                        )}
                      </div>
                    )}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Footer info */}
        <footer className='flex justify-between items-center text-[10px] text-zinc-600 font-medium uppercase tracking-widest pt-2'>
          <div className='flex gap-4'>
            <span>{datosFiltrados.length} Registros en vista</span>
            {datosFiltrados[0]?.fechaActualizacion && (
              <span>Actualizado: {datosFiltrados[0].fechaActualizacion}</span>
            )}
          </div>
          <span className='flex items-center gap-2'>
            <span className='w-1.5 h-1.5 rounded-full bg-success animate-pulse' />
            IndexedDB: lebaux_db activa
          </span>
        </footer>
      </div>
    </DefaultLayout>
  )
}
