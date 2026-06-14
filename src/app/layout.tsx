import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { InitNextJSCoreHooksSetup } from '@/components/core/InitNextJSCoreHooksSetup';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Stitchmate',
  description: 'Stitchmate Application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <InitNextJSCoreHooksSetup />
        {children}
      </body>
    </html>
  );
}
