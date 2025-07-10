// src/store/useClientStore.js
import { create } from 'zustand';

const useClientStore = create((set) => ({
  clientName: '',
  setClientName: (name) => set({ clientName: name }),
  resetClientName: () => set({ clientName: '' }),
}));

export default useClientStore;