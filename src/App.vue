<template>
  <LoadingOverlay :show="isLoading" />
  <router-view v-slot="{ Component }">
    <transition name="page" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import LoadingOverlay from "./components/LoadingOverlay.vue";

const router = useRouter();
const isLoading = ref(false);

// 🌐 Show overlay on route changes
router.beforeEach(() => {
  isLoading.value = true;
});
router.afterEach(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 300); // slight delay for smooth fade
});
</script>

<style>
/* Page fade animation */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.4s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
