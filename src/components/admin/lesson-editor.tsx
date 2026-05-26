"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Image from "@tiptap/extension-image";
import { common, createLowlight } from "lowlight";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  X, Save, Loader2, Bold, Italic, Heading1, Heading2, List,
  ListOrdered, Code, Quote, ImagePlus, Undo, Redo, Eye, EyeOff,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import "./lesson-editor.css";

const lowlight = createLowlight(common);

function extractYoutubeId(url: string) {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : "";
}

function LessonPreview({ content }: { content: object }) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    import("@tiptap/html").then(async ({ generateHTML }) => {
      const extensions = [StarterKit, CodeBlockLowlight.configure({ lowlight }), Image];
      const generated = generateHTML(
        content as any,
        extensions
      );
      setHtml(generated);
    }).catch(() => setHtml("<p>Preview tidak tersedia</p>"));
  }, [content]);

  return (
    <div
      className="prose-preview"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function LessonEditor() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.id as string;
  const chapterId = params.chapterId as string;
  const lessonId = params.lessonId as string;

  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);
  const [youtubeId, setYoutubeId] = useState("");
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [lesson, setLesson] = useState<{ title: string; content: string; video_url: string } | null>(null);

  useEffect(() => { setYoutubeId(extractYoutubeId(videoUrl)); }, [videoUrl]);

  useEffect(() => {
    if (!lessonId) return;
    createClient().from("lessons").select("*").eq("id", lessonId).single().then(({ data }) => {
      if (data) {
        setLesson(data);
        setTitle(data.title);
        setVideoUrl(data.video_url ?? "");
      }
    });
  }, [lessonId]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      CodeBlockLowlight.configure({ lowlight }),
      Image.configure({ inline: false, allowBase64: true }),
    ],
    content: lesson?.content ? JSON.parse(lesson.content) : { type: "doc", content: [] },
    editorProps: { attributes: { class: "tiptap-editor" } },
  });

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const handleSave = async () => {
    if (!title.trim() || !editor) return;
    setSaving(true);
    setToast(null);
    const content = JSON.stringify(editor.getJSON());
    const supabase = createClient();
    const { error } = await supabase.from("lessons").update({ title, content, video_url: videoUrl }).eq("id", lessonId);
    setSaving(false);
    if (error) {
      setToast({ type: "error", message: error.message });
    } else {
      setToast({ type: "success", message: "Lesson berhasil disimpan" });
    }
  };

  if (!editor) return null;

  const TB = ({ onClick, isActive, children, title }: { onClick: () => void; isActive?: boolean; children: React.ReactNode; title: string }) => (
    <button type="button" onClick={onClick} title={title}
      className={`p-1.5 rounded-lg transition-colors ${isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-white/[0.05]"}`}>
      {children}
    </button>
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <button onClick={() => router.push(`/admin/courses/${courseId}`)} className="hover:text-foreground">Courses</button>
          <span>/</span>
          <span className="text-foreground">{lesson?.title ?? "New Lesson"}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPreview(!preview)}
            className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-white/[0.05] border border-white/[0.06] transition-colors"
          >
            {preview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {preview ? "Editor" : "Preview"}
          </button>
          <button
            onClick={() => router.push(`/admin/courses/${courseId}`)}
            className="p-1.5 rounded-lg hover:bg-white/[0.05] text-muted-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Judul Lesson..."
        className="w-full h-12 px-4 rounded-xl bg-[#0F172A] border border-white/[0.06] text-lg font-semibold text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/30"
      />

      <div>
        <input
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="YouTube URL (opsional)..."
          className="w-full h-9 px-3 rounded-xl bg-[#0F172A] border border-white/[0.06] text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/30"
        />
        {youtubeId && (
          <div className="mt-3 rounded-xl overflow-hidden border border-white/[0.06] aspect-video">
            <iframe src={`https://www.youtube.com/embed/${youtubeId}`} className="w-full h-full" allowFullScreen />
          </div>
        )}
      </div>

      {toast && (
        <div className={`px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 ${
          toast.type === "success"
            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
            : "bg-red-500/10 text-red-400 border border-red-500/20"
        }`}>
          {toast.type === "success" ? "✓" : "✕"} {toast.message}
        </div>
      )}

      {preview ? (
        <div className="rounded-xl border border-white/[0.06] bg-[#0F172A] p-8 min-h-[400px]">
          {youtubeId && (
            <div className="rounded-xl overflow-hidden border border-white/[0.06] aspect-video mb-6">
              <iframe src={`https://www.youtube.com/embed/${youtubeId}`} className="w-full h-full" allowFullScreen />
            </div>
          )}
          <LessonPreview content={editor.getJSON()} />
        </div>
      ) : (
        <div className="rounded-xl border border-white/[0.06] overflow-hidden bg-[#0F172A]">
          <div className="flex items-center gap-0.5 px-2 py-1.5 border-b border-white/[0.06] bg-white/[0.02] flex-wrap">
            <TB onClick={() => editor.chain().focus().undo().run()} title="Undo"><Undo className="w-4 h-4" /></TB>
            <TB onClick={() => editor.chain().focus().redo().run()} title="Redo"><Redo className="w-4 h-4" /></TB>
            <div className="w-px h-5 bg-white/[0.06] mx-1" />
            <TB onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive("heading", { level: 1 })} title="H1"><Heading1 className="w-4 h-4" /></TB>
            <TB onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive("heading", { level: 2 })} title="H2"><Heading2 className="w-4 h-4" /></TB>
            <TB onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive("heading", { level: 3 })} title="H3"><span className="w-4 h-4 text-xs font-bold">H3</span></TB>
            <div className="w-px h-5 bg-white/[0.06] mx-1" />
            <TB onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive("bold")} title="Bold"><Bold className="w-4 h-4" /></TB>
            <TB onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive("italic")} title="Italic"><Italic className="w-4 h-4" /></TB>
            <div className="w-px h-5 bg-white/[0.06] mx-1" />
            <TB onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive("bulletList")} title="List"><List className="w-4 h-4" /></TB>
            <TB onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive("orderedList")} title="Ordered List"><ListOrdered className="w-4 h-4" /></TB>
            <div className="w-px h-5 bg-white/[0.06] mx-1" />
            <TB onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive("blockquote")} title="Quote"><Quote className="w-4 h-4" /></TB>
            <TB onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive("codeBlock")} title="Code Block"><Code className="w-4 h-4" /></TB>
            <TB onClick={() => { const url = prompt("URL gambar:"); if (url) editor.chain().focus().setImage({ src: url }).run(); }} title="Image"><ImagePlus className="w-4 h-4" /></TB>
          </div>
          <EditorContent editor={editor} />
        </div>
      )}

      <div className="flex justify-end gap-2">
        <button onClick={() => router.push(`/admin/courses/${courseId}`)} className="h-9 px-4 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-colors">Batal</button>
        <button onClick={handleSave} disabled={saving || !title.trim()} className="inline-flex items-center gap-2 h-9 px-5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium transition-colors disabled:opacity-50">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </div>
  );
}
