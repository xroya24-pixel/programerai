"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shield, User, Crown, Star, Search } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Refreshable } from "@/components/refreshable";

interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  role: string;
  avatar_url: string;
  created_at: string;
  last_sign_in_at: string;
}

const roles = ["member", "premium", "admin", "super_admin"] as const;

const roleConfig: Record<string, { label: string; icon: typeof Shield; color: string }> = {
  super_admin: { label: "Super Admin", icon: Crown, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  admin: { label: "Admin", icon: Shield, color: "text-primary bg-primary/10 border-primary/20" },
  premium: { label: "Premium", icon: Star, color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
  member: { label: "Member", icon: User, color: "text-muted-foreground bg-white/[0.04] border-white/[0.06]" },
};

export default function UsersPage() {
  return <Refreshable><UsersContent /></Refreshable>;
}

function UsersContent() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  const fetchUsers = async () => {
    setLoading(true);
    let q = createClient().from("profiles").select("*").order("created_at", { ascending: false });
    if (search) q = q.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`);
    if (filterRole !== "all") q = q.eq("role", filterRole);
    const { data } = await q;
    setUsers((data ?? []) as unknown as UserProfile[]);
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, [search, filterRole]);

  const updateRole = async (userId: string, newRole: string) => {
    await createClient().from("profiles").update({ role: newRole }).eq("id", userId);
    setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
  };

  const filtered = search || filterRole !== "all" ? users : users;
  const roleCounts = {
    all: users.length,
    member: users.filter(u => u.role === "member").length,
    premium: users.filter(u => u.role === "premium").length,
    admin: users.filter(u => u.role === "admin").length,
    super_admin: users.filter(u => u.role === "super_admin").length,
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground text-sm mt-1">{users.length} user terdaftar</p>
      </motion.div>

      <div className="flex flex-wrap gap-2">
        {(["all", "member", "premium", "admin", "super_admin"] as const).map(r => (
          <button key={r} onClick={() => setFilterRole(r)}
            className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${filterRole === r ? "bg-primary/10 text-primary border-primary/20" : "bg-[#0F172A] border-white/[0.06] text-muted-foreground hover:text-foreground"}`}>
            {r === "all" ? "Semua" : r === "super_admin" ? "Super Admin" : r.charAt(0).toUpperCase() + r.slice(1)} ({roleCounts[r]})
          </button>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari nama atau email..."
          className="w-full h-9 pl-9 pr-4 rounded-xl bg-[#0F172A] border border-white/[0.06] text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/30" />
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground py-8 text-center">Memuat...</p>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl bg-[#0F172A] border border-white/[0.06] p-12 text-center">
          <p className="text-sm text-muted-foreground">{users.length === 0 ? "Belum ada user." : "Tidak ada user yang cocok."}</p>
        </div>
      ) : (
        <div className="rounded-2xl bg-[#0F172A] border border-white/[0.06] overflow-hidden">
          <div className="hidden md:grid grid-cols-[1fr_140px_100px_140px_100px] gap-4 px-5 py-3 border-b border-white/[0.06] text-xs text-muted-foreground font-medium">
            <span>User</span><span>Role</span><span>Status</span><span>Bergabung</span><span>Login Terakhir</span>
          </div>
          {filtered.map((user, i) => {
            const cfg = roleConfig[user.role] ?? roleConfig.member;
            const Icon = cfg.icon;
            return (
              <motion.div key={user.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
                className="grid grid-cols-1 md:grid-cols-[1fr_140px_100px_140px_100px] gap-2 md:gap-4 px-5 py-3.5 border-b border-white/[0.04] last:border-0 items-center hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 border ${cfg.color}`}>
                    {user.avatar_url ? (
                      <img src={user.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                    ) : <Icon className="w-3.5 h-3.5" />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{user.full_name || "-"}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <select value={user.role} onChange={(e) => updateRole(user.id, e.target.value)}
                    className="h-7 px-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[10px] font-medium text-foreground appearance-none focus:outline-none focus:border-primary/30 cursor-pointer">
                    {roles.map(r => <option key={r} value={r} className="bg-[#0F172A]">{roleConfig[r].label}</option>)}
                  </select>
                </div>
                <span className={`hidden md:inline-flex text-[10px] px-2 py-0.5 rounded-md border w-fit ${cfg.color}`}>{cfg.label}</span>
                <span className="hidden md:inline text-xs text-muted-foreground">{new Date(user.created_at).toLocaleDateString("id-ID")}</span>
                <span className="hidden md:inline text-xs text-muted-foreground">{user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString("id-ID") : "-"}</span>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
