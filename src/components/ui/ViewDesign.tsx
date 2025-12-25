import {
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
} from 'react'
import { Card } from '@heroui/react'
import {
  Stage,
  Layer,
  Arrow,
  Text,
  Group,
  Image as KonvaImage,
} from 'react-konva'
import { useImage } from 'react-konva-utils'

// --- INTERFACES ---
type ViewDesignProps = {
  width: number
  height: number
  imgSrc: string
}

export interface ViewDesignHandle {
  save: () => string | undefined
}

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

const ViewDesign = forwardRef<ViewDesignHandle, ViewDesignProps>(
  ({ width, height, imgSrc }, ref) => {
    const stageRef = useRef<any>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [stageSize, setStageSize] = useState({ width: 400, height: 300 })

    const PADDING_X = 100 // Aumentado ligeramente para balancear las cotas laterales
    const PADDING_Y = 120 // Espacio para cotas superior/inferior

    const currentWidth = containerRef.current?.offsetWidth || 400
    const availableW = currentWidth - PADDING_X
    const availableH = 360 - PADDING_Y

    const dynamicScale = Math.min(availableW / width, availableH / height)
    const drawingW = width * dynamicScale
    const drawingH = height * dynamicScale

    // El Stage se ajusta al dibujo + margen para las cotas
    const calculatedStageHeight = drawingH + 100

    // EXPONER LA FUNCIÓN AL PADRE
    useImperativeHandle(ref, () => ({
      save: () => {
        if (stageRef.current) {
          const dataURL = stageRef.current.toDataURL({ pixelRatio: 2 })

          return dataURL // Retornamos el base64 por si el padre lo necesita
        }
      },
    }))

    useEffect(() => {
      const handleResize = () => {
        if (containerRef.current) {
          setStageSize({
            width: containerRef.current.offsetWidth,
            height: calculatedStageHeight,
          })
        }
      }
      handleResize()
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }, [calculatedStageHeight, width, height])

    // --- LÓGICA DE CENTRADO TOTAL ---
    // Usamos 0.5 para que el dibujo se ubique exactamente en la mitad del Stage
    const centerX = (stageSize.width - drawingW) / 2
    const centerY = (stageSize.height - drawingH) / 2 - 10 // Pequeño ajuste para centrar visualmente con la cota inferior

    const gapAlto = 12
    const arrowAttr = {
      pointerLength: 8,
      pointerWidth: 6,
      fill: '#a1a1aa',
      stroke: '#a1a1aa',
      strokeWidth: 1,
    }

    return (
      <Card
        ref={containerRef}
        className='flex-1 flex-col p-2 shadow-sm border-none bg-default-100/50 rounded-lg h-fit items-center w-full'
      >
        <div className='w-full mt-2'>
          <h2 className='text-xs font-bold text-white uppercase tracking-widest text-center'>
            Vista Previa del Diseño
          </h2>
        </div>

        <Stage ref={stageRef} width={stageSize.width} height={stageSize.height}>
          <Layer x={centerX} y={centerY}>
            {/* IMAGEN CENTRADA */}
            <Group>
              <ImageContainer src={imgSrc} width={drawingW} height={drawingH} />
            </Group>

            {/* COTA INFERIOR (ANCHO) */}
            <Group y={drawingH + 30}>
              <Arrow
                points={[0, 0, drawingW, 0]}
                {...arrowAttr}
                pointerAtBeginning={true}
                pointerAtEnding={true}
              />
              <Text
                text={`${width}`}
                x={0}
                y={10}
                width={drawingW}
                align='center'
                fontSize={12}
                fontStyle='bold'
                fill='white'
              />
            </Group>

            {/* COTA LATERAL (ALTO) */}
            <Group x={drawingW + 30}>
              <Arrow
                points={[0, drawingH / 2 - gapAlto, 0, 0]}
                {...arrowAttr}
              />
              <Arrow
                points={[0, drawingH / 2 + gapAlto, 0, drawingH]}
                {...arrowAttr}
              />
              <Text
                text={`${height}`}
                x={-40}
                y={drawingH / 2 - 6}
                width={80}
                align='center'
                fontSize={12}
                fontStyle='bold'
                fill='white'
              />
            </Group>
          </Layer>
        </Stage>
      </Card>
    )
  },
)

export default ViewDesign
