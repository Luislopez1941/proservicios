import { create } from 'zustand';

interface StoreState {
    dataChat: {};
    setDataChat: (x: boolean) => void;
    
    usersChat: {};
    setUsersChat: (x: boolean) => void;
}

export const storeChats = create<StoreState>((set) => ({
    dataChat:{},
    setDataChat: (x) => set({ dataChat: x }),

    usersChat: {},
    setUsersChat: (x) => set({ usersChat: x }),
}));
