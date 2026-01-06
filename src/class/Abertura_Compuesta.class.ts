import { IAbertura_Compuesta } from '@/interfaces/IAberturaCompuesta'
import { IModulo } from '@/interfaces/Imodulo'
import { v4 as uuidv4 } from 'uuid'

export default class Abertura_Compuesta implements IAbertura_Compuesta {
  key: string
  name_abertura: string
  descripcion_abertura: string
  codigo: string
  medidas: { base: number; altura: number }
  img: string
  capturedImageBase64: string
  configuracion: IModulo[]
  cantidad: number
  precio: number
  color: string

  constructor(
    name_abertura: string,
    descripcion_abertura: string,
    codigo: string,
    medidas: { base: number; altura: number },
    img: string,
    capturedImageBase64: string,
    configuracion: IModulo[],
    cantidad: number,
    precio: number,
    color: string,
  ) {
    // Es vital asignar las propiedades antes de llamar a métodos que las usen
    this.name_abertura = name_abertura
    this.descripcion_abertura = descripcion_abertura
    this.codigo = codigo
    this.medidas = medidas
    this.img = img
    this.capturedImageBase64 = capturedImageBase64
    this.configuracion = configuracion
    this.cantidad = cantidad
    this.precio = precio
    this.color = color

    // Generamos la key única llamando al método obligatorio de la interfaz
    this.key = this.getKey()
  }

  getKey(): string {
    return uuidv4()
  }

  calcularTotal(): number {
    return this.cantidad * this.precio
  }

  // Métodos estáticos para manejo de datos
  static obtenerAberturasDeLocalStorage(): Abertura_Compuesta[] {
    const data = localStorage.getItem('aberturas_compuestas')
    return data ? JSON.parse(data) : []
  }
}
