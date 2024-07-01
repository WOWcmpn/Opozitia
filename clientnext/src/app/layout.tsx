import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals1.css";
import { Providers } from "@/components/Providers/Providers";
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { extractRouterConfig } from 'uploadthing/server';
import { ourFileRouter } from '@/app/api/uploadthing/core';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Opozitia",
  description: "News portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Providers>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
      {children}
      </Providers>
      </body>
    </html>
  );
}
