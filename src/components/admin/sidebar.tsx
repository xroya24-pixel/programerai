"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  CreditCard,
  Home,
  Settings,
  Terminal,
  Database,
  LogOut,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Menu,
  Sprout,
  MessageCircle,
  Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const sections = [
  {
    label: "MAIN",
    items: [
      { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
      { label: "Courses", href: "/admin/courses", icon: BookOpen },
      { label: "Users", href: "/admin/users", icon: Users },
    ],
  },
  {
    label: "MANAGEMENT",
    items: [
      { label: "Payments", href: "/admin/payments", icon: CreditCard },
      { label: "Premium", href: "/admin/premium", icon: Crown },
      { label: "Live Support", href: "/admin/support", icon: MessageCircle },
      { label: "Homepage", href: "/admin/homepage", icon: Home },
      { label: "Database", href: "/admin/database", icon: Database },
    ],
  },
  {
    label: "SYSTEM",
    items: [
      { label: "Settings", href: "/admin/settings", icon: Settings },
      { label: "Seed Data", href: "/admin/seed", icon: Sprout },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    document.cookie = "opencode_session=;path=/;max-age=0";
    try { await createClient().auth.signOut(); } catch {}
    router.push("/login");
  };

  const isActive = (href: string) =>
    href === "/admin/dashboard" ? pathname === "/admin/dashboard" || pathname === "/admin" : pathname.startsWith(href);

  const navContent = (
    <nav className="flex-1 overflow-y-auto px-2.5 py-3 space-y-5">
      {sections.map((section) => (
        <div key={section.label}>
          {!collapsed && (
            <p className="px-2.5 pb-1 text-[9px] font-semibold tracking-[0.15em] uppercase text-muted-foreground/25">
              {section.label}
            </p>
          )}
          <div className="space-y-0.5">
            {section.items.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-all duration-200 relative",
                    active
                      ? "bg-primary/[0.08] text-primary shadow-[inset_0_0_0_1px_rgba(99,102,241,0.06)]"
                      : "text-muted-foreground/60 hover:text-foreground hover:bg-white/[0.02]"
                  )}
                >
                  <div className={cn(
                    "flex items-center justify-center w-[18px] h-[18px] shrink-0",
                    active && "drop-shadow-[0_0_5px_rgba(99,102,241,0.3)]"
                  )}>
                    <Icon className={cn("w-[18px] h-[18px]", active && "text-primary")} />
                  </div>
                  {!collapsed && <span className="whitespace-nowrap text-[13px]">{link.label}</span>}
                  {active && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded-full bg-primary shadow-[0_0_6px_rgba(99,102,241,0.4)]" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-2.5 left-2.5 z-50 flex items-center justify-center w-8 h-8 rounded-lg bg-[#0F172A] border border-white/[0.06] text-foreground shadow-lg"
      >
        <Menu className="w-4 h-4" />
      </button>

      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 h-full z-40 flex flex-col transition-all duration-300",
          "bg-[#0F172A]/95 backdrop-blur-xl border-r border-white/[0.04]",
          collapsed ? "w-[60px]" : "w-[220px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className={cn(
          "flex items-center border-b border-white/[0.04] shrink-0",
          collapsed ? "h-12 justify-center px-2" : "h-12 px-3.5"
        )}>
          <Link href="/" className="flex items-center gap-2.5 overflow-hidden">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 shrink-0 shadow-[0_0_10px_rgba(99,102,241,0.06)]">
              <Terminal className="w-3.5 h-3.5 text-primary" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-semibold tracking-tight leading-tight">ProgramerAI</span>
                <span className="text-[8px] text-muted-foreground/25 font-medium tracking-widest">ADMIN</span>
              </div>
            )}
          </Link>
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="ml-auto flex items-center justify-center w-5 h-5 rounded hover:bg-white/5 text-muted-foreground/30 hover:text-muted-foreground transition-all"
            >
              <ChevronLeft className="w-3 h-3" />
            </button>
          )}
          {collapsed && (
            <button
              onClick={() => setCollapsed(false)}
              className="flex items-center justify-center w-5 h-5 rounded hover:bg-white/5 text-muted-foreground/30 hover:text-muted-foreground transition-all"
            >
              <ChevronRight className="w-3 h-3" />
            </button>
          )}
        </div>

        {navContent}

        {/* Footer */}
        <div className="px-2.5 py-2.5 border-t border-white/[0.04] space-y-0.5 shrink-0">
          <Link href="/"
            className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-muted-foreground/40 hover:text-foreground hover:bg-white/[0.02] transition-all duration-200">
            <ExternalLink className="w-[18px] h-[18px] shrink-0" />
            {!collapsed && <span className="whitespace-nowrap text-[13px]">Website</span>}
          </Link>
          <button onClick={handleLogout}
            className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-muted-foreground/40 hover:text-red-400 hover:bg-red-500/8 transition-all duration-200 w-full">
            <LogOut className="w-[18px] h-[18px] shrink-0" />
            {!collapsed && <span className="whitespace-nowrap text-[13px]">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
