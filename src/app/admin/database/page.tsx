"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Database, Users, BookOpen, FolderOpen, FileText, TrendingUp, CreditCard, Monitor } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface TableConfig {
  name: string;
  icon: typeof Database;
  label: string;
}

const tables: TableConfig[] = [
  { name: "courses", icon: BookOpen, label: "Courses" },
  { name: "chapters", icon: FolderOpen, label: "Chapters" },
  { name: "lessons", icon: FileText, label: "Lessons" },
  { name: "profiles", icon: Users, label: "Users" },
  { name: "categories", icon: Monitor, label: "Categories" },
  { name: "transactions", icon: CreditCard, label: "Transactions" },
  { name: "enrollments", icon: Users, label: "Enrollments" },
  { name: "lesson_progress", icon: TrendingUp, label: "Progress" },
  { name: "settings", icon: Database, label: "Settings" },
];

export default function DatabasePage() {
  const [activeTab, setActiveTab] = useState("courses");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    createClient()
      .from(activeTab)
      .select("*")
      .limit(100)
      .then(({ data: result }) => {
        setData(result ?? []);
        setLoading(false);
      });
  }, [activeTab]);

  const columns = data.length > 0
    ? Object.keys(data[0]).filter(k => k !== "content" && k !== "description")
    : [];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold tracking-tight">Database</h1>
        <p className="text-muted-foreground text-sm mt-1">Lihat semua data di Supabase ({data.length} record).</p>
      </motion.div>

      <div className="flex gap-2 flex-wrap">
        {tables.map(tab => {
          const Icon = tab.icon;
          return (
            <button key={tab.name} onClick={() => setActiveTab(tab.name)}
              className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-medium transition-colors ${activeTab === tab.name ? "bg-primary/10 text-primary border border-primary/20" : "bg-[#0F172A] text-muted-foreground border border-white/[0.06] hover:text-foreground hover:border-white/[0.1]"}`}>
              <Icon className="w-3.5 h-3.5" /> {tab.label}
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl bg-[#0F172A] border border-white/[0.06] overflow-hidden">
        {loading ? (
          <p className="text-sm text-muted-foreground py-12 text-center">Memuat...</p>
        ) : data.length === 0 ? (
          <div className="p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent pointer-events-none" />
            <div className="relative">
              <Database className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">Belum ada data di tabel <span className="text-foreground font-mono">{activeTab}</span>.</p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {columns.map(col => (
                    <th key={col} className="text-left px-4 py-3 text-muted-foreground font-medium whitespace-nowrap">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={row.id ?? i} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                    {columns.map(col => (
                      <td key={col} className="px-4 py-2.5 text-foreground/80 whitespace-nowrap max-w-[200px] truncate">
                        {col === "created_at" || col === "last_sign_in_at" ? (
                          <span className="text-muted-foreground">{new Date(row[col]).toLocaleDateString("id-ID", { year: "numeric", month: "short", day: "numeric" })}</span>
                        ) : typeof row[col] === "object" ? (
                          <span className="text-muted-foreground italic">{JSON.stringify(row[col]).slice(0, 50)}</span>
                        ) : String(row[col])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
