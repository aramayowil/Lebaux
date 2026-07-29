export interface IAbertura {
  key: string
  abertura_id: string
  linea: string
  nombre_abertura: string
  descripcion_abertura: string
  cod_abertura: string
  variantKey: number
  medidas: { base: number; altura: number }
  accesorios: { mosquitero: number; premarco: number; persiana: number }
  color: string
  vidrio: string
  img: string
  capturedImageBase64: string
  precioColocacion: number
  cantidad: number
  precio: number
  precioFinal: number
}
