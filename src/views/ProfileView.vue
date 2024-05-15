<template>
  <div class="p-4">
    <ProfileComponent v-if="authAuthStore.isAuthenticated"></ProfileComponent>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ProfileComponent from '@/components/supabase/ProfileComponent.vue';
import { useAuthStore } from '@/stores/auth';

const authAuthStore = useAuthStore();
</script>
