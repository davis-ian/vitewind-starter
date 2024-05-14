// stores/authStore.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { supabase } from '@/services/supabase';
import { type User } from '@supabase/supabase-js';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const loading = ref<boolean>(false);

  const fetchUser = async () => {
    loading.value = true;
    const {
      data: { session },
      error
    } = await supabase.auth.getSession();
    if (error) {
      console.error('Error fetching session:', error.message);
      user.value = null;
    } else {
      user.value = session?.user || null;
    }
    loading.value = false;
  };

  const signIn = async (email: string) => {
    loading.value = true;
    const { error } = await supabase.auth.signInWithOtp({ email });
    loading.value = false;
    if (error) throw error;
  };

  const signOut = async () => {
    loading.value = true;
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
    }
    user.value = null;
    loading.value = false;
  };

  const initializeAuthListener = () => {
    supabase.auth.onAuthStateChange((event, session) => {
      user.value = session?.user || null;
    });
  };

  const isAuthenticated = computed(() => user.value !== null);

  return {
    user,
    loading,
    fetchUser,
    signIn,
    signOut,
    isAuthenticated,
    initializeAuthListener
  };
});
