import { useState } from 'react'
import {
  Stage,
  Layer,
  Line,
  Arrow,
  Text,
  Group,
  Image as KonvaImage,
} from 'react-konva'
import { Card, Checkbox, Button, ButtonGroup } from '@heroui/react'
import { useImage } from 'react-konva-utils'

// --- INTERFACES ---
interface WindowState {
  width: number
  height: number
  hasTapajuntas: boolean
  tapacinta: 'No' | 'Izquierda' | 'Derecha' | 'Ambos'
  glassType: string
}

interface ImageContainerProps {
  src: string
  x: number
  y: number
  width: number
  height: number
}

// --- COMPONENTE DE IMAGEN ---
const ImageContainer = ({ src, x, y, width, height }: ImageContainerProps) => {
  const [image] = useImage(src)

  return <KonvaImage image={image} x={x} y={y} width={width} height={height} />
}

// --- COMPONENTE PRINCIPAL ---
const VentanaPresupuesto = () => {
  const [config, setConfig] = useState<WindowState>({
    width: 1500,
    height: 1200,
    hasTapajuntas: false,
    tapacinta: 'No',
    glassType: 'Vidrio 4 mm transparente',
  })

  const SCALE = 0.15
  const CANVAS_W = (config.width || 0) * SCALE
  const CANVAS_H = (config.height || 0) * SCALE
  const OFFSET_X = 50
  const OFFSET_Y = 30

  return (
    <div className='flex flex-row p-8 gap-8 bg-gray-50 min-h-screen justify-center items-start text-black'>
      {/* --- PANEL DE CONFIGURACIÓN (IZQUIERDA) --- */}
      <Card className='p-6 w-100 shadow-md bg-white h-fit sticky top-8'>
        <h2 className='text-lg font-bold mb-4'>Configuración de Ventana</h2>
        <div className='space-y-6'>
          <div className='flex gap-4'>
            <div className='flex flex-col flex-1'>
              <span className='text-xs text-gray-500 uppercase font-bold'>
                Ancho
              </span>
              <input
                type='number'
                value={config.width || ''}
                onChange={(e) =>
                  setConfig({ ...config, width: Number(e.target.value) })
                }
                className='border-2 border-gray-200 p-2 rounded-lg focus:border-blue-500 outline-none transition-colors text-black'
              />
            </div>
            <div className='flex flex-col flex-1'>
              <span className='text-xs text-gray-500 uppercase font-bold'>
                Alto
              </span>
              <input
                type='number'
                value={config.height || ''}
                onChange={(e) =>
                  setConfig({ ...config, height: Number(e.target.value) })
                }
                className='border-2 border-gray-200 p-2 rounded-lg focus:border-blue-500 outline-none transition-colors text-black'
              />
            </div>
          </div>

          <Checkbox
            isSelected={config.hasTapajuntas}
            onValueChange={(val) =>
              setConfig({ ...config, hasTapajuntas: val })
            }
          >
            Tapajuntas
          </Checkbox>

          <div className='flex flex-col gap-2'>
            <span className='text-sm text-gray-600 font-medium'>Tapacinta</span>
            <ButtonGroup variant='flat' size='sm'>
              {['No', 'Izquierda', 'Derecha', 'Ambos'].map((opt) => (
                <Button
                  key={opt}
                  color={config.tapacinta === opt ? 'primary' : 'default'}
                  onClick={() =>
                    setConfig({ ...config, tapacinta: opt as any })
                  }
                >
                  {opt}
                </Button>
              ))}
            </ButtonGroup>
          </div>
        </div>
      </Card>

      {/* --- VISUALIZADOR TÉCNICO (DERECHA) --- */}
      <div className='flex flex-col bg-white p-10 border border-gray-200 rounded-lg shadow-sm h-fit min-w-125 items-center'>
        {/* Título centrado sin línea divisoria */}
        <div className='w-full mb-8'>
          <h3 className='text-xs font-bold text-gray-400 uppercase tracking-widest text-center'>
            Vista Previa del Diseño
          </h3>
        </div>

        <Stage width={CANVAS_W + 150} height={CANVAS_H + 150}>
          <Layer x={OFFSET_X} y={OFFSET_Y}>
            <Group>
              <ImageContainer
                src='./images/modena/Corrediza_2H.png'
                x={0}
                y={0}
                width={CANVAS_W}
                height={CANVAS_H}
              />
            </Group>

            {/* Cota Inferior (Solo número) */}
            <Group y={CANVAS_H + 25}>
              <Arrow
                points={[0, 0, CANVAS_W, 0]}
                pointerLength={10}
                pointerWidth={8}
                fill='black'
                stroke='black'
                strokeWidth={1}
                pointerAtBeginning={true}
              />
              <Text
                text={config.width.toString()}
                x={0}
                y={8}
                width={CANVAS_W}
                align='center'
                fontSize={14}
                fontStyle='bold'
              />
            </Group>

            {/* Cota Lateral (Solo número) */}
            <Group x={CANVAS_W + 25}>
              <Line points={[-5, 0, 5, 0]} stroke='black' strokeWidth={1} />
              <Line
                points={[-5, CANVAS_H, 5, CANVAS_H]}
                stroke='black'
                strokeWidth={1}
              />
              <Arrow
                points={[0, 0, 0, CANVAS_H]}
                pointerLength={10}
                pointerWidth={8}
                fill='black'
                stroke='black'
                strokeWidth={1}
                pointerAtBeginning={true}
              />
              <Text
                text={config.height.toString()}
                x={10}
                y={CANVAS_H / 2 - 7}
                fontSize={14}
                fontStyle='bold'
              />
            </Group>
          </Layer>
        </Stage>
      </div>
    </div>
  )
}

export default VentanaPresupuesto
