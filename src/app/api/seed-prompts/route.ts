import { createClient } from "@/lib/supabase/server";
import { getPromptsID } from "@/lib/prompt-id";

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

    const { data: cats } = await supabase.from("categories").select("id").ilike("title", "%ai programming%").limit(1);
    const catId = cats?.[0]?.id;
    if (!catId) return Response.json({ error: "Kategori AI Programming tidak ditemukan" }, { status: 404 });

    // Hapus course lama dulu (CASCADE hapus chapters & lessons)
    await supabase.from("courses").delete().eq("slug", "kumpulan-prompt-spesifik-premium");

    const now = new Date().toISOString();
    const courseId = uuid();

    const { error: ce } = await supabase.from("courses").insert({
      id: courseId,
      title: "Kumpulan Prompt Spesifik Premium",
      slug: "kumpulan-prompt-spesifik-premium",
      description: JSON.stringify({
        type: "doc",
        content: [
          { type: "paragraph", content: [{ type: "text", text: "Koleksi eksklusif 10 prompt premium untuk AI image generator dalam Bahasa Indonesia. Setiap prompt dirancang khusus untuk menghasilkan visual profesional untuk berbagai kebutuhan desain — dari landing page, dashboard, hingga galeri portfolio. Cocok untuk desainer, frontend engineer, dan content creator." }] },
        ],
      }),
      level: "Intermediate",
      type: "premium",
      status: "published",
      category_id: catId,
      sort_order: 100,
      created_at: now,
    });
    if (ce) return Response.json({ error: `course: ${ce.message}` }, { status: 500 });

    const chapters = getPromptsID();
    let total = 0;

    for (let ci = 0; ci < chapters.length; ci++) {
      const ch = chapters[ci];
      const chId = uuid();
      const { error: che } = await supabase.from("chapters").insert({
        id: chId,
        course_id: courseId,
        title: ch.title,
        sort_order: ci,
      });
      if (che) return Response.json({ error: `chapter ${ch.title}: ${che.message}` }, { status: 500 });

      for (let li = 0; li < ch.lessons.length; li++) {
        const ls = ch.lessons[li];
        const { error: lse } = await supabase.from("lessons").insert({
          id: uuid(),
          chapter_id: chId,
          title: ls.title,
          content: ls.content,
          duration: ls.duration,
          sort_order: li,
        });
        if (lse) return Response.json({ error: `lesson ${ls.title}: ${lse.message}` }, { status: 500 });
        total++;
      }
    }

    return Response.json({ success: true, chapters: chapters.length, lessons: total });
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
