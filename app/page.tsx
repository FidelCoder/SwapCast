import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Radio, Sparkles } from "lucide-react";
import { AnalyticsOnView } from "@/components/AnalyticsOnView";
import { SwapVisual } from "@/components/SwapVisual";
import { TokenCard } from "@/components/TokenCard";
import { APP_DESCRIPTION, APP_NAME, absoluteUrl } from "@/lib/app";
import { createMetadataOther } from "@/lib/miniapp";
import { tokenPresets } from "@/lib/tokens";

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
  alternates: {
    canonical: absoluteUrl("/")
  },
  other: createMetadataOther({
    path: "/",
    imageTitle: "STON.fi swaps inside Farcaster"
  })
};

export default function HomePage() {
  return (
    <div className="stack">
      <AnalyticsOnView event="app_opened" />
      <section className="hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">
            <Radio aria-hidden="true" size={16} />
            Farcaster Mini App
          </span>
          <h1 className="hero-title">SwapCast</h1>
          <p className="hero-text">
            Discover TON assets from the feed, open a preset swap page, and use
            the embedded STON.fi Omniston widget without leaving the Farcaster
            flow.
          </p>
          <div className="action-row">
            <Link className="icon-button primary-action" href="/swap">
              <Sparkles aria-hidden="true" size={18} />
              <span>Open Swap</span>
            </Link>
            <Link className="icon-button secondary-action" href="/about">
              <ArrowRight aria-hidden="true" size={18} />
              <span>About</span>
            </Link>
          </div>
        </div>
        <SwapVisual />
      </section>

      <section className="token-strip" aria-label="Token presets">
        {tokenPresets.map((token) => (
          <TokenCard key={token.symbol} token={token} />
        ))}
      </section>
    </div>
  );
}

