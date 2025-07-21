import React, { useState } from 'react'

export const hooskModal = () => {
  const [imgSrc, setImgSrc] = useState('')
  const handleImg = (src) => {
    setImgSrc(src)
  }

  const [touchedLinea, setTouchedLinea] = React.useState(false)

  const [selectLinea, setSelectLinea] = useState('modena')

  const handleValueLinea = (event) => {
    setSelectAbertura('')
    setTouchedAbertura(false)
    setSelectLinea(event.target.value)
  }

  const [touchedAbertura, setTouchedAbertura] = React.useState(false)
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
    if (typeof event === 'number') {
      setInputCantidad(parseInt(event))
    } else {
      setInputCantidad(parseInt(event.target.value))
    }
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
  return {
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
    setSelectVidrio,
    setSelectColor,
    setTouchedAbertura,
    setCheckedMosquitero,
    setCheckedPremarco,
  }
}
