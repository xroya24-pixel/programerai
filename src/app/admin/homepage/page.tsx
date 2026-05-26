"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Pencil, Monitor, Server, Brain, Container, Code2, Database, Globe, Smartphone, GripVertical, Save, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Refreshable } from "@/components/refreshable";

const iconOptions = ["Monitor", "Server", "Brain", "Container", "Code2", "Database", "Globe", "Smartphone"];

interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  slug: string;
  sort_order: number;
  total_courses: number;
}

export default function HomepagePage() {
  return <Refreshable><HomepageContent /></Refreshable>;
}

function HomepageContent() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Category | null>(null);
  const [newItem, setNewItem] = useState({ title: "", description: "", icon: "Code2", sort_order: 0 });
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from("categories")
      .select("*, courses(id)")
      .order("sort_order", { ascending: true });
    setCategories((data ?? []).map(c => ({ ...c, total_courses: c.courses?.length ?? 0 })) as unknown as Category[]);
    setLoading(false);
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleSave = async () => {
    if (!newItem.title.trim()) return;
    setSaving(true);
    const slug = newItem.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    const supabase = createClient();
    if (editing) {
      await supabase.from("categories").update({ ...newItem, slug }).eq("id", editing.id);
    } else {
      await supabase.from("categories").insert({ ...newItem, slug, sort_order: categories.length });
    }

    setSaving(false);
    setEditing(null);
    setNewItem({ title: "", description: "", icon: "Code2", sort_order: 0 });
    setShowForm(false);
    fetchCategories();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus kategori ini?")) return;
    await createClient().from("categories").delete().eq("id", id);
    fetchCategories();
  };

  const startEdit = (cat: Category) => {
    setEditing(cat);
    setNewItem({ title: cat.title, description: cat.description, icon: cat.icon, sort_order: cat.sort_order });
    setShowForm(true);
  };

  const cancel = () => {
    setEditing(null);
    setNewItem({ title: "", description: "", icon: "Code2", sort_order: 0 });
    setShowForm(false);
  };

  const iconMap: Record<string, typeof Monitor> = { Monitor, Server, Brain, Container, Code2, Database, Globe, Smartphone };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Homepage</h1>
          <p className="text-muted-foreground text-sm mt-1">Kelola tampilan halaman depan.</p>
        </div>
        <button
          onClick={() => { setEditing(null); setNewItem({ title: "", description: "", icon: "Code2", sort_order: 0 }); setShowForm(true); }}
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-9 px-4 text-sm font-medium transition-all shadow-[0_0_20px_rgba(99,102,241,0.12)] hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]"
        >
          <Plus className="w-4 h-4" /> Tambah Kategori
        </button>
      </motion.div>

      {showForm ? (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-[#0F172A] border border-white/[0.06] p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold">{editing ? "Edit Kategori" : "Tambah Kategori"}</h2>
            <button onClick={cancel} className="p-1.5 rounded-lg hover:bg-white/[0.05] text-muted-foreground"><X className="w-4 h-4" /></button>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5">Nama Kategori *</label>
              <input type="text" value={newItem.title} onChange={(e) => setNewItem({ ...newItem, title: e.target.value })} placeholder="Frontend Development"
                className="w-full h-10 px-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-foreground focus:outline-none focus:border-primary/30" />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5">Deskripsi</label>
              <input type="text" value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} placeholder="Bangun interface modern..."
                className="w-full h-10 px-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-foreground focus:outline-none focus:border-primary/30" />
            </div>
          </div>
          <div className="mt-5">
            <label className="block text-xs text-muted-foreground mb-2">Icon</label>
            <div className="flex flex-wrap gap-2">
              {iconOptions.map(opt => {
                const Icon = iconMap[opt];
                return (
                  <button key={opt} type="button" onClick={() => setNewItem({ ...newItem, icon: opt })}
                    className={`p-2.5 rounded-xl text-xs border transition-all ${newItem.icon === opt ? "border-primary/40 bg-primary/10 text-primary" : "border-white/[0.06] bg-white/[0.02] text-muted-foreground hover:bg-white/[0.04]"}`}>
                    <Icon className="w-4 h-4" /> {opt}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mt-5 w-32">
            <label className="block text-xs text-muted-foreground mb-1.5">Urutan</label>
            <input type="number" value={newItem.sort_order} onChange={(e) => setNewItem({ ...newItem, sort_order: Number(e.target.value) })}
              className="w-full h-10 px-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-foreground focus:outline-none focus:border-primary/30" />
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button onClick={cancel} className="h-9 px-4 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-colors">Batal</button>
            <button onClick={handleSave} disabled={saving || !newItem.title.trim()}
              className="inline-flex items-center gap-2 h-9 px-5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium transition-colors disabled:opacity-50">
              <Save className="w-3.5 h-3.5" /> {saving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </motion.div>
      ) : null}

      {loading ? (
        <p className="text-sm text-muted-foreground py-4">Memuat...</p>
      ) : categories.length === 0 ? (
        <div className="rounded-2xl bg-[#0F172A] border border-white/[0.04] p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent pointer-events-none" />
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center mx-auto mb-4">
              <Monitor className="w-6 h-6 text-primary/40" />
            </div>
            <h3 className="text-sm font-semibold mb-1">Belum ada kategori</h3>
            <p className="text-xs text-muted-foreground/60">Tambah kategori untuk menampilkan kursus di halaman depan.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {categories.map((cat, i) => {
            const Icon = iconMap[cat.icon] ?? Code2;
            return (
              <motion.div key={cat.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.03 }}
                className="flex items-center gap-4 rounded-2xl bg-[#0F172A] border border-white/[0.06] p-5 hover:border-white/[0.1] transition-all duration-200 group">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold truncate">{cat.title}</h3>
                  <p className="text-xs text-muted-foreground truncate">{cat.description || "Tidak ada deskripsi"} · {cat.total_courses} kursus</p>
                </div>
                <span className="text-xs text-muted-foreground/50 hidden sm:inline-flex items-center gap-1"><GripVertical className="w-3.5 h-3.5" /> {cat.sort_order}</span>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => startEdit(cat)} className="p-2 rounded-lg hover:bg-white/[0.05] text-muted-foreground hover:text-foreground transition-colors">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(cat.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
