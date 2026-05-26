"use client";

import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Trash2, Pencil, BookOpen, Search, FolderOpen, BarChart3,
  ChevronDown, ChevronRight, Monitor, Server, Brain, Container,
  Code2, Database, Globe, Smartphone, MoreHorizontal, Eye,
  GraduationCap, Filter, X, LayoutGrid, GripVertical,
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
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const iconMap: Record<string, typeof Monitor> = { Monitor, Server, Brain, Container, Code2, Database, Globe, Smartphone };

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  level: string;
  type: string;
  status: string;
  category_id: string;
  sort_order: number;
  chapters: { id: string; lessons: { id: string }[] }[];
  created_at: string;
  categories?: { id: string; title: string; icon: string; description: string; slug: string };
}

interface Category {
  id: string;
  title: string;
  icon: string;
  description: string;
  slug: string;
  sort_order: number;
}

const UNCATEGORIZED_ID = "__uncategorized__";

function stripHtml(desc: string) {
  try { const p = JSON.parse(desc); return p.content?.map((n: any) => n.content?.map((c: any) => c.text).join(" ")).join(" ").slice(0, 80) || ""; }
  catch { return desc.slice(0, 80); }
}

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

const statusColors: Record<string, string> = {
  published: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  draft: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

const typeColors: Record<string, string> = {
  free: "text-emerald-400",
  premium: "text-primary",
};

const levelColors: Record<string, string> = {
  Beginner: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Intermediate: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Advanced: "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

function SortableCourseCard({
  course,
  index,
  onDelete,
  onToggleStatus,
}: {
  course: Course;
  index: number;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, current: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: course.id });
  const total = course.chapters?.reduce((s, ch) => s + (ch.lessons?.length ?? 0), 0) ?? 0;
  const descText = course.description ? stripHtml(course.description) : "";

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      className={cn(isDragging && "z-50")}
    >
      <div
        className={cn(
          "group relative rounded-xl border transition-all duration-200",
          isDragging
            ? "opacity-40 scale-[1.02] shadow-[0_0_30px_rgba(99,102,241,0.15)] border-primary/30 bg-[#0F172A]"
            : "bg-[#0F172A] border-white/[0.04] hover:border-white/[0.08] hover:-translate-y-0.5 hover:shadow-[0_0_16px_rgba(99,102,241,0.03)]"
        )}
      >
        <div className="flex items-start gap-3 p-3.5 pb-1.5">
          {/* Drag Handle */}
          <button
            {...listeners}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "p-0.5 mt-1 rounded transition-colors shrink-0 cursor-grab active:cursor-grabbing touch-none",
              isDragging ? "text-primary" : "text-muted-foreground/10 group-hover:text-muted-foreground/30 hover:text-muted-foreground/50"
            )}
          >
            <GripVertical className="w-3.5 h-3.5" />
          </button>

          {/* Thumbnail */}
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/[0.08] to-transparent border border-white/[0.06] flex items-center justify-center shrink-0 mt-0.5">
            <BookOpen className="w-4 h-4 text-primary/60" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <Link href={`/admin/courses/${course.id}`} className="hover:text-primary transition-colors flex-1 min-w-0">
                <h3 className="text-[13px] font-semibold leading-snug truncate">{course.title}</h3>
              </Link>
              <span className={`shrink-0 text-[9px] px-1.5 py-0.5 rounded border ${statusColors[course.status] ?? statusColors.draft}`}>
                {course.status}
              </span>
            </div>

            {descText && (
              <p className="text-[11px] text-muted-foreground/50 leading-relaxed line-clamp-1 mb-2">{descText}</p>
            )}

            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[10px] font-medium ${typeColors[course.type] ?? typeColors.free}`}>{course.type}</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded border ${levelColors[course.level] ?? ""}`}>
                {course.level}
              </span>
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground/40">
                <FolderOpen className="w-3 h-3" /> {course.chapters?.length ?? 0}
              </span>
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground/40">
                <BarChart3 className="w-3 h-3" /> {total}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-0.5 px-3.5 pb-2.5 pl-[72px]">
          <button onClick={() => onToggleStatus(course.id, course.status)}
            className="p-1 rounded-md hover:bg-white/[0.05] text-muted-foreground/30 hover:text-foreground transition-colors" title="Toggle status">
            <BarChart3 className="w-3 h-3" />
          </button>
          <Link href={`/admin/courses/${course.id}`}
            className="p-1 rounded-md hover:bg-white/[0.05] text-muted-foreground/30 hover:text-foreground transition-colors" title="View">
            <Eye className="w-3 h-3" />
          </Link>
          <Link href={`/admin/courses/${course.id}/edit`}
            className="p-1 rounded-md hover:bg-white/[0.05] text-muted-foreground/30 hover:text-foreground transition-colors" title="Edit">
            <Pencil className="w-3 h-3" />
          </Link>
          <button onClick={() => onDelete(course.id)}
            className="p-1 rounded-md hover:bg-red-500/10 text-muted-foreground/30 hover:text-red-400 transition-colors" title="Delete">
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CoursesPage() {
  return <Refreshable><CoursesContent /></Refreshable>;
}

function CoursesContent() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [filterLevel, setFilterLevel] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [activeId, setActiveId] = useState<string | null>(null);
  const [localSortOrders, setLocalSortOrders] = useState<Record<string, number>>({});

  const hasActiveFilters = search || filterStatus !== "all" || filterType !== "all" || filterLevel !== "all" || filterCategory !== "all";

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const fetchData = async () => {
    setLoading(true);
    const supabase = createClient();
    const [coursesRes, catsRes] = await Promise.all([
      supabase.from("courses")
        .select("*, categories(id, title, icon, description, slug), chapters(id, lessons(id))")
        .order("sort_order", { ascending: true }),
      supabase.from("categories").select("*").order("sort_order", { ascending: true }),
    ]);
    const fetched = (coursesRes.data ?? []) as unknown as Course[];
    setCourses(fetched);
    const orders: Record<string, number> = {};
    for (const c of fetched) orders[c.id] = c.sort_order ?? 0;
    setLocalSortOrders(orders);
    setCategories(catsRes.data ?? []);
    setExpandedCategories(new Set((catsRes.data ?? []).map(c => c.id)));
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  useEffect(() => {
    const close = () => setActiveId(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus kursus ini beserta semua chapter dan lesson?")) return;
    const supabase = createClient();
    const { data: chs } = await supabase.from("chapters").select("id").eq("course_id", id);
    if (chs?.length) {
      const ids = chs.map(c => c.id);
      await supabase.from("lessons").delete().in("chapter_id", ids);
      await supabase.from("chapters").delete().in("id", ids);
    }
    await supabase.from("courses").delete().eq("id", id);
    fetchData();
  };

  const toggleStatus = async (id: string, current: string) => {
    const next = current === "published" ? "draft" : "published";
    await createClient().from("courses").update({ status: next }).eq("id", id);
    fetchData();
  };

  const filteredCourses = useMemo(() => courses.filter(c => {
    if (search && !c.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterStatus !== "all" && c.status !== filterStatus) return false;
    if (filterType !== "all" && c.type !== filterType) return false;
    if (filterLevel !== "all" && c.level !== filterLevel) return false;
    if (filterCategory !== "all" && c.category_id !== filterCategory) return false;
    return true;
  }), [courses, search, filterStatus, filterType, filterLevel, filterCategory]);

  const groupedCategories = useMemo(() => {
    return categories
      .filter(cat => filterCategory === "all" || cat.id === filterCategory)
      .map(cat => ({
        ...cat,
        courses: filteredCourses
          .filter(c => c.category_id === cat.id)
          .sort((a, b) => (localSortOrders[a.id] ?? 0) - (localSortOrders[b.id] ?? 0)),
      }))
      .filter(cat => cat.courses.length > 0 || !search);
  }, [categories, filteredCourses, filterCategory, search, localSortOrders]);

  const uncategorized = useMemo(() =>
    filteredCourses
      .filter(c => !c.category_id)
      .sort((a, b) => (localSortOrders[a.id] ?? 0) - (localSortOrders[b.id] ?? 0)),
  [filteredCourses, localSortOrders]);

  const clearFilters = () => {
    setSearch("");
    setFilterStatus("all");
    setFilterType("all");
    setFilterLevel("all");
    setFilterCategory("all");
  };

  const findCategoryForCourse = (courseId: string): string | null => {
    const course = courses.find(c => c.id === courseId);
    return course?.category_id ?? null;
  };

  const saveOrder = async (updatedCourses: Course[]) => {
    const supabase = createClient();
    const promises = updatedCourses.map((c, i) => {
      const newOrder = i;
      if ((c.sort_order ?? 0) !== newOrder || (localSortOrders[c.id] ?? 0) !== newOrder) {
        return supabase.from("courses").update({ sort_order: newOrder }).eq("id", c.id);
      }
      return Promise.resolve();
    });
    await Promise.all(promises);
    const orders = { ...localSortOrders };
    for (const c of updatedCourses) orders[c.id] = c.sort_order ?? 0;
    setLocalSortOrders(orders);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    const activeCourse = courses.find(c => c.id === activeId);
    const overCourse = courses.find(c => c.id === overId);
    if (!activeCourse || !overCourse) return;

    const activeCatId = activeCourse.category_id;
    const overCatId = overCourse.category_id;

    const supabase = createClient();

    if (activeCatId === overCatId) {
      const catId = activeCatId;
      const group = catId
        ? courses.filter(c => c.category_id === catId).sort((a, b) => (localSortOrders[a.id] ?? 0) - (localSortOrders[b.id] ?? 0))
        : courses.filter(c => !c.category_id).sort((a, b) => (localSortOrders[a.id] ?? 0) - (localSortOrders[b.id] ?? 0));

      const oldIndex = group.findIndex(c => c.id === activeId);
      const newIndex = group.findIndex(c => c.id === overId);
      if (oldIndex === -1 || newIndex === -1) return;

      const reordered = arrayMove(group, oldIndex, newIndex);
      const updatedCourses = [...courses];

      for (let i = 0; i < reordered.length; i++) {
        const idx = updatedCourses.findIndex(c => c.id === reordered[i].id);
        if (idx !== -1) {
          updatedCourses[idx] = { ...updatedCourses[idx], sort_order: i };
        }
      }

      setCourses(updatedCourses);
      const orders = { ...localSortOrders };
      for (let i = 0; i < reordered.length; i++) orders[reordered[i].id] = i;
      setLocalSortOrders(orders);

      for (let i = 0; i < reordered.length; i++) {
        await supabase.from("courses").update({ sort_order: i }).eq("id", reordered[i].id);
      }
    } else {
      const srcCatId = activeCatId;
      const dstCatId = overCatId;

      const srcGroup = srcCatId
        ? courses.filter(c => c.category_id === srcCatId).sort((a, b) => (localSortOrders[a.id] ?? 0) - (localSortOrders[b.id] ?? 0))
        : courses.filter(c => !c.category_id).sort((a, b) => (localSortOrders[a.id] ?? 0) - (localSortOrders[b.id] ?? 0));

      const dstGroup = dstCatId
        ? courses.filter(c => c.category_id === dstCatId).sort((a, b) => (localSortOrders[a.id] ?? 0) - (localSortOrders[b.id] ?? 0))
        : courses.filter(c => !c.category_id).sort((a, b) => (localSortOrders[a.id] ?? 0) - (localSortOrders[b.id] ?? 0));

      const oldIndex = srcGroup.findIndex(c => c.id === activeId);
      const newIndex = dstGroup.findIndex(c => c.id === overId);
      if (oldIndex === -1 || newIndex === -1) return;

      const newSrcGroup = srcGroup.filter(c => c.id !== activeId);
      const newDstGroup = [...dstGroup];
      newDstGroup.splice(newIndex, 0, activeCourse);

      const updatedCourses = courses.map(c => {
        if (c.id === activeId) return { ...c, category_id: dstCatId ?? null };
        return { ...c };
      });

      setCourses(updatedCourses);

      for (let i = 0; i < newSrcGroup.length; i++) {
        const idx = updatedCourses.findIndex(c => c.id === newSrcGroup[i].id);
        if (idx !== -1) await supabase.from("courses").update({ sort_order: i }).eq("id", newSrcGroup[i].id);
      }

      for (let i = 0; i < newDstGroup.length; i++) {
        const idx = updatedCourses.findIndex(c => c.id === newDstGroup[i].id);
        if (idx !== -1) {
          await supabase.from("courses").update({ sort_order: i, category_id: dstCatId ?? null }).eq("id", newDstGroup[i].id);
        }
      }
    }
  };

  const activeCourse = activeId ? courses.find(c => c.id === activeId) : null;

  const renderCourseSection = (sectionId: string, sectionTitle: string, icon: React.ReactNode, sectionCourses: Course[], expanded: boolean, onToggle: () => void) => {
    const isUncategorized = sectionId === UNCATEGORIZED_ID;
    return (
      <motion.section key={sectionId} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="flex items-center gap-3 mb-3 px-1">
          <button onClick={onToggle} className="flex items-center gap-2.5 group flex-1 min-w-0">
            {icon}
            <div className="text-left">
              <h2 className="text-sm font-semibold group-hover:text-primary transition-colors">{sectionTitle}</h2>
            </div>
          </button>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] text-muted-foreground/40 bg-white/[0.04] rounded-md px-2 py-0.5">
              {sectionCourses.length} course{sectionCourses.length !== 1 ? "s" : ""}
            </span>
            <button onClick={onToggle}
              className="p-1 rounded-md hover:bg-white/[0.05] text-muted-foreground/40 hover:text-foreground transition-colors">
              {expanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-white/[0.06] to-transparent mb-3" />
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <SortableContext items={sectionCourses.map(c => c.id)} strategy={verticalListSortingStrategy}>
                {hasActiveFilters ? (
                  <div className="grid md:grid-cols-2 gap-2.5">
                    {sectionCourses.map((course) => (
                      <div key={course.id} className="group relative rounded-xl border border-white/[0.04] bg-[#0F172A] transition-all duration-200 hover:border-white/[0.08] hover:-translate-y-0.5 hover:shadow-[0_0_16px_rgba(99,102,241,0.03)]">
                        <Link href={`/admin/courses/${course.id}`} className="block p-3.5">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/[0.08] to-transparent border border-white/[0.06] flex items-center justify-center shrink-0 mt-0.5">
                              <BookOpen className="w-4 h-4 text-primary/60" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h3 className="text-[13px] font-semibold leading-snug truncate">{course.title}</h3>
                                <span className={`shrink-0 text-[9px] px-1.5 py-0.5 rounded border ${statusColors[course.status] ?? statusColors.draft}`}>{course.status}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-2.5">
                    {sectionCourses.map((course) => (
                      <SortableCourseCard
                        key={course.id}
                        course={course}
                        index={0}
                        onDelete={handleDelete}
                        onToggleStatus={toggleStatus}
                      />
                    ))}
                  </div>
                )}
                {sectionCourses.length === 0 && (
                  <p className="text-xs text-muted-foreground/30 py-6 text-center italic">Tidak ada course</p>
                )}
              </SortableContext>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    );
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Courses</h1>
          <p className="text-xs text-muted-foreground/60 mt-0.5">
            {courses.length} courses · {categories.length} categories
          </p>
        </div>
        <Link href="/admin/courses/new"
          className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-8 px-3.5 text-xs font-medium transition-all shadow-[0_0_16px_rgba(99,102,241,0.12)] hover:shadow-[0_0_24px_rgba(99,102,241,0.2)] shrink-0">
          <Plus className="w-3.5 h-3.5" /> New Course
        </Link>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
        className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[160px] max-w-[240px]">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/30" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search courses..."
            className="w-full h-8 pl-8 pr-3 rounded-lg bg-[#0F172A] border border-white/[0.06] text-xs text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/30 transition-all" />
        </div>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}
          className="h-8 px-2.5 rounded-lg bg-[#0F172A] border border-white/[0.06] text-[11px] text-foreground appearance-none focus:outline-none focus:border-primary/30 cursor-pointer">
          <option value="all" className="bg-[#0F172A]">All Categories</option>
          {categories.map(c => <option key={c.id} value={c.id} className="bg-[#0F172A]">{c.title}</option>)}
        </select>
        <select value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)}
          className="h-8 px-2.5 rounded-lg bg-[#0F172A] border border-white/[0.06] text-[11px] text-foreground appearance-none focus:outline-none focus:border-primary/30 cursor-pointer">
          <option value="all" className="bg-[#0F172A]">All Levels</option>
          {["Beginner", "Intermediate", "Advanced"].map(l => <option key={l} value={l} className="bg-[#0F172A]">{l}</option>)}
        </select>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}
          className="h-8 px-2.5 rounded-lg bg-[#0F172A] border border-white/[0.06] text-[11px] text-foreground appearance-none focus:outline-none focus:border-primary/30 cursor-pointer">
          <option value="all" className="bg-[#0F172A]">All Types</option>
          <option value="free" className="bg-[#0F172A]">Free</option>
          <option value="premium" className="bg-[#0F172A]">Premium</option>
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
          className="h-8 px-2.5 rounded-lg bg-[#0F172A] border border-white/[0.06] text-[11px] text-foreground appearance-none focus:outline-none focus:border-primary/30 cursor-pointer">
          <option value="all" className="bg-[#0F172A]">All Status</option>
          <option value="published" className="bg-[#0F172A]">Published</option>
          <option value="draft" className="bg-[#0F172A]">Draft</option>
        </select>
        {hasActiveFilters && (
          <button onClick={clearFilters}
            className="flex items-center gap-1 h-8 px-2.5 rounded-lg text-[11px] text-muted-foreground/60 hover:text-foreground hover:bg-white/[0.04] transition-colors">
            <X className="w-3 h-3" /> Clear
          </button>
        )}
      </motion.div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      ) : courses.length === 0 ? (
        <div className="rounded-2xl bg-[#0F172A] border border-white/[0.04] p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent pointer-events-none" />
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-5 h-5 text-primary/40" />
            </div>
            <p className="text-sm text-muted-foreground/70 mb-4">No courses yet. Seed data or create your first course.</p>
            <div className="flex items-center justify-center gap-2">
              <Link href="/admin/courses/new"
                className="inline-flex items-center gap-1.5 h-8 px-3.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-medium transition-all">
                <Plus className="w-3.5 h-3.5" /> Create Course
              </Link>
              <Link href="/admin/seed"
                className="inline-flex items-center gap-1.5 h-8 px-3.5 rounded-xl border border-white/[0.08] text-xs text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-all">
                <Database className="w-3.5 h-3.5" /> Seed Data
              </Link>
            </div>
          </div>
        </div>
      ) : filteredCourses.length === 0 && hasActiveFilters ? (
        <div className="rounded-2xl bg-[#0F172A] border border-white/[0.04] p-12 text-center">
          <Filter className="w-8 h-8 text-muted-foreground/20 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground/70">No courses match your filters.</p>
          <button onClick={clearFilters} className="mt-3 text-xs text-primary hover:text-primary/80">Clear filters</button>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="space-y-8">
            {hasActiveFilters ? (
              <>
                {groupedCategories.map((cat) => {
                  const CatIcon = iconMap[cat.icon] ?? LayoutGrid;
                  const expanded = expandedCategories.has(cat.id);
                  return renderCourseSection(
                    cat.id,
                    cat.title,
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 shrink-0">
                      <CatIcon className="w-3.5 h-3.5 text-primary" />
                    </div>,
                    cat.courses,
                    expanded,
                    () => setExpandedCategories(prev => { const n = new Set(prev); n.has(cat.id) ? n.delete(cat.id) : n.add(cat.id); return n; })
                  );
                })}
                {uncategorized.length > 0 && (
                  <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                    <div className="flex items-center gap-3 mb-3 px-1">
                      <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.06] shrink-0">
                        <Code2 className="w-3.5 h-3.5 text-muted-foreground/60" />
                      </div>
                      <h2 className="text-sm font-semibold">Uncategorized</h2>
                      <span className="text-[10px] text-muted-foreground/40 bg-white/[0.04] rounded-md px-2 py-0.5 ml-auto">{uncategorized.length} course{uncategorized.length !== 1 ? "s" : ""}</span>
                    </div>
                    <div className="h-px bg-gradient-to-r from-white/[0.06] to-transparent mb-3" />
                    <div className="grid md:grid-cols-2 gap-2.5">
                      {uncategorized.map((course) => (
                        <div key={course.id} className="group relative rounded-xl border border-white/[0.04] bg-[#0F172A] p-3.5 transition-all hover:border-white/[0.08]">
                          <h3 className="text-[13px] font-semibold truncate">{course.title}</h3>
                        </div>
                      ))}
                    </div>
                  </motion.section>
                )}
              </>
            ) : (
              groupedCategories.map((cat) => {
                const CatIcon = iconMap[cat.icon] ?? LayoutGrid;
                const expanded = expandedCategories.has(cat.id);
                return renderCourseSection(
                  cat.id,
                  cat.title,
                  <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 shrink-0">
                    <CatIcon className="w-3.5 h-3.5 text-primary" />
                  </div>,
                  cat.courses,
                  expanded,
                  () => setExpandedCategories(prev => { const n = new Set(prev); n.has(cat.id) ? n.delete(cat.id) : n.add(cat.id); return n; })
                );
              })
            )}

            {!hasActiveFilters && uncategorized.length > 0 && (
              renderCourseSection(
                UNCATEGORIZED_ID,
                "Uncategorized",
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.06] shrink-0">
                  <Code2 className="w-3.5 h-3.5 text-muted-foreground/60" />
                </div>,
                uncategorized,
                expandedCategories.has(UNCATEGORIZED_ID),
                () => setExpandedCategories(prev => { const n = new Set(prev); n.has(UNCATEGORIZED_ID) ? n.delete(UNCATEGORIZED_ID) : n.add(UNCATEGORIZED_ID); return n; })
              )
            )}
          </div>

          <DragOverlay>
            {activeCourse ? (
              <div className="rounded-xl bg-[#0F172A] border border-primary/30 shadow-[0_0_30px_rgba(99,102,241,0.2)] p-3.5 scale-[1.02]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/[0.12] to-transparent border border-primary/20 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold">{activeCourse.title}</p>
                    <p className="text-[10px] text-muted-foreground/60">{activeCourse.level} · {activeCourse.type}</p>
                  </div>
                </div>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      )}
    </div>
  );
}
