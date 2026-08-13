import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  createUser,
  findUserByEmail,
  verifyPassword,
} from "../data/usersDb";

const SESSION_DURATION_MS = 2 * 60 * 60 * 1000;

function simulateNetworkDelay(ms = 600) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null, // { id, name, email }
      isAuthenticated: false,
      isLoading: false,
      error: null,
      sessionExpiresAt: null,

      register: async ({ name, email, password }) => {
        set({ isLoading: true, error: null });
        await simulateNetworkDelay();

        if (findUserByEmail(email)) {
          set({ isLoading: false, error: "Un compte existe deja avec cet email." });
          return { success: false };
        }

        const newUser = createUser({ name, email, password });

        set({
          user: { id: newUser.id, name: newUser.name, email: newUser.email },
          isAuthenticated: true,
          isLoading: false,
          error: null,
          sessionExpiresAt: Date.now() + SESSION_DURATION_MS,
        });

        return { success: true };
      },

      login: async ({ email, password }) => {
        set({ isLoading: true, error: null });
        await simulateNetworkDelay();

        const existingUser = findUserByEmail(email);

        if (!existingUser || !verifyPassword(existingUser, password)) {
          set({ isLoading: false, error: "Email ou mot de passe incorrect." });
          return { success: false };
        }

        set({
          user: {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
          },
          isAuthenticated: true,
          isLoading: false,
          error: null,
          sessionExpiresAt: Date.now() + SESSION_DURATION_MS,
        });

        return { success: true };
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          sessionExpiresAt: null,
          error: null,
        });
      },

      clearError: () => set({ error: null }),

      // Appelee au demarrage de l'app (voir App.js) pour restaurer -
      // ou invalider - la session precedente.
      checkAuth: () => {
        const { sessionExpiresAt, isAuthenticated } = get();

        if (!isAuthenticated) return;

        if (!sessionExpiresAt || Date.now() > sessionExpiresAt) {
          set({ user: null, isAuthenticated: false, sessionExpiresAt: null });
        }
      },
    }),
    {
      name: "shopease-auth",
    }
  )
);