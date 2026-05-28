import { createClient } from "@/lib/supabase/server";
import { getWebPrompts } from "@/lib/prompt-web";

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

    const { data: course } = await supabase
      .from("courses")
      .select("id")
      .eq("slug", "kumpulan-prompt-spesifik-premium")
      .single();
    if (!course) return Response.json({ error: "Course tidak ditemukan. Jalankan Seed Prompts dulu." }, { status: 404 });

    const chapters = getWebPrompts();
    let total = 0;

    for (let ci = 0; ci < chapters.length; ci++) {
      const ch = chapters[ci];
      const chId = uuid();
      await supabase.from("chapters").insert({
        id: chId, course_id: course.id, title: ch.title, sort_order: 50 + ci,
      });

      for (let li = 0; li < ch.lessons.length; li++) {
        const ls = ch.lessons[li];
        await supabase.from("lessons").insert({
          id: uuid(), chapter_id: chId, title: ls.title, content: ls.content,
          duration: ls.duration, sort_order: li,
        });
        total++;
      }
    }

    return Response.json({ success: true, chapters: chapters.length, lessons: total });
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
