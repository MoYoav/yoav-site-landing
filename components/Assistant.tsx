"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const ACTION_RE = /\[ACTION:(scroll|open-contact)(?::([^\]]+))?\]\s*$/m;

function parseAction(text: string): { clean: string; action: string | null; target: string | null } {
  const match = text.match(ACTION_RE);
  if (!match) return { clean: text.trim(), action: null, target: null };
  const clean = text.replace(ACTION_RE, "").trim();
  return { clean, action: match[1], target: match[2] ?? null };
}

function triggerPageAction(action: string, target: string | null) {
  window.dispatchEvent(new CustomEvent("assistant-action", { detail: { action, target } }));
}

function renderText(text: string) {
  const parts = text.split(/(https?:\/\/[^\s]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g);
  return parts.map((part, i) => {
    if (/^https?:\/\//.test(part)) {
      return <a key={i} href={part} target="_blank" rel="noopener noreferrer" style={{ color: "#4A6B8A", textDecoration: "underline" }}>{part}</a>;
    }
    if (/@/.test(part) && /\.[a-zA-Z]{2,}$/.test(part)) {
      return <a key={i} href={`mailto:${part}`} style={{ color: "#4A6B8A", textDecoration: "underline" }}>{part}</a>;
    }
    return part;
  });
}

const SUGGESTIONS = [
  "How does Yoav approach agent workflows?",
  "What kind of role is he looking for?",
  "Tell me about his AI product work",
];

const GREETING: Msg = {
  role: "assistant",
  content: "Hi. I'm Yoav's assistant — ask me about his background, how he builds with AI, or what he's looking for. I can also point you to the right part of the site.",
};

export default function Assistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;

    const next = [...messages, { role: "user" as const, content }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.filter((m) => m !== GREETING) }),
      });
      const data = await res.json();
      const raw: string = data?.reply || data?.error || "Sorry, something went wrong. You can reach Yoav at yoavs217@gmail.com.";

      const { clean, action, target } = parseAction(raw);

      setMessages((m) => [...m, { role: "assistant", content: clean }]);

      if (action) {
        setTimeout(() => triggerPageAction(action, target), 300);
      }
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "I couldn't connect just now. Please try again, or email Yoav at yoavs217@gmail.com." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close assistant" : "Ask Yoav's assistant"}
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          zIndex: 60,
          height: "2.75rem",
          padding: "0 1.25rem",
          borderRadius: "999px",
          border: "1px solid rgba(250,249,246,0.2)",
          background: "#12100E",
          color: "#FAF9F6",
          fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace",
          fontSize: "12px",
          letterSpacing: "0.06em",
          cursor: "pointer",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4A6B8A", display: "inline-block", flexShrink: 0 }} />
        {open ? "CLOSE" : "ASK ME ANYTHING"}
      </button>

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Assistant"
          style={{
            position: "fixed",
            bottom: "5rem",
            right: "1.5rem",
            zIndex: 60,
            width: "min(400px, calc(100vw - 3rem))",
            height: "min(540px, calc(100vh - 8rem))",
            background: "#12100E",
            border: "1px solid rgba(250,249,246,0.12)",
            borderRadius: "4px",
            boxShadow: "0 16px 56px rgba(0,0,0,0.5)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div style={{
            padding: "14px 16px",
            borderBottom: "1px solid rgba(250,249,246,0.08)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}>
            <span style={{ display: "block", width: "18px", height: "1px", background: "#4A6B8A", flexShrink: 0 }} />
            <span style={{ fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace", fontSize: "11px", letterSpacing: "0.14em", color: "rgba(250,249,246,0.5)" }}>
              YOAV&apos;S ASSISTANT
            </span>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "88%",
                  padding: m.role === "user" ? "8px 12px" : "0",
                  borderRadius: m.role === "user" ? "4px" : "0",
                  fontSize: "14px",
                  lineHeight: 1.55,
                  whiteSpace: "pre-wrap",
                  background: m.role === "user" ? "rgba(250,249,246,0.08)" : "transparent",
                  color: m.role === "user" ? "#FAF9F6" : "rgba(250,249,246,0.82)",
                }}
              >
                {m.role === "assistant" ? renderText(m.content) : m.content}
              </div>
            ))}

            {loading && (
              <div style={{ alignSelf: "flex-start", color: "rgba(250,249,246,0.3)", fontSize: "13px", fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace", letterSpacing: "0.06em" }}>
                ...
              </div>
            )}

            {messages.length === 1 && !loading && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "4px" }}>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    style={{
                      fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace",
                      fontSize: "11px",
                      letterSpacing: "0.04em",
                      padding: "6px 10px",
                      borderRadius: "4px",
                      border: "1px solid rgba(250,249,246,0.15)",
                      background: "transparent",
                      color: "rgba(250,249,246,0.55)",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div style={{ borderTop: "1px solid rgba(250,249,246,0.08)", padding: "10px 12px", display: "flex", gap: "8px" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") send(input); }}
              placeholder="Ask about Yoav..."
              maxLength={1000}
              style={{
                flex: 1,
                background: "rgba(250,249,246,0.05)",
                border: "1px solid rgba(250,249,246,0.15)",
                borderRadius: "4px",
                padding: "9px 12px",
                fontSize: "14px",
                fontFamily: "var(--font-body), 'Instrument Sans', system-ui, sans-serif",
                outline: "none",
                color: "#FAF9F6",
                transition: "border-color 0.2s ease",
              }}
              onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "#4A6B8A"; }}
              onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(250,249,246,0.15)"; }}
            />
            <button
              onClick={() => send(input)}
              disabled={loading || !input.trim()}
              style={{
                fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.06em",
                border: "1px solid #4A6B8A",
                borderRadius: "4px",
                padding: "0 14px",
                background: "transparent",
                color: "#FAF9F6",
                cursor: loading || !input.trim() ? "default" : "pointer",
                opacity: loading || !input.trim() ? 0.4 : 1,
                transition: "background 0.2s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => { if (!loading && input.trim()) (e.currentTarget as HTMLButtonElement).style.background = "rgba(74,107,138,0.2)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
            >
              SEND
            </button>
          </div>
        </div>
      )}
    </>
  );
}
