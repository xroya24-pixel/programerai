import { createClient } from "@/lib/supabase/server";
import { getPremiumPromptSeed } from "@/lib/premium-prompt-seed";

function uuid() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export async function POST() {
  try {
    const supabase = await createClient();

    // 1. Cari category AI Programming
    const { data: categories } = await supabase
      .from("categories")
      .select("id")
      .ilike("title", "%ai programming%")
      .limit(1);
    const catId = categories?.[0]?.id;
    if (!catId) return Response.json({ error: "Category AI Programming tidak ditemukan" }, { status: 404 });

    // 2. Cek apakah course sudah ada (jangan duplikat)
    const { data: existing } = await supabase
      .from("courses")
      .select("id")
      .eq("slug", "kumpulan-prompt-spesifik-premium")
      .limit(1);
    if (existing && existing.length > 0) {
      return Response.json({ error: "Course 'Kumpulan Prompt Spesifik Premium' sudah ada. Hapus dulu jika ingin re-seed." }, { status: 409 });
    }

    const now = new Date().toISOString();

    // 3. Insert course
    const courseId = uuid();
    const { error: courseErr } = await supabase.from("courses").insert({
      id: courseId,
      title: "Kumpulan Prompt Spesifik Premium",
      slug: "kumpulan-prompt-spesifik-premium",
      description: JSON.stringify({
        type: "doc",
        content: [
          { type: "paragraph", content: [{ type: "text", text: "Koleksi eksklusif 50+ prompt premium untuk AI image generator. Setiap prompt dirancang khusus untuk menghasilkan visual profesional — dari landing page hero, dashboard UI, hingga social media content. Cocok untuk designer, frontend engineer, dan content creator yang ingin mempercepat workflow dengan AI." }] },
        ],
      }),
      level: "Intermediate",
      type: "premium",
      status: "published",
      category_id: catId,
      sort_order: 100,
      created_at: now,
    });
    if (courseErr) return Response.json({ error: `course: ${courseErr.message}` }, { status: 500 });

    const chapters = getPremiumPromptSeed();
    let totalChapters = 0;
    let totalLessons = 0;

    for (let ci = 0; ci < chapters.length; ci++) {
      const ch = chapters[ci];
      const chapterId = uuid();
      const { error: chErr } = await supabase.from("chapters").insert({
        id: chapterId,
        course_id: courseId,
        title: ch.title,
        sort_order: ci,
      });
      if (chErr) return Response.json({ error: `chapter ${ch.title}: ${chErr.message}` }, { status: 500 });
      totalChapters++;

      for (let li = 0; li < ch.lessons.length; li++) {
        const ls = ch.lessons[li];
        const { error: lsErr } = await supabase.from("lessons").insert({
          id: uuid(),
          chapter_id: chapterId,
          title: ls.title,
          content: ls.content,
          duration: ls.duration,
          sort_order: li,
        });
        if (lsErr) return Response.json({ error: `lesson ${ls.title}: ${lsErr.message}` }, { status: 500 });
        totalLessons++;
      }
    }

    return Response.json({
      success: true,
      course: { title: "Kumpulan Prompt Spesifik Premium", id: courseId },
      chapters: totalChapters,
      lessons: totalLessons,
    });
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
