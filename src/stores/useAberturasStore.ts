import { IAbertura } from '@/interfaces/IAbertura'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AberturaState = {
  aberturas: IAbertura[]
  agregarAbertura: (abertura: IAbertura) => void
  actualizarAbertura: (id: string, data: Partial<IAbertura>) => void
  eliminarAbertura: (id: string) => void
  limpiarAberturas: () => void
}

const useAberturasStore = create<AberturaState>()(
  persist(
    (set) => ({
      aberturas: [],
      agregarAbertura: (abertura) =>
        set((state) => ({ aberturas: [...state.aberturas, abertura] })),
      actualizarAbertura: (key: string, data: Partial<IAbertura>) =>
        set((state) => ({
          aberturas: state.aberturas.map((p) =>
            p.key === key ? { ...p, ...data } : p,
          ),
        })),
      eliminarAbertura: (key) =>
        set((state) => ({
          aberturas: state.aberturas.filter((p) => p.key !== key),
        })),
      limpiarAberturas: () => set({ aberturas: [] }),
    }),
    {
      name: 'aberturas-store', // clave de localStorage
    },
  ),
)

export default useAberturasStore
