import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { EXPO_PUBLIC_API_URL, EXPO_PUBLIC_API_KEY } from "@env";

export const supabase = createClient(
  EXPO_PUBLIC_API_URL,
  EXPO_PUBLIC_API_KEY,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);
