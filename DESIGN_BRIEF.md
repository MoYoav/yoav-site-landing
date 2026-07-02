# Design Brief — Yoav Assaf Personal Site

## Who this is for
Yoav Assaf, AI Product Manager. His audience: senior recruiters, hiring managers, and potential consulting clients. The site needs to make them stop, read, and feel like they're looking at someone serious and capable.

## Your job
Redesign this site from scratch visually. Colors, layout, typography scale, spacing, motion, section feel — all yours. The content (copy, numbers, names) is fixed and must stay word-for-word. The design should match the ambition of the content.

---

## Hard technical constraints (do not break these)

**Stack:**
- Next.js 15 App Router, TypeScript, `"use client"` on the page
- Tailwind CSS v4 — imported as `@import "tailwindcss"` in `globals.css`. No `tailwind.config`. CSS variables defined in `:root {}` and exposed via `@theme inline {}`.
- Fonts loaded via `next/font/google` in `app/layout.tsx` and exposed as CSS variables: `--font-display` (Space Grotesk), `--font-body` (Inter), `--font-mono` (JetBrains Mono). All three must stay.
- `next/image` is used for the headshot (`/yoav.jpg`, currently 120×120 circle in About section)

**Files:**
- `app/page.tsx` — all section components (Nav, Hero, WhatIDo, Work/CaseStudy, About, Contact, Footer). Rewrite freely.
- `app/globals.css` — base styles and CSS variables. Rewrite freely.
- `app/layout.tsx` — do NOT touch (fonts and metadata live here)
- `components/Assistant.tsx` — do NOT touch (floating AI chat widget, bottom-right corner, must remain visible)
- `app/api/` — do NOT touch

**Content that must stay exactly as written:**
- All headings, body copy, labels, button text
- All metric numbers (8→4, 70%, 50%, FDA-grade, ~50 procedures, "Weeks → review")
- All proper nouns (Yoav Assaf, Mobideo, Ness Digital Engineering, SRP Analytics, Duvdevan, Ruppin)
- All links (email, LinkedIn, Resume PDF at `/Resume.pdf`)

**Functional requirements:**
- The `.reveal` scroll animation pattern must still work (IntersectionObserver adds `.in` class — you can change the CSS animation but keep the class names)
- Fixed nav with anchor links (`#top`, `#work`, `#about`, `#contact`)
- Responsive, mobile-first
- Accessible: semantic HTML, focus states, aria labels on decorative SVGs
- No new npm packages

**The ComplexityDiagram SVG** (in Hero section) shows "8 tangled nodes → 4 clean dots in a dashboard box". Keep this concept — it's a signature visual that represents Yoav's core value. You can redesign it completely but the before/after metaphor must remain.

---

## Current section order (keep this order)
1. Nav (fixed)
2. Hero — tagline, H1, subhead, 2 CTAs, ComplexityDiagram
3. What I Do — 3 capability cards
4. Work — 2 case studies with metrics and content blocks
5. About — headshot + bio + work history + "HOW I WORK" list
6. Contact — dark section, 2 audience cards, email/LinkedIn/Resume buttons
7. Footer

---

## Design philosophy
Less is more. Every element should earn its place. The site should feel refined and intentional — not decorated.

It should have moments of interactivity that surprise and delight, but never feel busy or gimmicky. Think: one or two things that make someone go "oh, that's cool" as they scroll — not a theme park.

It should feel new. Not trendy-for-a-month new, but the kind of design that looks like it was made by someone who has taste and knows what they're doing. Clean, confident, a little unexpected.

The person who lands on this site should feel: this person is serious, modern, and worth talking to.

## Deliverable
- Rewrite `app/page.tsx`
- Update `app/globals.css` as needed
- The result should feel like a portfolio a senior PM would be proud to share
