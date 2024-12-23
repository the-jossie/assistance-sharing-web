import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import App from "./App";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Assistance Sharing App",
  description: "Give a help!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta
          name="viewport"
          content="width=1024, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <App>{children}</App>
      </body>
    </html>
  );
}
