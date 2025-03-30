import { create } from 'zustand';

interface StoreState {

    modal: any;
    setModal: (x: any) => void;

    jobs: any
    setJobs: (x: any) => void;

    searchTermLenght: any;
    setSearchTermLenght: (x: any) => void;

    searchLenghtTypeP: any;
    setSearchLenghtTypeP: (x: any) => void;

    typeSearch: any;
    setTypeSearch: (x: any) => void;

    data: any;
    setData: (x: any) => void;

}

export const storeSJobs = create<StoreState>((set) => ({

    modal: [],
    setModal: (x) => set({ modal: x }),

    jobs: [],
    setJobs: (x) => set({ jobs: x }),

    data: {
        location_name: '',
        profession_name: '',
        location: {},
        professions: [],
    },
    setData: (prev) =>
        set((state) => ({
            data: {
                ...state.data,
                ...prev,
            },
        })),


    searchTermLenght: '',
    setSearchTermLenght: (x) => set({ searchTermLenght: x }),

    searchLenghtTypeP: '',
    setSearchLenghtTypeP: (x) => set({ searchLenghtTypeP: x }),

    typeSearch: 1,
    setTypeSearch: (x) => set({ searchLenghtTypeP: x }),
}));
