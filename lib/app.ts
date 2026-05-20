export const APP_NAME = "SwapCast";
export const APP_DESCRIPTION =
  "A Farcaster Mini App for discovering TON assets and opening STON.fi Omniston swaps.";

export const SPLASH_COLOR = "#f5f7fb";

export function getAppUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_APP_URL;

  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, "");
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getAppUrl()}${normalizedPath}`;
}

