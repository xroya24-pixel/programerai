"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { useUserRole } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { Send, Loader2, MessageCircle, Crown, CheckCheck, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string; conversation_id: string; sender_id: string; content: string; created_at: string; read_at: string | null;
  sender_name?: string;
}
interface Conversation {
  id: string; user_id: string; admin_id: string | null; title: string; status: string;
}

export default function MemberChatPage() {
  const { role, loading: roleLoading } = useUserRole();
  const router = useRouter();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();
  const msgSetRef = useRef<Set<string>>(new Set());
  const lastCountRef = useRef(0);
  const convRef = useRef<Conversation | null>(null);
  const uidRef = useRef<string | null>(null);

  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }); }, [messages]);

  useEffect(() => {
    if (roleLoading || (role !== "premium" && role !== "admin" && role !== "super_admin")) return;
    let cancelled = false;

    const init = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || cancelled) { setLoading(false); return; }
      setUserId(user.id);
      uidRef.current = user.id;

      let { data: conv } = await supabase.from("conversations").select("*")
        .eq("user_id", user.id).order("updated_at", { ascending: false }).limit(1).maybeSingle();

      if (!conv) {
        const { data: profile } = await supabase.from("profiles").select("full_name, email").eq("id", user.id).single();
        const { data: newConv } = await supabase.from("conversations").insert({
          user_id: user.id, title: profile?.full_name ?? profile?.email ?? "Chat", status: "open",
        }).select().single();
        conv = newConv;
      }

      if (conv && !cancelled) {
        setConversation(conv as unknown as Conversation);
        convRef.current = conv as unknown as Conversation;
        await loadMessages(conv.id, user.id);
      }
      if (!cancelled) setLoading(false);
    };

    const loadMessages = async (convId: string, uid: string) => {
      const { data: msgs } = await supabase.from("messages")
        .select("*").eq("conversation_id", convId).order("created_at", { ascending: true });
      if (cancelled) return;
      const list = (msgs ?? []) as Message[];
      if (list.length !== lastCountRef.current) {
        msgSetRef.current = new Set(list.map(m => m.id));
        setMessages(list);
        lastCountRef.current = list.length;

        const unreadIds = list.filter(m => m.sender_id !== uid && !m.read_at).map(m => m.id);
        if (unreadIds.length > 0) {
          await supabase.from("messages").update({ read_at: new Date().toISOString() }).in("id", unreadIds);
        }
      }

      // Notify admin about new conversation
      if (list.length === 0) {
        const { data: prof } = await supabase.from("profiles").select("full_name, email").eq("id", uid).single();
        try {
          const ch = supabase.channel("admin-convs-global");
          ch.subscribe();
          ch.send({ type: "broadcast", event: "new-conversation", payload: { id: convId, user_id: uid, title: "Chat", profiles: prof } });
        } catch {}
      }
    };

    init();

    // Polling fallback
    const interval = setInterval(async () => {
      const c = convRef.current;
      const u = uidRef.current;
      if (c && u) await loadMessages(c.id, u);
    }, 2000);

    return () => { cancelled = true; clearInterval(interval); };
  }, [roleLoading, role, conversation?.id]);

  const handleSend = async () => {
    if (!input.trim() || !conversation || !userId) return;
    setSending(true);
    const content = input.trim();
    setInput("");

    const msg: Message = {
      id: crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
      conversation_id: conversation.id,
      sender_id: userId,
      content,
      created_at: new Date().toISOString(),
      read_at: null,
    };

    msgSetRef.current.add(msg.id);
    setMessages(prev => [...prev, msg]);

    await supabase.from("messages").insert({
      id: msg.id, conversation_id: msg.conversation_id, sender_id: msg.sender_id, content: msg.content,
    });

    try {
      const ch = supabase.channel(`chat-${conversation.id}`);
      ch.subscribe();
      ch.send({ type: "broadcast", event: "message", payload: msg });
    } catch {}

    setSending(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  if (roleLoading) return <div className="flex items-center justify-center py-20"><div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div>;

  if (role !== "premium" && role !== "admin" && role !== "super_admin") {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Crown className="w-12 h-12 text-muted-foreground/20" />
        <p className="text-sm text-muted-foreground/70">Fitur chat hanya untuk premium.</p>
        <button onClick={() => router.push("/member/premium")}
          className="h-9 px-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-medium transition-all shadow-[0_0_20px_rgba(99,102,241,0.15)]">
          Upgrade Sekarang
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
          <MessageCircle className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight">Live Chat</h1>
          <p className="text-xs text-muted-foreground/60">Konsultasi dengan admin.</p>
        </div>
      </motion.div>

      {loading ? (
        <div className="flex items-center justify-center py-16"><Loader2 className="w-5 h-5 text-primary animate-spin" /></div>
      ) : (
        <div className="flex-1 rounded-2xl bg-[#0F172A] border border-white/[0.04] flex flex-col overflow-hidden">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <MessageCircle className="w-8 h-8 text-muted-foreground/20 mb-2" />
                <p className="text-xs text-muted-foreground/60">Mulai percakapan dengan admin.</p>
              </div>
            )}
            {messages.map(msg => {
              const isMe = msg.sender_id === userId;
              return (
                <div key={msg.id} className={cn("flex", isMe ? "justify-end" : "justify-start")}>
                  <div className={cn("max-w-[75%] space-y-1", isMe && "items-end")}>
                    <div className={cn("rounded-2xl px-4 py-2.5 text-sm leading-relaxed", isMe ? "bg-primary/20 text-foreground rounded-br-md" : "bg-white/[0.04] text-foreground rounded-bl-md")}>
                      <p className="text-xs text-muted-foreground/50 mb-1">{isMe ? "Kamu" : (msg.sender_name ?? "Admin")}</p>
                      <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                    </div>
                    <div className="flex items-center gap-1.5 px-1">
                      <span className="text-[10px] text-muted-foreground/40">
                        {new Date(msg.created_at).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                      </span>
                      {isMe && (
                        msg.read_at
                          ? <CheckCheck className="w-3 h-3 text-emerald-400/60" />
                          : <Clock className="w-3 h-3 text-muted-foreground/30" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-white/[0.04] p-3">
            <div className="flex items-end gap-2">
              <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
                rows={1} placeholder="Ketik pesan..."
                className="flex-1 max-h-32 rounded-xl bg-white/[0.04] border border-white/[0.06] px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/30 resize-none" />
              <button onClick={handleSend} disabled={!input.trim() || sending}
                className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground transition-all disabled:opacity-40 shrink-0 shadow-[0_0_12px_rgba(99,102,241,0.12)]">
                {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
