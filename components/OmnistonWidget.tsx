"use client";

import { AlertCircle, LoaderCircle, RefreshCw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type {
  OmnistonConfig,
  OmnistonWidget as OmnistonWidgetInstance
} from "@ston-fi/omniston-widget-loader";
import { trackEvent } from "@/lib/analytics";
import { widgetAssetAllowlist } from "@/lib/tokens";

type OmnistonWidgetProps = {
  defaultBidAsset?: string;
  defaultAskAsset?: string;
  analyticsContext: "generic" | "token";
};

type WidgetState = "loading" | "ready" | "error";

function getReferrerFeeBps() {
  const rawFee = process.env.NEXT_PUBLIC_STONFI_REFERRER_FEE_BPS;

  if (!rawFee) {
    return undefined;
  }

  const parsedFee = Number(rawFee);

  if (!Number.isFinite(parsedFee) || parsedFee < 0) {
    return undefined;
  }

  return parsedFee;
}

export function OmnistonWidget({
  defaultBidAsset,
  defaultAskAsset,
  analyticsContext
}: OmnistonWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<OmnistonWidgetInstance | null>(null);
  const [state, setState] = useState<WidgetState>("loading");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadWidget() {
      const container = containerRef.current;

      if (!container) {
        return;
      }

      setState("loading");
      container.innerHTML = "";

      try {
        const widgetLoaderModule = await import("@ston-fi/omniston-widget-loader");
        const OmnistonWidgetConstructor = await widgetLoaderModule.default.load();

        if (cancelled || !containerRef.current) {
          return;
        }

        const options: OmnistonConfig = {
          tonconnect: {
            type: "standalone",
            options: {
              manifestUrl: new URL(
                "/tonconnect-manifest.json",
                window.location.origin
              ).toString()
            }
          },
          widget: {
            defaultAssets: true,
            customAssets: widgetAssetAllowlist,
            defaultBidAsset,
            defaultAskAsset,
            referrerAddress:
              process.env.NEXT_PUBLIC_STONFI_REFERRER_ADDRESS || undefined,
            referrerFeeBps: getReferrerFeeBps()
          }
        };

        const instance = new OmnistonWidgetConstructor(options);
        instance.mount(containerRef.current);
        instanceRef.current = instance;
        setState("ready");
        trackEvent("widget_loaded", {
          context: analyticsContext,
          defaultAskAsset: defaultAskAsset ?? "none"
        });
      } catch (error) {
        console.error("Failed to load Omniston widget", error);

        if (!cancelled) {
          setState("error");
        }
      }
    }

    void loadWidget();

    return () => {
      cancelled = true;
      instanceRef.current?.unmount?.();
      instanceRef.current = null;
    };
  }, [analyticsContext, defaultAskAsset, defaultBidAsset, reloadKey]);

  return (
    <section className="widget-shell" aria-live="polite">
      {state === "loading" ? (
        <div className="widget-state">
          <LoaderCircle aria-hidden="true" className="spin" size={24} />
          <div>
            <p className="state-title">Loading STON.fi Omniston</p>
            <p className="state-copy">The swap interface is starting up.</p>
          </div>
        </div>
      ) : null}

      {state === "error" ? (
        <div className="widget-state error">
          <AlertCircle aria-hidden="true" size={24} />
          <div>
            <p className="state-title">Widget could not load</p>
            <p className="state-copy">
              Check the network connection and try again.
            </p>
          </div>
          <button
            className="icon-button subtle-action"
            onClick={() => setReloadKey((key) => key + 1)}
          >
            <RefreshCw aria-hidden="true" size={16} />
            <span>Retry</span>
          </button>
        </div>
      ) : null}

      <div
        ref={containerRef}
        className={state === "ready" ? "widget-mount ready" : "widget-mount"}
      />
    </section>
  );
}

