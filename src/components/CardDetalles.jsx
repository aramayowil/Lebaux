import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  NumberInput,
} from '@heroui/react'
import React, { useEffect, useState } from 'react'
import { pdf } from '@react-pdf/renderer'
import { Button } from '@heroui/button'
import { FaRegCheckCircle } from 'react-icons/fa'
import usePresupuestoDetails from '../stores/usePresupuestoDetailsStore'
import RadioButtom from './RadioButtom'
import PdfLuncher from './UI/PdfLuncher'
import CheckSaldoACuenta from './CheckSaldoACuenta'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import PDF from './PdfConstructor'

const formatoDecimal = (valor) => {
  return valor.toLocaleString('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

const generarPDF = async () => {
  const blob = await pdf(<PDF />).toBlob()
  const url = URL.createObjectURL(blob)

  const enlace = document.createElement('a')
  enlace.href = url
  enlace.download = `presupuesto.pdf`
  document.body.appendChild(enlace)
  enlace.click()
  document.body.removeChild(enlace)
}

export default function CardResum() {
  const details = usePresupuestoDetails((state) => state.Details)
  const updateDetails = usePresupuestoDetails((state) => state.updateDetails)

  const [isCheckSaldo, setIsCheckSaldo] = useState(false)

  const handleCheck = (event) => {
    setIsCheckSaldo(event)
  }

  const calcularImporteFinal = () => {
    let importeTotal = details.importe
    const nroCouta = 6

    if (details.formaPago === 'efectivo') {
      importeTotal -= details.importe * 0.1 // Descuento del 10%
      updateDetails({ recargo: 0, descuento: details.importe * 0.1 })
    } else if (details.formaPago === 'transferencia') {
      importeTotal += details.importe * 0.05 // Recargo del 5%
      updateDetails({ recargo: details.importe * 0.05, descuento: 0 })
    } else {
      importeTotal = details.importe / nroCouta // Precio en coutas
      updateDetails({ recargo: 0, descuento: 0 })
    }

    if (isCheckSaldo) {
      updateDetails({ importeFinal: importeTotal + details.saldoPendiente })
    } else {
      updateDetails({ importeFinal: importeTotal })
    }
  }

  useEffect(() => {
    calcularImporteFinal()

    const aberturas = JSON.parse(localStorage.getItem('aberturas')) || []
    const importeAberturas = aberturas
      .map((item) => item.precio)
      .reduce((acc, curr) => acc + curr, 0)
    updateDetails({ importe: importeAberturas })
  }, [details.formaPago, details.importe, details.saldoPendiente, isCheckSaldo])

  return (
    <div>
      <Card className="max-w-[350px] mx-auto">
        <CardHeader className="flex gap-2">
          <Image
            alt="heroui logo"
            height={25}
            radius="sm"
            src="./img/Lebaux-url.png"
            width={25}
          />
          <div className="flex justify-center items-center gap-1">
            <IoMdInformationCircleOutline size={20} />
            <p className="text-lg font-bold">Información</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col justify-center p-4">
          <RadioButtom />
          <Divider className="mt-4" />
          <CheckSaldoACuenta check={handleCheck} />
        </CardBody>
        <Divider />
        <CardFooter>
          <div className="flex flex-col w-full items-star justify-center">
            <p className="text-default-500 text-sm">Importe total</p>
            <p className="text-2xl font-bold">
              ARS$ {formatoDecimal(details.importeFinal)}
            </p>
            {details.formaPago === 'cuotas' && (
              <p className="text-default-500 text-sm">Cuota 1 de 6</p>
            )}
            <p className="text-default-500 text-sm mt-4">
              Compra: $ {formatoDecimal(details.importe)}
            </p>
            {details.formaPago === 'efectivo' ? (
              <p className="text-default-500 text-sm">
                Descuento: $ {formatoDecimal(details.descuento)}
              </p>
            ) : details.formaPago === 'transferencia' ? (
              <p className="text-default-500 text-sm">
                Recargo: $ {formatoDecimal(details.recargo)}
              </p>
            ) : (
              <p className="text-default-500 text-sm">
                Descuento: $ {formatoDecimal(details.descuento)}
              </p>
            )}
            {isCheckSaldo ? (
              <p className="text-default-500 text-sm mb-4">
                A cuenta: $ {formatoDecimal(details.saldoPendiente)}
              </p>
            ) : (
              <p className="text-default-500 text-sm mb-4">A cuenta: $ -</p>
            )}

            <Button
              variant="bordered"
              color="warning"
              startContent={<FaRegCheckCircle size={18} />}
              className="mt-1 mx-auto w-full"
              onPress={generarPDF}
            >
              Finalizar presupuesto
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
