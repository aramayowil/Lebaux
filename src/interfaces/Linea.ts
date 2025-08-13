export interface Variante {
  tab: string,
  descripcion: string,
  img: string
}
export interface Linea {
  id: string,
  abertura: string,
  prefijo: string,
  variante: Variante[]
}
