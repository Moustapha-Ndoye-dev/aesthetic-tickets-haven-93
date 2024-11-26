import { create } from "zustand";

interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "organizer" | "admin";
}

interface AuthState {
  user: User | null;
  isOrganizer: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isOrganizer: false,
  setUser: (user) => set({ 
    user, 
    isOrganizer: user?.role === "organizer" || user?.role === "admin" 
  }),
  logout: () => set({ user: null, isOrganizer: false }),
}));