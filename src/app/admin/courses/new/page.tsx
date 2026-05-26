"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import { Bold, Italic, Code, List, ListOrdered, Heading1, Heading2, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import "@/components/admin/lesson-editor.css";

const lowlight = createLowlight(common);

interface Category {
  id: string;
  title: string;
}

export default function NewCoursePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [type, setType] = useState("free");
  const [status, setStatus] = useState("draft");
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content: "",
    editorProps: {
      attributes: { class: "desc-editor" },
    },
  });

  useEffect(() => {
    createClient()
      .from("categories")
      .select("id, title")
      .order("sort_order")
      .then(({ data }) => setCategories(data ?? []));
  }, []);

  useEffect(() => {
    setSlug(title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
  }, [title]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const description = editor ? JSON.stringify(editor.getJSON()) : "";
    const supabase = createClient();
    const { data } = await supabase
      .from("courses")
      .insert({ title, slug, description, category_id: category, level, type, status })
      .select("id")
      .single();
    setSaving(false);
    if (data) router.push(`/admin/courses/${data.id}`);
  };

  const TB = ({ onClick, isActive, children, title: tt }: { onClick: () => void; isActive?: boolean; children: React.ReactNode; title: string }) => (
    <button type="button" onClick={onClick} title={tt}
      className={`p-1 rounded-md transition-colors ${isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-white/[0.05]"}`}>
      {children}
    </button>
  );

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Buat Kursus Baru</h1>
          <p className="text-muted-foreground text-sm mt-1">Isi detail kursus.</p>
        </div>
        <button onClick={() => router.back()} className="p-1.5 rounded-lg hover:bg-white/[0.05] text-muted-foreground"><X className="w-4 h-4" /></button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl bg-[#0F172A] border border-white/[0.06] p-6">
        <div className="grid gap-5">
          <div>
            <label className="block text-xs text-muted-foreground mb-1.5">Judul Kursus *</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required
              className="w-full h-10 px-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-foreground focus:outline-none focus:border-primary/30" placeholder="HTML Dasar" />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1.5">Slug</label>
            <input type="text" value={slug} readOnly
              className="w-full h-10 px-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-sm text-muted-foreground" />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1.5">Deskripsi</label>
            <div className="rounded-xl border border-white/[0.06] overflow-hidden bg-white/[0.02]">
              <div className="flex items-center gap-0.5 px-2 py-1 border-b border-white/[0.06] bg-white/[0.02] flex-wrap">
                <TB onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor?.isActive("heading", { level: 1 })} title="H1"><Heading1 className="w-3.5 h-3.5" /></TB>
                <TB onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor?.isActive("heading", { level: 2 })} title="Heading"><Heading2 className="w-3.5 h-3.5" /></TB>
                <TB onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor?.isActive("heading", { level: 3 })} title="Subheading"><span className="w-3.5 h-3.5 text-xs font-bold">H3</span></TB>
                <div className="w-px h-4 bg-white/[0.06] mx-0.5" />
                <TB onClick={() => editor?.chain().focus().toggleBold().run()} isActive={editor?.isActive("bold")} title="Bold"><Bold className="w-3.5 h-3.5" /></TB>
                <TB onClick={() => editor?.chain().focus().toggleItalic().run()} isActive={editor?.isActive("italic")} title="Italic"><Italic className="w-3.5 h-3.5" /></TB>
                <div className="w-px h-4 bg-white/[0.06] mx-0.5" />
                <TB onClick={() => editor?.chain().focus().toggleBulletList().run()} isActive={editor?.isActive("bulletList")} title="List"><List className="w-3.5 h-3.5" /></TB>
                <TB onClick={() => editor?.chain().focus().toggleOrderedList().run()} isActive={editor?.isActive("orderedList")} title="Ordered"><ListOrdered className="w-3.5 h-3.5" /></TB>
                <div className="w-px h-4 bg-white/[0.06] mx-0.5" />
                <TB onClick={() => editor?.chain().focus().toggleCodeBlock().run()} isActive={editor?.isActive("codeBlock")} title="Code Block"><Code className="w-3.5 h-3.5" /></TB>
              </div>
              <div className="min-h-[180px] p-3">
                <EditorContent editor={editor} />
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground/50 mt-1">Supports HTML, CSS, JS, dan kode lainnya. Paste dari ChatGPT langsung rapi.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5">Kategori</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-foreground focus:outline-none focus:border-primary/30 appearance-none">
                <option value="" className="bg-[#0F172A]">Pilih kategori</option>
                {categories.map(c => <option key={c.id} value={c.id} className="bg-[#0F172A]">{c.title}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5">Level</label>
              <select value={level} onChange={(e) => setLevel(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-foreground focus:outline-none focus:border-primary/30 appearance-none">
                {["Beginner", "Intermediate", "Advanced"].map(l => <option key={l} value={l} className="bg-[#0F172A]">{l}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5">Tipe</label>
              <select value={type} onChange={(e) => setType(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-foreground focus:outline-none focus:border-primary/30 appearance-none">
                <option value="free" className="bg-[#0F172A]">Free</option>
                <option value="premium" className="bg-[#0F172A]">Premium</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5">Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-foreground focus:outline-none focus:border-primary/30 appearance-none">
                <option value="draft" className="bg-[#0F172A]">Draft</option>
                <option value="published" className="bg-[#0F172A]">Published</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={() => router.back()} className="h-9 px-4 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-colors">Batal</button>
          <button type="submit" disabled={saving} className="h-9 px-5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium transition-colors disabled:opacity-50">
            {saving ? "Menyimpan..." : "Buat Kursus"}
          </button>
        </div>
      </form>
      <style>{`.desc-editor { min-height: 180px; outline: none; font-size: 0.875rem; line-height: 1.7; color: #94A3B8; background: transparent; } .desc-editor:focus { outline: none; } .desc-editor p { color: #94A3B8; } .desc-editor h2 { font-size: 1.2rem; font-weight: 600; color: #F8FAFC; margin-top: 1rem; } .desc-editor h3 { font-size: 1rem; font-weight: 600; color: #F8FAFC; } .desc-editor strong { color: #F8FAFC; } .desc-editor ul { list-style: disc; padding-left: 1.5rem; } .desc-editor ol { list-style: decimal; padding-left: 1.5rem; } .desc-editor blockquote { border-left: 3px solid #6366F1; padding-left: 1rem; font-style: italic; } .desc-editor pre { background: rgba(0,0,0,0.3); border-radius: 8px; padding: 0.75rem; font-size: 0.8rem; overflow-x: auto; } .desc-editor code { font-family: monospace; }`}</style>
    </div>
  );
}
