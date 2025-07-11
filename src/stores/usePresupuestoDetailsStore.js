import { create } from 'zustand';
import { persist } from 'zustand/middleware';


const usePresupuestoDetails = create(
  persist(
    (set) => ({
      Details: {
        recargo: 0,
        descuento: 0,
        saldoPendiente: 0,
        formaPago: 'efectivo',
        importe: 0,
        importeFinal: 0,
      },
      setDetails: (details) => set({ Details: details }),
      updateDetails: (newDetails) =>
        set((state) => ({
          Details: {
            ...state.Details,
            ...newDetails,
          },
        })),
      resetDetails: () =>
        set({
          Details: {
            recargo: 0,
            descuento: 0,
            saldoPendiente: 0,
            formaPago: 'efectivo',
            importe: 0,
            importeFinal: 0,
          },
        }),
    }),
    {
      name: 'presupuesto-storage', // clave en localStorage
    }
  )
)


export default usePresupuestoDetails  