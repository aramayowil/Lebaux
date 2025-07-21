import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Form,
} from '@heroui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@heroui/card'
import {
  RiCheckboxMultipleBlankFill,
  RiStickyNoteAddLine,
} from 'react-icons/ri'
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
import { HiMiniXMark } from 'react-icons/hi2'
import { RiCheckboxMultipleBlankLine } from 'react-icons/ri'
import { lineaModena, lineaHerrero, linea } from '../data.js' // Import the data from the data.js file
import { hooskModal } from '../hooks/HooksModalAgregar.jsx'
import useAberturaStore from '../stores/useAberturaStore.js'
import InputAccesorioRef from './UI/InputAccesorioRef.jsx'

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

export default function ModalAgregar() {
  const {
    imgSrc,
    handleImg,
    touchedLinea,
    setTouchedLinea,
    selectLinea,
    handleValueLinea,
    touchedAbertura,
    selectAbertura,
    handleValueAbertura,
    inputCodigo,
    handleValueCodigo,
    inputDescripcion,
    handleValueDescripcion,
    inputCantidad,
    handleValueCantidad,
    inputPrecio,
    handleValuePrecio,
    selectColor,
    handleValueColor,
    inputAncho,
    handleValueAncho,
    inputAltura,
    handleValueAltura,
    selectVidrio,
    handleValueVidrio,
    checkedMosquitero,
    handleCheckMosquitero,
    checkedPremarco,
    handleCheckPremarco,
    inputMosquitero,
    handleValueMosquitero,
    inputPremarco,
    handleValuePremarco,
    setSelectAbertura,
    setInputCodigo,
    setInputDescripcion,
    setInputCantidad,
    setInputPrecio,
    setInputAncho,
    setInputAltura,
    setInputMosquitero,
    setInputPremarco,
    setTouchedAbertura,
    setCheckedMosquitero,
    setCheckedPremarco,
  } = hooskModal()

  const aberturas = JSON.parse(localStorage.getItem('aberturas')) || []
  const agregar = useAberturaStore((state) => state.agregar)

  const ArraySelectedAbertura = () => {
    return linea[selectLinea].find((item) => item.id === selectAbertura)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const dataAbertura = linea[selectLinea].find(
      (abertura) => abertura.id === selectAbertura
    )
    const id = aberturas.length > 0 ? aberturas[aberturas.length - 1].id + 1 : 0

    const abertura = new Abertura(
      id,
      selectLinea,
      dataAbertura.abertura,
      dataAbertura.prefijo,
      inputDescripcion,
      { base: parseFloat(inputAncho), altura: parseFloat(inputAltura) },
      imgSrc,
      selectColor,
      selectVidrio,
      parseInt(inputCantidad),
      parseFloat(inputPrecio),
      {
        mosquitero: checkedMosquitero ? parseFloat(inputMosquitero) : 0,
        tapajuntas: checkedPremarco ? parseFloat(inputPremarco) : 0,
      }
    )
    aberturas.push(abertura)
    localStorage.setItem('aberturas', JSON.stringify(aberturas))
    // agregar(abertura)

    onOpenChange(false)
    cerrarModalyLimpiar()
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
    setCheckedMosquitero(false)
    setCheckedPremarco(false)
    setInputMosquitero('')
    setInputPremarco('')
  }

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const [isDisabledBody, setIsDisabledBody] = useState(true)

  const handleDisabledBody = () => {
    selectAbertura === '' || selectLinea === ''
      ? setIsDisabledBody(true)
      : setIsDisabledBody(false)
  }

  const errorMessage = (input) => {
    return (
      <ul className="text-red-500">
        {input < 1 && <li key="error1">El valor no puede ser 0.</li>}
        {Number.isNaN(input) && (
          <li key="error2">Este campo es obligatorio.</li>
        )}
      </ul>
    )
  }

  useEffect(() => {
    handleDisabledBody()
  }, [selectAbertura])

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
        backdrop="blur"
        isOpen={isOpen}
        placement="auto"
        scrollBehavior="inside"
        onOpenChange={cerrarModalyLimpiar}
        radius="md"
        classNames={{
          body: 'py-4',
          backdrop: 'bg-[#18181a]/5 backdrop-opacity-100',
          base: 'border-[#d1d1d1] bg-[#0e0e0f] dark:bg-[#18181a] text-[#ecedee]',
          header: 'border-b-[1px] border-[#18181a]',
          footer: 'border-t-[1px] border-[#18181a]',
          closeButton: 'hover:bg-white/5 active:bg-white/10',
        }}
        // animaciones
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: 'easeOut',
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: 'easeIn',
              },
            },
          },
        }}
      >
        <Form onSubmit={onSubmit}>
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
                  <div className="grid grid-cols-6 gap-2 w-full">
                    <Select
                      className="max-w-xs col-span-3"
                      label="Línea"
                      variant="bordered"
                      selectedKeys={[selectLinea]}
                      onChange={handleValueLinea}
                      errorMessage={
                        selectLinea !== '' || !touchedLinea
                          ? ''
                          : 'Debe seleccionar una línea'
                      }
                      isInvalid={
                        selectLinea !== '' || !touchedLinea ? false : true
                      }
                      onClose={() => setTouchedLinea(true)}
                    >
                      <SelectItem key={'modena'}>Modena</SelectItem>
                      <SelectItem key={'herrero'}>Herrero</SelectItem>
                    </Select>

                    <Select
                      className="max-w-xs col-span-3"
                      label="Tipo de abertura"
                      variant="bordered"
                      selectedKeys={[selectAbertura]}
                      onChange={handleValueAbertura}
                      isDisabled={selectLinea === ''}
                      errorMessage={
                        selectAbertura !== '' || !touchedAbertura
                          ? ''
                          : 'Debe seleccionar una abertura'
                      }
                      isInvalid={
                        selectAbertura !== '' || !touchedAbertura ? false : true
                      }
                      onClose={() => setTouchedAbertura(true)}
                    >
                      {linea[selectLinea]?.map((item) => {
                        return (
                          <SelectItem key={item.id}>{item.abertura}</SelectItem>
                        )
                      })}
                    </Select>

                    <div className="col-span-6 grid justify-stretch">
                      {selectAbertura !== '' && (
                        <TabsAbertura
                          selectedAbertura={ArraySelectedAbertura()}
                          getDescripcion={handleValueDescripcion}
                          getCodigo={handleValueCodigo}
                          getImg={handleImg}
                        />
                      )}
                    </div>
                  </div>

                  <Divider className="mb-2 max-w-md" />

                  <div className="dark grid grid-cols-6 gap-4">
                    <Input
                      label="Nombre"
                      type="text"
                      className="col-span-2"
                      placeholder="Ingrese codígo"
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
                      autoFocus
                      minValue={0}
                      isWheelDisabled
                      isRequired
                      className="col-span-3"
                      placeholder="Ingrese cantidad"
                      variant="bordered"
                      startContent={<HiMiniXMark size={20} />}
                      isDisabled={isDisabledBody}
                      value={inputCantidad}
                      onChange={handleValueCantidad}
                      isInvalid={
                        inputCantidad > 0 && inputCantidad ? false : true
                      }
                      errorMessage={errorMessage(inputCantidad)}
                    />
                    <NumberInput
                      label="Precio"
                      isRequired
                      minValue={1}
                      className="col-span-3"
                      placeholder="Ingrese el precio"
                      variant="bordered"
                      startContent={
                        <MdAttachMoney size={20} style={{ margin: '0 auto' }} />
                      }
                      value={inputPrecio}
                      isDisabled={isDisabledBody}
                      onValueChange={handleValuePrecio}
                    />

                    <Divider className=" max-w-md col-span-6" />

                    <NumberInput
                      label="Ancho"
                      isRequired
                      minValue={1}
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
                      isRequired
                      label="Altura"
                      minValue={1}
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
                      isRequired
                      variant="bordered"
                      className="col-span-3"
                      placeholder="Color"
                      defaultSelectedKeys={['blanco']}
                      startContent={
                        <IoColorPalette
                          size={20}
                          style={{ margin: '0 auto' }}
                        />
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
                      isRequired
                      variant="bordered"
                      className="col-span-3"
                      placeholder="Tipo de vidrio"
                      defaultSelectedKeys={['float4mm']}
                      startContent={<RiCheckboxMultipleBlankFill />}
                      value={selectVidrio}
                      isDisabled={isDisabledBody}
                      onChange={handleValueVidrio}
                    >
                      <SelectItem key={'float4mm'}>Float 4MM</SelectItem>
                      <SelectItem key={'3+3lam'}>Laminado 3+3</SelectItem>
                      <SelectItem key={'dvh3+3/9/4'}>DVH 3+3/9/4</SelectItem>
                      <SelectItem key={'dvh4/9/4'}>DVH 4/9/4</SelectItem>
                    </Select>

                    <Divider className="max-w-md col-span-6" />

                    <Checkbox
                      size="md"
                      color="warning"
                      checked={checkedMosquitero}
                      onChange={handleCheckMosquitero}
                      isDisabled={isDisabledBody}
                      className="col-span-4"
                    >
                      Mosquitero
                    </Checkbox>
                    {checkedMosquitero && (
                      <>
                        <NumberInput
                          label="Precio Mosquitero"
                          minValue={1}
                          isRequired
                          value={inputMosquitero}
                          onValueChange={handleValueMosquitero}
                          className="col-span-3"
                          placeholder="Ingrese el precio"
                          variant="bordered"
                          startContent={
                            <MdAttachMoney
                              size={20}
                              style={{ margin: '0 auto' }}
                            />
                          }
                          isDisabled={isDisabledBody}
                        />
                        <InputAccesorioRef
                          name_accesorio={1} // 1 -Mosquitero
                          base={inputAncho}
                          altura={inputAltura}
                        />
                      </>
                    )}
                    <Checkbox
                      size="md"
                      color="warning"
                      checked={checkedPremarco}
                      onChange={handleCheckPremarco}
                      isDisabled={isDisabledBody}
                      className="col-span-4"
                    >
                      Premarco y Tapajuntas
                    </Checkbox>
                    {checkedPremarco && (
                      <>
                        <NumberInput
                          value={inputPremarco}
                          onValueChange={handleValuePremarco}
                          isRequired
                          label="Precio Premarco"
                          minValue={0}
                          className="col-span-3"
                          placeholder="Ingrese el precio"
                          variant="bordered"
                          isDisabled={isDisabledBody}
                          startContent={
                            <MdAttachMoney
                              size={20}
                              style={{ margin: '0 auto' }}
                            />
                          }
                        />
                        <InputAccesorioRef
                          name_accesorio={2} // 2- Premarco
                          base={inputAncho}
                          altura={inputAltura}
                        />
                      </>
                    )}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <div className="flex justify-end gap-2 w-full">
                    <Button color="#fff" variant="bordered" onPress={onClose}>
                      Cerrar
                    </Button>
                    <Button
                      color="warning"
                      variant="solid"
                      type="submit"
                      isDisabled={isDisabledBody}

                      // onPress={agregar}
                    >
                      Cargar Abertura
                    </Button>
                  </div>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Form>
      </Modal>
    </>
  )
}
