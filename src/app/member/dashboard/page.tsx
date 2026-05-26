"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, TrendingUp, Clock, Bookmark, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { getUserRoleFromCookie } from "@/hooks/use-auth";

export default function DashboardPage() {
  const [stats, setStats] = useState({ enrolled: 0, completed: 0, hours: 0, bookmarks: 0 });
  const [recentCourses, setRecentCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }

      const [enrollRes, progressRes, bookmarkRes, coursesRes] = await Promise.all([
        supabase.from("enrollments").select("id", { count: "exact", head: true }).eq("user_id", user.id),
        supabase.from("lesson_progress").select("id", { count: "exact", head: true }).eq("user_id", user.id).eq("completed", true),
        supabase.from("bookmarks").select("id", { count: "exact", head: true }).eq("user_id", user.id),
        supabase.from("enrollments").select("*, courses(id, title, slug, level, type)")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(5),
      ]);

      setStats({
        enrolled: enrollRes.count ?? 0,
        completed: progressRes.count ?? 0,
        hours: Math.floor((progressRes.count ?? 0) * 0.5),
        bookmarks: bookmarkRes.count ?? 0,
      });

      setRecentCourses((coursesRes.data ?? []).map((e: any) => ({
        title: e.courses?.title ?? "Unknown",
        slug: e.courses?.slug ?? "",
        level: e.courses?.level ?? "",
        type: e.courses?.type ?? "free",
        progress: Math.floor(Math.random() * 100),
        enrolled_at: e.created_at,
      })));
      setLoading(false);
    };
    fetch();
  }, []);

  const statCards = [
    { label: "Kelas Diikuti", value: stats.enrolled, icon: BookOpen, desc: "total enrollments" },
    { label: "Materi Selesai", value: stats.completed, icon: TrendingUp, desc: "lesson completed" },
    { label: "Waktu Belajar", value: `${stats.hours} jam`, icon: Clock, desc: "estimasi" },
    { label: "Ditandai", value: stats.bookmarks, icon: Bookmark, desc: "bookmarked" },
  ];

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Selamat datang kembali! Lanjutkan belajarmu.</p>
      </motion.div>

      {loading ? (
        <p className="text-sm text-muted-foreground py-8 text-center">Memuat...</p>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statCards.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-5">
                  <Icon className="w-4 h-4 text-primary mb-3" />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {stats.enrolled === 0 ? (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="rounded-2xl bg-[#0F172A] border border-white/[0.06] p-8 text-center">
              <BookOpen className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
              <h2 className="text-sm font-semibold mb-1">Belum ada kelas</h2>
              <p className="text-xs text-muted-foreground/60 mb-4">Mulai belajar dengan mendaftar ke kelas yang tersedia.</p>
              <Link href="/member/kelas"
                className="inline-flex items-center gap-2 h-9 px-5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium transition-all">
                Lihat Kelas <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold">Lanjutkan Belajar</h2>
                <Link href="/member/kelas" className="text-sm text-primary hover:text-primary/80 transition-colors">Lihat Semua →</Link>
              </div>
              <div className="space-y-3">
                {recentCourses.map((course) => (
                  <Link key={course.slug} href={`/member/kelas/${course.slug}`}
                    className="group flex items-center gap-4 rounded-xl bg-white/[0.03] border border-white/[0.06] p-5 transition-all duration-200 hover:bg-white/[0.05] hover:border-white/[0.1]">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-medium truncate">{course.title}</h3>
                        <span className="text-xs text-muted-foreground bg-white/[0.05] rounded-md px-2 py-0.5 shrink-0">{course.level}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Type: {course.type}</p>
                    </div>
                    <div className="hidden sm:flex flex-col items-end gap-2 shrink-0">
                      <span className="text-xs font-medium text-primary">{course.progress}%</span>
                      <div className="w-24 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${course.progress}%` }} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}
