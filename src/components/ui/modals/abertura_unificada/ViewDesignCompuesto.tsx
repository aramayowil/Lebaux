import { useRef, useEffect, useState } from 'react'
import { Card } from '@heroui/react'
import {
  Stage,
  Layer,
  Arrow,
  Text,
  Group,
  Rect,
  Image as KonvaImage,
} from 'react-konva'
import { useImage } from 'react-konva-utils'
import { HiOutlineEye } from 'react-icons/hi'

// --- INTERFACES ACTUALIZADAS ---
interface Modulo {
  id: string
  x: number
  y: number
  abertura: {
    ancho: number
    altura: number
    imgSrc: string
    [key: string]: any
  }
}

const PREVIEW_SCALE = 0.15

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

export default function ViewDesignCompuesto({ datos }: { datos: Modulo[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [stageSize, setStageSize] = useState({ width: 400, height: 400 })

  // --- 1. CÁLCULO DE DIMENSIONES REALES (mm) ---
  // Accedemos a m.abertura.ancho y m.abertura.alto
  const filas = Array.from(new Set(datos.map((m) => m.y)))
  const anchoTotalMM = Math.max(
    ...filas.map((y) =>
      datos
        .filter((m) => m.y === y)
        .reduce((acc, curr) => acc + curr.abertura.ancho, 0),
    ),
    0,
  )

  const columnas = Array.from(new Set(datos.map((m) => m.x)))
  const altoTotalMM = Math.max(
    ...columnas.map((x) =>
      datos
        .filter((m) => m.x === x)
        .reduce((acc, curr) => acc + curr.abertura.altura, 0),
    ),
    0,
  )

  // --- 2. CÁLCULO DE ESCALAS Y POSICIONES (px) ---
  // Calculamos los límites usando la nueva estructura
  const minX = Math.min(
    ...datos.map((m) => m.x * (m.abertura.ancho * PREVIEW_SCALE)),
    0,
  )
  const maxX = Math.max(
    ...datos.map(
      (m) =>
        m.x * (m.abertura.ancho * PREVIEW_SCALE) +
        m.abertura.ancho * PREVIEW_SCALE,
    ),
    0,
  )
  const minY = Math.min(
    ...datos.map((m) => m.y * (m.abertura.altura * PREVIEW_SCALE)),
    0,
  )
  const maxY = Math.max(
    ...datos.map(
      (m) =>
        m.y * (m.abertura.altura * PREVIEW_SCALE) +
        m.abertura.altura * PREVIEW_SCALE,
    ),
    0,
  )

  const totalWidthPx = maxX - minX
  const totalHeightPx = maxY - minY

  const arrowAttr = {
    pointerLength: 8,
    pointerWidth: 6,
    fill: '#a1a1aa',
    stroke: '#a1a1aa',
    strokeWidth: 1,
  }

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setStageSize({
          width: containerRef.current.offsetWidth,
          height: 450,
        })
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [datos])

  const centerX = (stageSize.width - totalWidthPx) / 2
  const centerY = (stageSize.height - totalHeightPx) / 2

  return (
    <Card
      ref={containerRef}
      className='flex-1 flex-col p-2 shadow-sm border-none bg-default-100/50 rounded-lg h-fit items-center w-full overflow-hidden'
    >
      <div className='flex w-full mt-2 mb-2 items-center justify-center gap-2'>
        <HiOutlineEye size={17} className='text-zinc-400' />
        <h2 className='text-xs font-bold text-white uppercase tracking-widest text-center'>
          Vista Previa de Composición
        </h2>
      </div>

      <Stage width={stageSize.width} height={stageSize.height}>
        <Layer x={centerX} y={centerY}>
          {/* 1. MÓDULOS */}
          {datos.map((m) => (
            <Group
              key={m.id}
              x={m.x * (m.abertura.ancho * PREVIEW_SCALE)}
              y={m.y * (m.abertura.altura * PREVIEW_SCALE)}
            >
              <ImageContainer
                src={m.abertura.imgSrc}
                width={m.abertura.ancho * PREVIEW_SCALE}
                height={m.abertura.altura * PREVIEW_SCALE}
              />
              <Rect
                width={m.abertura.ancho * PREVIEW_SCALE}
                height={m.abertura.altura * PREVIEW_SCALE}
                stroke='#3b82f6'
                strokeWidth={1}
                opacity={0.2}
              />
            </Group>
          ))}

          {/* 2. COTA SUPERIOR (ANCHO TOTAL) */}
          {datos.length > 0 && (
            <Group y={-15}>
              <Arrow
                points={[0, 0, totalWidthPx, 0]}
                {...arrowAttr}
                pointerAtBeginning={true}
                pointerAtEnding={true}
              />
              <Text
                text={`${anchoTotalMM} mm`}
                x={0}
                y={-17}
                width={totalWidthPx}
                align='center'
                fontSize={12}
                fontStyle='bold'
                fill='#a1a1aa'
              />
            </Group>
          )}

          {/* 3. COTA LATERAL (ALTO TOTAL) */}
          {datos.length > 0 && (
            <Group x={totalWidthPx + 15}>
              <Arrow
                points={[0, 0, 0, totalHeightPx]}
                {...arrowAttr}
                pointerAtBeginning={true}
                pointerAtEnding={true}
              />
              <Text
                text={`${altoTotalMM} mm`}
                x={18}
                y={totalHeightPx / 2 - 20}
                width={80}
                rotation={90}
                align='center'
                fontSize={12}
                fontStyle='bold'
                fill='#a1a1aa'
              />
            </Group>
          )}
        </Layer>
      </Stage>
    </Card>
  )
}
