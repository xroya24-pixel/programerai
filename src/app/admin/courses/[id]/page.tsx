"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, ChevronRight, ChevronDown, Trash2, FolderOpen, FileText,
  GripVertical, Pencil, Eye, BookOpen, BarChart3,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Refreshable } from "@/components/refreshable";
import Link from "next/link";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Lesson { id: string; title: string; sort_order: number; }
interface Chapter { id: string; title: string; sort_order: number; lessons: Lesson[]; }
interface Course { id: string; title: string; description: string; level: string; type: string; status: string; }

const CH_PREFIX = "ch:";
const LS_PREFIX = "ls:";
const chId = (id: string) => `${CH_PREFIX}${id}`;
const lsId = (id: string) => `${LS_PREFIX}${id}`;

function stripHtml(desc: string) {
  try { const p = JSON.parse(desc); return p.content?.map((n: any) => n.content?.map((c: any) => c.text).join(" ")).join(" ").slice(0, 120) || ""; }
  catch { return desc.slice(0, 120); }
}

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function CourseStructurePage() {
  return <Refreshable><CourseStructureContent /></Refreshable>;
}

function SortableChapter({
  chapter,
  isExpanded,
  onToggle,
  onDelete,
  children,
}: {
  chapter: Chapter;
  isExpanded: boolean;
  onToggle: () => void;
  onDelete: () => void;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: chId(chapter.id) });

  return (
    <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }} className={cn(isDragging && "opacity-30")} {...attributes}>
      <div className={cn(
        "flex items-center gap-1.5 px-4 py-2.5 mx-2 rounded-xl transition-all duration-200",
        isExpanded
          ? "bg-white/[0.02] border-l-2 border-primary/30"
          : "hover:bg-white/[0.01] border-l-2 border-transparent hover:border-white/[0.04]"
      )}>
        <button {...listeners} onClick={(e) => e.stopPropagation()} className="p-0.5 text-muted-foreground/20 hover:text-muted-foreground/40 transition-colors shrink-0 cursor-grab active:cursor-grabbing touch-none">
          <GripVertical className="w-3.5 h-3.5" />
        </button>
        <button onClick={onToggle} className="p-0.5 text-muted-foreground/40 hover:text-foreground transition-colors shrink-0">
          {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        </button>
        <FolderOpen className={cn("w-4 h-4 shrink-0", isExpanded ? "text-primary" : "text-primary/40")} />
        <span className="text-sm font-medium flex-1 truncate">{chapter.title}</span>
        <span className="text-[10px] text-muted-foreground/40 tabular-nums">{chapter.lessons.length}</span>
        <button onClick={onDelete} className="p-1 rounded-lg hover:bg-red-500/10 text-muted-foreground/30 hover:text-red-400 transition-all">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
      {children}
    </div>
  );
}

function SortableLesson({
  lesson,
  chapterId,
  courseId,
  onDelete,
}: {
  lesson: Lesson;
  chapterId: string;
  courseId: string;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: lsId(lesson.id) });

  return (
    <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }} className={cn(isDragging && "opacity-30")} {...attributes}>
      <Link
        href={`/admin/courses/${courseId}/chapters/${chapterId}/lessons/${lesson.id}`}
        className="group/lesson flex items-center gap-2 py-2 px-3 my-0.5 rounded-lg hover:bg-white/[0.02] transition-all duration-200 border-l-2 border-transparent hover:border-primary/20"
      >
        <button {...listeners} onClick={(e) => e.stopPropagation()} className="p-0.5 text-muted-foreground/10 hover:text-muted-foreground/30 transition-colors shrink-0 cursor-grab active:cursor-grabbing touch-none">
          <GripVertical className="w-3 h-3" />
        </button>
        <FileText className="w-3.5 h-3.5 text-muted-foreground/30 group-hover/lesson:text-primary/60 shrink-0 transition-colors" />
        <span className="text-sm text-muted-foreground/70 group-hover/lesson:text-foreground flex-1 truncate transition-colors">{lesson.title}</span>
        <button onClick={(e) => { e.preventDefault(); onDelete(); }}
          className="p-1 rounded opacity-0 group-hover/lesson:opacity-100 hover:bg-red-500/10 text-muted-foreground/20 hover:text-red-400 transition-all">
          <Trash2 className="w-3 h-3" />
        </button>
      </Link>
    </div>
  );
}

function CourseStructureContent() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;
  const [course, setCourse] = useState<Course | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [newChapterTitle, setNewChapterTitle] = useState("");
  const [addingLessonTo, setAddingLessonTo] = useState<string | null>(null);
  const [newLessonTitle, setNewLessonTitle] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const chapterIds = useMemo(() => chapters.map(c => chId(c.id)), [chapters]);

  const chapterLessonIds = useMemo(() => {
    const map: Record<string, string[]> = {};
    for (const c of chapters) map[c.id] = c.lessons.map(l => lsId(l.id));
    return map;
  }, [chapters]);

  const fetchData = async () => {
    setLoading(true);
    const supabase = createClient();
    const [courseRes, chaptersRes] = await Promise.all([
      supabase.from("courses").select("*").eq("id", courseId).single(),
      supabase.from("chapters").select("*, lessons(id, title, sort_order)").eq("course_id", courseId).order("sort_order", { ascending: true }),
    ]);
    setCourse(courseRes.data);
    const chs = (chaptersRes.data ?? []) as unknown as Chapter[];
    setChapters(chs);
    setExpanded(new Set(chs.map(c => c.id)));
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, [courseId]);

  const toggleChapter = (id: string) => {
    setExpanded(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const addChapter = async () => {
    if (!newChapterTitle.trim()) return;
    const supabase = createClient();
    const nextSort = chapters.length;
    const { data } = await supabase.from("chapters").insert({ course_id: courseId, title: newChapterTitle, sort_order: nextSort }).select("id, title, sort_order").single();
    if (data) {
      setChapters([...chapters, { ...data, lessons: [] }]);
      setExpanded(prev => new Set([...prev, data.id]));
      setNewChapterTitle("");
    }
  };

  const addLesson = async (chapterId: string) => {
    if (!newLessonTitle.trim()) return;
    const supabase = createClient();
    const ch = chapters.find(c => c.id === chapterId);
    const nextSort = ch?.lessons.length ?? 0;
    const { data } = await supabase.from("lessons").insert({ chapter_id: chapterId, title: newLessonTitle, content: "{}", sort_order: nextSort }).select("id, title, sort_order").single();
    if (data) {
      setChapters(chapters.map(c => c.id === chapterId ? { ...c, lessons: [...c.lessons, data] } : c));
      setNewLessonTitle("");
      setAddingLessonTo(null);
    }
  };

  const deleteChapter = async (chapterId: string) => {
    if (!confirm("Hapus chapter ini beserta semua lesson?")) return;
    const supabase = createClient();
    await supabase.from("lessons").delete().eq("chapter_id", chapterId);
    await supabase.from("chapters").delete().eq("id", chapterId);
    setChapters(chapters.filter(c => c.id !== chapterId));
  };

  const deleteLesson = async (chapterId: string, lessonId: string) => {
    if (!confirm("Hapus lesson ini?")) return;
    const supabase = createClient();
    await supabase.from("lessons").delete().eq("id", lessonId);
    setChapters(chapters.map(c => c.id === chapterId ? { ...c, lessons: c.lessons.filter(l => l.id !== lessonId) } : c));
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const aId = String(active.id);
    const oId = String(over.id);

    if (aId.startsWith(CH_PREFIX)) {
      const oldIndex = chapters.findIndex(c => chId(c.id) === aId);
      const newIndex = chapters.findIndex(c => chId(c.id) === oId);
      if (oldIndex === -1 || newIndex === -1) return;

      const reordered = arrayMove(chapters, oldIndex, newIndex);
      setChapters(reordered);

      const supabase = createClient();
      for (let i = 0; i < reordered.length; i++) {
        await supabase.from("chapters").update({ sort_order: i }).eq("id", reordered[i].id);
      }
    } else if (aId.startsWith(LS_PREFIX)) {
      const aLessonId = aId.slice(LS_PREFIX.length);
      const oLessonId = oId.slice(LS_PREFIX.length);

      const chapterId = chapters.find(c => c.lessons.some(l => l.id === aLessonId))?.id;
      const targetChapterId = chapters.find(c => c.lessons.some(l => l.id === oLessonId))?.id;
      if (!chapterId || !targetChapterId || chapterId !== targetChapterId) return;

      const chapter = chapters.find(c => c.id === chapterId)!;
      const oldIndex = chapter.lessons.findIndex(l => l.id === aLessonId);
      const newIndex = chapter.lessons.findIndex(l => l.id === oLessonId);
      if (oldIndex === -1 || newIndex === -1) return;

      const reordered = arrayMove(chapter.lessons, oldIndex, newIndex);
      setChapters(chapters.map(c => c.id === chapterId ? { ...c, lessons: reordered } : c));

      const supabase = createClient();
      for (let i = 0; i < reordered.length; i++) {
        await supabase.from("lessons").update({ sort_order: i }).eq("id", reordered[i].id);
      }
    }
  };

  const activeItem = activeId?.startsWith(CH_PREFIX)
    ? chapters.find(c => chId(c.id) === activeId)
    : activeId?.startsWith(LS_PREFIX)
    ? chapters.flatMap(c => c.lessons).find(l => lsId(l.id) === activeId)
    : null;

  if (loading) return <p className="text-sm text-muted-foreground py-12 text-center">Memuat...</p>;

  const totalLessons = chapters.reduce((s, c) => s + c.lessons.length, 0);

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground/50 mb-4">
          <button onClick={() => router.push("/admin/courses")} className="hover:text-foreground transition-colors">Courses</button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground/70 font-medium">{course?.title ?? "Course"}</span>
        </div>

        {course && (
          <div className="rounded-2xl bg-gradient-to-br from-primary/[0.04] to-transparent border border-white/[0.04] p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/[0.03] rounded-full blur-3xl pointer-events-none" />
            <div className="relative flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-3 flex-1 min-w-0">
                <h1 className="text-2xl font-bold tracking-tight">{course.title}</h1>
                {course.description && (
                  <p className="text-sm text-muted-foreground/70 leading-relaxed line-clamp-2 max-w-xl">
                    {stripHtml(course.description)}
                  </p>
                )}
                <div className="flex items-center gap-3 flex-wrap text-xs">
                  <span className="flex items-center gap-1.5 text-muted-foreground/60">
                    <BookOpen className="w-3.5 h-3.5" /> {course.level}
                  </span>
                  <span className="flex items-center gap-1.5 text-muted-foreground/60">
                    <BarChart3 className="w-3.5 h-3.5" /> {totalLessons} lesson{totalLessons !== 1 ? "s" : ""}
                  </span>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${
                    course.type === "premium"
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  }`}>
                    {course.type}
                  </span>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${
                    course.status === "published"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  }`}>
                    {course.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <Link href={`/admin/courses/${courseId}/edit`}
                  className="p-2 rounded-lg hover:bg-white/[0.05] text-muted-foreground/60 hover:text-foreground transition-colors" title="Edit Course">
                  <Pencil className="w-4 h-4" />
                </Link>
                <button className="p-2 rounded-lg hover:bg-white/[0.05] text-muted-foreground/60 hover:text-foreground transition-colors" title="Preview">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      <div className="rounded-2xl bg-[#0F172A] border border-white/[0.04] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.04]">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-semibold">Struktur Kursus</h2>
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] text-muted-foreground/60">
              {chapters.length} bab · {totalLessons} materi
            </span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newChapterTitle}
              onChange={(e) => setNewChapterTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addChapter()}
              placeholder="Nama bab baru..."
              className="w-44 h-8 px-3 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/30 transition-all"
            />
            <button onClick={addChapter}
              className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors disabled:opacity-40"
              disabled={!newChapterTitle.trim()}>
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {chapters.length === 0 && !newChapterTitle.trim() ? (
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent pointer-events-none" />
              <div className="relative px-5 py-16 text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center mx-auto mb-4">
                  <FolderOpen className="w-6 h-6 text-primary/40" />
                </div>
                <h3 className="text-base font-semibold mb-1.5">Mulai bangun struktur kursus</h3>
                <p className="text-sm text-muted-foreground/60 max-w-sm mx-auto mb-6">
                  Tambah bab dan atur materi belajar agar mudah dipahami.
                </p>
                <button onClick={() => { const inp = document.querySelector<HTMLInputElement>('[placeholder="Nama bab baru..."]'); inp?.focus(); }}
                  className="inline-flex items-center gap-2 h-9 px-5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium transition-all shadow-[0_0_20px_rgba(99,102,241,0.15)] hover:shadow-[0_0_30px_rgba(99,102,241,0.25)]">
                  <Plus className="w-4 h-4" /> Tambah Bab Pertama
                </button>
              </div>
            </div>
          ) : (
            <div className="py-2">
              <SortableContext items={chapterIds} strategy={verticalListSortingStrategy}>
                {chapters.map((chapter) => (
                  <SortableChapter
                    key={chapter.id}
                    chapter={chapter}
                    isExpanded={expanded.has(chapter.id)}
                    onToggle={() => toggleChapter(chapter.id)}
                    onDelete={() => deleteChapter(chapter.id)}
                  >
                    <AnimatePresence>
                      {expanded.has(chapter.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="ml-7 pl-8 border-l border-white/[0.04] mr-2">
                            {chapter.lessons.length === 0 && addingLessonTo !== chapter.id && (
                              <p className="text-xs text-muted-foreground/30 py-3 px-3 italic">Belum ada materi</p>
                            )}
                            <SortableContext items={chapterLessonIds[chapter.id] ?? []} strategy={verticalListSortingStrategy}>
                              {chapter.lessons.map((lesson) => (
                                <SortableLesson
                                  key={lesson.id}
                                  lesson={lesson}
                                  chapterId={chapter.id}
                                  courseId={courseId}
                                  onDelete={() => deleteLesson(chapter.id, lesson.id)}
                                />
                              ))}
                            </SortableContext>
                            {addingLessonTo === chapter.id ? (
                              <div className="flex items-center gap-2 py-2 px-3">
                                <input type="text" value={newLessonTitle} onChange={(e) => setNewLessonTitle(e.target.value)}
                                  onKeyDown={(e) => { if (e.key === "Enter") addLesson(chapter.id); if (e.key === "Escape") setAddingLessonTo(null); }}
                                  autoFocus placeholder="Judul materi..." className="flex-1 h-8 px-3 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/30" />
                                <button onClick={() => addLesson(chapter.id)} className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <button onClick={() => setAddingLessonTo(chapter.id)}
                                className="flex items-center gap-1.5 py-2 px-3 text-xs text-muted-foreground/40 hover:text-foreground transition-colors rounded-lg hover:bg-white/[0.02] w-full">
                                <Plus className="w-3 h-3" /> Tambah Materi
                              </button>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </SortableChapter>
                ))}
              </SortableContext>
            </div>
          )}

          <DragOverlay>
            {activeId && activeItem && "title" in activeItem ? (
              <div className="bg-[#0F172A] border border-primary/30 shadow-2xl rounded-xl px-4 py-2.5 text-sm font-medium flex items-center gap-2">
                {activeId.startsWith(CH_PREFIX) ? (
                  <FolderOpen className="w-4 h-4 text-primary/60" />
                ) : (
                  <FileText className="w-4 h-4 text-primary/60" />
                )}
                {activeItem.title}
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
