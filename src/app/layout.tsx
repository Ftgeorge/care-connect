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
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          integrity="sha512-D7qIE+hzlO7WMPD5mX6ChMBg3AAdwSpDAi8Nnm7Gy29T2CkpNoQxG/89wTiKO64+ljzYY2rPyaEfMZ0w1WLo5Q=="
        />

      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
