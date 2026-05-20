import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Gem } from "lucide-react";
import { notFound } from "next/navigation";
import { AnalyticsOnView } from "@/components/AnalyticsOnView";
import { OmnistonWidget } from "@/components/OmnistonWidget";
import { ShareButton } from "@/components/ShareButton";
import { absoluteUrl } from "@/lib/app";
import { createMetadataOther } from "@/lib/miniapp";
import { getTokenPreset, tokenPresets } from "@/lib/tokens";

type TokenPageProps = {
  params: {
    symbol: string;
  };
};

export function generateStaticParams() {
  return tokenPresets.map((token) => ({
    symbol: token.symbol.toLowerCase()
  }));
}

export function generateMetadata({ params }: TokenPageProps): Metadata {
  const token = getTokenPreset(params.symbol);

  if (!token) {
    return {
      title: "Token not found"
    };
  }

  const path = `/token/${token.symbol.toLowerCase()}`;

  return {
    title: `${token.symbol} Swap`,
    description: token.tagline,
    alternates: {
      canonical: absoluteUrl(path)
    },
    other: createMetadataOther({
      path,
      title: `Swap ${token.symbol}`,
      imageTitle: `${token.symbol} on SwapCast`
    })
  };
}

export default function TokenPage({ params }: TokenPageProps) {
  const token = getTokenPreset(params.symbol);

  if (!token) {
    notFound();
  }

  const path = `/token/${token.symbol.toLowerCase()}`;

  return (
    <div className="stack">
      <AnalyticsOnView
        event="token_preset_opened"
        payload={{ symbol: token.symbol }}
      />
      <section className="page-heading">
        <Link className="preset-pill" href="/">
          <ArrowLeft aria-hidden="true" size={16} />
          Presets
        </Link>
        <h1>{token.symbol} swap</h1>
        <p>{token.tagline}</p>
      </section>

      <div className="swap-toolbar">
        <span className="preset-pill">
          <Gem aria-hidden="true" size={16} />
          {token.sourceLabel}
        </span>
        <ShareButton
          path={path}
          text={`Opening a ${token.symbol} swap preset in SwapCast.`}
          label="Cast"
        />
      </div>

      <OmnistonWidget
        analyticsContext="token"
        defaultBidAsset={token.defaultBidAsset}
        defaultAskAsset={token.assetAddress}
      />
    </div>
  );
}

