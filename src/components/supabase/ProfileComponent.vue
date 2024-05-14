<template>
  <div>
    <div>
      <div v-if="loading" class="px-4">
        <progress class="progress progress-primary"></progress>
      </div>
    </div>

    <div>
      <p v-if="profile?.last_sign_in_at">
        Last Sign In:
        {{ formatDate(profile?.last_sign_in_at) }}
      </p>
    </div>
    <div>
      <p>{{ avatar_url }}</p>
      <img v-if="avatar_url" :src="avatar_url" alt="Avatar Image" />
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
            :value="profile?.email"
            disabled
          />
        </div>
        <div class="flex flex-col">
          <label for="username">Username</label>
          <input
            id="username"
            type="text"
            class="input input-bordered w-full"
            v-model="username"
          />
        </div>
        <!-- <div class="flex flex-col">
          <label for="website">Website</label>
          <input
            id="website"
            type="url"
            class="input input-bordered w-full"
            v-model="website"
          />
        </div> -->

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
  </div>
</template>

<script setup lang="ts">
import { supabase } from '@/services/supabase';
import { onMounted, ref } from 'vue';
import { type User, type Session } from '@supabase/supabase-js';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();

interface Profile {
  id: string;
  updated_at: string | null;
  username?: string | null;
  full_name?: string | null;
  avatar_url?: string | null;
  website?: string | null;
}

// const props = defineProps<{ session: Session }>();
const loading = ref<boolean>(true);
const profile = ref<User | null>(null);

const username = ref<string>('');
const website = ref<string>('');
const avatar_url = ref<string>('');

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
    const user = authStore.user;

    profile.value = user;

    let { data, error, status } = await supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user?.id)
      .single();

    if (error && status !== 406) throw error;

    if (data) {
      console.log(data, 'user data thing');
      username.value = data.username;
      website.value = data.website;
      avatar_url.value = data.avatar_url;
    }
  } catch (error) {
    alert((error as Error).message);
  } finally {
    loading.value = false;
  }
}

const updateAvatar = async (url: string) => {
  if (!url) return;

  avatar_url.value = url;

  await updateProfile();
};

defineExpose({ updateAvatar });

async function updateProfile() {
  console.log('updating profile');
  try {
    loading.value = true;
    const user = authStore.user;

    if (user === null) {
      throw new Error('User cannot be null');
    }

    const updates: Profile = {
      id: user.id,
      username: username.value,
      avatar_url: avatar_url.value,
      updated_at: new Date().toISOString()
    };

    console.log(updates, 'Updates');
    const { error } = await supabase.from('profiles').upsert(updates);

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

    profile.value = null;
    username.value = '';
    website.value = '';
    avatar_url.value = '';

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
