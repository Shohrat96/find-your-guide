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

export const useLocalsFilterStore = create(

  (set) => ({
    filters: {
      priceRange: [0, 100],
      selectedLanguageIds: [],
      selectedActivityIds: [],
      selectedGenderIds: [],
      offset: 0
    },
    filterApplyClicked: false,
    setFilterApplyClicked: (val) => set((state) => ({ filterApplyClicked: val })),
    setFilters: (newFilters) =>
      set((state) => ({ filters: { ...state.filters, ...newFilters } })),
  }),
  // {
  //   name: "find-your-guide-locals-filter",
  //   // storage: createJSONStorage(() => AsyncStorage),
  // }

);
