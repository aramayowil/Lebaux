import { Button } from '@heroui/button'
import { useState } from 'react'
import { Stage, Layer, Rect } from 'react-konva'

type RectCruzProps = {
  x: number
  y: number
  width: number
  height: number
}

const RectCruz = ({ x, y, width, height }: RectCruzProps) => {
  const espCruz = 3
  const sizeCruz = 40
  const [isHovered, setIsHovered] = useState(true)

  const activarHover = () => {
    console.log('hovered')
  }
  return (
    <>
      {/* rectangulo arriba */}
      <Rect
        x={x}
        y={y - sizeCruz - espCruz}
        width={sizeCruz}
        height={sizeCruz}
        fill='blue'
        shadowBlur={2}
        cornerRadius={10}
      />
      <Button
        color='primary'
        radius='md'
        style={{
          position: 'absolute',
          top: x, // misma coordenada Y
          left: y, // misma coordenada X
          width: sizeCruz,
          height: sizeCruz,
        }}
      >
        +
      </Button>

      {/* rectangulo abajo */}
      <Rect
        x={x}
        y={y - sizeCruz - espCruz}
        width={sizeCruz}
        height={sizeCruz}
        fill='blue'
        shadowBlur={2}
        cornerRadius={10}
        onMouseOver={() => {
          console.log('estoy en el over')
        }}
        onMouseOut={() => {
          console.log('estoy fuera')
        }}
      />
      {/* rectangulo abajo */}
      <Rect
        x={x}
        y={y + height + espCruz}
        width={sizeCruz}
        height={sizeCruz}
        fill='blue'
        shadowBlur={2}
        cornerRadius={10}
        onMouseOver={() => {
          console.log('estoy en el over')
        }}
        onMouseOut={() => {
          console.log('estoy fuera')
        }}
      />
      {/* rectangulo izquierda */}
      <Rect
        x={x - sizeCruz - espCruz}
        y={y}
        width={sizeCruz}
        height={sizeCruz}
        fill='blue'
        shadowBlur={2}
        cornerRadius={10}
      />
      {/* rectangulo derecha */}
      <Rect
        x={x + width + espCruz}
        y={y}
        width={sizeCruz}
        height={sizeCruz}
        fill='blue'
        shadowBlur={2}
        cornerRadius={10}
        onMouseOver={() => {
          console.log('estoy en el over')
        }}
        onMouseOut={() => {
          console.log('estoy fuera')
        }}
        onClick={() => {
          console.log('estoy abiendo click')
        }}
      />
    </>
  )
}

export default RectCruz
