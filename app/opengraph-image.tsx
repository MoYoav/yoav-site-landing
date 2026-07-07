import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import path from "path";

export const runtime = "nodejs";

export const alt = "Yoav Assaf — AI Product Manager";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT = "#4A6B8A";
const COUNT = 6;
const W = 380;
const H = 96;
const N = 60;

function rand(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function buildThreadPath(i: number): string {
  const ordY = (H / (COUNT + 1)) * (i + 1);
  const f1 = 0.055 + rand(i * 3 + 1) * 0.03;
  const f2 = 0.11 + rand(i * 3 + 2) * 0.05;
  const p1 = rand(i * 7 + 4) * Math.PI * 2;
  const p2 = rand(i * 7 + 5) * Math.PI * 2;
  const amp = 22 + rand(i * 11 + 7) * 14;
  let d = "";
  for (let j = 0; j < N; j++) {
    const u = j / (N - 1);
    const x = 2 + u * (W - 4);
    const chaos = Math.pow(1 - u, 1.7);
    const wob = Math.sin(x * f1 + p1) + 0.6 * Math.sin(x * f2 + p2);
    const y = ordY + chaos * amp * wob;
    d += (j === 0 ? "M" : "L") + x.toFixed(1) + " " + y.toFixed(1);
  }
  return d;
}

export default async function OGImage() {
  const accentIdx = Math.floor(COUNT / 2);
  const threads = Array.from({ length: COUNT }, (_, i) => ({
    d: buildThreadPath(i),
    isAccent: i === accentIdx,
  }));

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#12100E",
          color: "#FAF9F6",
          fontFamily: "'Instrument Sans', sans-serif",
          display: "flex",
          flexDirection: "column",
          padding: "60px 72px",
          boxSizing: "border-box",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Top row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 26, height: 1, background: ACCENT }} />
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 16,
                letterSpacing: "0.26em",
                color: "rgba(250,249,246,0.6)",
              }}
            >
              AI PRODUCT MANAGER
            </span>
          </div>
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 14,
              letterSpacing: "0.14em",
              color: "rgba(250,249,246,0.38)",
            }}
          >
            REMOTE · 2026
          </span>
        </div>

        {/* Headline */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 400,
              fontSize: 88,
              lineHeight: 1.04,
              letterSpacing: "-0.01em",
              marginBottom: 26,
              maxWidth: "20ch",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            I take complex processes and make them{" "}
            <span style={{ fontStyle: "italic", color: ACCENT }}>&nbsp;simple.</span>
          </div>
          <p
            style={{
              fontSize: 24,
              lineHeight: 1.45,
              color: "rgba(250,249,246,0.6)",
              margin: 0,
              maxWidth: "40ch",
            }}
          >
            A product manager who builds — mostly AI, hands-on.
          </p>
        </div>

        {/* Bottom row */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 9, height: 9, borderRadius: "50%", background: ACCENT }} />
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 17,
                letterSpacing: "0.08em",
                color: "rgba(250,249,246,0.82)",
              }}
            >
              Yoav Assaf
            </span>
          </div>
          {/* Thread figure */}
          <svg
            width={W}
            height={H}
            viewBox={`0 0 ${W} ${H}`}
            style={{ display: "block" }}
          >
            {threads.map((t, i) => (
              <path
                key={i}
                d={t.d}
                fill="none"
                stroke={t.isAccent ? ACCENT : "rgba(250,249,246,0.26)"}
                strokeWidth={t.isAccent ? 1.9 : 1.3}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
          </svg>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Instrument Serif",
          data: readFileSync(path.join(process.cwd(), "public/fonts/InstrumentSerif-Regular.ttf")),
          style: "normal",
          weight: 400,
        },
        {
          name: "Instrument Serif",
          data: readFileSync(path.join(process.cwd(), "public/fonts/InstrumentSerif-Italic.ttf")),
          style: "italic",
          weight: 400,
        },
        {
          name: "IBM Plex Mono",
          data: readFileSync(path.join(process.cwd(), "public/fonts/IBMPlexMono-Regular.ttf")),
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
