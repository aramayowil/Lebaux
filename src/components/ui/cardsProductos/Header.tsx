function Header() {
  return (
    <header className='hidden md:flex flex-row bg-neutral-900 px-4 py-2 rounded-md mt-2 mb-2 w-full gap-6'>
      <span className='flex flex-wrap text-base font-medium basis-4/12 w-full flex-1 '>
        Producto
      </span>
      <span className='flex flex-wrap text-base font-medium basis-6/12 w-full min-w-30 flex-1'>
        Detalles
      </span>
      <span className='flex flex-wrap text-base font-medium basis-1/12  flex-1'>
        Total
      </span>
      <span className='flex flex-row basis-1/12 flex-1'></span>
    </header>
  )
}

export default Header
