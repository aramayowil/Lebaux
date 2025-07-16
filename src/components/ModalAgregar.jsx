import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  input,
} from '@heroui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@heroui/card'
import { RiStickyNoteAddLine } from 'react-icons/ri'
import BodyModal from './UI/BodyModal'
import React, { useState, useEffect, useRef, use } from 'react'
import { Select, SelectSection, SelectItem } from '@heroui/select'
import { Divider } from '@heroui/divider'
import { Input } from '@heroui/react'
import { RxWidth } from 'react-icons/rx'
import { RxHeight } from 'react-icons/rx'
import { IoColorPalette } from 'react-icons/io5'
import { Checkbox } from '@heroui/checkbox'
import { NumberInput } from '@heroui/react'
import { MdAttachMoney } from 'react-icons/md'
import Abertura from '../class/Abertura.class'
import { Tabs, Tab } from '@heroui/tabs'
import TabsAbertura from './UI/TabsAbertura.jsx'
import { lineaModena, lineaHerrero } from '../data.js' // Import the data from the data.js file

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

export default function ModalAgregar({ recargar }) {
  const dataModena = lineaModena
  const aberturas = JSON.parse(localStorage.getItem('aberturas')) || []

  const onlySelectedAbertura = () => {
    return dataModena.find((item) => item.id === selectAbertura)
  }

  const agregar = () => {
    const dataAbertura = lineaModena.find(
      (abertura) => abertura.id === selectAbertura
    )
    const id = aberturas.length > 0 ? aberturas[aberturas.length - 1].id + 1 : 0
    const abertura = new Abertura(
      id,
      'modena',
      dataAbertura.abertura,
      dataAbertura.prefijo,
      inputDescripcion,
      { base: parseFloat(inputAncho), altura: parseFloat(inputAltura) },
      imgSrc,
      selectColor,
      selectVidrio,
      parseInt(inputCantidad),
      parseFloat(inputPrecio)
    )
    aberturas.push(abertura)
    localStorage.setItem('aberturas', JSON.stringify(aberturas))

    onOpenChange(false)
    cerrarModalyLimpiar()
    recargar()
  }

  const cerrarModalyLimpiar = () => {
    onOpenChange(false)

    setSelectAbertura('')
    setInputCodigo('')
    setInputDescripcion('')
    setInputCantidad(1)
    setInputPrecio(NaN)
    setInputAncho(NaN)
    setInputAltura(NaN)
    setInputMosquitero(NaN)
    setInputPremarco(NaN)
  }

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const [imgSrc, setImgSrc] = useState('')
  const handleImg = (src) => {
    setImgSrc(src)
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
    setInputCodigo(event)
  }

  const [inputDescripcion, setInputDescripcion] = useState('')

  const handleValueDescripcion = (event) => {
    setInputDescripcion(event)
  }

  const [inputCantidad, setInputCantidad] = useState(1)

  const handleValueCantidad = (event) => {
    setInputCantidad(event)
  }

  const [inputPrecio, setInputPrecio] = useState(NaN)

  const handleValuePrecio = (event) => {
    setInputPrecio(event)
  }

  const [selectColor, setSelectColor] = useState('blanco')

  const handleValueColor = (event) => {
    setSelectColor(event.target.value)
  }

  const [inputAncho, setInputAncho] = useState(NaN)

  const handleValueAncho = (event) => {
    setInputAncho(event)
  }

  const [inputAltura, setInputAltura] = useState(NaN)

  const handleValueAltura = (event) => {
    setInputAltura(event)
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

  const [inputMosquitero, setInputMosquitero] = useState(NaN)

  const handleValueMosquitero = (event) => {
    setInputMosquitero(event)
  }

  const [inputPremarco, setInputPremarco] = useState(NaN)

  const handleValuePremarco = (event) => {
    setInputPremarco(event)
  }

  const [isDisabledBody, setIsDisabledBody] = useState(true)

  const handleDisabledBody = () => {
    selectAbertura === '' || selectLinea === ''
      ? setIsDisabledBody(true)
      : setIsDisabledBody(false)
  }

  useEffect(() => {
    handleDisabledBody()
    setInputCodigo(
      dataModena.find((item) => item.id === selectAbertura)?.prefijo
    )
  }, [selectAbertura, selectLinea])

  return (
    <>
      <Button
        className="max-w-fit"
        color="warning"
        variant="bordered"
        startContent={<PlusIcon />}
        onPress={onOpen}
      >
        Agregar
      </Button>

      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        placement="auto"
        onOpenChange={cerrarModalyLimpiar}
        radius="lg"
        classNames={{
          body: 'py-4',
          backdrop: 'bg-[#18181a]/50 backdrop-opacity-40',
          base: 'border-[#18181a] bg-[#18181a] dark:bg-[#18181a] text-[#ecedee]',
          header: 'border-b-[1px] border-[#18181a]',
          footer: 'border-t-[1px] border-[#18181a]',
          closeButton: 'hover:bg-white/5 active:bg-white/10',
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-start items-center gap-2 text-[#c98922]">
                <div>
                  <RiStickyNoteAddLine size={22} />
                </div>
                <div>Agregar abertura</div>
              </ModalHeader>
              <ModalBody className="dark">
                <div className="grid grid-cols-6 gap-4">
                  <Select
                    className="max-w-xs col-span-3"
                    label="Línea"
                    variant="bordered"
                    defaultSelectedKeys={['modena']}
                    value={selectLinea}
                    onChange={handleValueLinea}
                  >
                    <SelectItem key={'herrero'}>Herrero</SelectItem>
                    <SelectItem key={'modena'}>Modena</SelectItem>
                  </Select>
                  <Select
                    className="max-w-xs col-span-3"
                    label="Tipo de abertura"
                    variant="bordered"
                    value={selectAbertura}
                    onChange={handleValueAbertura}
                  >
                    {lineaModena.map((item) => {
                      return (
                        <SelectItem key={item.id} name="hola">
                          {item.abertura}
                        </SelectItem>
                      )
                    })}
                  </Select>
                  <div className="col-span-6 grid justify-stretch">
                    {selectAbertura !== '' && (
                      <TabsAbertura
                        selectedAbertura={onlySelectedAbertura()}
                        getDescripcion={handleValueDescripcion}
                        getImg={handleImg}
                      />
                    )}
                  </div>
                </div>
                <Divider className="dark my-2 max-w-md" />

                <div className="dark grid grid-cols-6 gap-4">
                  <Input
                    label="Nombre"
                    type="text"
                    className="col-span-2"
                    placeholder="Codígo de abertura"
                    variant="bordered"
                    isDisabled={isDisabledBody}
                    value={inputCodigo}
                    onValueChange={handleValueCodigo}
                  />
                  <Input
                    label="Descripción"
                    type="text"
                    className="col-span-4"
                    placeholder="Añada una descripción"
                    variant="bordered"
                    isDisabled={isDisabledBody}
                    value={inputDescripcion}
                    onValueChange={handleValueDescripcion}
                  />
                  <NumberInput
                    label="Cantidad"
                    minValue={0}
                    className="col-span-2"
                    placeholder="Ingrese cantidad"
                    variant="bordered"
                    startContent={<div className="mx-auto">x</div>}
                    isDisabled={isDisabledBody}
                    value={inputCantidad}
                    onValueChange={handleValueCantidad}
                  />
                  <NumberInput
                    label="Precio"
                    minValue={0}
                    className="col-span-4"
                    placeholder="Ingrese el precio"
                    variant="bordered"
                    startContent={
                      <MdAttachMoney size={20} style={{ margin: '0 auto' }} />
                    }
                    value={inputPrecio}
                    isDisabled={isDisabledBody}
                    onValueChange={handleValuePrecio}
                  />
                  <Divider className="my-2 max-w-md col-span-6" />
                  <NumberInput
                    label="Ancho"
                    minValue={0}
                    className="col-span-3"
                    placeholder="Ancho"
                    variant="bordered"
                    isDisabled={isDisabledBody}
                    startContent={
                      <RxWidth size={20} style={{ margin: '0 auto' }} />
                    }
                    endContent={
                      <span className="text-sm text-default-400">cm</span>
                    }
                    value={inputAncho}
                    onValueChange={handleValueAncho}
                  />
                  <NumberInput
                    label="Altura"
                    minValue={0}
                    className="col-span-3"
                    placeholder="Altura"
                    variant="bordered"
                    isDisabled={isDisabledBody}
                    startContent={
                      <RxHeight size={20} style={{ margin: '0 auto' }} />
                    }
                    endContent={
                      <span className="text-sm text-default-400">cm</span>
                    }
                    value={inputAltura}
                    onValueChange={handleValueAltura}
                  />
                  <Select
                    label="Color"
                    variant="bordered"
                    className="col-span-3"
                    placeholder="Color"
                    defaultSelectedKeys={['blanco']}
                    startContent={
                      <IoColorPalette size={20} style={{ margin: '0 auto' }} />
                    }
                    value={selectColor}
                    isDisabled={isDisabledBody}
                    onChange={handleValueColor}
                  >
                    <SelectItem key={'blanco'}>Blanco</SelectItem>
                    <SelectItem key={'negro'}>Negro</SelectItem>
                  </Select>

                  <Select
                    label="Vidrio"
                    variant="bordered"
                    className="col-span-3"
                    placeholder="Tipo de vidrio"
                    defaultSelectedKeys={['float4mm']}
                    value={selectVidrio}
                    isDisabled={isDisabledBody}
                    onChange={handleValueVidrio}
                  >
                    <SelectItem key={'float4mm'}>Float 4MM</SelectItem>
                    <SelectItem key={'3+3lam'}>Laminado 3+3</SelectItem>
                    <SelectItem key={'dvh3+3/9/4'}>DVH 3+3/9/4</SelectItem>
                    <SelectItem key={'dvh4/9/4'}>DVH 4/9/4</SelectItem>
                  </Select>

                  <Divider className="my-2 max-w-md col-span-6" />

                  <Checkbox
                    size="md"
                    color="warning"
                    checked={checkedMosquitero}
                    onChange={handleCheckMosquitero}
                    isDisabled={isDisabledBody}
                    className="col-span-3"
                  >
                    Mosquitero
                  </Checkbox>
                  {checkedMosquitero && (
                    <NumberInput
                      label="Precio Mosquitero"
                      minValue={0}
                      className="col-span-3"
                      placeholder="Ingrese el precio"
                      variant="bordered"
                      startContent={
                        <MdAttachMoney size={20} style={{ margin: '0 auto' }} />
                      }
                      isDisabled={isDisabledBody}
                    />
                  )}
                  <Checkbox
                    size="md"
                    color="warning"
                    checked={checkedPremarco}
                    onChange={handleCheckPremarco}
                    isDisabled={isDisabledBody}
                    className="col-span-3"
                  >
                    Premarco y Tapajuntas
                  </Checkbox>
                  {checkedPremarco && (
                    <NumberInput
                      label="Precio Premarco"
                      minValue={0}
                      className="col-span-3"
                      placeholder="Ingrese el precio"
                      variant="bordered"
                      isDisabled={isDisabledBody}
                      startContent={
                        <MdAttachMoney size={20} style={{ margin: '0 auto' }} />
                      }
                    />
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="warning" variant="bordered" onPress={agregar}>
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
