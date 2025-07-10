import { create } from 'zustand';

const usePresupuestoDetails = create((set) => ({
  Details: {
    recargo: 0,
    descuento: 0,
    saldoPendiente: 0,
    formaPago: 'efectivo',
    importeFinal: 0,
  },
    setDetails: (details) => set({ Details: details }),
    updateDetails: (newDetails) => set((state) => ({
        Details: {
            ...state.Details,
            ...newDetails,
        },
        })),
    resetDetails: () => set({ Details: { recargo: 0, descuento: 0, saldoPendiente: 0, formaPago: 'efectivo', importeFinal: 0 } }),
}));

export default usePresupuestoDetails;