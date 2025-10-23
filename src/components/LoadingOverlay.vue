<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
    >
      <div class="flex flex-col items-center space-y-4">
        <!-- Spinner -->
        <div class="w-12 h-12 border-4 border-t-transparent border-indigo-400 rounded-full animate-spin"></div>
        <p class="text-white font-medium text-lg">Loading...</p>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  show: Boolean,
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
