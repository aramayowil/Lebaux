import { HiOutlineDocumentSearch } from 'react-icons/hi'

function TableEmpty() {
  return (
    <div
      className='
      flex flex-col items-center justify-center 
      w-full min-h-64 md:min-h-72 lg:min-h-80
      gap-4 px-8 py-12 
      rounded-2xl 
      bg-zinc-900/30 backdrop-blur-md
      border-2 border-dashed border-zinc-800/60
      transition-all duration-300
    '
    >
      {/* Contenedor del Icono */}
      <div
        className='
        flex items-center justify-center 
        w-16 h-16 rounded-2xl 
        bg-zinc-900 border border-zinc-800
        text-zinc-600 shadow-2xl
      '
      >
        <HiOutlineDocumentSearch className='text-3xl' strokeWidth={1} />
      </div>

      {/* Textos con Jerarquía Técnica */}
      <div className='flex flex-col items-center gap-1'>
        <p
          className='
          font-sans text-sm font-black text-zinc-200 
          uppercase tracking-[0.2em]
        '
        >
          Presupuesto Vacío
        </p>
        <p
          className='
          font-mono text-[0.65rem] text-zinc-500 
          uppercase tracking-normal
        '
        >
          No se han detectado registros en la base de datos local.
        </p>
      </div>

      {/* Decorador Técnico Inferior */}
      <div className='mt-2 flex items-center gap-2 opacity-40'>
        <div className='w-8 h-1 bg-zinc-700' />
        <div className='w-2 h-2 rounded-full border border-zinc-700' />
        <div className='w-8 h-1 bg-zinc-700' />
      </div>
    </div>
  )
}

export default TableEmpty
