import { IAbertura } from '@/interfaces/IAbertura'

export default class Abertura implements IAbertura {
  key: number
  type_aberturaID: string
  linea: string
  name_abertura: string
  descripcion_abertura: string
  codigo: string
  variantKey: number
  medidas: { base: number; altura: number }
  accesorios: { mosquitero: number; premarco: number }
  color: string
  vidrio: string
  img: string
  capturedImageBase64: string
  cantidad: number
  precio: number

  constructor(
    linea: string,
    type_aberturaID: string,
    name_abertura: string,
    descripcion_abertura: string,
    codigo: string,
    variantKey: number,
    medidas: { base: number; altura: number },
    accesorios: { mosquitero: number; premarco: number },
    color: string,
    vidrio: string,
    img: string,
    capturedImageBase64: string,
    cantidad: number,
    precio: number,
  ) {
    this.key = this.getKey()
    this.linea = linea
    this.type_aberturaID = type_aberturaID
    this.name_abertura = name_abertura
    this.descripcion_abertura = descripcion_abertura
    this.codigo = codigo
    this.variantKey = variantKey
    this.medidas = medidas
    this.accesorios = accesorios
    this.color = color
    this.vidrio = vidrio
    this.img = img
    this.capturedImageBase64 = capturedImageBase64
    this.cantidad = cantidad
    this.precio = precio
  }

  getKey(): number {
    // Obtiene el último key de las aberturas almacenadas en localStorage y genera un nuevo key
    const data = localStorage.getItem('aberturas-store')
    const aberturas = data ? JSON.parse(data).state.aberturas : []
    const key =
      aberturas.length > 0 ? aberturas[aberturas.length - 1].key + 1 : 0
    return key
  }

  calcularTotal(): number {
    const precioUnitario =
      this.precio +
      (this.accesorios.mosquitero || 0) +
      (this.accesorios.premarco || 0)
    return this.cantidad * precioUnitario
  }

  static obtenerAberturasDeLocalStorage(): Abertura[] {
    const data = localStorage.getItem('aberturas')
    return data ? JSON.parse(data) : []
  }

  guardarEnLocalStorage(): void {
    const aberturas = Abertura.obtenerAberturasDeLocalStorage()
    aberturas.push(this)
    localStorage.setItem('aberturas', JSON.stringify(aberturas))
  }
}
