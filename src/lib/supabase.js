// src/lib/supabase.js
import { createClient } from "@supabase/supabase-js";

// 🚀 Replace these with your own Supabase credentials
const SUPABASE_URL = "https://etdliftwqduugqljnjsa.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0ZGxpZnR3cWR1dWdxbGpuanNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwNTIwNjMsImV4cCI6MjA3NjYyODA2M30.ByY_4dqRhBdCDnVhK0wUerqRWbNyXrdu6dUAh_c2qdk";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
