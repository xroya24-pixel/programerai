"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export function getUserRoleFromCookie(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^| )opencode_session=([^;]*)/);
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[1])).role ?? null;
  } catch {
    return null;
  }
}

export function useUserRole() {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setRole(getUserRoleFromCookie());
    setLoading(false);
  }, []);

  return { role, isPremium: role === "premium" || role === "admin" || role === "super_admin", loading };
}

export async function upgradeToPremium() {
  const match = document.cookie.match(/(?:^| )opencode_session=([^;]*)/);
  if (!match) return;
  const session = JSON.parse(decodeURIComponent(match[1]));

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    await supabase.from("profiles").update({ role: "premium" }).eq("id", user.id);
  }

  session.role = "premium";
  document.cookie = `opencode_session=${encodeURIComponent(JSON.stringify(session))};path=/;max-age=86400`;
}
