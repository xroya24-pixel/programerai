"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Monitor, Server, Brain, Container, Code2, Database, Globe, Smartphone } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";

const iconMap: Record<string, typeof Monitor> = { Monitor, Server, Brain, Container, Code2, Database, Globe, Smartphone };
const colorMap = [
  { gradient: "from-indigo-500/20 to-blue-500/10", border: "hover:border-indigo-500/30", iconBg: "bg-indigo-500/10 border-indigo-500/20", iconColor: "text-indigo-400" },
  { gradient: "from-emerald-500/20 to-cyan-500/10", border: "hover:border-emerald-500/30", iconBg: "bg-emerald-500/10 border-emerald-500/20", iconColor: "text-emerald-400" },
  { gradient: "from-purple-500/20 to-pink-500/10", border: "hover:border-purple-500/30", iconBg: "bg-purple-500/10 border-purple-500/20", iconColor: "text-purple-400" },
  { gradient: "from-amber-500/20 to-orange-500/10", border: "hover:border-amber-500/30", iconBg: "bg-amber-500/10 border-amber-500/20", iconColor: "text-amber-400" },
  { gradient: "from-rose-500/20 to-pink-500/10", border: "hover:border-rose-500/30", iconBg: "bg-rose-500/10 border-rose-500/20", iconColor: "text-rose-400" },
  { gradient: "from-cyan-500/20 to-blue-500/10", border: "hover:border-cyan-500/30", iconBg: "bg-cyan-500/10 border-cyan-500/20", iconColor: "text-cyan-400" },
  { gradient: "from-violet-500/20 to-purple-500/10", border: "hover:border-violet-500/30", iconBg: "bg-violet-500/10 border-violet-500/20", iconColor: "text-violet-400" },
  { gradient: "from-orange-500/20 to-amber-500/10", border: "hover:border-orange-500/30", iconBg: "bg-orange-500/10 border-orange-500/20", iconColor: "text-orange-400" },
];

const defaultItems: Record<string, string[]> = {
  Monitor: ["HTML", "CSS", "React"],
  Server: ["Node.js", "Database", "API"],
  Brain: ["OpenAI", "Automation", "AI"],
  Container: ["Docker", "VPS", "CI/CD"],
  Code2: ["Git", "Testing", "Tools"],
  Database: ["SQL", "NoSQL", "ORM"],
  Globe: ["DNS", "HTTP", "Security"],
  Smartphone: ["iOS", "Android", "PWA"],
};

const defaultCards = [
  { title: "Frontend Development", icon: "Monitor", description: "Bangun interface modern dengan framework terkini.", total_courses: 32 },
  { title: "Backend Development", icon: "Server", description: "Kuasai server-side programming dan database.", total_courses: 24 },
  { title: "AI Programming", icon: "Brain", description: "Integrasikan AI ke dalam workflow development.", total_courses: 18 },
  { title: "DevOps & Deploy", icon: "Container", description: "Deploy aplikasi dengan confidence.", total_courses: 15 },
];

export function MainCards() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    createClient().from("categories").select("*, courses(id)").order("sort_order", { ascending: true })
      .then(({ data }) => setCategories((data ?? []).map((c: any) => ({ ...c, total_courses: c.courses?.length ?? 0 }))));
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
      </div>
    </section>
  );
}
