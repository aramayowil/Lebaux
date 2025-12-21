import DefaultLayout from '@/layouts/default'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  NumberInput,
} from '@heroui/react'

import ButtonApp from './UiDocs/CrearRect'
import { Stage } from 'react-konva'
import CrearRect from './UiDocs/CrearRect'
import { useState } from 'react'
import PopoverButton from './UiDocs/PopoverButton'

export default function DocsPage() {
  const createRect = () => {
    console.log('Agregar rectángulo')
  }
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  return (
    <DefaultLayout>
      <div className='flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-screen'>
        <div className='flex item-center justify-center'>
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
        </div>
        <CrearRect
          rectPos={{
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            width: 40,
            height: 40,
          }}
          placement={'top'}
        />
      </div>
    </DefaultLayout>
  )
}
