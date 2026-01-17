import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  addToast,
} from '@heroui/react'
import { useState } from 'react'
import {
  HiOutlineDocumentText,
  HiOutlineUser,
  HiOutlineCloudArrowDown,
} from 'react-icons/hi2'
import PDF from '@/components/PdfLayout'
import { pdf } from '@react-pdf/renderer'
import useAberturasStore from '@/stores/useAberturasStore'
import useAberturasCompuestasStore from '@/stores/useAberturasCompustasStore'
// import Presupuesto from '@/class/Presupuesto.class'
// import usePresupuestoStore from '@/stores/usePresupuestosStore'
// import capitalize from '@/utils/capitalize_text'

function obtenerFechaHoy() {
  return new Date().toLocaleDateString('es-AR')
}

// const generarReferenciaFormateada = (cantidadActual: number): string => {
//   const fecha = new Date()
//   const tipo = 'COT'
//   const mes = (fecha.getMonth() + 1).toString().padStart(2, '0')
//   const anio = fecha.getFullYear().toString().slice(-2)
//   const correlativo = (cantidadActual + 1).toString().padStart(4, '0')
//   return `${tipo}-${mes}${anio}-${correlativo}`
// }

type GeneratorPdfProps = {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  compra: {
    totalCompra: number
    descuento: number
    iva: number
    saldoPendiente: number
    importeFinal: number
  }
}

function GeneratorPdf({ isOpen, onOpenChange, compra }: GeneratorPdfProps) {
  const [nameCliente, setNameCliente] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Stores de Items
  const aberturasStore = useAberturasStore((state) => state.aberturas)
  // const limpiarSimples = useAberturasStore((state) => state.limpiarAberturas)

  const aberturasCompuestasStore = useAberturasCompuestasStore(
    (state) => state.aberturasComps,
  )
  // const limpiarCompuestas = useAberturasCompuestasStore(
  //   (state) => state.limpiarAberturasComp,
  // )

  // Store de Presupuestos (Historial)
  // const agregarPresupuesto = usePresupuestoStore(
  //   (state) => state.agregarPresupuesto,
  // )

  // Obtenemos la cantidad del Store de Presupuestos para el correlativo
  // const numPresupuestos = usePresupuestoStore.getState().presupuestos.length

  // Generamos la referencia con la nueva estructura
  // const referencia = generarReferenciaFormateada(numPresupuestos)

  //funcion para crear presupuesto
  // const crearPresupuesto = () => {
  //   const todosLosItems = [
  //     ...aberturasStore, // IAbertura[]
  //     ...aberturasCompuestasStore, // IAbertura_Compuesta[]
  //   ]

  //   const nuevoPresupuesto = new Presupuesto(
  //     referencia,
  //     capitalize(nameCliente) || 'Cliente General',
  //     obtenerFechaHoy(),
  //     compra.importeFinal,
  //     todosLosItems,
  //     '',
  //     compra.descuento,
  //     'pendiente',
  //   )

  //   // Guardar en el historial persistente (Zustand -> LocalStorage)
  //   agregarPresupuesto(nuevoPresupuesto)

  //   // Limpiar los campos
  //   limpiarSimples()
  //   limpiarCompuestas()
  // }

  const generarPDF = async (): Promise<void> => {
    setIsLoading(true)
    // crearPresupuesto()
    try {
      const blob = await pdf(
        <PDF
          aberturas={aberturasStore}
          aberturasCompuestas={aberturasCompuestasStore}
          {...compra}
          descuentoCalculado={compra.descuento}
          ivaCalculado={compra.iva}
          nameCliente={nameCliente || ''}
        />,
      ).toBlob()

      const url = URL.createObjectURL(blob)
      window.open(url, '_blank')

      const enlace = document.createElement('a')
      enlace.href = url
      enlace.download = `Presupuesto-${nameCliente || obtenerFechaHoy()}.pdf`
      enlace.click()

      setTimeout(() => {
        URL.revokeObjectURL(url)
        addToast({
          title: 'Documento Exportado',
          description: 'El archivo PDF se generó correctamente.',
          color: 'default',
        })
        setIsLoading(false)
        onOpenChange(false)
      }, 1000)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size='md' // Tamaño contenido y profesional
      backdrop='opaque'
      classNames={{
        base: 'bg-zinc-950 border border-zinc-400 shadow-xl',
        closeButton: 'hover:bg-zinc-800 transition-colors',
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody className='pt-8 pb-4 px-6'>
              <div className='flex flex-col gap-6'>
                {/* Cabecera Discreta */}
                <div className='flex items-center gap-3'>
                  <div className='p-2 bg-zinc-900 border border-zinc-800 rounded-lg'>
                    <HiOutlineDocumentText
                      className='text-zinc-400'
                      size={20}
                    />
                  </div>
                  <div>
                    <h3 className='text-sm font-bold text-zinc-200 uppercase tracking-widest'>
                      Finalizar Presupuesto
                    </h3>
                    <p className='text-[11px] text-zinc-500 font-medium'>
                      Configure el nombre del titular para el documento.
                    </p>
                  </div>
                </div>

                {/* Input Corregido: Sin Uppercase forzado en el estilo para que al escribir sea natural */}
                <Input
                  label='NOMBRE DEL CLIENTE'
                  placeholder='Ingrese nombre del cliente...'
                  labelPlacement='outside'
                  variant='bordered'
                  value={nameCliente}
                  onValueChange={setNameCliente}
                  startContent={
                    <HiOutlineUser className='text-zinc-600' size={18} />
                  }
                  classNames={{
                    label:
                      'text-[10px] font-black tracking-widest text-zinc-500',
                    inputWrapper:
                      'border-zinc-800 group-data-[focus=true]:border-zinc-500 h-12 transition-colors bg-zinc-900/20',
                    input: 'text-zinc-200 text-sm font-medium',
                  }}
                />

                <div className='p-3 bg-zinc-900/40 border border-zinc-800/60 rounded-xl'>
                  <div className='flex justify-between items-center text-[11px] font-bold uppercase tracking-wider text-zinc-500'>
                    <span>Fecha de emisión</span>
                    <span className='text-zinc-400'>{obtenerFechaHoy()}</span>
                  </div>
                </div>
              </div>
            </ModalBody>

            <ModalFooter className='px-6 pb-6 pt-2'>
              <div className='flex gap-2 w-full'>
                <Button
                  variant='light'
                  onPress={onClose}
                  className='flex-1 font-bold text-[11px] uppercase text-zinc-500 tracking-widest'
                >
                  Cancelar
                </Button>
                <Button
                  color='warning'
                  variant='bordered'
                  isLoading={isLoading}
                  onPress={generarPDF}
                  className='flex-[1.5] border-zinc-700 hover:border-warning/50 text-zinc-300 hover:text-warning font-bold uppercase tracking-widest text-[11px] transition-all'
                  startContent={
                    !isLoading && <HiOutlineCloudArrowDown size={18} />
                  }
                >
                  {isLoading ? 'Generando...' : 'Descargar PDF'}
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default GeneratorPdf

//CON BOTON PARA WHATAPP YA TERMINO PROBAR SI IMPLEMENTAR

// import {
//   Modal,
//   ModalContent,
//   ModalBody,
//   ModalFooter,
//   Button,
//   Input,
//   addToast,
// } from '@heroui/react'
// import { useState } from 'react'
// import {
//   HiOutlineDocumentText,
//   HiOutlineUser,
//   HiOutlineCloudArrowDown,
// } from 'react-icons/hi2'
// import { BsWhatsapp } from 'react-icons/bs'
// import PDF from '@/components/PdfLayout'
// import { pdf } from '@react-pdf/renderer'
// import useAberturasStore from '@/stores/useAberturasStore'
// import useAberturasCompuestasStore from '@/stores/useAberturasCompustasStore'

// // Helper para fecha
// function obtenerFechaHoy() {
//   return new Date().toLocaleDateString('es-AR')
// }

// // Helper para formatear moneda sin puntos ni comas si se requiere,
// // o formato estándar para el mensaje de texto.
// const formatCurrency = (val: number) =>
//   new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(
//     val,
//   )

// type GeneratorPdfProps = {
//   isOpen: boolean
//   onOpenChange: (isOpen: boolean) => void
//   compra: {
//     totalCompra: number
//     descuento: number
//     iva: number
//     saldoPendiente: number
//     importeFinal: number
//   }
// }

// function GeneratorPdf({ isOpen, onOpenChange, compra }: GeneratorPdfProps) {
//   const [nameCliente, setNameCliente] = useState('')
//   const [isLoading, setIsLoading] = useState(false)

//   const aberturasStore = useAberturasStore((state) => state.aberturas)
//   const aberturasCompuestasStore = useAberturasCompuestasStore(
//     (state) => state.aberturasComps,
//   )

//   // FUNCIÓN 1: GENERAR Y DESCARGAR PDF
//   const generarPDF = async (): Promise<void> => {
//     setIsLoading(true)
//     try {
//       const blob = await pdf(
//         <PDF
//           aberturas={aberturasStore}
//           aberturasCompuestas={aberturasCompuestasStore}
//           {...compra}
//           descuentoCalculado={compra.descuento}
//           ivaCalculado={compra.iva}
//           nameCliente={nameCliente || 'CLIENTE GENERAL'}
//         />,
//       ).toBlob()

//       const url = URL.createObjectURL(blob)

//       // Descarga automática
//       const enlace = document.createElement('a')
//       enlace.href = url
//       enlace.download = `Presupuesto-${nameCliente || 'General'}.pdf`
//       enlace.click()

//       addToast({
//         title: 'Documento Exportado',
//         description: 'El PDF se descargó correctamente.',
//         color: 'success',
//       })

//       setIsLoading(false)
//     } catch (error) {
//       console.error(error)
//       setIsLoading(false)
//       addToast({
//         title: 'Error',
//         description: 'No se pudo generar el PDF',
//         color: 'danger',
//       })
//     }
//   }

//   // FUNCIÓN 2: ABRIR WHATSAPP
//   const enviarWhatsApp = () => {
//     const mensaje =
//       `*PRESUPUESTO ABERTURAS*%0A` +
//       `--------------------------%0A` +
//       `*Cliente:* ${nameCliente || 'Cliente General'}%0A` +
//       `*Total:* ${formatCurrency(compra.importeFinal)}%0A` +
//       `*Fecha:* ${obtenerFechaHoy()}%0A%0A` +
//       `Hola! Te envío el presupuesto solicitado. El archivo PDF detallado se ha generado correctamente.`

//     // Abrir WhatsApp Web/App para elegir contacto
//     const url = `https://wa.me/?text=${mensaje}`
//     window.open(url, '_blank')
//   }

//   return (
//     <Modal
//       isOpen={isOpen}
//       onOpenChange={onOpenChange}
//       size='md'
//       backdrop='opaque'
//       classNames={{
//         base: 'bg-zinc-950 border border-zinc-800 shadow-xl',
//         closeButton: 'hover:bg-zinc-800 transition-colors',
//       }}
//     >
//       <ModalContent>
//         {(onClose) => (
//           <>
//             <ModalBody className='pt-8 pb-4 px-6'>
//               <div className='flex flex-col gap-6'>
//                 {/* Cabecera */}
//                 <div className='flex items-center gap-3'>
//                   <div className='p-2 bg-zinc-900 border border-zinc-800 rounded-lg'>
//                     <HiOutlineDocumentText
//                       className='text-zinc-400'
//                       size={20}
//                     />
//                   </div>
//                   <div>
//                     <h3 className='text-sm font-bold text-zinc-200 uppercase tracking-widest'>
//                       Finalizar Presupuesto
//                     </h3>
//                     <p className='text-[11px] text-zinc-500 font-medium'>
//                       El PDF se descargará en su equipo.
//                     </p>
//                   </div>
//                 </div>

//                 {/* Input Cliente */}
//                 <Input
//                   label='NOMBRE DEL CLIENTE'
//                   placeholder='Ej: Juan Pérez...'
//                   labelPlacement='outside'
//                   variant='bordered'
//                   value={nameCliente}
//                   onValueChange={setNameCliente}
//                   startContent={
//                     <HiOutlineUser className='text-zinc-600' size={18} />
//                   }
//                   classNames={{
//                     label:
//                       'text-[10px] font-black tracking-widest text-zinc-500',
//                     inputWrapper:
//                       'border-zinc-800 group-data-[focus=true]:border-zinc-500 h-12 bg-zinc-900/20',
//                     input: 'text-zinc-200 text-sm font-medium',
//                   }}
//                 />

//                 {/* Resumen rápido */}
//                 <div className='p-4 bg-zinc-900/40 border border-zinc-800/60 rounded-xl flex justify-between items-center'>
//                   <div>
//                     <p className='text-[9px] font-black text-zinc-500 uppercase tracking-tighter'>
//                       Importe a informar
//                     </p>
//                     <p className='text-lg font-bold text-warning-500'>
//                       {formatCurrency(compra.importeFinal)}
//                     </p>
//                   </div>
//                   <div className='text-right'>
//                     <p className='text-[9px] font-black text-zinc-500 uppercase tracking-tighter'>
//                       Fecha
//                     </p>
//                     <p className='text-xs font-bold text-zinc-400'>
//                       {obtenerFechaHoy()}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </ModalBody>

//             <ModalFooter className='px-6 pb-6 pt-2 flex flex-col gap-3'>
//               <div className='flex gap-2 w-full'>
//                 {/* Botón Descarga */}
//                 <Button
//                   color='warning'
//                   variant='bordered'
//                   isLoading={isLoading}
//                   onPress={generarPDF}
//                   className='flex-1 border-zinc-700 text-zinc-300 font-bold uppercase tracking-widest text-[11px]'
//                   startContent={
//                     !isLoading && <HiOutlineCloudArrowDown size={18} />
//                   }
//                 >
//                   {isLoading ? 'Procesando' : 'PDF'}
//                 </Button>

//                 {/* Botón WhatsApp */}
//                 <Button
//                   color='success'
//                   variant='flat'
//                   onPress={enviarWhatsApp}
//                   className='flex-1 bg-green-500/10 text-green-500 font-bold uppercase tracking-widest text-[11px]'
//                   startContent={<BsWhatsapp size={18} />}
//                 >
//                   WhatsApp
//                 </Button>
//               </div>

//               <Button
//                 variant='light'
//                 onPress={onClose}
//                 className='w-full font-bold text-[10px] uppercase text-zinc-600 tracking-widest'
//               >
//                 Cancelar y Salir
//               </Button>
//             </ModalFooter>
//           </>
//         )}
//       </ModalContent>
//     </Modal>
//   )
// }

// export default GeneratorPdf
