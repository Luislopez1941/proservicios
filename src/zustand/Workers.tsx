import { create } from 'zustand';

interface StoreState {
    dataUser: {};
    setDtaUser: (x: boolean) => void; // Cambiar 'any' a 'boolean'
}

export const storeWorkers = create<StoreState>((set) => ({
    dataUser: {},
    setDtaUser: (x) => set({ dataUser: x }),
}));
