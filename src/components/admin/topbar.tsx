"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Search, Bell, LogOut, ChevronRight, Plus, Command } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function AdminTopbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [initials, setInitials] = useState("A");

  useEffect(() => {
    const match = document.cookie.match(/(?:^| )opencode_session=([^;]*)/);
    if (match) {
      try {
        const { email } = JSON.parse(decodeURIComponent(match[1]));
        setInitials(email.split("@")[0].slice(0, 2).toUpperCase());
      } catch {}
    }
  }, []);

  const handleLogout = async () => {
    document.cookie = "opencode_session=;path=/;max-age=0";
    try { await createClient().auth.signOut(); } catch {}
    router.push("/login");
  };

  const segments = pathname.split("/").filter(Boolean).map((s, i, arr) => ({
    label: s === "admin" ? "Home" : s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, " "),
    href: "/" + arr.slice(0, i + 1).join("/"),
    isLast: i === arr.length - 1,
  }));

  return (
    <header className="sticky top-0 z-30 h-12 border-b border-white/[0.04] bg-[#060816]/80 backdrop-blur-xl">
      <div className="h-full px-4 lg:px-6 flex items-center justify-between gap-3">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground/50 min-w-0">
          {segments.map((s) => (
            <span key={s.href} className="flex items-center gap-1.5">
              {!s.isLast ? (
                <button onClick={() => router.push(s.href)} className="hover:text-foreground transition-colors truncate">{s.label}</button>
              ) : (
                <span className="text-foreground/70 font-medium truncate">{s.label}</span>
              )}
              {!s.isLast && <ChevronRight className="w-2.5 h-2.5 shrink-0" />}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          {/* Search */}
          <div className="relative max-w-[180px]">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground/30" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full h-7 pl-7.5 pr-2 rounded-md bg-white/[0.04] border border-white/[0.06] text-[11px] text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/30 transition-all"
            />
            <div className="absolute right-1.5 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-0.5 text-[8px] text-muted-foreground/20">
              <Command className="w-2.5 h-2.5" /><span>K</span>
            </div>
          </div>

          {/* Quick create */}
          <button
            onClick={() => router.push("/admin/courses/new")}
            className="flex items-center justify-center w-7 h-7 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
          >
            <Plus className="w-3 h-3" />
          </button>

          {/* Notifications */}
          <button className="relative flex items-center justify-center w-7 h-7 rounded-md hover:bg-white/[0.04] text-muted-foreground/50 hover:text-foreground transition-colors">
            <Bell className="w-3.5 h-3.5" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary ring-1 ring-[#060816]" />
          </button>

          {/* Profile */}
          <div className="flex items-center gap-1.5 pl-2 border-l border-white/[0.06]">
            <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-[9px] font-semibold text-primary">
              {initials}
            </div>
            <button onClick={handleLogout} className="p-1 rounded-md hover:bg-red-500/10 text-muted-foreground/30 hover:text-red-400 transition-colors" title="Logout">
              <LogOut className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
