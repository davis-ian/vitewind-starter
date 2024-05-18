<template>
  <div>
    <div>
      <div v-if="loading" class="px-4">
        <progress class="progress progress-primary"></progress>
      </div>
    </div>

    <p class="py-4" v-if="user?.last_sign_in_at">
      Last Login In:
      {{ formatDate(user?.last_sign_in_at) }}
    </p>

    <div v-if="profile.avatar_url" class="avatar">
      <div class="max-w-xs">
        <img :src="profile.avatar_url" alt="Avatar Image" />
      </div>
    </div>
    <div v-else class="avatar placeholder">
      <div class="w-80 border-2 border-neutral text-neutral-content">
        <span class="">No Image</span>
      </div>
    </div>
    <UploadComponent
      class="py-4"
      @success="updateAvatar"
      @error="handleUploadError"
      bucket-name="avatars"
    ></UploadComponent>

    <form
      class="form-widget flex flex-col gap-4"
      @submit.prevent="updateProfile"
    >
      <div class="flex flex-col">
        <label for="email">Email</label>
        <input
          id="email"
          type="text"
          class="input input-bordered w-full"
          :value="user?.email"
          disabled
        />
      </div>
      <div class="flex flex-col">
        <label for="username">Username</label>
        <input
          id="username"
          type="text"
          class="input input-bordered w-full"
          v-model="profile.username"
        />
      </div>

      <div class="flex flex-col gap-4">
        <input
          type="submit"
          class="btn btn-primary"
          :value="loading ? 'Loading ...' : 'Update'"
          :disabled="loading"
        />

        <button
          class="btn btn-outline btn-primary"
          @click="signOut"
          :disabled="loading"
        >
          Sign Out
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { supabase } from '@/services/supabase';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import UploadComponent from '@/components/supabase/UploadComponent.vue';
const authStore = useAuthStore();
const user = authStore.user;

type Profile = {
  username: string | null;
  avatar_url: string | null;
};
const profile = ref<Profile>({
  username: '',
  avatar_url: ''
});

const loading = ref<boolean>(true);

const handleUploadError = (error: Error) => {
  alert(`Error uploading image: ${error.message}`);
};

onMounted(async () => {
  await getProfile();
});

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

async function getProfile() {
  try {
    let { data, error, status } = await supabase
      .from('profiles')
      .select(`username, avatar_url`)
      .eq('id', user?.id)
      .single();

    if (error && status !== 406) throw error;

    if (data) {
      profile.value.username = data.username;
      profile.value.avatar_url = data.avatar_url;
    }
  } catch (error) {
    alert((error as Error).message);
  } finally {
    loading.value = false;
  }
}

const updateAvatar = async (url: string) => {
  if (!url) return;

  profile.value.avatar_url = url;

  await updateProfile();
};

async function updateProfile() {
  try {
    loading.value = true;

    if (user === null) {
      throw new Error('User cannot be null');
    }

    const { error } = await supabase.from('profiles').upsert(profile.value);

    if (error) throw error;
  } catch (error) {
    alert((error as Error).message);
  } finally {
    loading.value = false;
  }
}

const router = useRouter();

async function signOut() {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signOut();

    profile.value.avatar_url = '';
    profile.value.username = '';

    authStore.signOut();

    router.push({ name: 'Login' });

    if (error) throw error;
  } catch (error) {
    alert((error as Error).message);
  } finally {
    loading.value = false;
  }
}
</script>
