// interfaces/IConfiguracionModulo.ts
import { IAbertura } from './IAbertura'

export interface IModulo {
  id: string | number
  x: number
  y: number
  // Aquí usamos un "Partial" o una versión simplificada
  // para que coincida con lo que tienes en el useState del Stage
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
    // Permitimos que tenga campos de IAbertura si existen, pero no son obligatorios
  } & Partial<IAbertura>
}
