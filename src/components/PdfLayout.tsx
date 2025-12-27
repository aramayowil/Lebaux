import { IAbertura as Abertura } from '@/interfaces/IAbertura'
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

const styles = StyleSheet.create({
  page: {
    padding: 20,
    margin: 0,
  },
  section: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  textEncabezado: {
    fontSize: 10.5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  imageContainer: {
    width: '45%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start', // Alinea al inicio (arriba)
    alignItems: 'center',
    paddingTop: 0, // Eliminado el padding superior para subir la imagen
    paddingBottom: 10,
  },
  condicionesContainer: {
    marginTop: 30,
    fontSize: 10.5,
    color: '#444',
    paddingTop: 15,
    lineHeight: 1.5,
    paddingHorizontal: 30,
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
  const mes = String(hoy.getMonth() + 1).padStart(2, '0')
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
  importeFinal,
  nameCliente = '',
}: PDFProps) {
  const IvaPorcentaje = 10.5

  return (
    <Document>
      <Page wrap={true} size='A4' style={styles.page}>
        {/* LOGO Y TITULO */}
        <View style={styles.section}>
          <Image
            src='./images/LEBAUX-LOGO.png'
            style={{ width: 180, height: 45 }}
          />
          <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#eba434' }}>
            PRESUPUESTO
          </Text>
        </View>

        {/* INFO CLIENTE */}
        <View style={styles.textEncabezado}>
          <View>
            <Text style={{ fontSize: 11 }}>
              Sres. {nameCliente.toUpperCase()}
            </Text>
          </View>
          <View style={{ alignItems: 'flex-end', gap: 2 }}>
            <Text>LEBAUX SRL</Text>
            <Text>Av. Alem 1930 - San Miguel de Tucumán</Text>
            <Text>Fecha: {obtenerFechaHoy()}</Text>
          </View>
        </View>

        {/* CABECERA TABLA */}
        <View
          style={{
            flexDirection: 'row',
            padding: 8,
            fontSize: 10,
            borderBottom: '2px solid #eba434',
            backgroundColor: '#f8f8f8',
          }}
        >
          <Text style={{ width: '45%' }}>Diseño / Abertura</Text>
          <Text style={{ width: '35%' }}>Especificaciones</Text>
          <Text style={{ width: '20%', textAlign: 'right' }}>Total</Text>
        </View>

        {/* ITEMS */}
        <View>
          {aberturas.map((abertura, index) => {
            const AREA_MAX_W = 230
            const AREA_MAX_H = 180
            const umbral = 500
            const escalaBase = 0.25

            let widthCalculado: number
            if (abertura.medidas.base <= umbral) {
              widthCalculado = abertura.medidas.base * escalaBase
            } else {
              const excedente = abertura.medidas.base - umbral
              widthCalculado = umbral * escalaBase + excedente * 0.03
            }

            const aspect = abertura.medidas.altura / abertura.medidas.base
            let finalWidth = widthCalculado
            let finalHeight = widthCalculado * aspect

            if (finalWidth > AREA_MAX_W) {
              const ratio = AREA_MAX_W / finalWidth
              finalWidth *= ratio
              finalHeight *= ratio
            }
            if (finalHeight > AREA_MAX_H) {
              const ratio = AREA_MAX_H / finalHeight
              finalWidth *= ratio
              finalHeight *= ratio
            }

            return (
              <View
                key={index}
                wrap={false}
                style={{
                  borderBottomWidth: 1.5,
                  borderBottomColor: '#eba434',
                  borderBottomStyle: 'solid',
                  flexDirection: 'row',
                  alignItems: 'stretch',
                  marginTop: 5,
                  paddingTop: 15, // Mantiene el espacio superior del bloque
                  paddingBottom: 10,
                  paddingHorizontal: 8,
                }}
              >
                {/* COLUMNA IZQUIERDA: IMAGEN (MODIFICADA PARA SUBIR) */}
                <View style={styles.imageContainer}>
                  <Text
                    style={{
                      marginBottom: 2, // Reducido de 5 a 2
                      fontSize: 10,
                      color: '#333',
                      marginTop: -10, // Margen negativo para forzar la subida hacia el borde superior
                    }}
                  >
                    {abertura.codigo}
                  </Text>
                  <View
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Image
                      src={abertura.capturedImageBase64}
                      style={{ width: finalWidth, height: finalHeight }}
                    />
                  </View>
                </View>

                {/* COLUMNA DERECHA: TEXTO */}
                <View
                  style={{
                    width: '55%',
                    paddingLeft: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: '#333',
                      marginBottom: 2,
                    }}
                  >
                    {capitalizar(abertura.linea)}
                  </Text>

                  <Text
                    style={{
                      fontSize: 10,
                      color: '#444',
                      lineHeight: 1.1,
                      marginBottom: 5,
                    }}
                  >
                    {abertura.descripcion_abertura.replace(/\s+/g, ' ').trim()}
                  </Text>

                  <View style={{ gap: 2 }}>
                    <Text style={{ fontSize: 10 }}>
                      Medidas:{' '}
                      <Text style={{ fontWeight: 'bold' }}>
                        {abertura.medidas.base} x {abertura.medidas.altura} mm
                      </Text>
                    </Text>
                    <Text style={{ fontSize: 10 }}>
                      Color:{' '}
                      {colors.find((c) => c.key === abertura.color)?.label ||
                        abertura.color}
                    </Text>
                    <Text style={{ fontSize: 10 }}>
                      Vidrio:{' '}
                      {vidrios.find((v) => v.key === abertura.vidrio)?.label ||
                        abertura.vidrio}
                    </Text>
                    <Text style={{ fontSize: 10 }}>
                      Cantidad: {abertura.cantidad}
                    </Text>
                  </View>

                  {(abertura.accesorios.premarco > 0 ||
                    abertura.accesorios.mosquitero > 0) && (
                    <View
                      style={{
                        marginTop: 6,
                        padding: 4,
                        backgroundColor: '#fafafa',
                        borderLeft: '2px solid #eba434',
                      }}
                    >
                      {abertura.accesorios.mosquitero > 0 && (
                        <Text style={{ fontSize: 9 }}>
                          • Mosquitero: $
                          {formatCurrency(abertura.accesorios.mosquitero)}
                        </Text>
                      )}
                      {abertura.accesorios.premarco > 0 && (
                        <Text style={{ fontSize: 9 }}>
                          • Premarco: $
                          {formatCurrency(abertura.accesorios.premarco)}
                        </Text>
                      )}
                    </View>
                  )}

                  <View
                    style={{
                      marginTop: 'auto',
                      paddingTop: 10,
                      alignItems: 'flex-end',
                    }}
                  >
                    <Text style={{ fontSize: 10, color: '#666' }}>
                      P. Unitario: ${formatCurrency(abertura.precio)}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: '#eba434',
                      }}
                    >
                      Importe: $
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
            )
          })}
        </View>

        {/* TOTALES FINALES */}
        <View
          wrap={false}
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            paddingHorizontal: 8,
          }}
        >
          <View style={{ minWidth: 220, gap: 4 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 6,
                backgroundColor: '#eba434',
                gap: 10,
              }}
            >
              <Text
                style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}
              >
                TOTAL FINAL:
              </Text>
              <Text
                style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}
              >
                ${formatCurrency(importeFinal)}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                fontSize: 10,
                marginBottom: 2,
              }}
            >
              <Text>Total neto:</Text>
              <Text>${formatCurrency(totalCompra)}</Text>
            </View>
            {descuentoCalculado > 0 && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  fontSize: 10,
                  color: 'red',
                  marginBottom: 2,
                }}
              >
                <Text>Bonificación:</Text>
                <Text>- ${formatCurrency(descuentoCalculado)}</Text>
              </View>
            )}
            {ivaCalculado > 0 && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  fontSize: 10,
                }}
              >
                <Text>IVA ({IvaPorcentaje}%):</Text>
                <Text>${formatCurrency(ivaCalculado)}</Text>
              </View>
            )}
          </View>
        </View>

        {/* TEXTO LEGAL Y CONDICIONES */}
        <View wrap={false} style={styles.condicionesContainer}>
          <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>
            Para realizar la cotización y/o el presupuesto, debe tener sus vanos
            terminados con revoque fino.
          </Text>
          <Text style={{ marginBottom: 4 }}>
            NO NOS HACEMOS CARGO DE VANOS EN FALSA ESCUADRA. Se realizan
            colocaciones en seco, mampostería no realizamos. Se realiza
            colocación a pedido del cliente, el servicio de colocación incluye:
            Materiales, Mano de obra, sellado y garantía del mismo (la garantía
            no contempla rotura del vidrio).
          </Text>
          <Text style={{ marginBottom: 4 }}>
            El costo de la colocación se evalúa al momento de ser visitado en la
            obra por fábrica.
          </Text>
          <Text style={{ marginBottom: 8 }}>
            <Text style={{ fontWeight: 'bold' }}>FORMA DE PAGO: </Text>
            El trabajo se realiza con un 80% de seña que debe ser abonado en
            nuestra oficina, y el saldo restante al momento de entregar la obra.
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              color: '#eba434',
              textAlign: 'center',
              marginTop: 35,
            }}
          >
            Aberturas Lebaux En Todos Tus Proyectos, Gracias por elegirnos.
          </Text>
        </View>
      </Page>
    </Document>
  )
}

export default PDF
