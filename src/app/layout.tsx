import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Care Connect - Healthcare Platform",
  description: "Connect with healthcare professionals and manage your appointments",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
