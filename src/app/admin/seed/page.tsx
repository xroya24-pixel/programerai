"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Database, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SeedPage() {
  const [seeding, setSeeding] = useState(false);
  const [result, setResult] = useState<{ success: boolean; counts?: Record<string, number>; error?: string } | null>(null);
  const router = useRouter();

  const handleSeed = async () => {
    if (!confirm("Ini akan menghapus data courses/chapters/lessons yang ada dan mengisi ulang dengan data dummy. Lanjutkan?")) return;
    setSeeding(true);
    setResult(null);
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult({ success: true, counts: data.counts });
    } catch (e: any) {
      setResult({ success: false, error: e.message });
    }
    setSeeding(false);
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold tracking-tight">Seed Data</h1>
        <p className="text-muted-foreground text-sm mt-1">Isi database dengan data dummy untuk pengembangan.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="rounded-2xl bg-[#0F172A] border border-white/[0.06] p-6 max-w-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20"><Database className="w-5 h-5 text-primary" /></div>
          <div>
            <h2 className="text-sm font-semibold">Seed Database</h2>
            <p className="text-xs text-muted-foreground/70 mt-0.5">12 courses, 40+ chapters, 160+ lessons</p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground/60 mb-5 leading-relaxed">
          Tombol ini akan menghapus data courses, chapters, dan lessons yang ada,
          lalu mengisi ulang dengan data dummy lengkap untuk development.
        </p>

        {result && (
          <div className={`rounded-xl p-3 mb-4 text-xs ${result.success ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
            <div className="flex items-center gap-2 mb-1">
              {result.success ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              <span className="font-medium">{result.success ? "Berhasil!" : "Gagal"}</span>
            </div>
            {result.success && result.counts && (
              <p className="text-muted-foreground ml-6">
                {result.counts.categories} kategori, {result.counts.courses} kursus, {result.counts.chapters} bab, {result.counts.lessons} materi.
              </p>
            )}
            {result.error && <p className="text-muted-foreground ml-6">{result.error}</p>}
          </div>
        )}

        <div className="flex items-center gap-2">
          <button onClick={handleSeed} disabled={seeding}
            className="inline-flex items-center gap-2 h-9 px-5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium transition-colors disabled:opacity-50">
            {seeding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
            {seeding ? "Seeding..." : "Seed Data"}
          </button>
          <button onClick={() => router.push("/admin/dashboard")}
            className="h-9 px-4 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-colors">
            Kembali
          </button>
        </div>
      </motion.div>
    </div>
  );
}
