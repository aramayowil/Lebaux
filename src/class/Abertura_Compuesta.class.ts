import { IAbertura_Compuesta } from '@/interfaces/IAberturaCompuesta'
import { IModulo } from '@/interfaces/Imodulo'
import { v4 as uuidv4 } from 'uuid'

export default class Abertura_Compuesta implements IAbertura_Compuesta {
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

  constructor(
    nombre_compuesta: string,
    descripcion_compuesta: string,
    cod_compuesta: string,
    medidas_compuesta: { base: number; altura: number },
    img_compuesta: string,
    capturedImageBase64_compuesta: string,
    configuracion: IModulo[],
    cantidad_compuesta: number,
    precio_compuesta: number,
    color_compuesta: string,
  ) {
    this.key = uuidv4()
    this.nombre_compuesta = nombre_compuesta
    this.descripcion_compuesta = descripcion_compuesta
    this.cod_compuesta = cod_compuesta
    this.medidas_compuesta = medidas_compuesta
    this.img_compuesta = img_compuesta
    this.capturedImageBase64_compuesta = capturedImageBase64_compuesta
    this.configuracion = configuracion
    this.cantidad_compuesta = cantidad_compuesta
    this.precio_compuesta = precio_compuesta
    this.color_compuesta = color_compuesta
  }
}
