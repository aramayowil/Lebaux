interface Variante {
  variantKey: number
  tab: string
  descripcion: string
  img: string
}
interface Linea {
  id: string
  abertura: string
  prefijo: string
  variantes: Variante[]
}

export const catalogo: Record<string, Linea[]> = {
  modena: [
    {
      id: 'pfijo',
      abertura: 'Paño Fijo',
      prefijo: 'PF',
      variantes: [
        {
          variantKey: 0,
          tab: 'Paño Fijo',
          descripcion: 'Paño Fijo',
          img: './images/catalogo_presupuesto/modena/PañoFijo.jpg',
        },
      ],
    },
    {
      id: 'corrediza',
      abertura: 'Corrediza',
      prefijo: 'VC',
      variantes: [
        {
          variantKey: 0,
          tab: '2 Hojas',
          descripcion: 'Ventana corrediza 2 Hojas',
          img: './images/catalogo_presupuesto/modena/Corrediza_2H.jpg',
        },
        {
          variantKey: 1,
          tab: '3 Hojas',
          descripcion: 'Ventana corrediza 3 Hojas',
          img: './images/catalogo_presupuesto/modena/Corrediza_3H_3G.jpg',
        },
        {
          variantKey: 2,
          tab: '4 Hojas',
          descripcion: 'Ventana corrediza 4 Hojas',
          img: './images/catalogo_presupuesto/modena/Corrediza_4H.jpg',
        },
        {
          variantKey: 3,
          tab: '6 Hojas',
          descripcion: 'Ventana corrediza 6 Hojas',
          img: './images/catalogo_presupuesto/modena/Corrediza_6H_3G.jpg',
        },
      ],
    },

    {
      id: 'oscilobatiente',
      abertura: 'Oscilobatiente',
      prefijo: 'OB',
      variantes: [
        {
          variantKey: 0,
          tab: 'OBAT 1H',
          descripcion: 'Oscilobatiente',
          img: './images/catalogo_presupuesto/modena/Oscilobatiente_1H.jpg',
        },
        {
          variantKey: 1,
          tab: 'OBAT 2H',
          descripcion: 'Oscilobatiente 2 Hojas',
          img: './images/catalogo_presupuesto/modena/Oscilobatiente_2H.jpg',
        },
      ],
    },
    {
      id: 'patagonica',
      abertura: 'Patagónica',
      prefijo: 'PAT',
      variantes: [
        {
          variantKey: 0,
          tab: 'Patagónica 1H',
          descripcion: 'Patagónica Simple',
          img: './images/catalogo_presupuesto/herrero/PatagonicaSimple.jpg',
        },
        {
          variantKey: 1,
          tab: 'Patagónica 2H',
          descripcion: 'Patagónica Doble',
          img: './images/catalogo_presupuesto/herrero/PatagonicaDoble.jpg',
        },
      ],
    },

    {
      id: 'proyectante',
      abertura: 'Proyectante',
      prefijo: 'PROY',
      variantes: [
        {
          variantKey: 0,
          tab: 'Proyectante',
          descripcion: 'Proyectante',
          img: './images/catalogo_presupuesto/modena/Proyectante.jpg',
        },
      ],
    },
    {
      id: 'rebatible',
      abertura: 'Rebatible',
      prefijo: 'REB',
      variantes: [
        {
          variantKey: 0,
          tab: 'Raja 1H',
          descripcion: 'Raja 1 Hoja',
          img: './images/catalogo_presupuesto/modena/Rebatible_1H.jpg',
        },
        {
          variantKey: 1,
          tab: 'Raja 2H',
          descripcion: 'Raja 2 Hojas',
          img: './images/catalogo_presupuesto/modena/Rebatible_2H.jpg',
        },
      ],
    },
    {
      id: 'puerta_1H',
      abertura: 'Puerta',
      prefijo: 'PTA',
      variantes: [
        {
          variantKey: 0,
          tab: 'Vidrio Entero',
          descripcion: 'Puerta 1 hoja',
          img: './images/catalogo_presupuesto/PUERTAS/1_HOJA/PUERTA_1H_VE.jpg',
        },
        {
          variantKey: 1,
          tab: 'C/Traves Medio',
          descripcion: 'Puerta 1 hoja C/Travesaño',
          img: './images/catalogo_presupuesto/PUERTAS/1_HOJA/PUERTA_1H_C-TRAVES.jpg',
        },
        {
          variantKey: 2,
          tab: 'Ciega',
          descripcion: 'Puerta 1 hoja ciega',
          img: './images/catalogo_presupuesto/PUERTAS/1_HOJA/PUERTA_1H_CIEGA.jpg',
        },
      ],
    },
    {
      id: 'puerta_1H_3/4',
      abertura: 'Puerta 3/4',
      prefijo: 'PTA',
      variantes: [
        {
          variantKey: 0,
          tab: 'Vidrio Entero',
          descripcion: 'Puerta 3/4 vidrio entero',
          img: './images/catalogo_presupuesto/PUERTAS/1_HOJA/PUERTA_1H_3-4_VE.jpg',
        },
      ],
    },
    {
      id: 'puerta_1H_POSTIGON',
      abertura: 'Puerta C/Postigón',
      prefijo: 'PTA',
      variantes: [
        {
          variantKey: 0,
          tab: 'C/Travesaño 1/2',
          descripcion: 'Puerta 1 hoja C/Travesaño al medio & postigón',
          img: './images/catalogo_presupuesto/PUERTAS/1_HOJA/PUERTA_1H_1-2_C-POSTIGON.jpg',
        },
        {
          variantKey: 1,
          tab: 'C/Revestimiento 1/2',
          descripcion: 'Puerta 1 hoja C/Revestimiento & postigón',
          img: './images/catalogo_presupuesto/PUERTAS/1_HOJA/PUERTA_1H_1-2_C-TRAVESYPOSTIGON.jpg',
        },
        {
          variantKey: 2,
          tab: 'Ciega C/Postigon',
          descripcion: 'Puerta 1 hoja C/Revestimiento & postigón',
          img: './images/catalogo_presupuesto/PUERTAS/1_HOJA/PUERTA_1H_1-2_CIEGAYPOSTIGON.jpg',
        },
      ],
    },
    {
      id: 'puerta_2H',
      abertura: 'Puerta 2H',
      prefijo: 'PTA',
      variantes: [
        {
          variantKey: 0,
          tab: 'Vidrio Entero',
          descripcion: 'Puerta 2 hojas',
          img: './images/catalogo_presupuesto/PUERTAS/2_HOJAS/PUERTA_2H_VE.jpg',
        },
        {
          variantKey: 1,
          tab: 'C/Traves Medio',
          descripcion: 'Puerta 2 hojas C/Travesaño',
          img: './images/catalogo_presupuesto/PUERTAS/2_HOJAS/PUERTA_2H_C-TRAVES.jpg',
        },
      ],
    },
    {
      id: 'puerta_2H_3/4',
      abertura: 'Puerta 2H 3/4',
      prefijo: 'PTA',
      variantes: [
        {
          variantKey: 0,
          tab: 'Vidrio Entero',
          descripcion: 'Puerta 2 hojas vidrio entero',
          img: './images/catalogo_presupuesto/PUERTAS/2_HOJAS/puerta_2H_3-4_VE.jpg',
        },
      ],
    },
    {
      id: 'puerta_2H_postigon',
      abertura: 'Puerta 2H Postigón',
      prefijo: 'PTA',
      variantes: [
        {
          variantKey: 0,
          tab: 'C/Travesaño 1/2',
          descripcion: 'Puerta 2 hojas C/Travesaño al medio & postigón',
          img: './images/catalogo_presupuesto/PUERTAS/2_HOJAS/puerta_2H_C-TRAVES.jpg',
        },
        {
          variantKey: 1,
          tab: 'C/Revestimiento 1/2',
          descripcion: 'Puerta 2 hojas C/Revestimiento & postigón',
          img: './images/catalogo_presupuesto/PUERTAS/2_HOJAS/puerta_2H_C-TRAVES_POSTIGON.jpg',
        },
      ],
    },
    {
      id: 'banderola',
      abertura: 'Banderola',
      prefijo: 'BAND',
      variantes: [
        {
          variantKey: 0,
          tab: 'Banderola',
          descripcion: 'Banderola',
          img: './images/catalogo_presupuesto/modena/Banderola.jpg',
        },
      ],
    },
    {
      id: 'desplazable',
      abertura: 'Desplazable',
      prefijo: 'BAND',
      variantes: [
        {
          variantKey: 0,
          tab: 'Desplazable',
          descripcion: 'Desplazable',
          img: './images/catalogo_presupuesto/modena/Desplazable.jpg',
        },
      ],
    },
    {
      id: 'aberturaCompuesta',
      abertura: 'Abertura Compuesta',
      prefijo: 'AC',
      variantes: [
        {
          variantKey: 0,
          tab: 'Abertura Compuesta',
          descripcion: 'Abertura Compuesta',
          img: './images/catalogo_presupuesto/img_not_found.jpg',
        },
      ],
    },
  ],

  herrero: [
    {
      id: 'pfijo',
      abertura: 'Paño Fijo',
      prefijo: 'PF',
      variantes: [
        {
          variantKey: 0,
          tab: 'Paño Fijo',
          descripcion: 'Paño Fijo',
          img: './images/catalogo_presupuesto/herrero/PañoFijo.jpg',
        },
      ],
    },
    {
      id: 'banderola',
      abertura: 'Banderola',
      prefijo: 'BAND',
      variantes: [
        {
          variantKey: 0,
          tab: 'Banderola',
          descripcion: 'Banderola C/Brazo de empuje',
          img: './images/catalogo_presupuesto/herrero/Banderola.jpg',
        },
      ],
    },
    {
      id: 'raja',
      abertura: 'Raja',
      prefijo: 'RAJ',
      variantes: [
        {
          variantKey: 0,
          tab: 'Raja V-E',
          descripcion: 'Raja Vidrio Entero',
          img: './images/catalogo_presupuesto/herrero/RajaVE.jpg',
        },
        {
          variantKey: 1,
          tab: 'Raja V-R',
          descripcion: 'Raja Vidrio Repartido',
          img: './images/catalogo_presupuesto/herrero/RajaVR.jpg',
        },
      ],
    },
    {
      id: 'patagonica',
      abertura: 'Patagónica',
      prefijo: 'PAT',
      variantes: [
        {
          variantKey: 0,
          tab: 'Patagónica 1H',
          descripcion: 'Patagónica Simple',
          img: './images/catalogo_presupuesto/herrero/PatagonicaSimple.jpg',
        },
        {
          variantKey: 1,
          tab: 'Patagónica 2H',
          descripcion: 'Patagónica Doble',
          img: './images/catalogo_presupuesto/herrero/PatagonicaDoble.jpg',
        },
      ],
    },
    {
      id: 'corrediza',
      abertura: 'Corrediza',
      prefijo: 'VC',
      variantes: [
        {
          variantKey: 0,
          tab: 'Vidrio Entero 2H',
          descripcion: 'Ventana corrediza vidrio entero',
          img: './images/catalogo_presupuesto/herrero/CorredizaVE.jpg',
        },
        {
          variantKey: 1,
          tab: 'Vidrio Repartido 2H',
          descripcion: 'Ventana corrediza vidrio repartido',
          img: './images/catalogo_presupuesto/herrero/CorredizaVR.jpg',
        },
      ],
    },
    {
      id: 'ventiluz',
      abertura: 'Ventiluz',
      prefijo: 'VTL',
      variantes: [
        {
          variantKey: 0,
          tab: 'Ventiluz',
          descripcion: 'Ventiluz',
          img: './images/catalogo_presupuesto/herrero/Ventiluz.jpg',
        },
      ],
    },
    {
      id: 'sobremesada',
      abertura: 'Sobremesada',
      prefijo: 'SOB',
      variantes: [
        {
          variantKey: 0,
          tab: 'Vidrio Entero',
          descripcion: 'Ventana Sobremesada vidrio entero',
          img: './images/catalogo_presupuesto/herrero/Sobremesada.jpg',
        },
        {
          variantKey: 1,
          tab: 'Vidrio Repartido',
          descripcion: 'Ventana Sobremesada vidrio repartido',
          img: './images/catalogo_presupuesto/herrero/Sobremesada.jpg',
        },
      ],
    },
    {
      id: 'puertaBalcon',
      abertura: 'Puerta Balcón',
      prefijo: 'PTB',
      variantes: [
        {
          variantKey: 0,
          tab: 'Vidrio Entero',
          descripcion: 'Puerta balcón vidrio entero',
          img: './images/catalogo_presupuesto/herrero/PuertaBalcon.jpg',
        },
        {
          variantKey: 1,
          tab: 'Vidrio Repartido',
          descripcion: 'Puerta balcón vidrio repartido',
          img: './images/catalogo_presupuesto/herrero/PuertaBalconVR.jpg',
        },
        {
          variantKey: 2,
          tab: 'V-R-H',
          descripcion: 'Puerta balcón vidrio repartido horizontal',
          img: './images/catalogo_presupuesto/herrero/PuertaBalconTravesano.jpg',
        },
      ],
    },
    {
      id: 'ventanaAbrir',
      abertura: 'Ventana de Abrir',
      prefijo: 'VA',
      variantes: [
        {
          variantKey: 0,
          tab: 'Vidrio Entero',
          descripcion: 'Ventana de abrir vidrio entero',
          img: './images/catalogo_presupuesto/herrero/RajaVE.jpg',
        },
        {
          variantKey: 1,
          tab: 'Vidrio Repartido',
          descripcion: 'Ventana de abrir vidrio repartido',
          img: './images/catalogo_presupuesto/herrero/RajaVR.jpg',
        },
      ],
    },
    {
      id: 'celosiaAbrir',
      abertura: 'Celosía de Abrir',
      prefijo: 'CA',
      variantes: [
        {
          variantKey: 0,
          tab: 'Celosía de Abrir',
          descripcion: 'Celosía de abrir',
          img: './images/catalogo_presupuesto/herrero/CelociaDeAbrir.jpg',
        },
      ],
    },
    {
      id: 'celosiaCorrediza',
      abertura: 'Celosía Corrediza',
      prefijo: 'CC',
      variantes: [
        {
          variantKey: 0,
          tab: 'Celosía Corrediza',
          descripcion: 'Celosía corrediza',
          img: './images/catalogo_presupuesto/herrero/CelociaCorrediza.jpg',
        },
      ],
    },
    {
      id: 'puerta',
      abertura: 'Puerta',
      prefijo: 'PTA',
      variantes: [
        {
          variantKey: 0,
          tab: 'Vidrio Entero',
          descripcion: 'Puerta vidrio entero 1 hoja',
          img: './images/catalogo_presupuesto/PUERTAS/1_HOJA/PUERTA_1H_VE.jpg',
        },
        {
          variantKey: 1,
          tab: 'Vidrio Repartido',
          descripcion: 'Puerta vidrio repartido 1 hojas',
          img: './images/catalogo_presupuesto/PUERTAS/1_HOJA/PUERTA_1H_VR.jpg',
        },
        {
          variantKey: 2,
          tab: 'Ciega',
          descripcion: 'Puerta ciega 1 hoja',
          img: './images/catalogo_presupuesto/PUERTAS/1_HOJA/PUERTA_1H_CIEGA.jpg',
        },
      ],
    },
    {
      id: 'puerta1/2',
      abertura: 'Puerta 1/2',
      prefijo: 'PTA',
      variantes: [
        {
          variantKey: 0,
          tab: 'Vidrio Entero',
          descripcion: 'Puerta 1/2 vidrio entero',
          img: './images/catalogo_presupuesto/PUERTAS/1_HOJA/PUERTA_1H_1-2_VE.jpg',
        },
        {
          variantKey: 1,
          tab: 'Vidrio Repartido',
          descripcion: 'Puerta 1/2 vidrio repartido',
          img: './images/catalogo_presupuesto/PUERTAS/1_HOJA/PUERTA_1H_1-2_VR.jpg',
        },
        {
          variantKey: 2,
          tab: 'C/Traves Medio',
          descripcion: 'Puerta 1 hoja C/Travesaño',
          img: './images/catalogo_presupuesto/PUERTAS/1_HOJA/PUERTA_1H_C-TRAVES.jpg',
        },
      ],
    },
    {
      id: 'puerta1/4',
      abertura: 'Puerta 1/4',
      prefijo: 'PTA',
      variantes: [
        {
          variantKey: 0,
          tab: 'Vidrio Entero',
          descripcion: 'Puerta 1/4 vidrio entero',
          img: './images/catalogo_presupuesto/PUERTAS/1_HOJA/PUERTA_1H_1-4_VE.jpg',
        },
        {
          variantKey: 1,
          tab: 'Vidrio Repartido',
          descripcion: 'Puerta 1/4 vidrio repartido',
          img: './images/catalogo_presupuesto/PUERTAS/1_HOJA/PUERTA_1H_1-4_VR.jpg',
        },
      ],
    },
    {
      id: 'puerta3/4',
      abertura: 'Puerta 3/4',
      prefijo: 'PTA',
      variantes: [
        {
          variantKey: 0,
          tab: 'Vidrio Entero',
          descripcion: 'Puerta 3/4 vidrio entero',
          img: './images/catalogo_presupuesto/PUERTAS/1_HOJA/PUERTA_1H_3-4_VE.jpg',
        },
        {
          variantKey: 1,
          tab: 'Vidrio Repartido',
          descripcion: 'Puerta 3/4 vidrio repartido',
          img: './images/catalogo_presupuesto/PUERTAS/1_HOJA/PUERTA_1H_3-4_VR.jpg',
        },
      ],
    },
    {
      id: 'puerta_1/2_postigon',
      abertura: 'Puerta C/Postigón',
      prefijo: 'PTA',
      variantes: [
        {
          variantKey: 0,
          tab: 'C/Travesaño 1/2',
          descripcion: 'Puerta 1 hoja C/Travesaño al medio & postigón',
          img: './images/catalogo_presupuesto/PUERTAS/1_HOJA/PUERTA_1H_1-2_C-TRAVESYPOSTIGON.jpg',
        },
        {
          variantKey: 1,
          tab: 'C/Revestimiento 1/2',
          descripcion: 'Puerta 1 hoja C/Revestimiento & postigón',
          img: './images/catalogo_presupuesto/PUERTAS/1_HOJA/PUERTA_1H_1-2_C-TRAVESYPOSTIGON.jpg',
        },
        {
          variantKey: 2,
          tab: 'Ciega C/Postigon',
          descripcion: 'Puerta 1 hoja C/Revestimiento & postigón',
          img: './images/catalogo_presupuesto/PUERTAS/1_HOJA/PUERTA_1H_1-2_CIEGAYPOSTIGON.jpg',
        },
      ],
    },
    {
      id: 'puerta_2H',
      abertura: 'Puerta 2H',
      prefijo: 'PTA',
      variantes: [
        {
          variantKey: 0,
          tab: 'V.E.',
          descripcion: 'Puerta 2 hojas',
          img: './images/catalogo_presupuesto/PUERTAS/2_HOJAS/PUERTA_2H_VE.jpg',
        },
        {
          variantKey: 1,
          tab: 'V.R.',
          descripcion: 'Puerta 2 hojas',
          img: './images/catalogo_presupuesto/PUERTAS/2_HOJAS/PUERTA_2H_VR.jpg',
        },
        {
          variantKey: 2,
          tab: 'C/Traves Medio',
          descripcion: 'Puerta 2 hojas C/Travesaño',
          img: './images/catalogo_presupuesto/PUERTAS/2_HOJAS/PUERTA_2H_C-TRAVES.jpg',
        },
        {
          variantKey: 3,
          tab: 'Ciega',
          descripcion: 'Puerta Ciega 2 hojas',
          img: './images/catalogo_presupuesto/herrero/PuertaCiega2H.jpg',
        },
      ],
    },
    {
      id: 'puerta_2H_1/4',
      abertura: 'Puerta 2H 1/4',
      prefijo: 'PTA',
      variantes: [
        {
          variantKey: 0,
          tab: 'Vidrio Entero',
          descripcion: 'Puerta 2 hojas vidrio entero',
          img: './images/catalogo_presupuesto/PUERTAS/2_HOJAS/puerta_2H_1-4_VE.jpg',
        },
        {
          variantKey: 1,
          tab: 'Vidrio Repartido',
          descripcion: 'Puerta 2 hojas vidrio repartido',
          img: './images/catalogo_presupuesto/PUERTAS/2_HOJAS/puerta_2H_1-4_VR.jpg',
        },
      ],
    },
    {
      id: 'puerta_2H_1/2',
      abertura: 'Puerta 2H 1/2',
      prefijo: 'PTA',
      variantes: [
        {
          variantKey: 0,
          tab: 'Vidrio Entero',
          descripcion: 'Puerta 2 hojas vidrio entero',
          img: './images/catalogo_presupuesto/PUERTAS/2_HOJAS/puerta_2H_1-2_VE.jpg',
        },
        {
          variantKey: 1,
          tab: 'Vidrio Repartido',
          descripcion: 'Puerta 2 hojas vidrio repartido',
          img: './images/catalogo_presupuesto/PUERTAS/2_HOJAS/puerta_2H_1-2_VR.jpg',
        },
      ],
    },
    {
      id: 'puerta_2H_3/4',
      abertura: 'Puerta 2H 3/4',
      prefijo: 'PTA',
      variantes: [
        {
          variantKey: 0,
          tab: 'Vidrio Entero',
          descripcion: 'Puerta 2 hojas vidrio entero',
          img: './images/catalogo_presupuesto/PUERTAS/2_HOJAS/puerta_2H_3-4_VE.jpg',
        },
        {
          variantKey: 1,
          tab: 'Vidrio Repartido',
          descripcion: 'Puerta 2 hojas vidrio repartido',
          img: './images/catalogo_presupuesto/PUERTAS/2_HOJAS/puerta_2H_3-4_VR.jpg',
        },
      ],
    },
    {
      id: 'puerta_2H_postigon',
      abertura: 'Puerta 2H C/Postigón',
      prefijo: 'PTA',
      variantes: [
        {
          variantKey: 0,
          tab: 'C/Travesaño 1/2',
          descripcion: 'Puerta 2 hojas C/Travesaño al medio & postigón',
          img: './images/catalogo_presupuesto/PUERTAS/2_HOJAS/puerta_2H_C-TRAVES_POSTIGON.jpg',
        },
        {
          variantKey: 1,
          tab: 'C/Revestimiento 1/2',
          descripcion: 'Puerta 2 hojas C/Revestimiento & postigón',
          img: './images/catalogo_presupuesto/PUERTAS/2_HOJAS/puerta_2H_1-2_POSTIGON.jpg',
        },
      ],
    },
    {
      id: 'aberturaCompuesta',
      abertura: 'Abertura Compuesta',
      prefijo: 'AC',
      variantes: [
        {
          variantKey: 0,
          tab: 'Abertura Compuesta',
          descripcion: 'Abertura Compuesta',
          img: './images/catalogo_presupuesto/img_not_found.jpg', // Placeholder image, replace with actual image path
        },
      ],
    },
  ],

  a30: [
    {
      id: 'pfijo',
      abertura: 'Paño Fijo',
      prefijo: 'PF',
      variantes: [
        {
          variantKey: 0,
          tab: 'Paño Fijo',
          descripcion: 'Paño Fijo',
          img: './images/catalogo_presupuesto/modena/PañoFijo.jpg',
        },
      ],
    },
    {
      id: 'corrediza',
      abertura: 'Corrediza',
      prefijo: 'VC',
      variantes: [
        {
          variantKey: 0,
          tab: '2 Hojas',
          descripcion: 'Ventana corrediza 2 Hojas',
          img: './images/catalogo_presupuesto/modena/Corrediza_2H.jpg',
        },
        {
          variantKey: 1,
          tab: '3 Hojas',
          descripcion: 'Ventana corrediza 3 Hojas',
          img: './images/catalogo_presupuesto/modena/Corrediza_3H_3G.jpg',
        },
        {
          variantKey: 2,
          tab: '4 Hojas',
          descripcion: 'Ventana corrediza 4 Hojas',
          img: './images/catalogo_presupuesto/modena/Corrediza_4H.jpg',
        },
        {
          variantKey: 3,
          tab: '6 Hojas',
          descripcion: 'Ventana corrediza 6 Hojas',
          img: './images/catalogo_presupuesto/modena/Corrediza_6H_3G.jpg',
        },
      ],
    },

    {
      id: 'oscilobatiente',
      abertura: 'Oscilobatiente',
      prefijo: 'OB',
      variantes: [
        {
          variantKey: 0,
          tab: 'OBAT 1H',
          descripcion: 'Oscilobatiente',
          img: './images/catalogo_presupuesto/modena/Oscilobatiente_1H.jpg',
        },
        {
          variantKey: 1,
          tab: 'OBAT 2H',
          descripcion: 'Oscilobatiente 2 Hojas',
          img: './images/catalogo_presupuesto/modena/Oscilobatiente_2H.jpg',
        },
      ],
    },
    {
      id: 'patagonica',
      abertura: 'Patagónica',
      prefijo: 'PAT',
      variantes: [
        {
          variantKey: 0,
          tab: 'Patagónica 1H',
          descripcion: 'Patagónica Simple',
          img: './images/catalogo_presupuesto/herrero/PatagonicaSimple.jpg',
        },
        {
          variantKey: 1,
          tab: 'Patagónica 2H',
          descripcion: 'Patagónica Doble',
          img: './images/catalogo_presupuesto/herrero/PatagonicaDoble.jpg',
        },
      ],
    },

    {
      id: 'proyectante',
      abertura: 'Proyectante',
      prefijo: 'PROY',
      variantes: [
        {
          variantKey: 0,
          tab: 'proyectante',
          descripcion: 'Proyectante',
          img: './images/catalogo_presupuesto/modena/Proyectante.jpg',
        },
      ],
    },
    {
      id: 'rebatible',
      abertura: 'Rebatible',
      prefijo: 'REB',
      variantes: [
        {
          variantKey: 0,
          tab: 'Raja 1H',
          descripcion: 'Raja 1 Hoja',
          img: './images/catalogo_presupuesto/modena/Rebatible_1H.jpg',
        },
        {
          variantKey: 1,
          tab: 'Raja 2H',
          descripcion: 'Raja 2 Hojas',
          img: './images/catalogo_presupuesto/modena/Rebatible_2H.jpg',
        },
      ],
    },
    {
      id: 'puerta_1H',
      abertura: 'Puerta',
      prefijo: 'PTA',
      variantes: [
        {
          variantKey: 0,
          tab: 'Vidrio Entero',
          descripcion: 'Puerta 1 hoja',
          img: './images/catalogo_presupuesto/PUERTAS/1_HOJA/PUERTA_1H_VE.jpg',
        },
        {
          variantKey: 1,
          tab: 'C/Traves Medio',
          descripcion: 'Puerta 1 hoja C/Travesaño',
          img: './images/catalogo_presupuesto/PUERTAS/1_HOJA/PUERTA_1H_C-TRAVES.jpg',
        },
        {
          variantKey: 2,
          tab: 'Ciega',
          descripcion: 'Puerta 1 hoja ciega',
          img: './images/catalogo_presupuesto/PUERTAS/1_HOJA/PUERTA_1H_CIEGA.jpg',
        },
      ],
    },
    {
      id: 'puerta_1H_3/4',
      abertura: 'Puerta 3/4',
      prefijo: 'PTA',
      variantes: [
        {
          variantKey: 0,
          tab: 'Vidrio Entero',
          descripcion: 'Puerta 3/4 vidrio entero',
          img: './images/catalogo_presupuesto/PUERTAS/1_HOJA/PUERTA_1H_3-4_VE.jpg',
        },
      ],
    },
    {
      id: 'puerta_1H_POSTIGON',
      abertura: 'Puerta C/Postigón',
      prefijo: 'PTA',
      variantes: [
        {
          variantKey: 0,
          tab: 'C/Travesaño 1/2',
          descripcion: 'Puerta 1 hoja C/Travesaño al medio & postigón',
          img: './images/catalogo_presupuesto/PUERTAS/1_HOJA/PUERTA_1H_1-2_C-POSTIGON.jpg',
        },
        {
          variantKey: 1,
          tab: 'C/Revestimiento 1/2',
          descripcion: 'Puerta 1 hoja C/Revestimiento & postigón',
          img: './images/catalogo_presupuesto/PUERTAS/1_HOJA/PUERTA_1H_1-2_C-TRAVESYPOSTIGON.jpg',
        },
        {
          variantKey: 2,
          tab: 'Ciega C/Postigon',
          descripcion: 'Puerta 1 hoja C/Revestimiento & postigón',
          img: './images/catalogo_presupuesto/PUERTAS/1_HOJA/PUERTA_1H_1-2_CIEGAYPOSTIGON.jpg',
        },
      ],
    },
    {
      id: 'puerta_2H',
      abertura: 'Puerta 2H',
      prefijo: 'PTA',
      variantes: [
        {
          variantKey: 0,
          tab: 'Vidrio Entero',
          descripcion: 'Puerta 2 hojas',
          img: './images/catalogo_presupuesto/PUERTAS/2_HOJAS/PUERTA_2H_VE.jpg',
        },
        {
          variantKey: 1,
          tab: 'C/Traves Medio',
          descripcion: 'Puerta 2 hojas C/Travesaño',
          img: './images/catalogo_presupuesto/PUERTAS/2_HOJAS/PUERTA_2H_C-TRAVES.jpg',
        },
      ],
    },
    {
      id: 'puerta_2H_3/4',
      abertura: 'Puerta 2H 3/4',
      prefijo: 'PTA',
      variantes: [
        {
          variantKey: 0,
          tab: 'Vidrio Entero',
          descripcion: 'Puerta 2 hojas vidrio entero',
          img: './images/catalogo_presupuesto/PUERTAS/2_HOJAS/puerta_2H_3-4_VE.jpg',
        },
      ],
    },
    {
      id: 'puerta_2H_postigon',
      abertura: 'Puerta 2H Postigón',
      prefijo: 'PTA',
      variantes: [
        {
          variantKey: 0,
          tab: 'C/Travesaño 1/2',
          descripcion: 'Puerta 2 hojas C/Travesaño al medio & postigón',
          img: './images/catalogo_presupuesto/PUERTAS/2_HOJAS/puerta_2H_C-TRAVES_POSTIGON.jpg',
        },
        {
          variantKey: 1,
          tab: 'C/Revestimiento 1/2',
          descripcion: 'Puerta 2 hojas C/Revestimiento & postigón',
          img: './images/catalogo_presupuesto/PUERTAS/2_HOJAS/puerta_2H_1-2_POSTIGON.jpg',
        },
      ],
    },
    {
      id: 'banderola',
      abertura: 'Banderola',
      prefijo: 'BAND',
      variantes: [
        {
          variantKey: 0,
          tab: 'Banderola',
          descripcion: 'Banderola',
          img: './images/catalogo_presupuesto/modena/Banderola.jpg',
        },
      ],
    },
    {
      id: 'desplazable',
      abertura: 'Desplazable',
      prefijo: 'BAND',
      variantes: [
        {
          variantKey: 0,
          tab: 'Desplazable',
          descripcion: 'Desplazable',
          img: './images/catalogo_presupuesto/modena/Desplazable.jpg',
        },
      ],
    },
    {
      id: 'aberturaCompuesta',
      abertura: 'Abertura Compuesta',
      prefijo: 'AC',
      variantes: [
        {
          variantKey: 0,
          tab: 'Abertura Compuesta',
          descripcion: 'Abertura Compuesta',
          img: './images/catalogo_presupuesto/img_not_found.jpg',
        },
      ],
    },
  ],
}
