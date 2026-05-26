"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, LogIn, Loader2, AlertCircle, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) { setError(error.message); setLoading(false); }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) throw new Error(authError.message);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Gagal mendapatkan user.");
      let role = "member";
      try {
        const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
        if (profile?.role) role = profile.role;
      } catch {}
      document.cookie = `opencode_session=${encodeURIComponent(JSON.stringify({ email: user.email, role }))};path=/;max-age=86400`;
      window.location.href = role === "super_admin" || role === "admin" ? "/admin/dashboard" : "/member/dashboard";
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 radial-glow" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-2xl bg-white/[0.03] border border-white/[0.06] p-8 md:p-12 w-full max-w-sm"
      >
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2.5 mb-2">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 border border-primary/20">
              <Terminal className="w-4.5 h-4.5 text-primary" />
            </div>
            <span className="text-xl font-semibold tracking-tight">ProgramerAI</span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">Masuk dengan akun Anda.</p>
        </div>

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="block text-xs text-muted-foreground mb-1.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                placeholder="admin@example.com"
                className="w-full h-10 pl-9 pr-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/30" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
              <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required
                className="w-full h-10 pl-9 pr-9 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/30" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-foreground transition-colors">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="inline-flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-10 text-sm font-medium transition-colors disabled:opacity-50">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
            Masuk
          </button>
        </form>

        <div className="mt-4">
          <div className="relative my-3">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/[0.06]" /></div>
            <div className="relative flex justify-center"><span className="px-2 text-xs text-muted-foreground/40 bg-[#060816]">atau</span></div>
          </div>
          <button onClick={handleGoogleLogin} disabled={loading}
            className="inline-flex items-center justify-center gap-2.5 w-full border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] text-foreground rounded-xl h-10 text-sm font-medium transition-colors disabled:opacity-50">
            <LogIn className="w-4 h-4" />
            Login dengan Google
          </button>
        </div>

        {error && <p className="text-xs text-red-400 mt-4 text-center">{error}</p>}
      </motion.div>
    </div>
  );
}
