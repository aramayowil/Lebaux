import { IAbertura } from '@/interfaces/IAbertura'
import { IAbertura_Compuesta } from '@/interfaces/IAberturaCompuesta'
import IPresuesto from '@/interfaces/IPresupuesto'

export default class Presupuesto implements IPresuesto {
  id: string
  cliente: string
  fecha: string
  total: number
  observaciones?: string
  descuento?: number
  estado?: 'pendiente' | 'aceptado' | 'rechazado'
  items: (IAbertura | IAbertura_Compuesta)[]

  constructor(
    id: string,
    cliente: string,
    fecha: string,
    total: number,
    items: (IAbertura | IAbertura_Compuesta)[],
    observaciones?: string,
    descuento?: number,
    estado?: 'pendiente' | 'aceptado' | 'rechazado',
  ) {
    this.id = id
    this.cliente = cliente
    this.fecha = fecha
    this.total = total
    this.observaciones = observaciones
    this.descuento = descuento
    this.estado = estado
    this.items = items
  }
}
