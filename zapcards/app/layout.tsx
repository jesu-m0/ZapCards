import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZapCards",
  description: "A flashcard game to learn different languages and explore various topics.",
  icons: {
    icon: "/assets/favico/favicon.ico",
    shortcut: "/assets/favico/favicon-32x32.png",
    apple: "/assets/favico/favicon-16x16.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favico/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favico/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favico/favicon-16x16.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
