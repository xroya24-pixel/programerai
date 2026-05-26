import { createBrowserClient } from "@supabase/ssr";

function getConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (url && key && url.startsWith("https://") && url.includes(".supabase.co")) {
    return { url, key };
  }
  return null;
}

export function createClient() {
  const config = getConfig();
  return createBrowserClient(
    config?.url ?? "https://placeholder.supabase.co",
    config?.key ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDYzNjEwMTF9.placeholder"
  );
}

export function isSupabaseConfigured(): boolean {
  return getConfig() !== null;
}
