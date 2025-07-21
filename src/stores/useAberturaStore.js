import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAberturaStore = create(persist(
  (set) => ({
    lista: [],
    agregar: (abertura) =>
      set((state) => ({
        lista: [...state.lista, abertura],
      })),
    eliminar: (id) =>
      set((state) => ({
        lista: state.lista.filter((item) => item.id !== id),
      })),
    actualizar: (id, data) =>
      set((state) => ({
        lista: state.lista.map((item) =>
          item.id === id ? { ...item, ...data } : item
        ),
      })),
  }),
  {
    name: 'aberturas', // clave en localStorage
  }
))

export default useAberturaStore
