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

function obtenerFechaHoy() {
  return new Date().toLocaleDateString('es-AR')
}

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

  const aberturasStore = useAberturasStore((state) => state.aberturas)
  const aberturasCompuestasStore = useAberturasCompuestasStore(
    (state) => state.aberturasComps,
  )

  const generarPDF = async (): Promise<void> => {
    setIsLoading(true)
    try {
      const blob = await pdf(
        <PDF
          aberturas={aberturasStore}
          aberturasCompuestas={aberturasCompuestasStore}
          {...compra}
          descuentoCalculado={compra.descuento}
          ivaCalculado={compra.iva}
          nameCliente={nameCliente || 'CLIENTE GENERAL'}
        />,
      ).toBlob()

      const url = URL.createObjectURL(blob)
      window.open(url, '_blank')

      const enlace = document.createElement('a')
      enlace.href = url
      enlace.download = `Presupuesto-${nameCliente || 'General'}.pdf`
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
                    input: 'text-zinc-200 text-sm font-medium', // Texto normal al escribir
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
                  variant='bordered' // Variante discreta
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
