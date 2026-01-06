import { useState, useEffect, useRef, useLayoutEffect, useMemo } from 'react'
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Divider,
  Chip,
  ScrollShadow,
  Accordion,
  AccordionItem,
  Select,
  SelectItem,
  Input,
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
import {
  HiOutlineTrash,
  HiX,
  HiAdjustments,
  HiOutlineRefresh,
  HiCheckCircle,
  HiOutlineSparkles,
  HiOutlineCube,
  HiOutlineColorSwatch,
  HiOutlineTag,
  HiOutlineViewGrid,
  HiOutlineDatabase,
} from 'react-icons/hi'
import { useImage } from 'react-konva-utils'
import ModalAgregar from './ModalAgregar'
import colors from '@/models/IColors'

// --- 1. IMPORTACIÓN DEL STORE ---
import useAberturasCompuestasStore from '@/stores/useAberturasCompustasStore'
import Abertura_Compuesta from '@/class/Abertura_Compuesta.class'

// --- CONSTANTES DE CONFIGURACIÓN ---
const COLOR = '#f5a524'
const INITIAL_ESCALA = 0.2
const SPACING = 20
const PADDING_STAGE = 100
const STORAGE_KEY = 'diseno_modulos_compuesta'

const COLORS_OPTIONS = [
  { key: 'blanco', label: 'Blanco' },
  { key: 'negro', label: 'Negro' },
  { key: 'anodizado', label: 'Anodizado' },
]

const VIDRIOS_OPTIONS = [
  { key: 'float4mm', label: 'Float 4mm' },
  { key: 'dvh', label: 'DVH' },
  { key: 'laminado', label: 'Laminado' },
]

// --- INTERFACES ---
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
  id: string
  abertura: abertura
  x: number
  y: number
}

// --- COMPONENTES VISUALES KONVA ---
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

const BotonPlusMinimal = ({ x, y, onClick, scaleFactor }: any) => {
  const [hover, setHover] = useState(false)
  const size = 32 / scaleFactor
  return (
    <Group
      name='boton-agregar'
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
        stroke={COLOR}
        strokeWidth={1 / scaleFactor}
        cornerRadius={8 / scaleFactor}
      />
      <Text
        text='+'
        fill={hover ? '#fff' : COLOR}
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

export default function AberturaCompuesta() {
  // --- ESTADOS Y STORE ---
  const stageRef = useRef<any>(null)
  const agregarAberturaComp = useAberturasCompuestasStore(
    (state) => state.agregarAberturaComp,
  )

  const [modulos, setModulos] = useState<EstadoAbertura[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  const [aberturaActual, setAberturaActual] = useState<EstadoAbertura>({
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
      imgSrc: '',
      variantKey: 0,
      mosquitero: { checked: false, precio: 0 },
      premarco: { checked: false, precio: 0 },
    },
    x: 0,
    y: 0,
  })

  const [cantidadCompuesta, setCantidadCompuesta] = useState(1)
  const [color, setColor] = useState('blanco')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [lastSaved, setLastSaved] = useState(false)

  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // const generarImagenBase64 = () => {
  //   if (stageRef.current) {
  //     // 1. Obtenemos el Data URL
  //     // pixelRatio: 2 mejora la calidad (es como un screenshot en 2k)
  //     const dataUrl = stageRef.current.toDataURL({
  //       pixelRatio: 2,
  //       mimeType: 'image/png',
  //     })

  //     return dataUrl // Esto es el string Base64
  //   }
  //   return null
  // }
  const generarImagenBase64 = () => {
    if (stageRef.current) {
      const layer = stageRef.current.findOne('Layer')
      if (!layer) return null

      // 1. Calculamos el área ocupada SOLO por los rectángulos y las imágenes
      const box = layer.getClientRect({
        skipTransform: false,
        skipShadow: true,
        // Filtro estricto: solo tomamos en cuenta los módulos de abertura
        callback: (node: any) => {
          const isText = node.className === 'Text'
          const isButton = node.name() === 'boton-agregar'
          // Retornamos falso para ignorar estos elementos en el cálculo del tamaño
          return !isText && !isButton
        },
      })

      // 2. Antes de capturar, ocultamos temporalmente los textos y botones
      const textNodes = stageRef.current.find('Text')
      const buttonNodes = stageRef.current.find('.boton-agregar')

      textNodes.forEach((n: any) => n.hide())
      buttonNodes.forEach((n: any) => n.hide())

      // 3. Capturamos el área recortada
      const dataUrl = stageRef.current.toDataURL({
        x: box.x,
        y: box.y,
        width: box.width,
        height: box.height,
        pixelRatio: 2,
      })

      // 4. Volvemos a mostrar todo para que el usuario siga viendo la interfaz
      textNodes.forEach((n: any) => n.show())
      buttonNodes.forEach((n: any) => n.show())

      return dataUrl
    }
    return null
  }

  const calcularDimensionesTotales = () => {
    if (modulos.length === 0) return { anchoTotal: 0, altoTotal: 0 }

    // Calculamos los límites (bounding box) de la composición
    const bounds = modulos.map((m) => {
      // Calculamos la posición real "sin escala"
      let realX = 0
      if (m.x > 0) {
        for (let i = 0; i < m.x; i++)
          realX += modulos.find((mod) => mod.x === i)?.abertura.ancho || 0
      } else if (m.x < 0) {
        for (let i = -1; i >= m.x; i--)
          realX -= modulos.find((mod) => mod.x === i)?.abertura.ancho || 0
      }

      let realY = 0
      if (m.y > 0) {
        for (let j = 0; j < m.y; j++)
          realY += modulos.find((mod) => mod.y === j)?.abertura.altura || 0
      } else if (m.y < 0) {
        for (let j = -1; j >= m.y; j--)
          realY -= modulos.find((mod) => mod.y === j)?.abertura.altura || 0
      }

      return {
        left: realX,
        right: realX + m.abertura.ancho,
        top: realY,
        bottom: realY + m.abertura.altura,
      }
    })

    const minX = Math.min(...bounds.map((b) => b.left))
    const maxX = Math.max(...bounds.map((b) => b.right))
    const minY = Math.min(...bounds.map((b) => b.top))
    const maxY = Math.max(...bounds.map((b) => b.bottom))

    return {
      anchoTotal: maxX - minX,
      altoTotal: maxY - minY,
    }
  }

  // --- EFECTOS ---
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(modulos))
    setLastSaved(true)
    const timer = setTimeout(() => setLastSaved(false), 2000)
    return () => clearTimeout(timer)
  }, [modulos])

  const updateSize = () => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      })
    }
  }

  useLayoutEffect(() => {
    if (isOpen) {
      setTimeout(updateSize, 100)
      window.addEventListener('resize', updateSize)
      return () => window.removeEventListener('resize', updateSize)
    }
  }, [isOpen])

  // --- LÓGICA DE NEGOCIO ---
  const actualizarModulo = (id: string, campo: string, valor: any) => {
    setModulos((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, abertura: { ...m.abertura, [campo]: valor } } : m,
      ),
    )
  }

  const totalGeneral = useMemo(() => {
    return modulos.reduce((acc, m) => {
      let sub = Number(m.abertura.precio || 0)
      if (m.abertura.mosquitero?.checked)
        sub += Number(m.abertura.mosquitero.precio || 0)
      if (m.abertura.premarco?.checked)
        sub += Number(m.abertura.premarco.precio || 0)
      return acc + sub
    }, 0)
  }, [modulos])

  // --- FUNCIÓN PARA GUARDAR EN ZUSTAND ---
  const handleFinalizarComposicion = (onClose: () => void) => {
    if (modulos.length === 0) return

    // 1. Limpiamos selección para que no salga el recuadro verde de "editando"
    setSelectedId(null)

    // 2. Pequeño delay para asegurar que el estado de Konva se actualice sin el borde verde
    setTimeout(() => {
      const { anchoTotal, altoTotal } = calcularDimensionesTotales()
      const imagenLimpia = generarImagenBase64()

      const nuevaInstancia = new Abertura_Compuesta(
        `Composición ${modulos.length} mod.`,
        `Composición ${modulos.length} mod.`,
        'COMP',
        { base: anchoTotal, altura: altoTotal },
        './images/img-prueba3.jpg',
        imagenLimpia, // Aquí va la imagen sin textos ni botones
        modulos,
        cantidadCompuesta,
        totalGeneral,
        color,
      )

      agregarAberturaComp(nuevaInstancia)
      onClose()
    }, 60)
  }

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
      return { x: 0, y: 0, scale: 1 }
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
          m.id === selectedId ? { ...aberturaActual, id: m.id } : m,
        ),
      )
    } else {
      const nuevo: EstadoAbertura = { ...aberturaActual, id: uuidv4() }
      setModulos([...modulos, nuevo])
      setSelectedId(nuevo.id)
    }
    setShowModal(false)
  }

  return (
    <>
      <Button
        onPress={onOpen}
        color='warning'
        variant='flat' // El fondo es suave y traslúcido
        startContent={
          <HiOutlineViewGrid size={20} className='text-warning-500' />
        }
        className='font-bold border-1 border-warning/20 bg-warning/10 hover:bg-warning/20 transition-all'
      >
        Diseñar Abertura
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size='full'
        classNames={{ base: 'bg-[#0c0c0e]' }}
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <>
              {/* --- HEADER --- */}
              <div className='h-16 flex justify-between items-center px-10 border-b border-zinc-800/50 bg-black/40 backdrop-blur-md z-50'>
                <div className='flex items-center gap-4'>
                  <HiAdjustments className='text-zinc-500' size={22} />
                  <h2 className='text-xs font-bold tracking-widest text-zinc-200 uppercase'>
                    Composición Técnica
                  </h2>
                  {lastSaved && (
                    <div className='flex items-center gap-1 text-[9px] text-warning font-bold animate-pulse'>
                      <HiCheckCircle size={14} /> AUTOGUARDADO
                    </div>
                  )}
                </div>

                <div className='flex items-center gap-6'>
                  {/* --- SELECT DE COLOR --- */}
                  <div className='flex flex-col gap-1'>
                    <span className='text-[9px] font-bold text-zinc-500 uppercase tracking-[0.2em] leading-none ml-1'>
                      Color de Pintado
                    </span>
                    <Select
                      size='sm'
                      variant='bordered'
                      placeholder='Seleccionar'
                      className='w-44'
                      disallowEmptySelection
                      defaultSelectedKeys={[color]} // Selección por defecto
                      onSelectionChange={(keys) => {
                        const selectedKey = Array.from(keys)[0]
                        if (selectedKey !== undefined) {
                          setColor(String(selectedKey))
                        }
                      }}
                      classNames={{
                        trigger:
                          'h-8 border-zinc-800 bg-zinc-900/50 min-h-unit-8',
                        value: 'text-[10px] font-black uppercase text-zinc-200',
                      }}
                    >
                      {colors.map((color) => (
                        <SelectItem
                          key={color.key}
                          textValue={color.label}
                          className='hover:bg-zinc-800'
                        >
                          <div className='flex items-center gap-2'>
                            <div
                              className={`w-2 h-2 rounded-full border border-white/10 ${
                                color.key === 'blanco'
                                  ? 'bg-white'
                                  : color.key === 'negro'
                                    ? 'bg-black'
                                    : 'bg-zinc-500'
                              }`}
                            />
                            <span className='text-[10px] font-bold uppercase text-zinc-300'>
                              {color.label}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </Select>
                  </div>

                  <Divider orientation='vertical' className='h-8 bg-zinc-800' />

                  <div className='flex items-center gap-3'>
                    {selectedId && (
                      <div className='flex items-center gap-1 bg-zinc-900 border border-zinc-800 p-1 rounded-xl shadow-xl'>
                        <Button
                          size='sm'
                          variant='light'
                          className='text-zinc-300 font-bold text-[10px]'
                          onPress={() => {
                            const m = modulos.find(
                              (mod) => mod.id === selectedId,
                            )
                            if (m) {
                              setAberturaActual(m)
                              setIsEditing(true)
                              setShowModal(true)
                            }
                          }}
                        >
                          MODIFICAR
                        </Button>
                        <Button
                          size='sm'
                          variant='light'
                          color='danger'
                          isIconOnly
                          onPress={() => {
                            setModulos(
                              modulos.filter((m) => m.id !== selectedId),
                            )
                            setSelectedId(null)
                          }}
                        >
                          <HiOutlineTrash size={16} />
                        </Button>
                      </div>
                    )}
                    <Button
                      size='sm'
                      variant='flat'
                      className='bg-zinc-900 text-zinc-500 font-bold text-[10px]'
                      startContent={<HiOutlineRefresh />}
                      onPress={() => setModulos([])}
                    >
                      RESETEAR
                    </Button>
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
              </div>

              {/* --- BODY --- */}
              <ModalBody className='p-6 overflow-hidden relative flex-1'>
                <div className='grid grid-cols-1 md:grid-cols-12 gap-6 h-full'>
                  {/* PANEL IZQUIERDO */}
                  <div className='md:col-span-3 border-r border-zinc-800/40 pr-4 flex flex-col gap-4 overflow-hidden'>
                    <div className='flex items-center gap-2'>
                      <HiOutlineDatabase size={16} className=' text-zinc-500' />
                      <span className='text-[11px] font-bold text-zinc-500 tracking-widest uppercase'>
                        Estructura del Diseño
                      </span>
                    </div>
                    <ScrollShadow className='flex-1 pr-2'>
                      <div className='flex flex-col gap-3'>
                        {modulos.length === 0 ? (
                          <div className='text-zinc-600 italic text-center py-10 border border-dashed border-zinc-800 rounded-2xl'>
                            No hay módulos.
                          </div>
                        ) : (
                          <Accordion
                            variant='splitted'
                            isCompact
                            className='px-0'
                          >
                            {modulos.map((mod) => (
                              <AccordionItem
                                title={
                                  <div className='flex flex-col'>
                                    <span
                                      className={`text-sm font-bold ${selectedId === mod.id ? 'text-warning' : 'text-zinc-200'}`}
                                    >
                                      {mod.abertura.abertura || 'Sin nombre'}
                                    </span>
                                    {/* ... */}
                                  </div>
                                }
                                startContent={
                                  <div
                                    className={`p-2 rounded-lg ${selectedId === mod.id ? 'bg-warning/20 text-warning' : 'bg-zinc-800 text-zinc-400'}`}
                                  >
                                    <HiOutlineCube size={18} />
                                  </div>
                                }
                                className={`bg-zinc-900/40 border transition-all mb-2 ${selectedId === mod.id ? 'border-warning/50' : 'border-zinc-800/50'}`}
                              >
                                <div className='flex flex-col gap-4 pb-4 px-1'>
                                  <Divider className='bg-zinc-800/50' />
                                  <div className='grid grid-cols-1 gap-3'>
                                    <Select
                                      label='Color'
                                      size='sm'
                                      variant='bordered'
                                      startContent={
                                        <HiOutlineColorSwatch className='text-blue-500' />
                                      }
                                      selectedKeys={[mod.abertura.color]}
                                      onSelectionChange={(keys) =>
                                        actualizarModulo(
                                          mod.id,
                                          'color',
                                          Array.from(keys)[0],
                                        )
                                      }
                                    >
                                      {COLORS_OPTIONS.map((c) => (
                                        <SelectItem
                                          key={c.key}
                                          textValue={c.label}
                                        >
                                          {c.label}
                                        </SelectItem>
                                      ))}
                                    </Select>

                                    <Select
                                      label='Vidrio'
                                      size='sm'
                                      variant='bordered'
                                      startContent={
                                        <HiOutlineSparkles className='text-cyan-400' />
                                      }
                                      selectedKeys={[mod.abertura.vidrio]}
                                      onSelectionChange={(keys) =>
                                        actualizarModulo(
                                          mod.id,
                                          'vidrio',
                                          Array.from(keys)[0],
                                        )
                                      }
                                    >
                                      {VIDRIOS_OPTIONS.map((v) => (
                                        <SelectItem
                                          key={v.key}
                                          textValue={v.label}
                                        >
                                          {v.label}
                                        </SelectItem>
                                      ))}
                                    </Select>

                                    <Input
                                      type='number'
                                      label='Precio Unitario'
                                      size='sm'
                                      variant='bordered'
                                      startContent={
                                        <HiOutlineTag className='text-emerald-500' />
                                      }
                                      value={mod.abertura.precio.toString()}
                                      onValueChange={(val) =>
                                        actualizarModulo(
                                          mod.id,
                                          'precio',
                                          Number(val),
                                        )
                                      }
                                    />
                                  </div>

                                  <div className='flex flex-wrap gap-2'>
                                    <Chip
                                      size='sm'
                                      variant='dot'
                                      color={
                                        mod.abertura.mosquitero.checked
                                          ? 'success'
                                          : 'default'
                                      }
                                      className='cursor-pointer'
                                      onClick={() =>
                                        actualizarModulo(mod.id, 'mosquitero', {
                                          ...mod.abertura.mosquitero,
                                          checked:
                                            !mod.abertura.mosquitero.checked,
                                        })
                                      }
                                    >
                                      Mosquitero
                                    </Chip>
                                    <Chip
                                      size='sm'
                                      variant='dot'
                                      color={
                                        mod.abertura.premarco.checked
                                          ? 'primary'
                                          : 'default'
                                      }
                                      className='cursor-pointer'
                                      onClick={() =>
                                        actualizarModulo(mod.id, 'premarco', {
                                          ...mod.abertura.premarco,
                                          checked:
                                            !mod.abertura.premarco.checked,
                                        })
                                      }
                                    >
                                      Premarco
                                    </Chip>
                                  </div>
                                </div>
                              </AccordionItem>
                            ))}
                          </Accordion>
                        )}
                      </div>
                    </ScrollShadow>
                  </div>

                  {/* PANEL DERECHO: LIENZO KONVA */}
                  <div className='md:col-span-9 relative bg-zinc-950/40 rounded-3xl border border-zinc-800/50 overflow-hidden'>
                    <div
                      ref={containerRef}
                      className='w-full h-full bg-[#0c0c0e]'
                    >
                      {modulos.length === 0 ? (
                        <div className='flex h-full items-center justify-center'>
                          <Button
                            onPress={() => {
                              setAberturaActual((prev) => ({
                                ...prev,
                                x: 0,
                                y: 0,
                              }))
                              setIsEditing(false)
                              setShowModal(true)
                            }}
                            className='group w-80 h-40 border border-zinc-800 bg-zinc-900/30 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all rounded-3xl flex flex-col gap-2'
                          >
                            <span className='text-4xl text-emerald-500 group-hover:scale-125 transition-transform font-light'>
                              +
                            </span>
                            <p className='text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em] group-hover:text-zinc-200'>
                              Empezar Diseño
                            </p>
                          </Button>
                        </div>
                      ) : (
                        <Stage
                          ref={stageRef}
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
                                        ? 'rgba(16, 185, 129, 0.05)'
                                        : 'transparent'
                                    }
                                    stroke={isSel ? COLOR : '#3f3f46'}
                                    strokeWidth={
                                      isSel
                                        ? 2 / transform.scale
                                        : 1 / transform.scale
                                    }
                                    onClick={() => setSelectedId(m.id)}
                                  />
                                  <Text
                                    name='medida-texto'
                                    text={`${m.abertura.abertura}\n${m.abertura.ancho}x${m.abertura.altura}`}
                                    width={wPx}
                                    height={hPx}
                                    align='center'
                                    verticalAlign='middle'
                                    fill={isSel ? '#3f3f46' : '#71717a'}
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
                                      return (
                                        <BotonPlusMinimal
                                          key={i}
                                          scaleFactor={transform.scale}
                                          x={
                                            dx === 1
                                              ? wPx + SPACING / transform.scale
                                              : dx === -1
                                                ? -SPACING / transform.scale
                                                : wPx / 2
                                          }
                                          y={
                                            dy === 1
                                              ? hPx + SPACING / transform.scale
                                              : dy === -1
                                                ? -SPACING / transform.scale
                                                : hPx / 2
                                          }
                                          onClick={() => {
                                            setAberturaActual((prev) => ({
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
                  </div>
                </div>
              </ModalBody>

              {/* --- FOOTER --- */}
              <ModalFooter className='h-18 border-t border-zinc-800/50 bg-black/60 px-10 flex justify-between items-center'>
                <div className='flex gap-12 items-center'>
                  <div className='flex flex-col'>
                    <span className='text-[10px] text-zinc-600 font-bold uppercase tracking-widest'>
                      Módulos
                    </span>
                    <div className='text-2xl font-mono font-bold text-zinc-200'>
                      {modulos.length.toString().padStart(2, '0')}
                    </div>
                  </div>

                  {/* --- NUEVO SELECTOR DE CANTIDAD --- */}
                  <div className='flex flex-col gap-1'>
                    <span className='text-[10px] text-zinc-500 font-bold uppercase tracking-widest'>
                      Cantidad Total
                    </span>
                    <div className='flex items-center gap-3 bg-zinc-900 border border-zinc-800 p-1 rounded-xl'>
                      <Button
                        isIconOnly
                        size='sm'
                        variant='light'
                        className='text-zinc-400 font-bold text-lg'
                        onPress={() =>
                          setCantidadCompuesta(
                            Math.max(1, cantidadCompuesta - 1),
                          )
                        }
                      >
                        -
                      </Button>
                      <span className='text-zinc-200 font-mono font-bold w-6 text-center'>
                        {cantidadCompuesta}
                      </span>
                      <Button
                        isIconOnly
                        size='sm'
                        variant='light'
                        className='text-zinc-400  font-bold text-lg'
                        onPress={() =>
                          setCantidadCompuesta(cantidadCompuesta + 1)
                        }
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <div className='flex flex-col'>
                    <span className='text-[10px] text-zinc-500 uppercase font-bold tracking-widest'>
                      Total Estimado
                    </span>
                    <div className='flex items-center gap-2'>
                      <span className='text-3xl font-black text-warning'>
                        {/* Multiplicamos el total por la cantidad seleccionada para mostrar el precio real */}
                        $ {(totalGeneral * cantidadCompuesta).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className='flex gap-3'>
                  <Button
                    variant='light'
                    className='text-zinc-500 font-bold tracking-widest text-[10px]'
                    onPress={onClose}
                  >
                    DESCARTAR
                  </Button>
                  <Button
                    onPress={() => handleFinalizarComposicion(onClose)}
                    className='bg-warning hover:bg-warning-400 text-black font-black px-10 h-12 rounded-2xl shadow-lg shadow-emerald-500/10'
                  >
                    FINALIZAR COMPOSICIÓN
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {showModal && (
        <ModalAgregar
          onClose={() => setShowModal(false)}
          handleConfirmarModulo={handleConfirmarModulo}
          abertura={aberturaActual.abertura}
          setAbertura={(nueva) =>
            setAberturaActual((prev) => ({ ...prev, abertura: nueva }))
          }
        />
      )}
    </>
  )
}
