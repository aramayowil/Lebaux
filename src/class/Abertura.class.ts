import { IAbertura } from '@/interfaces/IAbertura'
import { v4 as uuidv4 } from 'uuid'

export default class Abertura implements IAbertura {
  key: string
  abertura_id: string
  linea: string
  nombre_abertura: string
  descripcion_abertura: string
  cod_abertura: string
  variantKey: number
  medidas: { base: number; altura: number }
  accesorios: { mosquitero: number; premarco: number }
  color: string
  vidrio: string
  img: string
  capturedImageBase64: string
  cantidad: number
  precio: number

  constructor(
    linea: string,
    abertura_id: string,
    nombre_abertura: string,
    descripcion_abertura: string,
    cod_abertura: string,
    variantKey: number,
    medidas: { base: number; altura: number },
    accesorios: { mosquitero: number; premarco: number },
    color: string,
    vidrio: string,
    img: string,
    capturedImageBase64: string,
    cantidad: number,
    precio: number,
  ) {
    this.key = uuidv4()
    this.linea = linea
    this.abertura_id = abertura_id
    this.nombre_abertura = nombre_abertura
    this.descripcion_abertura = descripcion_abertura
    this.cod_abertura = cod_abertura
    this.variantKey = variantKey
    this.medidas = medidas
    this.accesorios = accesorios
    this.color = color
    this.vidrio = vidrio
    this.img = img
    this.capturedImageBase64 = capturedImageBase64
    this.cantidad = cantidad
    this.precio = precio
  }

  calcularTotal(): number {
    const precioUnitario =
      this.precio +
      (this.accesorios.mosquitero || 0) +
      (this.accesorios.premarco || 0)
    return this.cantidad * precioUnitario
  }
}
