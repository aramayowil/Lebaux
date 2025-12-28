import { useState, useEffect, useRef, useLayoutEffect, useMemo } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
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
import { useImage } from 'react-konva-utils'
import ModalAgregar from '@/components/ui/modals/abertura_unificada/ModalAgregar'

const ImageContainer = ({
  src,
  width,
  height,
}: {
  src: string
  width: number
  height: number
}) => {
  const [image] = useImage(src)
  return <KonvaImage image={image} x={0} y={0} width={width} height={height} />
}

const INITIAL_ESCALA = 0.2
const SPACING = 20
const PADDING_STAGE = 80
const STORAGE_KEY = 'diseno_modulos_pro_editor'

// 1. Agregamos imgSrc a la interfaz para que cada módulo sea independiente
export interface Modulo {
  id: string
  x: number
  y: number
  tipo: string
  ancho: number
  alto: number
  imgSrc: string
}

export default function AberturaCompuesta() {
  const [tipo, setTipo] = useState<string>('')
  const [ancho, setAncho] = useState<number>(1000)
  const [alto, setAlto] = useState<number>(1000)
  // Este imgSrc actúa como el valor seleccionado actualmente en el modal de configuración
  const [imgSrc, setImgSrc] = useState<string>('')

  const [showModal, setShowModal] = useState(false)
  const handleOpenModal = () => {
    setShowModal(!showModal)
  }

  const {
    isOpen: isThisOpen,
    onOpen: onThisOpen,
    onOpenChange: onThisOpenChange,
  } = useDisclosure()

  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    if (isThisOpen) {
      const updateSize = () => {
        requestAnimationFrame(() => {
          if (containerRef.current) {
            const { offsetWidth, offsetHeight } = containerRef.current
            if (offsetWidth > 0 && offsetHeight > 0) {
              setDimensions({ width: offsetWidth, height: offsetHeight })
            }
          }
        })
      }
      updateSize()
      window.addEventListener('resize', updateSize)
      return () => window.removeEventListener('resize', updateSize)
    }
  }, [isThisOpen])

  const [modulos, setModulos] = useState<Modulo[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [targetCoords, setTargetCoords] = useState<{
    x: number
    y: number
  } | null>(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(modulos))
  }, [modulos])

  const obtenerPosicionVisual = (coordX: number, coordY: number) => {
    let visualX = 0
    let visualY = 0
    if (coordX > 0) {
      for (let i = 0; i < coordX; i++) {
        const m = modulos.find((mod) => mod.x === i)
        visualX += (m?.ancho || 1000) * INITIAL_ESCALA
      }
    } else if (coordX < 0) {
      for (let i = -1; i >= coordX; i--) {
        const m = modulos.find((mod) => mod.x === i)
        visualX -= (m?.ancho || 1000) * INITIAL_ESCALA
      }
    }
    if (coordY > 0) {
      for (let j = 0; j < coordY; j++) {
        const m = modulos.find((mod) => mod.y === j)
        visualY += (m?.alto || 1000) * INITIAL_ESCALA
      }
    } else if (coordY < 0) {
      for (let j = -1; j >= coordY; j--) {
        const m = modulos.find((mod) => mod.y === j)
        visualY -= (m?.alto || 1000) * INITIAL_ESCALA
      }
    }
    return { x: visualX, y: visualY }
  }

  const transform = useMemo(() => {
    if (modulos.length === 0 || dimensions.width === 0)
      return { x: 50, y: 50, scale: 1 }
    const bounds = modulos.map((m) => {
      const pos = obtenerPosicionVisual(m.x, m.y)
      return {
        left: pos.x,
        right: pos.x + m.ancho * INITIAL_ESCALA,
        top: pos.y,
        bottom: pos.y + m.alto * INITIAL_ESCALA,
      }
    })
    const minX = Math.min(...bounds.map((b) => b.left))
    const maxX = Math.max(...bounds.map((b) => b.right))
    const minY = Math.min(...bounds.map((b) => b.top))
    const maxY = Math.max(...bounds.map((b) => b.bottom))
    const contentW = maxX - minX
    const contentH = maxY - minY
    const scaleX = (dimensions.width - PADDING_STAGE) / (contentW || 1)
    const scaleY = (dimensions.height - PADDING_STAGE) / (contentH || 1)
    const dynamicScale = Math.min(scaleX, scaleY, 1)
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

  const estaOcupado = (x: number, y: number) =>
    modulos.some((m) => m.x === x && m.y === y)

  const handleConfirmarModulo = () => {
    if (isEditing) {
      setModulos(
        modulos.map((m) =>
          // 2. Al editar, también actualizamos el imgSrc específico
          m.id === selectedId ? { ...m, tipo, ancho, alto, imgSrc } : m,
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
        imgSrc, // 3. Guardamos la ruta de la imagen en el objeto del módulo
      }
      setModulos([...modulos, nuevo])
      setSelectedId(nuevo.id)
    }
    setShowModal(false)
  }

  return (
    <>
      <Button
        onPress={onThisOpen}
        className='bg-zinc-950 text-white border border-zinc-800 hover:bg-zinc-900 h-9 px-8 font-bold rounded-xl'
        variant='bordered'
        startContent={<SiMaterialdesignicons size={16} />}
      >
        Diseño aberturas
      </Button>

      <Modal
        isOpen={isThisOpen}
        onOpenChange={onThisOpenChange}
        size='5xl'
        classNames={{
          base: 'max-h-[vh] bg-[#050505] text-zinc-100 border border-zinc-800/80 shadow-2xl',
          header: 'border-b border-zinc-900 bg-black/60 backdrop-blur-xl',
          footer: 'border-t border-zinc-900 bg-black/60 backdrop-blur-xl',
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex justify-between items-center py-4 px-8'>
                <h2 className='text-2xl font-bold tracking-tight text-white'>
                  Configuración Técnica
                </h2>
                <div className='flex gap-3 mr-6'>
                  {modulos.length > 0 && (
                    <Button
                      size='sm'
                      variant='flat'
                      color='warning'
                      radius='lg'
                      className='font-bold h-9 px-4 bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
                      onPress={() => {
                        setModulos([])
                        setSelectedId(null)
                      }}
                    >
                      Reiniciar Diseño
                    </Button>
                  )}
                  {selectedId && (
                    <>
                      <Button
                        size='sm'
                        radius='lg'
                        className='bg-zinc-100 text-black hover:bg-white font-bold h-9 px-5 transition-transform'
                        onPress={() => {
                          const m = modulos.find((mod) => mod.id === selectedId)
                          if (m) {
                            setTipo(m.tipo)
                            setAncho(m.ancho)
                            setAlto(m.alto)
                            // 4. Cargamos la imagen guardada del módulo al abrir el editor
                            setImgSrc(m.imgSrc)
                            setIsEditing(true)
                            setShowModal(true)
                          }
                        }}
                      >
                        Editar Módulo
                      </Button>
                      <Button
                        size='sm'
                        variant='flat'
                        color='danger'
                        radius='lg'
                        className='font-bold h-9 px-5 bg-red-950/20 text-red-500 hover:bg-red-950/40'
                        onPress={() => {
                          setModulos(modulos.filter((m) => m.id !== selectedId))
                          setSelectedId(null)
                        }}
                      >
                        Eliminar
                      </Button>
                    </>
                  )}
                </div>
              </ModalHeader>

              <ModalBody className='p-0 overflow-hidden flex flex-col flex-1 bg-[#050505] min-h-80'>
                {modulos.length === 0 ? (
                  <div className='flex flex-1 items-center justify-center p-10'>
                    <Button
                      onPress={() => {
                        setTargetCoords({ x: 0, y: 0 })
                        setIsEditing(false)
                        setShowModal(true)
                      }}
                      className='group w-full max-w-sm h-40 border border-dashed border-zinc-800 bg-transparent hover:border-zinc-500 flex flex-col gap-3 rounded-2xl transition-all'
                    >
                      <div className='w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center group-hover:bg-zinc-800 transition-colors'>
                        <span className='text-2xl text-zinc-400 text-center pb-1'>
                          +
                        </span>
                      </div>
                      <span className='text-zinc-500 font-bold tracking-widest text-xs'>
                        AÑADIR PAÑO INICIAL
                      </span>
                    </Button>
                  </div>
                ) : (
                  <div
                    ref={containerRef}
                    className='flex-1 w-full h-full relative overflow-hidden bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] background-size-[24px_24px]'
                  >
                    {dimensions.width > 0 && dimensions.height > 0 && (
                      <Stage
                        width={dimensions.width}
                        height={dimensions.height}
                        onClick={(e) =>
                          e.target === e.target.getStage() &&
                          setSelectedId(null)
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
                            const isSelected = selectedId === m.id
                            const anchoPx = m.ancho * INITIAL_ESCALA
                            const altoPx = m.alto * INITIAL_ESCALA
                            return (
                              <Group key={m.id} x={pos.x} y={pos.y}>
                                {/* 5. Ahora cada ImageContainer usa la propiedad imgSrc del módulo m */}
                                <ImageContainer
                                  src={m.imgSrc}
                                  width={anchoPx}
                                  height={altoPx}
                                />
                                <Rect
                                  width={anchoPx}
                                  height={altoPx}
                                  stroke={isSelected ? '#1c1919' : '#3f3f46'}
                                  strokeWidth={
                                    isSelected
                                      ? 2 / transform.scale
                                      : 1 / transform.scale
                                  }
                                  cornerRadius={2 / transform.scale}
                                  onClick={() => setSelectedId(m.id)}
                                />
                                <Text
                                  text={m.tipo.toUpperCase()}
                                  width={anchoPx}
                                  y={altoPx / 2 - 20 / transform.scale}
                                  align='center'
                                  fill={'#45454c'}
                                  fontSize={14 / transform.scale}
                                  fontStyle='bold'
                                  listening={false}
                                />
                                <Text
                                  text={`${m.ancho} × ${m.alto}`}
                                  width={anchoPx}
                                  y={altoPx / 2 + 6 / transform.scale}
                                  align='center'
                                  fill={'#45454c'}
                                  fontSize={17 / transform.scale}
                                  fontStyle='bold'
                                  listening={false}
                                />
                                {isSelected &&
                                  [
                                    [1, 0],
                                    [-1, 0],
                                    [0, 1],
                                    [0, -1],
                                  ].map(([dx, dy], i) => {
                                    if (estaOcupado(m.x + dx, m.y + dy))
                                      return null
                                    let bx =
                                      dx === 1
                                        ? anchoPx + SPACING / transform.scale
                                        : dx === -1
                                          ? -SPACING / transform.scale
                                          : anchoPx / 2
                                    let by =
                                      dy === 1
                                        ? altoPx + SPACING / transform.scale
                                        : dy === -1
                                          ? -SPACING / transform.scale
                                          : altoPx / 2
                                    return (
                                      <BotonPlus
                                        key={i}
                                        x={bx}
                                        y={by}
                                        scaleFactor={transform.scale}
                                        onClick={() => {
                                          setTargetCoords({
                                            x: m.x + dx,
                                            y: m.y + dy,
                                          })
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
                )}
                {showModal && (
                  <ModalAgregar
                    onClose={handleOpenModal}
                    handleConfirmarModulo={handleConfirmarModulo}
                  />
                )}
              </ModalBody>

              <ModalFooter className='py-3 px-10 justify-between items-center'>
                <div className='flex flex-col'>
                  <span className='text-[10px] text-zinc-600 font-bold uppercase tracking-wider'>
                    Módulos
                  </span>
                  <span className='text-xl font-mono font-bold text-zinc-200'>
                    {modulos.length.toString().padStart(2, '0')}
                  </span>
                </div>
                <div className='flex gap-2'>
                  <Button
                    variant='light'
                    className='text-zinc-500 hover:text-white font-medium px-6'
                    onPress={onClose}
                  >
                    Cancelar
                  </Button>
                  <Button
                    className='bg-zinc-100 text-black font-black px-12 h-10 rounded-xl hover:bg-white transition-all shadow-lg'
                    onPress={() => onClose()}
                  >
                    FINALIZAR DISEÑO
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

const BotonPlus = ({
  x,
  y,
  onClick,
  scaleFactor,
}: {
  x: number
  y: number
  onClick: () => void
  scaleFactor: number
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const size = 28 / scaleFactor
  return (
    <Group
      x={x}
      y={y}
      offsetX={size / 2}
      offsetY={size / 2}
      onClick={(e) => {
        e.cancelBubble = true
        onClick()
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Rect
        width={size}
        height={size}
        fill={isHovered ? '#27272a' : '#111111'}
        cornerRadius={4 / scaleFactor}
        stroke={isHovered ? '#71717a' : '#3f3f46'}
        strokeWidth={1 / scaleFactor}
      />
      <Text
        text='+'
        fill={isHovered ? '#ffffff' : '#a1a1aa'}
        width={size}
        height={size}
        align='center'
        verticalAlign='middle'
        fontSize={16 / scaleFactor}
        fontStyle='bold'
      />
    </Group>
  )
}
