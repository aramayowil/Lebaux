import { useState } from 'react'

export const [inputCantidad, setInputCantidad] = useState(1)

export const handleValueCantidad = (event) => {
  setInputCantidad(event.target.value)
}

export const [inputPrecio, setInputPrecio] = useState('')

export const handleValuePrecio = (event) => {
  setInputPrecio(event.target.value)
}

export const [selectColor, setSelectColor] = useState('blanco')

export const handleValueColor = (event) => {
  setSelectColor(event.target.value)
}

export const [inputAncho, setInputAncho] = useState('')

export const handleValueAncho = (event) => {
  setInputAncho(event.target.value)
}

export const [inputAltura, setInputAltura] = useState('')

export const handleValueAltura = (event) => {
  setInputAltura(event.target.value)
}

export const [selectVidrio, setSelectVidrio] = useState('float4mm')

export const handleValueVidrio = (event) => {
  setSelectVidrio(event.target.value)
}

export const [checkedMosquitero, setCheckedMosquitero] = useState(false)

export const handleCheckMosquitero = (event) => {
  setCheckedMosquitero(event.target.checked)
}

export const [checkedPremarco, setCheckedPremarco] = useState(false)

export const handleCheckPremarco = (event) => {
  setCheckedPremarco(event.target.checked)
}
