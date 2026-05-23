import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";
import { FarcasterReady } from "@/components/FarcasterReady";
import { FarcasterWalletButton } from "@/components/FarcasterWalletButton";
import { FarcasterWalletProvider } from "@/components/FarcasterWalletProvider";
import { APP_DESCRIPTION, APP_NAME, absoluteUrl, getAppUrl } from "@/lib/app";
import { createMetadataOther } from "@/lib/miniapp";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1
};

export const metadata: Metadata = {
  metadataBase: new URL(getAppUrl()),
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`
  },
  description: APP_DESCRIPTION,
  openGraph: {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    url: absoluteUrl("/"),
    siteName: APP_NAME,
    images: [
      {
        url: absoluteUrl("/api/og"),
        width: 1200,
        height: 800,
        alt: "SwapCast"
      }
    ],
    type: "website"
  },
  other: createMetadataOther({
    path: "/",
    imageTitle: "STON.fi swaps inside Farcaster"
  })
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <FarcasterReady />
        <FarcasterWalletProvider>
          <div className="app-frame">
            <header className="top-nav">
              <div className="top-nav-inner">
                <Link className="brand-link" href="/">
                  <span className="brand-mark">SC</span>
                  <span>{APP_NAME}</span>
                </Link>
                <div className="nav-actions">
                  <nav className="nav-links" aria-label="Primary">
                    <Link className="nav-link" href="/swap">
                      Swap
                    </Link>
                    <Link className="nav-link" href="/about">
                      About
                    </Link>
                  </nav>
                  <FarcasterWalletButton />
                </div>
              </div>
            </header>
            <main className="page-main">{children}</main>
          </div>
        </FarcasterWalletProvider>
      </body>
    </html>
  );
}
