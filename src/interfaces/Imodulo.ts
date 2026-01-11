import { IAbertura } from './IAbertura'

export interface IModulo {
  id: string | number
  x: number
  y: number
  abertura: {
    linea: string
    abertura: string
    ancho: number
    altura: number
    color: string
    vidrio: string
    cantidad: number
    precio: number
    codigo: string
    descripcion: string
    imgSrc: string
    variantKey: number
  } & Partial<IAbertura>
}
