import { createClient } from "@/lib/supabase/server";
import { getSeedData } from "@/lib/seed-data";

function uuid() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export async function POST() {
  try {
    const supabase = await createClient();
    const { categories, courses, chapters, lessons } = getSeedData();

    // 1. Hapus semua data (urutan penting karena foreign key)
    await supabase.from("bookmarks").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    await supabase.from("lesson_progress").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    await supabase.from("enrollments").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    await supabase.from("lessons").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    await supabase.from("chapters").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    await supabase.from("courses").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    await supabase.from("categories").delete().neq("id", "00000000-0000-0000-0000-000000000000");

    // 2. Map old string IDs → UUIDs
    const catMap = new Map<string, string>();
    categories.forEach(c => catMap.set(c.id, uuid()));

    const courseMap = new Map<string, string>();
    courses.forEach(c => courseMap.set(c.id, uuid()));

    const chMap = new Map<string, string>();
    chapters.forEach(ch => chMap.set(ch.id, uuid()));

    const lsMap = new Map<string, string>();
    lessons.forEach(l => lsMap.set(l.id, uuid()));

    // 3. Insert categories
    const { error: catErr } = await supabase.from("categories").insert(
      categories.map(c => ({
        id: catMap.get(c.id),
        title: c.title,
        description: c.description,
        icon: c.icon,
        slug: c.slug,
        sort_order: c.sort_order,
      }))
    );
    if (catErr) return Response.json({ error: `categories: ${catErr.message}` }, { status: 500 });

    // 4. Insert courses
    const { error: courseErr } = await supabase.from("courses").insert(
      courses.map(c => ({
        id: courseMap.get(c.id),
        title: c.title,
        slug: c.slug,
        description: c.description,
        level: c.level,
        type: c.type,
        status: c.status,
        category_id: catMap.get(c.category_id),
        sort_order: c.sort_order,
        created_at: c.created_at,
      }))
    );
    if (courseErr) return Response.json({ error: `courses: ${courseErr.message}` }, { status: 500 });

    // 5. Insert chapters
    const { error: chErr } = await supabase.from("chapters").insert(
      chapters.map(ch => ({
        id: chMap.get(ch.id),
        course_id: courseMap.get(ch.course_id),
        title: ch.title,
        sort_order: ch.sort_order,
      }))
    );
    if (chErr) return Response.json({ error: `chapters: ${chErr.message}` }, { status: 500 });

    // 6. Insert lessons
    const { error: lsErr } = await supabase.from("lessons").insert(
      lessons.map(l => ({
        id: lsMap.get(l.id),
        chapter_id: chMap.get(l.chapter_id),
        title: l.title,
        content: l.content,
        duration: l.duration,
        sort_order: l.sort_order,
      }))
    );
    if (lsErr) return Response.json({ error: `lessons: ${lsErr.message}` }, { status: 500 });

    return Response.json({
      success: true,
      counts: {
        categories: categories.length,
        courses: courses.length,
        chapters: chapters.length,
        lessons: lessons.length,
      },
    });
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
