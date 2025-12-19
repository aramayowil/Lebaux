import { Abertura } from '@/interfaces/IAbertura'
import { colors } from '@/models/IColors'
import { vidrios } from '@/models/IVidrios'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer'

// import ImagenEscalada from './UI/ImagenEscalada'

const styles = StyleSheet.create({
  page: {
    padding: 16,
    margin: 0,
  },
  section: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
  },
  textEncabezado: {
    fontSize: 10.5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 2,
    padding: 8,
  },
})
const formatCurrency = (valor: number) => {
  return valor.toLocaleString('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}
function obtenerFechaHoy() {
  const hoy = new Date()
  const dia = String(hoy.getDate()).padStart(2, '0')
  const mes = String(hoy.getMonth() + 1).padStart(2, '0') // ¡Recordá que enero es 0!
  const año = hoy.getFullYear()

  return `${dia}/${mes}/${año}`
}

function capitalizar(texto: string) {
  return texto.charAt(0).toUpperCase() + texto.slice(1)
}

interface PDFProps {
  aberturas: Abertura[]
  totalCompra: number
  descuentoCalculado: number
  ivaCalculado: number
  saldoPendiente: number
  importeFinal: number
  nameCliente: string
}
function PDF({
  aberturas,
  totalCompra,
  descuentoCalculado,
  ivaCalculado,
  saldoPendiente,
  importeFinal,
  nameCliente = '',
}: PDFProps) {
  const IvaPorcentaje = 10.5 // 10.5%
  return (
    <Document>
      <Page wrap={true} size='A4' style={styles.page}>
        <View style={styles.section}>
          <Image
            src='./images/LEBAUX-LOGO.png'
            style={{ width: 180, height: 45 }}
          />

          <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#eba434' }}>
            PRESUPUESTO
          </Text>
        </View>
        <View style={styles.textEncabezado}>
          <View style={{ marginLeft: 16 }}>
            <Text>Sres. {nameCliente.toUpperCase()}</Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              gap: 2,
            }}
          >
            <Text>LEBAUX SRL</Text>
            <Text>Av. Alem 1930 (4000)</Text>
            <Text>San Miguel de Tucumán, Tucumán</Text>
            <Text>Fecha: {obtenerFechaHoy()}</Text>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 8,
            fontSize: 10.5,
            borderBottom: '1px solid #000',
            marginTop: 8,
          }}
        >
          <Text style={{ flexGrow: '0.73' }}>Producto</Text>
          <Text>Prec. Unit. S/Acces.</Text>
          <Text>Total</Text>
        </View>
        <View>
          {aberturas.map((abertura, index) => (
            <View
              key={index}
              style={{
                borderBottom: '1px solid #000',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignContent: 'center',
                width: '100%',
              }}
            >
              <View
                break
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '35%',
                  justifyContent: 'flex-start',
                  alignContent: 'center',
                  padding: 8,
                  fontSize: 11,
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    margin: '0 0',
                    marginBottom: 2,
                  }}
                >
                  {abertura.codigo}
                </Text>

                <Image
                  src={abertura.img}
                  style={{
                    width: `${abertura.medidas.base / 13}`,
                    height: `${abertura.medidas.altura / 13}`,
                    objectFit: 'fill',
                    padding: 4,
                    maxWidth: '100%',
                    margin: '0 auto',
                  }}
                />
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '65%',
                  padding: 8,
                  justifyContent: 'space-between',
                  alignContent: 'flex-start',
                  fontSize: 10,
                }}
              >
                <View style={{ textAlign: 'left' }}>
                  <Text>{capitalizar(abertura.linea)}</Text>
                  <Text style={{ width: '75%' }}>
                    {abertura.descripcion_abertura}
                  </Text>
                  <Text>
                    {abertura.medidas.base} x {abertura.medidas.altura}
                  </Text>
                  <Text>Cantidad: {abertura.cantidad}</Text>
                  <Text>
                    Color:{' '}
                    {colors.find((c) => c.key === abertura.color)?.label ||
                      abertura.color}
                  </Text>
                  <Text>
                    Vidrio:{' '}
                    {vidrios.find((v) => v.key === abertura.vidrio)?.label ||
                      abertura.vidrio}
                  </Text>
                  {(abertura.accesorios.premarco > 0 ||
                    abertura.accesorios.mosquitero > 0) && (
                    <Text style={{ marginTop: 6, fontSize: 9 }}>
                      Accesorios
                    </Text>
                  )}
                  {abertura.accesorios.mosquitero > 0 && (
                    <Text>
                      Mosquitero: $
                      {formatCurrency(abertura.accesorios.mosquitero)}
                    </Text>
                  )}
                  {abertura.accesorios.premarco > 0 && (
                    <Text>
                      Premarco: ${formatCurrency(abertura.accesorios.premarco)}
                    </Text>
                  )}
                </View>

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'flex-end',
                    margin: '0 0',
                    gap: 24,
                    fontSize: 11,
                  }}
                >
                  <Text style={{ textAlign: 'center' }}>
                    ${formatCurrency(abertura.precio)}
                  </Text>
                  <Text style={{ textAlign: 'center' }}>
                    $
                    {formatCurrency(
                      (abertura.precio +
                        abertura.accesorios.mosquitero +
                        abertura.accesorios.premarco) *
                        abertura.cantidad,
                    )}
                  </Text>
                </View>
              </View>
            </View>
          ))}

          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              marginTop: 16,
              fontSize: 12,
              width: '100%',
            }}
          >
            <View
              style={{
                display: 'flex',
                minWidth: 200,
              }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: '#fdc97d',
                }}
              >
                <Text>IMPORTE TOTAL:</Text>
                <Text>${formatCurrency(importeFinal)}</Text>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  fontSize: 10,
                  marginTop: 8,
                }}
              >
                <Text>Total compra:</Text>
                <Text>${formatCurrency(totalCompra)}</Text>
              </View>
              {descuentoCalculado > 0 && (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    fontSize: 10,
                  }}
                >
                  <Text>Descuento:</Text>
                  <Text>- ${formatCurrency(descuentoCalculado)}</Text>
                </View>
              )}
              {ivaCalculado > 0 && (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    fontSize: 10,
                  }}
                >
                  <Text>IVA ({IvaPorcentaje}%)</Text>
                  <Text>${formatCurrency(ivaCalculado)}</Text>
                </View>
              )}
              {saldoPendiente > 0 && (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    fontSize: 10,
                  }}
                >
                  <Text>Saldo pendiente:</Text>
                  <Text>${formatCurrency(saldoPendiente)}</Text>
                </View>
              )}
            </View>
          </View>
          <View style={{ marginTop: 42, padding: 16, fontSize: 11, gap: 8 }}>
            <Text>
              Para realizar la cotizacion y/o el presupuesto, debe tener sus
              vanos terminados con revoque fino.
            </Text>
            <Text>
              NO NOS HACEMOS CARGO DE VANOS EN FALSA ESCUADRA, Se realizan
              colocaciones en seco, mamposteria no realizamos. Se realiza
              colocacion a pedido del cliente, el servicio de colocacion
              incluye: Materiales Mano de obra, sellado y garantia del mismo (la
              garantia no comtempla roptura del vidrio).
            </Text>
            <Text>
              El costo de la colocacion se evalua al momento de ser visitado en
              la obra por fabrica. FORMA DE PAGO: El trabajo de realiza con un
              80% de seña que debe ser abonado en nuestra oficina, y el saldo
              restante al momento de entregar la obra.
            </Text>
          </View>
          <View
            style={{
              marginTop: 16,
              padding: 16,
              fontSize: 12,
              textAlign: 'center',
            }}
          >
            <Text>
              Aberturas Lebaux En Todos Tus Proyectos, Gracias por elegirnos
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}

export default PDF
