"use client";

import { Share2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

type ShareButtonProps = {
  path: string;
  text: string;
  label?: string;
};

export function ShareButton({
  path,
  text,
  label = "Share"
}: ShareButtonProps) {
  async function handleShare() {
    trackEvent("share_clicked", { path });

    const url = new URL(path, window.location.origin).toString();

    try {
      const { sdk } = await import("@farcaster/miniapp-sdk");
      await sdk.actions.composeCast({
        text,
        embeds: [url] as [string]
      });
    } catch {
      const intent = new URL("https://farcaster.xyz/~/compose");
      intent.searchParams.set("text", `${text}\n${url}`);
      window.open(intent.toString(), "_blank", "noopener,noreferrer");
    }
  }

  return (
    <button className="icon-button primary-action" onClick={handleShare}>
      <Share2 aria-hidden="true" size={18} />
      <span>{label}</span>
    </button>
  );
}

