"use client";

import { motion } from "framer-motion";
import { Save, Globe, Bell, Shield } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";

interface Settings {
  siteName: string;
  tagline: string;
  notifications: string[];
  adminName: string;
  adminEmail: string;
}

const defaultSettings: Settings = {
  siteName: "ProgramerAI",
  tagline: "Platform belajar coding modern dengan materi terstruktur untuk developer Indonesia.",
  notifications: ["Email baru user terdaftar"],
  adminName: "Admin ProgramerAI",
  adminEmail: "admin@programerai.com",
};

const allNotifications = ["Email baru user terdaftar", "Email saat transaksi baru", "Notifikasi course baru"];

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const supabase = createClient();
    await supabase.from("settings").upsert({ key: "site_name", value: settings.siteName }).eq("key", "site_name");
    await supabase.from("settings").upsert({ key: "tagline", value: settings.tagline }).eq("key", "tagline");
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleNotification = (item: string) => {
    setSettings(prev => ({
      ...prev,
      notifications: prev.notifications.includes(item)
        ? prev.notifications.filter(n => n !== item)
        : [...prev.notifications, item],
    }));
  };

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Pengaturan platform ProgramerAI.</p>
      </motion.div>

      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="rounded-2xl bg-[#0F172A] border border-white/[0.06] p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20"><Globe className="w-4 h-4 text-primary" /></div>
            <h2 className="text-sm font-semibold">Umum</h2>
          </div>
          <div className="space-y-5">
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5">Nama Website</label>
              <input type="text" value={settings.siteName} onChange={(e) => setSettings(p => ({ ...p, siteName: e.target.value }))}
                className="w-full h-10 px-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-foreground focus:outline-none focus:border-primary/30" />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5">Tagline</label>
              <textarea value={settings.tagline} onChange={(e) => setSettings(p => ({ ...p, tagline: e.target.value }))} rows={2}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-foreground focus:outline-none focus:border-primary/30 resize-none" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="rounded-2xl bg-[#0F172A] border border-white/[0.06] p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20"><Bell className="w-4 h-4 text-purple-400" /></div>
            <h2 className="text-sm font-semibold">Notifikasi</h2>
          </div>
          <div className="space-y-4">
            {allNotifications.map((item) => {
              const on = settings.notifications.includes(item);
              return (
                <label key={item} className="flex items-center justify-between cursor-pointer group">
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{item}</span>
                  <button type="button" onClick={() => toggleNotification(item)}
                    className={`relative w-9 h-5 rounded-full transition-colors border ${on ? "bg-primary border-primary/30" : "bg-white/[0.08] border-white/[0.06]"}`}>
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${on ? "left-[18px]" : "left-0.5"}`} />
                  </button>
                </label>
              );
            })}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="rounded-2xl bg-[#0F172A] border border-white/[0.06] p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20"><Shield className="w-4 h-4 text-amber-400" /></div>
            <h2 className="text-sm font-semibold">Admin Profile</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5">Nama</label>
              <input type="text" value={settings.adminName} onChange={(e) => setSettings(p => ({ ...p, adminName: e.target.value }))}
                className="w-full h-10 px-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-foreground focus:outline-none focus:border-primary/30" />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5">Email</label>
              <input type="email" value={settings.adminEmail} onChange={(e) => setSettings(p => ({ ...p, adminEmail: e.target.value }))}
                className="w-full h-10 px-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-foreground focus:outline-none focus:border-primary/30" />
            </div>
          </div>
        </motion.div>

        <div className="flex justify-end">
          <button onClick={handleSave} disabled={saving}
            className={`inline-flex items-center gap-2 h-10 px-6 rounded-xl text-sm font-medium transition-all disabled:opacity-50 ${
              saved
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(99,102,241,0.12)] hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]"
            }`}>
            <Save className="w-4 h-4" />
            {saving ? "Menyimpan..." : saved ? "Tersimpan!" : "Simpan Pengaturan"}
          </button>
        </div>
      </div>
    </div>
  );
}
