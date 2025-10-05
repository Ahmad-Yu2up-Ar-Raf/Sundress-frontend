// store/use-auth-store.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface User {
  id: number
  name: string
  email: string
  avatar: string
  role: 'seller' | 'buyer'
  email_verified_at: string | null
}

interface AuthState {
  user: User | null
  token: string | null
  setAuth: (user: User, token: string) => void
  clearAuth: () => void
  isAuthenticated: () => boolean
  isSeller: () => boolean
  isBuyer: () => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      
      setAuth: (user, token) => {
        set({ user, token })
        localStorage.setItem('auth_token', token)
      },
      
      clearAuth: () => {
        set({ user: null, token: null })
        localStorage.removeItem('auth_token')
      },
      
      isAuthenticated: () => {
        const { user, token } = get()
        return !!user && !!token
      },
      
      isSeller: () => {
        const { user } = get()
        return user?.role === 'seller'
      },
      
      isBuyer: () => {
        const { user } = get()
        return user?.role === 'buyer'
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)