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
  NumberInput,
  Autocomplete,
  AutocompleteItem,
  Card,
  CardBody,
} from '@heroui/react'
import { useEffect, useState } from 'react'
import { IoColorPalette } from 'react-icons/io5'
import { RiCheckboxMultipleBlankFill } from 'react-icons/ri'
import { RxHeight, RxWidth } from 'react-icons/rx'
import TabsAbertura from '../../../ui/TabsAbertura'

//TYPES & INTERFACES
type ModalConfiguracionProps = {
  isOpen: boolean
  onOpenChange: () => void
  ancho: number
  alto: number
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
  setAncho,
  setAlto,
  setTipo,
  setImgSrc,
  handleConfirmarModulo,
}: ModalConfiguracionProps) {
  const isSelectedAbertura = (): Linea | undefined => {
    if (selectLinea !== '' && selectAbertura !== '') {
      const aberturaSelect = catalogo[selectLinea]?.find(
        (item) => item.id === selectAbertura,
      )

      return aberturaSelect
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
    setTipo(event?.toString() || '')
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
        portalContainer={document.body}
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
                              getDescripcion={() => {}}
                              getCodigo={() => {}}
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
