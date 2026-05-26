"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, TrendingUp, Search, ArrowUpRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Refreshable } from "@/components/refreshable";

interface Transaction {
  id: string;
  user_id: string;
  course_id: string;
  amount: number;
  status: string;
  method: string;
  created_at: string;
  profiles?: { full_name: string; email: string };
  courses?: { title: string };
}

export default function PaymentsPage() {
  return <Refreshable><PaymentsContent /></Refreshable>;
}

function PaymentsContent() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchPayments = async () => {
    setLoading(true);
    const supabase = createClient();
    const q = supabase.from("transactions")
      .select("*, profiles(full_name, email), courses(title)")
      .order("created_at", { ascending: false });
    const { data } = await q;
    setTransactions((data ?? []) as unknown as Transaction[]);
    setLoading(false);
  };

  useEffect(() => { fetchPayments(); }, []);

  const filtered = transactions.filter(t =>
    !search ||
    t.profiles?.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    t.profiles?.email?.toLowerCase().includes(search.toLowerCase()) ||
    t.courses?.title?.toLowerCase().includes(search.toLowerCase())
  );

  const totalRevenue = transactions.filter(t => t.status === "completed").reduce((s, t) => s + (t.amount ?? 0), 0);
  const completedCount = transactions.filter(t => t.status === "completed").length;
  const pendingCount = transactions.filter(t => t.status === "pending").length;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
        <p className="text-muted-foreground text-sm mt-1">Kelola pembayaran dan transaksi.</p>
      </motion.div>

      <div className="grid grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 }}
          className="rounded-2xl bg-[#0F172A] border border-white/[0.06] p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"><TrendingUp className="w-4 h-4" /></div>
          </div>
          <p className="text-2xl font-bold">Rp {(totalRevenue).toLocaleString("id-ID")}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Total Revenue</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}
          className="rounded-2xl bg-[#0F172A] border border-white/[0.06] p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg text-primary bg-primary/10 border border-primary/20"><CreditCard className="w-4 h-4" /></div>
          </div>
          <p className="text-2xl font-bold">{completedCount}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Transaksi Berhasil</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.15 }}
          className="rounded-2xl bg-[#0F172A] border border-white/[0.06] p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg text-amber-400 bg-amber-500/10 border border-amber-500/20"><ArrowUpRight className="w-4 h-4" /></div>
          </div>
          <p className="text-2xl font-bold">{pendingCount}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Menunggu Pembayaran</p>
        </motion.div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari transaksi..."
          className="w-full h-9 pl-9 pr-4 rounded-xl bg-[#0F172A] border border-white/[0.06] text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/30" />
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground py-8 text-center">Memuat...</p>
      ) : transactions.length === 0 ? (
        <div className="rounded-2xl bg-[#0F172A] border border-white/[0.06] p-12 text-center">
          <CreditCard className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Belum ada transaksi.</p>
        </div>
      ) : (
        <div className="rounded-2xl bg-[#0F172A] border border-white/[0.06] overflow-hidden">
          <div className="hidden md:grid grid-cols-[1.5fr_1fr_100px_100px_80px_120px] gap-4 px-5 py-3 border-b border-white/[0.06] text-xs text-muted-foreground font-medium">
            <span>Transaction</span><span>User</span><span>Amount</span><span>Status</span><span>Method</span><span>Date</span>
          </div>
          {filtered.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
              className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_100px_100px_80px_120px] gap-2 md:gap-4 px-5 py-3.5 border-b border-white/[0.04] last:border-0 items-center hover:bg-white/[0.02] transition-colors">
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{t.courses?.title || t.course_id}</p>
                <p className="text-xs text-muted-foreground truncate md:hidden">{t.profiles?.email} · {t.method} · {new Date(t.created_at).toLocaleDateString("id-ID")}</p>
              </div>
              <span className="hidden md:inline text-sm text-muted-foreground truncate">{t.profiles?.full_name || t.profiles?.email}</span>
              <span className="hidden md:inline text-sm font-medium text-emerald-400">Rp {(t.amount ?? 0).toLocaleString("id-ID")}</span>
              <span className={`hidden md:inline-flex text-[10px] px-2 py-0.5 rounded-md border w-fit ${t.status === "completed" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : t.status === "pending" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"}`}>
                {t.status}
              </span>
              <span className="hidden md:inline text-xs text-muted-foreground">{t.method || "-"}</span>
              <span className="hidden md:inline text-xs text-muted-foreground">{new Date(t.created_at).toLocaleDateString("id-ID")}</span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
