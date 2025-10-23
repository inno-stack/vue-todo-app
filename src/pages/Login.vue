<!-- src/pages/Login.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center">
    <div class="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 w-full max-w-md">
      <h2 class="text-white text-3xl font-bold mb-6 text-center">Welcome Back</h2>

      <!-- Email -->
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="w-full p-3 mb-4 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      <!-- Password with toggle -->
      <PasswordInput v-model="password" placeholder="Password" />

      <!-- Error & Success Messages -->
      <p v-if="error" class="text-red-400 text-sm mb-2">{{ error }}</p>
      <p v-if="message" class="text-green-400 text-sm mb-2">{{ message }}</p>

      <!-- Login Button -->
      <button
        @click="handleLogin"
        :disabled="loading"
        class="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-lg transition disabled:opacity-60"
      >
        {{ loading ? 'Please wait...' : 'Sign In' }}
      </button>

      <!-- Signup Redirect -->
      <p class="text-center text-sm mt-4 text-gray-300">
        Don’t have an account?
        <RouterLink to="/signup" class="text-indigo-400 font-semibold hover:underline">
          Sign Up
        </RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
// Imports
import { ref } from 'vue'
import { useAuth } from '../composables/useAuth'
import PasswordInput from '../components/PasswordInput.vue'

// Auth composable
const { login, loading, message, error } = useAuth()

// Fields
const email = ref('')
const password = ref('')

// Handle login
const handleLogin = async () => {
  await login(email.value, password.value)
}
</script>
