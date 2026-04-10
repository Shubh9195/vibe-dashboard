import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("⚠️ Supabase environment variables are missing. Please check your .env.local file.");
}

// createBrowserClient stores the session in COOKIES (not localStorage)
// so it stays in sync with the server-side SSR middleware & server components
export const supabase = createBrowserClient(
  supabaseUrl || "",
  supabaseAnonKey || ""
);
