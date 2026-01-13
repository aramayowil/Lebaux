import {
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
} from 'react'
import { Card, Spinner } from '@heroui/react'
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

const ViewDesign = forwardRef<ViewDesignHandle, ViewDesignProps>(
  ({ width, height, imgSrc }, ref) => {
    const stageRef = useRef<any>(null) // Ahora apuntará solo al grupo de la imagen
    const containerRef = useRef<HTMLDivElement>(null)
    const [stageSize, setStageSize] = useState({ width: 400, height: 300 })

    const PADDING_X = 100
    const PADDING_Y = 120

    const currentWidth = containerRef.current?.offsetWidth || 400
    const availableW = currentWidth - PADDING_X
    const availableH = 360 - PADDING_Y

    const dynamicScale = Math.min(availableW / width, availableH / height)
    const drawingW = width * dynamicScale
    const drawingH = height * dynamicScale

    const calculatedStageHeight = drawingH + 100

    // --- VALIDACIÓN DE VALORES ---
    // Verificamos si alguno de los valores críticos es NaN o <= 0
    const isInvalid =
      isNaN(drawingW) || isNaN(drawingH) || drawingW <= 0 || drawingH <= 0

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
      return (
        <KonvaImage image={image} x={0} y={0} width={width} height={height} />
      )
    }

    // EXPOSICIÓN DE LA FUNCIÓN AL PADRE
    useImperativeHandle(ref, () => ({
      save: () => {
        if (stageRef.current) {
          // Captura SOLO el contenido del grupo referenciado (la imagen)
          return stageRef.current.toDataURL({ pixelRatio: 3 })
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
    }, [calculatedStageHeight])

    const centerX = (stageSize.width - drawingW) / 2
    const centerY = (stageSize.height - drawingH) / 2 - 10

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

        {/* SI ES INVÁLIDO, NO RENDERIZAMOS EL STAGE */}
        {isInvalid ? (
          <div className='relative w-full max-w-75 h-83 flex items-center justify-center'>
            <div className='flex flex-col items-center gap-3'>
              <Spinner size='sm' color='default' labelColor='foreground' />
              <p className='text-default-400 text-xs font-bold uppercase tracking-tighter'>
                Esperando dimensiones...
              </p>
            </div>
          </div>
        ) : (
          <Stage width={stageSize.width} height={stageSize.height}>
            <Layer x={centerX} y={centerY}>
              <Group ref={stageRef}>
                <ImageContainer
                  src={imgSrc}
                  width={drawingW}
                  height={drawingH}
                />
              </Group>

              {/* COTAS */}
              <Group y={-8}>
                <Arrow
                  points={[0, 0, drawingW, 0]}
                  {...arrowAttr}
                  pointerAtBeginning
                  pointerAtEnding
                />
                <Text
                  text={`${width}`}
                  x={0}
                  y={-17}
                  width={drawingW}
                  align='center'
                  fontSize={13}
                  fontStyle='bold'
                  fill='white'
                />
              </Group>

              <Group x={drawingW + 15}>
                <Arrow
                  points={[0, 0, 0, drawingH]}
                  {...arrowAttr}
                  pointerAtBeginning
                  pointerAtEnding
                />
                <Text
                  text={`${height}`}
                  x={18}
                  y={drawingH / 2 - 19}
                  width={37}
                  rotation={90}
                  align='center'
                  fontSize={13}
                  fontStyle='bold'
                  fill='white'
                />
              </Group>
            </Layer>
          </Stage>
        )}
      </Card>
    )
  },
)

export default ViewDesign
