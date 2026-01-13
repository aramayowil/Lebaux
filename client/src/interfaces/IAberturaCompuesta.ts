import { IModulo } from './Imodulo'

export interface IAbertura_Compuesta {
  key: string
  nombre_compuesta: string
  descripcion_compuesta: string
  cod_compuesta: string
  medidas_compuesta: { base: number; altura: number }
  img_compuesta: string
  capturedImageBase64_compuesta: string
  configuracion: IModulo[]
  cantidad_compuesta: number
  precio_compuesta: number
  color_compuesta: string
}
