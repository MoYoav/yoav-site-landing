"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Floating AI assistant for the site. Matches the site's brand (ink / signal-blue
 * / paper, Space Grotesk + Inter). Talks only to /api/assistant - never to
 * Anthropic directly, so the API key stays server-side.
 *
 * Drop <Assistant /> once in app/page.tsx (or in the layout) and it appears as a
 * button in the bottom-right corner.
 */

type Msg = { role: "user" | "assistant"; content: string };

function renderText(text: string) {
  const parts = text.split(/(https?:\/\/[^\s]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g);
  return parts.map((part, i) => {
    if (/^https?:\/\//.test(part)) {
      return <a key={i} href={part} target="_blank" rel="noopener noreferrer" style={{ color: "var(--signal, #2f5fff)", textDecoration: "underline" }}>{part}</a>;
    }
    if (/@/.test(part) && /\.[a-zA-Z]{2,}$/.test(part)) {
      return <a key={i} href={`mailto:${part}`} style={{ color: "var(--signal, #2f5fff)", textDecoration: "underline" }}>{part}</a>;
    }
    return part;
  });
}

const SUGGESTIONS = [
  "What's his experience with AI agent workflows?",
  "Tell me about a project he's proud of",
  "What kind of role is he looking for?",
];

const GREETING: Msg = {
  role: "assistant",
  content:
    "Hi! I'm Yoav's assistant. Ask me about his experience with AI products, his case studies, or how he works. For anything specific like scheduling, I'll point you his way.",
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
        // send only the real exchange (skip the local greeting)
        body: JSON.stringify({ messages: next.filter((m) => m !== GREETING) }),
      });
      const data = await res.json();
      const reply =
        data?.reply ||
        data?.error ||
        "Sorry, something went wrong. You can reach Yoav at yoavs217@gmail.com.";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "I couldn't connect just now. Please try again, or email Yoav at yoavs217@gmail.com.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Launcher button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close assistant" : "Ask Yoav's assistant"}
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          zIndex: 60,
          height: "3.5rem",
          padding: open ? "0 1rem" : "0 1.25rem",
          borderRadius: "999px",
          border: "none",
          background: "var(--ink, #14161a)",
          color: "var(--paper, #f7f6f3)",
          fontFamily: "var(--font-display), system-ui, sans-serif",
          fontWeight: 600,
          fontSize: "0.95rem",
          cursor: "pointer",
          boxShadow: "0 6px 24px rgba(0,0,0,0.18)",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "var(--signal, #2f5fff)",
            display: "inline-block",
          }}
        />
        {open ? "Close" : "Ask me anything"}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Assistant"
          style={{
            position: "fixed",
            bottom: "5.5rem",
            right: "1.5rem",
            zIndex: 60,
            width: "min(380px, calc(100vw - 3rem))",
            height: "min(560px, calc(100vh - 8rem))",
            background: "var(--paper-pure, #fff)",
            border: "1px solid var(--line, #e4e2dc)",
            borderRadius: "1rem",
            boxShadow: "0 12px 48px rgba(0,0,0,0.20)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "0.9rem 1rem",
              borderBottom: "1px solid var(--line, #e4e2dc)",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--signal, #2f5fff)",
              }}
            />
            <div
              style={{
                fontFamily: "var(--font-display), system-ui, sans-serif",
                fontWeight: 600,
                fontSize: "0.95rem",
                color: "var(--ink, #14161a)",
              }}
            >
              Yoav&apos;s Assistant
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            style={{ flex: 1, overflowY: "auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                  padding: "0.6rem 0.8rem",
                  borderRadius: "0.8rem",
                  fontSize: "0.9rem",
                  lineHeight: 1.5,
                  whiteSpace: "pre-wrap",
                  background: m.role === "user" ? "var(--ink, #14161a)" : "var(--paper, #f4f3ef)",
                  color: m.role === "user" ? "var(--paper, #f7f6f3)" : "var(--ink, #14161a)",
                }}
              >
                {m.role === "assistant" ? renderText(m.content) : m.content}
              </div>
            ))}

            {loading && (
              <div style={{ alignSelf: "flex-start", color: "var(--slate, #6b7280)", fontSize: "0.85rem", padding: "0.4rem 0.2rem" }}>
                thinking...
              </div>
            )}

            {/* Suggestions (only before the first user message) */}
            {messages.length === 1 && !loading && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.3rem" }}>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    style={{
                      fontSize: "0.8rem",
                      padding: "0.4rem 0.7rem",
                      borderRadius: "999px",
                      border: "1px solid var(--line, #e4e2dc)",
                      background: "transparent",
                      color: "var(--ink-soft, #3d434d)",
                      cursor: "pointer",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div style={{ borderTop: "1px solid var(--line, #e4e2dc)", padding: "0.7rem", display: "flex", gap: "0.5rem" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") send(input); }}
              placeholder="Ask about Yoav..."
              maxLength={1000}
              style={{
                flex: 1,
                border: "1px solid var(--line, #e4e2dc)",
                borderRadius: "0.6rem",
                padding: "0.55rem 0.7rem",
                fontSize: "0.9rem",
                fontFamily: "var(--font-body), system-ui, sans-serif",
                outline: "none",
                background: "var(--paper, #f7f6f3)",
                color: "var(--ink, #14161a)",
              }}
            />
            <button
              onClick={() => send(input)}
              disabled={loading || !input.trim()}
              style={{
                border: "none",
                borderRadius: "0.6rem",
                padding: "0 1rem",
                background: "var(--signal, #2f5fff)",
                color: "#fff",
                fontWeight: 600,
                fontSize: "0.9rem",
                cursor: loading || !input.trim() ? "default" : "pointer",
                opacity: loading || !input.trim() ? 0.5 : 1,
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
