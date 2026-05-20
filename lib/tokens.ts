export type TokenPreset = {
  symbol: string;
  name: string;
  tagline: string;
  assetAddress: string;
  defaultBidAsset: string;
  accent: string;
  background: string;
  sourceLabel: string;
};

export const TON_ASSET_ADDRESS =
  "EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c";

export const STON_ASSET_ADDRESS =
  "EQA2kCVNwVsil2EM2mB0SkXytxCqQjS4mttjDpnXmwG9T6bO";

export const USDT_ASSET_ADDRESS =
  "EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs";

export const tokenPresets: TokenPreset[] = [
  {
    symbol: "STON",
    name: "STON",
    tagline: "Open a TON to STON swap preset.",
    assetAddress: STON_ASSET_ADDRESS,
    defaultBidAsset: TON_ASSET_ADDRESS,
    accent: "#37d6b3",
    background: "#e8fbf6",
    sourceLabel: "STON.fi widget docs example"
  },
  {
    symbol: "USDT",
    name: "USDt on TON",
    tagline: "Open a TON to USDt swap preset.",
    assetAddress: USDT_ASSET_ADDRESS,
    defaultBidAsset: TON_ASSET_ADDRESS,
    accent: "#1f8fff",
    background: "#e9f3ff",
    sourceLabel: "TON Docs USDT jetton master"
  },
  {
    symbol: "TON",
    name: "Toncoin",
    tagline: "Open a USDt to TON swap preset.",
    assetAddress: TON_ASSET_ADDRESS,
    defaultBidAsset: USDT_ASSET_ADDRESS,
    accent: "#ff6f61",
    background: "#fff0ee",
    sourceLabel: "STON.fi widget docs TON asset"
  }
];

export const widgetAssetAllowlist = Array.from(
  new Set(
    tokenPresets.flatMap((token) => [
      token.assetAddress,
      token.defaultBidAsset
    ])
  )
);

export function getTokenPreset(symbol: string) {
  return tokenPresets.find(
    (token) => token.symbol.toLowerCase() === symbol.toLowerCase()
  );
}

