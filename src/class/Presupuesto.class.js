export default class Presupuesto {
    constructor(id, cliente, fecha, aberturas, total, formaPago, saldoACuenta, descuestos, recargos) {
        this.id = id;
        this.cliente = cliente
        this.fecha = fecha;
        this.aberturas = aberturas; // Array de objetos Abertura
        this.total = total; // Total del presupuesto
        this.formaPago = formaPago; // Efectivo, Transferencia, Cuotas
        this.saldoACuenta = saldoACuenta; // Saldo a cuenta
        this.descuestos = descuestos; // Descuentos aplicados
        this.recargos = recargos; // Recargos aplicados


    }

    calcularTotal() {
        return this.aberturas.reduce((total, abertura) => total + abertura.total, 0);
    }
}