import { useState, useEffect, useRef, useLayoutEffect, useMemo } from 'react'
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@heroui/react'
import {
  Stage,
  Layer,
  Group,
  Rect,
  Text,
  Image as KonvaImage,
} from 'react-konva'
import { v4 as uuidv4 } from 'uuid'
import { SiMaterialdesignicons } from 'react-icons/si'
import {
  HiOutlineTrash,
  HiX,
  HiAdjustments,
  HiCheckCircle,
} from 'react-icons/hi'
import { useImage } from 'react-konva-utils'
import ModalAgregar from '@/components/ui/modals/abertura_unificada/ModalAgregar'
import ModalResumenDiseno from './ModalConfirmar'

// --- NUEVAS INTERFACES ---
interface abertura {
  linea: string
  abertura: string
  ancho: number
  altura: number
  color: string
  vidrio: string
  cantidad: number
  precio: number
  codigo: string
  descripcion: string
  mosquitero: { checked: boolean; precio: number }
  premarco: { checked: boolean; precio: number }
  imgSrc: string
  variantKey: number
}

interface EstadoAbertura {
  id: string // Agregado para tracking de React/Konva
  abertura: abertura
  x: number // Posición lógica
  y: number // Posición lógica
}

const INITIAL_ESCALA = 0.2
const SPACING = 20
const PADDING_STAGE = 100
const STORAGE_KEY = 'diseno_modulos_compuesta'

// Componente de Imagen optimizado para Konva
const ImageContainer = ({
  src,
  width,
  height,
}: {
  src: string
  width: number
  height: number
}) => {
  const [image, status] = useImage(src)
  if (status !== 'loaded') return null
  return (
    <KonvaImage
      image={image}
      x={0}
      y={0}
      width={width}
      height={height}
      opacity={0.9}
    />
  )
}

export default function AberturaCompuesta() {
  // Estado principal: Array de aperturas configuradas
  const [modulos, setModulos] = useState<EstadoAbertura[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  const [abertura, setAbertura] = useState<EstadoAbertura>({
    id: '',
    abertura: {
      linea: 'modena',
      abertura: '',
      ancho: 1000,
      altura: 1000,
      color: 'blanco',
      vidrio: 'float4mm',
      cantidad: 1,
      precio: 0,
      codigo: '',
      descripcion: '',
      mosquitero: { checked: false, precio: 0 },
      premarco: { checked: false, precio: 0 },
      imgSrc: '',
      variantKey: 0,
    },
    x: 0,
    y: 0,
  })

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [lastSaved, setLastSaved] = useState(false)
  const {
    isOpen: isThisOpen,
    onOpen: onThisOpen,
    onOpenChange: onThisOpenChange,
  } = useDisclosure()
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Guardado automático
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(modulos))
    setLastSaved(true)
    const timer = setTimeout(() => setLastSaved(false), 2000)
    return () => clearTimeout(timer)
  }, [modulos])

  const updateSize = () => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current
      if (offsetWidth > 0 && offsetHeight > 0)
        setDimensions({ width: offsetWidth, height: offsetHeight })
    }
  }

  useLayoutEffect(() => {
    if (isThisOpen) {
      const timer = setTimeout(updateSize, 100)
      window.addEventListener('resize', updateSize)
      return () => {
        window.removeEventListener('resize', updateSize)
        clearTimeout(timer)
      }
    }
  }, [isThisOpen])

  const obtenerPosicionVisual = (coordX: number, coordY: number) => {
    let visualX = 0,
      visualY = 0
    if (coordX > 0) {
      for (let i = 0; i < coordX; i++)
        visualX +=
          (modulos.find((m) => m.x === i)?.abertura.ancho || 1000) *
          INITIAL_ESCALA
    } else if (coordX < 0) {
      for (let i = -1; i >= coordX; i--)
        visualX -=
          (modulos.find((m) => m.x === i)?.abertura.ancho || 1000) *
          INITIAL_ESCALA
    }
    if (coordY > 0) {
      for (let j = 0; j < coordY; j++)
        visualY +=
          (modulos.find((m) => m.y === j)?.abertura.altura || 1000) *
          INITIAL_ESCALA
    } else if (coordY < 0) {
      for (let j = -1; j >= coordY; j--)
        visualY -=
          (modulos.find((m) => m.y === j)?.abertura.altura || 1000) *
          INITIAL_ESCALA
    }
    return { x: visualX, y: visualY }
  }

  const transform = useMemo(() => {
    if (modulos.length === 0 || dimensions.width === 0)
      return { x: 50, y: 50, scale: 1 }
    const bounds = modulos.map((m) => {
      const pos = obtenerPosicionVisual(m.x, m.y)
      return {
        l: pos.x,
        r: pos.x + m.abertura.ancho * INITIAL_ESCALA,
        t: pos.y,
        b: pos.y + m.abertura.altura * INITIAL_ESCALA,
      }
    })
    const minX = Math.min(...bounds.map((b) => b.l)),
      maxX = Math.max(...bounds.map((b) => b.r))
    const minY = Math.min(...bounds.map((b) => b.t)),
      maxY = Math.max(...bounds.map((b) => b.b))
    const contentW = maxX - minX,
      contentH = maxY - minY
    const dynamicScale = Math.min(
      (dimensions.width - PADDING_STAGE) / (contentW || 1),
      (dimensions.height - PADDING_STAGE) / (contentH || 1),
      1,
    )
    return {
      x:
        dimensions.width / 2 -
        (contentW * dynamicScale) / 2 -
        minX * dynamicScale,
      y:
        dimensions.height / 2 -
        (contentH * dynamicScale) / 2 -
        minY * dynamicScale,
      scale: dynamicScale,
    }
  }, [modulos, dimensions])

  const handleConfirmarModulo = () => {
    if (isEditing) {
      setModulos(
        modulos.map((m) =>
          m.id === selectedId ? { ...abertura, id: m.id } : m,
        ),
      )
    } else {
      const nuevo: EstadoAbertura = { ...abertura, id: uuidv4() }
      setModulos([...modulos, nuevo])
      setSelectedId(nuevo.id)
    }
    setShowModal(false)
  }

  return (
    <>
      <Button
        onPress={onThisOpen}
        className='bg-zinc-950 text-zinc-300 border border-zinc-800 hover:border-zinc-600 h-10 px-6 font-bold rounded-xl'
        startContent={<SiMaterialdesignicons size={18} />}
      >
        CONFIGURADOR TÉCNICO
      </Button>

      {showModal && (
        <ModalAgregar
          onClose={() => setShowModal(false)}
          handleConfirmarModulo={handleConfirmarModulo}
          abertura={abertura.abertura}
          setAbertura={(nuevaAbertura) => {
            setAbertura((prev) => ({ ...prev, abertura: nuevaAbertura }))
          }}
        />
      )}

      <Modal
        isOpen={isThisOpen}
        onOpenChange={onThisOpenChange}
        size='full'
        classNames={{ base: 'bg-[#0c0c0e] text-zinc-100' }}
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <>
              {/* HEADER */}
              <div className='h-16 flex justify-between items-center px-10 border-b border-zinc-800/50 bg-black/40 backdrop-blur-md z-50'>
                <div className='flex items-center gap-4'>
                  <HiAdjustments className='text-zinc-500' size={20} />
                  <h2 className='text-sm font-bold tracking-0.1em text-zinc-200 uppercase'>
                    Composición de Aberturas
                  </h2>
                  {lastSaved && (
                    <div className='flex items-center gap-1 text-[10px] text-emerald-500 font-bold animate-pulse'>
                      <HiCheckCircle size={14} /> AUTOGUARDADO
                    </div>
                  )}
                </div>

                <div className='flex items-center gap-3'>
                  {selectedId && (
                    <div className='flex items-center gap-1 bg-zinc-900 border border-zinc-800 p-1 rounded-lg'>
                      <Button
                        size='sm'
                        variant='light'
                        className='text-zinc-300 font-bold px-3'
                        onPress={() => {
                          const m = modulos.find((mod) => mod.id === selectedId)
                          if (m) {
                            setAbertura(m)
                            setIsEditing(true)
                            setShowModal(true)
                          }
                        }}
                      >
                        Modificar
                      </Button>
                      <Button
                        size='sm'
                        variant='light'
                        color='danger'
                        isIconOnly
                        onPress={() => {
                          setModulos(modulos.filter((m) => m.id !== selectedId))
                          setSelectedId(null)
                        }}
                      >
                        <HiOutlineTrash size={16} />
                      </Button>
                    </div>
                  )}
                  <Button
                    isIconOnly
                    variant='flat'
                    className='bg-zinc-900 text-zinc-500'
                    onPress={onClose}
                  >
                    <HiX size={20} />
                  </Button>
                </div>
              </div>

              <ModalBody className='p-0 overflow-hidden relative flex-1'>
                <div ref={containerRef} className='w-full h-full bg-[#0c0c0e]'>
                  {modulos.length === 0 ? (
                    <div className='flex h-full items-center justify-center'>
                      <Button
                        onPress={() => {
                          setAbertura((prev) => ({ ...prev, x: 0, y: 0 }))
                          setIsEditing(false)
                          setShowModal(true)
                        }}
                        className='group w-80 h-40 border border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 rounded-2xl flex flex-col gap-2'
                      >
                        <span className='text-3xl text-zinc-600'>+</span>
                        <p className='text-xs font-bold text-zinc-500 uppercase tracking-widest'>
                          Empezar Diseño
                        </p>
                      </Button>
                    </div>
                  ) : (
                    <Stage
                      width={dimensions.width}
                      height={dimensions.height}
                      onClick={(e) =>
                        e.target === e.target.getStage() && setSelectedId(null)
                      }
                    >
                      <Layer
                        x={transform.x}
                        y={transform.y}
                        scaleX={transform.scale}
                        scaleY={transform.scale}
                      >
                        {modulos.map((m) => {
                          const pos = obtenerPosicionVisual(m.x, m.y)
                          const isSel = selectedId === m.id
                          const wPx = m.abertura.ancho * INITIAL_ESCALA,
                            hPx = m.abertura.altura * INITIAL_ESCALA
                          return (
                            <Group key={m.id} x={pos.x} y={pos.y}>
                              <ImageContainer
                                src={m.abertura.imgSrc}
                                width={wPx}
                                height={hPx}
                              />
                              <Rect
                                width={wPx}
                                height={hPx}
                                fill={
                                  isSel
                                    ? 'rgba(255,255,255,0.05)'
                                    : 'transparent'
                                }
                                stroke={isSel ? '#ffffff' : '#3f3f46'}
                                strokeWidth={
                                  isSel
                                    ? 2 / transform.scale
                                    : 1 / transform.scale
                                }
                                onClick={() => setSelectedId(m.id)}
                              />
                              <Text
                                text={`${m.abertura.abertura}\n${m.abertura.ancho}x${m.abertura.altura}`}
                                width={wPx}
                                height={hPx}
                                align='center'
                                verticalAlign='middle'
                                fill={isSel ? '#fff' : '#71717a'}
                                fontSize={10 / transform.scale}
                                fontStyle='bold'
                                listening={false}
                              />
                              {isSel &&
                                [
                                  [1, 0],
                                  [-1, 0],
                                  [0, 1],
                                  [0, -1],
                                ].map(([dx, dy], i) => {
                                  if (
                                    modulos.some(
                                      (mod) =>
                                        mod.x === m.x + dx &&
                                        mod.y === m.y + dy,
                                    )
                                  )
                                    return null
                                  const bx =
                                    dx === 1
                                      ? wPx + SPACING / transform.scale
                                      : dx === -1
                                        ? -SPACING / transform.scale
                                        : wPx / 2
                                  const by =
                                    dy === 1
                                      ? hPx + SPACING / transform.scale
                                      : dy === -1
                                        ? -SPACING / transform.scale
                                        : hPx / 2
                                  return (
                                    <BotonPlusMinimal
                                      key={i}
                                      x={bx}
                                      y={by}
                                      scaleFactor={transform.scale}
                                      onClick={() => {
                                        setAbertura((prev) => ({
                                          ...prev,
                                          x: m.x + dx,
                                          y: m.y + dy,
                                        }))
                                        setIsEditing(false)
                                        setShowModal(true)
                                      }}
                                    />
                                  )
                                })}
                            </Group>
                          )
                        })}
                      </Layer>
                    </Stage>
                  )}
                </div>
              </ModalBody>
              {/* FOOTER */}
              <ModalFooter className='h-20 border-t border-zinc-800/50 bg-black/60 px-10'>
                <div className='flex-1'>
                  <span className='text-[10px] text-zinc-600 font-bold uppercase tracking-widest'>
                    Módulos Totales
                  </span>
                  <div className='text-xl font-mono font-bold text-zinc-200'>
                    {modulos.length}
                  </div>
                </div>
                <div className='flex gap-3'>
                  <Button
                    variant='light'
                    className='text-zinc-500 font-bold'
                    onPress={onClose}
                  >
                    DESCARTAR
                  </Button>
                  <ModalResumenDiseno />
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

// Subcomponente para los botones "+"
const BotonPlusMinimal = ({ x, y, onClick, scaleFactor }: any) => {
  const [hover, setHover] = useState(false)
  const size = 32 / scaleFactor
  return (
    <Group
      x={x}
      y={y}
      offsetX={size / 2}
      offsetY={size / 2}
      cursor='pointer'
      onClick={(e) => {
        e.cancelBubble = true
        onClick()
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Rect
        width={size}
        height={size}
        fill={hover ? '#3f3f46' : '#18181b'}
        stroke='#52525b'
        strokeWidth={1 / scaleFactor}
        cornerRadius={8 / scaleFactor}
      />
      <Text
        text='+'
        fill={hover ? '#fff' : '#71717a'}
        width={size}
        height={size}
        align='center'
        verticalAlign='middle'
        fontSize={18 / scaleFactor}
        fontStyle='bold'
      />
    </Group>
  )
}
