// import { createClient } from "@supabase/supabase-js";

// // Use environment variables injected by Vite
// const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
// const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase environment variables:", {
    supabaseUrl,
    supabaseAnonKey,
  });
  throw new Error("supabaseUrl and supabaseAnonKey are required.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);