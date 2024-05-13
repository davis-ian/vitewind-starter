<template>
  <div>
    <h1 class="text-4xl">Login</h1>
    <CardComponent>
      <AuthComponent></AuthComponent>
    </CardComponent>
  </div>
</template>

<script setup lang="ts">
import AuthComponent from '@/components/supabase/AuthComponent.vue';
import CardComponent from '@/components/ui/CardComponent.vue';
</script>
