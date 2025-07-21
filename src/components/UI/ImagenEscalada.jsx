import { View, Image } from '@react-pdf/renderer'

export default function ImagenEscalada({
  src,
  baseCm,
  alturaCm,
  factor = 0.065, // escala: px/cm
}) {
  const ladoMayor = Math.max(baseCm, alturaCm)
  const escala = factor // px/cm

  const escalaGlobal = ladoMayor * escala

  // Proporción constante entre ambos lados
  const proporción = baseCm / alturaCm

  const widthPx = proporción >= 1 ? escalaGlobal : escalaGlobal * proporción
  const heightPx = proporción >= 1 ? escalaGlobal / proporción : escalaGlobal

  return (
    <Image
      src={src}
      alt="Producto"
      style={{
        width: `${widthPx}px`,
        height: `${heightPx}px`,
        objectFit: 'contain', // ✅ mantiene proporción sin deformarse
        display: 'block',
        margin: '0 auto',
        border: '1px solid #ccc',
      }}
    />
  )
}

// export default function ImagenEscalada({
//   src,
//   baseCm,
//   alturaCm,
//   factor = 0.065, // 🔧 cuanto más bajo, más pequeña será la imagen
// }) {
//   const escala = factor // escala visual: px/cm

//   const widthPx = baseCm * escala
//   const heightPx = alturaCm * escala

//   return (
//     <Image
//       src={src}
//       alt="Producto"
//       style={{
//         width: `${widthPx}px`,
//         height: `${heightPx}px`,
//         objectFit: 'fill', // 🔥 se deforma para ocupar todo el espacio
//         display: 'block',
//         margin: '0 auto',
//         border: '1px solid #ccc',
//       }}
//     />
//   )
// }
// export default function ImagenEscalada({
//   src,
//   baseCm,
//   alturaCm,
//   maxAlturaPx = 300,
//   factor = 0.35,
// }) {
//   // factor < 1 reduce la escala visual
//   const escalaBase = maxAlturaPx / alturaCm
//   const escalaReducida = escalaBase * factor

//   const widthPx = baseCm * escalaReducida
//   const heightPx = alturaCm * escalaReducida

//   return (
//     <Image
//       src={src}
//       alt="Producto"
//       style={{
//         width: `${widthPx}px`,
//         height: `${heightPx}px`,
//         objectFit: 'contain',
//         borderRadius: '6px',
//         border: '1px solid #ccc',
//         display: 'block',
//         margin: '0 auto',
//       }}
//     />
//   )
// }

// function ImagenEscalada({ src, baseCm, alturaCm, maxAlturaPx = 300 }) {
//   const escala = maxAlturaPx / alturaCm
//   const widthPx = baseCm * escala
//   const heightPx = alturaCm * escala

//   // Si la altura calculada es menor al límite, la respetamos
//   const finalHeight = Math.min(heightPx, maxAlturaPx)
//   const finalWidth = baseCm * (finalHeight / alturaCm)

//   return (
//     <img
//       src={src}
//       alt="Producto"
//       width={finalWidth}
//       height={finalHeight}
//       style={{
//         objectFit: 'contain',
//         borderRadius: '6px',
//         border: '1px solid #ccc',
//         display: 'block',
//         margin: '0 auto'
//       }}
//     />
//   )
// }
