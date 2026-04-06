"use client";

import { useState, useEffect } from "react";
import {
  MessageCircle,
  Star,
  Clock,
  User,
  Bot,
  Loader2,
  X,
  Sparkles,
} from "lucide-react";

type Session = {
  id: number;
  sessionId: string;
  visitorPage: string | null;
  startedAt: string;
  lastActiveAt: string;
  messageCount: number;
  userRating: number | null;
  adminRating: number | null;
  status: string;
};

type Message = {
  id: number;
  role: string;
  content: string;
  createdAt: string;
};

function StarRating({
  value,
  onChange,
  readonly = false,
}: {
  value: number | null;
  onChange?: (v: number) => void;
  readonly?: boolean;
}) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          onClick={() => !readonly && onChange?.(s)}
          disabled={readonly}
          className={`${readonly ? "" : "hover:scale-110 cursor-pointer"} transition-transform`}
        >
          <Star
            className={`h-4 w-4 ${
              value && s <= value
                ? "fill-amber-400 text-amber-400"
                : "text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export default function AdminChatsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [ratingLoading, setRatingLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchSessions();
  }, []);

  async function fetchSessions() {
    try {
      const res = await fetch("/api/admin/chat");
      const data = await res.json();
      setSessions(data.sessions || []);
    } catch { /* silent */ }
    setLoading(false);
  }

  async function viewTranscript(sessionId: string) {
    setSelectedSession(sessionId);
    setMessagesLoading(true);
    try {
      const res = await fetch(`/api/admin/chat/messages?sessionId=${sessionId}`);
      const data = await res.json();
      setMessages(data.messages || []);
    } catch { /* silent */ }
    setMessagesLoading(false);
  }

  async function rateSession(sessionId: string, rating: number) {
    setRatingLoading(sessionId);
    try {
      await fetch("/api/admin/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, rating }),
      });
      setSessions((prev) =>
        prev.map((s) =>
          s.sessionId === sessionId ? { ...s, adminRating: rating } : s
        )
      );
    } catch { /* silent */ }
    setRatingLoading(null);
  }

  const totalChats = sessions.length;
  const ratedChats = sessions.filter((s) => s.userRating).length;
  const avgUserRating = ratedChats > 0
    ? (sessions.filter((s) => s.userRating).reduce((s, c) => s + (c.userRating || 0), 0) / ratedChats).toFixed(1)
    : "—";
  const fiveStarCount = sessions.filter((s) => s.adminRating === 5).length;

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="p-3 md:p-6 max-w-6xl">
      <h1 className="text-xl md:text-2xl font-bold font-display mb-6">Chat Sessions</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
        <div className="rounded-xl bg-white border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{totalChats}</div>
              <div className="text-xs text-gray-500">Total Chats</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-white border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
              <Star className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <div className="text-2xl font-bold">{avgUserRating}</div>
              <div className="text-xs text-gray-500">Avg User Rating</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-white border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{fiveStarCount}</div>
              <div className="text-xs text-gray-500">5-Star (Learned)</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-white border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
              <Clock className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{ratedChats}</div>
              <div className="text-xs text-gray-500">User Rated</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Sessions list */}
        <div className="flex-1 rounded-xl bg-white border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-bold">All Conversations</h2>
          </div>
          <div className="overflow-y-auto max-h-[600px]">
            {sessions.map((session) => (
              <button
                key={session.sessionId}
                onClick={() => viewTranscript(session.sessionId)}
                className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  selectedSession === session.sessionId ? "bg-primary/5 border-l-2 border-l-primary" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-900">
                    {session.messageCount} messages
                  </span>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                    session.status === "completed" ? "bg-green-100 text-green-700" :
                    session.status === "escalated" ? "bg-amber-100 text-amber-700" :
                    "bg-blue-100 text-blue-700"
                  }`}>
                    {session.status}
                  </span>
                </div>
                <div className="text-[10px] text-gray-400">
                  {session.visitorPage || "Unknown page"} · {new Date(session.startedAt).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-3 mt-1.5">
                  {session.userRating && (
                    <div className="flex items-center gap-1 text-[10px] text-gray-500">
                      <User className="h-3 w-3" />
                      <StarRating value={session.userRating} readonly />
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-[10px] text-gray-500">
                    <span className="text-[9px]">Admin:</span>
                    <StarRating
                      value={session.adminRating}
                      onChange={(r) => rateSession(session.sessionId, r)}
                    />
                    {ratingLoading === session.sessionId && (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    )}
                  </div>
                </div>
              </button>
            ))}
            {sessions.length === 0 && (
              <div className="p-12 text-center text-gray-400 text-sm">
                No chat sessions yet.
              </div>
            )}
          </div>
        </div>

        {/* Transcript panel */}
        {selectedSession && (
          <div className="w-full md:w-96 rounded-xl bg-white border border-gray-200 overflow-hidden flex flex-col shrink-0">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-bold text-sm">Transcript</h3>
              <button onClick={() => setSelectedSession(null)} className="text-gray-400 hover:text-gray-600">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 max-h-[550px]">
              {messagesLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                </div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className="flex items-start gap-1.5 max-w-[90%]">
                      {msg.role === "assistant" && (
                        <Bot className="h-4 w-4 text-primary shrink-0 mt-1" />
                      )}
                      <div className={`rounded-xl px-3 py-2 text-xs leading-relaxed ${
                        msg.role === "user"
                          ? "bg-primary text-white"
                          : "bg-white border border-gray-200 text-gray-700"
                      }`}>
                        {msg.content}
                      </div>
                      {msg.role === "user" && (
                        <User className="h-4 w-4 text-gray-400 shrink-0 mt-1" />
                      )}
                    </div>
                  </div>
                ))
              )}
              {messages.length === 0 && !messagesLoading && (
                <div className="text-center text-gray-400 text-xs py-8">
                  No messages in this session.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
