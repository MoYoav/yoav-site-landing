"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type FormValues = {
  name: string;
  email: string;
  phone: string;
};

const INITIAL_VALUES: FormValues = {
  name: "",
  email: "",
  phone: "",
};

const pendingLeadKey = "pending_lead_submission_id";

export default function LeadCaptureForm() {
  const router = useRouter();
  const [formValues, setFormValues] = useState<FormValues>(INITIAL_VALUES);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function updateField(field: keyof FormValues, value: string) {
    setFormValues((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formValues,
          sourcePath: window.location.pathname,
        }),
      });

      const result = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;

      if (!response.ok) {
        throw new Error(
          result?.error || "Something went wrong while saving your details."
        );
      }

      sessionStorage.setItem(
        pendingLeadKey,
        `${Date.now()}-${Math.random().toString(16).slice(2)}`
      );
      setFormValues(INITIAL_VALUES);
      router.push("/thank-you");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while saving your details."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form id="lead-form" className="space-y-4" onSubmit={handleSubmit}>
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-[var(--paper)]">
          Name
        </span>
        <input
          type="text"
          name="name"
          value={formValues.name}
          onChange={(event) => updateField("name", event.target.value)}
          required
          autoComplete="name"
          className="w-full rounded-2xl border border-white/15 bg-white px-4 py-3 text-[var(--ink)] outline-none transition focus:border-[var(--signal)]"
          placeholder="Your full name"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-[var(--paper)]">
          Email
        </span>
        <input
          type="email"
          name="email"
          value={formValues.email}
          onChange={(event) => updateField("email", event.target.value)}
          required
          autoComplete="email"
          className="w-full rounded-2xl border border-white/15 bg-white px-4 py-3 text-[var(--ink)] outline-none transition focus:border-[var(--signal)]"
          placeholder="name@example.com"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-[var(--paper)]">
          Phone
        </span>
        <input
          type="tel"
          name="phone"
          value={formValues.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          required
          autoComplete="tel"
          className="w-full rounded-2xl border border-white/15 bg-white px-4 py-3 text-[var(--ink)] outline-none transition focus:border-[var(--signal)]"
          placeholder="+1 555 123 4567"
        />
      </label>

      <p className="text-sm leading-relaxed text-[var(--paper)]/70">
        Storage note: if Airtable is configured, this form saves there. If not,
        it falls back to
        {" "}
        <code>data/leads.json</code>
        {" "}
        so you can keep practicing locally without a database.
      </p>

      {errorMessage ? (
        <p
          role="alert"
          className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100"
        >
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-[var(--signal)] px-6 py-3 font-medium text-white transition hover:bg-[var(--signal-deep)] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Sending..." : "Leave your details"}
      </button>
    </form>
  );
}
