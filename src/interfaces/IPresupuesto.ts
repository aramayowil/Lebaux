import { IAbertura } from './IAbertura'
import { IAberturaCompuesta } from './IAberturaCompuesta'

export interface IPresupuesto {
  id: string
  cliente: string
  fecha: string
  total: number
  observaciones?: string 
  descuento?: number 
  estado?: 'pendiente' | 'aceptado' | 'rechazado' 
  items: (IAbertura | IAberturaCompuesta)[]
}
