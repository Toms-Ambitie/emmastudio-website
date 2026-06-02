import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Emma Studio — AI-assistent voor horecaondernemers",
  description:
    "Emma is het complete AI-ecosysteem voor de horecaondernemer. 8 slimme modules die samen jouw bedrijf runnen. Jij doet je werk. Emma de rest.",
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "32x32" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
