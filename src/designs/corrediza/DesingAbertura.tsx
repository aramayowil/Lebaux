import { marco, ventana } from './renders'

// Componente principal para dibujar la abertura con sus dimensiones
// Recibe windowWidth y windowHeight como props, con valores por defecto
const Corrediza = ({ windowWidth = 1500, windowHeight = 900 }) => {
  // Constantes para el dibujo, basadas en las proporciones de la imagen

  // Offset para el primer marco interior desde el borde exterior. Ajustado para que se vea bien.

  // Offset para el tercer marco interno, relativo al primer marco interior
  const sizeMarcoVentana = 40
  const sizeMarcoHoja = 30
  // const sizeMarcoVidrio = 15

  // Constantes para las líneas de dimensión
  // Distancia de las líneas de dimensión (horizontal y vertical) al marco de la ventana
  const dimLineDistanceFromFrame = 100 // Distancia uniforme del marco a la línea de dimensión
  // Longitud de las líneas de extensión que salen del marco de la ventana hacia las líneas de dimensión
  const arrowSize = 30 // Tamaño de las puntas de flecha de las líneas de dimensión
  // Tamaño de la fuente para el texto de las dimensiones (relativo al viewBox del SVG)
  const fontSize = 80
  const tickMarkLength = 70 // Longitud de la pequeña línea perpendicular en la punta de la flecha

  // Padding global para centrar todo el dibujo dentro del viewBox
  const globalPadding = 100

  // Calcular las coordenadas de la esquina superior izquierda del marco exterior de la ventana
  // Esto incluye el padding global y el espacio para las líneas de dimensión
  const windowX = globalPadding + dimLineDistanceFromFrame
  const windowY = globalPadding + dimLineDistanceFromFrame

  // Calcular las dimensiones y posición del primer marco interior
  const innerRectX = windowX + sizeMarcoHoja
  const innerRectY = windowY + sizeMarcoHoja
  const innerRectWidth = windowWidth - sizeMarcoHoja * 2
  const innerRectHeight = windowHeight - sizeMarcoHoja * 2

  // --- Calcular las posiciones de las líneas de dimensión ---
  const horizontalDimLineY = windowY - dimLineDistanceFromFrame
  const verticalDimLineX = windowX + windowWidth + dimLineDistanceFromFrame

  // --- Calcular el área real ocupada por todo el dibujo (ventana + dimensiones + textos) ---
  // minX: El punto más a la izquierda del dibujo (inicio de la línea de dimensión izquierda)
  const minContentX = windowX
  // maxX: El punto más a la derecha del dibujo (fin del texto de la altura + su offset)
  // Se añade un factor para el ancho aproximado del texto de la altura
  const maxContentX =
    verticalDimLineX +
    arrowSize / 2 +
    5 +
    String(windowHeight).length * fontSize * 0.5
  // minY: El punto más arriba del dibujo (inicio del texto de la base)
  const minContentY = horizontalDimLineY - fontSize // Considera el texto para el límite superior
  // maxY: El punto más abajo del dibujo (fin de la ventana)
  const maxContentY = windowY + windowHeight

  // Calcular el ancho y alto requerido para el contenido
  const requiredContentWidth = maxContentX - minContentX
  const requiredContentHeight = maxContentY - minContentY

  // Calcular las dimensiones finales del viewBox incluyendo el padding global
  const viewBoxWidth = requiredContentWidth + 2 * globalPadding
  const viewBoxHeight = requiredContentHeight + 2 * globalPadding

  // Calcular la traslación necesaria para centrar el contenido dentro del viewBox
  // Esta traslación se aplicará a un grupo <g> que contiene todo el dibujo
  const translateX = globalPadding - minContentX
  const translateY = globalPadding - minContentY

  return (
    <div className='flex justify-center items-center p-5'>
      <div className='bg-white p-8 rounded-2xl shadow-xl text-center max-w-lg w-full'>
        <svg
          width={viewBoxWidth}
          height={viewBoxHeight}
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          xmlns='http://www.w3.org/2000/svg'
          style={{
            backgroundColor: 'white',
            border: '1px solid #ddd',
            maxWidth: '200px', // Ancho máximo del SVG
            maxHeight: '200px', // Alto máximo del SVG
          }}
          className='max-w-full h-auto block mx-auto' // Clases Tailwind para responsividad
        >
          {/* Grupo que contiene todo el dibujo y se traslada para centrarlo */}
          <g transform={`translate(${translateX}, ${translateY})`}>
            {/* Marco ventana */}
            <>
              {marco(
                windowX,
                windowY,
                windowWidth,
                windowHeight,
                sizeMarcoVentana,
              )}
            </>

            {/* Hoja izquierda ventana */}
            {ventana(
              innerRectX,
              innerRectY,
              innerRectWidth / 2 + sizeMarcoVentana,
              innerRectHeight,
              sizeMarcoVentana,
              0,
            )}
            {/* Hoja derecha ventana */}
            {ventana(
              innerRectX + innerRectWidth / 2 - sizeMarcoVentana,
              innerRectY,
              innerRectWidth / 2 + sizeMarcoVentana,
              innerRectHeight,
              sizeMarcoVentana,
              2,
            )}
            {/* Bipunto izquierdo */}

            <rect
              x={innerRectX}
              y={innerRectY + innerRectHeight / 2 - 80}
              width={30}
              height={160}
              fill='none'
              stroke='black'
              strokeWidth='4' // Grosor de 4
            />

            {/* Bipunto derecho */}
            <rect
              x={innerRectX + innerRectWidth - 30}
              y={innerRectY + innerRectHeight / 2 - 80}
              width={30}
              height={160}
              fill='none'
              stroke='black'
              strokeWidth='4' // Grosor de 4
            />
            {/* Línea divisora */}
            <line
              x1={innerRectX + innerRectWidth / 2 - sizeMarcoVentana}
              y1={innerRectY}
              x2={innerRectX + innerRectWidth / 2 - sizeMarcoVentana}
              y2={innerRectY + innerRectHeight}
              stroke='black'
              strokeWidth='6' // Grosor de 6
            />

            {/* Grupo para las líneas de dimensión del Ancho (Base) */}
            <g>
              {/* Línea de dimensión horizontal */}
              <line
                x1={windowX}
                y1={horizontalDimLineY}
                x2={windowX + windowWidth}
                y2={horizontalDimLineY}
                stroke='black'
                strokeWidth='4'
              />
              {/* Flechas de la línea de ancho */}
              {/* Flecha izquierda (apunta hacia la derecha) */}
              <polygon
                points={`${windowX},${horizontalDimLineY} ${
                  windowX + arrowSize
                },${horizontalDimLineY - arrowSize / 2} ${
                  windowX + arrowSize
                },${horizontalDimLineY + arrowSize / 2}`}
                fill='black'
              />
              {/* Flecha derecha (apunta hacia la izquierda) */}
              <polygon
                points={`${windowX + windowWidth},${horizontalDimLineY} ${
                  windowX + windowWidth - arrowSize
                },${horizontalDimLineY - arrowSize / 2} ${
                  windowX + windowWidth - arrowSize
                },${horizontalDimLineY + arrowSize / 2}`}
                fill='black'
              />
              {/* Línea perpendicular en la punta de la flecha izquierda */}
              <line
                x1={windowX}
                y1={horizontalDimLineY - tickMarkLength / 2}
                x2={windowX}
                y2={horizontalDimLineY + tickMarkLength / 2}
                stroke='black'
                strokeWidth='4'
              />
              {/* Línea perpendicular en la punta de la flecha derecha */}
              <line
                x1={windowX + windowWidth}
                y1={horizontalDimLineY - tickMarkLength / 2}
                x2={windowX + windowWidth}
                y2={horizontalDimLineY + tickMarkLength / 2}
                stroke='black'
                strokeWidth='4'
              />

              {/* Texto del ancho */}
              <text
                x={windowX + windowWidth / 2}
                y={horizontalDimLineY - 10}
                fontSize={fontSize}
                textAnchor='middle'
                alignmentBaseline='baseline'
              >
                {windowWidth}
              </text>
            </g>
            {/* Grupo para las líneas de dimensión de la Altura */}
            <g>
              {/* Línea de dimensión vertical */}
              <line
                x1={verticalDimLineX}
                y1={windowY}
                x2={verticalDimLineX}
                y2={windowY + windowHeight}
                stroke='black'
                strokeWidth='4'
              />
              {/* Flecha superior (apunta hacia abajo) */}
              <polygon
                points={`${verticalDimLineX},${windowY} ${
                  verticalDimLineX - arrowSize / 2
                },${windowY + arrowSize} ${verticalDimLineX + arrowSize / 2},${
                  windowY + arrowSize
                }`}
                fill='black'
              />
              {/* Flecha inferior (apunta hacia arriba) */}
              <polygon
                points={`${verticalDimLineX},${windowY + windowHeight} ${
                  verticalDimLineX - arrowSize / 2
                },${windowY + windowHeight - arrowSize} ${
                  verticalDimLineX + arrowSize / 2
                },${windowY + windowHeight - arrowSize}`}
                fill='black'
              />
              {/* Línea perpendicular en la punta de la flecha superior */}
              <line
                x1={verticalDimLineX - tickMarkLength / 2}
                y1={windowY}
                x2={verticalDimLineX + tickMarkLength / 2}
                y2={windowY}
                stroke='black'
                strokeWidth='4'
              />
              {/* Línea perpendicular en la punta de la flecha inferior */}
              <line
                x1={verticalDimLineX - tickMarkLength / 2}
                y1={windowY + windowHeight}
                x2={verticalDimLineX + tickMarkLength / 2}
                y2={windowY + windowHeight}
                stroke='black'
                strokeWidth='4'
              />
              {/* Texto de la altura */}
              <text
                x={verticalDimLineX + arrowSize / 2 + 5} // Ajusta X para estar después de la flecha y un pequeño margen
                y={windowY + windowHeight / 2} // Centrado verticalmente en la línea
                fontSize={fontSize}
                textAnchor='start' // Alinea el texto al inicio de su X
                alignmentBaseline='middle' // Centra verticalmente el texto
              >
                {windowHeight}
              </text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  )
}

export default Corrediza
