import { create } from "zustand";

type User = {
  name: string;
  email: string;
  role: "ADMIN" | "INSTRUCTOR" | "STUDENT";
};

type State = {
  user: User | null;
  setUser: (user: User) => void;
};

export const useUserStore = create<State>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
