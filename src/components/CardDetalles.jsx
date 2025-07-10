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
import React, { useState } from 'react'
import { Button } from '@heroui/button'
import { FaRegCheckCircle } from 'react-icons/fa'
import usePresupuestoDetails from '../stores/usePresupuestoDetailsStore'

import RadioButtom from './RadioButtom'
import PdfLuncher from './UI/PdfLuncher'
import CheckSaldoACuenta from './CheckSaldoACuenta'

import { IoMdInformationCircleOutline } from 'react-icons/io'

export default function CardResum() {
  const aberturas = JSON.parse(localStorage.getItem('aberturas')) || []
  const importeAberturas = aberturas
    .map((item) => item.precio)
    .reduce((acc, curr) => acc + curr, 0)

  const formatoDecimal = (valor) => {
    return valor.toLocaleString('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  const [inputSaldo, setInputSaldo] = useState(0)
  const [isCheckSaldo, setIsCheckSaldo] = useState(false)

  const handleSaldo = (event) => {
    Number.isNaN(event) ? setInputSaldo(0) : setInputSaldo(event)
  }

  const handleCheck = (event) => {
    setIsCheckSaldo(event)
    console.log('check desde card', event)
  }

  const [formadePago, setFormadePago] = useState('efectivo')

  const handleFormadePago = (event) => {
    setFormadePago(event)
  }

  const calcularImporteFinal = () => {
    let importeFinal = importeAberturas
    const nroCouta = 6

    if (formadePago === 'efectivo') {
      importeFinal -= importeAberturas * 0.1 // Descuento del 10%
    } else if (formadePago === 'transferencia') {
      importeFinal += importeAberturas * 0.05 // Recargo del 5%
    } else {
      importeFinal = importeAberturas / nroCouta // Precio en coutas
    }

    if (isCheckSaldo) {
      return formatoDecimal(importeFinal + inputSaldo)
    } else {
      return formatoDecimal(importeFinal)
    }
  }

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
          <RadioButtom formadePago={handleFormadePago} />
          <Divider className="mt-4" />
          <CheckSaldoACuenta saldo={handleSaldo} check={handleCheck} />
        </CardBody>
        <Divider />
        <CardFooter>
          <div className="flex flex-col w-full items-star justify-center">
            <p className="text-default-500 text-sm">Importe total</p>
            <p className="text-2xl font-bold">
              ARS$ {formatoDecimal(calcularImporteFinal())}
            </p>
            {formadePago === 'cuotas' && (
              <p className="text-default-500 text-sm">Cuota 1 de 6</p>
            )}
            <p className="text-default-500 text-sm mt-4">
              Compra: $ {formatoDecimal(importeAberturas)}
            </p>
            {formadePago === 'efectivo' ? (
              <p className="text-default-500 text-sm">
                Descuento: $ {formatoDecimal(importeAberturas * 0.1)}
              </p>
            ) : formadePago === 'transferencia' ? (
              <p className="text-default-500 text-sm">
                Recargo: $ {formatoDecimal(importeAberturas * 0.05)}
              </p>
            ) : (
              <p className="text-default-500 text-sm">
                Descuento: $ {formatoDecimal(0)}
              </p>
            )}
            {isCheckSaldo ? (
              <p className="text-default-500 text-sm mb-4">
                A cuenta: $ {formatoDecimal(inputSaldo)}
              </p>
            ) : (
              <p className="text-default-500 text-sm mb-4">A cuenta: $ -</p>
            )}

            <Button
              variant="bordered"
              color="warning"
              startContent={<FaRegCheckCircle size={18} />}
              className="mt-1 mx-auto w-full"
            >
              Finalizar presupuesto
            </Button>
            {/* <PdfLuncher /> */}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
