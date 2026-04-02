"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Loader2,
  Bot,
  User,
  Minimize2,
  UserCircle,
  Check,
  Star,
} from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const MAX_CHARS = 1000;
const MAX_MESSAGES = 50;

const QUICK_PROMPTS = [
  "What services do you offer?",
  "How much does a custom CRM cost?",
  "Can you replace my SaaS tools?",
  "I want to see a demo",
];

export function LiveChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [conversationLimited, setConversationLimited] = useState(false);
  const [showEscalation, setShowEscalation] = useState(false);
  const [escalationSent, setEscalationSent] = useState(false);
  const [escName, setEscName] = useState("");
  const [escEmail, setEscEmail] = useState("");
  const [escLoading, setEscLoading] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [showRating, setShowRating] = useState(false);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  // Check if chatbot is enabled
  useEffect(() => {
    fetch("/api/admin/settings?key=chatbot_enabled")
      .then((r) => r.json())
      .then((data) => {
        if (data.value === "false") setEnabled(false);
      })
      .catch(() => {});
  }, []);

  // Session persistence — load or create on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("iolab-chat-session");
    if (stored) {
      try {
        const { id, startedAt } = JSON.parse(stored);
        const age = Date.now() - startedAt;
        if (age < 24 * 60 * 60 * 1000) {
          // Resume session
          setSessionId(id);
          fetch("/api/chat/session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId: id, page: pathname }),
          })
            .then((r) => r.json())
            .then((data) => {
              if (data.resumed && data.messages?.length > 0) {
                setMessages(data.messages);
                setMessageCount(data.messageCount || data.messages.length);
                setHasInteracted(true);
                if (data.userRating) {
                  setRatingSubmitted(true);
                  setUserRating(data.userRating);
                }
              }
              setSessionId(data.sessionId);
            })
            .catch(() => {});
          return;
        }
      } catch { /* ignore corrupt data */ }
    }

    // Create new session
    fetch("/api/chat/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: pathname }),
    })
      .then((r) => r.json())
      .then((data) => {
        setSessionId(data.sessionId);
        localStorage.setItem(
          "iolab-chat-session",
          JSON.stringify({ id: data.sessionId, startedAt: Date.now() })
        );
      })
      .catch(() => {});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const isAdmin = pathname.startsWith("/admin");
  if (isAdmin || !enabled) return null;

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    if (open && inputRef.current && !showEscalation) {
      inputRef.current.focus();
    }
  }, [open, showEscalation]);

  function handleOpen() {
    setOpen(true);
    if (messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content:
            "Hi! 👋 I'm the iOLab AI assistant. I can help you learn about our custom software, answer pricing questions, or point you to the right demo. What can I help you with?",
        },
      ]);
    }
  }

  async function sendMessage(text: string) {
    if (!text.trim() || loading || conversationLimited) return;

    const userMsg: Message = { role: "user", content: text.trim().slice(0, MAX_CHARS) };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);
    setHasInteracted(true);
    setMessageCount((c) => c + 1);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          sessionId,
          visitorInfo: { page: pathname },
        }),
      });

      const data = await res.json();

      // Handle escalation trigger from API
      if (data.escalation) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
        setShowEscalation(true);
        setLoading(false);
        return;
      }

      // Handle conversation limit
      if (data.conversationLimited) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
        setConversationLimited(true);
        setLoading(false);
        return;
      }

      // Handle rate limit (still show the message)
      if (data.rateLimited) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
        setLoading(false);
        return;
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I'm having trouble connecting. You can reach us at hello@iolab.co or call (609) 200-1127.",
        },
      ]);
    }

    setLoading(false);
  }

  async function handleEscalation(e: React.FormEvent) {
    e.preventDefault();
    if (!escEmail) return;
    setEscLoading(true);

    try {
      await fetch("/api/chat/escalate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: escName,
          email: escEmail,
          messages,
          page: pathname,
        }),
      });
      setEscalationSent(true);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Thanks${escName ? `, ${escName}` : ""}! Rauf will follow up within a few hours. He'll have the full context from our conversation, so you won't need to repeat anything. Check your email for a confirmation.`,
        },
      ]);
      setShowEscalation(false);
    } catch {
      // Silent
    }
    setEscLoading(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  const charsLeft = MAX_CHARS - input.length;

  return (
    <>
      {/* Chat bubble button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={handleOpen}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-white shadow-xl shadow-primary/25 flex items-center justify-center hover:bg-primary/90 transition-colors"
          >
            <MessageCircle className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent border-2 border-white animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] h-[520px] rounded-2xl bg-white shadow-2xl shadow-black/15 border border-gray-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary text-white px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <Image
                  src="https://iolab.nyc3.cdn.digitaloceanspaces.com/images/logo/iolab-logo-latest-white.png"
                  alt="iOLab Digital"
                  width={80}
                  height={25}
                  className="h-5 w-auto"
                />
                <div className="h-4 w-px bg-white/30" />
                <div>
                  <div className="text-xs font-medium">AI Assistant</div>
                  <div className="text-[10px] text-white/70 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    Online
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {/* Talk to Human button */}
                {!escalationSent && (
                  <button
                    onClick={() => setShowEscalation(true)}
                    className="px-2 py-1 rounded-md text-[10px] font-medium bg-white/15 hover:bg-white/25 transition-colors flex items-center gap-1"
                  >
                    <UserCircle className="h-3 w-3" /> Talk to Rauf
                  </button>
                )}
                <button
                  onClick={() => {
                    // Show rating prompt if enough messages and not already rated
                    if (messageCount >= 3 && !ratingSubmitted && !showRating) {
                      setShowRating(true);
                    } else {
                      setOpen(false);
                    }
                  }}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Minimize2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className="flex items-start gap-2 max-w-[85%]">
                    {msg.role === "assistant" && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
                        <Bot className="h-3.5 w-3.5 text-white" />
                      </div>
                    )}
                    <div
                      className={`rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                        msg.role === "user"
                          ? "bg-primary text-white rounded-br-md"
                          : "bg-white border border-gray-200 text-gray-700 rounded-bl-md shadow-sm"
                      }`}
                    >
                      {msg.content.split("\n").map((line, j) => (
                        <span key={j}>
                          {line.split(/(\[.*?\]\(.*?\))/).map((part, k) => {
                            const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
                            if (linkMatch) {
                              return (
                                <a key={k} href={linkMatch[2]} className={`underline font-medium ${msg.role === "user" ? "text-white/90" : "text-primary"}`}>
                                  {linkMatch[1]}
                                </a>
                              );
                            }
                            return part.split(/(\*\*.*?\*\*)/).map((seg, l) => {
                              if (seg.startsWith("**") && seg.endsWith("**")) {
                                return <strong key={l}>{seg.slice(2, -2)}</strong>;
                              }
                              return seg;
                            });
                          })}
                          {j < msg.content.split("\n").length - 1 && <br />}
                        </span>
                      ))}
                    </div>
                    {msg.role === "user" && (
                      <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center shrink-0 mt-0.5">
                        <User className="h-3.5 w-3.5 text-gray-500" />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <Bot className="h-3.5 w-3.5 text-white" />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Escalation form */}
            {showEscalation && !escalationSent && (
              <div className="px-4 py-3 border-t border-gray-200 bg-primary/5 shrink-0">
                <div className="text-xs font-medium text-gray-700 mb-2 flex items-center gap-1.5">
                  <UserCircle className="h-4 w-4 text-primary" />
                  Connect with Rauf
                </div>
                <form onSubmit={handleEscalation} className="space-y-2">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={escName}
                    onChange={(e) => setEscName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <input
                    type="email"
                    placeholder="Your email (required)"
                    value={escEmail}
                    onChange={(e) => setEscEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                    required
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={!escEmail || escLoading}
                      className="flex-1 py-2 rounded-lg bg-primary text-white text-xs font-medium disabled:opacity-50 flex items-center justify-center gap-1"
                    >
                      {escLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Send className="h-3 w-3" />}
                      Send to Rauf
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowEscalation(false)}
                      className="px-3 py-2 rounded-lg border border-gray-200 text-xs text-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Quick prompts */}
            {!hasInteracted && !showEscalation && (
              <div className="px-4 py-2 border-t border-gray-100 bg-white shrink-0">
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      className="text-[11px] px-2.5 py-1.5 rounded-full border border-primary/20 text-primary hover:bg-primary/5 transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Rating prompt */}
            {showRating && !ratingSubmitted && (
              <div className="px-4 py-4 border-t border-gray-200 bg-white text-center shrink-0">
                <p className="text-sm font-medium text-gray-700 mb-2">How did the iOLab chatbot do?</p>
                <div className="flex justify-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      onClick={async () => {
                        setUserRating(s);
                        setRatingSubmitted(true);
                        setShowRating(false);
                        try {
                          await fetch("/api/chat/rate", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ sessionId, rating: s }),
                          });
                        } catch { /* silent */ }
                      }}
                      className="p-1 hover:scale-125 transition-transform"
                    >
                      <Star className={`h-7 w-7 ${userRating && s <= userRating ? "fill-amber-400 text-amber-400" : "text-gray-300 hover:text-amber-300"}`} />
                    </button>
                  ))}
                </div>
                <button onClick={() => { setShowRating(false); setOpen(false); }} className="text-[10px] text-gray-400 hover:text-gray-600">
                  Skip
                </button>
              </div>
            )}

            {/* Rating thank you */}
            {ratingSubmitted && showRating && (
              <div className="px-4 py-3 border-t border-green-200 bg-green-50 text-center shrink-0">
                <p className="text-xs text-green-700 font-medium">Thanks for your feedback! {userRating === 5 && "⭐"}</p>
              </div>
            )}

            {/* Conversation limit banner */}
            {conversationLimited && (
              <div className="px-4 py-3 border-t border-amber-200 bg-amber-50 text-center shrink-0">
                <p className="text-xs text-amber-700 font-medium">
                  Conversation limit reached.{" "}
                  <a href="/contact" className="text-primary underline">
                    Book a free consultation
                  </a>{" "}
                  for a deeper conversation.
                </p>
              </div>
            )}

            {/* Input */}
            {!conversationLimited && !showEscalation && (
              <form
                onSubmit={handleSubmit}
                className="px-3 py-3 border-t border-gray-200 bg-white flex items-center gap-2 shrink-0"
              >
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value.slice(0, MAX_CHARS))}
                    placeholder="Type a message..."
                    disabled={loading}
                    maxLength={MAX_CHARS}
                    className="w-full px-3 py-2 pr-12 rounded-xl bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white border border-transparent focus:border-gray-200 disabled:opacity-50"
                  />
                  {input.length > 800 && (
                    <span className={`absolute right-2 top-1/2 -translate-y-1/2 text-[9px] ${charsLeft < 50 ? "text-red-400" : "text-gray-400"}`}>
                      {charsLeft}
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="p-2 rounded-xl bg-primary text-white disabled:opacity-30 hover:bg-primary/90 transition-colors"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </button>
              </form>
            )}

            {/* Footer */}
            <div className="px-3 py-2 bg-gray-50 border-t border-gray-100 text-center shrink-0">
              <p className="text-[8px] text-gray-400 leading-relaxed">
                This is an AI assistant — helpful but not always perfect. iOLab Digital is not responsible for the accuracy of AI-generated responses. Always{" "}
                <a href="/contact" className="text-primary hover:underline">confirm important details with our team</a>.
              </p>
              {messageCount > 0 && (
                <span className="text-[8px] text-gray-300">{messageCount}/{MAX_MESSAGES} messages</span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
