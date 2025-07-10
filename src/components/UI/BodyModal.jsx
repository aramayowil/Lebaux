import React, { useState, useEffect } from 'react'
import { Select, SelectSection, SelectItem } from '@heroui/select'
import { Divider } from '@heroui/divider'
import { Input } from '@heroui/react'
import { RxWidth } from 'react-icons/rx'
import { RxHeight } from 'react-icons/rx'
import { IoColorPalette } from 'react-icons/io5'
import { Checkbox } from '@heroui/checkbox'
import { MdAttachMoney } from 'react-icons/md'
import lineaModena from '../../data'
import Abertura from '../../class/Abertura.class'

export const PlusIcon = ({ size = 24, width, height, ...props }) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="M6 12h12" />
        <path d="M12 18V6" />
      </g>
    </svg>
  )
}

function BodyModal({ abertura }) {
  const aberturas = JSON.parse(localStorage.getItem('aberturas')) || []
  abertura('hola')
  const agregar = () => {
    const dataAbertura = lineaModena.find(
      (abertura) => abertura.tipo === selectAbertura
    )
    const id = aberturas.length > 0 ? aberturas[aberturas.length - 1].id + 1 : 0
    const abertura = new Abertura(
      id,
      'modena',
      dataAbertura.tipo,
      dataAbertura.nombre,
      inputDescripcion,
      { base: inputAncho, altura: inputAltura },
      dataAbertura.img,
      selectColor,
      selectVidrio,
      inputCantidad,
      inputPrecio
    )
    aberturas.push(abertura)
    localStorage.setItem('aberturas', JSON.stringify(aberturas))
    console.log('abertura cargada')
    return 'hola'
  }

  const [selectLinea, setSelectLinea] = useState('modena')

  const handleValueLinea = (event) => {
    setSelectLinea(event.target.value)
  }
  const [selectAbertura, setSelectAbertura] = useState('')

  const handleValueAbertura = (event) => {
    setSelectAbertura(event.target.value)
  }
  const [inputCodigo, setInputCodigo] = useState('')

  const handleValueCodigo = (event) => {
    setInputCodigo(event.target.value)
  }

  const [inputDescripcion, setInputDescripcion] = useState('')

  const handleValueDescripcion = (event) => {
    setInputDescripcion(event.target.value)
  }

  const [inputCantidad, setInputCantidad] = useState(1)

  const handleValueCantidad = (event) => {
    setInputCantidad(event.target.value)
  }

  const [inputPrecio, setInputPrecio] = useState('')

  const handleValuePrecio = (event) => {
    setInputPrecio(event.target.value)
  }

  const [selectColor, setSelectColor] = useState('blanco')

  const handleValueColor = (event) => {
    setSelectColor(event.target.value)
  }

  const [inputAncho, setInputAncho] = useState('')

  const handleValueAncho = (event) => {
    setInputAncho(event.target.value)
  }

  const [inputAltura, setInputAltura] = useState('')

  const handleValueAltura = (event) => {
    setInputAltura(event.target.value)
  }

  const [selectVidrio, setSelectVidrio] = useState('float4mm')

  const handleValueVidrio = (event) => {
    setSelectVidrio(event.target.value)
  }

  const [checkedMosquitero, setCheckedMosquitero] = useState(false)

  const handleCheckMosquitero = (event) => {
    setCheckedMosquitero(event.target.checked)
  }

  const [checkedPremarco, setCheckedPremarco] = useState(false)

  const handleCheckPremarco = (event) => {
    setCheckedPremarco(event.target.checked)
  }

  const [inputMosquitero, setInputMosquitero] = useState('')

  const handleValueMosquitero = (event) => {
    setInputMosquitero(event.target.value)
  }

  const [inputPremarco, setInputPremarco] = useState('')

  const handleValuePremarco = (event) => {
    setInputPremarco(event.target.value)
  }

  useEffect(() => {
    const loadingData = lineaModena.find((item) => item.tipo === selectAbertura)
    if (loadingData) {
      setInputDescripcion(loadingData.descripcion)
      setInputCodigo(loadingData.prefijo)
    }

    return () => {
      console.log('desmontado')
    }
  }, [selectAbertura])

  return (
    <>
      <div className="dark flex w-full flex-wrap md:flex-nowrap gap-4">
        <Select
          className="max-w-xs "
          label="Línea"
          variant="bordered"
          defaultSelectedKeys={['modena']}
          isDisabled
        >
          <SelectItem>Herrero</SelectItem>
          <SelectItem key={'modena'}>Modena</SelectItem>
        </Select>
        <Select
          className="max-w-xs "
          label="Tipo de abertura"
          variant="bordered"
          value={selectAbertura}
          onChange={handleValueAbertura}
        >
          <SelectItem key={'pfijo'}>Paño Fijo</SelectItem>
          <SelectItem key={'corrediza'}>Corrediza</SelectItem>
          <SelectItem key={'oscilobatiente'}>Oscilobatiente</SelectItem>
          <SelectItem key={'proyectante'}>Proyectante</SelectItem>
          <SelectItem key={'rebatible'}>Rebatible</SelectItem>
          <SelectItem key={'puerta'}>Puerta</SelectItem>
          <SelectItem key={'aberturaCompuesta'}>Abertura compuesta</SelectItem>
        </Select>
      </div>
      <Divider className="dark my-2 max-w-md" />
      <div className="dark grid grid-cols-6 gap-4">
        <Input
          label="Codígo"
          type="text"
          className="col-span-2"
          placeholder="Codígo de abertura"
          variant="bordered"
          value={inputCodigo}
          onChange={handleValueCodigo}
        />
        <Input
          label="Descripción"
          type="text"
          className="col-span-4"
          placeholder="Añada una descripción"
          variant="bordered"
          value={inputDescripcion}
          onChange={handleValueDescripcion}
        />
        <Input
          label="Cantidad"
          type="number"
          className="col-span-3"
          placeholder="Ingrese cantidad"
          variant="bordered"
          startContent={<div className="mx-auto">x</div>}
          value={inputCantidad}
          onChange={handleValueCantidad}
        />
        <Input
          label="Precio"
          type="number"
          className="col-span-3"
          placeholder="Ingrese el precio"
          variant="bordered"
          startContent={
            <MdAttachMoney size={20} style={{ margin: '0 auto' }} />
          }
          value={inputPrecio}
          onChange={handleValuePrecio}
        />
      </div>
      <Divider className="dark my-2 max-w-md" />
      <div className="dark grid grid-cols-4 gap-4">
        <Input
          label="Ancho"
          type="number"
          className="col-span-2"
          placeholder="Ancho"
          variant="bordered"
          startContent={<RxWidth size={20} style={{ margin: '0 auto' }} />}
          endContent={<span className="text-sm text-default-400">cm</span>}
          value={inputAncho}
          onChange={handleValueAncho}
        />
        <Input
          label="Altura"
          type="number"
          className="col-span-2"
          placeholder="Altura"
          variant="bordered"
          startContent={<RxHeight size={20} style={{ margin: '0 auto' }} />}
          endContent={<span className="text-sm text-default-400">cm</span>}
          value={inputAltura}
          onChange={handleValueAltura}
        />
        <Select
          label="Color"
          variant="bordered"
          className="col-span-2"
          placeholder="Color"
          defaultSelectedKeys={['blanco']}
          startContent={
            <IoColorPalette size={20} style={{ margin: '0 auto' }} />
          }
          value={selectColor}
          onChange={handleValueColor}
        >
          <SelectItem key={'blanco'}>Blanco</SelectItem>
          <SelectItem key={'negro'}>Negro</SelectItem>
        </Select>

        <Select
          label="Vidrio"
          variant="bordered"
          className="col-span-2"
          placeholder="Tipo de vidrio"
          defaultSelectedKeys={['float4mm']}
          value={selectVidrio}
          onChange={handleValueVidrio}
        >
          <SelectItem key={'float4mm'}>Float 4MM</SelectItem>
          <SelectItem key={'3+3lam'}>Laminado 3+3</SelectItem>
          <SelectItem key={'dvh3+3/9/4'}>DVH 3+3/9/4</SelectItem>
          <SelectItem key={'dvh4/9/4'}>DVH 4/9/4</SelectItem>
        </Select>
      </div>
      <Divider className="dark my-2 max-w-md" />

      <div className="grid grid-cols-4 gap-4">
        <div className="dark gap-2 col-span-2">
          <Checkbox
            size="md"
            color="warning"
            checked={checkedMosquitero}
            onChange={handleCheckMosquitero}
          >
            Mosquitero
          </Checkbox>
          {checkedMosquitero && (
            <Input
              label="Precio Mosquitero"
              type="number"
              className="col-span-3"
              placeholder="Ingrese el precio"
              variant="bordered"
              startContent={
                <MdAttachMoney size={20} style={{ margin: '0 auto' }} />
              }
            />
          )}
        </div>
        <div className="dark gap-2 col-span-2">
          <Checkbox
            size="md"
            color="warning"
            checked={checkedPremarco}
            onChange={handleCheckPremarco}
          >
            Premarco y Tapajuntas
          </Checkbox>
          {checkedPremarco && (
            <Input
              label="Precio Premarco"
              type="number"
              className="col-span-3"
              placeholder="Ingrese el precio"
              variant="bordered"
              startContent={
                <MdAttachMoney size={20} style={{ margin: '0 auto' }} />
              }
            />
          )}
        </div>
      </div>
    </>
  )
}

export default BodyModal
