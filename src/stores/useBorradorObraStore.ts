import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { IAbertura } from '@/interfaces/IAbertura'
import { IAbertura_Compuesta } from '@/interfaces/IAberturaCompuesta'

interface AberturasObraState {
  // Datos
  aberturas: IAbertura[]
  aberturasComps: IAbertura_Compuesta[]

  // Acciones para Aberturas Simples
  setAberturas: (items: IAbertura[]) => void
  addAbertura: (item: IAbertura) => void
  removeAbertura: (id: string) => void
  updateAbertura: (id: string, updatedItem: IAbertura) => void

  // Acciones para Aberturas Compuestas
  setAberturasComps: (items: IAbertura_Compuesta[]) => void
  addAberturaComp: (item: IAbertura_Compuesta) => void
  removeAberturaComp: (id: string) => void

  // Limpieza total
  resetObra: () => void
}

const useBorradorObraStore = create<AberturasObraState>()(
  persist(
    (set) => ({
      aberturas: [],
      aberturasComps: [],

      // --- Métodos Simples ---
      setAberturas: (items) => set({ aberturas: items }),

      addAbertura: (item) =>
        set((state) => ({ aberturas: [...state.aberturas, item] })),

      removeAbertura: (id) =>
        set((state) => ({
          aberturas: state.aberturas.filter((a) => a.key !== id),
        })),

      updateAbertura: (id, updatedItem) =>
        set((state) => ({
          aberturas: state.aberturas.map((a) =>
            a.key === id ? updatedItem : a,
          ),
        })),

      // --- Métodos Compuestas ---
      setAberturasComps: (items) => set({ aberturasComps: items }),

      addAberturaComp: (item) =>
        set((state) => ({ aberturasComps: [...state.aberturasComps, item] })),

      removeAberturaComp: (id) =>
        set((state) => ({
          aberturasComps: state.aberturasComps.filter((a) => a.key !== id),
        })),

      // --- Reset ---
      resetObra: () => set({ aberturas: [], aberturasComps: [] }),
    }),
    {
      name: 'aberturas-borrador-storage', // Nombre de la key en localStorage
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export default useBorradorObraStore
