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
import { BsCheck2Circle } from 'react-icons/bs'
import { RxDownload } from 'react-icons/rx'
import PDF from '@/components/PdfLayout'
import { pdf } from '@react-pdf/renderer'
import useAberturasStore from '@/stores/useAberturasStore'
import useBreakpoint from '@/config/breakpoints'
import useAberturasCompuestasStore from '@/stores/useAberturasCompustasStore'

function obtenerFechaHoy() {
  const hoy = new Date()
  const dia = String(hoy.getDate()).padStart(2, '0')
  const mes = String(hoy.getMonth() + 1).padStart(2, '0') // ¡Recordá que enero es 0!
  const año = hoy.getFullYear()

  return `${dia}/${mes}/${año}`
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
  const { isSm } = useBreakpoint()
  const [nameCliente, setNameCliente] = useState('')
  const aberturasStore = useAberturasStore((state) => state.aberturas)
  const aberturasCompuestasStore = useAberturasCompuestasStore(
    (state) => state.aberturasComps,
  )
  const [isLoading, setIsLoading] = useState(false)
  const handleLoading = (loading: boolean) => {
    setIsLoading(loading)
  }

  const generarPDF = async (
    totalCompra: number,
    descuentoCalculado: number,
    ivaCalculado: number,
    saldoPendiente: number,
    importeFinal: number,
    nameCliente: string,
  ): Promise<void> => {
    const blob: Blob = await pdf(
      <PDF
        aberturas={aberturasStore}
        aberturasCompuestas={aberturasCompuestasStore}
        totalCompra={totalCompra}
        descuentoCalculado={descuentoCalculado}
        ivaCalculado={ivaCalculado}
        saldoPendiente={saldoPendiente}
        importeFinal={importeFinal}
        nameCliente={nameCliente}
      />,
    ).toBlob()

    const url: string = URL.createObjectURL(blob)

    // 👉 Abrir en nueva pestaña
    window.open(url, '_blank')

    // 👉 Descargar automáticamente
    const enlace: HTMLAnchorElement = document.createElement('a')
    enlace.href = url
    enlace.download =
      nameCliente === ''
        ? `presupuesto-${obtenerFechaHoy()}.pdf`
        : `presupuesto-${nameCliente.toUpperCase()}-${obtenerFechaHoy()}.pdf`

    document.body.appendChild(enlace)
    enlace.click()
    document.body.removeChild(enlace)

    // 🧹 Limpieza de recursos después de unos segundos
    setTimeout(() => {
      URL.revokeObjectURL(url)
    }, 5000)
  }
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className='flex flex-col items-center justify-center gap-2 my-4'>
                  <BsCheck2Circle
                    size={isSm ? 110 : 80}
                    className='text-warning'
                  />
                  <p className='font-sans text-2xl lg:text-3xl font-semibold text-neutral-200'>
                    ¡Casi terminamos!
                  </p>
                </div>
                <Input
                  label='Nombre del cliente'
                  className='max-w-full'
                  value={nameCliente.toLocaleUpperCase()}
                  description='Este nombre se usará en el PDF'
                  onValueChange={setNameCliente}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color='warning'
                  variant={isLoading ? 'light' : 'solid'}
                  fullWidth
                  startContent={<RxDownload size={19} />}
                  isLoading={isLoading}
                  onPress={() => {
                    handleLoading(true)
                    generarPDF(
                      compra.totalCompra,
                      compra.descuento,
                      compra.iva,
                      compra.saldoPendiente,
                      compra.importeFinal,
                      nameCliente,
                    )

                    setTimeout(() => {
                      onClose()
                      addToast({
                        title: 'PDF generado',
                        description: 'El PDF se ha generado correctamente.',
                        color: 'success',
                      })
                    }, 2500)
                  }}
                >
                  {isLoading ? 'Generando PDF...' : 'Descargar PDF'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default GeneratorPdf
