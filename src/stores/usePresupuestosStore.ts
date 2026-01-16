import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import IPresupuesto from '@/interfaces/IPresupuesto'

type PresupuestoState = {
  presupuestos: IPresupuesto[]
  // Acciones principales
  agregarPresupuesto: (presupuesto: IPresupuesto) => void
  actualizarPresupuesto: (id: string, data: Partial<IPresupuesto>) => void
  eliminarPresupuesto: (id: string) => void
  cambiarEstado: (
    id: string,
    nuevoEstado: 'pendiente' | 'aceptado' | 'rechazado',
  ) => void
  limpiarPresupuestos: () => void
}

const usePresupuestoStore = create<PresupuestoState>()(
  persist(
    (set) => ({
      presupuestos: [],

      // Agrega un presupuesto completo (ya instanciado con su clase)
      agregarPresupuesto: (presupuesto) =>
        set((state) => ({
          presupuestos: [...state.presupuestos, presupuesto],
        })),

      // Actualiza datos generales (cliente, observaciones, etc.)
      actualizarPresupuesto: (id, data) =>
        set((state) => ({
          presupuestos: state.presupuestos.map((p) =>
            p.id === id ? { ...p, ...data } : p,
          ),
        })),

      // Elimina por ID
      eliminarPresupuesto: (id) =>
        set((state) => ({
          presupuestos: state.presupuestos.filter((p) => p.id !== id),
        })),

      // Acción rápida para cambiar el estado (ej: de pendiente a aceptado)
      cambiarEstado: (id, nuevoEstado) =>
        set((state) => ({
          presupuestos: state.presupuestos.map((p) =>
            p.id === id ? { ...p, estado: nuevoEstado } : p,
          ),
        })),

      // Borra todo el historial de presupuestos
      limpiarPresupuestos: () => set({ presupuestos: [] }),
    }),
    {
      name: 'presupuestos-store', // Clave única en LocalStorage
    },
  ),
)

export default usePresupuestoStore
