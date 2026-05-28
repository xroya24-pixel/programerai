"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import {
  MessageCircle, Send, Loader2, User, Search, CheckCheck, Clock, ChevronLeft,
} from "lucide-react";

interface Profile { full_name: string | null; email: string }
interface Conversation {
  id: string; user_id: string; admin_id: string | null; title: string; status: string; created_at: string; updated_at: string;
  profiles: Profile | null; last_message?: string; unread?: number;
}
interface Message {
  id: string; conversation_id: string; sender_id: string; content: string; created_at: string; read_at: string | null;
  sender_name?: string;
}

export default function AdminSupportPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [adminId, setAdminId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const channelRef = useRef<any>(null);
  const supabase = createClient();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }); }, [messages]);

  // Init
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }
      setAdminId(user.id);

      const { data: convs } = await supabase
        .from("conversations")
        .select("*, profiles(full_name, email)")
        .order("updated_at", { ascending: false });
      const list = (convs ?? []) as unknown as Conversation[];

      for (const conv of list) {
        const { data: lastMsg } = await supabase.from("messages")
          .select("content").eq("conversation_id", conv.id).order("created_at", { ascending: false }).limit(1).maybeSingle();
        const { count: unread } = await supabase.from("messages")
          .select("id", { count: "exact", head: true }).eq("conversation_id", conv.id).neq("sender_id", user.id).is("read_at", null);
        conv.last_message = lastMsg?.content ?? "";
        conv.unread = unread ?? 0;
      }
      setConversations(list);
      setLoading(false);
    };
    init();
  }, []);

  // Load messages when conversation selected + Realtime Broadcast
  useEffect(() => {
    if (!selected || !adminId) return;
    let cancelled = false;

    const load = async () => {
      const { data: msgs } = await supabase.from("messages")
        .select("*").eq("conversation_id", selected.id).order("created_at", { ascending: true });
      if (cancelled) return;
      setMessages((msgs ?? []) as Message[]);

      const unreadIds = (msgs ?? []).filter(m => m.sender_id !== adminId && !m.read_at).map(m => m.id);
      if (unreadIds.length > 0) {
        await supabase.from("messages").update({ read_at: new Date().toISOString() }).in("id", unreadIds);
        setConversations(prev => prev.map(c => c.id === selected.id ? { ...c, unread: 0 } : c));
      }
      if (!selected.admin_id) {
        await supabase.from("conversations").update({ admin_id: adminId }).eq("id", selected.id);
        setSelected(prev => prev ? { ...prev, admin_id: adminId } : null);
      }
    };
    load();

    // Subscribe to Broadcast channel
    const channel = supabase.channel(`chat:${selected.id}`);
    channel.on("broadcast", { event: "message" }, (payload: any) => {
      if (cancelled) return;
      setMessages(prev => prev.some(m => m.id === payload.payload.id) ? prev : [...prev, payload.payload]);
    });
    channel.subscribe();
    channelRef.current = channel;

    return () => { cancelled = true; supabase.removeChannel(channel); };
  }, [selected?.id, adminId]);

  // Listen for new conversations
  useEffect(() => {
    const channel = supabase.channel("admin-convs");
    channel.on("broadcast", { event: "new-conversation" }, (payload: any) => {
      setConversations(prev => prev.some(c => c.id === payload.payload.id) ? prev : [payload.payload, ...prev]);
    });
    channel.subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const handleSend = async () => {
    if (!input.trim() || !selected || !adminId) return;
    setSending(true);
    const content = input.trim();
    setInput("");

    const msg: Message = {
      id: crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
      conversation_id: selected.id,
      sender_id: adminId,
      content,
      created_at: new Date().toISOString(),
      read_at: null,
      sender_name: "Admin",
    };

    setMessages(prev => [...prev, msg]);

    await supabase.from("messages").insert({
      id: msg.id, conversation_id: msg.conversation_id, sender_id: msg.sender_id, content: msg.content,
    });

    // Broadcast to everyone
    const ch = channelRef.current ?? supabase.channel(`chat:${selected.id}`);
    if (!channelRef.current) ch.subscribe();
    ch.send({ type: "broadcast", event: "message", payload: msg });

    // Update conversation list
    setConversations(prev => {
      const updated = prev.filter(c => c.id !== selected.id);
      return [{ ...selected, last_message: content, updated_at: msg.created_at }, ...updated];
    });

    setSending(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const filteredConvs = conversations.filter(c => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (c.title?.toLowerCase() ?? "").includes(q)
      || (c.profiles?.full_name?.toLowerCase() ?? "").includes(q)
      || (c.profiles?.email?.toLowerCase() ?? "").includes(q);
  });

  if (loading) return <div className="flex items-center justify-center py-20"><div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div>;

  return (
    <div className="flex h-[calc(100vh-7rem)] -m-6 md:-m-8">
      {/* Conversation List */}
      <div className={cn("w-[280px] shrink-0 border-r border-white/[0.04] flex flex-col bg-[#0F172A]/50", selected && "hidden md:flex")}>
        <div className="p-3 border-b border-white/[0.04]">
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className="w-4 h-4 text-primary" />
            <h2 className="text-xs font-semibold tracking-tight">Conversations</h2>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/30" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
              className="w-full h-8 pl-8 pr-3 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/30" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto space-y-0.5 p-1.5">
          {filteredConvs.length === 0 && (
            <p className="text-center text-xs text-muted-foreground/40 py-8">Belum ada percakapan.</p>
          )}
          {filteredConvs.map(conv => (
            <button key={conv.id} onClick={() => setSelected(conv)}
              className={cn("w-full text-left p-3 rounded-xl transition-all", selected?.id === conv.id ? "bg-primary/[0.08] border border-primary/[0.12]" : "hover:bg-white/[0.03] border border-transparent")}>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-primary/60" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold truncate">{conv.profiles?.full_name ?? conv.title}</span>
                    {(conv.unread ?? 0) > 0 && (
                      <span className="shrink-0 flex items-center justify-center w-4 h-4 rounded-full bg-primary text-[8px] font-bold text-primary-foreground">{conv.unread}</span>
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground/50 truncate mt-0.5">{conv.last_message ?? conv.status}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className={cn("flex-1 flex flex-col", !selected && "hidden md:flex")}>
        {!selected ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="w-10 h-10 text-muted-foreground/20 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground/60">Pilih percakapan untuk mulai membalas.</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2.5 px-4 py-3 border-b border-white/[0.04] shrink-0">
              <button onClick={() => setSelected(null)} className="md:hidden p-1 rounded hover:bg-white/[0.05]">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                <User className="w-4 h-4 text-primary/60" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">{selected.profiles?.full_name ?? selected.title}</p>
                <p className="text-xs text-muted-foreground/50 truncate">{selected.profiles?.email}</p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <MessageCircle className="w-8 h-8 text-muted-foreground/20 mb-2" />
                  <p className="text-xs text-muted-foreground/60">Belum ada pesan.</p>
                </div>
              )}
              {messages.map(msg => {
                const isAdmin = msg.sender_id === adminId;
                return (
                  <div key={msg.id} className={cn("flex", isAdmin ? "justify-end" : "justify-start")}>
                    <div className={cn("max-w-[75%] space-y-1", isAdmin && "items-end")}>
                      <div className={cn("rounded-2xl px-4 py-2.5 text-sm leading-relaxed", isAdmin ? "bg-primary/20 text-foreground rounded-br-md" : "bg-white/[0.04] text-foreground rounded-bl-md")}>
                        <p className="text-xs text-muted-foreground/50 mb-1">{isAdmin ? "Admin" : (msg.sender_name ?? "User")}</p>
                        <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                      </div>
                      <div className="flex items-center gap-1.5 px-1">
                        <span className="text-[10px] text-muted-foreground/40">
                          {new Date(msg.created_at).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                        {isAdmin && (
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
                <textarea ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
                  rows={1} placeholder="Ketik balasan..."
                  className="flex-1 max-h-32 rounded-xl bg-white/[0.04] border border-white/[0.06] px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/30 resize-none" />
                <button onClick={handleSend} disabled={!input.trim() || sending}
                  className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground transition-all disabled:opacity-40 shrink-0 shadow-[0_0_12px_rgba(99,102,241,0.12)]">
                  {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
