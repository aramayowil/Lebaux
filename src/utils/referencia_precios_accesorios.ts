import { searchReference } from '@/xlsx/CorredizaModena'

export const obtenerDatosAccesorio = (
  tipo: 'MOSQUITERO' | 'PREMARCO',
  ancho: number,
  alto: number,
) => {
  if (isNaN(ancho) || isNaN(alto) || ancho <= 0 || alto <= 0) {
    return { precio: 0, medidasRef: '0x0' }
  }

  const fixBase = Number((ancho / 10).toFixed(2))
  const fixAltura = Number((alto / 10).toFixed(2))

  const reference = searchReference(fixBase, fixAltura)

  return {
    precio: parseFloat(reference[tipo]) || 0,
    medidasRef: reference.Medidas || 'No encontrada',
  }
}
