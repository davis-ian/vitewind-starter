<template>
  <div>
    <form @submit.prevent="handleLogin">
      <div class="flex flex-col items-center gap-4">
        <h1 class="text-bold text-3xl">Supabase + Vue 3</h1>
        <p class="">Sign in via magic link with your email below</p>
        <div>
          <input
            class="input input-bordered w-full max-w-xs"
            required
            type="email"
            placeholder="Your email"
            v-model="email"
          />
        </div>
        <div>
          <input
            type="submit"
            class="btn btn-primary"
            :value="loading ? 'Loading' : 'Send magic link'"
            :disabled="loading"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { supabase } from '@/services/supabase';

const loading = ref(false);
const email = ref('');

const handleLogin = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value
    });

    if (error) throw error;
    alert('Check your email for the login link!');
  } catch (error) {
    if (error instanceof Error) alert(error.message);
  } finally {
    loading.value = false;
  }
};
</script>
