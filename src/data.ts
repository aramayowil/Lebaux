interface Variante {
  tab: string
  descripcion: string
  img: string
}
interface Linea {
  id: string
  abertura: string
  prefijo: string
  variante: Variante[]
}

export const catalogo: Record<string, Linea[]> = {
  modena: [
    {
      id: 'pfijo',
      abertura: 'Paño Fijo',
      prefijo: 'PF',
      variante: [
        {
          tab: 'Paño Fijo',
          descripcion: 'Paño Fijo',
          img: './images/modena/PañoFijo.jpg',
        },
      ],
    },
    {
      id: 'corrediza',
      abertura: 'Corrediza',
      prefijo: 'VC',
      variante: [
        {
          tab: '2 Hojas',
          descripcion: 'Ventana corrediza 2 Hojas',
          img: './images/modena/Corrediza_2H.png',
        },
        {
          tab: '3 Hojas',
          descripcion: 'Ventana corrediza 3 Hojas',
          img: './images/modena/Corrediza_3H_3G.jpg',
        },
        {
          tab: '4 Hojas',
          descripcion: 'Ventana corrediza 4 Hojas',
          img: './images/modena/Corrediza_4H.jpg',
        },
      ],
    },

    {
      id: 'oscilobatiente',
      abertura: 'Oscilobatiente',
      prefijo: 'OB',
      variante: [
        {
          tab: 'OBAT 1H',
          descripcion: 'Oscilobatiente Modena',
          img: './images/modena/Oscilobatiente_1H.jpg',
        },
        {
          tab: 'OBAT 2H',
          descripcion: 'Oscilobatiente 2 Hojas Modena',
          img: './images/modena/Oscilobatiente_2H.jpg',
        },
      ],
    },

    {
      id: 'proyectante',
      abertura: 'Proyectante',
      prefijo: 'PROY',
      variante: [
        {
          tab: 'proyectante',
          descripcion: 'Proyectante Modena',
          img: './images/modena/Proyectante.jpg',
        },
      ],
    },
    {
      id: 'rebatible',
      abertura: 'Rebatible',
      prefijo: 'REB',
      variante: [
        {
          tab: 'Raja 1H',
          descripcion: 'Raja 1 Hoja Modena',
          img: './images/modena/Rebatible_1H.jpg',
        },
        {
          tab: 'Raja 2H',
          descripcion: 'Raja 2 Hojas Modena',
          img: './images/modena/Rebatible_2H.jpg',
        },
      ],
    },
    {
      id: 'puerta',
      abertura: 'Puerta',
      prefijo: 'PTA',
      variante: [
        {
          tab: 'Puerta 1H',
          descripcion: 'Puerta 1 Hoja Modena',
          img: './images/modena/Puerta_1H.jpg',
        },
        {
          tab: 'Puerta 2H',
          descripcion: 'Puerta 2 Hojas Modena',
          img: './images/modena/Puerta_2H.jpg',
        },
      ],
    },
    {
      id: 'banderola',
      abertura: 'Banderola',
      prefijo: 'BAND',
      variante: [
        {
          tab: 'Banderola',
          descripcion: 'Banderola Modena',
          img: './images/modena/Banderola.jpg',
        },
      ],
    },
    {
      id: 'desplazable',
      abertura: 'Desplazable',
      prefijo: 'BAND',
      variante: [
        {
          tab: 'Desplazable',
          descripcion: 'Desplazable Modena',
          img: './images/modena/Desplazable.jpg',
        },
      ],
    },
    {
      id: 'aberturaCompuesta',
      abertura: 'Abertura Compuesta',
      prefijo: 'AC',
      variante: [
        {
          tab: 'Abertura Compuesta',
          descripcion: 'Abertura Compuesta Modena',
          img: './images/img-prueba3.jpg',
        },
      ],
    },
  ],

  herrero: [
    {
      id: 'raja',
      abertura: 'Raja',
      prefijo: 'RAJ',
      variante: [
        {
          tab: 'Raja V-E',
          descripcion: 'Raja Vidrio Entero',
          img: './images/herrero/RajaVE.jpg',
        },
        {
          tab: 'Raja V-R',
          descripcion: 'Raja Vidrio Repartido',
          img: './images/herrero/RajaVR.jpg',
        },
      ],
    },
    {
      id: 'patagonica',
      abertura: 'Patagónica',
      prefijo: 'PAT',
      variante: [
        {
          tab: 'Patagónica 1H',
          descripcion: 'Patagónica Simple',
          img: './images/herrero/PatagonicaSimple.jpg',
        },
        {
          tab: 'Patagónica 2H',
          descripcion: 'Patagónica Doble',
          img: './images/herrero/PatagonicaDoble.jpg',
        },
      ],
    },
    {
      id: 'corrediza',
      abertura: 'Corrediza',
      prefijo: 'VC',
      variante: [
        {
          tab: 'Vidrio Entero 2H',
          descripcion: 'Ventana corrediza vidrio entero',
          img: './images/herrero/CorredizaVE.jpg',
        },
        {
          tab: 'Vidrio Repartido 2H',
          descripcion: 'Ventana corrediza vidrio repartido',
          img: './images/herrero/CorredizaVR.jpg',
        },
      ],
    },
    {
      id: 'ventiluz',
      abertura: 'Ventiluz',
      prefijo: 'VTL',
      variante: [
        {
          tab: 'Ventiluz',
          descripcion: 'Ventiluz',
          img: './images/herrero/Ventiluz.jpg',
        },
      ],
    },
    {
      id: 'sobremesada',
      abertura: 'Sobremesada',
      prefijo: 'SOB',
      variante: [
        {
          tab: 'Vidrio Entero',
          descripcion: 'Ventana Sobremesada vidrio entero',
          img: './images/herrero/Sobremesada.jpg',
        },
        {
          tab: 'Vidrio Repartido',
          descripcion: 'Ventana Sobremesada vidrio repartido',
          img: './images/herrero/Sobremesada.jpg',
        },
      ],
    },
    {
      id: 'puertaBalcon',
      abertura: 'Puerta Balcón',
      prefijo: 'PTB',
      variante: [
        {
          tab: 'Vidrio Entero',
          descripcion: 'Puerta balcón vidrio entero',
          img: './images/herrero/PuertaBalcon.jpg',
        },
        {
          tab: 'Vidrio Repartido',
          descripcion: 'Puerta balcón vidrio repartido',
          img: './images/herrero/PuertaBalconVR.jpg',
        },
        {
          tab: 'V-R-H',
          descripcion: 'Puerta balcón vidrio repartido horizontal',
          img: './images/herrero/PuertaBalconTravesano.jpg',
        },
      ],
    },
    {
      id: 'ventanaAbrir',
      abertura: 'Ventana de Abrir',
      prefijo: 'VA',
      variante: [
        {
          tab: 'Vidrio Entero',
          descripcion: 'Ventana de abrir vidrio entero',
          img: './images/herrero/RajaVE.jpg',
        },
        {
          tab: 'Vidrio Repartido',
          descripcion: 'Ventana de abrir vidrio repartido',
          img: './images/herrero/RajaVR.jpg',
        },
      ],
    },
    {
      id: 'celosiaAbrir',
      abertura: 'Celosía de Abrir',
      prefijo: 'CA',
      variante: [
        {
          tab: 'Celosía de Abrir',
          descripcion: 'Celosía de abrir',
          img: './images/herrero/CelociaDeAbrir.jpg',
        },
      ],
    },
    {
      id: 'celosiaCorrediza',
      abertura: 'Celosía Corrediza',
      prefijo: 'CC',
      variante: [
        {
          tab: 'Celosía Corrediza',
          descripcion: 'Celosía corrediza',
          img: './images/herrero/CelociaCorrediza.jpg',
        },
      ],
    },
    {
      id: 'puerta',
      abertura: 'Puerta',
      prefijo: 'PTA',
      variante: [
        {
          tab: 'Ciega',
          descripcion: 'Puerta ciega 1 hoja',
          img: './images/herrero/PuertaCiega.jpg',
        },
        {
          tab: 'Vidrio Entero',
          descripcion: 'Puerta vidrio entero 1 hoja',
          img: './images/herrero/PuertaVE.jpg',
        },
        {
          tab: 'Vidrio Repartido',
          descripcion: 'Puerta vidrio repartido 1 hojas',
          img: './images/herrero/PuertaVR.jpg',
        },
      ],
    },
    {
      id: 'puerta1/2',
      abertura: 'Puerta 1/2',
      prefijo: 'PTA1/2',
      variante: [
        {
          tab: 'Vidrio Entero',
          descripcion: 'Puerta 1/2 vidrio entero',
          img: './images/herrero/Puerta1-2VE.jpg',
        },
        {
          tab: 'Vidrio Repartido',
          descripcion: 'Puerta 1/2 vidrio repartido',
          img: './images/herrero/Puerta1-2VR.jpg',
        },
      ],
    },
    {
      id: 'puerta3/4',
      abertura: 'Puerta 3/4',
      prefijo: 'PTA3/4',
      variante: [
        {
          tab: 'Vidrio Entero',
          descripcion: 'Puerta 3/4 vidrio entero',
          img: './images/herrero/Puerta3-4VE.jpg',
        },
        {
          tab: 'Vidrio Repartido',
          descripcion: 'Puerta 3/4 vidrio repartido',
          img: './images/herrero/Puerta3-4VR.jpg',
        },
      ],
    },
    {
      id: 'puertaPostigon',
      abertura: 'Puerta C/Postigón',
      prefijo: 'PTA-P',
      variante: [
        {
          tab: 'Vidrio Entero',
          descripcion: 'Puerta con postigón vidrio entero',
          img: './images/herrero/PuertaPostigon1H.jpg',
        },
      ],
    },
    {
      id: 'puerta2hojas',
      abertura: 'Puerta 2 Hojas',
      prefijo: 'PTA2H',
      variante: [
        {
          tab: 'Ciega',
          descripcion: 'Puerta Ciega 2 hojas',
          img: './images/herrero/PuertaCiega2H.jpg',
        },
        {
          tab: 'Lamidado lateral',
          descripcion: 'Puerta 2 hojas c/vidrio lamidado lateral',
          img: './images/herrero/PuertaVidrioLateral2H.jpg',
        },
      ],
    },
    {
      id: 'puertaInyectada',
      abertura: 'Puerta Inyectada',
      prefijo: 'PTA-INJ',
      variante: [
        {
          tab: 'Puerta Inyectada',
          descripcion: 'Puerta Inyectada',
          img: './images/img-prueba3.jpg', // Placeholder image, replace with actual image path
        },
      ],
    },
    {
      id: 'puerta1/4',
      abertura: 'Puerta 1/4',
      prefijo: 'PTA1/4',
      variante: [
        {
          tab: 'Vidrio Entero',
          descripcion: 'Puerta 1/4 vidrio entero',
          img: './images/herrero/Puerta1-4VE.jpg',
        },
        {
          tab: 'Vidrio Repartido',
          descripcion: 'Puerta 1/4 vidrio repartido',
          img: './images/herrero/Puerta1-4VR.jpg',
        },
      ],
    },
    {
      id: 'puertaBathroom',
      abertura: 'Puerta de Baño',
      prefijo: 'PTA-BATH',
      variante: [
        {
          tab: 'Puerta de Baño',
          descripcion: 'Puerta de Baño',
          img: './images/img-prueba3.jpg', // Placeholder image, replace with actual image path
        },
      ],
    },
    {
      id: 'banderola',
      abertura: 'Banderola',
      prefijo: 'BAND',
      variante: [
        {
          tab: 'Banderola',
          descripcion: 'Banderola C/Brazo de empuje',
          img: './images/herrero/Banderola.jpg',
        },
      ],
    },
    {
      id: 'pfijo',
      abertura: 'Paño Fijo',
      prefijo: 'PF',
      variante: [
        {
          tab: 'Paño Fijo',
          descripcion: 'Paño Fijo',
          img: './images/herrero/PañoFijo.jpg',
        },
      ],
    },
    {
      id: 'aberturaCompuesta',
      abertura: 'Abertura Compuesta',
      prefijo: 'AC',
      variante: [
        {
          tab: 'Abertura Compuesta',
          descripcion: 'Abertura Compuesta',
          img: './images/img-prueba3.jpg', // Placeholder image, replace with actual image path
        },
      ],
    },
  ],
}
