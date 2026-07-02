import Link from "next/link";
import ThankYouTracker from "@/components/ThankYouTracker";

export const metadata = {
  title: "Thank You | Yoav Assaf",
  description: "Thank you page for the landing page lead form demo.",
};

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-[var(--paper)] px-6 py-24 text-[var(--ink)]">
      <ThankYouTracker />

      <section className="mx-auto max-w-3xl rounded-[2rem] border border-[var(--line)] bg-[var(--paper-pure)] p-8 shadow-[0_20px_80px_rgba(20,22,26,0.08)] md:p-12">
        <p className="mono text-sm tracking-wide text-[var(--signal)]">
          THANK YOU
        </p>
        <h1 className="display mt-4 text-4xl font-bold leading-tight md:text-5xl">
          Your details were received.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--ink-soft)]">
          This is the thank-you step of the landing page flow. It is useful
          because ad platforms often treat this page as the conversion point,
          which means this is where you measure a successful lead.
        </p>

        <div className="mt-8 rounded-3xl border border-[var(--line)] bg-[var(--paper)] p-6">
          <p className="mono text-xs text-[var(--slate)]">DEMO NOTE</p>
          <p className="mt-3 leading-relaxed text-[var(--ink-soft)]">
            For this beginner-friendly version, the submitted lead is saved to
            <code> data/leads.json </code>
            inside the project.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/"
            className="rounded-full bg-[var(--ink)] px-6 py-3 font-medium text-[var(--paper)] transition hover:bg-[var(--signal)]"
          >
            Back to the landing page
          </Link>
          <a
            href="mailto:yoavs217@gmail.com"
            className="rounded-full border border-[var(--ink)] px-6 py-3 font-medium transition hover:bg-[var(--ink)] hover:text-[var(--paper)]"
          >
            Email Yoav
          </a>
        </div>
      </section>
    </main>
  );
}
