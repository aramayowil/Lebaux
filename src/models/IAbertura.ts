export interface IAbertura {
  key: number
  type_aberturaID: string
  linea: string
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
  getKey(): number
  calcularTotal(): number
}
