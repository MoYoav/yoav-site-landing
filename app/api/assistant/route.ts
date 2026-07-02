import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "@/lib/system-prompt";

/**
 * Server-side API route. The Anthropic API key lives ONLY here (as an environment
 * variable) and is never sent to the browser. The browser talks to THIS route;
 * this route talks to Anthropic.
 *
 * Includes a simple in-memory rate limit so nobody can spam the assistant and run
 * up the bill. For a personal site this is enough. (On serverless it resets when
 * the function cold-starts, which is fine here.)
 */

export const runtime = "nodejs";

// ---- simple in-memory rate limiter: max N requests per IP per window ----
const WINDOW_MS = 60_000; // 1 minute
const MAX_PER_WINDOW = 8; // per IP per minute
const MAX_MESSAGE_LEN = 1000; // characters per user message
const MAX_TURNS = 20; // cap conversation length sent to the model

const hits = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now > rec.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  rec.count += 1;
  return rec.count > MAX_PER_WINDOW;
}

type Msg = { role: "user" | "assistant"; content: string };

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";

    if (rateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many messages. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Assistant is not configured." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const incoming: Msg[] = Array.isArray(body?.messages) ? body.messages : [];

    // Validate + trim the conversation
    const messages = incoming
      .filter(
        (m) =>
          m &&
          (m.role === "user" || m.role === "assistant") &&
          typeof m.content === "string" &&
          m.content.trim().length > 0
      )
      .slice(-MAX_TURNS)
      .map((m) => ({
        role: m.role,
        content: m.content.slice(0, MAX_MESSAGE_LEN),
      }));

    if (messages.length === 0) {
      return NextResponse.json({ error: "No message provided." }, { status: 400 });
    }

    const resp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001", // fast + inexpensive; good for this
        max_tokens: 600,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!resp.ok) {
      const detail = await resp.text();
      console.error("Anthropic API error:", resp.status, detail);
      return NextResponse.json(
        { error: "The assistant had trouble responding. Please try again." },
        { status: 502 }
      );
    }

    const data = await resp.json();
    const text =
      Array.isArray(data?.content)
        ? data.content
            .filter((b: { type: string }) => b.type === "text")
            .map((b: { text: string }) => b.text)
            .join("\n")
            .trim()
        : "";

    return NextResponse.json({
      reply:
        text ||
        "I'm not sure how to answer that - feel free to reach out to Yoav directly at yoavs217@gmail.com.",
    });
  } catch (err) {
    console.error("Assistant route error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
