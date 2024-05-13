<template>
  <div class="navbar gap-4">
    <button class="btn btn-ghost text-xl" @click="$router.push('/')">
      <font-awesome-icon icon="fa-solid fa-ghost"></font-awesome-icon>
      ViteFast
    </button>

    <a v-if="$route.path == '/'" href="#pricing">Pricing</a>
    <a v-if="$route.path == '/'" href="#faq">FAQ</a>

    <a v-if="$route.path == '/'" href="/dashboard">Dashboard</a>
    <a href="/login">Login</a>
    <a v-if="$route.path != '/'" href="/">Home</a>
  </div>

  <main>
    <RouterView style="overflow: hidden" />
  </main>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<style></style>
