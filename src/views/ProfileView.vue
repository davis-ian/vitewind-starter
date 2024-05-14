<template>
  <div class="p-4">
    <div class="border-2 border-primary">
      <!-- <AvatarComponent path="" size=""></AvatarComponent> -->
      <UploadComponent
        @success="handleUploadSuccess"
        @error="handleUploadError"
        bucket-name="avatars"
      ></UploadComponent>
      <ProfileComponent
        ref="profileCompRef"
        v-if="authAuthStore.isAuthenticated"
      ></ProfileComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ProfileComponent from '@/components/supabase/ProfileComponent.vue';
// import AvatarComponent from '@/components/supabase/AvatarComponent.vue';
import { useAuthStore } from '@/stores/auth';
import UploadComponent from '@/components/supabase/UploadComponent.vue';

const authAuthStore = useAuthStore();
const profileCompRef = ref<InstanceType<typeof ProfileComponent> | null>(null);

const handleUploadError = (error: Error) => {
  console.log('Upload ERROR', error);
};

const handleUploadSuccess = (url: string) => {
  console.log('upload SUCCESS', url);

  console.log;
  if (profileCompRef.value) {
    profileCompRef.value.updateAvatar(url);
  }
};
</script>
