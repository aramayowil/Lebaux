export default class Abertura {
    constructor(id, linea, tipoAbertura, codigo, descripcion,medidas, img,color, vidrio, cantidad, precio, accesorios){
        this.id = id
        this.linea = linea
        this.tipoAbertura = tipoAbertura
        this.descripcion = descripcion
        this.codigo = codigo
        this.medidas = medidas // { base: 1234, altura: 2678
        this.accesorios = accesorios // {mosquitero: 1234, tapajuntas:1234}
        this. color = color
        this.vidrio = vidrio
        this.img = img
        this.cantidad = cantidad
        this.precio = precio

    }

    mostrar (){
        
    }

    calcularTotal() {
        const precioUnitario = this.precio + (this.accesorios.mosquitero || 0) + (this.accesorios.premarco || 0);
        return this.cantidad * precioUnitario;
    }
}