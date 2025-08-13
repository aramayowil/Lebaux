export interface Abertura {
  key: number
  linea: string
  type_aberturaID: string
  name_abertura: string
  descripcion_abertura: string
  codigo: string
  medidas: { base: number; altura: number }
  accesorios: { mosquitero: number; premarco: number }
  color: string
  vidrio: string
  img: string
  cantidad: number
  precio: number
}
