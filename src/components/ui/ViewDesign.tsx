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

        <Stage width={stageSize.width} height={stageSize.height}>
          <Layer x={centerX} y={centerY}>
            {/* 1. GRUPO DE LA IMAGEN (SOLO ESTO SE CAPTURA) */}
            <Group ref={stageRef}>
              <ImageContainer src={imgSrc} width={drawingW} height={drawingH} />
            </Group>

            {/* 2. COTAS (FUERA DEL REF PARA QUE NO SE GUARDEN) */}
            {/* COTA SUPERIOR (ANCHO) */}
            <Group y={-8}>
              <Arrow
                points={[0, 0, drawingW, 0]}
                {...arrowAttr}
                pointerAtBeginning={true}
                pointerAtEnding={true}
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

            {/* COTA LATERAL (ALTO) */}
            <Group x={drawingW + 15}>
              <Arrow
                points={[0, 0, 0, drawingH]}
                {...arrowAttr}
                pointerAtBeginning={true}
                pointerAtEnding={true}
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
      </Card>
    )
  },
)

export default ViewDesign

//codigo con mejoras en la visualizacion

// import {
//   useRef,
//   forwardRef,
//   useImperativeHandle,
//   useEffect,
//   useState,
// } from 'react'
// import { Card } from '@heroui/react'
// import {
//   Stage,
//   Layer,
//   Arrow,
//   Text,
//   Group,
//   Image as KonvaImage,
// } from 'react-konva'
// import { useImage } from 'react-konva-utils'

// type ViewDesignProps = {
//   width: number
//   height: number
//   imgSrc: string
// }

// export interface ViewDesignHandle {
//   save: () => string | undefined
// }

// const ViewDesign = forwardRef<ViewDesignHandle, ViewDesignProps>(
//   ({ width, height, imgSrc }, ref) => {
//     // Referencia específica para el grupo que contiene SOLO la imagen
//     const imageExportRef = useRef<any>(null)
//     const containerRef = useRef<HTMLDivElement>(null)
//     const [stageSize, setStageSize] = useState({ width: 400, height: 300 })

//     const MAX_REFERENCIA_MM = 1500
//     const PADDING_INTERNO = 100

//     const currentWidth = containerRef.current?.offsetWidth || 400
//     const availableW = currentWidth - PADDING_INTERNO
//     const maxAvailableH = 400

//     let currentScale = availableW / MAX_REFERENCIA_MM

//     const projectedW = width * currentScale
//     const projectedH = height * currentScale

//     if (projectedW > availableW || projectedH > maxAvailableH) {
//       currentScale = Math.min(availableW / width, maxAvailableH / height)
//     }

//     const drawingW = width * currentScale
//     const drawingH = height * currentScale

//     const ImageContainer = ({
//       src,
//       w,
//       h,
//     }: {
//       src: string
//       w: number
//       h: number
//     }) => {
//       const [image] = useImage(src)
//       return <KonvaImage image={image} x={0} y={0} width={w} height={h} />
//     }

//     useImperativeHandle(ref, () => ({
//       save: () => {
//         if (imageExportRef.current) {
//           // Captura el área exacta del grupo de la imagen
//           const box = imageExportRef.current.getClientRect()

//           return imageExportRef.current.toDataURL({
//             x: box.x,
//             y: box.y,
//             width: box.width,
//             height: box.height,
//             pixelRatio: 3, // Alta calidad
//           })
//         }
//       },
//     }))

//     useEffect(() => {
//       const handleResize = () => {
//         if (containerRef.current) {
//           setStageSize({
//             width: containerRef.current.offsetWidth,
//             height: Math.max(drawingH + PADDING_INTERNO, 250),
//           })
//         }
//       }
//       handleResize()
//       window.addEventListener('resize', handleResize)
//       return () => window.removeEventListener('resize', handleResize)
//     }, [drawingH])

//     const centerX = (stageSize.width - drawingW) / 2
//     const centerY = (stageSize.height - drawingH) / 2

//     return (
//       <Card
//         ref={containerRef}
//         className='flex-1 flex-col p-4 shadow-sm border-none bg-default-100/50 rounded-lg h-fit items-center w-full overflow-hidden'
//       >
//         <div className='w-full mb-2'>
//           <h2 className='text-[10px] font-bold text-zinc-500 uppercase text-center'>
//             Vista Previa{' '}
//             {width > MAX_REFERENCIA_MM || height > maxAvailableH / currentScale
//               ? '(Ajustado)'
//               : '(Escala Real)'}
//           </h2>
//         </div>

//         <Stage width={stageSize.width} height={stageSize.height}>
//           <Layer>
//             {/* Grupo contenedor para centrar todo en el canvas */}
//             <Group x={centerX} y={centerY}>
//               {/* --- GRUPO DE EXPORTACIÓN (Solo la imagen) --- */}
//               <Group ref={imageExportRef}>
//                 <ImageContainer src={imgSrc} w={drawingW} h={drawingH} />
//               </Group>

//               {/* --- ELEMENTOS VISUALES (No se guardan) --- */}
//               {/* COTA ANCHO */}
//               <Group y={-15}>
//                 <Arrow
//                   points={[0, 0, drawingW, 0]}
//                   pointerLength={6}
//                   pointerWidth={4}
//                   fill='#71717a'
//                   stroke='#71717a'
//                   strokeWidth={1.5}
//                   pointerAtBeginning
//                   pointerAtEnding
//                 />
//                 <Text
//                   text={`${width}`}
//                   x={0}
//                   y={-15}
//                   width={drawingW}
//                   align='center'
//                   fontSize={13}
//                   fontStyle='bold'
//                   fill='white'
//                 />
//               </Group>

//               {/* COTA ALTO */}
//               <Group x={drawingW + 15}>
//                 <Arrow
//                   points={[0, 0, 0, drawingH]}
//                   pointerLength={6}
//                   pointerWidth={4}
//                   fill='#71717a'
//                   stroke='#71717a'
//                   strokeWidth={1.5}
//                   pointerAtBeginning
//                   pointerAtEnding
//                 />
//                 <Text
//                   text={`${height}`}
//                   x={15}
//                   y={drawingH / 2 - 16}
//                   rotation={90}
//                   fontSize={13}
//                   fontStyle='bold'
//                   fill='white'
//                 />
//               </Group>
//             </Group>
//           </Layer>
//         </Stage>
//       </Card>
//     )
//   },
// )

// export default ViewDesign
