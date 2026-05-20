"use client";

export type AnalyticsEventName =
  | "app_opened"
  | "swap_page_opened"
  | "token_preset_opened"
  | "widget_loaded"
  | "share_clicked";

export type AnalyticsPayload = Record<string, string | number | boolean>;

export function trackEvent(
  name: AnalyticsEventName,
  payload: AnalyticsPayload = {}
) {
  const detail = {
    name,
    payload,
    timestamp: new Date().toISOString()
  };

  window.dispatchEvent(new CustomEvent("swapcast:analytics", { detail }));

  if (process.env.NODE_ENV !== "production") {
    console.info("[SwapCast analytics]", detail);
  }
}

