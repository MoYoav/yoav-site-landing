import type { Metadata } from "next";
import { Instrument_Serif, Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import TrackingScripts, { TrackingNoScript } from "@/components/TrackingScripts";
import "./globals.css";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-display",
});
const body = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yoavassaf.com"),
  title: "Yoav Assaf — AI Product Manager",
  description:
    "I take complex processes and make them simple. A product manager who builds — mostly AI, hands-on.",
  openGraph: {
    title: "Yoav Assaf — AI Product Manager",
    description:
      "I take complex processes and make them simple. A product manager who builds — mostly AI, hands-on.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yoav Assaf — AI Product Manager",
    description:
      "I take complex processes and make them simple. A product manager who builds — mostly AI, hands-on.",
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
