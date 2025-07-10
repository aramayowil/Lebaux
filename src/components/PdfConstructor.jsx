import React from 'react'
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
    fontSize: 11,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 2,
    padding: 8,
  },
})
function PDF({ descuento }) {
  const aberturas = JSON.parse(localStorage.getItem('aberturas')) || []
  console.log('aberturas:', aberturas)
  return (
    <Document>
      <Page wrap="true" size="A4" style={styles.page}>
        <View style={styles.section}>
          <Image
            src="../../public/img/LEBAUX-LOGO.png"
            style={{ width: 190, height: 55 }}
          />

          <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#eba434' }}>
            PRESUPUESTO
          </Text>
        </View>
        <View style={styles.textEncabezado}>
          <View style={{ marginLeft: 16 }}>
            <Text>Sres. ARAMAYO WILBER DAVID</Text>
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
            <Text>Fecha: 10/07/2025</Text>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 16,
            marginHorizontal: 16,
            fontSize: 11,
            borderBottom: '1px solid #000',
          }}
        >
          <Text style={{ flexGrow: '0.5' }}>Producto</Text>
          <Text>Precio</Text>
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
                  width: '40%',
                  justifyContent: 'center',
                  alignContent: 'center',
                  padding: 8,
                  fontSize: 11,
                  maxHeight: 150,
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
                    margin: '0 auto',
                    padding: 4,
                  }}
                />
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '60%',
                  padding: 8,
                  justifyContent: 'space-between',
                  alignContent: 'flex-start',
                  fontSize: 11,
                }}
              >
                <View style={{ textAlign: 'left' }}>
                  <Text>{abertura.descripcion}</Text>
                  <Text>
                    {abertura.medidas.base} x {abertura.medidas.altura} cm
                  </Text>
                  <Text>Cantidad: {abertura.cantidad}</Text>
                  <Text>Color: {abertura.color}</Text>
                  <Text>Vidrio: {abertura.vidrio}</Text>
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
                    ${abertura.precio}
                  </Text>
                  <Text style={{ textAlign: 'center' }}>
                    ${abertura.cantidad * abertura.precio}
                  </Text>
                </View>
              </View>
            </View>
          ))}

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: 16,
              padding: 16,
              fontSize: 12,
              gap: 2,
              textAlign: 'right',
            }}
          >
            <Text style={{ color: '000', backgroundColor: '#fdc97d' }}>
              <Text>IMPORTE TOTAL: $ </Text>
              <Text style={{ marginLeft: 20 }}>
                {aberturas
                  .map((item) => item.precio * item.cantidad)
                  .reduce((acc, curr) => acc + curr, 0) - 46038}
              </Text>
            </Text>
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
