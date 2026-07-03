import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import TrackingScripts, { TrackingNoScript } from "@/components/TrackingScripts";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});
const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yoavassaf.com"),
  title: "Yoav Assaf - AI Product Manager",
  description:
    "AI Product Manager specializing in agent-based workflows for complex B2B processes. I turn slow, manual work into fast, human-supervised products.",
  openGraph: {
    title: "Yoav Assaf - AI Product Manager",
    description:
      "Agent-based AI workflows for complex B2B products - built hands-on.",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Yoav Assaf - AI Product Manager" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yoav Assaf - AI Product Manager",
    description:
      "Agent-based AI workflows for complex B2B products - built hands-on.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${mono.variable}`}>
        <TrackingNoScript />
        <TrackingScripts />
        {children}
      </body>
    </html>
  );
}
