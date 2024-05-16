<template>
  <div class="flex min-h-screen flex-col">
    <div class="navbar gap-4">
      <button class="btn btn-ghost text-xl" @click="$router.push('/')">
        <font-awesome-icon icon="fa-solid fa-ghost"></font-awesome-icon>
        ViteFast
      </button>

      <a v-if="$route.path == '/'" href="#pricing">Pricing</a>
      <a v-if="$route.path == '/'" href="#faq">FAQ</a>

      <a v-if="$route.path == '/'" href="/dashboard">Dashboard</a>
      <a v-if="$route.path != '/'" href="/">Home</a>
      <a v-if="authStore.isAuthenticated" href="/profile">Profile</a>
      <a v-if="!authStore.isAuthenticated" href="/login">Login</a>
    </div>

    <main class="flex flex-grow">
      <RouterView class="flex-grow" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';

const authStore = useAuthStore();

onMounted(() => {
  authStore.fetchUser();
  authStore.initializeAuthListener();
});
</script>

<style></style>
