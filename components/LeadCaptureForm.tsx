"use client";

import { useState } from "react";

type FormValues = {
  name: string;
  email: string;
  phone: string;
};

const INITIAL_VALUES: FormValues = { name: "", email: "", phone: "" };

const pendingLeadKey = "pending_lead_submission_id";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

function fireTrackingEvents(submissionId: string) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const googleAdsConversionLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const prefersTagManager = Boolean(gtmId);

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "lead_submit_success",
    conversion_type: "lead",
    form_location: "homepage_contact_section",
    page_type: "inline",
    submission_id: submissionId,
  });

  if (!prefersTagManager) {
    window.gtag?.("event", "generate_lead", {
      form_location: "homepage_contact_section",
      value: 1,
      currency: "USD",
      submission_id: submissionId,
    });

    if (googleAdsId && googleAdsConversionLabel) {
      window.gtag?.("event", "conversion", {
        send_to: `${googleAdsId}/${googleAdsConversionLabel}`,
      });
    }

    if (metaPixelId) {
      window.fbq?.("track", "Lead");
    }
  }
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(250,249,246,0.05)",
  border: "1px solid rgba(250,249,246,0.15)",
  borderRadius: "4px",
  padding: "12px 16px",
  color: "#FAF9F6",
  fontSize: "15px",
  fontFamily: "inherit",
  outline: "none",
  transition: "border-color 0.2s ease",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace",
  fontSize: "11px",
  letterSpacing: "0.10em",
  color: "rgba(250,249,246,0.45)",
  display: "block",
  marginBottom: "8px",
};

export default function LeadCaptureForm() {
  const [formValues, setFormValues] = useState<FormValues>(INITIAL_VALUES);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function updateField(field: keyof FormValues, value: string) {
    setFormValues((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formValues, sourcePath: window.location.pathname }),
      });

      const result = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        throw new Error(result?.error || "Something went wrong while saving your details.");
      }

      const submissionId = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      sessionStorage.setItem(pendingLeadKey, submissionId);
      fireTrackingEvents(submissionId);
      sessionStorage.removeItem(pendingLeadKey);

      setFormValues(INITIAL_VALUES);
      setSubmitted(true);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong while saving your details.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div style={{ padding: "32px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
          <span style={{ display: "block", width: "22px", height: "1px", background: "#4A6B8A" }} />
          <span style={{ fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace", fontSize: "11px", letterSpacing: "0.12em", color: "#4A6B8A" }}>
            RECEIVED
          </span>
        </div>
        <p style={{ fontFamily: "var(--font-display), 'Instrument Serif', serif", fontSize: "clamp(22px, 2.4vw, 30px)", lineHeight: 1.2, color: "#FAF9F6", margin: "0 0 12px 0", fontWeight: 400 }}>
          Got it — I&rsquo;ll be in touch.
        </p>
        <p style={{ fontSize: "15px", lineHeight: 1.6, color: "rgba(250,249,246,0.55)", margin: 0 }}>
          Thanks for reaching out.
        </p>
      </div>
    );
  }

  return (
    <form id="lead-form" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <label htmlFor="lf-name" style={labelStyle}>NAME</label>
        <input
          id="lf-name"
          type="text"
          name="name"
          value={formValues.name}
          onChange={(e) => updateField("name", e.target.value)}
          required
          autoComplete="name"
          placeholder="Your full name"
          style={inputStyle}
          onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "#4A6B8A"; }}
          onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(250,249,246,0.15)"; }}
        />
      </div>

      <div>
        <label htmlFor="lf-email" style={labelStyle}>EMAIL</label>
        <input
          id="lf-email"
          type="email"
          name="email"
          value={formValues.email}
          onChange={(e) => updateField("email", e.target.value)}
          required
          autoComplete="email"
          placeholder="name@example.com"
          style={inputStyle}
          onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "#4A6B8A"; }}
          onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(250,249,246,0.15)"; }}
        />
      </div>

      <div>
        <label htmlFor="lf-phone" style={labelStyle}>PHONE</label>
        <input
          id="lf-phone"
          type="tel"
          name="phone"
          value={formValues.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          required
          autoComplete="tel"
          placeholder="+972 50 000 0000"
          style={inputStyle}
          onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "#4A6B8A"; }}
          onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(250,249,246,0.15)"; }}
        />
      </div>

      {errorMessage && (
        <p role="alert" style={{ margin: 0, fontSize: "14px", color: "rgba(250,100,100,0.9)", padding: "12px 16px", border: "1px solid rgba(250,100,100,0.25)", borderRadius: "4px" }}>
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace",
          fontSize: "13px",
          letterSpacing: "0.06em",
          color: "#FAF9F6",
          background: "transparent",
          border: "1px solid #4A6B8A",
          borderRadius: "4px",
          padding: "13px 22px",
          cursor: isSubmitting ? "not-allowed" : "pointer",
          opacity: isSubmitting ? 0.6 : 1,
          transition: "background 0.2s ease",
          alignSelf: "flex-start",
        }}
        onMouseEnter={(e) => { if (!isSubmitting) (e.currentTarget as HTMLButtonElement).style.background = "rgba(74,107,138,0.2)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
      >
        {isSubmitting ? "Sending..." : "Leave your details"}
      </button>
    </form>
  );
}
