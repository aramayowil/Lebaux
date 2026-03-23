import { IAbertura } from '@/interfaces/IAbertura'
import { IAbertura_Compuesta } from '@/interfaces/IAberturaCompuesta'
import IPresuesto from '@/interfaces/IPresupuesto'

export default class Presupuesto implements IPresuesto {
  id: string
  cliente: string
  fecha: string
  observaciones: string
  detalleCompra: {
    total: number
    descuento: number
    saldoPendiente: number
    iva: number
    importeFinal: number
  }
  estado: 'pendiente' | 'aprobado' | 'rechazado'
  items: (IAbertura | IAbertura_Compuesta)[]

  constructor(
    id: string,
    cliente: string,
    fecha: string,
    detalleCompra: {
      total: number
      descuento: number
      saldoPendiente: number
      iva: number
      importeFinal: number
    },
    items: (IAbertura | IAbertura_Compuesta)[],
    observaciones: string,
    estado: 'pendiente' | 'aprobado' | 'rechazado',
  ) {
    this.id = id
    this.cliente = cliente
    this.fecha = fecha
    this.detalleCompra = detalleCompra
    this.observaciones = observaciones
    this.estado = estado
    this.items = items
  }
}
