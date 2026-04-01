"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, User, Cpu, CheckCircle2, Loader2 } from "lucide-react";
import {
  INITIAL_BOT_MESSAGE,
  CHAT_OPTIONS,
  type ChatOption,
} from "@/data/demos/chatbot-data";
import type { BrandTheme } from "@/components/demos/shared/DemoGate";

type Message = {
  from: "user" | "bot";
  text: string;
};

type ProcessStep = {
  text: string;
  done: boolean;
};

export function ChatbotDemo({ brand }: { brand?: BrandTheme | null }) {
  const primary = brand?.primaryColor || "#7B2FF7";
  const bizName = brand?.businessName || "Your Business";

  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: INITIAL_BOT_MESSAGE },
  ]);
  const [options, setOptions] = useState<ChatOption[]>(CHAT_OPTIONS);
  const [typing, setTyping] = useState(false);
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([]);
  const [processing, setProcessing] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  function handleOptionClick(option: ChatOption) {
    // Add user message
    setMessages((prev) => [...prev, { from: "user", text: option.userMessage }]);
    setOptions([]);
    setTyping(true);
    setProcessing(true);

    // Show AI process steps one by one
    const steps = option.aiProcess.map((text) => ({ text, done: false }));
    setProcessSteps(steps);

    let stepIndex = 0;
    const stepInterval = setInterval(() => {
      setProcessSteps((prev) =>
        prev.map((s, i) => (i <= stepIndex ? { ...s, done: true } : s))
      );
      stepIndex++;
      if (stepIndex >= steps.length) {
        clearInterval(stepInterval);

        // Bot responds after a brief delay
        setTimeout(() => {
          setTyping(false);
          setProcessing(false);
          setMessages((prev) => [
            ...prev,
            { from: "bot", text: option.botResponse },
          ]);
          setOptions(option.followUps || []);

          // Clear process steps after response
          setTimeout(() => setProcessSteps([]), 1000);
        }, 600);
      }
    }, 500);
  }

  return (
    <div className="flex h-[600px] text-sm">
      {/* Chat panel */}
      <div className="flex-1 flex flex-col">
        {/* Chat header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white"
            style={{ background: primary }}
          >
            <Bot className="h-4 w-4" />
          </div>
          <div>
            <div className="font-semibold text-xs">{bizName} AI Assistant</div>
            <div className="text-[10px] text-green-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Online
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className="flex items-start gap-2 max-w-[80%]">
                {msg.from === "bot" && (
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white shrink-0 mt-0.5"
                    style={{ background: primary }}
                  >
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                )}
                <div
                  className={`rounded-2xl px-4 py-2.5 text-xs leading-relaxed whitespace-pre-line ${
                    msg.from === "user"
                      ? "text-white rounded-br-md"
                      : "bg-white border border-gray-200 text-gray-700 rounded-bl-md"
                  }`}
                  style={msg.from === "user" ? { background: primary } : undefined}
                >
                  {msg.text}
                </div>
                {msg.from === "user" && (
                  <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="h-3.5 w-3.5 text-gray-500" />
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div className="flex items-start gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white shrink-0"
                style={{ background: primary }}
              >
                <Bot className="h-3.5 w-3.5" />
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3">
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

        {/* Suggested responses */}
        {options.length > 0 && (
          <div className="px-4 py-3 border-t border-gray-200 bg-white">
            <div className="text-[10px] text-gray-400 mb-2">Choose a response:</div>
            <div className="flex flex-wrap gap-2">
              {options.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => handleOptionClick(opt)}
                  className="px-3 py-1.5 rounded-full border text-xs font-medium transition-colors hover:text-white"
                  style={{
                    borderColor: primary,
                    color: primary,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = primary;
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = primary;
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Behind the scenes panel */}
      <div className="w-72 border-l border-gray-200 bg-gray-900 text-white flex flex-col shrink-0 hidden lg:flex">
        <div className="px-4 py-3 border-b border-gray-800 flex items-center gap-2">
          <Cpu className="h-4 w-4" style={{ color: primary }} />
          <span className="text-xs font-semibold">Behind the Scenes</span>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {processSteps.length > 0 ? (
            <div className="space-y-3">
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">
                AI Processing Pipeline
              </div>
              {processSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-2">
                  {step.done ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" style={{ color: primary }} />
                  ) : (
                    <Loader2 className="h-4 w-4 shrink-0 mt-0.5 animate-spin text-gray-500" />
                  )}
                  <span
                    className={`text-xs ${step.done ? "text-gray-300" : "text-gray-500"}`}
                  >
                    {step.text}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-10">
              <Cpu className="h-8 w-8 mx-auto mb-3 text-gray-600" />
              <p className="text-xs">Click a chat option to see</p>
              <p className="text-xs">how the AI processes it</p>
            </div>
          )}

          {/* Always-visible info */}
          <div className="mt-8 pt-4 border-t border-gray-800 space-y-3">
            <div className="text-[10px] text-gray-500 uppercase tracking-wider">
              What You&apos;re Seeing
            </div>
            <div className="text-xs text-gray-400 leading-relaxed">
              This panel shows the AI&apos;s decision-making process in real time — intent detection, data lookups, and response generation. In a real system, this runs in milliseconds.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
