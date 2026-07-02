import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

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

    const dataDirectory = path.join(process.cwd(), "data");
    const dataFile = path.join(dataDirectory, "leads.json");

    await mkdir(dataDirectory, { recursive: true });

    const leads = await readExistingLeads(dataFile);
    const newLead: Lead = {
      id: crypto.randomUUID(),
      name,
      email,
      phone,
      sourcePath,
      submittedAt: new Date().toISOString(),
      userAgent: req.headers.get("user-agent"),
    };

    leads.push(newLead);

    await writeFile(dataFile, JSON.stringify(leads, null, 2), "utf8");

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Lead capture error:", error);

    return NextResponse.json(
      { error: "Could not save the lead right now. Please try again." },
      { status: 500 }
    );
  }
}

