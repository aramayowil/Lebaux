import React, { useState, useMemo } from 'react'
import { Stage, Layer, Rect, Text, Group, Line } from 'react-konva'
import { v4 as uuidv4 } from 'uuid'

// --- TIPOS ---
type TipoHoja = 'fijo' | 'rebatible' | 'puerta' | 'corrediza'

interface Nodo {
  id: string
  tipo: 'hoja' | 'division_v' | 'division_h'
  contenido?: TipoHoja
  ratio?: number // Porcentaje de la división (0 a 1)
  hijoA?: Nodo
  hijoB?: Nodo
}

// --- CONFIGURACIÓN TÉCNICA ---
const MARCO_GROSOR = 45 // mm reales
const ESCALA_VISUAL = 0.2
const PADDING = 50

export default function PaginaDisenoAberturas() {
  const [anchoTotal, setAnchoTotal] = useState(4000)
  const [altoTotal, setAltoTotal] = useState(2100)
  const [seleccionado, setSeleccionado] = useState<string | null>(null)

  // Estado inicial: Un solo paño fijo
  const [arbol, setArbol] = useState<Nodo>({
    id: 'root',
    tipo: 'hoja',
    contenido: 'fijo',
  })

  // --- LÓGICA DE MODIFICACIÓN ---
  const dividir = (id: string, orientacion: 'division_v' | 'division_h') => {
    const actualizarArbol = (nodo: Nodo): Nodo => {
      if (nodo.id === id) {
        return {
          id: nodo.id,
          tipo: orientacion,
          ratio: 0.5,
          hijoA: { id: uuidv4(), tipo: 'hoja', contenido: 'fijo' },
          hijoB: { id: uuidv4(), tipo: 'hoja', contenido: 'fijo' },
        }
      }
      if (nodo.hijoA && nodo.hijoB) {
        return {
          ...nodo,
          hijoA: actualizarArbol(nodo.hijoA),
          hijoB: actualizarArbol(nodo.hijoB),
        }
      }
      return nodo
    }
    setArbol(actualizarArbol(arbol))
  }

  const cambiarTipo = (id: string, nuevoTipo: TipoHoja) => {
    const actualizarArbol = (nodo: Nodo): Nodo => {
      if (nodo.id === id) return { ...nodo, contenido: nuevoTipo }
      if (nodo.hijoA && nodo.hijoB) {
        return {
          ...nodo,
          hijoA: actualizarArbol(nodo.hijoA),
          hijoB: actualizarArbol(nodo.hijoB),
        }
      }
      return nodo
    }
    setArbol(actualizarArbol(arbol))
  }

  return (
    <div className='flex flex-col h-screen bg-zinc-950 text-white font-sans'>
      {/* HEADER / CONTROLES */}
      <div className='p-6 border-b border-zinc-800 flex justify-between items-center bg-black/50'>
        <div className='flex gap-8'>
          <div>
            <label className='block text-[10px] uppercase text-zinc-500 font-bold mb-1'>
              Ancho Total (mm)
            </label>
            <input
              type='number'
              value={anchoTotal}
              onChange={(e) => setAnchoTotal(Number(e.target.value))}
              className='bg-zinc-900 border border-zinc-700 p-2 rounded w-28 text-xl font-mono focus:outline-none focus:border-white'
            />
          </div>
          <div>
            <label className='block text-[10px] uppercase text-zinc-500 font-bold mb-1'>
              Alto Total (mm)
            </label>
            <input
              type='number'
              value={altoTotal}
              onChange={(e) => setAltoTotal(Number(e.target.value))}
              className='bg-zinc-900 border border-zinc-700 p-2 rounded w-28 text-xl font-mono'
            />
          </div>
        </div>

        <div className='flex gap-3'>
          {seleccionado && (
            <>
              <button
                onClick={() => dividir(seleccionado, 'division_v')}
                className='bg-zinc-100 text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-white transition-colors'
              >
                Dividir Vertical
              </button>
              <button
                onClick={() => dividir(seleccionado, 'division_h')}
                className='bg-zinc-100 text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-white transition-colors'
              >
                Dividir Horizontal
              </button>
              <select
                onChange={(e) =>
                  cambiarTipo(seleccionado, e.target.value as TipoHoja)
                }
                className='bg-zinc-800 border border-zinc-700 px-4 py-2 rounded-lg font-bold text-sm'
              >
                <option value='fijo'>Cambiar a Fijo</option>
                <option value='rebatible'>Cambiar a Rebatible</option>
                <option value='puerta'>Cambiar a Puerta</option>
              </select>
            </>
          )}
        </div>
      </div>

      {/* CANVAS AREA */}
      <div className='flex-1 relative overflow-hidden bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] bg-[size:30px_30px]'>
        <Stage width={window.innerWidth} height={window.innerHeight - 150}>
          <Layer x={PADDING} y={PADDING}>
            <RenderizarNodo
              nodo={arbol}
              x={0}
              y={0}
              ancho={anchoTotal}
              alto={altoTotal}
              escala={ESCALA_VISUAL}
              onSelect={setSeleccionado}
              seleccionadoId={seleccionado}
            />
          </Layer>
        </Stage>
      </div>
    </div>
  )
}

// --- COMPONENTE RECURSIVO ---
interface RenderProps {
  nodo: Nodo
  x: number
  y: number
  ancho: number
  alto: number
  escala: number
  onSelect: (id: string) => void
  seleccionadoId: string | null
}

const RenderizarNodo = ({
  nodo,
  x,
  y,
  ancho,
  alto,
  escala,
  onSelect,
  seleccionadoId,
}: RenderProps) => {
  const isSelected = seleccionadoId === nodo.id

  if (nodo.tipo === 'hoja') {
    return (
      <Group onClick={() => onSelect(nodo.id)} onTap={() => onSelect(nodo.id)}>
        {/* Vidrio */}
        <Rect
          x={x * escala}
          y={y * escala}
          width={ancho * escala}
          height={alto * escala}
          fill={isSelected ? '#151515' : '#e0f7fa'}
          stroke='#444'
          strokeWidth={1}
          opacity={0.8}
        />
        {/* Etiqueta de Medidas */}
        <Text
          x={x * escala}
          y={(y + alto / 2 - 10) * escala}
          width={ancho * escala}
          text={`${nodo.contenido?.toUpperCase()}\n${ancho} × ${alto}`}
          align='center'
          fontSize={12}
          fill={isSelected ? '#fff' : '#45454c'}
          fontStyle='bold'
        />
        {/* Marcador de Selección */}
        {isSelected && (
          <Rect
            x={x * escala}
            y={y * escala}
            width={ancho * escala}
            height={alto * escala}
            stroke='#fff'
            strokeWidth={2}
            dash={[5, 5]}
          />
        )}
      </Group>
    )
  }

  // Lógica de División
  if (nodo.tipo === 'division_v') {
    const anchoA = ancho * (nodo.ratio || 0.5)
    const anchoB = ancho - anchoA
    return (
      <>
        <RenderizarNodo
          {...{
            nodo: nodo.hijoA!,
            x,
            y,
            ancho: anchoA,
            alto,
            escala,
            onSelect,
            seleccionadoId,
          }}
        />
        <RenderizarNodo
          {...{
            nodo: nodo.hijoB!,
            x: x + anchoA,
            y,
            ancho: anchoB,
            alto,
            escala,
            onSelect,
            seleccionadoId,
          }}
        />
        {/* Perfil Intermedio */}
        <Rect
          x={(x + anchoA - MARCO_GROSOR / 2) * escala}
          y={y * escala}
          width={MARCO_GROSOR * escala}
          height={alto * escala}
          fill='#333'
        />
      </>
    )
  }

  if (nodo.tipo === 'division_h') {
    const altoA = alto * (nodo.ratio || 0.5)
    const altoB = alto - altoA
    return (
      <>
        <RenderizarNodo
          {...{
            nodo: nodo.hijoA!,
            x,
            y,
            ancho,
            alto: altoA,
            escala,
            onSelect,
            seleccionadoId,
          }}
        />
        <RenderizarNodo
          {...{
            nodo: nodo.hijoB!,
            x,
            y: y + altoA,
            ancho,
            alto: altoB,
            escala,
            onSelect,
            seleccionadoId,
          }}
        />
        {/* Perfil Intermedio */}
        <Rect
          x={x * escala}
          y={(y + altoA - MARCO_GROSOR / 2) * escala}
          width={ancho * escala}
          height={MARCO_GROSOR * escala}
          fill='#333'
        />
      </>
    )
  }

  return null
}
