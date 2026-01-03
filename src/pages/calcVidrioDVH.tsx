import DefaultLayout from '@/layouts/default'
import React, { useState, useMemo, FC } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Input,
  Divider,
  Chip,
  ButtonGroup,
} from '@heroui/react' // Asegúrate de que la librería esté instalada
import {
  LuRuler,
  LuLayoutGrid,
  LuInfo,
  LuTag,
  LuTrendingUp,
} from 'react-icons/lu'

// --- INTERFACES & CONSTANTES (Se mantienen igual) ---
interface VidrioConfig {
  nombre: string
  precioM2: number
  abreviatura: string
}
interface CamaraConfig {
  nombre: string
  precioML: number
  valor: number
}
interface Dimensiones {
  ancho: number
  alto: number
}
type VidrioTipo = 'float' | 'laminado'
type CamaraId = '9' | '12'

const FACTOR_GANANCIA = 2.16
const MINIMO_M2_POR_PAÑO = 0.03

const OPCIONES_VIDRIO: Record<VidrioTipo, VidrioConfig> = {
  float: { nombre: 'Float 4mm', precioM2: 13115, abreviatura: '4' },
  laminado: { nombre: 'Laminado 3+3', precioM2: 44235, abreviatura: '3+3' },
}

const OPCIONES_CAMARA: Record<CamaraId, CamaraConfig> = {
  '9': { nombre: 'Cámara 9mm', precioML: 6300, valor: 9 },
  '12': { nombre: 'Cámara 12mm', precioML: 9200, valor: 12 },
}

const CalculadorVidrioDVH: FC = () => {
  const [dimensiones, setDimensiones] = useState<Dimensiones>({
    ancho: 1000,
    alto: 1000,
  })
  const [vidrio1, setVidrio1] = useState<VidrioTipo>('float')
  const [vidrio2, setVidrio2] = useState<VidrioTipo>('float')
  const [camaraId, setCamaraId] = useState<CamaraId>('9')

  const resultados = useMemo(() => {
    const { ancho: A, alto: H } = dimensiones
    let anchoVidrio = A / 2 - 76
    let altoVidrio = H - 171
    anchoVidrio = Math.max(0, anchoVidrio)
    altoVidrio = Math.max(0, altoVidrio)

    const cantPañosDVH = 2
    const m2IndividualReal = (anchoVidrio * altoVidrio) / 1000000
    const m2FacturablePorCara = Math.max(m2IndividualReal, MINIMO_M2_POR_PAÑO)

    const m2TotalesVidrio1 = m2FacturablePorCara * cantPañosDVH
    const m2TotalesVidrio2 = m2FacturablePorCara * cantPañosDVH

    const costoVidrio1 = m2TotalesVidrio1 * OPCIONES_VIDRIO[vidrio1].precioM2
    const costoVidrio2 = m2TotalesVidrio2 * OPCIONES_VIDRIO[vidrio2].precioM2
    const costoTotalVidrios = costoVidrio1 + costoVidrio2

    const precioMetroCamaraActual = OPCIONES_CAMARA[camaraId].precioML
    const mlPorPaño = ((anchoVidrio + altoVidrio) * 2) / 1000
    const mlTotales = mlPorPaño * cantPañosDVH
    const costoTotalCamara = mlTotales * precioMetroCamaraActual

    const costoBaseTotal = costoTotalVidrios + costoTotalCamara
    const precioVentaFinal = costoBaseTotal * FACTOR_GANANCIA
    const utilidadTotal = precioVentaFinal - costoBaseTotal

    return {
      m2IndividualReal,
      m2FacturablePorCara,
      m2TotalesVidrio1,
      m2TotalesVidrio2,
      anchoVidrio,
      altoVidrio,
      cantPañosDVH,
      mlTotales,
      costoTotalCamara,
      precioMetroCamaraActual,
      costoVidrio1,
      costoVidrio2,
      costoTotalVidrios,
      costoBaseTotal,
      precioVentaFinal,
      utilidadTotal,
      composicion: `${OPCIONES_VIDRIO[vidrio1].abreviatura}-${OPCIONES_CAMARA[camaraId].valor}-${OPCIONES_VIDRIO[vidrio2].abreviatura}`,
      esMinimoAplicado: m2IndividualReal < MINIMO_M2_POR_PAÑO,
    }
  }, [dimensiones, vidrio1, vidrio2, camaraId])

  return (
    <DefaultLayout>
      <div className='min-h-screen bg-content2 p-4 md:p-8 font-sans'>
        <div className='max-w-5xl mx-auto'>
          <header className='mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4'>
            <div className='space-y-1'>
              <div className='flex items-center gap-3'>
                <h1 className='text-3xl font-extrabold tracking-tight'>
                  Cotizador <span className='text-primary'>MODENA</span>
                </h1>
                <Chip
                  color='primary'
                  variant='flat'
                  size='sm'
                  className='font-bold italic'
                >
                  {resultados.composicion}
                </Chip>
              </div>
              <p className='text-default-500 text-xs uppercase tracking-widest font-bold'>
                Precio Final Consumidor
              </p>
            </div>
            <Chip
              startContent={<LuTag size={14} />}
              variant='dot'
              color='primary'
              className='border-none bg-content1 shadow-sm px-4 h-10'
            >
              PRESUPUESTO COMERCIAL
            </Chip>
          </header>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            {/* --- PANEL DE CONFIGURACIÓN --- */}
            <div className='space-y-6'>
              <Card className='p-2 shadow-sm border-none bg-content1'>
                <CardHeader className='flex gap-2 items-center'>
                  <div className='p-2 bg-primary/10 rounded-lg text-primary'>
                    <LuRuler size={20} />
                  </div>
                  <p className='text-sm font-bold uppercase tracking-wider'>
                    Configuración
                  </p>
                </CardHeader>
                <CardBody className='space-y-6'>
                  <SelectorVidrioHero
                    label='Vidrio Exterior'
                    actual={vidrio1}
                    set={setVidrio1}
                  />

                  <div className='space-y-2'>
                    <label className='text-[10px] font-black text-default-400 uppercase tracking-widest ml-1'>
                      Cámara Separadora
                    </label>
                    <ButtonGroup fullWidth size='sm' variant='flat'>
                      {(['9', '12'] as CamaraId[]).map((id) => (
                        <Button
                          key={id}
                          className={
                            camaraId === id
                              ? 'bg-primary text-primary-foreground font-bold'
                              : ''
                          }
                          onClick={() => setCamaraId(id)}
                        >
                          {id} mm
                        </Button>
                      ))}
                    </ButtonGroup>
                  </div>

                  <SelectorVidrioHero
                    label='Vidrio Interior'
                    actual={vidrio2}
                    set={setVidrio2}
                  />

                  <Divider className='my-2' />

                  <div className='space-y-4'>
                    <Input
                      type='number'
                      label='Ancho Ventana'
                      labelPlacement='outside'
                      placeholder='0'
                      endContent={
                        <span className='text-default-400 text-xs'>mm</span>
                      }
                      value={dimensiones.ancho.toString()}
                      onValueChange={(val) =>
                        setDimensiones((p) => ({ ...p, ancho: Number(val) }))
                      }
                      variant='bordered'
                    />
                    <Input
                      type='number'
                      label='Alto Ventana'
                      labelPlacement='outside'
                      placeholder='0'
                      endContent={
                        <span className='text-default-400 text-xs'>mm</span>
                      }
                      value={dimensiones.alto.toString()}
                      onValueChange={(val) =>
                        setDimensiones((p) => ({ ...p, alto: Number(val) }))
                      }
                      variant='bordered'
                    />
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* --- PANEL DE RESULTADOS --- */}
            <div className='lg:col-span-2 space-y-6'>
              <Card className='bg-slate-900 text-white p-4 overflow-hidden relative border-none'>
                <div className='absolute -right-4 -top-4 opacity-10 rotate-12'>
                  <LuTrendingUp size={160} />
                </div>
                <CardBody className='gap-1 relative z-10'>
                  <p className='text-primary text-xs font-bold uppercase tracking-widest'>
                    Presupuesto Final Sugerido
                  </p>
                  <div className='flex items-baseline gap-2'>
                    <span className='text-5xl font-black'>
                      ${' '}
                      {resultados.precioVentaFinal.toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })}
                    </span>
                    <span className='text-primary-300 text-sm font-medium'>
                      AR$
                    </span>
                  </div>
                  <div className='mt-6 flex flex-wrap gap-4'>
                    <div className='flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full'>
                      <div className='w-2 h-2 rounded-full bg-default-400' />
                      <span className='text-[10px] font-bold uppercase tracking-tighter opacity-80'>
                        Costo: ${resultados.costoBaseTotal.toLocaleString()}
                      </span>
                    </div>
                    <div className='flex items-center gap-2 bg-emerald-500/10 px-3 py-1.5 rounded-full'>
                      <div className='w-2 h-2 rounded-full bg-emerald-500' />
                      <span className='text-[10px] font-bold uppercase tracking-tighter text-emerald-400'>
                        Utilidad: ${resultados.utilidadTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card className='border-none shadow-sm'>
                <CardHeader className='flex justify-between px-6 pt-6'>
                  <div className='flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-default-600'>
                    <LuLayoutGrid size={18} className='text-primary' />
                    Detalle de Materiales
                  </div>
                </CardHeader>
                <CardBody className='px-6 py-4 space-y-6'>
                  <FilaHero
                    titulo='1. Paquetes de Vidrio (4 paños)'
                    monto={resultados.costoTotalVidrios}
                  >
                    <div className='flex justify-between text-xs text-default-500 px-1'>
                      <span>Ext: {OPCIONES_VIDRIO[vidrio1].nombre} (x2)</span>
                      <span>${resultados.costoVidrio1.toLocaleString()}</span>
                    </div>
                    <div className='flex justify-between text-xs text-default-500 px-1'>
                      <span>Int: {OPCIONES_VIDRIO[vidrio2].nombre} (x2)</span>
                      <span>${resultados.costoVidrio2.toLocaleString()}</span>
                    </div>
                  </FilaHero>

                  <FilaHero
                    titulo={`2. Cámara y Selladores (${OPCIONES_CAMARA[camaraId].nombre})`}
                    monto={resultados.costoTotalCamara}
                  >
                    <div className='flex justify-between text-xs text-default-500 px-1'>
                      <span>
                        Perímetro Total: {resultados.mlTotales.toFixed(2)} ml
                      </span>
                      <span className='italic'>
                        ${resultados.precioMetroCamaraActual}/ml
                      </span>
                    </div>
                  </FilaHero>

                  <div className='p-4 bg-default-50 rounded-2xl flex justify-between items-center border border-default-100'>
                    <span className='text-[10px] font-black text-default-400 uppercase tracking-widest'>
                      Subtotal Costo
                    </span>
                    <span className='text-xl font-black text-default-700'>
                      $ {resultados.costoBaseTotal.toLocaleString()}
                    </span>
                  </div>
                </CardBody>
                <CardFooter className='bg-primary-50/50 flex gap-3 p-4 items-start'>
                  <LuInfo className='text-primary mt-0.5' size={18} />
                  <div className='space-y-1'>
                    <p className='text-[11px] text-primary-700 font-semibold'>
                      DVH {resultados.composicion} para Modena 2 Hojas.
                    </p>
                    <p className='text-[11px] text-primary-600/70 italic leading-tight'>
                      Cálculo sobre 4 vidrios de{' '}
                      {resultados.anchoVidrio.toFixed(0)}x
                      {resultados.altoVidrio.toFixed(0)}mm
                      {resultados.esMinimoAplicado &&
                        ' (aplicado excedente mínimo)'}
                      .
                    </p>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

// --- SUBCOMPONENTES REFACCIONADOS ---

const SelectorVidrioHero: FC<{
  label: string
  actual: VidrioTipo
  set: (v: VidrioTipo) => void
}> = ({ label, actual, set }) => (
  <div className='space-y-2'>
    <label className='text-[10px] font-black text-default-400 uppercase tracking-widest ml-1'>
      {label}
    </label>
    <ButtonGroup fullWidth size='sm' variant='flat'>
      {(['float', 'laminado'] as VidrioTipo[]).map((tipo) => (
        <Button
          key={tipo}
          className={
            actual === tipo
              ? 'bg-primary text-primary-foreground font-bold'
              : ''
          }
          onClick={() => set(tipo)}
        >
          {OPCIONES_VIDRIO[tipo].nombre}
        </Button>
      ))}
    </ButtonGroup>
  </div>
)

const FilaHero: FC<{
  titulo: string
  monto: number
  children?: React.ReactNode
}> = ({ titulo, monto, children }) => (
  <div className='space-y-3'>
    <div className='flex justify-between items-center bg-default-50/50 p-2 rounded-lg'>
      <span className='text-[10px] font-bold text-default-500 uppercase tracking-wider'>
        {titulo}
      </span>
      <span className='text-sm font-bold'>
        $ {monto.toLocaleString(undefined, { maximumFractionDigits: 0 })}
      </span>
    </div>
    <div className='space-y-2 px-1'>{children}</div>
  </div>
)

export default CalculadorVidrioDVH
