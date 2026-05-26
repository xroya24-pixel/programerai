"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Users, FileText, TrendingUp, ArrowUpRight, Activity } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Refreshable } from "@/components/refreshable";
import Link from "next/link";

interface Stats {
  totalCourses: number;
  totalLessons: number;
  totalUsers: number;
  totalPremium: number;
  publishedCourses: number;
  draftCourses: number;
}

interface RecentCourse {
  id: string;
  title: string;
  level: string;
  type: string;
  status: string;
  chapter_count: number;
  lesson_count: number;
  created_at: string;
}

interface RecentUser {
  id: string;
  full_name: string;
  email: string;
  role: string;
  created_at: string;
}

const defaultStats: Stats = {
  totalCourses: 0, totalLessons: 0, totalUsers: 0,
  totalPremium: 0, publishedCourses: 0, draftCourses: 0,
};

function timeAgo(date: string) {
  const s = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (s < 60) return "baru saja";
  if (s < 3600) return `${Math.floor(s / 60)} menit lalu`;
  if (s < 86400) return `${Math.floor(s / 3600)} jam lalu`;
  return `${Math.floor(s / 86400)} hari lalu`;
}

export default function AdminDashboard() {
  return <Refreshable><AdminDashboardInner /></Refreshable>;
}

function AdminDashboardInner() {
  const [stats, setStats] = useState<Stats>(defaultStats);
  const [recentCourses, setRecentCourses] = useState<RecentCourse[]>([]);
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const supabase = createClient();
    const [courseCount, lessonCount, userCount, premiumCount, published, drafts, courses, users] = await Promise.all([
      supabase.from("courses").select("id", { count: "exact", head: true }),
      supabase.from("lessons").select("id", { count: "exact", head: true }),
      supabase.from("profiles").select("id", { count: "exact", head: true }),
      supabase.from("profiles").select("id", { count: "exact", head: true }).eq("role", "premium"),
      supabase.from("courses").select("id", { count: "exact", head: true }).eq("status", "published"),
      supabase.from("courses").select("id", { count: "exact", head: true }).eq("status", "draft"),
      supabase.from("courses").select("id, title, level, type, status, created_at").order("created_at", { ascending: false }).limit(5),
      supabase.from("profiles").select("id, full_name, email, role, created_at").order("created_at", { ascending: false }).limit(5),
    ]);
    setStats({
      totalCourses: courseCount.count ?? 0,
      totalLessons: lessonCount.count ?? 0,
      totalUsers: userCount.count ?? 0,
      totalPremium: premiumCount.count ?? 0,
      publishedCourses: published.count ?? 0,
      draftCourses: drafts.count ?? 0,
    });
    setRecentCourses((courses.data ?? []) as unknown as RecentCourse[]);
    setRecentUsers((users.data ?? []) as unknown as RecentUser[]);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const statCards = [
    { label: "Total Courses", value: stats.totalCourses, icon: BookOpen, sub: `${stats.publishedCourses} published`, color: "text-blue-400", bg: "bg-gradient-to-br from-blue-500/10 to-transparent", border: "border-blue-500/10" },
    { label: "Total Lessons", value: stats.totalLessons, icon: FileText, sub: "materi aktif", color: "text-purple-400", bg: "bg-gradient-to-br from-purple-500/10 to-transparent", border: "border-purple-500/10" },
    { label: "Total Users", value: stats.totalUsers, icon: Users, sub: `${stats.totalPremium} premium`, color: "text-emerald-400", bg: "bg-gradient-to-br from-emerald-500/10 to-transparent", border: "border-emerald-500/10" },
    { label: "Premium Users", value: stats.totalPremium, icon: TrendingUp, sub: `${stats.totalUsers > 0 ? Math.round((stats.totalPremium / stats.totalUsers) * 100) : 0}% dari total`, color: "text-amber-400", bg: "bg-gradient-to-br from-amber-500/10 to-transparent", border: "border-amber-500/10" },
  ];

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Overview platform ProgramerAI.</p>
      </motion.div>

      {loading ? (
        <p className="text-sm text-muted-foreground py-8 text-center">Memuat...</p>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}
                  className={`rounded-2xl bg-[#0F172A] border ${stat.border} p-5 hover:border-white/[0.1] transition-all duration-300 relative overflow-hidden`}>
                  <div className={`absolute inset-0 ${stat.bg} pointer-events-none`} />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2 rounded-lg border ${stat.border} ${stat.bg}`}>
                        <Icon className={`w-4 h-4 ${stat.color}`} />
                      </div>
                      <ArrowUpRight className={`w-4 h-4 ${stat.color} opacity-40`} />
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold tracking-tight">{stat.value}</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">{stat.sub}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {stats.totalCourses === 0 && (
            <div className="rounded-2xl bg-[#0F172A] border border-white/[0.04] p-8 text-center">
              <p className="text-sm text-muted-foreground mb-4">Belum ada data. Seed database untuk development.</p>
              <Link href="/admin/seed"
                className="inline-flex items-center gap-2 h-9 px-5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium transition-all">
                <Activity className="w-4 h-4" /> Seed Data
              </Link>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="rounded-2xl bg-[#0F172A] border border-white/[0.06] p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold">Kursus Terbaru</h2>
                <Link href="/admin/courses" className="text-xs text-primary hover:text-primary/80">Lihat Semua</Link>
              </div>
              {recentCourses.length === 0 ? (
                <p className="text-xs text-muted-foreground py-4 text-center">Belum ada kursus.</p>
              ) : (
                <div className="space-y-2">
                  {recentCourses.map((course) => (
                    <Link key={course.id} href={`/admin/courses/${course.id}`}
                      className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-white/[0.02] transition-colors group">
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">{course.title}</p>
                        <p className="text-xs text-muted-foreground/50">{course.level} · {course.type}</p>
                      </div>
                      <span className="text-[10px] text-muted-foreground/40 shrink-0">{timeAgo(course.created_at)}</span>
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="rounded-2xl bg-[#0F172A] border border-white/[0.06] p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold">User Terbaru</h2>
                <Link href="/admin/users" className="text-xs text-primary hover:text-primary/80">Lihat Semua</Link>
              </div>
              {recentUsers.length === 0 ? (
                <p className="text-xs text-muted-foreground py-4 text-center">Belum ada user.</p>
              ) : (
                <div className="space-y-2">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between py-2 px-3 rounded-xl">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-[9px] font-semibold text-primary shrink-0">
                          {(user.full_name || user.email).charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{user.full_name || "-"}</p>
                          <p className="text-xs text-muted-foreground/50 truncate">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded border ${user.role === "premium" ? "bg-purple-500/10 text-purple-400 border-purple-500/20" : "bg-white/[0.04] text-muted-foreground border-white/[0.06]"}`}>
                          {user.role}
                        </span>
                        <span className="text-[10px] text-muted-foreground/40">{timeAgo(user.created_at)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
}
