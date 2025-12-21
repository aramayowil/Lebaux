import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  NumberInput,
} from '@heroui/react'
import { useState } from 'react'
import CrearRect from './CrearRect'

interface PopoverButtonProps {
  placement?: 'top' | 'bottom' | 'left' | 'right'
  styleButton?: React.CSSProperties // <-- aquí tipamos los estilos
}

export default function PopoverButton({
  placement,
  styleButton,
}: PopoverButtonProps) {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [showRect, setShowRect] = useState(false)
  return (
    <div>
      <Popover showArrow offset={10} placement='top'>
        <PopoverTrigger>
          <Button isIconOnly style={styleButton}></Button>
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
                <Button color='primary' onPress={() => setShowRect(true)}>
                  Agregar
                </Button>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
      {showRect && (
        <CrearRect
          rectPos={{
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            width: width,
            height: height,
          }}
          placement='center'
        />
      )}
    </div>
  )
}
