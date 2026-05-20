import { NextResponse } from "next/server";
import {
  APP_DESCRIPTION,
  APP_NAME,
  SPLASH_COLOR,
  absoluteUrl,
  getAppUrl
} from "@/lib/app";

export const dynamic = "force-dynamic";

type AccountAssociation = {
  header: string;
  payload: string;
  signature: string;
};

function getAccountAssociation(): AccountAssociation {
  const rawAssociation = process.env.FARCASTER_ACCOUNT_ASSOCIATION;

  if (rawAssociation) {
    try {
      return JSON.parse(rawAssociation) as AccountAssociation;
    } catch {
      // Fall through to individual env vars.
    }
  }

  return {
    header: process.env.FARCASTER_ACCOUNT_ASSOCIATION_HEADER ?? "",
    payload: process.env.FARCASTER_ACCOUNT_ASSOCIATION_PAYLOAD ?? "",
    signature: process.env.FARCASTER_ACCOUNT_ASSOCIATION_SIGNATURE ?? ""
  };
}

export function GET() {
  const miniapp = {
    version: "1",
    name: APP_NAME,
    homeUrl: getAppUrl(),
    iconUrl: absoluteUrl("/icon.png"),
    imageUrl: absoluteUrl("/api/og"),
    buttonTitle: "Open SwapCast",
    splashImageUrl: absoluteUrl("/splash.png"),
    splashBackgroundColor: SPLASH_COLOR,
    subtitle: "TON swaps in Farcaster",
    description: APP_DESCRIPTION,
    primaryCategory: "finance",
    tags: ["ton", "defi", "swap", "stonfi", "farcaster"]
  };

  return NextResponse.json({
    accountAssociation: getAccountAssociation(),
    miniapp,
    frame: miniapp
  });
}

