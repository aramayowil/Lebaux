import { useState, useEffect, useRef } from 'react'
import { Stage, Layer, Rect, Group, Line } from 'react-konva'
import { v4 as uuidv4 } from 'uuid'

const MARCO_GROSOR = 45 // Ajustado para que se vea más robusto como en la imagen
const ESCALA_VISUAL = 0.22

export default function EditorModenaTriColumna() {
  const [anchoTotal, setAnchoTotal] = useState(900)
  const [altoTotal, setAltoTotal] = useState(2100)
  const [manoApertura, setManoApertura] = useState<'izq' | 'der'>('der') // Por defecto derecha como la imagen
  const [nodoSeleccionado, setNodoSeleccionado] = useState<string | null>(null)

  // ESTADO INICIAL: Ahora nace con un travesaño horizontal (tipo 4 en tu imagen)
  const [arbol, setArbol] = useState<any>({
    id: 'root',
    tipo: 'division_h',
    ratio: 0.5,
    hijoA: { id: uuidv4(), tipo: 'hoja', revestimiento: 'Vidrio Float' }, // Paño superior
    hijoB: { id: uuidv4(), tipo: 'hoja', revestimiento: 'Vidrio Float' }, // Paño inferior
    modoH: 'centrado',
    cantH: 1,
    modoV: 'ninguno',
    tipoV: 'entero',
  })

  // --- LÓGICA DE ACTUALIZACIÓN ---
  const actualizarEstructura = (cambios: any) => {
    setArbol((prev: any) => {
      const s = { ...prev, ...cambios }
      const netoW = anchoTotal - MARCO_GROSOR * 2
      const netoH = altoTotal - MARCO_GROSOR * 2

      // Re-generar estructura básica basada en los selects
      let nuevaEstructura: any = {
        id: 'root',
        tipo: 'hoja',
        revestimiento: 'Vidrio Float',
      }

      if (s.modoH === 'centrado') {
        nuevaEstructura = genCentrado('division_h', s.cantH)
      } else if (s.modoH === 'manual') {
        nuevaEstructura = genHManual(s.manualH || '1000', netoH)
      }

      return { ...s, ...nuevaEstructura }
    })
  }

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
      .map((h) => parseFloat(h))
      .filter((h) => !isNaN(h))
      .sort((a, b) => a - b)
    const build = (list: number[], base: number): any => {
      if (list.length === 0)
        return { id: uuidv4(), tipo: 'hoja', revestimiento: 'Vidrio Float' }
      const ratio = (list[0] - base) / (hMax - base)
      return {
        id: uuidv4(),
        tipo: 'division_h',
        ratio,
        hijoA: { id: uuidv4(), tipo: 'hoja', revestimiento: 'Vidrio Float' },
        hijoB: build(list.slice(1), list[0]),
      }
    }
    return build(alts, 0)
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
    <div className='flex h-screen bg-[#f8fafc] font-sans overflow-hidden text-slate-800'>
      {/* SIDEBAR IZQUIERDO */}
      <aside className='w-[300px] bg-white border-r border-slate-200 p-6 flex flex-col gap-6 shadow-sm'>
        <div>
          <h1 className='text-xs font-black text-blue-600 uppercase tracking-widest mb-4'>
            Configuración Real
          </h1>
          <div className='space-y-4'>
            <div className='flex flex-col gap-1'>
              <label className='text-[10px] font-bold text-slate-400 uppercase'>
                Ancho Total (A)
              </label>
              <input
                type='number'
                value={anchoTotal}
                onChange={(e) => setAnchoTotal(Number(e.target.value))}
                className='border border-slate-200 p-2 rounded-lg text-sm font-mono'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-[10px] font-bold text-slate-400 uppercase'>
                Alto Total (H)
              </label>
              <input
                type='number'
                value={altoTotal}
                onChange={(e) => setAltoTotal(Number(e.target.value))}
                className='border border-slate-200 p-2 rounded-lg text-sm font-mono'
              />
            </div>
          </div>
        </div>

        <div className='pt-6 border-t border-slate-100'>
          <label className='text-[10px] font-bold text-slate-400 uppercase mb-2 block'>
            Mano de Apertura
          </label>
          <div className='flex bg-slate-100 p-1 rounded-xl'>
            {(['izq', 'der'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setManoApertura(m)}
                className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${manoApertura === m ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}
              >
                {m === 'izq' ? 'Hacia Izq.' : 'Hacia Der.'}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* VISUALIZADOR CENTRAL */}
      <main
        className='flex-1 flex items-center justify-center p-12 bg-slate-50'
        onClick={() => setNodoSeleccionado(null)}
      >
        <div
          className='relative bg-white p-12 shadow-2xl rounded-sm border border-slate-200'
          onClick={(e) => e.stopPropagation()}
        >
          <Stage
            width={anchoTotal * ESCALA_VISUAL}
            height={altoTotal * ESCALA_VISUAL}
          >
            <Layer>
              {/* Marco Exterior */}
              <Rect
                x={0}
                y={0}
                width={anchoTotal * ESCALA_VISUAL}
                height={altoTotal * ESCALA_VISUAL}
                fill='#334155'
              />

              {/* Contenido (Paños y Travesaños) */}
              <Group
                x={MARCO_GROSOR * ESCALA_VISUAL}
                y={MARCO_GROSOR * ESCALA_VISUAL}
              >
                <RenderizarVisual
                  nodo={arbol}
                  x={0}
                  y={0}
                  ancho={anchoTotal - MARCO_GROSOR * 2}
                  alto={altoTotal - MARCO_GROSOR * 2}
                  escala={ESCALA_VISUAL}
                  seleccionado={nodoSeleccionado}
                  onSelect={setNodoSeleccionado}
                />
              </Group>

              {/* Líneas de apertura estilo Arquitectura */}
              <RenderizarApertura
                mano={manoApertura}
                ancho={anchoTotal}
                alto={altoTotal}
                escala={ESCALA_VISUAL}
              />
            </Layer>
          </Stage>

          {/* Etiquetas de Cota (Estilo imagen) */}
          <div className='absolute -bottom-8 left-0 w-full text-center text-xs font-bold text-slate-600'>
            A = {anchoTotal}mm
          </div>
          <div className='absolute -right-12 top-0 h-full flex items-center text-xs font-bold text-slate-600 [writing-mode:vertical-rl]'>
            H = {altoTotal}mm
          </div>
        </div>
      </main>

      {/* SIDEBAR DERECHO */}
      <aside className='w-[300px] bg-white border-l border-slate-200 p-6 overflow-y-auto'>
        <h2 className='text-xs font-black text-emerald-600 uppercase tracking-widest mb-4'>
          Componentes
        </h2>
        <RenderizarJerarquia
          nodo={arbol}
          onUpdate={actualizarNodo}
          nivel={0}
          seleccionado={nodoSeleccionado}
          onSelect={setNodoSeleccionado}
        />
      </aside>
    </div>
  )
}

// --- SUB-COMPONENTES ACTUALIZADOS ---

const RenderizarApertura = ({ mano, ancho, alto, escala }: any) => {
  const w = ancho * escala
  const h = alto * escala
  const m = MARCO_GROSOR * escala

  // Puntos para crear la "V" lateral que indica apertura
  // La punta de la V toca el centro del lateral donde está el picaporte
  const puntos =
    mano === 'izq'
      ? [w - m, m, m, h / 2, w - m, h - m] // Apertura izquierda (bisagras a la derecha)
      : [m, m, w - m, h / 2, m, h - m] // Apertura derecha (bisagras a la izquierda)

  return (
    <Line
      points={puntos}
      stroke='#64748b'
      strokeWidth={1.5}
      dash={[8, 4]}
      opacity={0.8}
      listening={false}
    />
  )
}

const RenderizarVisual = ({
  nodo,
  x,
  y,
  ancho,
  alto,
  escala,
  seleccionado,
  onSelect,
}: any) => {
  const isSelected = seleccionado === nodo.id

  if (nodo.tipo === 'hoja') {
    return (
      <Rect
        x={x * escala}
        y={y * escala}
        width={ancho * escala}
        height={alto * escala}
        fill={isSelected ? '#eff6ff' : '#f8fafc'}
        stroke={isSelected ? '#3b82f6' : '#cbd5e1'}
        strokeWidth={isSelected ? 2 : 1}
        onClick={(e) => {
          e.cancelBubble = true
          onSelect(nodo.id)
        }}
      />
    )
  }

  const esH = nodo.tipo === 'division_h'
  const mA = ((esH ? alto : ancho) - MARCO_GROSOR) * nodo.ratio

  return (
    <Group>
      <RenderizarVisual
        nodo={nodo.hijoA}
        x={x}
        y={y}
        ancho={esH ? ancho : mA}
        alto={esH ? mA : alto}
        escala={escala}
        seleccionado={seleccionado}
        onSelect={onSelect}
      />
      <Rect
        x={(esH ? x : x + mA) * escala}
        y={(esH ? y + mA : y) * escala}
        width={(esH ? ancho : MARCO_GROSOR) * escala}
        height={(esH ? MARCO_GROSOR : alto) * escala}
        fill='#334155'
        onClick={(e) => {
          e.cancelBubble = true
          onSelect(nodo.id)
        }}
      />
      <RenderizarVisual
        nodo={nodo.hijoB}
        x={esH ? x : x + mA + MARCO_GROSOR}
        y={esH ? y + mA + MARCO_GROSOR : y}
        ancho={esH ? ancho : ancho - mA - MARCO_GROSOR}
        alto={esH ? alto - mA - MARCO_GROSOR : alto}
        escala={escala}
        seleccionado={seleccionado}
        onSelect={onSelect}
      />
    </Group>
  )
}

const RenderizarJerarquia = ({
  nodo,
  onUpdate,
  nivel,
  seleccionado,
  onSelect,
}: any) => {
  const isBranch = nodo.tipo !== 'hoja'
  const isSelected = seleccionado === nodo.id

  return (
    <div
      className={`flex flex-col ${nivel > 0 ? 'ml-4 border-l border-slate-100 pl-2' : ''}`}
    >
      <div
        onClick={() => onSelect(nodo.id)}
        className={`p-3 rounded-lg border cursor-pointer mb-2 transition-all ${isSelected ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-100'}`}
      >
        <p className='text-[9px] font-bold text-slate-400 uppercase'>
          {isBranch ? 'Perfil Travesaño' : 'Paño de Vidrio'}
        </p>
        {!isBranch && (
          <select
            value={nodo.revestimiento}
            onChange={(e) =>
              onUpdate(nodo.id, { revestimiento: e.target.value })
            }
            className='text-xs font-semibold bg-transparent w-full'
          >
            <option value='Vidrio Float'>Vidrio Float 4mm</option>
            <option value='Vidrio Laminado'>Laminado 3+3</option>
          </select>
        )}
      </div>
      {isBranch && (
        <>
          <RenderizarJerarquia
            nodo={nodo.hijoA}
            onUpdate={onUpdate}
            nivel={nivel + 1}
            seleccionado={seleccionado}
            onSelect={onSelect}
          />
          <RenderizarJerarquia
            nodo={nodo.hijoB}
            onUpdate={onUpdate}
            nivel={nivel + 1}
            seleccionado={seleccionado}
            onSelect={onSelect}
          />
        </>
      )}
    </div>
  )
}
