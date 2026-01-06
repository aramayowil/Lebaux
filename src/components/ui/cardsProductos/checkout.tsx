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
