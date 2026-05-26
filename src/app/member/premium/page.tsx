"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Crown, Check, Copy, CheckCheck, Upload, Loader2, Banknote, Building2, User, FileText } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useUserRole } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const benefits = [
  "Akses semua course premium",
  "Update materi terbaru",
  "Project premium eksklusif",
  "Realtime chat dengan admin",
  "Konsultasi belajar langsung",
];

export default function PremiumPage() {
  const { isPremium, loading: roleLoading, premiumStatus, expiresAt } = useUserRole();
  const router = useRouter();
  const [senderName, setSenderName] = useState("");
  const [senderBank, setSenderBank] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const copyRekening = async () => {
    try {
      await navigator.clipboard.writeText("9700707005");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderBank.trim() || !file) return;
    setSubmitting(true);
    setToast(null);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Upload file
      const ext = file.name.split(".").pop();
      const filePath = `${user.id}/${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("payment-proofs")
        .upload(filePath, file);
      if (uploadError) throw new Error(`Upload gagal: ${uploadError.message}`);

      const { data: { publicUrl } } = supabase.storage
        .from("payment-proofs")
        .getPublicUrl(filePath);

      // Create submission
      const { error: insertError } = await supabase.from("premium_submissions").insert({
        user_id: user.id,
        sender_name: senderName,
        sender_bank: senderBank,
        amount: 99000,
        payment_proof: publicUrl,
      });
      if (insertError) throw new Error(`Submit gagal: ${insertError.message}`);

      setToast({ type: "success", message: "Bukti transfer terkirim! Menunggu verifikasi admin." });
      setSenderName("");
      setSenderBank("");
      setFile(null);
    } catch (err: any) {
      setToast({ type: "error", message: err.message });
    }
    setSubmitting(false);
  };

  if (roleLoading) return <div className="flex items-center justify-center py-20"><div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div>;

  const daysLeft = expiresAt ? Math.max(0, Math.ceil((new Date(expiresAt).getTime() - Date.now()) / 86400000)) : 0;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold tracking-tight">Premium Membership</h1>
        <p className="text-muted-foreground text-sm mt-1">Tingkatkan pengalaman belajar kamu.</p>
      </motion.div>

      {toast && (
        <div className={cn(
          "px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2",
          toast.type === "success" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"
        )}>
          {toast.type === "success" ? <CheckCheck className="w-4 h-4" /> : <Upload className="w-4 h-4" />}
          {toast.message}
        </div>
      )}

      {/* Active Premium */}
      {isPremium && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/[0.04] rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20"><Crown className="w-5 h-5 text-emerald-400" /></div>
              <div>
                <h3 className="text-sm font-semibold text-emerald-400">Premium Active</h3>
                {expiresAt && (
                  <p className="text-xs text-muted-foreground/70 mt-0.5">
                    {daysLeft > 0 ? `${daysLeft} hari tersisa` : "Berakhir hari ini"} · Berakhir {new Date(expiresAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Pending */}
      {premiumStatus === "pending" && !isPremium && (
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
          <div className="flex items-center gap-3">
            <Loader2 className="w-5 h-5 text-amber-400 animate-spin" />
            <div>
              <h3 className="text-sm font-semibold text-amber-400">Menunggu Verifikasi</h3>
              <p className="text-xs text-muted-foreground/70 mt-0.5">Pembayaran kamu sedang diperiksa admin. Mohon tunggu 1x24 jam.</p>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Card */}
      {!isPremium && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="rounded-2xl bg-[#0F172A] border border-white/[0.04] overflow-hidden">
          <div className="p-6 text-center border-b border-white/[0.04]">
            <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
              <Crown className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-lg font-bold">ProgramerAI Premium</h2>
            <div className="mt-3 mb-4">
              <span className="text-3xl font-bold">Rp99.000</span>
              <span className="text-sm text-muted-foreground/60"> / bulan</span>
            </div>
            <ul className="space-y-2.5 text-left max-w-xs mx-auto">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-2.5 text-sm text-muted-foreground/80">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Payment Info */}
          <div className="p-6 space-y-4">
            <h3 className="text-sm font-semibold flex items-center gap-2"><Banknote className="w-4 h-4" /> Pembayaran</h3>
            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground/60">Bank</span>
                <span className="text-sm font-semibold">BSI</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground/60">Atas Nama</span>
                <span className="text-sm">Yuvi Ads Indonesia</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground/60">Nomor Rekening</span>
                <button onClick={copyRekening} className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                  9700707005
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Upload Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">Nama Pengirim</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                  <input type="text" value={senderName} onChange={(e) => setSenderName(e.target.value)} required
                    placeholder="Nama sesuai rekening"
                    className="w-full h-10 pl-9 pr-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/30" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">Bank Pengirim</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                  <input type="text" value={senderBank} onChange={(e) => setSenderBank(e.target.value)} required
                    placeholder="BCA / Mandiri / dll"
                    className="w-full h-10 pl-9 pr-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/30" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">Nominal</label>
                <div className="relative">
                  <Banknote className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                  <input type="text" value="Rp 99.000" disabled
                    className="w-full h-10 pl-9 pr-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-muted-foreground/70 focus:outline-none cursor-not-allowed" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">Upload Bukti Transfer (JPG/PNG)</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40 pointer-events-none" />
                  <input type="file" accept=".jpg,.jpeg,.png,.webp" onChange={(e) => setFile(e.target.files?.[0] ?? null)} required
                    className="w-full h-10 pl-9 pr-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-foreground file:mr-2 file:py-0.5 file:px-2 file:rounded-md file:border-0 file:text-[10px] file:bg-primary/10 file:text-primary file:font-medium focus:outline-none focus:border-primary/30" />
                </div>
              </div>
              <button type="submit" disabled={submitting || !senderName.trim() || !senderBank.trim() || !file}
                className="w-full h-10 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.15)]">
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                {submitting ? "Mengirim..." : "Kirim Bukti Transfer"}
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </div>
  );
}
