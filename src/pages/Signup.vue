<!-- src/pages/Signup.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center">
    <div class="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 w-full max-w-md">
      <h2 class="text-white text-3xl font-bold mb-6 text-center">Create an Account</h2>

      <!-- Email -->
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="w-full p-3 mb-4 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      <!-- Password with toggle -->
      <PasswordInput v-model="password" placeholder="Password" />

      <!-- Error / Success Message -->
      <p v-if="error" class="text-red-400 text-sm mb-2">{{ error }}</p>
      <p v-if="message" class="text-green-400 text-sm mb-2">{{ message }}</p>

      <!-- Signup Button -->
      <button
        @click="handleSignup"
        :disabled="loading"
        class="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-lg transition disabled:opacity-60"
      >
        {{ loading ? 'Please wait...' : 'Sign Up' }}
      </button>

      <!-- Redirect to Login -->
      <p class="text-center text-sm mt-4 text-gray-300">
        Already have an account?
        <RouterLink to="/login" class="text-indigo-400 font-semibold hover:underline">
          Sign In
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

// Supabase composable
const { signup, loading, message, error } = useAuth()

// Reactive form fields
const email = ref('')
const password = ref('')

// Handle Signup
const handleSignup = async () => {
  await signup(email.value, password.value)
}
</script>
