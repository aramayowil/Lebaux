import React, { useState } from 'react'
import { Stage, Layer, Rect, Group, Line, Text } from 'react-konva'
import { v4 as uuidv4 } from 'uuid'

const MARCO_GROSOR = 30
const ESCALA_VISUAL = 0.25

export default function EditorModenaBiDireccional() {
  const [anchoTotal, setAnchoTotal] = useState(1200)
  const [altoTotal, setAltoTotal] = useState(2050)

  const [arbol, setArbol] = useState<any>({
    id: 'root',
    tipo: 'hoja',
    revestimiento: 'Vidrio Float',
    modoH: 'ninguno',
    cantH: 1,
    manualH: '500',
    modoV: 'ninguno',
    cantV: 1,
    manualV: '400',
  })

  // --- GENERADORES ---

  const genCentrado = (
    tipo: 'division_h' | 'division_v',
    cant: number,
  ): any => {
    const build = (n: number): any => {
      if (n <= 0)
        return { id: uuidv4(), tipo: 'hoja', revestimiento: 'Vidrio Float' }
      return {
        id: uuidv4(),
        tipo,
        ratio: 1 / (n + 1),
        hijoA: { id: uuidv4(), tipo: 'hoja', revestimiento: 'Vidrio Float' },
        hijoB: build(n - 1),
      }
    }
    return build(cant)
  }

  const genHManual = (str: string, hMax: number): any => {
    const alts = str
      .split(',')
      .map((h) => parseFloat(h.trim()))
      .filter((h) => !isNaN(h) && h > 0 && h < hMax)
      .sort((a, b) => a - b)
    const build = (list: number[], base: number): any => {
      if (list.length === 0)
        return { id: uuidv4(), tipo: 'hoja', revestimiento: 'Vidrio Float' }
      const ratio = 1 - (list[0] - base) / (hMax - base)
      return {
        id: uuidv4(),
        tipo: 'division_h',
        ratio,
        hijoA: build(list.slice(1), list[0]),
        hijoB: { id: uuidv4(), tipo: 'hoja', revestimiento: 'Vidrio Float' },
      }
    }
    return build(alts, 0)
  }

  const genVManual = (str: string, wMax: number): any => {
    const dists = str
      .split(',')
      .map((d) => parseFloat(d.trim()))
      .filter((d) => !isNaN(d) && d > 0 && d < wMax)
      .sort((a, b) => a - b)
    const build = (list: number[], base: number): any => {
      if (list.length === 0)
        return { id: uuidv4(), tipo: 'hoja', revestimiento: 'Vidrio Float' }
      const ratio = (list[0] - base) / (wMax - base)
      return {
        id: uuidv4(),
        tipo: 'division_v',
        ratio,
        hijoA: { id: uuidv4(), tipo: 'hoja', revestimiento: 'Vidrio Float' },
        hijoB: build(list.slice(1), list[0]),
      }
    }
    return build(dists, 0)
  }

  const actualizarEstructura = (cambios: any) => {
    setArbol((prev: any) => {
      const s = { ...prev, ...cambios }
      let base: any = {
        id: 'root',
        tipo: 'hoja',
        revestimiento: 'Vidrio Float',
      }

      // Prioridad Vertical luego Horizontal
      if (s.modoV === 'centrado')
        base = { ...base, ...genCentrado('division_v', s.cantV) }
      if (s.modoV === 'manual')
        base = { ...base, ...genVManual(s.manualV, anchoTotal) }

      if (s.modoH === 'centrado')
        base = { ...base, ...genCentrado('division_h', s.cantH) }
      if (s.modoH === 'manual')
        base = { ...base, ...genHManual(s.manualH, altoTotal) }

      return { ...s, ...base }
    })
  }

  const actualizarNodo = (id: string, data: any) => {
    const recursiveUpdate = (nodo: any): any => {
      if (nodo.id === id) return { ...nodo, ...data }
      if (nodo.hijoA)
        return {
          ...nodo,
          hijoA: recursiveUpdate(nodo.hijoA),
          hijoB: recursiveUpdate(nodo.hijoB),
        }
      return nodo
    }
    setArbol((prev: any) => recursiveUpdate(prev))
  }

  return (
    <div className='flex h-screen bg-[#f3f4f6] font-sans overflow-hidden'>
      <aside className='w-96 bg-white border-r p-6 flex flex-col gap-6 shadow-2xl z-20 overflow-y-auto'>
        <h1 className='text-xl font-black border-b-4 border-blue-600 pb-2'>
          EDITOR MODENA
        </h1>

        {/* DIMENSIONES */}
        <section className='grid grid-cols-2 gap-3 bg-zinc-100 p-3 rounded-lg border'>
          <div className='flex flex-col gap-1'>
            <label className='text-[10px] font-bold text-zinc-400 uppercase'>
              Ancho Total
            </label>
            <input
              type='number'
              value={anchoTotal}
              onChange={(e) => setAnchoTotal(Number(e.target.value))}
              className='border p-2 rounded text-sm font-mono'
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-[10px] font-bold text-zinc-400 uppercase'>
              Alto Total
            </label>
            <input
              type='number'
              value={altoTotal}
              onChange={(e) => setAltoTotal(Number(e.target.value))}
              className='border p-2 rounded text-sm font-mono'
            />
          </div>
        </section>

        {/* TRAVESAÑOS */}
        <div className='space-y-6'>
          <section className='space-y-3'>
            <h3 className='text-xs font-bold text-blue-600 uppercase italic'>
              Travesaños Horizontales
            </h3>
            <select
              value={arbol.modoH}
              onChange={(e) => actualizarEstructura({ modoH: e.target.value })}
              className='w-full border p-2 rounded text-sm'
            >
              <option value='ninguno'>Ninguno</option>
              <option value='centrado'>Centrados (Equidistantes)</option>
              <option value='manual'>Manual (Por medidas)</option>
            </select>
            {arbol.modoH === 'centrado' && (
              <input
                type='number'
                value={arbol.cantH}
                onChange={(e) =>
                  actualizarEstructura({ cantH: Number(e.target.value) })
                }
                className='w-full border p-2 rounded text-sm'
                placeholder='Cantidad...'
              />
            )}
            {arbol.modoH === 'manual' && (
              <input
                type='text'
                value={arbol.manualH}
                onChange={(e) =>
                  actualizarEstructura({ manualH: e.target.value })
                }
                className='w-full border p-2 rounded text-sm'
                placeholder='Ej: 500, 1000'
              />
            )}
          </section>

          <section className='space-y-3'>
            <h3 className='text-xs font-bold text-blue-600 uppercase italic'>
              Travesaños Verticales
            </h3>
            <select
              value={arbol.modoV}
              onChange={(e) => actualizarEstructura({ modoV: e.target.value })}
              className='w-full border p-2 rounded text-sm'
            >
              <option value='ninguno'>Ninguno</option>
              <option value='centrado'>Centrados (Equidistantes)</option>
              <option value='manual'>Manual (Por medidas)</option>
            </select>
            {arbol.modoV === 'centrado' && (
              <input
                type='number'
                value={arbol.cantV}
                onChange={(e) =>
                  actualizarEstructura({ cantV: Number(e.target.value) })
                }
                className='w-full border p-2 rounded text-sm'
                placeholder='Cantidad...'
              />
            )}
            {arbol.modoV === 'manual' && (
              <input
                type='text'
                value={arbol.manualV}
                onChange={(e) =>
                  actualizarEstructura({ manualV: e.target.value })
                }
                className='w-full border p-2 rounded text-sm'
                placeholder='Ej: 400, 800'
              />
            )}
          </section>
        </div>

        {/* MODULOS */}
        <section className='space-y-3'>
          <h3 className='text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b pb-1'>
            Configuración de Revestimiento
          </h3>
          <div className='space-y-2'>
            <RenderizarFormularios
              Revestimiento
              nodo={arbol}
              onUpdate={actualizarNodo}
            />
          </div>
        </section>
      </aside>

      <main className='flex-1 flex items-center justify-center p-10 bg-zinc-200/50'>
        <div className='bg-white p-4 shadow-xl'>
          <Stage
            width={anchoTotal * ESCALA_VISUAL}
            height={altoTotal * ESCALA_VISUAL}
          >
            <Layer>
              <RenderizarVisual
                nodo={arbol}
                x={0}
                y={0}
                ancho={anchoTotal}
                alto={altoTotal}
                escala={ESCALA_VISUAL}
              />
            </Layer>
          </Stage>
        </div>
      </main>
    </div>
  )
}

// --- COMPONENTE FORMULARIOS ---
let mIdx = 1
const RenderizarFormularios = ({ nodo, onUpdate, reset = true }: any) => {
  if (reset) mIdx = 1

  if (nodo.tipo === 'hoja') {
    const num = mIdx++
    return (
      <div className='bg-zinc-50 border p-3 rounded-md shadow-sm'>
        <div className='flex justify-between items-center mb-2'>
          <span className='text-[11px] font-black text-zinc-600 uppercase'>
            Módulo {num}
          </span>
        </div>
        <select
          value={nodo.revestimiento}
          onChange={(e) => onUpdate(nodo.id, { revestimiento: e.target.value })}
          className='w-full text-xs border p-2 rounded bg-white'
        >
          <option value='Vidrio Float'>Vidrio Float</option>
          <option value='Vidrio Laminado'>Vidrio Laminado</option>
          <option value='Revestimiento Tubular'>Revestimiento Tubular</option>
        </select>
      </div>
    )
  }

  return (
    <>
      <RenderizarFormularios
        nodo={nodo.hijoA}
        onUpdate={onUpdate}
        reset={false}
      />
      <RenderizarFormularios
        nodo={nodo.hijoB}
        onUpdate={onUpdate}
        reset={false}
      />
    </>
  )
}

// --- RENDER KONVA ---
const RenderizarVisual = ({ nodo, x, y, ancho, alto, escala }: any) => {
  if (nodo.tipo === 'hoja') {
    const color =
      nodo.revestimiento === 'Revestimiento Tubular' ? '#f8fafc' : '#e2e8f0'
    return (
      <Group>
        <Rect
          x={x * escala}
          y={y * escala}
          width={ancho * escala}
          height={alto * escala}
          fill={color}
          stroke='#475569'
          strokeWidth={0.5}
        />
        {nodo.revestimiento === 'Revestimiento Tubular' &&
          // Efecto visual de líneas para el tubular
          [...Array(Math.floor(ancho / 100))].map((_, i) => (
            <Line
              key={i}
              points={[
                (x + (i + 1) * 100) * escala,
                y * escala,
                (x + (i + 1) * 100) * escala,
                (y + alto) * escala,
              ]}
              stroke='#cbd5e1'
              strokeWidth={0.5}
            />
          ))}
      </Group>
    )
  }

  const esH = nodo.tipo === 'division_h'
  const medidaA = (esH ? alto : ancho) * nodo.ratio

  return (
    <Group>
      <RenderizarVisual
        nodo={nodo.hijoA}
        x={x}
        y={y}
        ancho={esH ? ancho : medidaA}
        alto={esH ? medidaA : alto}
        escala={escala}
      />
      <RenderizarVisual
        nodo={nodo.hijoB}
        x={esH ? x : x + medidaA}
        y={esH ? y + medidaA : y}
        ancho={esH ? ancho : ancho - medidaA}
        alto={esH ? alto : alto}
        escala={escala}
      />
      <Rect
        x={(esH ? x : x + medidaA - MARCO_GROSOR / 2) * escala}
        y={(esH ? y + medidaA - MARCO_GROSOR / 2 : y) * escala}
        width={(esH ? ancho : MARCO_GROSOR) * escala}
        height={(esH ? MARCO_GROSOR : alto) * escala}
        fill='#1e293b'
      />
    </Group>
  )
}

// import React, { useState } from 'react'
// import { Stage, Layer, Rect, Group, Line } from 'react-konva'
// import { v4 as uuidv4 } from 'uuid'

// const MARCO_GROSOR = 30
// const ESCALA_VISUAL = 0.25

// export default function EditorModenaBiDireccional() {
//   const [anchoTotal, setAnchoTotal] = useState(1200)
//   const [altoTotal, setAltoTotal] = useState(2050)

//   const [arbol, setArbol] = useState({
//     id: 'root',
//     tipo: 'hoja',
//     contenido: 'puerta',
//     ladoAbrir: 'derecho',
//     // Configuración Horizontal
//     modoH: 'ninguno',
//     cantH: 1,
//     manualH: '500',
//     // Configuración Vertical
//     modoV: 'ninguno',
//     cantV: 1,
//     manualV: '400',
//   })

//   // --- MOTORES DE GENERACIÓN ---

//   // Generador Horizontal (Desde abajo hacia arriba)
//   const genHManual = (str: string, hMax: number): any => {
//     const alts = str
//       .split(',')
//       .map((h) => parseFloat(h.trim()))
//       .filter((h) => !isNaN(h) && h > 0 && h < hMax)
//       .sort((a, b) => a - b)
//     const build = (list: number[], base: number): any => {
//       if (list.length === 0)
//         return { id: uuidv4(), tipo: 'hoja', contenido: 'fijo' }
//       const ratio = 1 - (list[0] - base) / (hMax - base)
//       return {
//         id: uuidv4(),
//         tipo: 'division_h',
//         ratio,
//         hijoA: build(list.slice(1), list[0]),
//         hijoB: { id: uuidv4(), tipo: 'hoja' },
//       }
//     }
//     return build(alts, 0)
//   }

//   // Generador Vertical (De izquierda a derecha)
//   const genVManual = (str: string, wMax: number): any => {
//     const dists = str
//       .split(',')
//       .map((d) => parseFloat(d.trim()))
//       .filter((d) => !isNaN(d) && d > 0 && d < wMax)
//       .sort((a, b) => a - b)
//     const build = (list: number[], base: number): any => {
//       if (list.length === 0)
//         return { id: uuidv4(), tipo: 'hoja', contenido: 'fijo' }
//       const ratio = (list[0] - base) / (wMax - base)
//       return {
//         id: uuidv4(),
//         tipo: 'division_v',
//         ratio,
//         hijoA: { id: uuidv4(), tipo: 'hoja' },
//         hijoB: build(list.slice(1), list[0]),
//       }
//     }
//     return build(dists, 0)
//   }

//   const genCentrado = (
//     tipo: 'division_h' | 'division_v',
//     cant: number,
//   ): any => {
//     if (cant <= 0) return { id: uuidv4(), tipo: 'hoja', contenido: 'fijo' }
//     return {
//       id: uuidv4(),
//       tipo,
//       ratio: 1 / (cant + 1),
//       hijoA: { id: uuidv4(), tipo: 'hoja' },
//       hijoB: genCentrado(tipo, cant - 1),
//     }
//   }

//   const actualizarEstructura = (cambios: any) => {
//     setArbol((prev) => {
//       const s = { ...prev, ...cambios }
//       let base: any = {
//         id: 'root',
//         tipo: 'hoja',
//         contenido: 'puerta',
//         ladoAbrir: s.ladoAbrir,
//       }

//       // Aplicar Verticales primero (Estructura principal)
//       if (s.modoV === 'centrado')
//         base = { ...base, ...genCentrado('division_v', s.cantV) }
//       if (s.modoV === 'manual')
//         base = { ...base, ...genVManual(s.manualV, anchoTotal) }

//       // Aplicar Horizontales (Esta lógica es simplificada para el ejemplo: afecta a todo el marco)
//       if (s.modoH === 'centrado')
//         base = { ...base, ...genCentrado('division_h', s.cantH) }
//       if (s.modoH === 'manual')
//         base = { ...base, ...genHManual(s.manualH, altoTotal) }

//       return { ...s, ...base }
//     })
//   }

//   return (
//     <div className='flex h-screen bg-[#f3f4f6] font-sans overflow-hidden'>
//       <aside className='w-96 bg-white border-r p-6 flex flex-col gap-6 shadow-2xl z-20 overflow-y-auto'>
//         <h1 className='text-xl font-black'>Configurador Pro</h1>

//         {/* DIMENSIONES */}
//         <section className='grid grid-cols-2 gap-3 bg-zinc-50 p-3 rounded-lg border'>
//           <div className='flex flex-col gap-1'>
//             <label className='text-[10px] font-bold text-zinc-400 uppercase'>
//               Ancho (X)
//             </label>
//             <input
//               type='number'
//               value={anchoTotal}
//               onChange={(e) => setAnchoTotal(Number(e.target.value))}
//               className='border p-2 rounded text-sm font-mono focus:ring-2 ring-blue-500 outline-none'
//             />
//           </div>
//           <div className='flex flex-col gap-1'>
//             <label className='text-[10px] font-bold text-zinc-400 uppercase'>
//               Alto (Y)
//             </label>
//             <input
//               type='number'
//               value={altoTotal}
//               onChange={(e) => setAltoTotal(Number(e.target.value))}
//               className='border p-2 rounded text-sm font-mono focus:ring-2 ring-blue-500 outline-none'
//             />
//           </div>
//         </section>

//         {/* TRAVESAÑOS HORIZONTALES */}
//         <section className='space-y-3'>
//           <h3 className='text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b pb-1'>
//             Horizontales (Y)
//           </h3>
//           <select
//             value={arbol.modoH}
//             onChange={(e) => actualizarEstructura({ modoH: e.target.value })}
//             className='w-full border p-2 rounded text-sm'
//           >
//             <option value='ninguno'>Ninguno</option>
//             <option value='centrado'>Centrados</option>
//             <option value='manual'>Manual (Desde abajo)</option>
//           </select>
//           {arbol.modoH === 'centrado' && (
//             <input
//               type='number'
//               value={arbol.cantH}
//               onChange={(e) =>
//                 actualizarEstructura({ cantH: Number(e.target.value) })
//               }
//               className='w-full border p-2 rounded text-sm'
//               placeholder='Cant.'
//             />
//           )}
//           {arbol.modoH === 'manual' && (
//             <input
//               type='text'
//               value={arbol.manualH}
//               onChange={(e) =>
//                 actualizarEstructura({ manualH: e.target.value })
//               }
//               className='w-full border p-2 rounded text-sm font-mono'
//               placeholder='Ej: 500, 1000'
//             />
//           )}
//         </section>

//         {/* TRAVESAÑOS VERTICALES */}
//         <section className='space-y-3'>
//           <h3 className='text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b pb-1'>
//             Verticales (X)
//           </h3>
//           <select
//             value={arbol.modoV}
//             onChange={(e) => actualizarEstructura({ modoV: e.target.value })}
//             className='w-full border p-2 rounded text-sm'
//           >
//             <option value='ninguno'>Ninguno</option>
//             <option value='centrado'>Centrados</option>
//             <option value='manual'>Manual (Desde izquierda)</option>
//           </select>
//           {arbol.modoV === 'centrado' && (
//             <input
//               type='number'
//               value={arbol.cantV}
//               onChange={(e) =>
//                 actualizarEstructura({ cantV: Number(e.target.value) })
//               }
//               className='w-full border p-2 rounded text-sm'
//               placeholder='Cant.'
//             />
//           )}
//           {arbol.modoV === 'manual' && (
//             <input
//               type='text'
//               value={arbol.manualV}
//               onChange={(e) =>
//                 actualizarEstructura({ manualV: e.target.value })
//               }
//               className='w-full border p-2 rounded text-sm font-mono'
//               placeholder='Ej: 400, 800'
//             />
//           )}
//         </section>

//         {/* GIRO */}
//         <section className='space-y-3'>
//           <h3 className='text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b pb-1'>
//             Apertura
//           </h3>
//           <div className='flex bg-zinc-100 p-1 rounded-lg'>
//             {['izquierdo', 'derecho'].map((l) => (
//               <button
//                 key={l}
//                 onClick={() => actualizarEstructura({ ladoAbrir: l })}
//                 className={`flex-1 py-2 text-[10px] font-bold rounded-md transition-all ${arbol.ladoAbrir === l ? 'bg-white shadow text-blue-600' : 'text-zinc-400'}`}
//               >
//                 {l.toUpperCase()}
//               </button>
//             ))}
//           </div>
//         </section>
//       </aside>

//       {/* VISOR */}
//       <main className='flex-1 flex items-center justify-center p-10 bg-zinc-200/50'>
//         <div className='bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded border border-zinc-300'>
//           <Stage
//             width={anchoTotal * ESCALA_VISUAL}
//             height={altoTotal * ESCALA_VISUAL}
//           >
//             <Layer>
//               <RenderizarVisual
//                 nodo={arbol}
//                 x={0}
//                 y={0}
//                 ancho={anchoTotal}
//                 alto={altoTotal}
//                 escala={ESCALA_VISUAL}
//               />
//             </Layer>
//           </Stage>
//         </div>
//       </main>
//     </div>
//   )
// }

// const RenderizarVisual = ({ nodo, x, y, ancho, alto, escala }: any) => {
//   if (nodo.tipo === 'hoja') {
//     return (
//       <Group>
//         <Rect
//           x={x * escala}
//           y={y * escala}
//           width={ancho * escala}
//           height={alto * escala}
//           fill='white'
//           stroke='#333'
//           strokeWidth={1}
//         />
//         {nodo.contenido === 'puerta' && (
//           <Line
//             points={
//               nodo.ladoAbrir === 'derecho'
//                 ? [
//                     x * escala,
//                     y * escala,
//                     (x + ancho) * escala,
//                     (y + alto / 2) * escala,
//                     x * escala,
//                     (y + alto) * escala,
//                   ]
//                 : [
//                     (x + ancho) * escala,
//                     y * escala,
//                     x * escala,
//                     (y + alto / 2) * escala,
//                     (x + ancho) * escala,
//                     (y + alto) * escala,
//                   ]
//             }
//             stroke='#cbd5e1'
//             strokeWidth={1}
//             dash={[5, 5]}
//           />
//         )}
//       </Group>
//     )
//   }

//   const esH = nodo.tipo === 'division_h'
//   const medidaA = (esH ? alto : ancho) * nodo.ratio

//   return (
//     <Group>
//       <RenderizarVisual
//         nodo={nodo.hijoA}
//         x={x}
//         y={y}
//         ancho={esH ? ancho : medidaA}
//         alto={esH ? medidaA : alto}
//         escala={escala}
//       />
//       <RenderizarVisual
//         nodo={nodo.hijoB}
//         x={esH ? x : x + medidaA}
//         y={esH ? y + medidaA : y}
//         ancho={esH ? ancho : ancho - medidaA}
//         alto={esH ? alto : alto}
//         escala={escala}
//       />
//       <Rect
//         x={(esH ? x : x + medidaA - MARCO_GROSOR / 2) * escala}
//         y={(esH ? y + medidaA - MARCO_GROSOR / 2 : y) * escala}
//         width={(esH ? ancho : MARCO_GROSOR) * escala}
//         height={(esH ? MARCO_GROSOR : alto) * escala}
//         fill='#1a1a1a'
//       />
//     </Group>
//   )
// }
