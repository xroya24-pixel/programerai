"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle2, AlertCircle, Loader2, Crown } from "lucide-react";

export default function SeedPromptsPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [result, setResult] = useState("");

  const handleSeed = async () => {
    setStatus("loading");
    setResult("");
    try {
      const res = await fetch("/api/seed-prompts", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setResult(`${data.chapters} materi dan ${data.lessons} prompt berhasil dibuat dalam Bahasa Indonesia!`);
      } else {
        setStatus("error");
        setResult(data.error || "Gagal");
      }
    } catch {
      setStatus("error");
      setResult("Network error");
    }
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold tracking-tight">Seed Prompt Premium</h1>
        <p className="text-muted-foreground text-sm mt-1">Buat course &quot;Kumpulan Prompt Spesifik Premium&quot; dengan 10 prompt AI image generator full Bahasa Indonesia.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="rounded-xl bg-[#0F172A] border border-white/[0.06] p-8 max-w-md">
        {status === "idle" && (
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-lg font-bold mb-2">Siap di-Seed</h2>
            <p className="text-sm text-muted-foreground/70 mb-6">
              Course akan berisi 10 materi dengan total 10 prompt AI premium dalam Bahasa Indonesia. Klik tombol di bawah untuk memulai.
            </p>
            <button onClick={handleSeed}
              className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-semibold transition-all shadow-[0_0_20px_rgba(99,102,241,0.2)]">
              <Crown className="w-4 h-4" /> Seed Prompt Premium
            </button>
          </div>
        )}

        {status === "loading" && (
          <div className="text-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
            <p className="text-sm text-muted-foreground">Membuat course dan prompt...</p>
          </div>
        )}

        {status === "success" && (
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7 text-emerald-400" />
            </div>
            <h2 className="text-lg font-bold mb-2 text-emerald-400">Berhasil!</h2>
            <p className="text-sm text-muted-foreground/70 mb-4">{result}</p>
            <a href="/admin/courses"
              className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium transition-all">
              Lihat di Courses →
            </a>
          </div>
        )}

        {status === "error" && (
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-7 h-7 text-red-400" />
            </div>
            <h2 className="text-lg font-bold mb-2 text-red-400">Gagal</h2>
            <p className="text-sm text-muted-foreground/70 mb-4">{result}</p>
            <button onClick={handleSeed}
              className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium transition-all">
              Coba Lagi
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
