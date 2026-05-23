import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Boxes } from "lucide-react";
import { AnalyticsOnView } from "@/components/AnalyticsOnView";
import { FarcasterWalletStatus } from "@/components/FarcasterWalletStatus";
import { OmnistonWidget } from "@/components/OmnistonWidget";
import { ShareButton } from "@/components/ShareButton";
import { absoluteUrl } from "@/lib/app";
import { createMetadataOther } from "@/lib/miniapp";

export const metadata: Metadata = {
  title: "Swap",
  description: "Open the embedded STON.fi Omniston swap widget.",
  alternates: {
    canonical: absoluteUrl("/swap")
  },
  other: createMetadataOther({
    path: "/swap",
    title: "Open Swap",
    imageTitle: "Open the SwapCast widget"
  })
};

export default function SwapPage() {
  return (
    <div className="stack">
      <AnalyticsOnView event="swap_page_opened" />
      <section className="page-heading">
        <Link className="preset-pill" href="/">
          <ArrowLeft aria-hidden="true" size={16} />
          Presets
        </Link>
        <h1>Swap</h1>
        <p>
          The STON.fi Omniston widget handles wallet connection, routing, and
          swap execution.
        </p>
      </section>

      <div className="swap-toolbar">
        <span className="preset-pill">
          <Boxes aria-hidden="true" size={16} />
          Generic TON swap
        </span>
        <ShareButton
          path="/swap"
          text="Trying SwapCast, a Farcaster Mini App for STON.fi Omniston swaps on TON."
        />
      </div>
      <FarcasterWalletStatus />
      <OmnistonWidget analyticsContext="generic" />
    </div>
  );
}

