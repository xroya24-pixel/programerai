"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Bookmark,
  User,
  Terminal,
  ChevronLeft,
  ChevronRight,
  LogOut,
  MessageCircle,
  Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

import { useUserRole } from "@/hooks/use-auth";

const baseLinks = [
  { label: "Dashboard", href: "/member/dashboard", icon: LayoutDashboard },
  { label: "Semua Kelas", href: "/member/kelas", icon: BookOpen },
  { label: "Progress", href: "/member/progress", icon: BarChart3 },
  { label: "Bookmark", href: "/member/bookmark", icon: Bookmark },
  { label: "Profile", href: "/member/profile", icon: User },
  { label: "Live Chat", href: "/member/chat", icon: MessageCircle },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const { isPremium } = useUserRole();

  const sidebarLinks = isPremium
    ? baseLinks
    : baseLinks.filter((l) => l.href !== "/member/chat");

  const handleLogout = async () => {
    document.cookie = "opencode_session=;path=/;max-age=0";
    try { await createClient().auth.signOut(); } catch {}
    router.push("/login");
  };

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 h-full z-40 border-r border-white/[0.06] bg-[#060816] flex flex-col transition-all duration-300",
        collapsed ? "w-[68px]" : "w-[240px]"
      )}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-white/[0.06]">
        <Link href="/" className="flex items-center gap-2.5 overflow-hidden">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 shrink-0">
            <Terminal className="w-4 h-4 text-primary" />
          </div>
          {!collapsed && (
            <span className="text-lg font-semibold tracking-tight whitespace-nowrap">
              ProgramerAI
            </span>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex items-center justify-center w-7 h-7 rounded-md hover:bg-white/5 text-muted-foreground transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/[0.03]"
              )}
            >
              <Icon className="w-[18px] h-[18px] shrink-0" />
              {!collapsed && <span className="whitespace-nowrap">{link.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-3 border-t border-white/[0.06]">
        <button onClick={handleLogout}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 w-full">
          <LogOut className="w-[18px] h-[18px] shrink-0" />
          {!collapsed && <span className="whitespace-nowrap">Logout</span>}
        </button>
      </div>

      <div className="px-3 py-4 border-t border-white/[0.06]">
        {!collapsed && (
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-xs font-semibold text-primary">
              A
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium truncate">Anonymous</span>
              <span className="text-xs text-muted-foreground truncate">anonymous@email.com</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
