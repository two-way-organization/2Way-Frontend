import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type AuthStoreType = {
  type: 'applicants' | 'companies';
  token: string | null;

  setToken(token: string): void;
  isLogin(): boolean;
  reset(): void;
}
export const useAuth = create(
  persist<AuthStoreType>(
    (set, get) => ({
      type: 'applicants',
      token: null,

      setToken: (token) => set({ token }),
      isLogin: () => !!get().token,
      reset: () => set({ token: null }),
    }) satisfies AuthStoreType,
    {
      name: 'auth',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
