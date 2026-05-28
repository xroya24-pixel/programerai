"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronLeft, CheckCircle2, Circle, Play, Clock, ArrowRight, Crown, Lock, BookOpen, Bookmark, BookmarkCheck } from "lucide-react";
import { useUserRole, upgradeToPremium } from "@/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";

interface Lesson {
  id: string;
  title: string;
  duration: number;
  sort_order: number;
  chapter_id: string;
  content?: string;
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function renderTiptap(json: string): string {
  try {
    const doc = JSON.parse(json);
    return (doc.content ?? []).map((node: any): string => {
      if (node.type === "paragraph") {
        const text = (node.content ?? []).map((n: any) => {
          let t = escapeHtml(n.text ?? "");
          if (n.marks) {
            n.marks.forEach((m: any) => {
              if (m.type === "bold") t = `<strong>${t}</strong>`;
              if (m.type === "italic") t = `<em>${t}</em>`;
              if (m.type === "code") t = `<code>${t}</code>`;
              if (m.type === "link") t = `<a href="${escapeHtml(m.attrs?.href ?? "#")}" target="_blank">${t}</a>`;
            });
          }
          return t;
        }).join("");
        return `<p>${text}</p>`;
      }
      if (node.type === "heading") {
        const tag = `h${node.attrs?.level ?? 2}`;
        const text = (node.content ?? []).map((n: any) => escapeHtml(n.text ?? "")).join("");
        return `<${tag}>${text}</${tag}>`;
      }
      if (node.type === "codeBlock") {
        const lang = node.attrs?.language ?? "";
        const code = (node.content ?? []).map((n: any) => n.text ?? "").join("");
        return `<pre class="relative"><div class="flex items-center justify-between px-4 py-1.5 text-[10px] text-muted-foreground/40 border-b border-white/[0.04]">${lang ? `<span>${escapeHtml(lang)}</span>` : ""}<button class="copy-btn" data-code="${escapeHtml(code)}">Salin</button></div><code class="block p-4 text-sm font-mono leading-relaxed">${escapeHtml(code)}</code></pre>`;
      }
      if (node.type === "bulletList") {
        const items = (node.content ?? []).map((n: any) => {
          const text = (n.content ?? []).map((c: any) => (c.content ?? []).map((t: any) => escapeHtml(t.text ?? "")).join("")).join("");
          return `<li>${text}</li>`;
        }).join("");
        return `<ul>${items}</ul>`;
      }
      if (node.type === "orderedList") {
        const items = (node.content ?? []).map((n: any) => {
          const text = (n.content ?? []).map((c: any) => (c.content ?? []).map((t: any) => escapeHtml(t.text ?? "")).join("")).join("");
          return `<li>${text}</li>`;
        }).join("");
        return `<ol>${items}</ol>`;
      }
      if (node.type === "youtube") {
        const id = node.attrs?.id ?? "";
        return `<div class="aspect-video rounded-xl overflow-hidden my-4"><iframe src="https://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen class="w-full h-full"></iframe></div>`;
      }
      return "";
    }).join("");
  } catch { return ""; }
}

interface Chapter {
  id: string;
  title: string;
  sort_order: number;
  lessons: Lesson[];
}

interface CourseData {
  id: string;
  title: string;
  slug: string;
  description: string;
  level: string;
  type: string;
  categories?: { title: string };
  chapters: Chapter[];
}

export default function LessonPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { isPremium, loading: roleLoading } = useUserRole();
  const [upgrading, setUpgrading] = useState(false);
  const [course, setCourse] = useState<CourseData | null>(null);
  const [progress, setProgress] = useState<Set<string>>(new Set());
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [completing, setCompleting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data: user } = await supabase.auth.getUser();

      const { data: courseData } = await supabase
        .from("courses")
        .select("*, categories(title), chapters(*, lessons(*))")
        .eq("slug", slug)
        .order("sort_order", { referencedTable: "chapters", ascending: true })
        .order("sort_order", { referencedTable: "chapters.lessons", ascending: true })
        .single();

      if (courseData) {
        const c = courseData as unknown as CourseData;
        c.chapters = (courseData as any).chapters ?? [];
        setCourse(c);
        if (c.chapters.length > 0 && c.chapters[0].lessons.length > 0) {
          setActiveLessonId(c.chapters[0].lessons[0].id);
        }
      }

      if (user?.user) {
        const [progRes, bmRes] = await Promise.all([
          supabase.from("lesson_progress").select("lesson_id").eq("user_id", user.user.id),
          supabase.from("bookmarks").select("lesson_id").eq("user_id", user.user.id),
        ]);
        setProgress(new Set((progRes.data ?? []).map((p: any) => p.lesson_id)));
        setBookmarks(new Set((bmRes.data ?? []).map((b: any) => b.lesson_id)));
      }

      setLoading(false);
    };
    fetchData();
  }, [slug]);

  const handleUpgrade = async () => {
    setUpgrading(true);
    await upgradeToPremium();
    setUpgrading(false);
  };

  const handleToggleComplete = async (lessonId: string) => {
    setCompleting(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !course) { setCompleting(false); return; }

    const isCompleted = progress.has(lessonId);

    if (isCompleted) {
      await supabase.from("lesson_progress").delete().eq("user_id", user.id).eq("lesson_id", lessonId);
    } else {
      await supabase.from("lesson_progress").upsert({
        user_id: user.id,
        lesson_id: lessonId,
        completed: true,
        completed_at: new Date().toISOString(),
      }, { onConflict: "user_id,lesson_id" });
    }

    const newProgress = new Set(progress);
    if (isCompleted) newProgress.delete(lessonId);
    else newProgress.add(lessonId);
    setProgress(newProgress);

    const allCourseLessons = course?.chapters.flatMap(c => c.lessons) ?? [];
    const newCompleted = newProgress.size;
    const total = allCourseLessons.length;
    const pct = total > 0 ? Math.round((newCompleted / total) * 100) : 0;

    await supabase.from("enrollments").upsert({
      user_id: user.id,
      course_id: course.id,
      progress: pct,
    }, { onConflict: "user_id,course_id" });

    setCompleting(false);
  };

  const handleToggleBookmark = async (lessonId: string) => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const isBookmarked = bookmarks.has(lessonId);

    if (isBookmarked) {
      await supabase.from("bookmarks").delete().eq("user_id", user.id).eq("lesson_id", lessonId);
    } else {
      await supabase.from("bookmarks").insert({ user_id: user.id, lesson_id: lessonId });
    }

    const newBookmarks = new Set(bookmarks);
    if (isBookmarked) newBookmarks.delete(lessonId);
    else newBookmarks.add(lessonId);
    setBookmarks(newBookmarks);
  };

  const allLessons = course?.chapters.flatMap(c => c.lessons) ?? [];
  const completedCount = allLessons.filter(l => progress.has(l.id)).length;
  const totalLessons = allLessons.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  const currentLesson = allLessons.find(l => l.id === activeLessonId);
  const locked = course?.type === "premium" && !isPremium;

  if (loading || roleLoading) {
    return (
      <div className="-m-6 md:-m-8 h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="-m-6 md:-m-8 h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-10 h-10 text-muted-foreground/20 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground/70">Kelas tidak ditemukan.</p>
          <Link href="/member/kelas" className="text-xs text-primary hover:text-primary/80 mt-2 inline-block">Kembali ke kelas</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="-m-6 md:-m-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
        className="flex flex-col lg:flex-row h-[calc(100vh-4rem)]">
        {/* Left sidebar */}
        <aside className="w-full lg:w-[280px] border-r border-white/[0.06] bg-[#060816] flex flex-col shrink-0">
          <div className="h-12 border-b border-white/[0.06] flex items-center px-4 gap-2 shrink-0">
            <Link href="/member/kelas" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft className="w-3.5 h-3.5" /> Kembali
            </Link>
          </div>
          <div className="p-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-sm font-semibold">{course.title}</h2>
              {course.type === "premium" && <Crown className="w-3.5 h-3.5 text-primary" />}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{completedCount}/{totalLessons} materi selesai</p>
            <div className="mt-2.5 w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
              <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto py-2">
            {course.chapters.map((chapter) => (
              <div key={chapter.id}>
                <div className="px-4 py-2 text-[10px] font-medium text-muted-foreground/30 uppercase tracking-wider">
                  {chapter.title}
                </div>
                {chapter.lessons.map((lesson) => (
                  <button key={lesson.id} onClick={() => !locked && setActiveLessonId(lesson.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-all duration-150",
                      lesson.id === activeLessonId && !locked
                        ? "bg-primary/10 text-foreground border-r-2 border-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/[0.02]"
                    )}>
                    {progress.has(lesson.id) ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      : <Circle className="w-4 h-4 text-muted-foreground/40 shrink-0" />}
                    <span className="truncate flex-1">{lesson.title}</span>
                    {lesson.duration > 0 && (
                      <span className="flex items-center gap-1 text-[10px] text-muted-foreground/60 shrink-0">
                        <Clock className="w-2.5 h-2.5" />{lesson.duration}m
                      </span>
                    )}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 overflow-y-auto relative">
          {locked ? (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-[#060816]/80 backdrop-blur-sm" />
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="relative text-center px-6 py-12 max-w-sm">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-5">
                  <Lock className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-lg font-bold mb-2">Konten Premium</h2>
                <p className="text-sm text-muted-foreground/70 mb-6 leading-relaxed">
                  Kursus {course.title} hanya tersedia untuk member Premium. Upgrade sekarang untuk akses penuh.
                </p>
                <button onClick={handleUpgrade} disabled={upgrading}
                  className="inline-flex items-center gap-2 h-10 px-6 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(99,102,241,0.15)] hover:shadow-[0_0_30px_rgba(99,102,241,0.25)]">
                  <Crown className="w-4 h-4" /> {upgrading ? "Memproses..." : "Upgrade ke Premium"}
                </button>
              </motion.div>
            </div>
          ) : null}

          <article className="max-w-3xl mx-auto px-6 md:px-10 py-10">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
              <span className="bg-primary/10 text-primary rounded-md px-2 py-0.5">{course.categories?.title ?? ""}</span>
              <span className="bg-white/[0.05] rounded-md px-2 py-0.5">{course.level}</span>
              {course.type === "premium" && <span className="bg-primary/10 text-primary rounded-md px-2 py-0.5 flex items-center gap-1"><Crown className="w-3 h-3" /> Premium</span>}
            </div>
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">{currentLesson?.title ?? course.title}</h1>
              {currentLesson && (
                <button onClick={() => handleToggleBookmark(currentLesson.id)}
                  className="shrink-0 flex items-center gap-1.5 h-8 px-3 rounded-lg border border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.06] transition-all text-xs whitespace-nowrap">
                  {bookmarks.has(currentLesson.id) ? (
                    <><BookmarkCheck className="w-3.5 h-3.5 text-primary" /> Tersimpan</>
                  ) : (
                    <><Bookmark className="w-3.5 h-3.5 text-muted-foreground/60" /> Simpan</>
                  )}
                </button>
              )}
            </div>
            {currentLesson && currentLesson.duration > 0 && (
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-10">
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {currentLesson.duration} menit</span>
              </div>
            )}
            <div className="space-y-6">
              {currentLesson?.content ? (
                <div className="prose-custom leading-[1.8] text-[15px] text-foreground [&_p]:mb-4 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-5 [&_h3]:mb-2 [&_pre]:bg-[#0F172A] [&_pre]:rounded-xl [&_pre]:p-4 [&_pre]:my-4 [&_pre]:overflow-x-auto [&_code]:text-sm [&_code]:font-mono [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4 [&_li]:mb-1 [&_a]:text-primary [&_a]:underline [&_a:hover]:opacity-80 [&_iframe]:w-full [&_iframe]:aspect-video [&_iframe]:rounded-xl
" dangerouslySetInnerHTML={{ __html: renderTiptap(currentLesson.content) }} />
              ) : (
                <p className="text-muted-foreground/60 leading-[1.8] text-[15px]">
                  {course.type === "premium"
                    ? "Konten premium ini berisi materi mendalam yang hanya tersedia untuk member Premium. Mulai dari studi kasus nyata hingga best practice industri."
                    : `Selamat datang di ${course.title}! Materi ini akan memandu Anda dari dasar hingga mahir.`}
                </p>
              )}
            </div>
            {currentLesson && (
              <div className="flex items-center gap-3 mt-10 pt-8 border-t border-white/[0.06]">
                <button onClick={() => handleToggleComplete(currentLesson.id)} disabled={completing}
                  className="inline-flex items-center gap-2 h-10 px-6 rounded-xl font-medium text-sm transition-all disabled:opacity-50 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20">
                  {progress.has(currentLesson.id) ? (
                    <><CheckCircle2 className="w-4 h-4" /> Selesai</>
                  ) : (
                    <><Circle className="w-4 h-4" /> Tandai Selesai</>
                  )}
                </button>
                <span className="text-xs text-muted-foreground/50">
                  {progress.has(currentLesson.id)
                    ? "Materi ini sudah ditandai selesai. Klik untuk batalkan."
                    : "Tandai materi ini sebagai selesai."}
                </span>
              </div>
            )}
          </article>
        </div>
      </motion.div>
    </div>
  );
}
