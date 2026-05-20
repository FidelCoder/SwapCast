import { NextResponse } from "next/server";
import { APP_DESCRIPTION, APP_NAME, absoluteUrl, getAppUrl } from "@/lib/app";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({
    url: getAppUrl(),
    name: APP_NAME,
    iconUrl: absoluteUrl("/icon.png"),
    termsOfUseUrl: absoluteUrl("/about"),
    privacyPolicyUrl: absoluteUrl("/about"),
    bridgeUrl: undefined,
    description: APP_DESCRIPTION
  });
}

