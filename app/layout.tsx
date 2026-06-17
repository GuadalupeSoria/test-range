import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Range",
  description: "Custom range slider component",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
