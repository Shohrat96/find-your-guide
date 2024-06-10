import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Session, User } from "@supabase/supabase-js";

// interface UserStore {
//   user: User | null;
//   setUser: (user: User | null) => void;
//   session: Session | null;
//   setSession: (session: Session | null) => void;
//   isLoggedIn: boolean;
//   setIsLoggedIn: (isLoggedIn: boolean) => void;
// }

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      session: null,
      isLoggedIn: false,
      isOnboarded: false,
      setUser: (user) => set((state) => ({ user })),
      setIsLoggedIn: (isLoggedIn) => set((state) => ({ isLoggedIn })),
      setSession: (session) => set((state) => ({ session })),
    }),
    {
      name: "find-your-guide",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
