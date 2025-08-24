import { ModuloCorrediza } from './Modulo.class'

export const ventana = (
  x: number,
  y: number,
  width: number,
  height: number,
  sizeMarcoVentana: number,
  travesaños: number = 0,
  //   sizeMarcoVidrio: number,
) => {
  const moduloHoja = new ModuloCorrediza(
    x + sizeMarcoVentana,
    y + sizeMarcoVentana,
    width - sizeMarcoVentana * 2,
    height - sizeMarcoVentana * 2,
  )

  return (
    <>
      <g key={`marco-ventana-exterior-${x}-${y}`}>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill='white'
          stroke='black'
          strokeWidth='4'
        />
      </g>
      <g key={`marco-ventana-interior-${x}-${y}`}>
        <rect
          x={x + sizeMarcoVentana}
          y={y + sizeMarcoVentana}
          width={width - sizeMarcoVentana * 2}
          height={height - sizeMarcoVentana * 2}
          fill='white'
          stroke='black'
          strokeWidth='4'
        />
        {}
      </g>
      {moduloHoja.subModulos(travesaños).map((modulo, index) => {
        modulo.dibujar()
        return (
          <g key={`modulo-${index}`}>
            <rect
              x={modulo.dibujar().x1}
              y={modulo.dibujar().y1}
              width={modulo.dibujar().x2}
              height={modulo.dibujar().y2}
              fill='#d9e4f4'
              stroke='black'
              strokeWidth='4'
            />
          </g>
        )
      })}
      {/* <g key={`marco-ventana-interior-vidrio-${x}-${y}`}>
        <rect
          x={x + sizeMarcoVentana + sizeMarcoVidrio}
          y={y + sizeMarcoVentana + sizeMarcoVidrio}
          width={width - sizeMarcoVentana * 2 - sizeMarcoVidrio * 2}
          height={height - sizeMarcoVentana * 2 - sizeMarcoVidrio * 2}
          fill='#d9e4f4'
          stroke='black'
          strokeWidth='4'
        />
      </g> */}
      {/* Lineas esquinas */}
      <g>
        <line
          x1={x}
          y1={y}
          x2={x + sizeMarcoVentana}
          y2={y + sizeMarcoVentana}
          stroke='black'
          strokeWidth='4' // Grosor de 4
        />
        <line
          x1={x + width}
          y1={y}
          x2={x + width - sizeMarcoVentana}
          y2={y + sizeMarcoVentana}
          stroke='black'
          strokeWidth='4' // Grosor de 4
        />
        <line
          x1={x}
          y1={y + height}
          x2={x + sizeMarcoVentana}
          y2={y + height - sizeMarcoVentana}
          stroke='black'
          strokeWidth='4' // Grosor de 4
        />
        <line
          x1={x + width}
          y1={y + height}
          x2={x + width - sizeMarcoVentana}
          y2={y + height - sizeMarcoVentana}
          stroke='black'
          strokeWidth='4' // Grosor de 4
        />
      </g>
    </>
  )
}

export const marco = (
  x: number,
  y: number,
  width: number,
  height: number,
  sizeMarco: number,
) => {
  return (
    <>
      <g key={`marco-ventana-exterior-${x}-${y}`}>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill='white'
          stroke='black'
          strokeWidth='4'
        />
      </g>
      <g key={`marco-ventana-interior-${x}-${y}`}>
        <rect
          x={x + sizeMarco}
          y={y + sizeMarco}
          width={width - sizeMarco * 2}
          height={height - sizeMarco * 2}
          fill='white'
          stroke='black'
          strokeWidth='4'
        />
      </g>
    </>
  )
}
