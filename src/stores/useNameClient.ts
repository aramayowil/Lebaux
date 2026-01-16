import { create } from 'zustand'

type NameClienteState = {
  nameCliente: string
  setNameCliente: (name: string) => void
  clearNameCliente: () => void
}

export const useNameCliente = create<NameClienteState>((set) => ({
  nameCliente: '',
  setNameCliente: (name: string) => set({ nameCliente: name }),
  clearNameCliente: () => set({ nameCliente: '' }),
}))
