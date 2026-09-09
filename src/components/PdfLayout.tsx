import { IAbertura as Abertura } from '@/interfaces/IAbertura'
import { IAbertura_Compuesta as Aberturas_Compuestas } from '@/interfaces/IAberturaCompuesta'
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 0,
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
  observacionesFinales: {
    marginTop: 15,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eba434',
    borderTopStyle: 'dashed',
    marginHorizontal: 30,
  },
  observacionesTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#eba434',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  observacionesText: {
    fontSize: 10,
    color: '#444',
    lineHeight: 1.3,
    fontStyle: 'italic',
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
  idPresupuesto: string
  aberturas: Abertura[]
  aberturasCompuestas: Aberturas_Compuestas[]
  detalleCompra: {
    total: number
    recargoTarjeta?: number
    descuento: number
    saldoPendiente: number
    iva: number
    importeFinal: number
  }
  nameCliente: string
  observaciones: string
}

function PDF({
  idPresupuesto,
  aberturas,
  aberturasCompuestas,
  detalleCompra,
  nameCliente = '',
  observaciones,
}: PDFProps) {
  const IvaPorcentaje = 10.5

  return (
    <Document>
      <Page wrap={true} size='A4' style={styles.page}>
        {/* LOGO Y TITULO */}
        <View style={styles.section}>
          <Image
            src='/images/logos/LEBAUX-LOGO.png'
            style={{ width: 180, height: 45 }}
          />
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#eba434' }}>
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
            <Text>{idPresupuesto}</Text>
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

        {/* --- ITEMS ABERTURAS SIMPLES ---*/}
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
                  paddingTop: 15,
                  paddingBottom: 10,
                  paddingHorizontal: 8,
                }}
              >
                {/* COLUMNA IZQUIERDA: IMAGEN */}
                <View style={styles.imageContainer}>
                  <Text
                    style={{
                      marginBottom: 2,
                      fontSize: 10,
                      color: '#333',
                      marginTop: -10,
                    }}
                  >
                    {abertura.cod_abertura}
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
                    abertura.accesorios.mosquitero > 0 ||
                    abertura.accesorios.persiana > 0) && (
                    <View
                      style={{
                        marginTop: 6,
                        padding: 4,
                        backgroundColor: '#fafafa',
                        borderLeft: '2px solid #eba434',
                      }}
                    >
                      {abertura.accesorios.mosquitero > 0 && (
                        <Text style={{ fontSize: 10 }}>
                          • Mosquitero: $
                          {formatCurrency(abertura.accesorios.mosquitero)}
                        </Text>
                      )}
                      {abertura.accesorios.premarco > 0 && (
                        <Text style={{ fontSize: 10 }}>
                          • Premarco: $
                          {formatCurrency(abertura.accesorios.premarco)}
                        </Text>
                      )}
                      {abertura.accesorios.persiana > 0 && (
                        <Text style={{ fontSize: 10 }}>
                          • Persiana Enrrollable: $
                          {formatCurrency(abertura.accesorios.persiana)}
                        </Text>
                      )}
                    </View>
                  )}

                  {abertura.precioColocacion > 0 && (
                    <View
                      style={{
                        marginTop: 6,
                        padding: 4,
                        backgroundColor: '#fafafa',
                        borderLeft: '2px solid #eba434',
                      }}
                    >
                      {abertura.precioColocacion > 0 && (
                        <Text style={{ fontSize: 10 }}>
                          • Colocación: $
                          {formatCurrency(abertura.precioColocacion)}
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
                      Importe: ${formatCurrency(abertura.precioFinal)}
                    </Text>
                  </View>
                </View>
              </View>
            )
          })}
        </View>

        {/* --- ITEMS ABERTURAS COMPUESTAS ---*/}
        <View>
          {aberturasCompuestas.map((compuesta, index) => {
            const AREA_MAX_W = 230
            const AREA_MAX_H = 180
            const umbral = 500
            const escalaBase = 0.25

            let widthCalculado: number
            if (compuesta.medidas_compuesta.base <= umbral) {
              widthCalculado = compuesta.medidas_compuesta.base * escalaBase
            } else {
              const excedente = compuesta.medidas_compuesta.base - umbral
              widthCalculado = umbral * escalaBase + excedente * 0.03
            }

            const aspect =
              compuesta.medidas_compuesta.altura /
              compuesta.medidas_compuesta.base
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
                  paddingTop: 15,
                  paddingBottom: 10,
                  paddingHorizontal: 8,
                }}
              >
                {/* COLUMNA IZQUIERDA: IMAGEN */}
                <View style={styles.imageContainer}>
                  <Text
                    style={{
                      marginBottom: 2,
                      fontSize: 10,
                      color: '#333',
                      marginTop: -10,
                    }}
                  >
                    {compuesta.cod_compuesta}
                  </Text>
                  <View
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Image
                      src={compuesta.capturedImageBase64_compuesta}
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
                  {/* LISTADO DE MÓDULOS INTERNOS */}
                  {compuesta.configuracion.map((modulo, index) => (
                    <View key={index}>
                      <Text
                        style={{
                          fontSize: 10,
                          color: '#444',
                          lineHeight: 1.1,
                          marginBottom: 2,
                        }}
                      >
                        {`${modulo.abertura.descripcion_abertura} ${capitalizar(modulo.abertura.linea)}`}
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          color: '#444',
                          lineHeight: 1.1,
                          marginBottom: 2,
                        }}
                      >
                        {`${modulo.abertura.medidas.base} x ${modulo.abertura.medidas.altura} mm`}
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          color: '#444',
                          lineHeight: 1.1,
                          marginBottom: 6,
                        }}
                      >
                        {`Vidrio: ${capitalizar(modulo.abertura.vidrio)}`}
                      </Text>
                    </View>
                  ))}

                  <View style={{ gap: 2 }}>
                    <Text style={{ fontSize: 10 }}>
                      Medidas:{' '}
                      <Text style={{ fontWeight: 'bold' }}>
                        {compuesta.medidas_compuesta.base} x{' '}
                        {compuesta.medidas_compuesta.altura} mm
                      </Text>
                    </Text>
                    <Text style={{ fontSize: 10 }}>
                      Color:{' '}
                      {colors.find((c) => c.key === compuesta.color_compuesta)
                        ?.label || compuesta.descripcion_compuesta}
                    </Text>
                    <Text style={{ fontSize: 10 }}>
                      Cantidad: {compuesta.cantidad_compuesta}
                    </Text>
                  </View>

                  {compuesta.precioColocacion_compuesta > 0 && (
                    <View
                      style={{
                        marginTop: 6,
                        padding: 4,
                        backgroundColor: '#fafafa',
                        borderLeft: '2px solid #eba434',
                      }}
                    >
                      {compuesta.precioColocacion_compuesta > 0 && (
                        <Text style={{ fontSize: 10 }}>
                          • Colocación: $
                          {formatCurrency(compuesta.precioColocacion_compuesta)}
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
                      P. Unitario: ${formatCurrency(compuesta.precio_compuesta)}
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
                        (compuesta.precio_compuesta +
                          compuesta.precioColocacion_compuesta) *
                          compuesta.cantidad_compuesta,
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
                ${formatCurrency(detalleCompra.importeFinal)}
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
              <Text>
                $
                {formatCurrency(
                  detalleCompra.total - (detalleCompra.recargoTarjeta || 0),
                )}
              </Text>
            </View>
            {(detalleCompra.recargoTarjeta || 0) > 0 && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  fontSize: 10,
                  marginBottom: 2,
                }}
              >
                <Text>Recargo tarjeta (30%):</Text>
                <Text>
                  + ${formatCurrency(detalleCompra.recargoTarjeta || 0)}
                </Text>
              </View>
            )}
            {detalleCompra.descuento > 0 && (
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
                <Text>- ${formatCurrency(detalleCompra.descuento)}</Text>
              </View>
            )}
            {detalleCompra.iva > 0 && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  fontSize: 10,
                }}
              >
                <Text>IVA ({IvaPorcentaje}%):</Text>
                <Text>${formatCurrency(detalleCompra.iva)}</Text>
              </View>
            )}
            {detalleCompra.saldoPendiente > 0 && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  fontSize: 10,
                  color: 'green',
                  marginBottom: 2,
                }}
              >
                <Text>Saldo pendiente:</Text>
                <Text>${formatCurrency(detalleCompra.saldoPendiente)}</Text>
              </View>
            )}
          </View>
        </View>

        {/* --- OBSERVACIONES AL FINAL --- */}
        {observaciones && observaciones.trim().length > 0 && (
          <View style={styles.observacionesFinales}>
            <Text style={styles.observacionesTitle}>Notas adicionales:</Text>
            <Text style={styles.observacionesText}>{observaciones}</Text>
          </View>
        )}

        {/* TEXTO LEGAL Y CONDICIONES ACTUALIZADO */}
        <View wrap={false} style={styles.condicionesContainer}>
          <Text style={{ marginBottom: 4 }}>
            <Text style={{ fontWeight: 'bold' }}>IMPORTANTE:</Text> Para
            presupuestar e instalar, los vanos deben contar con revoque fino
            terminado.{' '}
            <Text style={{ fontWeight: 'bold' }}>
              LA EMPRESA NO SE HACE CARGO DE VANOS EN FALSA ESCUADRA.
            </Text>
          </Text>

          <Text style={{ marginBottom: 4 }}>
            Las especificaciones sobre la instalación y el alcance de las
            responsabilidades técnicas contratadas se rigen bajo las siguientes
            cláusulas operativas:
          </Text>

          <Text style={{ marginBottom: 4 }}>
            <Text style={{ fontWeight: 'bold' }}>Instalación técnica: </Text>Se
            realizan exclusivamente colocaciones en seco. La colocación se
            ejecuta bajo expreso pedido y consentimiento del cliente.
          </Text>

          <Text style={{ marginBottom: 4 }}>
            <Text style={{ fontWeight: 'bold' }}>Exclusiones de obra: </Text>No
            se realizan trabajos de mampostería ni albañilería bajo ninguna
            circunstancia.
          </Text>

          <Text style={{ marginBottom: 4 }}>
            El presupuesto{' '}
            <Text style={{ fontWeight: 'bold' }}>
              NO incluye ANDAMIOS NI EQUIPOS DE ELEVACIÓN
            </Text>
            , los cuales deben ser provistos por el cliente en caso de ser
            necesarios para la ejecución del trabajo.
          </Text>

          <Text style={{ marginBottom: 4 }}>
            <Text style={{ fontWeight: 'bold' }}>
              Alcance de la prestación:{' '}
            </Text>
            El servicio integral de instalación incluye la totalidad de los
            materiales específicos de fijación, la mano de obra especializada,
            el sellado y la correspondiente garantía del trabajo realizado. El
            costo final del servicio queda sujeto a la verificación técnica de
            fábrica en obra.
          </Text>

          <Text style={{ marginBottom: 4 }}>
            <Text style={{ fontWeight: 'bold' }}>Sellado perimetral: </Text>El
            sellado hermético perimetral se realiza estrictamente con silicona
            neutra y poliuretano expandido hasta un máximo de 1 cm de
            espesor/luz. Cualquier terminación estética posterior (como
            mampostería, yeso o pintura) correrá por cuenta exclusiva del
            cliente mediante servicios externos.
          </Text>

          <Text style={{ marginBottom: 4 }}>
            <Text style={{ fontWeight: 'bold' }}>Límite de la garantía: </Text>
            La cobertura de la garantía técnica del servicio no contempla, bajo
            ningún concepto, la rotura posterior de los vidrios.
          </Text>

          <Text style={{ marginBottom: 4 }}>
            <Text style={{ fontWeight: 'bold' }}>
              OBSERVACIÓN - INSTALACIÓN DE PAÑOS FIJOS:{' '}
            </Text>
            La empresa no se responsabiliza por paños fijos instalados por
            terceros o personal ajeno a la empresa, quedando excluida la
            cobertura ante roturas de vidrio, filtraciones o fallas de sellado.
            La colocación de estas aberturas exige personal calificado.
          </Text>

          <Text style={{ marginBottom: 8 }}>
            <Text style={{ fontWeight: 'bold' }}>
              OBSERVACIÓN - REGULACIÓN POR TERCEROS:{' '}
            </Text>
            La empresa NO se responsabiliza por desajustes o la mala regulación
            posterior de puertas y hojas si la instalación o manipulación es
            ejecutada por personal ajeno a nuestra firma.
          </Text>

          {/* Conservamos la forma de pago original */}
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
