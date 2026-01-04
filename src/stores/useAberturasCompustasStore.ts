import { IAbertura_Compuesta } from '@/interfaces/IAberturaCompuesta'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AberturaCompuestaState = {
  aberturasComps: IAbertura_Compuesta[]
  agregarAberturaComp: (aberturaComp: IAbertura_Compuesta) => void
  actualizarAberturaComp: (
    key: number,
    data: Partial<IAbertura_Compuesta>,
  ) => void
  eliminarAberturaComp: (key: number) => void
  limpiarAberturasComp: () => void
}

const useAberturasCompuestasStore = create<AberturaCompuestaState>()(
  persist(
    (set) => ({
      aberturasComps: [],

      agregarAberturaComp: (aberturaComp) =>
        set((state) => ({
          aberturasComps: [...state.aberturasComps, aberturaComp],
        })),

      actualizarAberturaComp: (key, data) =>
        set((state) => ({
          aberturasComps: state.aberturasComps.map((a) =>
            a.key === key ? { ...a, ...data } : a,
          ),
        })),

      eliminarAberturaComp: (key) =>
        set((state) => ({
          aberturasComps: state.aberturasComps.filter((a) => a.key !== key),
        })),

      limpiarAberturasComp: () => set({ aberturasComps: [] }),
    }),
    {
      name: 'aberturas-compuesta-storage', // Nombre en localStorage
    },
  ),
)

export default useAberturasCompuestasStore
