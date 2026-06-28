'use client';

import { create } from 'zustand';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

interface UIState {
  // Theme
  theme: 'light' | 'dark';
  
  // Mobile menu
  isMobileMenuOpen: boolean;
  
  // Toasts
  toasts: Toast[];
  
  // Modal states
  activeModal: string | null;
  
  // Actions
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;
  
  // Toast actions
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  
  // Modal actions
  openModal: (modalId: string) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  theme: 'light',
  isMobileMenuOpen: false,
  toasts: [],
  activeModal: null,

  toggleTheme: () => {
    const newTheme = get().theme === 'light' ? 'dark' : 'light';
    set({ theme: newTheme });
    
    // Update document class for Tailwind dark mode
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
    }
  },

  setTheme: (theme: 'light' | 'dark') => {
    set({ theme });
    
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  },

  openMobileMenu: () => set({ isMobileMenuOpen: true }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

  addToast: (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = { ...toast, id };
    
    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    // Auto-remove after duration
    const duration = toast.duration ?? 5000;
    if (duration > 0) {
      setTimeout(() => {
        get().removeToast(id);
      }, duration);
    }
  },

  removeToast: (id: string) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },

  openModal: (modalId: string) => set({ activeModal: modalId }),
  closeModal: () => set({ activeModal: null }),
}));

// Transient update pattern for performance-critical updates
export const useUITransient = () => {
  const set = useUIStore.setState;

  return {
    setToasts: (toasts: Toast[]) => {
      set({ toasts }, false); // false = don't trigger re-renders
    },
    
    updateToast: (id: string, updates: Partial<Toast>) => {
      const toasts = useUIStore.getState().toasts;
      const updatedToasts = toasts.map((toast) =>
        toast.id === id ? { ...toast, ...updates } : toast
      );
      set({ toasts: updatedToasts }, false);
    },
  };
};
