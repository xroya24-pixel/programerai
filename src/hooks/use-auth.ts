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
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [premiumStatus, setPremiumStatus] = useState<"none" | "pending" | "approved" | "rejected">("none");

  useEffect(() => {
    const fetch = async () => {
      const r = getUserRoleFromCookie();
      setRole(r);
      setLoading(false);

      if (!r) return;
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("role, expires_at")
        .eq("id", user.id)
        .single();

      if (profile) {
        // Sync cookie role with DB role
        if (profile.role && profile.role !== r) {
          const parsed = JSON.parse(decodeURIComponent(document.cookie.match(/(?:^| )opencode_session=([^;]*)/)![1]));
          parsed.role = profile.role;
          document.cookie = `opencode_session=${encodeURIComponent(JSON.stringify(parsed))};path=/;max-age=86400`;
          setRole(profile.role);
        }

        // Auto-expire check
        if (profile.role === "premium" && profile.expires_at) {
          const exp = new Date(profile.expires_at);
          if (exp < new Date()) {
            await supabase.from("profiles").update({ role: "member", expires_at: null }).eq("id", user.id);
            const parsed = JSON.parse(decodeURIComponent(document.cookie.match(/(?:^| )opencode_session=([^;]*)/)![1]));
            parsed.role = "member";
            document.cookie = `opencode_session=${encodeURIComponent(JSON.stringify(parsed))};path=/;max-age=86400`;
            setRole("member");
            setExpiresAt(null);
          } else {
            setExpiresAt(profile.expires_at);
          }
        }

        if (profile.role === "premium") {
          setPremiumStatus("approved");
        } else if (profile.role === "member" || !profile.role) {
          const { data: sub } = await supabase
            .from("premium_submissions")
            .select("status")
            .eq("user_id", user.id)
            .order("submitted_at", { ascending: false })
            .limit(1)
            .single();
          if (sub?.status === "pending") setPremiumStatus("pending");
        }
      }
    };
    fetch();
  }, []);

  return {
    role,
    isPremium: role === "premium" || role === "admin" || role === "super_admin",
    isAdmin: role === "admin" || role === "super_admin",
    loading,
    expiresAt,
    premiumStatus,
  };
}

export async function upgradeToPremium() {
  if (typeof window === "undefined") return;
  window.location.href = "/member/premium";
}
