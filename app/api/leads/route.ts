import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resendApiKey = process.env.RESEND_API_KEY?.trim();

const airtableToken = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN?.trim();
const airtableBaseId = process.env.AIRTABLE_BASE_ID?.trim();
const airtableTableName = process.env.AIRTABLE_TABLE_NAME?.trim();

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  sourcePath: string;
  submittedAt: string;
  userAgent: string | null;
};

function isMissingFileError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "ENOENT"
  );
}

async function readExistingLeads(filePath: string) {
  try {
    const fileContents = (await readFile(filePath, "utf8"))
      .replace(/^\uFEFF/, "")
      .trim();

    if (!fileContents) {
      return [];
    }

    const parsed = JSON.parse(fileContents);
    return Array.isArray(parsed) ? (parsed as Lead[]) : [];
  } catch (error) {
    if (isMissingFileError(error)) {
      return [];
    }

    throw error;
  }
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function hasCompleteAirtableConfig() {
  return Boolean(airtableToken && airtableBaseId && airtableTableName);
}

function hasPartialAirtableConfig() {
  const values = [airtableToken, airtableBaseId, airtableTableName];
  return values.some(Boolean) && !values.every(Boolean);
}

async function saveLeadLocally(lead: Lead) {
  const dataDirectory = path.join(process.cwd(), "data");
  const dataFile = path.join(dataDirectory, "leads.json");

  await mkdir(dataDirectory, { recursive: true });

  const leads = await readExistingLeads(dataFile);
  leads.push(lead);

  await writeFile(dataFile, JSON.stringify(leads, null, 2), "utf8");
}

async function saveLeadToAirtable(lead: Lead) {
  if (!hasCompleteAirtableConfig()) {
    throw new Error("Airtable is not fully configured.");
  }

  const response = await fetch(
    `https://api.airtable.com/v0/${airtableBaseId}/${encodeURIComponent(airtableTableName!)}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${airtableToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              leadId: lead.id,
              name: lead.name,
              email: lead.email,
              phone: lead.phone,
              sourcePath: lead.sourcePath,
              submittedAt: lead.submittedAt,
              userAgent: lead.userAgent ?? "",
            },
          },
        ],
      }),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const detail = await response.text();
    console.error("Airtable lead capture error:", response.status, detail);
    throw new Error("Could not save the lead to Airtable.");
  }
}

async function sendEmails(lead: Lead) {
  if (!resendApiKey) return;
  const resend = new Resend(resendApiKey);

  await Promise.allSettled([
    // auto-reply to the person who submitted
    resend.emails.send({
      from: "Yoav Assaf <hello@yoavassaf.com>",
      to: lead.email,
      subject: "Got your details — I'll be in touch",
      html: `<p>Hi ${lead.name},</p><p>Thanks for reaching out. I got your details and will be in touch shortly.</p><p>— Yoav</p>`,
    }),
    // notification to Yoav
    resend.emails.send({
      from: "Site <hello@yoavassaf.com>",
      to: "yoavs217@gmail.com",
      subject: `New contact: ${lead.name}`,
      html: `<p><strong>Name:</strong> ${lead.name}<br><strong>Email:</strong> ${lead.email}<br><strong>Phone:</strong> ${lead.phone}</p>`,
    }),
  ]);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim().toLowerCase();
    const phone = String(body?.phone ?? "").trim();
    const sourcePath = String(body?.sourcePath ?? "/").trim() || "/";

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const newLead: Lead = {
      id: crypto.randomUUID(),
      name,
      email,
      phone,
      sourcePath,
      submittedAt: new Date().toISOString(),
      userAgent: req.headers.get("user-agent"),
    };

    if (hasPartialAirtableConfig()) {
      return NextResponse.json(
        {
          error:
            "Airtable lead storage is only partly configured. Add AIRTABLE_PERSONAL_ACCESS_TOKEN, AIRTABLE_BASE_ID, and AIRTABLE_TABLE_NAME, or remove them to keep local demo storage.",
        },
        { status: 500 }
      );
    }

    if (hasCompleteAirtableConfig()) {
      await saveLeadToAirtable(newLead);
      await sendEmails(newLead);
      return NextResponse.json({ ok: true, storage: "airtable" });
    }

    await saveLeadLocally(newLead);
    await sendEmails(newLead);

    return NextResponse.json({ ok: true, storage: "local" });
  } catch (error) {
    console.error("Lead capture error:", error);

    return NextResponse.json(
      { error: "Could not save the lead right now. Please try again." },
      { status: 500 }
    );
  }
}
