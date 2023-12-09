import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { auth } from '../api';

export type AuthStoreType = {
  type: 'applicants' | 'companies';
  token: string | null;

  login(type: 'applicants' | 'companies', email: string, password: string): Promise<void>;
  isLogin(): boolean;
}
export const useAuthStore = create(
  persist<AuthStoreType>(
    (set, get) => ({
      type: 'applicants',
      token: null,

      async login(type: 'applicants' | 'companies', email: string, password: string) {
        const result = await auth.login(type, email, password);
        if ('token' in result) {
          set({
            type,
            token: result.token,
          });
        }
      },
      isLogin: () => !!get().token,
    }) as any,
    {
      name: 'auth',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
