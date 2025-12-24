import { catalogo } from '@/data'
import { colors } from '@/models/IColors'
import { lineas } from '@/models/ILineas'
import { vidrios } from '@/models/IVidrios'
import {
  Modal as ModalHeroUI,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
  AccordionItem,
  Checkbox,
  Input,
  Accordion,
  NumberInput,
  Autocomplete,
  AutocompleteItem,
  Card,
  CardBody,
  addToast,
} from '@heroui/react'
import { useEffect, useState } from 'react'
import { HiMiniXMark } from 'react-icons/hi2'
import { IoColorPalette } from 'react-icons/io5'
import { MdAttachMoney } from 'react-icons/md'
import { RiCheckboxMultipleBlankFill } from 'react-icons/ri'
import { RxHeight, RxWidth } from 'react-icons/rx'
import InputAccesorioRef from '../../inputs/InputAccesorioRef'
import TabsAbertura from '../../../ui/TabsAbertura'
import Abertura from '@/class/Abertura.class'
import useAberturasStore from '@/stores/useAberturasStore'

//TYPES & INTERFACES
type ModalConfiguracionProps = {
  isOpen: boolean
  onOpenChange: () => void
  ancho: number
  alto: number
  tipo: string
  setAncho: React.Dispatch<React.SetStateAction<number>>
  setAlto: React.Dispatch<React.SetStateAction<number>>
  setTipo: React.Dispatch<React.SetStateAction<string>>
  setImgSrc: React.Dispatch<React.SetStateAction<string>>

  handleConfirmarModulo: () => void
}

interface Variante {
  variantKey: number
  tab: string
  descripcion: string
  img: string
}
interface Linea {
  id: string
  abertura: string
  prefijo: string
  variantes: Variante[]
}

type Key = string | number

//HOOKS

function ModalConfiguracion({
  isOpen,
  onOpenChange,
  ancho,
  alto,
  tipo,
  setAncho,
  setAlto,
  setTipo,
  setImgSrc,
  handleConfirmarModulo,
}: ModalConfiguracionProps) {
  const isSelectedAbertura = (): Linea | undefined => {
    if (selectLinea !== '' && selectAbertura !== '') {
      return catalogo[selectLinea]?.find((item) => item.id === selectAbertura)
    }
    return undefined
  }

  const [isDisabledBody, setIsDisabledBody] = useState(true)

  const handleDisabledBody = () => {
    selectAbertura === '' || selectLinea === ''
      ? setIsDisabledBody(true)
      : setIsDisabledBody(false)
  }

  const [selectLinea, setSelectLinea] = useState<string>('modena')

  const handleSelectLinea = (key: Key | null) => {
    setSelectLinea(key?.toString() || '')
    setSelectAbertura('')
    setTouchedAbertura(false)
  }

  const [selectAbertura, setSelectAbertura] = useState<string>('')

  const handleValueAbertura = (event: Key | null) => {
    setSelectAbertura(event?.toString() || '')
    setTipo(isSelectedAbertura()?.abertura || '')
    setTouchedAbertura(false)
  }

  const [touchedAbertura, setTouchedAbertura] = useState(false)

  const [touchedLinea, setTouchedLinea] = useState(false)

  const [selectColor, setSelectColor] = useState<string>('blanco')
  const handleValueColor = (event: Key | null) => {
    setSelectColor(event?.toString() || '')
  }

  const [selectVidrio, setSelectVidrio] = useState<string>('float4mm')
  const handleValueVidrio = (event: Key | null) => {
    setSelectVidrio(event?.toString() || '')
  }

  const [inputCodigo, setInputCodigo] = useState('')
  const handleValueCodigo = (event: string) => {
    setInputCodigo(event)
  }

  const [inputDescripcion, setInputDescripcion] = useState('')
  const handleValueDescripcion = (event: string) => {
    setInputDescripcion(event)
  }

  const [checkedMosquitero, setCheckedMosquitero] = useState(false)
  const handleCheckMosquitero = () => {
    setCheckedMosquitero(!checkedMosquitero)
  }

  const [inputMosquitero, setInputMosquitero] = useState(NaN)
  const handleValueMosquitero = (value: number) => {
    setInputMosquitero(value)
  }
  const [checkedPremarco, setCheckedPremarco] = useState(false)
  const handleCheckPremarco = () => {
    setCheckedPremarco(!checkedPremarco)
  }
  const [inputPremarco, setInputPremarco] = useState(NaN)
  const handleValuePremarco = (value: number) => {
    setInputPremarco(value)
  }

  const handleImg = (img: string) => {
    setImgSrc(img)
  }

  const [variantKey, setVariantKey] = useState<number>(0)
  const handleValueVariantKey = (variantKey: number) => {
    setVariantKey(variantKey)
  }

  useEffect(() => {
    handleDisabledBody()
  }, [selectAbertura])
  return (
    <>
      <ModalHeroUI
        backdrop='opaque'
        scrollBehavior='inside'
        isOpen={isOpen}
        isDismissable={false}
        placement='auto'
        onOpenChange={onOpenChange}
        radius='md'
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
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex align-center justify-center'>
                <p className='text-tiny uppercase font-bold text-default-600'>
                  Agregar abertura
                </p>
              </ModalHeader>
              <ModalBody>
                {/* CONTENEDOR PRINCIPAL DIVIDIDO EN 2 */}
                <div className='flex flex-col md:flex-row gap-2 w-full'>
                  {/* CARD 1: FORMULARIO (Lado Izquierdo) */}
                  <Card className='flex-1 shadow-sm border-none bg-default-50/50'>
                    <CardBody>
                      <div className='grid grid-cols-6 gap-2 w-full'>
                        <Autocomplete
                          className='max-w-xs col-span-3'
                          label='Línea'
                          defaultItems={lineas}
                          isClearable={false}
                          selectedKey={selectLinea}
                          onSelectionChange={handleSelectLinea}
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
                          {(item) => (
                            <AutocompleteItem key={item.key}>
                              {item.label}
                            </AutocompleteItem>
                          )}
                        </Autocomplete>

                        <Autocomplete
                          className='max-w-xs col-span-3'
                          label='Tipo de abertura'
                          isClearable={false}
                          selectedKey={selectAbertura}
                          onSelectionChange={handleValueAbertura}
                          isDisabled={selectLinea === ''}
                          errorMessage={
                            selectAbertura !== '' || !touchedAbertura
                              ? ''
                              : 'Debe seleccionar una abertura'
                          }
                          isInvalid={
                            selectAbertura !== '' || !touchedAbertura
                              ? false
                              : true
                          }
                        >
                          {catalogo[selectLinea]?.map((item) => {
                            return (
                              <AutocompleteItem key={item.id}>
                                {item.abertura}
                              </AutocompleteItem>
                            )
                          })}
                        </Autocomplete>
                        <div className='col-span-6 grid justify-stretch'>
                          {selectAbertura !== '' && (
                            <TabsAbertura
                              selectedAbertura={isSelectedAbertura()}
                              getDescripcion={handleValueDescripcion}
                              getCodigo={handleValueCodigo}
                              getImg={handleImg}
                              getVariantKey={handleValueVariantKey}
                              setTabSelected={variantKey}
                            />
                          )}
                        </div>
                        <Divider className='col-span-6 mb-3' />
                      </div>
                      <div className='grid grid-cols-6 gap-2'>
                        <NumberInput
                          isWheelDisabled
                          label='Ancho'
                          isRequired
                          minValue={1}
                          className='col-span-3'
                          placeholder='Ancho'
                          variant='bordered'
                          isDisabled={isDisabledBody}
                          startContent={
                            <RxWidth size={21} style={{ margin: '0 auto' }} />
                          }
                          endContent={
                            <span className='text-sm text-default-400'>cm</span>
                          }
                          value={ancho}
                          onValueChange={setAncho}
                        />
                        <NumberInput
                          isWheelDisabled
                          isRequired
                          label='Altura'
                          minValue={1}
                          className='col-span-3'
                          placeholder='Altura'
                          variant='bordered'
                          isDisabled={isDisabledBody}
                          startContent={
                            <RxHeight size={20} style={{ margin: '0 auto' }} />
                          }
                          endContent={
                            <span className='text-sm text-default-400'>cm</span>
                          }
                          value={alto}
                          onValueChange={setAlto}
                        />
                        <Autocomplete
                          label='Color'
                          isRequired
                          variant='bordered'
                          className='col-span-3'
                          placeholder='Color'
                          defaultItems={colors}
                          selectedKey={selectColor}
                          isClearable={false}
                          startContent={
                            <IoColorPalette
                              size={20}
                              style={{ margin: '0 auto' }}
                            />
                          }
                          value={selectColor}
                          isDisabled={isDisabledBody}
                          onSelectionChange={handleValueColor}
                        >
                          {(color) => (
                            <AutocompleteItem key={color.key}>
                              {color.label}
                            </AutocompleteItem>
                          )}
                        </Autocomplete>
                        {/* <Select
                      label='Vidrio'
                      isRequired
                      variant='bordered'
                      className='col-span-3'
                      placeholder='Tipo de vidrio'
                      isClearable={false}
                      items={vidrios}
                      startContent={<RiCheckboxMultipleBlankFill />}
                      value={selectVidrio}
                      isDisabled={isDisabledBody}
                      onChange={handleValueVidrio}
                    >
                      {vidrios.map((vidrio) => (
                        <SelectItem key={vidrio.key}>{vidrio.label}</SelectItem>
                      ))}
                    </Select> */}
                        <Autocomplete
                          label='Vidrio'
                          isRequired
                          variant='bordered'
                          className='col-span-3'
                          placeholder='Tipo de vidrio'
                          isClearable={false}
                          defaultItems={vidrios}
                          selectedKey={selectVidrio}
                          startContent={<RiCheckboxMultipleBlankFill />}
                          value={selectVidrio}
                          isDisabled={isDisabledBody}
                          onSelectionChange={handleValueVidrio}
                        >
                          {(vidrio) => (
                            <AutocompleteItem key={vidrio.key}>
                              {vidrio.label}
                            </AutocompleteItem>
                          )}
                        </Autocomplete>

                        {/* <Divider className='col-span-6 my-1' />
                        <Accordion
                          keepContentMounted={true}
                          className='col-span-6 p-2'
                          variant='bordered'
                          itemClasses={{
                            base: 'py-0 w-full',
                            title: 'font-normal text-base',
                            trigger: 'px-0 py-4  h-14 flex items-center',
                            indicator: 'text-medium',
                            content: 'text-small px-2 mb-2',
                          }}
                        >
                          <AccordionItem
                            key='1'
                            aria-label='Accesorios'
                            title='Accesorios'
                          >
                            <div className='grid grid-cols-6 gap-2'>
                              <Checkbox
                                size='md'
                                color='warning'
                                checked={checkedMosquitero}
                                onChange={handleCheckMosquitero}
                                isDisabled={isDisabledBody}
                                className='col-span-6'
                              >
                                Mosquitero
                              </Checkbox>
                              {checkedMosquitero && (
                                <>
                                  <NumberInput
                                    isWheelDisabled
                                    label='Precio Mosquitero'
                                    minValue={1}
                                    isRequired
                                    value={inputMosquitero}
                                    onValueChange={handleValueMosquitero}
                                    className='col-span-3'
                                    placeholder='Ingrese el precio'
                                    variant='bordered'
                                    startContent={
                                      <MdAttachMoney
                                        size={20}
                                        style={{ margin: '0 auto' }}
                                      />
                                    }
                                    isDisabled={isDisabledBody}
                                  />
                                  <div className='col-span-3'>
                                    <InputAccesorioRef
                                      accesorio={'MOSQUITERO'}
                                      base={ancho}
                                      altura={alto}
                                    />
                                  </div>
                                </>
                              )}
                              <Checkbox
                                size='md'
                                color='warning'
                                checked={checkedPremarco}
                                onChange={handleCheckPremarco}
                                isDisabled={isDisabledBody}
                                className='col-span-6'
                              >
                                Premarco y Tapajunta
                              </Checkbox>
                              {checkedPremarco && (
                                <>
                                  <NumberInput
                                    isWheelDisabled
                                    value={inputPremarco}
                                    onValueChange={handleValuePremarco}
                                    isRequired
                                    label='Precio Premarco'
                                    minValue={0}
                                    className='col-span-3'
                                    placeholder='Ingrese el precio'
                                    variant='bordered'
                                    isDisabled={isDisabledBody}
                                    startContent={
                                      <MdAttachMoney
                                        size={20}
                                        style={{ margin: '0 auto' }}
                                      />
                                    }
                                  />
                                  <div className='col-span-3'>
                                    <InputAccesorioRef
                                      accesorio={'PREMARCO'}
                                      base={ancho}
                                      altura={alto}
                                    />
                                  </div>
                                </>
                              )}
                            </div>
                          </AccordionItem>
                          <AccordionItem
                            key='2'
                            aria-label='detalles de la abertura'
                            title='Detalles de la abertura'
                          >
                            <div className='grid grid-cols-6 gap-2'>
                              <Input
                                label='Nombre'
                                type='text'
                                className='col-span-2'
                                placeholder='Ingrese codígo'
                                variant='bordered'
                                isDisabled={isDisabledBody}
                                value={inputCodigo}
                                onValueChange={handleValueCodigo}
                              />
                              <Input
                                label='Descripción'
                                type='text'
                                className='col-span-4'
                                placeholder='Añada una descripción'
                                variant='bordered'
                                isDisabled={isDisabledBody}
                                value={inputDescripcion}
                                onValueChange={handleValueDescripcion}
                              />
                            </div>
                          </AccordionItem>
                        </Accordion> */}
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color='default' variant='bordered' onPress={onClose}>
                  Cancelar
                </Button>
                <Button
                  color='warning'
                  onPress={() => {
                    handleConfirmarModulo()
                    onClose()
                  }}
                >
                  Añadir al diseño
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </ModalHeroUI>
    </>
  )
}

export default ModalConfiguracion
