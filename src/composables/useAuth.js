// src/composables/useAuth.js
import { ref } from "vue";
import { supabase } from "../lib/supabase";
import { useRouter } from "vue-router"; // ✅ import router

export function useAuth() {
  const router = useRouter(); // ✅ initialize router
  const loading = ref(false);
  const message = ref("");
  const error = ref("");

  // 🔐 Login
  const login = async (email, password) => {
    loading.value = true;
    message.value = "";
    error.value = "";
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) throw signInError;

      message.value = "✅ Logged in successfully!";

      // ✅ Redirect to dashboard after success
      router.push("/dashboard");
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // 👤 Signup
  const signup = async (email, password) => {
    loading.value = true;
    message.value = "";
    error.value = "";
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (signUpError) throw signUpError;

      message.value =
        "✅ Sign-up successful! Check your email for confirmation.";

      // ✅ Redirect to dashboard after signup
      router.push("/dashboard");
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // 🚪 Logout
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      message.value = "👋 Logged out successfully!";
      router.push("/login"); // ✅ redirect after logout
    } catch (err) {
      error.value = err.message;
    }
  };

  return { login, signup, logout, loading, message, error };
}
