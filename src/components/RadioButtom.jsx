import { RadioGroup, Radio, useRadio, VisuallyHidden, cn } from '@heroui/react'

export const CustomRadio = (props) => {
  const { children, ...otherProps } = props

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          'inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between',
          'flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-2 p-2 border-2 border-transparent',
          'data-[selected=true]:border-warning'
        ),
      }}
    >
      {children}
    </Radio>
  )
}

export default function RadioButtom({ formadePago }) {
  return (
    <RadioGroup
      size="sm"
      color="warning"
      description="Selecciona una forma de pago."
      label="Formas de pago"
      defaultValue={'efectivo'}
      onValueChange={(event) => formadePago(event)}
    >
      <CustomRadio description="Descuento del 10%." value="efectivo">
        Efectivo
      </CustomRadio>
      <CustomRadio description="Recargo del 5%." value="transferencia">
        Transferencia
      </CustomRadio>
      <CustomRadio description="Hasta 6 cuotas sin interes." value="cuotas">
        Cuotas
      </CustomRadio>
    </RadioGroup>
  )
}
