import { catalogo } from '@/data'
import {
  Button,
  Select,
  SelectItem,
  Divider,
  AccordionItem,
  Checkbox,
  Input,
  Accordion,
  NumberInput,
  Form,
  addToast,
} from '@heroui/react'
import { useEffect, useState } from 'react'
import { HiMiniXMark } from 'react-icons/hi2'
import { IoColorPalette } from 'react-icons/io5'
import { MdAttachMoney } from 'react-icons/md'
import { RiCheckboxMultipleBlankFill } from 'react-icons/ri'
import { RxHeight, RxWidth } from 'react-icons/rx'
import Abertura from '@/class/Abertura.class'
import useAberturasStore from '@/stores/useAberturasStore'

export default function Prueba() {
  const agregarAberturaStore = useAberturasStore(
    (state) => state.agregarAbertura,
  )

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = catalogo[selectLinea].find(
      (abertura) => abertura.id === selectAbertura,
    )

    if (data) {
      const abertura = new Abertura(
        selectLinea,
        data.id,
        data.abertura,
        inputDescripcion,
        inputCodigo,
        { base: inputAncho, altura: inputAltura },
        {
          mosquitero: checkedMosquitero ? inputMosquitero : 0,
          premarco: checkedPremarco ? inputPremarco : 0,
        },
        selectColor,
        selectVidrio,
        'hola',
        inputCantidad,
        inputPrecio,
      )

      agregarAberturaStore(abertura)
      addToast({
        color: 'success',
        title: 'Abertura agregada',
        description: `Se ha agregado la abertura ${abertura.name_abertura} correctamente.`,
      })
    } else {
      console.error('Abertura not found')
      return
    }
  }

  const [isDisabledBody, setIsDisabledBody] = useState(true)

  const handleDisabledBody = () => {
    selectAbertura === '' || selectLinea === ''
      ? setIsDisabledBody(true)
      : setIsDisabledBody(false)
  }

  const [selectLinea, setSelectLinea] = useState('modena')

  const handleValueLinea = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectAbertura('')
    setTouchedAbertura(false)
    setSelectLinea(event.target.value)
  }

  const [selectAbertura, setSelectAbertura] = useState('')

  const handleValueAbertura = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectAbertura(event.target.value)
    setTouchedAbertura(false)
  }

  const [touchedAbertura, setTouchedAbertura] = useState(false)

  const [touchedLinea, setTouchedLinea] = useState(false)

  const [inputAncho, setInputAncho] = useState(NaN)
  const handleValueAncho = (value: number) => {
    setInputAncho(value)
  }

  const [inputAltura, setInputAltura] = useState(NaN)
  const handleValueAltura = (value: number) => {
    setInputAltura(value)
  }
  const [selectColor, setSelectColor] = useState('blanco')
  const handleValueColor = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectColor(event.target.value)
  }

  const [selectVidrio, setSelectVidrio] = useState('float4mm')
  const handleValueVidrio = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectVidrio(event.target.value)
  }

  const [inputCantidad, setInputCantidad] = useState(1)
  const handleValueCantidad = (event: number) => {
    setInputCantidad(event)
  }

  const [inputPrecio, setInputPrecio] = useState(NaN)
  const handleValuePrecio = (value: number) => {
    setInputPrecio(value)
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

  useEffect(() => {
    handleDisabledBody()
  }, [selectAbertura])

  return (
    <Form onSubmit={onSubmit}>
      <div className='grid grid-cols-6 gap-2 w-full'>
        <Select
          className='max-w-xs col-span-3'
          label='Línea'
          variant='bordered'
          selectedKeys={[selectLinea]}
          onChange={handleValueLinea}
          errorMessage={
            selectLinea !== '' || !touchedLinea
              ? ''
              : 'Debe seleccionar una línea'
          }
          isInvalid={selectLinea !== '' || !touchedLinea ? false : true}
          onClose={() => setTouchedLinea(true)}
        >
          <SelectItem key={'modena'}>Modena</SelectItem>
          <SelectItem key={'herrero'}>Herrero</SelectItem>
        </Select>

        <Select
          className='max-w-xs col-span-3'
          label='Tipo de abertura'
          variant='bordered'
          selectedKeys={[selectAbertura]}
          onChange={handleValueAbertura}
          isDisabled={selectLinea === ''}
          errorMessage={
            selectAbertura !== '' || !touchedAbertura
              ? ''
              : 'Debe seleccionar una abertura'
          }
          isInvalid={selectAbertura !== '' || !touchedAbertura ? false : true}
          onClose={() => setTouchedAbertura(true)}
        >
          {catalogo[selectLinea]?.map((item) => {
            return <SelectItem key={item.id}>{item.abertura}</SelectItem>
          })}
        </Select>

        <Divider className='col-span-6' />
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
          startContent={<RxWidth size={21} style={{ margin: '0 auto' }} />}
          endContent={<span className='text-sm text-default-400'>cm</span>}
          value={inputAncho}
          onValueChange={handleValueAncho}
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
          startContent={<RxHeight size={20} style={{ margin: '0 auto' }} />}
          endContent={<span className='text-sm text-default-400'>cm</span>}
          value={inputAltura}
          onValueChange={handleValueAltura}
        />
        <Select
          label='Color'
          isRequired
          variant='bordered'
          className='col-span-3'
          placeholder='Color'
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
          label='Vidrio'
          isRequired
          variant='bordered'
          className='col-span-3'
          placeholder='Tipo de vidrio'
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

        <NumberInput
          label='Cantidad'
          minValue={1}
          isWheelDisabled
          isRequired
          className='col-span-3'
          placeholder='Ingrese cantidad'
          variant='bordered'
          startContent={<HiMiniXMark size={20} />}
          isDisabled={isDisabledBody}
          value={inputCantidad}
          onValueChange={handleValueCantidad}
          isInvalid={inputCantidad > 0 && inputCantidad ? false : true}
          errorMessage='Cantidad no valida.'
        />
        <NumberInput
          isWheelDisabled
          label='Precio'
          isRequired
          minValue={1}
          className='col-span-3'
          placeholder='Ingrese el precio'
          variant='bordered'
          startContent={
            <MdAttachMoney size={20} style={{ margin: '0 auto' }} />
          }
          value={inputPrecio}
          isDisabled={isDisabledBody}
          onValueChange={handleValuePrecio}
        />
        <Divider className='col-span-6 my-1' />
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
          <AccordionItem key='1' aria-label='Accesorios' title='Accesorios'>
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
                      <MdAttachMoney size={20} style={{ margin: '0 auto' }} />
                    }
                    isDisabled={isDisabledBody}
                  />
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
                      <MdAttachMoney size={20} style={{ margin: '0 auto' }} />
                    }
                  />
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
        </Accordion>
      </div>

      <Button color='default' variant='bordered'>
        Cancelar
      </Button>
      <Button color='warning' type='submit'>
        Guardar abertura
      </Button>
    </Form>
  )
}
