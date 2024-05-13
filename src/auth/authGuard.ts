import {
  type NavigationGuardNext,
  type RouteLocationNormalized
} from 'vue-router';
import { supabase } from '@/services/supabase';

export const authGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (session) {
    next();
  } else {
    next({ name: 'Login' });
  }
};
