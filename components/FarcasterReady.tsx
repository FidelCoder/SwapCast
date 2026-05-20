"use client";

import { useEffect } from "react";

export function FarcasterReady() {
  useEffect(() => {
    let cancelled = false;

    async function markReady() {
      try {
        const { sdk } = await import("@farcaster/miniapp-sdk");

        if (!cancelled) {
          await sdk.actions.ready();
        }
      } catch {
        // Running outside a Farcaster host is expected during local browser dev.
      }
    }

    void markReady();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}

