import React from 'react'

// Componente principal para dibujar la abertura con sus dimensiones
// Recibe windowWidth y windowHeight como props, con valores por defecto
const AberturaConDimensiones = ({ windowWidth = 900, windowHeight = 2050 }) => {
  // Constantes para el dibujo, basadas en las proporciones de la imagen
  const frameThickness = 4 // Grosor del marco exterior de la ventana
  // Offset para el primer marco interior desde el borde exterior. Ajustado para que se vea bien.
  const innerFrameOffset = 60
  const innerFrameBorder = 4 // Grosor de las líneas del primer y tercer marco interior
  // Offset para el tercer marco interno, relativo al primer marco interior
  const thirdInnerFrameOffset = 30
  // Coordenada Y para la línea divisoria horizontal (a la mitad de la altura total de la ventana)
  const horizontalDividerY = windowHeight / 2
  // Grosor del nuevo travesaño central, ahora igual al offset del tercer marco
  const crossbarThickness = thirdInnerFrameOffset

  // Constantes para las líneas de dimensión
  // Distancia de las líneas de dimensión (horizontal y vertical) al marco de la ventana
  const dimLineDistanceFromFrame = 80 // Distancia uniforme del marco a la línea de dimensión
  // Longitud de las líneas de extensión que salen del marco de la ventana hacia las líneas de dimensión
  // const extensionLineFromFrame = 50; // Eliminada, ya no se usa para estas líneas
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
  const innerRectX = windowX + innerFrameOffset
  const innerRectY = windowY + innerFrameOffset
  const innerRectWidth = windowWidth - innerFrameOffset * 2
  const innerRectHeight = windowHeight - innerFrameOffset * 2

  // Calcular las dimensiones y posición del tercer marco interno (dentro del primer marco interior)
  const thirdInnerRectX = innerRectX + thirdInnerFrameOffset
  const thirdInnerRectY = innerRectY + thirdInnerFrameOffset
  const thirdInnerRectWidth = innerRectWidth - thirdInnerFrameOffset * 2
  const thirdInnerRectHeight = innerRectHeight - thirdInnerFrameOffset * 2

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
    <div className="flex justify-center items-center p-5">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-lg w-full">
        {/* Título eliminado */}
        <svg
          // El SVG ocupará el 100% del ancho de su contenedor, pero con un máximo de 400px
          width="auto"
          height="auto"
          // El viewBox define el sistema de coordenadas interno del SVG
          // y permite que el dibujo se escale sin perder calidad
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          xmlns="http://www.w3.org/2000/svg"
          style={{
            backgroundColor: 'white',
            borderRadius: '10px',
            border: '1px solid #ddd',
            maxWidth: '200px', // Ancho máximo del SVG
            maxHeight: '200px', // Alto máximo del SVG
          }}
          className="max-w-full h-auto block mx-auto" // Clases Tailwind para responsividad
        >
          {/* Grupo que contiene todo el dibujo y se traslada para centrarlo */}
          <g transform={`translate(${translateX}, ${translateY})`}>
            {/* Marco exterior de la ventana */}
            <rect
              x={windowX}
              y={windowY}
              width={windowWidth}
              height={windowHeight}
              fill="none"
              stroke="black"
              strokeWidth={frameThickness}
              rx="10"
              ry="10" // Esquinas ligeramente redondeadas para el marco exterior
            />

            {/* Primer marco interior (simulando el vidrio), ajustado para ser un rectángulo completo */}
            <rect
              x={innerRectX}
              y={innerRectY}
              width={innerRectWidth}
              height={innerRectHeight}
              fill="none"
              stroke="black"
              strokeWidth={innerFrameBorder} // Grosor de 4
              rx="5"
              ry="5" // Esquinas ligeramente redondeadas para el marco interior
            />

            {/* Tercer marco interno (el nuevo) */}
            <rect
              x={thirdInnerRectX}
              y={thirdInnerRectY}
              width={thirdInnerRectWidth}
              height={thirdInnerRectHeight}
              fill="none"
              stroke="black"
              strokeWidth={innerFrameBorder} // Mismo grosor de borde que el segundo marco (4)
              rx="5"
              ry="5" // Esquinas ligeramente redondeadas
            />

            {/* Travesaño horizontal en el medio del marco más interno */}
            <rect
              x={thirdInnerRectX}
              y={windowY + horizontalDividerY - crossbarThickness / 2} // Centra el travesaño verticalmente
              width={thirdInnerRectWidth}
              height={crossbarThickness} // Usa el grosor del travesaño
              fill="white" // Relleno blanco para el travesaño
              stroke="black"
              strokeWidth="4" // Borde del travesaño ahora con grosor de 4
            />

            {/* Nueva línea diagonal: desde la esquina superior derecha del tercer marco interno hasta la mitad de la altura del lado izquierdo del tercer marco */}
            <line
              x1={thirdInnerRectX + thirdInnerRectWidth} // Esquina superior derecha del tercer marco (X)
              y1={thirdInnerRectY} // Esquina superior derecha del tercer marco (Y)
              x2={thirdInnerRectX} // Lado izquierdo del tercer marco (X)
              y2={thirdInnerRectY + thirdInnerRectHeight / 2} // Mitad de la altura del tercer marco (Y)
              stroke="black"
              strokeWidth="4"
              strokeDasharray="20 20" // Línea punteada más larga y separada
            />

            {/* Segunda línea diagonal punteada (reflejo hacia abajo): desde la esquina inferior derecha del tercer marco hasta la mitad de la altura del lado izquierdo del tercer marco */}
            <line
              x1={thirdInnerRectX + thirdInnerRectWidth} // Esquina inferior derecha del tercer marco (X)
              y1={thirdInnerRectY + thirdInnerRectHeight} // Esquina inferior derecha del tercer marco (Y)
              x2={thirdInnerRectX} // Lado izquierdo del tercer marco (X)
              y2={thirdInnerRectY + thirdInnerRectHeight / 2} // Mitad de la altura del tercer marco (Y)
              stroke="black"
              strokeWidth="4"
              strokeDasharray="20 20" // Línea punteada más larga y separada
            />

            {/* Nuevas líneas diagonales del marco exterior al marco más interno */}
            {/* Esquina superior izquierda */}
            <line
              x1={windowX}
              y1={windowY}
              x2={thirdInnerRectX}
              y2={thirdInnerRectY}
              stroke="black"
              strokeWidth="4" // Grosor de 4
            />
            {/* Esquina superior derecha */}
            <line
              x1={windowX + windowWidth}
              y1={windowY}
              x2={thirdInnerRectX + thirdInnerRectWidth}
              y2={thirdInnerRectY}
              stroke="black"
              strokeWidth="4" // Grosor de 4
            />
            {/* Esquina inferior izquierda */}
            <line
              x1={windowX}
              y1={windowY + windowHeight}
              x2={thirdInnerRectX}
              y2={thirdInnerRectY + thirdInnerRectHeight}
              stroke="black"
              strokeWidth="4" // Grosor de 4
            />
            {/* Esquina inferior derecha */}
            <line
              x1={windowX + windowWidth}
              y1={windowY + windowHeight}
              x2={thirdInnerRectX + thirdInnerRectWidth}
              y2={thirdInnerRectY + thirdInnerRectHeight}
              stroke="black"
              strokeWidth="4" // Grosor de 4
            />

            {/* Grupo para las líneas de dimensión del Ancho (Base) */}
            <g>
              {/* Línea de dimensión horizontal */}
              <line
                x1={windowX}
                y1={horizontalDimLineY}
                x2={windowX + windowWidth}
                y2={horizontalDimLineY}
                stroke="black"
                strokeWidth="4"
              />
              {/* Flechas de la línea de ancho */}
              {/* Flecha izquierda (apunta hacia la derecha) */}
              <polygon
                points={`${windowX},${horizontalDimLineY} ${
                  windowX + arrowSize
                },${horizontalDimLineY - arrowSize / 2} ${
                  windowX + arrowSize
                },${horizontalDimLineY + arrowSize / 2}`}
                fill="black"
              />
              {/* Flecha derecha (apunta hacia la izquierda) */}
              <polygon
                points={`${windowX + windowWidth},${horizontalDimLineY} ${
                  windowX + windowWidth - arrowSize
                },${horizontalDimLineY - arrowSize / 2} ${
                  windowX + windowWidth - arrowSize
                },${horizontalDimLineY + arrowSize / 2}`}
                fill="black"
              />
              {/* Línea perpendicular en la punta de la flecha izquierda */}
              <line
                x1={windowX}
                y1={horizontalDimLineY - tickMarkLength / 2}
                x2={windowX}
                y2={horizontalDimLineY + tickMarkLength / 2}
                stroke="black"
                strokeWidth="4"
              />
              {/* Línea perpendicular en la punta de la flecha derecha */}
              <line
                x1={windowX + windowWidth}
                y1={horizontalDimLineY - tickMarkLength / 2}
                x2={windowX + windowWidth}
                y2={horizontalDimLineY + tickMarkLength / 2}
                stroke="black"
                strokeWidth="4"
              />
              {/* Texto del ancho */}
              <text
                x={windowX + windowWidth / 2}
                y={horizontalDimLineY - 10}
                fontSize={fontSize}
                textAnchor="middle"
                alignmentBaseline="baseline"
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
                stroke="black"
                strokeWidth="4"
              />
              {/* Flecha superior (apunta hacia abajo) */}
              <polygon
                points={`${verticalDimLineX},${windowY} ${
                  verticalDimLineX - arrowSize / 2
                },${windowY + arrowSize} ${verticalDimLineX + arrowSize / 2},${
                  windowY + arrowSize
                }`}
                fill="black"
              />
              {/* Flecha inferior (apunta hacia arriba) */}
              <polygon
                points={`${verticalDimLineX},${windowY + windowHeight} ${
                  verticalDimLineX - arrowSize / 2
                },${windowY + windowHeight - arrowSize} ${
                  verticalDimLineX + arrowSize / 2
                },${windowY + windowHeight - arrowSize}`}
                fill="black"
              />
              {/* Línea perpendicular en la punta de la flecha superior */}
              <line
                x1={verticalDimLineX - tickMarkLength / 2}
                y1={windowY}
                x2={verticalDimLineX + tickMarkLength / 2}
                y2={windowY}
                stroke="black"
                strokeWidth="4"
              />
              {/* Línea perpendicular en la punta de la flecha inferior */}
              <line
                x1={verticalDimLineX - tickMarkLength / 2}
                y1={windowY + windowHeight}
                x2={verticalDimLineX + tickMarkLength / 2}
                y2={windowY + windowHeight}
                stroke="black"
                strokeWidth="4"
              />
              {/* Texto de la altura */}
              <text
                x={verticalDimLineX + arrowSize / 2 + 5} // Ajusta X para estar después de la flecha y un pequeño margen
                y={windowY + windowHeight / 2} // Centrado verticalmente en la línea
                fontSize={fontSize}
                textAnchor="start" // Alinea el texto al inicio de su X
                alignmentBaseline="middle" // Centra verticalmente el texto
              >
                {windowHeight}
              </text>
            </g>
          </g>
        </svg>
        {/* Texto de dimensiones eliminado */}
      </div>
    </div>
  )
}

export default AberturaConDimensiones
