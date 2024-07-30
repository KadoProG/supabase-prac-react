import { supabase } from '@/libs/supabaseClient';

// Sign Up
export const signUp = async (email: string, password: string) =>
  await supabase.auth.signUp({ email, password });

// Sign In
export const signIn = async (email: string, password: string) => {
  const {
    data: { user },
    error,
  } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  // eslint-disable-next-line
  if (error) console.error('Error signing in:', error.message);
  // eslint-disable-next-line
  else console.log('User signed in:', user);
};

// Sign Out
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  // eslint-disable-next-line
  if (error) console.error('Error signing out:', error.message);
  // eslint-disable-next-line
  else console.log('User signed out');
};
