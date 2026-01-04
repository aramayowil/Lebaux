import { IAbertura } from '@/interfaces/IAbertura'

export interface IAbertura_Compuesta {
  key: number
  name_abertura: string
  descripcion_abertura: string
  codigo: string
  medidas: { base: number; altura: number }
  img: string
  capturedImageBase64: string
  aberturas: { aberturas: IAbertura[]; x: number; y: number }
  cantidad: number
  precio: number
  getKey(): number
  calcularTotal(): number
}
