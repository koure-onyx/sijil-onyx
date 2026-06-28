'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '@/lib/api-types';
import api from '@/lib/api/client';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: true,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const response = await api.post<{ user: User; token: string }>('/auth/login', {
            email,
            password,
          });
          
          set({
            user: response.data.user,
            token: response.data.token,
            isAuthenticated: true,
            isLoading: false,
          });
          
          api.setAuthToken(response.data.token);
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        api.clearAuthToken();
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      setUser: (user: User | null) => {
        set({ user, isAuthenticated: !!user });
      },

      setToken: (token: string | null) => {
        if (token) {
          api.setAuthToken(token);
        } else {
          api.clearAuthToken();
        }
        set({ token, isAuthenticated: !!token });
      },

      checkAuth: async () => {
        const token = get().token;
        
        if (!token) {
          set({ isLoading: false });
          return;
        }

        try {
          const response = await api.get<User>('/auth/me');
          set({
            user: response.data,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          // Token is invalid, clear auth state
          get().logout();
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Transient update pattern for performance-critical updates
export const useAuthTransient = () => {
  const set = useAuthStore.setState;
  const get = useAuthStore.getState;

  return {
    setLoading: (isLoading: boolean) => {
      set({ isLoading }, false); // false = don't trigger re-renders
    },
    
    updateUserField: <K extends keyof User>(field: K, value: User[K]) => {
      const user = get().user;
      if (user) {
        set({ user: { ...user, [field]: value } }, false);
      }
    },
  };
};
