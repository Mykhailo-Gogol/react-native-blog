import AsyncStorage from '@react-native-async-storage/async-storage'
import { User } from '@supabase/supabase-js'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type AuthStore = {
  user: User | null
  setUser: (user: User | null) => void

  token: string | undefined
  setToken: (token: string | undefined) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: AuthStore['user']) => set(() => ({ user })),

      token: undefined,
      setToken: (token: AuthStore['token']) => set(() => ({ token })),
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
