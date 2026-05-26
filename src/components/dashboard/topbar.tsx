"use client";

import { Search, Bell, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function Topbar() {
  const router = useRouter();

  const handleLogout = async () => {
    document.cookie = "opencode_session=;path=/;max-age=0";
    try { await createClient().auth.signOut(); } catch {}
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-white/[0.06] bg-[#060816]/80 backdrop-blur-xl">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari kelas atau materi..."
            className="w-full h-9 pl-9 pr-4 rounded-lg bg-white/[0.04] border border-white/[0.06] text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/20 transition-all"
          />
        </div>

        <div className="flex items-center gap-3 ml-6">
          <button className="relative flex items-center justify-center w-9 h-9 rounded-lg hover:bg-white/[0.04] text-muted-foreground transition-colors">
            <Bell className="w-[18px] h-[18px]" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-primary" />
          </button>

          <div className="hidden md:flex items-center gap-3 pl-3 border-l border-white/[0.06]">
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-xs font-semibold text-primary">
              A
            </div>
          </div>

          <button onClick={handleLogout} title="Logout"
            className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-400 transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
