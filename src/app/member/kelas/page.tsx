"use client";

import { motion } from "framer-motion";
import { BookOpen, Lock, Crown, Unlock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useUserRole, upgradeToPremium } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  level: string;
  type: string;
  categories?: { title: string };
}

interface Enrollment {
  course_id: string;
  progress: number;
}

export default function KelasPage() {
  const { role, isPremium, loading: roleLoading } = useUserRole();
  const [upgrading, setUpgrading] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data: user } = await supabase.auth.getUser();
      const [coursesRes, enrollRes] = await Promise.all([
        supabase.from("courses")
          .select("*, categories(title)")
          .eq("status", "published")
          .order("created_at", { ascending: true }),
        user?.user
          ? supabase.from("enrollments").select("course_id, progress").eq("user_id", user.user.id)
          : Promise.resolve({ data: [] }),
      ]);
      setCourses((coursesRes.data ?? []) as unknown as Course[]);
      setEnrollments((enrollRes.data ?? []) as unknown as Enrollment[]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleUpgrade = async () => {
    setUpgrading(true);
    await upgradeToPremium();
    setUpgrading(false);
    router.refresh();
  };

  const getProgress = (courseId: string) => enrollments.find(e => e.course_id === courseId)?.progress ?? 0;

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold tracking-tight">Semua Kelas</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {isPremium ? "Akses semua materi premium." : "Tingkatkan ke Premium untuk akses semua kelas."}
        </p>
      </motion.div>

      {!isPremium && !roleLoading && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-gradient-to-br from-primary/[0.06] to-transparent border border-primary/20 p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/[0.04] rounded-full blur-3xl pointer-events-none" />
          <div className="relative flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10 border border-primary/20"><Crown className="w-5 h-5 text-primary" /></div>
              <div>
                <h3 className="text-sm font-semibold">Upgrade ke Premium</h3>
                <p className="text-xs text-muted-foreground/70 mt-0.5">Akses kelas premium, realtime chat, dan fitur eksklusif lainnya.</p>
              </div>
            </div>
            <button onClick={handleUpgrade} disabled={upgrading}
              className="shrink-0 h-9 px-5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(99,102,241,0.15)] hover:shadow-[0_0_30px_rgba(99,102,241,0.25)]">
              {upgrading ? "Memproses..." : "Upgrade Now"}
            </button>
          </div>
        </motion.div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      ) : courses.length === 0 ? (
        <div className="rounded-2xl bg-[#0F172A] border border-white/[0.04] p-12 text-center">
          <BookOpen className="w-8 h-8 text-muted-foreground/20 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground/70">Belum ada kelas tersedia.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course, i) => {
            const locked = course.type === "premium" && !isPremium;
            const progress = getProgress(course.id);
            const colors = ["from-indigo-500/20 to-blue-500/10", "from-cyan-500/20 to-teal-500/10", "from-blue-500/20 to-indigo-500/10", "from-gray-500/20 to-indigo-500/10", "from-emerald-500/20 to-teal-500/10", "from-yellow-500/20 to-orange-500/10"];
            return (
              <motion.div key={course.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.03 }}
                onClick={() => { if (!locked) router.push(`/member/kelas/${course.slug}`); }}
                className={cn(
                  "relative rounded-2xl bg-[#0F172A] border border-white/[0.04] p-5 transition-all duration-300 overflow-hidden group cursor-pointer",
                  locked ? "opacity-70 hover:opacity-80" : "hover:border-white/[0.08] hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(99,102,241,0.04)]"
                )}>
                <div className={cn("absolute inset-0 bg-gradient-to-br opacity-40 pointer-events-none", colors[i % colors.length])} />
                <div className="relative">
                  <div className="flex items-start justify-between mb-3">
                    <div className={cn("px-2 py-0.5 rounded-md text-[10px] font-medium border",
                      course.type === "premium"
                        ? "bg-primary/10 text-primary border-primary/20"
                        : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    )}>
                      {course.type === "premium" ? "Premium" : "Free"}
                    </div>
                    {locked && <Lock className="w-4 h-4 text-muted-foreground/40" />}
                    {course.type === "premium" && isPremium && <Unlock className="w-4 h-4 text-primary" />}
                  </div>
                  <h3 className="text-sm font-semibold mb-1">{course.title}</h3>
                  <p className="text-xs text-muted-foreground/60 mb-3">{course.categories?.title ?? ""} · {course.level}</p>
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground/40">
                    {progress > 0 && (
                      <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {progress}%</span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
