import { Abertura } from '@/interfaces/Abertura'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AberturaState = {
  aberturas: Abertura[]
  agregarAbertura: (abertura: Abertura) => void
  actualizarAbertura: (id: number, data: Partial<Abertura>) => void
  eliminarAbertura: (id: number) => void
  limpiarAberturas: () => void
}

const useAberturasStore = create<AberturaState>()(
  persist(
    (set) => ({
      aberturas: [],
      agregarAbertura: (abertura) =>
        set((state) => ({ aberturas: [...state.aberturas, abertura] })),
      actualizarAbertura: (key: number, data: Partial<Abertura>) =>
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
