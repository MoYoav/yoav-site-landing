# Yoav Assaf Site

This project uses the existing personal website as a simple landing page proof.
It shows the full flow of a small real client-style job without overengineering.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4

## Why this is a good landing page base

This project is already a good base because it has:

- a working single-page layout
- a server-side route system through Next.js
- simple styling already in place
- no heavy backend setup to fight with

That makes it a good beginner-safe way to prove the full landing page workflow.

## What is already working

- one clear landing page at `/`
- one lead form with `name`, `email`, and `phone`
- one thank-you page at `/thank-you`
- local lead saving to `data/leads.json`
- conversion event structure on the thank-you page
- GTM placeholder support
- Meta Pixel placeholder support
- GA4 placeholder support
- Google Ads conversion placeholder support
- deployment readiness for a simple Vercel flow
- domain readiness through `metadataBase` in `app/layout.tsx`

## Run locally

```bash
npm run dev
```

Open `http://localhost:3000`

## Build locally

```bash
npm run build
```

## Environment placeholders

Copy `.env.example` to `.env.local` and fill only the values you actually have.

```env
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=123456789012345
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-123456789
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL=AbCdEfGhIjKlMnOpQr
ANTHROPIC_API_KEY=sk-ant-...
```

## How tracking is prepared

Tracking code only fires on the successful lead flow, using the thank-you page.

- GTM: pushes `lead_submit_success` into `dataLayer`
- Meta Pixel: fires `fbq("track", "Lead")`
- GA4: fires `gtag("event", "generate_lead")`
- Google Ads: fires `gtag("event", "conversion")` when both Ads placeholders are set

## How to test the full flow

1. Run `npm run dev`
2. Open `http://localhost:3000`
3. Scroll to the `Leave your details` form
4. Enter a test name, email, and phone number
5. Submit the form
6. Confirm you land on `http://localhost:3000/thank-you`
7. Open `data/leads.json`
8. Confirm the new lead was saved there

## Lead storage note

For this demo, leads are saved locally to `data/leads.json` because it is the fastest reliable proof inside the current stack.

For a real client project, that would usually be replaced with one of these:

- a CRM
- a real database
- Airtable
- Google Sheets
- a form backend service

## Hosting and domain readiness

### Vercel

This project is already ready for a basic Vercel deployment without extra config.
Next.js is detected automatically.

### Netlify

Netlify is possible too, but Vercel is the simpler path for this exact project because it matches Next.js routing and server functions more directly.

### Domain connection later

To connect a real domain or subdomain later:

1. Deploy the site to your hosting provider
2. Update `metadataBase` in `app/layout.tsx` with the real domain
3. Add the domain in the hosting dashboard
4. Point DNS from your domain registrar to the hosting provider

Example:

- root domain: `yourbrand.com`
- subdomain landing page: `promo.yourbrand.com`

## What still needs real production accounts

- GTM container ID
- Meta Pixel ID
- GA4 measurement ID
- Google Ads conversion ID and label
- a real deployment account such as Vercel or Netlify
- a real domain registrar or DNS provider
- a real persistent lead destination if the page goes live

## AI assistant

The floating AI assistant is still in the project.
It only works when a real `ANTHROPIC_API_KEY` is set.
