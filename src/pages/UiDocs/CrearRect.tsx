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
  placement: 'top' | 'bottom' | 'left' | 'right' | 'center'
}

const CrearRect = ({ rectPos, placement }: CrearRectProps) => {
  const sizeCruz = 40
  const espCruz = 3

  const [isClicked, setIsClicked] = useState(false)
  const activarClick = () => {
    console.log('clicked')
    setIsClicked(!isClicked)
  }

  return (
    <>
      <Rect
        x={rectPos.x}
        y={rectPos.y}
        width={rectPos.width}
        height={rectPos.height}
        fill='blue'
        shadowBlur={2}
        onClick={activarClick}
      />
      {isClicked && (
        <CrearRect
          rectPos={{ x: 200, y: 300, width: 200, height: 159 }}
          placement='center'
        />
      )}
      <div
        style={{
          position: 'relative',
        }}
      >
        {isClicked && (
          <>
            <PopoverButton
              placement='top'
              styleButton={{
                position: 'absolute',
                top: rectPos.y - sizeCruz - espCruz, // misma coordenada Y
                left: rectPos.x, // misma coordenada X
                width: sizeCruz,
                height: sizeCruz,
              }}
            />

            <PopoverButton
              styleButton={{
                position: 'absolute',
                top: rectPos.y + rectPos.height + espCruz, // misma coordenada Y
                left: rectPos.x, // misma coordenada X
                width: sizeCruz,
                height: sizeCruz,
              }}
            />

            <PopoverButton
              styleButton={{
                position: 'absolute',
                top: rectPos.y, // misma coordenada Y
                left: rectPos.x - sizeCruz - espCruz, // misma coordenada X
                width: sizeCruz,
                height: sizeCruz,
              }}
            />

            <PopoverButton
              styleButton={{
                position: 'absolute',
                top: rectPos.y, // misma coordenada Y
                left: rectPos.x + rectPos.width + espCruz, // misma coordenada X
                width: sizeCruz,
                height: sizeCruz,
              }}
            />
          </>
        )}
      </div>
    </>
  )
}

export default CrearRect
