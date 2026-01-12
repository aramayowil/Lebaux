import { IAbertura } from './IAbertura'
import { IAbertura_Compuesta } from './IAberturaCompuesta'

export interface IPresupuesto {
  id: string
  cliente: string
  fecha: string
  total: number
  observaciones?: string
  descuento?: number
  estado?: 'pendiente' | 'aceptado' | 'rechazado'
  items: (IAbertura | IAbertura_Compuesta)[]
}
