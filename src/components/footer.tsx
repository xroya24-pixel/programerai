"use client";

import { Terminal } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06]">
      <div className="mx-auto max-w-6xl px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 border border-primary/20">
              <Terminal className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="text-sm font-semibold tracking-tight">
              ProgramerAI
            </span>
          </a>

          <p className="text-xs text-muted-foreground/60">
            © 2026 ProgramerAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
