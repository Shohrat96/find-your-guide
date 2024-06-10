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

export const useLocalsStore = create(

  (set) => ({
    locals: {},
    setLocals: (locals) => set((state) => ({ locals })),
    localsLoading: false,
    scrollToAddLocals: (newLocals) => set((state) => {

      return ({
        locals: {
          ...state.locals,
          guides: [...(state.locals.guides || []), ...newLocals]
        }
      })
    }),
    setLocalsLoading: (newVal) => set((state) => ({ localsLoading: newVal })),
    localsError: '',
    setLocalsError: (err) => set((state) => ({ localsError: err })),
    selectedLocation: null,
    setSelectedLocation: (selectedLocation) => set((state) => ({ selectedLocation }))
  }),
);
