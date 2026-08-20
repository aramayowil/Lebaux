import { IAbertura } from './IAbertura'
import { IAbertura_Compuesta } from './IAberturaCompuesta'

export default interface IPresupuesto {
  id: string
  cliente: string
  fecha: string
  observaciones: string
  detalleCompra: {
    total: number
    precioLista?: number
    descuento: number
    saldoPendiente: number
    iva: number
    importeFinal: number
  }
  estado: 'pendiente' | 'aprobado' | 'rechazado'
  items: (IAbertura | IAbertura_Compuesta)[]
}
