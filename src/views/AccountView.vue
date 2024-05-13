<template>
  <div class="p-4">
    <!-- <h2>Account test</h2> -->

    <div>
      <AccountComponent v-if="authAuthStore.isAuthenticated"></AccountComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AccountComponent from '@/components/supabase/AccountComponent.vue';
import { useAuthStore } from '@/stores/auth';

const authAuthStore = useAuthStore();
</script>
