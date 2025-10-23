<template>
  <div class="relative">
    <!-- Password Field -->
    <input
      :type="showPassword ? 'text' : 'password'"
      :placeholder="placeholder"
      v-model="localValue"
      @input="$emit('update:modelValue', localValue)"
      class="w-full p-3 mb-4 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 pr-10"
    />
 <!-- Eye Toggle Button -->
    <button
      type="button"
      @click="togglePassword"
      class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
    >
      <svg
        v-if="showPassword"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="w-5 h-5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274
             4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>

      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="w-5 h-5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M3.98 8.223A10.477 10.477 0 001.458 12c1.274 4.057
             5.064 7 9.542 7 1.88 0 3.63-.52 5.127-1.42M15 12a3 3
             0 01-3 3m0-6a3 3 0 013 3m-6 0a3 3 0 013-3m9.02-3.777A10.477
             10.477 0 0122.542 12c-1.274 4.057-5.064 7-9.542 7-1.88 0-3.63-.52-5.127-1.42M3 3l18 18"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: String,
  placeholder: { type: String, default: 'Password' },
})

const emit = defineEmits(['update:modelValue'])

const localValue = ref(props.modelValue)
const showPassword = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>
