"use client";

import { useEffect, useRef, useCallback } from "react";

const ACCENT = "#4A6B8A";
const THREAD_COLOR = "rgba(250,249,246,0.30)";
const COUNT = 6;
const N = 72;

function rand(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

interface Point {
  x: number;
  tangY: number;
  ordY: number;
}

interface Thread {
  pts: Point[];
  t: number;
  delay: number;
}

function buildThreads(): Thread[] {
  const threads: Thread[] = [];
  for (let i = 0; i < COUNT; i++) {
    const orderedY = 90 + (i - (COUNT - 1) / 2) * 22;
    const f1 = 0.010 + rand(i * 3 + 1) * 0.012;
    const f2 = 0.020 + rand(i * 3 + 2) * 0.018;
    const f3 = 0.045 + rand(i * 3 + 3) * 0.02;
    const p1 = rand(i * 7 + 4) * Math.PI * 2;
    const p2 = rand(i * 7 + 5) * Math.PI * 2;
    const p3 = rand(i * 7 + 6) * Math.PI * 2;
    const amp = 34 + rand(i * 11 + 7) * 30;
    const pts: Point[] = [];
    for (let j = 0; j < N; j++) {
      const u = j / (N - 1);
      const x = 10 + u * 980;
      const env = Math.pow(Math.sin(Math.PI * u), 0.9);
      const wob = Math.sin(x * f1 + p1) + 0.7 * Math.sin(x * f2 + p2) + 0.45 * Math.sin(x * f3 + p3);
      pts.push({ x, tangY: 90 + env * amp * wob * 0.9 + (orderedY - 90) * (1 - env * 0.85), ordY: orderedY });
    }
    threads.push({ pts, t: 0, delay: i * 90 });
  }
  return threads;
}

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function pathFor(th: Thread): string {
  const e = easeInOut(th.t);
  let d = "";
  for (let j = 0; j < th.pts.length; j++) {
    const p = th.pts[j];
    const y = p.tangY + (p.ordY - p.tangY) * e;
    d += (j === 0 ? "M" : "L") + p.x.toFixed(1) + " " + y.toFixed(1);
  }
  return d;
}

export default function ThreadFigure() {
  const svgRef = useRef<SVGSVGElement>(null);
  const threadsRef = useRef<Thread[]>(buildThreads());
  const hoveringRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const animStartRef = useRef(0);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion.current) {
      // show resolved state
      for (const th of threadsRef.current) th.t = 1;
      renderPaths();
    } else {
      renderPaths();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderPaths = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const paths = svg.querySelectorAll("path");
    const accentIdx = Math.floor(COUNT / 2);
    threadsRef.current.forEach((th, i) => {
      const path = paths[i];
      if (path) path.setAttribute("d", pathFor(th));
      if (path && i === accentIdx) {
        path.setAttribute("stroke", ACCENT);
        path.setAttribute("stroke-width", "1.8");
      } else if (path) {
        path.setAttribute("stroke", THREAD_COLOR);
        path.setAttribute("stroke-width", "1.3");
      }
    });
  }, []);

  const startAnim = useCallback(() => {
    if (rafRef.current) return;
    animStartRef.current = performance.now();
    const step = () => {
      const now = performance.now();
      let moving = false;
      const target = hoveringRef.current ? 1 : 0;
      for (const th of threadsRef.current) {
        if (now - animStartRef.current < th.delay) { moving = true; continue; }
        const d = target - th.t;
        if (Math.abs(d) > 0.001) {
          th.t += d * 0.075;
          moving = true;
        } else {
          th.t = target;
        }
      }
      renderPaths();
      rafRef.current = moving ? requestAnimationFrame(step) : null;
    };
    rafRef.current = requestAnimationFrame(step);
  }, [renderPaths]);

  useEffect(() => {
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const setHover = (v: boolean) => {
    if (reducedMotion.current) return;
    if (hoveringRef.current === v) return;
    hoveringRef.current = v;
    rafRef.current = null;
    // reset delays
    animStartRef.current = performance.now();
    for (let i = 0; i < threadsRef.current.length; i++) {
      threadsRef.current[i].delay = i * 90;
    }
    startAnim();
  };

  const accentIdx = Math.floor(COUNT / 2);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => setHover(!hoveringRef.current)}
      style={{ cursor: "pointer", touchAction: "manipulation" }}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 1000 180"
        style={{ display: "block", width: "100%", height: "auto" }}
        aria-label="A tangle of threads that resolves into parallel lines on hover"
      >
        {threadsRef.current.map((th, i) => (
          <path
            key={i}
            d={pathFor(th)}
            fill="none"
            stroke={i === accentIdx ? ACCENT : THREAD_COLOR}
            strokeWidth={i === accentIdx ? 1.8 : 1.3}
            strokeLinecap="round"
          />
        ))}
      </svg>
    </div>
  );
}
