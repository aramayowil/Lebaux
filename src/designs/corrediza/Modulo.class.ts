export class ModuloCorrediza {
  x: number
  y: number
  width: number
  height: number
  // Clase para definir las propiedades de un módulo corredizo
  constructor(x: number, y: number, width: number, height: number) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  subModulos(travesaños: number) {
    const subModulos = []

    const travesañoHeight = 40
    const heightModulo =
      (this.height - travesañoHeight * travesaños) / (travesaños + 1)
    console.log('heigth', this.height)
    console.log('heightModulo', heightModulo)

    for (let i = 0; i <= travesaños; i++) {
      const subModulo = new ModuloCorrediza(
        this.x,
        this.y + i * (heightModulo + travesañoHeight),
        this.width,
        heightModulo,
      )

      subModulos.push(subModulo)
    }
    return subModulos
  }

  dibujar() {
    return {
      x1: this.x,
      y1: this.y,
      x2: this.width,
      y2: this.height,
      innerRectX: this.x + 10,
      innerRectY: this.y + 10,
      innerRectWidth: this.width - 20,
      innerRectHeight: this.height - 20,
    }
  }
}
