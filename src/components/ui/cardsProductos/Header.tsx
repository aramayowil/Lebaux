function Header() {
  return (
    <header
      className='
      hidden md:grid grid-cols-12 items-center 
      w-full px-6 py-2 mb-2 rounded-xl
      bg-zinc-900/40 backdrop-blur-md
      border border-zinc-800/50
      shadow-sm
    '
    >
      {/* Columna Producto */}
      <div className='col-span-4 flex items-center gap-4'>
        {/* Indicador de acento más sutil */}
        <div className='w-1 h-4 bg-warning-400 rounded-full' />
        <span className='text-[0.6875rem] font-bold text-zinc-200 uppercase tracking-widest font-sans'>
          Producto
        </span>
      </div>

      {/* Columna Especificaciones */}
      <div className='col-span-5'>
        <span className='text-[0.6875rem] font-bold text-zinc-500 uppercase tracking-widest font-sans'>
          Especificaciones Técnicas
        </span>
      </div>

      {/* Columna Subtotal */}
      <div className='col-span-2 text-right'>
        <span
          className='
          text-[0.6875rem] font-black text-zinc-400 uppercase tracking-tighter font-sans
          bg-zinc-100/10 px-3 py-1 rounded-sm border border-white/5
        '
        >
          Subtotal
        </span>
      </div>

      {/* Acciones */}
      <div className='col-span-1 flex justify-end' />
    </header>
  )
}

export default Header
