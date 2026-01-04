import { IAbertura } from '@/interfaces/IAbertura'
import { IAbertura_Compuesta } from '@/interfaces/IAberturaCompuesta'

export default class Abertura_Compuesta implements IAbertura_Compuesta {
  key: number
  name_abertura: string
  descripcion_abertura: string
  codigo: string
  medidas: { base: number; altura: number }
  img: string
  capturedImageBase64: string
  aberturas: { aberturas: IAbertura[]; x: number; y: number }
  cantidad: number
  precio: number

  constructor(
    name_abertura: string,
    descripcion_abertura: string,
    codigo: string,
    medidas: { base: number; altura: number },
    img: string,
    capturedImageBase64: string,
    aberturas: { aberturas: IAbertura[]; x: number; y: number },
    cantidad: number,
    precio: number,
  ) {
    this.key = this.getKey()

    this.name_abertura = name_abertura
    this.descripcion_abertura = descripcion_abertura
    this.codigo = codigo
    this.medidas = medidas
    this.img = img
    this.capturedImageBase64 = capturedImageBase64
    this.aberturas = aberturas
    this.cantidad = cantidad
    this.precio = precio
  }

  getKey(): number {
    // Obtiene el último key de las aberturas almacenadas en localStorage y genera un nuevo key
    const data = localStorage.getItem('aberturas-store-compuestas')
    const aberturas = data ? JSON.parse(data).state.aberturas : []
    const key =
      aberturas.length > 0 ? aberturas[aberturas.length - 1].key + 1 : 0
    return key
  }

  calcularTotal(): number {
    return this.cantidad * this.precio
  }

  static obtenerAberturasDeLocalStorage(): Abertura_Compuesta[] {
    const data = localStorage.getItem('aberturas_compuestas')
    return data ? JSON.parse(data) : []
  }

  guardarEnLocalStorage(): void {
    const aberturas_compuestas =
      Abertura_Compuesta.obtenerAberturasDeLocalStorage()
    aberturas_compuestas.push(this)
    localStorage.setItem(
      'aberturas_compuestas',
      JSON.stringify(aberturas_compuestas),
    )
  }
}
