<template>
  <div class="p-4">
    <!-- <h2>Account test</h2> -->

    <div>
      <ProfileComponent v-if="authAuthStore.isAuthenticated"></ProfileComponent>
      <AvatarComponent path="" size=""></AvatarComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ProfileComponent from '@/components/supabase/ProfileComponent.vue';
import AvatarComponent from '@/components/supabase/AvatarComponent.vue';
import { useAuthStore } from '@/stores/auth';

const authAuthStore = useAuthStore();
</script>
