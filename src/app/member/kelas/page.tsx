"use client";

import { motion } from "framer-motion";
import { BookOpen, Crown, Code, Server, Brain, Rocket, Sparkles, Zap } from "lucide-react";
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

const catMap: Record<string, { icon: typeof Code; color: string }> = {
  "Frontend Development": { icon: Code, color: "from-sky-500/20 to-indigo-500/10" },
  "Backend Development": { icon: Server, color: "from-emerald-500/20 to-teal-500/10" },
  "AI Programming": { icon: Brain, color: "from-purple-500/20 to-pink-500/10" },
  "DevOps & Deploy": { icon: Rocket, color: "from-orange-500/20 to-amber-500/10" },
};

export default function KelasPage() {
  const { isPremium, loading: roleLoading } = useUserRole();
  const [upgrading, setUpgrading] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data: user } = await supabase.auth.getUser();
      const [coursesRes, enrollRes] = await Promise.all([
        supabase.from("courses")
          .select("*, categories(title)")
          .eq("status", "published")
          .order("sort_order", { ascending: true, nullsFirst: false }),
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

  const grouped: Record<string, Course[]> = {};
  const catOrder: string[] = [];
  courses.forEach((c) => {
    const t = c.categories?.title ?? "Lainnya";
    if (!grouped[t]) { grouped[t] = []; catOrder.push(t); }
    grouped[t].push(c);
  });

  const selectedCat = activeCat ?? catOrder[0] ?? null;
  const filteredCourses = selectedCat ? grouped[selectedCat] ?? [] : [];

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
        <>
          {/* AI E-Course quick access */}
          {catOrder.some(c => c.toLowerCase().includes("ai")) && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 p-3.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold">AI E-Course</p>
                  <p className="text-[10px] text-muted-foreground/60">Kelas programming dengan AI</p>
                </div>
              </div>
              <button onClick={() => setActiveCat(catOrder.find(c => c.toLowerCase().includes("ai")) ?? null)}
                className="shrink-0 h-7 px-3 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 text-[10px] font-medium transition-all border border-purple-500/20">
                Lihat
              </button>
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {catOrder.map((cat) => {
              const m = catMap[cat] ?? { icon: BookOpen, color: "from-gray-500/20 to-indigo-500/10" };
              const Icon = m.icon;
              const active = activeCat === cat;
              return (
                <button key={cat} onClick={() => setActiveCat(active ? null : cat)}
                  className={cn(
                    "rounded-2xl border p-4 text-left transition-all duration-200 relative overflow-hidden group",
                    active ? "bg-primary/10 border-primary/20" : "bg-[#0F172A] border-white/[0.04] hover:border-white/[0.08]"
                  )}>
                  <div className={cn("absolute inset-0 bg-gradient-to-br opacity-30 pointer-events-none", m.color)} />
                  <div className="relative">
                    <div className={cn(
                      "flex items-center justify-center w-9 h-9 rounded-xl border mb-2.5",
                      active ? "bg-primary/10 border-primary/20" : "bg-white/[0.04] border-white/[0.06]"
                    )}>
                      <Icon className={cn("w-4 h-4", active ? "text-primary" : "text-muted-foreground/60")} />
                    </div>
                    <p className="text-sm font-semibold">{cat}</p>
                    <p className="text-xs text-muted-foreground/50 mt-0.5">{grouped[cat].length} kelas</p>
                  </div>
                </button>
              );
            })}
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredCourses.length === 0 ? (
              <div className="col-span-full rounded-2xl bg-[#0F172A] border border-white/[0.04] p-12 text-center">
                <BookOpen className="w-8 h-8 text-muted-foreground/20 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground/70">Belum ada kelas di kategori ini.</p>
              </div>
            ) : (
              filteredCourses.map((course, i) => {
                const progress = getProgress(course.id);
                return (
                  <motion.div key={course.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.03 }}
                    onClick={() => router.push(`/member/kelas/${course.slug}`)}
                    className="rounded-xl bg-[#0F172A] border border-white/[0.04] p-3.5 transition-all duration-200 cursor-pointer hover:border-white/[0.08] hover:-translate-y-0.5">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-sm font-semibold leading-snug">{course.title}</h3>
                      {course.type === "premium" && (
                        <span className="shrink-0 px-1.5 py-[2px] rounded text-[8px] font-semibold border leading-none bg-primary/10 text-primary border-primary/20">
                          Premium
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-muted-foreground/50">{course.level}</p>
                    {progress > 0 && (
                      <div className="mt-2.5 h-1 rounded-full bg-white/[0.04] overflow-hidden">
                        <div className="h-full rounded-full bg-primary/40" style={{ width: `${progress}%` }} />
                      </div>
                    )}
                  </motion.div>
                );
              })
            )}
          </div>
        </>
      )}
    </div>
  );
}
