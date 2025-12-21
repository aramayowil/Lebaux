import { Stage, Layer, Rect } from 'react-konva'
import { useState } from 'react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  NumberInput,
} from '@heroui/react'
import PopoverButton from './PopoverButton'

type CrearRectProps = {
  rectPos: { x: number; y: number; width: number; height: number }
  placement: 'top' | 'bottom' | 'left' | 'right'
}

const CrearRect = ({ rectPos, placement }: CrearRectProps) => {
  const sizeCruz = 40
  const espCruz = 3
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const [isClicked, setIsClicked] = useState(false)
  const activarClick = () => {
    console.log('clicked')
    setIsClicked(!isClicked)
  }

  return (
    <div
      style={{
        position: 'relative',
        width: window.innerWidth,
        height: window.innerHeight,
      }}
    >
      {/* Canvas de Konva */}
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Rect
            x={rectPos.x}
            y={rectPos.y}
            width={rectPos.width}
            height={rectPos.height}
            fill='blue'
            shadowBlur={2}
            onClick={activarClick}
          />
        </Layer>
      </Stage>

      {isClicked && (
        <>
          {/* Botón arriba del rectángulo */}
          <Popover showArrow offset={10} placement='bottom'>
            <PopoverTrigger>
              <Button
                isIconOnly
                style={{
                  position: 'absolute',
                  top: rectPos.y - sizeCruz - espCruz, // misma coordenada Y
                  left: rectPos.x, // misma coordenada X
                  width: sizeCruz,
                  height: sizeCruz,
                }}
              ></Button>
            </PopoverTrigger>
            <PopoverContent className='w-60'>
              {(titleProps) => (
                <div className='px-1 py-2 w-full'>
                  <p
                    className='text-small font-bold text-foreground'
                    {...titleProps}
                  >
                    Dimensions
                  </p>
                  <div className='mt-2 flex flex-col gap-2 w-full'>
                    <NumberInput
                      minValue={0}
                      defaultValue={width}
                      onValueChange={setWidth}
                      label='Width'
                      size='sm'
                      variant='bordered'
                    />
                    <NumberInput
                      minValue={0}
                      defaultValue={height}
                      onValueChange={setHeight}
                      label='Height'
                      size='sm'
                      variant='bordered'
                    />
                    <Button color='primary'>Agregar</Button>
                  </div>
                </div>
              )}
            </PopoverContent>
          </Popover>

          {/* Botón abajo del rectángulo */}
          <Popover showArrow offset={10} placement='bottom'>
            <PopoverTrigger>
              <Button
                isIconOnly
                style={{
                  position: 'absolute',
                  top: rectPos.y + rectPos.height + espCruz, // misma coordenada Y
                  left: rectPos.x, // misma coordenada X
                  width: sizeCruz,
                  height: sizeCruz,
                }}
              ></Button>
            </PopoverTrigger>
            <PopoverContent className='w-60'>
              {(titleProps) => (
                <div className='px-1 py-2 w-full'>
                  <p
                    className='text-small font-bold text-foreground'
                    {...titleProps}
                  >
                    Dimensions
                  </p>
                  <div className='mt-2 flex flex-col gap-2 w-full'>
                    <NumberInput
                      minValue={0}
                      defaultValue={width}
                      onValueChange={setWidth}
                      label='Width'
                      size='sm'
                      variant='bordered'
                    />
                    <NumberInput
                      minValue={0}
                      defaultValue={height}
                      onValueChange={setHeight}
                      label='Height'
                      size='sm'
                      variant='bordered'
                    />
                    <Button color='primary'>Agregar</Button>
                  </div>
                </div>
              )}
            </PopoverContent>
          </Popover>

          {/* Botón izquierda del rectángulo */}
          <Button
            isIconOnly
            style={{
              position: 'absolute',
              top: rectPos.y, // misma coordenada Y
              left: rectPos.x - sizeCruz - espCruz, // misma coordenada X
              width: sizeCruz,
              height: sizeCruz,
            }}
          ></Button>
          <PopoverButton
            styleButton={{
              position: 'absolute',
            }}
          />
          {/* Botón derecha del rectángulo */}
          <Button
            isIconOnly
            style={{
              position: 'absolute',
              top: rectPos.y, // misma coordenada Y
              left: rectPos.x + rectPos.width + espCruz, // misma coordenada X
              width: sizeCruz,
              height: sizeCruz,
            }}
          ></Button>
        </>
      )}
    </div>
  )
}

export default CrearRect
