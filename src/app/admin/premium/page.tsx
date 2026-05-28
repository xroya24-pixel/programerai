"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Crown, Check, X, Eye, Loader2, Search, User, Banknote, Calendar, MessageCircle, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

interface Submission {
  id: string;
  user_id: string;
  sender_name: string;
  sender_bank: string;
  amount: number;
  payment_proof: string;
  status: string;
  reject_reason: string | null;
  submitted_at: string;
  approved_at: string | null;
  rejected_at: string | null;
  expires_at: string | null;
  profiles?: { email: string; full_name: string | null };
}

const statusColors: Record<string, string> = {
  pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  approved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  rejected: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function PremiumVerificationPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [rejectModal, setRejectModal] = useState<Submission | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const fetchData = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from("premium_submissions")
      .select("*, profiles(email, full_name)")
      .order("submitted_at", { ascending: false });
    setSubmissions((data ?? []) as unknown as Submission[]);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleApprove = async (sub: Submission) => {
    if (!confirm(`Setujui pembayaran dari ${sub.sender_name}?`)) return;
    setActionLoading(sub.id);
    const supabase = createClient();

    const { error } = await supabase.rpc("admin_approve_premium", { p_submission_id: sub.id });
    if (error) console.error("Approve error:", error);

    setActionLoading(null);
    fetchData();
  };

  const handleReject = async () => {
    if (!rejectModal) return;
    setActionLoading(rejectModal.id);
    const supabase = createClient();
    const now = new Date().toISOString();

    await supabase.from("premium_submissions").update({
      status: "rejected",
      rejected_at: now,
      reject_reason: rejectReason || null,
    }).eq("id", rejectModal.id);

    setActionLoading(null);
    setRejectModal(null);
    setRejectReason("");
    fetchData();
  };

  const filtered = submissions.filter((s) => {
    if (filter !== "all" && s.status !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      const name = s.profiles?.full_name?.toLowerCase() ?? "";
      const email = s.profiles?.email?.toLowerCase() ?? "";
      if (!name.includes(q) && !email.includes(q) && !s.sender_name.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Premium Verification</h1>
          <p className="text-xs text-muted-foreground/60 mt-0.5">{submissions.length} submissions</p>
        </div>
      </motion.div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[160px] max-w-[240px]">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/30" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search user..."
            className="w-full h-8 pl-8 pr-3 rounded-lg bg-[#0F172A] border border-white/[0.06] text-xs text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/30 transition-all" />
        </div>
        {["all", "pending", "approved", "rejected"].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={cn(
              "h-8 px-3 rounded-lg text-[11px] font-medium transition-colors",
              filter === f ? "bg-primary/10 text-primary border border-primary/20" : "bg-[#0F172A] text-muted-foreground/60 hover:text-foreground border border-white/[0.06]"
            )}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16"><div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl bg-[#0F172A] border border-white/[0.04] p-12 text-center">
          <Crown className="w-8 h-8 text-muted-foreground/20 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground/70">Belum ada submission.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((sub) => (
            <motion.div key={sub.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-[#0F172A] border border-white/[0.04] p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-primary/60" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold">{sub.profiles?.full_name ?? sub.sender_name}</span>
                      <span className={cn("text-[10px] px-1.5 py-0.5 rounded border", statusColors[sub.status] ?? "")}>{sub.status}</span>
                    </div>
                    <p className="text-xs text-muted-foreground/60">{sub.profiles?.email}</p>
                    <div className="flex items-center gap-3 flex-wrap text-xs text-muted-foreground/60">
                      <span className="flex items-center gap-1"><Banknote className="w-3 h-3" /> Rp {sub.amount.toLocaleString("id-ID")}</span>
                      <span className="flex items-center gap-1"><User className="w-3 h-3" /> {sub.sender_name} ({sub.sender_bank})</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(sub.submitted_at).toLocaleDateString("id-ID")}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {sub.payment_proof && (
                    <a href={sub.payment_proof} target="_blank" rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-white/[0.05] text-muted-foreground/40 hover:text-foreground transition-colors" title="Lihat bukti">
                      <Eye className="w-4 h-4" />
                    </a>
                  )}
                  {sub.status === "pending" && (
                    <>
                      <button onClick={() => handleApprove(sub)} disabled={actionLoading === sub.id}
                        className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors disabled:opacity-50" title="Approve">
                        {actionLoading === sub.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                      </button>
                      <button onClick={() => setRejectModal(sub)} disabled={actionLoading === sub.id}
                        className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors disabled:opacity-50" title="Reject">
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
              {sub.reject_reason && (
                <div className="mt-3 text-xs text-red-400/70 bg-red-500/5 rounded-lg px-3 py-2">
                  Alasan: {sub.reject_reason}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Reject Modal */}
      {rejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setRejectModal(null)} />
          <div className="relative bg-[#0F172A] border border-white/[0.06] rounded-2xl p-6 w-full max-w-sm mx-4">
            <h3 className="text-sm font-semibold mb-3">Tolak Pembayaran</h3>
            <p className="text-xs text-muted-foreground/70 mb-3">Alasan penolakan (opsional):</p>
            <textarea value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} rows={3}
              placeholder="Alasan ditolak..."
              className="w-full rounded-xl bg-white/[0.04] border border-white/[0.06] p-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/30 resize-none" />
            <div className="flex items-center gap-2 mt-4 justify-end">
              <button onClick={() => setRejectModal(null)} className="h-8 px-4 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-colors">Batal</button>
              <button onClick={handleReject} className="h-8 px-4 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs font-medium transition-colors">Tolak</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
