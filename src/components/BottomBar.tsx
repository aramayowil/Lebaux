import { Accordion, AccordionItem, Button } from '@heroui/react'
import { FaRegCheckCircle } from 'react-icons/fa'
import FloatButton from './FloatButton'
import useAberturasStore from '@/stores/useAberturasStore'
import { useState } from 'react'
import GeneratorPdf from './ui/modals/GeneratorPdf'

const formatCurrency = (valor: number, cantDecimals: number) => {
  return valor.toLocaleString('es-ES', {
    minimumFractionDigits: cantDecimals,
    maximumFractionDigits: cantDecimals,
  })
}

export function BottomBar() {
  const aberturasStore = useAberturasStore((state) => state.aberturas)
  const IVA = 0.105 // 10.5%

  const [isOpenModal, setIsOpenModal] = useState(false)
  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal)
  }

  const cantAberturas = aberturasStore.reduce(
    (acc, abertura) => acc + abertura.cantidad,
    0,
  )
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
    return isCheckedDescuento ? totalCompra * inputDescuento : 0
  }
  const calcularIva = () => {
    return isCheckedIva ? (totalCompra - calcularDescuento()) * IVA : 0
  }

  const calcularImporteTotal = () => {
    return isCheckedACuenta
      ? totalCompra - calcularDescuento() + inputACuenta + calcularIva()
      : totalCompra - calcularDescuento() + calcularIva()
  }
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  const [isCheckedDescuento, setIsCheckedDescuento] = useState(false)
  const handleCheckDescuento = () => {
    setIsCheckedDescuento(!isCheckedDescuento)
  }

  const [inputDescuento, setInputDescuento] = useState(0.1)
  const handleInputDescuento = (value: number) => {
    setInputDescuento(Number.isNaN(value) ? 0 : value)
  }

  const [isCheckedACuenta, setIsCheckedACuenta] = useState(false)
  const handleCheckACuenta = () => {
    setIsCheckedACuenta(!isCheckedACuenta)
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
    <>
      <div className='fixed z-30 rounded-t-lg bottom-0 left-auto right-0 w-full shadow-2xl bg-neutral-900'>
        <Accordion onSelectionChange={handleOpen}>
          <AccordionItem
            key='resumen'
            className='flex flex-col-reverse'
            title='ver resumen'
            classNames={{
              trigger:
                'bg-neutral-900 absolute z-1 max-w-fit h-fit cursor-pointer text-base gap-2 py-2 px-3 top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border rounded-3xl shadow-[0px_-4px_16px_-8px_#00000026]',
              indicator:
                'text-default-900 transition-transform rotate-90 data-[open=true]:-rotate-90 rtl:-rotate-180 rtl:data-[open=true]:-rotate-180',
              content: 'border-b',
              title: 'text-sm',
            }}
          >
            <div className='pt-4 px-4 pb-1 gap-4 flex flex-col'>
              <h2 className='font-semibold text-lg'>Resumen del presupuesto</h2>
              <div className='flex items-center justify-between'>
                <span>{cantAberturas} productos</span>
                <span className='text-base font-medium'>
                  $&nbsp;
                  {formatCurrency(totalCompra, 0)}
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span>Descuentos</span>
                <span className='text-danger-500 font-medium'>
                  -$&nbsp;{formatCurrency(calcularDescuento(), 0)}
                </span>
              </div>
              {isCheckedACuenta && (
                <div className='flex items-center justify-between'>
                  <span>Saldo pendiente</span>
                  <span className='text-success font-medium'>
                    +$&nbsp;{formatCurrency(inputACuenta, 0)}
                  </span>
                </div>
              )}
              {isCheckedIva && (
                <div className='flex items-center justify-between'>
                  <span>IVA ({IVA * 100}%)</span>
                  <span className='text-success font-medium'>
                    +$&nbsp;{formatCurrency(calcularIva(), 0)}
                  </span>
                </div>
              )}
            </div>
          </AccordionItem>
        </Accordion>
        <div className='pt-6 pb-8 px-4 flex flex-col gap-4'>
          <div className='flex flex-row justify-between w-full'>
            <span className='text-lg font-semibold'>Total</span>
            <span className='text-lg font-semibold'>
              $&nbsp;{formatCurrency(calcularImporteTotal(), 2)}
            </span>
          </div>
          <Button
            className='max-w-full font-semibold'
            color='warning'
            variant='bordered'
            startContent={<FaRegCheckCircle size={18} />}
            onPress={handleOpenModal}
          >
            Finalizar compra
          </Button>
          {isOpenModal && (
            <GeneratorPdf
              isOpen={isOpenModal}
              onOpenChange={handleOpenModal}
              compra={{
                totalCompra,
                descuento: calcularDescuento(),
                iva: calcularIva(),
                saldoPendiente: isCheckedACuenta ? inputACuenta : 0,
                importeFinal: calcularImporteTotal(),
              }}
            />
          )}
          <div
            className={`fixed right-6 z-50 transition-all duration-300 ${
              isOpen
                ? isCheckedACuenta
                  ? 'bottom-79'
                  : 'bottom-69'
                : 'bottom-32'
            }`}
          >
            <FloatButton
              isCheckedDescuento={isCheckedDescuento}
              handleCheckDescuento={handleCheckDescuento}
              inputDescuento={inputDescuento}
              handleInputDescuento={handleInputDescuento}
              isCheckedACuenta={isCheckedACuenta}
              handleCheckACuenta={handleCheckACuenta}
              inputACuenta={inputACuenta}
              handleInputACuenta={handleInputACuenta}
              isCheckedIva={isCheckedIva}
              handleCheckIva={handleCheckIva}
              IVA={IVA}
            />
          </div>
        </div>
      </div>
    </>
  )
}
