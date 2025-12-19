export interface Variante {
  variantKey: number
  tab: string
  descripcion: string
  img: string
}
export interface Linea {
  id: string
  abertura: string
  prefijo: string
  variante: Variante[]
}
