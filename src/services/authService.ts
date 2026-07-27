import { supabase } from "../lib/supabase";

/**
 * Admin Login
 */
export async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return {
    data,
    error,
  };
}


/**
 * Profile
 */

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

/**
 * Logout
 */
export async function logout() {
  return await supabase.auth.signOut();
}

/**
 * Current Session
 */
export async function getSession() {
  return await supabase.auth.getSession();
}