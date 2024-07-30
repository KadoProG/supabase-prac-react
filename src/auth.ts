import { supabase } from "./supabaseClient";

// Sign Up
export const signUp = async (email: string, password: string) => {
  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({ email, password });
  if (error) console.error("Error signing up:", error.message);
  else console.log("User signed up:", user);
};

// Sign In
export const signIn = async (email: string, password: string) => {
  // const { user, error } = await supabase.auth.signIn({ email, password });
  const {
    data: { user },
    error,
  } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) console.error("Error signing in:", error.message);
  else console.log("User signed in:", user);
};

// Sign Out
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) console.error("Error signing out:", error.message);
  else console.log("User signed out");
};
