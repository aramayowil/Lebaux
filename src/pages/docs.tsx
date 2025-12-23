import { useState, useEffect } from 'react' // Importamos useEffect
import { Stage, Layer, Group, Rect, Text } from 'react-konva'
import { v4 as uuidv4 } from 'uuid'
import { KonvaEventObject } from 'konva/lib/Node'

// CONSTANTES DE CONFIGURACIÓN
const ESCALA = 0.2
const INITIAL_OFFSET_X = 300
const INITIAL_OFFSET_Y = 300
const SPACING = 16
const GAP = 0.5
const STORAGE_KEY = 'diseno_modulos_pro_editor' // Clave para el storage

export interface Modulo {
  id: string
  x: number
  y: number
  tipo: string
  ancho: number
  alto: number
}

export default function Configurador() {
  // 1. CARGA INICIAL: Leemos del localStorage al arrancar
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

  // 2. GUARDADO AUTOMÁTICO: Cada vez que 'modulos' cambie, guardamos en storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(modulos))
  }, [modulos])

  const estaOcupado = (x: number, y: number) =>
    modulos.some((m) => m.x === x && m.y === y)

  const handleReiniciar = () => {
    if (window.confirm('¿BORRAR TODO EL DISEÑO Y EMPEZAR DE CERO?')) {
      setModulos([])
      setSelectedId(null)
      // Opcional: localStorage.removeItem(STORAGE_KEY)
    }
  }

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

  const obtenerPosicionVisual = (coordX: number, coordY: number) => {
    let visualX = 0
    let visualY = 0

    if (coordX > 0) {
      for (let i = 0; i < coordX; i++) {
        const m =
          modulos.find((mod) => mod.x === i && mod.y === coordY) ||
          modulos.find((mod) => mod.x === i)
        visualX += (m?.ancho || 0) * ESCALA + GAP
      }
    } else if (coordX < 0) {
      for (let i = -1; i >= coordX; i--) {
        const m =
          modulos.find((mod) => mod.x === i && mod.y === coordY) ||
          modulos.find((mod) => mod.x === i)
        visualX -= (m?.ancho || 0) * ESCALA + GAP
      }
    }

    if (coordY > 0) {
      for (let j = 0; j < coordY; j++) {
        const m =
          modulos.find((mod) => mod.y === j && mod.x === coordX) ||
          modulos.find((mod) => mod.y === j)
        visualY += (m?.alto || 0) * ESCALA + GAP
      }
    } else if (coordY < 0) {
      for (let j = -1; j >= coordY; j--) {
        const m =
          modulos.find((mod) => mod.y === j && mod.x === coordX) ||
          modulos.find((mod) => mod.y === j)
        visualY -= (m?.alto || 0) * ESCALA + GAP
      }
    }
    return { x: visualX, y: visualY }
  }

  return (
    <div className='flex h-screen bg-slate-100 flex-col uppercase font-sans overflow-hidden'>
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
                  if (window.confirm('¿ELIMINAR PAÑO?')) {
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
        <div className='flex gap-3'>
          {modulos.length > 0 && (
            <button
              onClick={handleReiniciar}
              className='px-4 py-2 border border-slate-600 text-slate-400 hover:text-white hover:border-white text-[10px] font-black rounded-sm transition-all'
            >
              Reiniciar Diseño
            </button>
          )}
        </div>
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
              className='p-8 border-2 border-dashed border-slate-300 rounded-xl hover:border-blue-500 transition-all group'
            >
              <span className='block text-3xl mb-2 group-hover:scale-125'>
                +
              </span>
              <span className='text-[10px] font-black text-slate-400 group-hover:text-blue-500'>
                CREAR PAÑO INICIAL
              </span>
            </button>
          </div>
        ) : (
          <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            onClick={(e) =>
              e.target === e.target.getStage() && setSelectedId(null)
            }
          >
            <Layer x={INITIAL_OFFSET_X} y={INITIAL_OFFSET_Y}>
              {modulos.map((m) => {
                const pos = obtenerPosicionVisual(m.x, m.y)
                const anchoPx = m.ancho * ESCALA
                const altoPx = m.alto * ESCALA
                const isSelected = selectedId === m.id

                return (
                  <Group key={m.id} x={pos.x} y={pos.y}>
                    <Rect
                      width={anchoPx}
                      height={altoPx}
                      fill='white'
                      stroke={isSelected ? '#2563eb' : '#334155'}
                      strokeWidth={isSelected ? 3 : 1}
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
                            x={anchoPx + SPACING}
                            y={12}
                            onClick={() => {
                              setTargetCoords({ x: m.x + 1, y: m.y })
                              setIsEditing(false)
                              setShowModal(true)
                            }}
                          />
                        )}
                        {!estaOcupado(m.x - 1, m.y) && (
                          <BotonPlus
                            x={-SPACING}
                            y={12}
                            onClick={() => {
                              setTargetCoords({ x: m.x - 1, y: m.y })
                              setIsEditing(false)
                              setShowModal(true)
                            }}
                          />
                        )}
                        {!estaOcupado(m.x, m.y + 1) && (
                          <BotonPlus
                            x={12}
                            y={altoPx + SPACING}
                            onClick={() => {
                              setTargetCoords({ x: m.x, y: m.y + 1 })
                              setIsEditing(false)
                              setShowModal(true)
                            }}
                          />
                        )}
                        {!estaOcupado(m.x, m.y - 1) && (
                          <BotonPlus
                            x={12}
                            y={-SPACING}
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

      {showModal && (
        <div className='fixed inset-0 bg-slate-900/70 flex items-center justify-center z-50 backdrop-blur-sm'>
          <div className='bg-white p-8 rounded-sm w-88 shadow-2xl border-t-8 border-slate-900'>
            <h2 className='text-lg font-black mb-6 italic text-slate-800 uppercase'>
              Configuración
            </h2>
            <div className='space-y-4'>
              <div>
                <label className='block text-[9px] font-black text-slate-400 mb-1'>
                  ANCHO (MM)
                </label>
                <input
                  type='number'
                  className='w-full p-2 border font-bold'
                  value={ancho}
                  onChange={(e) => setAncho(Number(e.target.value))}
                />
              </div>
              <div>
                <label className='block text-[9px] font-black text-slate-400 mb-1'>
                  ALTO (MM)
                </label>
                <input
                  type='number'
                  className='w-full p-2 border font-bold'
                  value={alto}
                  onChange={(e) => setAlto(Number(e.target.value))}
                />
              </div>
              <div>
                <label className='block text-[9px] font-black text-slate-400 mb-1 uppercase'>
                  Tipo
                </label>
                <select
                  className='w-full p-2 border font-bold uppercase'
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
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Group
      x={x}
      y={y}
      onClick={(e) => {
        e.cancelBubble = true
        onClick()
      }}
      offsetX={12}
      offsetY={12}
      onMouseEnter={(e: KonvaEventObject<MouseEvent>) => {
        setIsHovered(true)
        const stage = e.target.getStage()
        if (stage) stage.container().style.cursor = 'pointer'
      }}
      onMouseLeave={(e: KonvaEventObject<MouseEvent>) => {
        setIsHovered(false)
        const stage = e.target.getStage()
        if (stage) stage.container().style.cursor = 'default'
      }}
      scaleX={isHovered ? 1.15 : 1}
      scaleY={isHovered ? 1.15 : 1}
    >
      <Rect
        width={24}
        height={24}
        fill={isHovered ? '#3b82f6' : '#1e293b'}
        cornerRadius={4}
        shadowBlur={isHovered ? 8 : 0}
        shadowColor='#3b82f6'
        shadowOpacity={0.6}
      />
      <Text
        text='+'
        fill='white'
        width={24}
        height={24}
        align='center'
        verticalAlign='middle'
        fontSize={16}
        fontStyle='bold'
      />
    </Group>
  )
}
