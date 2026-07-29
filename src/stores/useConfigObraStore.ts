import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ConfigObraState {
  // Datos de la obra actual
  idObraActual: string
  clienteActual: string
  observacionesActuales: string
  esEdicion: boolean

  // Acciones
  setDatosObra: (datos: {
    id: string
    cliente: string
    observaciones?: string
    esEdicion: boolean
  }) => void

  resetConfig: () => void
}

export const useConfigObraStore = create<ConfigObraState>()(
  persist(
    (set) => ({
      idObraActual: '',
      clienteActual: '',
      observacionesActuales: '',
      esEdicion: false,

      setDatosObra: (datos) =>
        set({
          idObraActual: datos.id,
          clienteActual: datos.cliente,
          observacionesActuales: datos.observaciones || '',
          esEdicion: datos.esEdicion,
        }),

      resetConfig: () =>
        set({
          idObraActual: '',
          clienteActual: '',
          observacionesActuales: '',
          esEdicion: false,
        }),
    }),
    {
      name: 'config-obra-lebaux', // Clave en localStorage
    },
  ),
)
