import useAberturasStore from '@/stores/useAberturasStore'
import {
  Card as CardHeroUI,
  CardHeader,
  CardBody,
  Divider,
  Switch,
  NumberInput,
  Button,
} from '@heroui/react'
import { Accordion, AccordionItem } from '@heroui/react'
import { useState } from 'react'
import { FaRegCheckCircle } from 'react-icons/fa'
import GeneratorPdf from '@/components/ui/modals/GeneratorPdf'

const formatCurrency = new Intl.NumberFormat('es-AR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})
const formatCurrencywithDecimals = new Intl.NumberFormat('es-AR', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

export default function Card() {
  const IVA = 0.105 // 10.5%
  const aberturasStore = useAberturasStore((state) => state.aberturas)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal)
  }

  const totalCompra = aberturasStore.reduce(
    (acc, abertura) =>
      acc +
      (abertura.precio +
        abertura.accesorios.mosquitero +
        abertura.accesorios.premarco) *
        abertura.cantidad,
    0,
  )

  const calcularDescuento = () => {
    return IsCheckedDescuento ? totalCompra * inputDescuento : 0
  }
  const calcularIva = () => {
    return isCheckedIva ? (totalCompra - calcularDescuento()) * IVA : 0
  }

  const calcularImporteTotal = () => {
    return IsCheckedACuenta
      ? totalCompra - calcularDescuento() + inputACuenta + calcularIva()
      : totalCompra - calcularDescuento() + calcularIva()
  }

  const [IsCheckedDescuento, setIsCheckedDescuento] = useState(false)

  const handleCheckDescuento = () => {
    setIsCheckedDescuento(!IsCheckedDescuento)
  }
  const [inputDescuento, setInputDescuento] = useState(0.1)
  const handleInputDescuento = (value: number) => {
    setInputDescuento(Number.isNaN(value) ? 0 : value)
  }

  const [IsCheckedACuenta, setIsCheckedACuenta] = useState(false)
  const handleCheckACuenta = () => {
    setIsCheckedACuenta(!IsCheckedACuenta)
  }

  const [inputACuenta, setInputACuenta] = useState(0)
  const handleInputACuenta = (value: number) => {
    setInputACuenta(Number.isNaN(value) ? 0 : value)
  }

  const [isCheckedIva, setIsCheckedIva] = useState(false)
  const handleCheckIva = () => {
    setIsCheckedIva(!isCheckedIva)
  }

  return (
    <CardHeroUI className='max-w-70 mx-auto pt-4 pb-2'>
      <CardHeader className='pb-0 flex-col items-start'>
        <p className='text-tiny uppercase font-bold'>resumen presupuesto</p>
      </CardHeader>
      <CardBody className='overflow-visible py-2'>
        <div className='flex flex-col w-full items-star justify-center'>
          <Divider className='my-1' />
          <Switch
            isSelected={IsCheckedDescuento}
            onValueChange={handleCheckDescuento}
            color='warning'
            size='sm'
            className='my-2'
          >
            Aplicar descuento
          </Switch>

          {IsCheckedDescuento && (
            <NumberInput
              isWheelDisabled
              className='max-w-xs mb-2'
              label='Descuento'
              minValue={0}
              value={inputDescuento}
              onValueChange={handleInputDescuento}
              placeholder='Ingrese descuento'
              formatOptions={{
                style: 'percent',
              }}
              variant='bordered'
            />
          )}
          <Divider className='my-1' />

          <Accordion
            keepContentMounted={true}
            itemClasses={{
              title: 'text-default-700 text-sm',
              trigger: 'h-12',
              base: 'py-0 w-full',
              subtitle: 'text-default-500 text-xs',
              content: 'p-0',
            }}
          >
            <AccordionItem
              key='1'
              aria-label='Accordion 1'
              title='Cargos adicionales'
            >
              <div className='border-t border-neutral-700'>
                <Switch
                  isSelected={IsCheckedACuenta}
                  onValueChange={handleCheckACuenta}
                  color='warning'
                  size='sm'
                  className='my-2'
                >
                  Saldo pendiente
                </Switch>
                {IsCheckedACuenta && (
                  <NumberInput
                    isClearable
                    isWheelDisabled
                    className='max-w-xs mb-2'
                    label='Saldo a cuenta'
                    minValue={0}
                    value={inputACuenta}
                    onValueChange={handleInputACuenta}
                    placeholder='Ingrese saldo pendiente'
                    formatOptions={{
                      style: 'currency',
                      currency: 'USD',
                    }}
                    variant='bordered'
                  />
                )}
                <Divider className='my-1' />
                <Switch
                  isSelected={isCheckedIva}
                  onValueChange={handleCheckIva}
                  color='warning'
                  size='sm'
                  className='my-2'
                >
                  Incluir IVA ({IVA * 100}%)
                </Switch>
              </div>
            </AccordionItem>
          </Accordion>
          <Divider className='my-1' />
          <p className='text-sm'>Importe total</p>
          <p className='text-2xl font-bold'>
            ARS$ {formatCurrency.format(calcularImporteTotal())}
          </p>
          <div className='flex justify-between w-full mt-2'>
            <p className='text-sm'>Compra:</p>
            <p className='text-sm'>
              $&nbsp;{formatCurrencywithDecimals.format(totalCompra)}
            </p>
          </div>
          {IsCheckedDescuento && (
            <div className='flex justify-between w-full'>
              <p className='text-sm'>Descuento:</p>
              <p className='text-sm'>
                $&nbsp;{formatCurrencywithDecimals.format(calcularDescuento())}
              </p>
            </div>
          )}
          {IsCheckedACuenta && (
            <div className='flex justify-between w-full'>
              <p className='text-sm'>Saldo a cuenta:</p>
              <p className='text-sm'>
                $&nbsp;{formatCurrencywithDecimals.format(inputACuenta)}
              </p>
            </div>
          )}
          {isCheckedIva && (
            <div className='flex justify-between w-full'>
              <p className='text-sm'>IVA:</p>
              <p className='text-sm'>
                $&nbsp;{formatCurrencywithDecimals.format(calcularIva())}
              </p>
            </div>
          )}
          <Button
            variant='bordered'
            color='warning'
            startContent={<FaRegCheckCircle size={18} />}
            className='mt-4 mx-auto w-full'
            onPress={handleOpenModal}
          >
            Finalizar presupuesto
          </Button>
          {isOpenModal && (
            <GeneratorPdf
              isOpen={isOpenModal}
              onOpenChange={handleOpenModal}
              compra={{
                totalCompra,
                descuento: calcularDescuento(),
                iva: calcularIva(),
                saldoPendiente: IsCheckedACuenta ? inputACuenta : 0,
                importeFinal: calcularImporteTotal(),
              }}
            />
          )}
        </div>
      </CardBody>
    </CardHeroUI>
  )
}

// import useAberturasStore from '@/stores/useAberturasStore'
// import {
//   Card as CardHeroUI,
//   CardHeader,
//   CardBody,
//   Divider,
//   Switch,
//   NumberInput,
//   Button,
// } from '@heroui/react'
// import { Accordion, AccordionItem } from '@heroui/react'
// import { useState, useMemo } from 'react'
// import { HiCheckCircle, HiCalculator } from 'react-icons/hi'
// import GeneratorPdf from '@/components/ui/modals/GeneratorPdf'
// import useAberturasCompuestasStore from '@/stores/useAberturasCompustasStore'

// const formatCurrency = new Intl.NumberFormat('es-AR', {
//   style: 'currency',
//   currency: 'ARS',
//   minimumFractionDigits: 0,
// })

// export default function Card() {
//   const IVA_PERCENT = 0.105
//   const aberturasStore = useAberturasStore((state) => state.aberturas)
//   const aberturasCompuestasStore = useAberturasCompuestasStore(
//     (state) => state.aberturasComps,
//   )

//   const [isOpenModal, setIsOpenModal] = useState(false)
//   const [IsCheckedDescuento, setIsCheckedDescuento] = useState(false)
//   const [inputDescuento, setInputDescuento] = useState(0.1)
//   const [IsCheckedACuenta, setIsCheckedACuenta] = useState(false)
//   const [inputACuenta, setInputACuenta] = useState(0)
//   const [isCheckedIva, setIsCheckedIva] = useState(false)

//   const handleOpenModal = () => setIsOpenModal(!isOpenModal)

//   const totalCompra = useMemo(() => {
//     const simples = aberturasStore.reduce(
//       (acc, ab) =>
//         acc +
//         (ab.precio +
//           (ab.accesorios?.mosquitero || 0) +
//           (ab.accesorios?.premarco || 0)) *
//           ab.cantidad,
//       0,
//     )
//     const compuestas = aberturasCompuestasStore.reduce(
//       (acc, ab) => acc + ab.precio,
//       0,
//     )
//     return simples + compuestas
//   }, [aberturasStore, aberturasCompuestasStore])

//   const descuentoValor = IsCheckedDescuento ? totalCompra * inputDescuento : 0
//   const subtotalConDescuento = totalCompra - descuentoValor
//   const ivaValor = isCheckedIva ? subtotalConDescuento * IVA_PERCENT : 0
//   const importeTotal =
//     subtotalConDescuento + ivaValor + (IsCheckedACuenta ? inputACuenta : 0)

//   return (
//     <CardHeroUI className='w-full max-w-76 mx-auto bg-zinc-950/80 border border-zinc-800 shadow-xl rounded-xl font-sans'>
//       <CardHeader className='pt-5 px-5 pb-2 flex-col items-start gap-0.5'>
//         <div className='flex items-center gap-1.5 opacity-80'>
//           <HiCalculator className='text-warning text-sm' />
//           <span className='text-[10px] font-bold uppercase tracking-wider text-zinc-500'>
//             Resumen de venta
//           </span>
//         </div>
//         <p className='text-2xl font-bold text-zinc-100 tracking-tight mt-1'>
//           {formatCurrency.format(importeTotal)}
//         </p>
//       </CardHeader>

//       <CardBody className='px-5 pb-5 pt-2 gap-3'>
//         <Divider className='bg-zinc-800/40' />

//         {/* Ajustes rápidos */}
//         <div className='flex flex-col gap-2'>
//           <div className='flex items-center justify-between'>
//             <span className='text-[11px] font-semibold text-zinc-400 uppercase tracking-tight'>
//               Descuento
//             </span>
//             <Switch
//               isSelected={IsCheckedDescuento}
//               onValueChange={setIsCheckedDescuento}
//               color='warning'
//               size='sm'
//               className='scale-80'
//             />
//           </div>

//           {IsCheckedDescuento && (
//             <NumberInput
//               size='sm'
//               variant='flat'
//               value={inputDescuento}
//               onValueChange={setInputDescuento}
//               formatOptions={{ style: 'percent' }}
//               className='max-w-full'
//               classNames={{
//                 inputWrapper: 'bg-zinc-900/50 h-8',
//                 input: 'text-xs',
//               }}
//             />
//           )}

//           <Accordion
//             className='px-0'
//             itemClasses={{
//               title: 'text-[11px] text-zinc-500 font-bold uppercase',
//               trigger: 'py-1.5 px-1',
//               content: 'pb-2 pt-1',
//             }}
//           >
//             <AccordionItem key='1' title='Adicionales'>
//               <div className='flex flex-col gap-3'>
//                 <div className='flex items-center justify-between'>
//                   <span className='text-[10px] text-zinc-400 uppercase font-medium'>
//                     A Cuenta
//                   </span>
//                   <Switch
//                     isSelected={IsCheckedACuenta}
//                     onValueChange={setIsCheckedACuenta}
//                     color='warning'
//                     size='sm'
//                     className='scale-75'
//                   />
//                 </div>
//                 {IsCheckedACuenta && (
//                   <NumberInput
//                     size='sm'
//                     variant='flat'
//                     value={inputACuenta}
//                     onValueChange={setInputACuenta}
//                     formatOptions={{ style: 'currency', currency: 'ARS' }}
//                     classNames={{ inputWrapper: 'h-8' }}
//                   />
//                 )}
//                 <div className='flex items-center justify-between'>
//                   <span className='text-[10px] text-zinc-400 uppercase font-medium'>
//                     IVA (10.5%)
//                   </span>
//                   <Switch
//                     isSelected={isCheckedIva}
//                     onValueChange={setIsCheckedIva}
//                     color='warning'
//                     size='sm'
//                     className='scale-75'
//                   />
//                 </div>
//               </div>
//             </AccordionItem>
//           </Accordion>
//         </div>

//         {/* Desglose compacto */}
//         <div className='bg-zinc-900/30 px-3 py-2.5 rounded-lg border border-zinc-800/50 flex flex-col gap-1.5'>
//           <div className='flex justify-between text-[11px]'>
//             <span className='text-zinc-500 font-medium'>Subtotal</span>
//             <span className='text-zinc-300 font-semibold'>
//               {formatCurrency.format(totalCompra)}
//             </span>
//           </div>

//           {IsCheckedDescuento && (
//             <div className='flex justify-between text-[11px]'>
//               <span className='text-warning/80 font-medium'>Bonificación</span>
//               <span className='text-warning/80 font-semibold'>
//                 -{formatCurrency.format(descuentoValor)}
//               </span>
//             </div>
//           )}

//           {isCheckedIva && (
//             <div className='flex justify-between text-[11px]'>
//               <span className='text-zinc-500 font-medium'>Impuestos</span>
//               <span className='text-zinc-300 font-semibold'>
//                 {formatCurrency.format(ivaValor)}
//               </span>
//             </div>
//           )}
//         </div>

//         <Button
//           color='warning'
//           variant='solid'
//           onPress={handleOpenModal}
//           className='w-full font-bold uppercase tracking-tight h-10 rounded-lg text-xs shadow-lg shadow-warning/10'
//           startContent={<HiCheckCircle className='text-lg' />}
//         >
//           Finalizar
//         </Button>

//         {isOpenModal && (
//           <GeneratorPdf
//             isOpen={isOpenModal}
//             onOpenChange={handleOpenModal}
//             compra={{
//               totalCompra,
//               descuento: descuentoValor,
//               iva: ivaValor,
//               saldoPendiente: IsCheckedACuenta ? inputACuenta : 0,
//               importeFinal: importeTotal,
//             }}
//           />
//         )}
//       </CardBody>
//     </CardHeroUI>
//   )
// }
