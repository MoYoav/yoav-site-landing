"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import ThreadFigure from "@/components/ThreadFigure";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import Assistant from "@/components/Assistant";

export default function Home() {
  const revealRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
          }
        });
      },
      { threshold: 0.1 }
    );
    revealRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handler = (e: CustomEvent) => {
      const { action, target } = e.detail as { action: string; target: string | null };
      if (action === "scroll" && target) {
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
      }
      if (action === "open-contact") {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => document.getElementById("lf-name")?.focus(), 600);
      }
    };
    window.addEventListener("assistant-action", handler as EventListener);
    return () => window.removeEventListener("assistant-action", handler as EventListener);
  }, []);

  const addReveal = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <main style={{ fontFamily: "var(--font-body), 'Instrument Sans', system-ui, sans-serif", background: "#FAF9F6", color: "#1C1917" }}>

      {/* ===== HERO ===== */}
      <section
        style={{
          minHeight: "100vh",
          background: "#12100E",
          color: "#FAF9F6",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          padding: "clamp(24px, 4vw, 48px)",
        }}
      >
        {/* top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "16px" }}>
          <div style={{ fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace", fontSize: "13px", letterSpacing: "0.04em", color: "#FAF9F6" }}>
            Yoav Assaf
          </div>
          <div style={{ fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace", fontSize: "11px", letterSpacing: "0.08em", color: "rgba(250,249,246,0.4)" }}>
            TLV · 2026
          </div>
        </div>

        {/* headline block */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: "1100px", margin: "0 auto", width: "100%", padding: "64px 0 32px 0" }}>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
            <span style={{ display: "block", width: "22px", height: "1px", background: "#4A6B8A" }} />
            <span style={{ fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace", fontSize: "12px", letterSpacing: "0.22em", color: "rgba(250,249,246,0.55)" }}>
              AI PRODUCT MANAGER
            </span>
          </div>

          <h1 style={{
            fontFamily: "var(--font-display), 'Instrument Serif', serif",
            fontWeight: 400,
            fontSize: "clamp(44px, 7.2vw, 92px)",
            lineHeight: 1.04,
            letterSpacing: "-0.01em",
            margin: "0 0 28px 0",
          }}>
            I take complex processes and make them{" "}
            <em style={{ fontStyle: "italic", color: "#4A6B8A" }}>simple</em>.
          </h1>

          <p style={{ fontSize: "clamp(17px, 1.6vw, 20px)", lineHeight: 1.5, color: "rgba(250,249,246,0.62)", margin: "0 0 40px 0", maxWidth: "46ch" }}>
            A product manager who builds — mostly AI, hands-on.
          </p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <HeroButton href="#how">See how I build</HeroButton>
            <HeroButton href="#contact">Get in touch</HeroButton>
          </div>
        </div>

        {/* thread figure */}
        <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%" }}>
          <ThreadFigure />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
            <span style={{ fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace", fontSize: "11px", letterSpacing: "0.08em", color: "rgba(250,249,246,0.3)" }}>FIG. 01</span>
            <span style={{ fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace", fontSize: "11px", letterSpacing: "0.08em", color: "rgba(250,249,246,0.3)" }}>COMPLEX → SIMPLE</span>
          </div>
        </div>
      </section>

      {/* ===== HOW I BUILD ===== */}
      <section
        id="how"
        style={{ background: "#FAF9F6", padding: "clamp(72px, 10vw, 140px) clamp(24px, 4vw, 48px)" }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          <div
            ref={addReveal}
            className="reveal"
            style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}
          >
            <span style={{ display: "block", width: "22px", height: "1px", background: "#4A6B8A" }} />
            <span style={{ fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace", fontSize: "12px", letterSpacing: "0.22em", color: "#78716C" }}>
              02 · HOW I BUILD AI PRODUCTS
            </span>
          </div>

          <p
            ref={addReveal}
            className="reveal"
            style={{
              fontFamily: "var(--font-display), 'Instrument Serif', serif",
              fontSize: "clamp(26px, 3.2vw, 38px)",
              lineHeight: 1.25,
              margin: "0 0 clamp(48px, 6vw, 80px) 0",
              maxWidth: "24ch",
              color: "#1C1917",
            }}
          >
            A few things I&rsquo;ve come to care about when building with AI.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "clamp(28px, 3.5vw, 48px)" }}>
            {[
              {
                kicker: "01 · SCAFFOLD",
                heading: "The structure around the model",
                body: "A model on its own isn't much. The useful part is what surrounds it — the tools it can call, the guardrails that keep it in bounds, the way the whole thing is wired together. That structure is what turns a model into something that can actually do the work.",
              },
              {
                kicker: "02 · LOOP",
                heading: "The agent loop",
                body: "This is where it runs: the agent calls a tool, gets a response, decides what's next, and goes again. Getting that cycle right — the right tools, clean calls, sensible stopping points — is most of what makes an agent dependable instead of unpredictable.",
              },
              {
                kicker: "03 · REFINE",
                heading: "Making it better over time",
                body: "Things break, and the skill is knowing where. Evals and a human in the loop catch the failures, then the fix goes to wherever the problem actually lives — the prompt, the context, a tool, a guardrail. Not guesswork. Diagnosis, then the right fix.",
              },
            ].map((card) => (
              <BuildCard key={card.kicker} {...card} addReveal={addReveal} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section
        id="about"
        style={{ background: "#F3F1EC", padding: "clamp(72px, 10vw, 140px) clamp(24px, 4vw, 48px)" }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          <div
            ref={addReveal}
            className="reveal"
            style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "clamp(40px, 5vw, 64px)" }}
          >
            <span style={{ display: "block", width: "22px", height: "1px", background: "#4A6B8A" }} />
            <span style={{ fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace", fontSize: "12px", letterSpacing: "0.22em", color: "#78716C" }}>
              03 · ABOUT
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "clamp(40px, 6vw, 88px)", alignItems: "start" }}>

            <div
              ref={addReveal}
              className="reveal"
              style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "520px" }}
            >
              <Image
                src="/headshot.jpeg"
                alt="Yoav Assaf — black-and-white portrait"
                width={520}
                height={640}
                style={{ display: "block", width: "100%", height: "auto", filter: "grayscale(1)", borderRadius: "4px" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace", fontSize: "11px", letterSpacing: "0.08em", color: "#A8A29E" }}>FIG. 02</span>
                <span style={{ fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace", fontSize: "11px", letterSpacing: "0.08em", color: "#A8A29E" }}>YOAV ASSAF</span>
              </div>
            </div>

            <div
              ref={addReveal}
              className="reveal"
              style={{ display: "flex", flexDirection: "column", gap: "24px", fontSize: "17px", lineHeight: 1.7, color: "#44403C" }}
            >
              <p style={{ margin: 0 }}>I started out closer to the engineering side — an industrial engineering degree, then years implementing systems for customers, working directly with the people who had to live with what got built. That&rsquo;s where the instinct came from: understand the whole process, and the people in it, before touching a solution.</p>
              <p style={{ margin: 0 }}>From there into R&amp;D project management — running the delivery side, Agile and Scrum, keeping teams moving and shipping without the process turning into overhead. Then into product, which is where I wanted to be all along: not just delivering what was decided, but deciding what&rsquo;s worth building.</p>
              <p style={{ margin: 0 }}>What keeps me here is taking something tangled and making it simpler, and lately doing that with AI. I like being hands-on: not handing off specs and hoping, but building and seeing if the thing actually holds up.</p>
              <p style={{ margin: 0 }}>I&rsquo;m a people person more than a spec person. I listen, I learn quickly, and I&rsquo;m comfortable when things are unclear and there&rsquo;s no obvious right answer.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section
        id="contact"
        style={{ background: "#12100E", color: "#FAF9F6", padding: "clamp(72px, 10vw, 140px) clamp(24px, 4vw, 48px)" }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          <div
            ref={addReveal}
            className="reveal"
            style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}
          >
            <span style={{ display: "block", width: "22px", height: "1px", background: "#4A6B8A" }} />
            <span style={{ fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace", fontSize: "12px", letterSpacing: "0.22em", color: "rgba(250,249,246,0.5)" }}>
              04 · CONTACT
            </span>
          </div>

          {/* two-column: left = copy + links, right = form */}
          <div
            ref={addReveal}
            className="reveal"
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "clamp(48px, 7vw, 96px)", alignItems: "start" }}
          >
            {/* left column */}
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(32px, 4vw, 48px)" }}>
              <h2 style={{
                fontFamily: "var(--font-display), 'Instrument Serif', serif",
                fontWeight: 400,
                fontSize: "clamp(30px, 4.4vw, 54px)",
                lineHeight: 1.15,
                margin: 0,
                maxWidth: "22ch",
              }}>
                Open to product roles and select consulting engagements.
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(20px, 3vw, 32px)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", borderTop: "1px solid rgba(250,249,246,0.15)", paddingTop: "20px" }}>
                  <div style={{ fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace", fontSize: "11px", letterSpacing: "0.12em", color: "rgba(250,249,246,0.45)" }}>FOR EMPLOYERS</div>
                  <p style={{ fontSize: "15px", lineHeight: 1.65, color: "rgba(250,249,246,0.72)", margin: 0 }}>A product role where building is part of the job, not something I hand off. AI especially.</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", borderTop: "1px solid rgba(250,249,246,0.15)", paddingTop: "20px" }}>
                  <div style={{ fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace", fontSize: "11px", letterSpacing: "0.12em", color: "rgba(250,249,246,0.45)" }}>FOR CLIENTS</div>
                  <p style={{ fontSize: "15px", lineHeight: 1.65, color: "rgba(250,249,246,0.72)", margin: 0 }}>Consulting on AI product design — agent workflows, process simplification, and human-in-the-loop systems.</p>
                </div>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                <ContactButton href="mailto:yoavs217@gmail.com">yoavs217@gmail.com</ContactButton>
                <ContactButton href="https://linkedin.com/in/yoav-assaf-b82b3518b" target="_blank">LinkedIn</ContactButton>
              </div>
            </div>

            {/* right column: form */}
            <div style={{ borderTop: "1px solid rgba(250,249,246,0.15)", paddingTop: "20px" }}>
              <div style={{ fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace", fontSize: "11px", letterSpacing: "0.12em", color: "rgba(250,249,246,0.45)", marginBottom: "24px" }}>
                LEAVE YOUR DETAILS
              </div>
              <LeadCaptureForm />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "clamp(64px, 8vw, 96px)", paddingTop: "24px", borderTop: "1px solid rgba(250,249,246,0.1)" }}>
            <span style={{ fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace", fontSize: "11px", letterSpacing: "0.08em", color: "rgba(250,249,246,0.3)" }}>YOAV ASSAF · 2026</span>
            <span style={{ fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace", fontSize: "11px", letterSpacing: "0.08em", color: "rgba(250,249,246,0.3)" }}>COMPLEX → SIMPLE</span>
          </div>
        </div>
      </section>

      <Assistant />
    </main>
  );
}

function HeroButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{
        fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace",
        fontSize: "13px",
        letterSpacing: "0.03em",
        color: "#FAF9F6",
        textDecoration: "none",
        border: "1px solid rgba(250,249,246,0.25)",
        borderRadius: "4px",
        padding: "13px 22px",
        transition: "border-color 0.25s ease, color 0.25s ease",
        display: "inline-block",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "#4A6B8A";
        (e.currentTarget as HTMLAnchorElement).style.color = "#4A6B8A";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(250,249,246,0.25)";
        (e.currentTarget as HTMLAnchorElement).style.color = "#FAF9F6";
      }}
    >
      {children}
    </a>
  );
}

function ContactButton({ href, children, target }: { href: string; children: React.ReactNode; target?: string }) {
  return (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      style={{
        fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace",
        fontSize: "13px",
        letterSpacing: "0.03em",
        color: "#FAF9F6",
        textDecoration: "none",
        border: "1px solid rgba(250,249,246,0.25)",
        borderRadius: "4px",
        padding: "13px 22px",
        transition: "border-color 0.25s ease, color 0.25s ease",
        display: "inline-block",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "#4A6B8A";
        (e.currentTarget as HTMLAnchorElement).style.color = "#4A6B8A";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(250,249,246,0.25)";
        (e.currentTarget as HTMLAnchorElement).style.color = "#FAF9F6";
      }}
    >
      {children}
    </a>
  );
}

function BuildCard({
  kicker,
  heading,
  body,
  addReveal,
}: {
  kicker: string;
  heading: string;
  body: string;
  addReveal: (el: HTMLElement | null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) addReveal(ref.current);
  }, [addReveal]);

  return (
    <div
      ref={ref}
      className="reveal"
      style={{ display: "flex", flexDirection: "column", gap: "16px", borderTop: "1px solid #E7E4DE", paddingTop: "24px", transition: "border-color 0.4s ease" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderTopColor = "#4A6B8A"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderTopColor = "#E7E4DE"; }}
    >
      <div style={{ fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace", fontSize: "11px", letterSpacing: "0.12em", color: "#A8A29E" }}>{kicker}</div>
      <h3 style={{ fontFamily: "var(--font-display), 'Instrument Serif', serif", fontWeight: 400, fontSize: "26px", lineHeight: 1.2, margin: 0, color: "#1C1917" }}>{heading}</h3>
      <p style={{ fontSize: "16px", lineHeight: 1.65, color: "#44403C", margin: 0 }}>{body}</p>
    </div>
  );
}
