"use client";

import { DemoGate } from "@/components/demos/shared/DemoGate";
import { DemoShell } from "@/components/demos/shared/DemoShell";
import { ChatbotDemo } from "@/components/demos/chatbot/ChatbotDemo";

export function ChatbotDemoWrapper() {
  return (
    <DemoGate demoType="ai-chatbot" demoLabel="AI Chatbot">
      {(brand) => (
        <DemoShell title="AI Chat Assistant" brand={brand}>
          <ChatbotDemo brand={brand} />
        </DemoShell>
      )}
    </DemoGate>
  );
}
