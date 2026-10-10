import { useState, type ReactNode } from "react";
import { Header } from "./Header";
import { ChatButton } from "../chat/ChatButton";
import { ChatDrawer } from "../chat/ChatDrawer";

export function AppShell({ children }: { children: ReactNode }) {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-8">{children}</main>
      <ChatButton open={chatOpen} onClick={() => setChatOpen((v) => !v)} />
      <ChatDrawer open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}