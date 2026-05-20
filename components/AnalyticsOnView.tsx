"use client";

import { useEffect } from "react";
import type {
  AnalyticsEventName,
  AnalyticsPayload
} from "@/lib/analytics";
import { trackEvent } from "@/lib/analytics";

type AnalyticsOnViewProps = {
  event: AnalyticsEventName;
  payload?: AnalyticsPayload;
};

export function AnalyticsOnView({ event, payload }: AnalyticsOnViewProps) {
  useEffect(() => {
    trackEvent(event, payload);
  }, [event, payload]);

  return null;
}

