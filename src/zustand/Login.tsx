import { create } from 'zustand';

interface StoreState {
    formStatus: boolean;
    setFormStatus: (x: boolean) => void; // Cambiar 'any' a 'boolean'
}

export const storeLogin = create<StoreState>((set) => ({
    formStatus: false,
    setFormStatus: (x) => set({ formStatus: x }),
}));
