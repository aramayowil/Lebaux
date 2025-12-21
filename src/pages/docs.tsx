import DefaultLayout from '@/layouts/default'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  NumberInput,
} from '@heroui/react'

import CrearRect from './UiDocs/CrearRect'
import { useState } from 'react'
import { Layer, Stage } from 'react-konva'

export default function DocsPage() {
  const [showRect, setShowRect] = useState(false)

  const [width, setWidth] = useState(100)
  const [height, setHeight] = useState(100)

  return (
    <DefaultLayout>
      <div className='flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-screen'>
        <div className='flex item-center justify-center'>
          {!showRect && (
            <Popover showArrow offset={10} placement='bottom'>
              <PopoverTrigger>
                <Button color='primary'>Comenzar</Button>
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
                        value={width}
                        onValueChange={setWidth}
                        label='Width'
                        size='sm'
                        variant='bordered'
                      />
                      <NumberInput
                        minValue={0}
                        value={height}
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
          )}
          {showRect && (
            <Stage width={window.innerWidth} height={window.innerHeight}>
              <Layer>
                <CrearRect
                  rectPos={{
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 2,
                    width: width,
                    height: height,
                  }}
                  placement='center'
                />
              </Layer>
            </Stage>
          )}
        </div>
      </div>
    </DefaultLayout>
  )
}
