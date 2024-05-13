<template>
  <div class="flex flex-col items-center justify-center">
    <CardComponent class="bg-primary-content">
      <AuthComponent></AuthComponent>
    </CardComponent>
  </div>
</template>

<script setup lang="ts">
import AuthComponent from '@/components/supabase/AuthComponent.vue';
import CardComponent from '@/components/ui/CardComponent.vue';
</script>
