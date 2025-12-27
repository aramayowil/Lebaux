import { useState, useEffect, useMemo } from 'react'
import { Stage, Layer, Group, Rect, Text } from 'react-konva'
import { v4 as uuidv4 } from 'uuid'

// CONSTANTES BASE
const ESCALA_BASE = 0.2 // ELIMINADO: Ahora es 0 para que se toquen
const PADDING_STAGE = 100
const STORAGE_KEY = 'diseno_modulos_pro_editor'

export interface Modulo {
  id: string
  x: number
  y: number
  tipo: string
  ancho: number
  alto: number
}

export default function Configurador() {
  const [modulos, setModulos] = useState<Modulo[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [targetCoords, setTargetCoords] = useState<{
    x: number
    y: number
  } | null>(null)
  const [tipo, setTipo] = useState<string>('Paño Fijo')
  const [ancho, setAncho] = useState<number>(1200)
  const [alto, setAlto] = useState<number>(1000)
  const [winSize, setWinSize] = useState({ width: 1000, height: 800 })

  useEffect(() => {
    setWinSize({ width: window.innerWidth, height: window.innerHeight })
    const handleResize = () =>
      setWinSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(modulos))
  }, [modulos])

  // CÁLCULO DE POSICIÓN SIN GAP
  const obtenerPosicionVisual = (coordX: number, coordY: number) => {
    let visualX = 0
    let visualY = 0

    if (coordX > 0) {
      for (let i = 0; i < coordX; i++) {
        const m =
          modulos.find((mod) => mod.x === i && mod.y === coordY) ||
          modulos.find((mod) => mod.x === i)
        visualX += (m?.ancho || 1200) * ESCALA_BASE
      }
    } else if (coordX < 0) {
      for (let i = -1; i >= coordX; i--) {
        const m =
          modulos.find((mod) => mod.x === i && mod.y === coordY) ||
          modulos.find((mod) => mod.x === i)
        visualX -= (m?.ancho || 1200) * ESCALA_BASE
      }
    }

    if (coordY > 0) {
      for (let j = 0; j < coordY; j++) {
        const m =
          modulos.find((mod) => mod.y === j && mod.x === coordX) ||
          modulos.find((mod) => mod.y === j)
        visualY += (m?.alto || 1000) * ESCALA_BASE
      }
    } else if (coordY < 0) {
      for (let j = -1; j >= coordY; j--) {
        const m =
          modulos.find((mod) => mod.y === j && mod.x === coordX) ||
          modulos.find((mod) => mod.y === j)
        visualY -= (m?.alto || 1000) * ESCALA_BASE
      }
    }
    return { x: visualX, y: visualY }
  }

  const layoutCalculado = useMemo(() => {
    if (modulos.length === 0)
      return { x: winSize.width / 2, y: winSize.height / 2, zoom: 1 }

    const bordes = modulos.map((m) => {
      const pos = obtenerPosicionVisual(m.x, m.y)
      return {
        left: pos.x,
        top: pos.y,
        right: pos.x + m.ancho * ESCALA_BASE,
        bottom: pos.y + m.alto * ESCALA_BASE,
      }
    })

    const minX = Math.min(...bordes.map((b) => b.left))
    const maxX = Math.max(...bordes.map((b) => b.right))
    const minY = Math.min(...bordes.map((b) => b.top))
    const maxY = Math.max(...bordes.map((b) => b.bottom))

    const anchoTotal = maxX - minX
    const altoTotal = maxY - minY

    const zoomX = (winSize.width - PADDING_STAGE) / anchoTotal
    const zoomY = (winSize.height - PADDING_STAGE - 100) / altoTotal
    const zoomFinal = Math.min(zoomX, zoomY, 1)

    return {
      x: winSize.width / 2 - (anchoTotal * zoomFinal) / 2 - minX * zoomFinal,
      y: winSize.height / 2 - (altoTotal * zoomFinal) / 2 - minY * zoomFinal,
      zoom: zoomFinal,
    }
  }, [modulos, winSize])

  const estaOcupado = (x: number, y: number) =>
    modulos.some((m) => m.x === x && m.y === y)

  const handleConfirmar = () => {
    if (isEditing) {
      setModulos(
        modulos.map((m) =>
          m.id === selectedId ? { ...m, tipo, ancho, alto } : m,
        ),
      )
    } else {
      const coords = targetCoords || { x: 0, y: 0 }
      const nuevo: Modulo = {
        id: uuidv4(),
        x: coords.x,
        y: coords.y,
        tipo,
        ancho,
        alto,
      }
      setModulos([...modulos, nuevo])
      setSelectedId(nuevo.id)
    }
    setShowModal(false)
  }

  return (
    <div className='flex h-screen bg-slate-100 flex-col uppercase font-sans overflow-hidden'>
      {/* Header */}
      <div className='p-4 bg-slate-900 flex justify-between items-center text-white shadow-xl z-10'>
        <div className='flex items-center gap-6'>
          <h1 className='font-black text-xl italic text-blue-400 tracking-tighter'>
            PRO-EDITOR
          </h1>
          {selectedId && (
            <div className='flex gap-2'>
              <button
                onClick={() => {
                  const m = modulos.find((mod) => mod.id === selectedId)
                  if (m) {
                    setTipo(m.tipo)
                    setAncho(m.ancho)
                    setAlto(m.alto)
                    setIsEditing(true)
                    setShowModal(true)
                  }
                }}
                className='px-4 py-2 bg-blue-600 text-[10px] font-black rounded-sm'
              >
                MODIFICAR
              </button>
              <button
                onClick={() => {
                  if (window.confirm('¿ELIMINAR?')) {
                    setModulos(modulos.filter((m) => m.id !== selectedId))
                    setSelectedId(null)
                  }
                }}
                className='px-4 py-2 bg-red-600 text-[10px] font-black rounded-sm'
              >
                ELIMINAR
              </button>
            </div>
          )}
        </div>
        <button
          onClick={() => setModulos([])}
          className='px-4 py-2 border border-slate-600 text-slate-400 text-[10px] font-black rounded-sm'
        >
          REINICIAR
        </button>
      </div>

      <div className='grow relative'>
        {modulos.length === 0 ? (
          <div className='flex h-full items-center justify-center'>
            <button
              onClick={() => {
                setTargetCoords({ x: 0, y: 0 })
                setIsEditing(false)
                setShowModal(true)
              }}
              className='p-8 border-2 border-dashed border-slate-300 rounded-xl hover:border-blue-500 transition-all'
            >
              <span className='block text-3xl mb-2'>+</span>
              <span className='text-[10px] font-black text-slate-400'>
                CREAR PAÑO INICIAL
              </span>
            </button>
          </div>
        ) : (
          <Stage
            width={winSize.width}
            height={winSize.height}
            onClick={(e) =>
              e.target === e.target.getStage() && setSelectedId(null)
            }
          >
            <Layer
              x={layoutCalculado.x}
              y={layoutCalculado.y}
              scaleX={layoutCalculado.zoom}
              scaleY={layoutCalculado.zoom}
            >
              {modulos.map((m) => {
                const pos = obtenerPosicionVisual(m.x, m.y)
                const anchoPx = m.ancho * ESCALA_BASE
                const altoPx = m.alto * ESCALA_BASE
                const isSelected = selectedId === m.id

                return (
                  <Group key={m.id} x={pos.x} y={pos.y}>
                    <Rect
                      width={anchoPx}
                      height={altoPx}
                      fill='white'
                      stroke={isSelected ? '#2563eb' : '#1e293b'}
                      strokeWidth={
                        isSelected
                          ? 2 / layoutCalculado.zoom
                          : 1 / layoutCalculado.zoom
                      }
                      // strokeScaleEnabled={false} // Evita que el borde cambie de grosor al hacer zoom
                      onClick={() => setSelectedId(m.id)}
                    />
                    <Text
                      text={`${m.tipo}\n${m.ancho}x${m.alto}mm`}
                      width={anchoPx}
                      height={altoPx}
                      align='center'
                      verticalAlign='middle'
                      fontSize={9}
                      fontStyle='bold'
                      listening={false}
                    />
                    {isSelected && (
                      <>
                        {!estaOcupado(m.x + 1, m.y) && (
                          <BotonPlus
                            x={anchoPx + 10 / layoutCalculado.zoom}
                            y={altoPx / 2}
                            onClick={() => {
                              setTargetCoords({ x: m.x + 1, y: m.y })
                              setIsEditing(false)
                              setShowModal(true)
                            }}
                          />
                        )}
                        {!estaOcupado(m.x - 1, m.y) && (
                          <BotonPlus
                            x={-(10 / layoutCalculado.zoom)}
                            y={altoPx / 2}
                            onClick={() => {
                              setTargetCoords({ x: m.x - 1, y: m.y })
                              setIsEditing(false)
                              setShowModal(true)
                            }}
                          />
                        )}
                        {!estaOcupado(m.x, m.y + 1) && (
                          <BotonPlus
                            x={anchoPx / 2}
                            y={altoPx + 10 / layoutCalculado.zoom}
                            onClick={() => {
                              setTargetCoords({ x: m.x, y: m.y + 1 })
                              setIsEditing(false)
                              setShowModal(true)
                            }}
                          />
                        )}
                        {!estaOcupado(m.x, m.y - 1) && (
                          <BotonPlus
                            x={anchoPx / 2}
                            y={-(10 / layoutCalculado.zoom)}
                            onClick={() => {
                              setTargetCoords({ x: m.x, y: m.y - 1 })
                              setIsEditing(false)
                              setShowModal(true)
                            }}
                          />
                        )}
                      </>
                    )}
                  </Group>
                )
              })}
            </Layer>
          </Stage>
        )}
      </div>

      {/* Modal - Configuración */}
      {showModal && (
        <div className='fixed inset-0 bg-slate-900/70 flex items-center justify-center z-50 backdrop-blur-sm'>
          <div className='bg-white p-8 rounded-sm w-88 shadow-2xl border-t-8 border-slate-900'>
            <h2 className='text-lg font-black mb-6 italic text-slate-800 uppercase'>
              Configuración
            </h2>
            <div className='space-y-4'>
              <div>
                <label className='text-[9px] font-black text-slate-400'>
                  ANCHO (MM)
                </label>
                <input
                  type='number'
                  className='w-full p-2 border'
                  value={ancho}
                  onChange={(e) => setAncho(Number(e.target.value))}
                />
              </div>
              <div>
                <label className='text-[9px] font-black text-slate-400'>
                  ALTO (MM)
                </label>
                <input
                  type='number'
                  className='w-full p-2 border'
                  value={alto}
                  onChange={(e) => setAlto(Number(e.target.value))}
                />
              </div>
              <div>
                <label className='text-[9px] font-black text-slate-400'>
                  TIPO
                </label>
                <select
                  className='w-full p-2 border'
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                >
                  <option value='Paño Fijo'>Paño Fijo</option>
                  <option value='Ventana Corrediza'>Ventana Corrediza</option>
                  <option value='Banderola'>Banderola</option>
                  <option value='Puerta'>Puerta</option>
                </select>
              </div>
            </div>
            <div className='flex justify-end gap-2 mt-8'>
              <button
                onClick={() => setShowModal(false)}
                className='px-4 py-2 bg-slate-100 font-black text-[10px]'
              >
                CANCELAR
              </button>
              <button
                onClick={handleConfirmar}
                className='px-4 py-2 bg-slate-900 text-white font-black text-[10px]'
              >
                CONFIRMAR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const BotonPlus = ({
  x,
  y,
  onClick,
}: {
  x: number
  y: number
  onClick: () => void
}) => (
  <Group
    x={x}
    y={y}
    onClick={(e) => {
      e.cancelBubble = true
      onClick()
    }}
    offsetX={8}
    offsetY={8}
  >
    <Rect width={16} height={16} fill='#1e293b' cornerRadius={8} />
    <Text
      text='+'
      fill='white'
      width={16}
      height={16}
      align='center'
      verticalAlign='middle'
      fontSize={12}
      fontStyle='bold'
    />
  </Group>
)
