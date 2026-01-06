import { IModulo } from './Imodulo'

export interface IAbertura_Compuesta {
  key: string
  name_abertura: string
  descripcion_abertura: string
  codigo: string
  medidas: { base: number; altura: number }
  img: string
  capturedImageBase64: string
  configuracion: IModulo[]
  cantidad: number
  precio: number
  getKey(): string
  calcularTotal(): number
}
