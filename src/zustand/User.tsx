import { create } from 'zustand';

interface StoreState {
    user: boolean;
    setUser: (x: boolean) => void; // Cambiar 'any' a 'boolean'

    userGlobal: boolean;
    setUserGlobal: (x: boolean) => void; 
}

export const storeLogin = create<StoreState>((set) => ({
    user: false,
    setUser: (x) => set({ user: x }),

    userGlobal: false,
    setUserGlobal: (x) => set({ userGlobal: x }),
}));
