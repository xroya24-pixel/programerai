import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

function getConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (url && key && url.startsWith("https://") && url.includes(".supabase.co")) {
    return { url, key };
  }
  return null;
}

export async function createClient() {
  const cookieStore = await cookies();
  const config = getConfig();

  return createServerClient(
    config?.url ?? "https://placeholder.supabase.co",
    config?.key ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDYzNjEwMTF9.placeholder",
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {}
        },
      },
    }
  );
}

export function isSupabaseConfigured(): boolean {
  return getConfig() !== null;
}
