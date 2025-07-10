import React from 'react'

const Ventana = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="240"
        height="300"
        viewBox="0 0 240 300"
        className="shadow-xl"
      >
        {/* Marco exterior */}
        <rect
          x="0"
          y="0"
          width="240"
          height="300"
          fill="none"
          stroke="#8c8c8c"
          strokeWidth="4"
        />

        {/* Divisiones verticales */}
        <line
          x1="80"
          y1="0"
          x2="80"
          y2="300"
          stroke="#8c8c8c"
          strokeWidth="4"
        />
        <line
          x1="160"
          y1="0"
          x2="160"
          y2="300"
          stroke="#8c8c8c"
          strokeWidth="4"
        />

        {/* Paneles de vidrio */}
        <rect
          x="4"
          y="4"
          width="72"
          height="292"
          fill="#e6faff"
          stroke="#8c8c8c"
          strokeWidth="1"
        />
        <rect
          x="84"
          y="4"
          width="72"
          height="292"
          fill="#e6faff"
          stroke="#8c8c8c"
          strokeWidth="1"
        />
        <rect
          x="164"
          y="4"
          width="72"
          height="292"
          fill="#e6faff"
          stroke="#8c8c8c"
          strokeWidth="1"
        />

        {/* Manijas */}
        <rect x="6" y="140" width="4" height="20" fill="#8c8c8c" />
        <rect x="230" y="140" width="4" height="20" fill="#8c8c8c" />

        {/* Flechas */}
        <text x="36" y="160" fontSize="16" fill="#333">
          →
        </text>
        <text x="116" y="160" fontSize="16" fill="#333">
          ↔
        </text>
        <text x="196" y="160" fontSize="16" fill="#333">
          ←
        </text>

        {/* Dimensiones */}
        <text x="90" y="320" fontSize="12" fill="#000">
          1200
        </text>
        <line x1="0" y1="310" x2="240" y2="310" stroke="#000" strokeWidth="1" />
        <line x1="0" y1="305" x2="0" y2="315" stroke="#000" strokeWidth="1" />
        <line
          x1="240"
          y1="305"
          x2="240"
          y2="315"
          stroke="#000"
          strokeWidth="1"
        />

        <text
          x="250"
          y="160"
          fontSize="12"
          fill="#000"
          transform="rotate(-90 250,160)"
        >
          1500
        </text>
        <line x1="245" y1="0" x2="245" y2="300" stroke="#000" strokeWidth="1" />
        <line x1="240" y1="0" x2="250" y2="0" stroke="#000" strokeWidth="1" />
        <line
          x1="240"
          y1="300"
          x2="250"
          y2="300"
          stroke="#000"
          strokeWidth="1"
        />
      </svg>
    </div>
  )
}

export default Ventana
