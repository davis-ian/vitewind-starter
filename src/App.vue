<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="navbar gap-4">
    <button class="btn btn-ghost text-xl" @click="$router.push('/')">
      <font-awesome-icon icon="fa-solid fa-ghost"></font-awesome-icon>
      ViteFast
    </button>
    <a href="#pricing">Pricing</a>
    <a href="#faq">FAQ</a>
  </div>

  <main>
    <RouterView />
  </main>
</template>

<style></style>
