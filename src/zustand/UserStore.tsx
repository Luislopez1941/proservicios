import { create } from 'zustand';
import { persistCookie, getCookie, clearCookie } from '@/utils/cookie.utility';

export interface UserInfo {
  id: number;
  name: string;
  email: string;
  typeUser: string;
  token: string; // Considera si realmente necesitas almacenar la contraseña en el estado.
}

export const EmptyUserState: UserInfo = {
  id: 0,
  name: '',
  email: '',
  typeUser: '',
  token: '',
};

export const UserKey = 'user';

interface UserStore {
  user: UserInfo;
  getUser: (payload: UserInfo) => void;
  updateUser: (payload: Partial<UserInfo>) => void;
  resetUser: () => void;
}

// Crea el store de Zustand
const useUserStore = create<UserStore>((set) => {
  const initialUser = getCookie(UserKey) || EmptyUserState; // Obtiene el usuario inicial de las cookies
  return {
    user: initialUser as UserInfo, // Asegúrate de que sea de tipo UserInfo
    getUser: (payload) => set(() => {
      persistCookie(UserKey, payload);
      return { user: payload };
    }),
    updateUser: (payload) => set((state) => {
      const result = { ...state.user, ...payload };
      persistCookie(UserKey, result);
      return { user: result };
    }),
    resetUser: () => set(() => {
      clearCookie(UserKey);
      return { user: EmptyUserState };
    }),
  };
});

export default useUserStore;
