"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Monitor, Server, Brain, Container, Code2, Database, Globe, Smartphone, Sparkles, Zap, MessageSquare, Bot } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";

const iconMap: Record<string, typeof Monitor> = { Monitor, Server, Brain, Container, Code2, Database, Globe, Smartphone };
const colorMap = [
  { gradient: "from-indigo-500/20 to-blue-500/10", border: "hover:border-indigo-500/30", iconBg: "bg-indigo-500/10 border-indigo-500/20", iconColor: "text-indigo-400" },
  { gradient: "from-emerald-500/20 to-cyan-500/10", border: "hover:border-emerald-500/30", iconBg: "bg-emerald-500/10 border-emerald-500/20", iconColor: "text-emerald-400" },
  { gradient: "from-purple-500/20 to-pink-500/10", border: "hover:border-purple-500/30", iconBg: "bg-purple-500/10 border-purple-500/20", iconColor: "text-purple-400" },
  { gradient: "from-amber-500/20 to-orange-500/10", border: "hover:border-amber-500/30", iconBg: "bg-amber-500/10 border-amber-500/20", iconColor: "text-amber-400" },
];

const defaultItems: Record<string, string[]> = {
  Monitor: ["HTML", "CSS", "React"],
  Server: ["Node.js", "Database", "API"],
  Brain: ["OpenAI", "Automation", "AI"],
  Container: ["Docker", "VPS", "CI/CD"],
};

const defaultCards = [
  { title: "Frontend Development", icon: "Monitor", description: "Bangun interface modern dengan framework terkini.", total_courses: 32 },
  { title: "Backend Development", icon: "Server", description: "Kuasai server-side programming dan database.", total_courses: 24 },
  { title: "AI Programming", icon: "Brain", description: "Integrasikan AI ke dalam workflow development.", total_courses: 18 },
  { title: "DevOps & Deploy", icon: "Container", description: "Deploy aplikasi dengan confidence.", total_courses: 15 },
];

const aiTools = [
  { name: "ChatGPT", color: "from-emerald-500/20 to-teal-500/10", border: "border-emerald-500/20", icon: "💬", messages: ["Jelaskan konsep DOM dalam JavaScript", "DOM adalah Document Object Model..."] },
  { name: "Claude", color: "from-purple-500/20 to-pink-500/10", border: "border-purple-500/20", icon: "🤖", messages: ["Bantu saya debug kode React", "Tentu, saya lihat ada issue di useEffect..."] },
  { name: "Gemini", color: "from-blue-500/20 to-cyan-500/10", border: "border-blue-500/20", icon: "✨", messages: ["Optimasi query SQL ini dong", "Bisa, pakai indexing pada kolom..."] },
  { name: "Copilot", color: "from-orange-500/20 to-amber-500/10", border: "border-orange-500/20", icon: "🧠", messages: ["Generate fungsi sorting", "Berikut implementasi quicksort..."] },
];

function TypeWriter({ text, delay = 30 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [i, setI] = useState(0);

  useEffect(() => { setDisplayed(""); setI(0); }, [text]);

  useEffect(() => {
    if (i >= text.length) return;
    const t = setTimeout(() => { setDisplayed(text.slice(0, i + 1)); setI(i + 1); }, delay);
    return () => clearTimeout(t);
  }, [i, text, delay]);

  return <span>{displayed}{i < text.length ? <span className="animate-pulse">|</span> : null}</span>;
}

export function MainCards() {
  const [categories, setCategories] = useState<any[]>([]);
  const [activeAi, setActiveAi] = useState(0);

  useEffect(() => {
    createClient().from("categories").select("*, courses(id)").order("sort_order", { ascending: true })
      .then(({ data }) => setCategories((data ?? []).map((c: any) => ({ ...c, total_courses: c.courses?.length ?? 0 }))));
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveAi((prev) => (prev + 1) % aiTools.length), 6000);
    return () => clearInterval(t);
  }, []);

  const cards = categories.length > 0 ? categories : defaultCards;

  return (
    <section className="relative pt-28 md:pt-36 pb-16 md:pb-24">
      <div className="absolute inset-0 radial-glow-center opacity-50" />

      <div className="relative mx-auto max-w-6xl px-6">
        <p className="text-sm text-muted-foreground/70 text-center mb-8">
          Bismillah, Platform belajar coding modern dengan materi terstruktur untuk developer Indonesia.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {cards.map((cat, i) => {
            const Icon = iconMap[cat.icon] ?? Monitor;
            const colors = colorMap[i % colorMap.length];
            return (
              <motion.a
                key={cat.title ?? cat.id}
                href="/login"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className={`group relative rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] p-8 transition-all duration-300 ${colors.border} glow-primary-hover cursor-pointer overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative">
                  <div className="flex items-start justify-between mb-5">
                    <div className={`flex items-center justify-center w-11 h-11 rounded-xl ${colors.iconBg} border`}>
                      <Icon className={`w-5 h-5 ${colors.iconColor}`} />
                    </div>
                    <Badge variant="outline" className="border-white/10 text-muted-foreground text-xs rounded-full bg-white/[0.03]">
                      {cat.total_courses ?? cat.total ?? 0} materi
                    </Badge>
                  </div>

                  <h3 className="text-lg font-semibold mb-2">{cat.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{cat.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {defaultItems[cat.icon]?.map((item: string) => (
                      <span key={item} className="text-xs text-muted-foreground bg-white/[0.05] rounded-md px-2.5 py-1 border border-white/[0.04]">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* AI Tools Animation Section */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-lg font-semibold">Belajar dengan AI</h2>
          </div>
          <p className="text-sm text-muted-foreground/60 mb-8">Praktik langsung dengan AI assistant terpopuler.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {aiTools.map((tool, i) => {
              const active = activeAi === i;
              return (
                <motion.div key={tool.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  onClick={() => setActiveAi(i)}
                  className={`relative rounded-2xl bg-[#0F172A] border ${tool.border} p-4 transition-all duration-300 cursor-pointer overflow-hidden ${active ? "shadow-[0_0_24px_rgba(99,102,241,0.08)]" : "hover:border-white/[0.08]"}`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-20 pointer-events-none`} />
                  <div className="relative">
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] text-sm">
                        {tool.icon}
                      </div>
                      <span className="text-sm font-semibold">{tool.name}</span>
                      {active && <span className="ml-auto flex h-2 w-2"><span className="animate-ping absolute h-2 w-2 rounded-full bg-primary opacity-75" /><span className="relative rounded-full h-2 w-2 bg-primary" /></span>}
                    </div>
                    <div className="space-y-2">
                      <div className="rounded-xl bg-white/[0.04] px-3 py-2 text-xs text-muted-foreground/80">
                        {tool.messages[0]}
                      </div>
                      <motion.div key={active ? "active" : "inactive"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
                        className="rounded-xl bg-primary/10 border border-primary/20 px-3 py-2.5 text-xs text-foreground">
                        {active ? <TypeWriter text={tool.messages[1]} /> : tool.messages[1]}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
