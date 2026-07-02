"use client";

import { useEffect } from "react";
import Image from "next/image";
import Assistant from "@/components/Assistant";
import LeadCaptureForm from "@/components/LeadCaptureForm";

export default function Home() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <main className="overflow-x-hidden">
      <Nav />
      <Hero />
      <WhatIDo />
      <Work />
      <About />
      <Contact />
      <Footer />
      <Assistant />
    </main>
  );
}

/* ---------------- NAV ---------------- */
function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[var(--paper)]/80 border-b border-[var(--line)]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="display font-bold text-lg tracking-tight">
          Yoav Assaf
        </a>
        <div className="hidden sm:flex items-center gap-8 text-sm font-medium">
          <a href="#work" className="hover:text-[var(--signal)] transition-colors">Work</a>
          <a href="#about" className="hover:text-[var(--signal)] transition-colors">About</a>
          <a
            href="#lead-form"
            className="px-4 py-2 bg-[var(--ink)] text-[var(--paper)] rounded-full hover:bg-[var(--signal)] transition-colors"
          >
            Leave details
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section id="top" className="pt-36 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="mono text-sm text-[var(--signal)] mb-6 tracking-wide">
          AI PRODUCT MANAGER
        </p>
        <h1 className="display font-bold tracking-tight leading-[0.98] text-[clamp(2.6rem,7vw,5.5rem)] max-w-4xl">
          I take complex processes and make them{" "}
          <span className="text-[var(--signal)]">simple.</span>
        </h1>
        <p className="mt-8 text-lg md:text-xl text-[var(--ink-soft)] max-w-2xl leading-relaxed">
          Product Manager for B2B and AI products. I turn tangled,
          people-heavy workflows into clear products that teams actually
          adopt - increasingly by putting AI agents to work inside the
          process itself.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#work"
            className="px-6 py-3 bg-[var(--ink)] text-[var(--paper)] rounded-full font-medium hover:bg-[var(--signal)] transition-colors"
          >
            View my work
          </a>
          <a
            href="#lead-form"
            className="px-6 py-3 border border-[var(--ink)] rounded-full font-medium hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors"
          >
            Leave your details
          </a>
        </div>

        {/* Signature element: complexity -> clarity */}
        <ComplexityDiagram />
      </div>
    </section>
  );
}

function ComplexityDiagram() {
  return (
    <div className="mt-20 reveal">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-10 max-w-3xl">
        {/* Before: tangle */}
        <div className="text-center">
          <svg viewBox="0 0 160 120" className="w-full max-w-[200px] mx-auto" aria-hidden="true">
            {[...Array(8)].map((_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              const x = 80 + Math.cos(angle) * 45;
              const y = 60 + Math.sin(angle) * 40;
              return (
                <g key={i}>
                  {[...Array(8)].map((_, j) => {
                    if (j <= i) return null;
                    const a2 = (j / 8) * Math.PI * 2;
                    const x2 = 80 + Math.cos(a2) * 45;
                    const y2 = 60 + Math.sin(a2) * 40;
                    return (
                      <line
                        key={j}
                        x1={x} y1={y} x2={x2} y2={y2}
                        stroke="var(--slate)" strokeWidth="0.5" opacity="0.4"
                      />
                    );
                  })}
                  <circle cx={x} cy={y} r="5" fill="var(--ink-soft)" />
                </g>
              );
            })}
          </svg>
          <p className="mono text-xs text-[var(--slate)] mt-3">8 users - scattered</p>
        </div>

        {/* Arrow */}
        <div className="text-[var(--signal)] text-2xl md:text-3xl">-&gt;</div>

        {/* After: clean */}
        <div className="text-center">
          <svg viewBox="0 0 160 120" className="w-full max-w-[200px] mx-auto" aria-hidden="true">
            <rect x="40" y="35" width="80" height="50" rx="6" fill="none" stroke="var(--signal)" strokeWidth="2" />
            {[...Array(4)].map((_, i) => (
              <circle key={i} cx={58 + i * 15} cy="60" r="5" fill="var(--signal)" />
            ))}
          </svg>
          <p className="mono text-xs text-[var(--signal)] mt-3">4 users - one dashboard</p>
        </div>
      </div>
    </div>
  );
}

/* ---------------- WHAT I DO ---------------- */
function WhatIDo() {
  const items = [
    {
      k: "01",
      t: "AI agent workflows",
      d: "Agent-based processes with real context management - not one-off prompts - that do meaningful work inside the product.",
    },
    {
      k: "02",
      t: "Process simplification",
      d: "Map the whole workflow and the people in it, then collapse it into something fewer people can run, faster.",
    },
    {
      k: "03",
      t: "Human-in-the-loop systems",
      d: "AI does the heavy lifting; people review and validate. Essential for regulated, high-stakes environments.",
    },
  ];
  return (
    <section className="px-6 py-20 border-t border-[var(--line)]">
      <div className="max-w-6xl mx-auto">
        <p className="mono text-sm text-[var(--slate)] mb-10 reveal">WHAT I DO</p>
        <div className="grid md:grid-cols-3 gap-10">
          {items.map((it) => (
            <div key={it.k} className="reveal">
              <span className="mono text-sm text-[var(--signal)]">{it.k}</span>
              <h3 className="display font-semibold text-xl mt-3 mb-2">{it.t}</h3>
              <p className="text-[var(--ink-soft)] leading-relaxed">{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- WORK ---------------- */
function Work() {
  return (
    <section id="work" className="px-6 py-20 border-t border-[var(--line)] bg-[var(--paper-pure)]">
      <div className="max-w-6xl mx-auto">
        <p className="mono text-sm text-[var(--slate)] mb-3 reveal">SELECTED WORK</p>
        <h2 className="display font-bold text-3xl md:text-4xl mb-16 reveal max-w-2xl">
          Two ways I&apos;ve used AI to collapse slow, manual work into fast, supervised processes.
        </h2>

        <CaseStudy
          index="Case 01"
          title="AI-assisted workflow consolidation"
          company="Mobideo"
          summary="Replaced a fragmented, 8-person workflow with a single AI-assisted dashboard - halving the team needed and saving the remaining members 70% of their time."
          metrics={[
            { v: "8 -> 4", l: "users required" },
            { v: "70%", l: "time saved per user" },
            { v: "50%", l: "smaller team" },
          ]}
          blocks={[
            {
              h: "The problem",
              p: "At Mobideo, a B2B platform for managing complex industrial operations, a core workflow was spread across eight different users - each handling their own tasks, checklists, and file uploads, with no single place to see or coordinate the work. It was slow, people-heavy, and error-prone.",
            },
            {
              h: "My role",
              p: "I led this end to end - driving the design and build largely on my own using AI tools, with some support from a developer. I owned the workflow design, the dashboard UX, and the integration of AI agents into the process.",
            },
            {
              h: "Key decisions",
              list: [
                "Consolidated a multi-step, multi-user process into one dashboard rather than improving each step in isolation.",
                "Embedded AI agents directly into the workflow so the system handled more of the work automatically.",
                "Designed for fewer, more empowered users - a deliberate bet on efficiency and cost savings.",
              ],
            },
            {
              h: "AI quality & iteration",
              p: "To make sure cutting the team in half didn't lower quality, I built an evaluation and feedback loop into the process. Agent output was checked against expected results, and reviewer corrections fed back as a source of improvement - so the agents got more reliable over time. The dashboard made it clear what the AI had done versus what needed a human, which kept users trusting the system instead of re-checking everything.",
            },
          ]}
        />

        <CaseStudy
          index="Case 02"
          title="AI conversion of manual procedures into digital checklists"
          company="Mobideo"
          summary="Built an AI workflow that converts customers' manual procedures into Mobideo-ready digital checklists - turning weeks of manual work into a fast, human-in-the-loop review."
          metrics={[
            { v: "Weeks -> review", l: "conversion effort" },
            { v: "~50", l: "procedures validated" },
            { v: "FDA-grade", l: "accuracy preserved" },
          ]}
          blocks={[
            {
              h: "The problem",
              p: "Mobideo customers need to turn manual instructions and procedures into digital checklists to use them in the platform. Doing it by hand could take weeks, and in many cases the output has to meet FDA standards - so accuracy is non-negotiable and every error carries compliance risk.",
            },
            {
              h: "My role",
              p: "I designed the AI workflow end to end - defining how the system interprets each customer's needs, manages context across the conversion, and produces output in the exact format they require.",
            },
            {
              h: "Key decisions",
              list: [
                "Built it as an agent-based process with deliberate context management, rather than a single prompt, to handle long and complex procedures reliably.",
                "Designed around a human-in-the-loop model: AI does the heavy conversion, people review and validate.",
                "Made output adapt to each customer's desired format instead of forcing one rigid template.",
              ],
            },
            {
              h: "AI quality & iteration",
              p: "Given the FDA-grade accuracy requirements, getting the conversion right mattered more than getting it fast. I tested the workflow on a set of ~50 sample procedures and ran an iterative loop with subject-matter experts: SMEs reviewed the AI's output, flagged what was wrong or imprecise, and I used their feedback to refine the prompts and the context the agents worked from. Each round tightened the output - while the SME validation step stayed in place as the auditable human control that kept the process compliant.",
            },
          ]}
        />
      </div>
    </section>
  );
}

type Block = { h: string; p?: string; list?: string[] };
function CaseStudy({
  index,
  title,
  company,
  summary,
  metrics,
  blocks,
}: {
  index: string;
  title: string;
  company: string;
  summary: string;
  metrics: { v: string; l: string }[];
  blocks: Block[];
}) {
  return (
    <article className="reveal mb-24 last:mb-0">
      <div className="flex items-baseline gap-4 mb-2">
        <span className="mono text-sm text-[var(--signal)]">{index}</span>
        <span className="mono text-sm text-[var(--slate)]">{company}</span>
      </div>
      <h3 className="display font-bold text-2xl md:text-3xl mb-4 max-w-3xl">{title}</h3>
      <p className="text-lg text-[var(--ink-soft)] max-w-3xl mb-8 leading-relaxed">{summary}</p>

      <div className="grid grid-cols-3 gap-4 mb-10 max-w-2xl">
        {metrics.map((m) => (
          <div key={m.l} className="border-l-2 border-[var(--signal)] pl-4">
            <div className="display font-bold text-2xl md:text-3xl">{m.v}</div>
            <div className="mono text-xs text-[var(--slate)] mt-1 leading-snug">{m.l}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 max-w-4xl">
        {blocks.map((b) => (
          <div key={b.h}>
            <h4 className="mono text-sm text-[var(--ink)] mb-2 font-medium">{b.h}</h4>
            {b.p && <p className="text-[var(--ink-soft)] leading-relaxed">{b.p}</p>}
            {b.list && (
              <ul className="space-y-2">
                {b.list.map((li, i) => (
                  <li key={i} className="text-[var(--ink-soft)] leading-relaxed flex gap-2">
                    <span className="text-[var(--signal)] mt-1">-</span>
                    <span>{li}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </article>
  );
}

/* ---------------- ABOUT ---------------- */
function About() {
  return (
    <section id="about" className="px-6 py-20 border-t border-[var(--line)]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_1.3fr] gap-12 md:gap-20">
        <div className="reveal">
          <p className="mono text-sm text-[var(--slate)] mb-6">ABOUT</p>
          <p className="display text-2xl md:text-3xl font-medium leading-snug">
            An AI Product Manager who builds hands-on - not just specs things out.
          </p>
          <div className="mt-10 space-y-1">
            {[
              ["Product Manager", "Mobideo - 2023-present"],
              ["R&D Project Manager", "Mobideo - 2021-2023"],
              ["System Implementation Specialist", "Ness Digital Engineering - 2020"],
              ["Implementation Specialist", "SRP Analytics - 2019-2020"],
            ].map(([role, meta]) => (
              <div key={role} className="py-3 border-b border-[var(--line)]">
                <div className="font-semibold">{role}</div>
                <div className="mono text-xs text-[var(--slate)] mt-0.5">{meta}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal space-y-5 text-[var(--ink-soft)] leading-relaxed">
          <Image
            src="/Yoav.jpg"
            alt="Yoav Assaf"
            width={120}
            height={120}
            className="rounded-full mb-6 object-cover"
          />
          <p>
            I didn&apos;t start in product - I started in environments where clarity
            under complexity was everything. After serving as a squad commander in
            an elite IDF commando unit, I studied Industrial Engineering with a focus
            on entrepreneurship and innovation. That mix is exactly the instinct AI
            product work demands: see the whole process, then redesign it.
          </p>
          <p>
            I moved into software through implementation roles, working directly with
            clients to fit systems to how they actually operate. That front-line
            exposure to real user pain led me into R&D project management, running
            Agile teams and learning to ship complex features reliably.
          </p>
          <p>
            Today, as a Product Manager at Mobideo, I&apos;ve made AI the core of my
            craft. I design agent-based workflows with real context management and
            human-in-the-loop validation, and I build them hands-on - cutting an
            8-person workflow in half, and turning weeks of manual, FDA-grade
            procedure conversion into a fast review-and-approve step.
          </p>
          <div className="pt-4">
            <p className="mono text-sm text-[var(--ink)] mb-3">HOW I WORK</p>
            <ul className="space-y-2">
              {[
                "AI as the engine, not the gimmick - agent workflows that do real work.",
                "Humans stay in control, especially in regulated, high-stakes settings.",
                "Start from the process, not the feature.",
                "Build hands-on - design, prototype, and ship myself.",
              ].map((li) => (
                <li key={li} className="flex gap-2">
                  <span className="text-[var(--signal)] mt-1">-</span>
                  <span>{li}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */
function Contact() {
  return (
    <section id="contact" className="px-6 py-24 border-t border-[var(--line)] bg-[var(--ink)] text-[var(--paper)]">
      <div className="max-w-6xl mx-auto reveal">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <p className="mono text-sm text-[var(--signal)] mb-6">WORK WITH ME</p>
            <h2 className="display font-bold text-3xl md:text-5xl max-w-3xl leading-tight">
              Open to product roles and select consulting engagements.
            </h2>
            <p className="mt-6 text-lg text-[var(--paper)]/70 max-w-2xl leading-relaxed">
              Whether you&apos;re hiring for an AI product role or need help turning a
              complex workflow into a working AI-powered product, I&apos;d love to hear
              from you.
            </p>

            <div className="mt-12 grid sm:grid-cols-2 gap-8 max-w-2xl">
              <div>
                <p className="mono text-xs text-[var(--paper)]/50 mb-2">FOR EMPLOYERS</p>
                <p className="text-[var(--paper)]/80">
                  AI/B2B product roles where I can own strategy and build agent-based
                  workflows end to end.
                </p>
              </div>
              <div>
                <p className="mono text-xs text-[var(--paper)]/50 mb-2">FOR CLIENTS</p>
                <p className="text-[var(--paper)]/80">
                  Consulting on AI product design: agent workflows, process
                  simplification, and human-in-the-loop systems.
                </p>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <a
                href="mailto:yoavs217@gmail.com"
                className="px-6 py-3 bg-[var(--signal)] text-white rounded-full font-medium hover:bg-[var(--signal-deep)] transition-colors"
              >
                yoavs217@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/yoav-assaf-b82b3518b/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-[var(--paper)]/30 rounded-full font-medium hover:bg-[var(--paper)] hover:text-[var(--ink)] transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-[var(--paper)]/30 rounded-full font-medium hover:bg-[var(--paper)] hover:text-[var(--ink)] transition-colors"
              >
                Resume
              </a>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
            <p className="mono text-xs text-[var(--signal)] mb-3">LEAVE YOUR DETAILS</p>
            <h3 className="display text-2xl font-semibold leading-tight">
              Tell me what you need and I will get back to you.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-[var(--paper)]/70">
              This keeps your existing page intact, but adds the core landing page flow:
              a lead form, a thank-you step, and a simple place to store submissions while
              you practice.
            </p>

            <div className="mt-6">
              <LeadCaptureForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
function Footer() {
  return (
    <footer className="px-6 py-10 bg-[var(--ink)] border-t border-white/10 text-[var(--paper)]/50">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-4 text-sm">
        <span className="display font-semibold text-[var(--paper)]">Yoav Assaf</span>
        <span className="mono text-xs">AI Product Manager - {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}

