"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, Terminal } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#060816]/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 border border-primary/20">
            <Terminal className="w-4 h-4 text-primary" />
          </div>
          <span className="text-lg font-semibold tracking-tight">
            ProgramerAI
          </span>
        </a>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="/login"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Login
          </a>
          <a
            href="/login"
            className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg h-9 px-5 text-sm font-medium glow-primary-hover transition-colors"
          >
            Mulai Belajar
          </a>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger className="inline-flex items-center justify-center w-9 h-9 rounded-lg hover:bg-white/5 transition-colors">
              <Menu className="w-5 h-5 text-foreground" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-[#0B1120] border-l border-white/5 w-72"
            >
              <SheetHeader>
                <SheetTitle className="text-foreground">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 px-4 mt-4">
                <SheetClose>
                  <a
                    href="/login"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2.5 rounded-lg hover:bg-white/5 px-3 block"
                  >
                    Login
                  </a>
                </SheetClose>
                <a
                  href="/login"
                  className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg h-10 text-sm font-medium mt-2 w-full transition-colors"
                >
                  Mulai Belajar
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
}
