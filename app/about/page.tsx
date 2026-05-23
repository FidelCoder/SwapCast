import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Radio } from "lucide-react";
import { absoluteUrl } from "@/lib/app";
import { createMetadataOther } from "@/lib/miniapp";

export const metadata: Metadata = {
  title: "About",
  description: "How SwapCast brings STON.fi widget distribution to Farcaster.",
  alternates: {
    canonical: absoluteUrl("/about")
  },
  other: createMetadataOther({
    path: "/about",
    imageTitle: "About SwapCast"
  })
};

export default function AboutPage() {
  return (
    <div className="stack">
      <section className="page-heading">
        <span className="eyebrow">
          <Radio aria-hidden="true" size={16} />
          Farcaster Mini App
        </span>
        <h1>Social TON swaps</h1>
        <p>
          SwapCast is a focused Mini App for Farcaster distribution: users
          can open shareable TON asset pages, load the STON.fi Omniston widget,
          and connect a TON wallet through the widget flow.
        </p>
      </section>

      <ul className="about-list">
        <li>Embeds STON.fi Omniston instead of implementing swap logic.</li>
        <li>Uses Farcaster Mini App metadata and shareable preset URLs.</li>
        <li>Keeps analytics client-side for a focused MVP surface.</li>
      </ul>

      <div className="action-row">
        <Link className="icon-button primary-action" href="/swap">
          <ArrowRight aria-hidden="true" size={18} />
          <span>Open Swap</span>
        </Link>
      </div>
    </div>
  );
}

