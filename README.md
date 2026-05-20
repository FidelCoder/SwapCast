# SwapCast

SwapCast is a Farcaster Mini App MVP that opens STON.fi Omniston swaps for TON assets from shareable Farcaster pages.

The app intentionally does not implement swap routing, fake execution, auth, databases, dashboards, or a custom DEX. The embedded STON.fi Omniston widget owns wallet connection, swap UI, routing, and execution.

## MVP Features

- Mobile-first Next.js app router UI.
- Farcaster Mini App metadata on each shareable page.
- Dynamic `/.well-known/farcaster.json` manifest route.
- STON.fi Omniston widget integration through `@ston-fi/omniston-widget-loader`.
- Same-domain `/tonconnect-manifest.json` for standalone TonConnect mode.
- Generic `/swap` page and preset `/token/[symbol]` pages.
- Farcaster share/cast action with browser fallback.
- Client-side analytics events:
  - `app_opened`
  - `swap_page_opened`
  - `token_preset_opened`
  - `widget_loaded`
  - `share_clicked`

## Routes

- `/` - landing page and token presets.
- `/swap` - generic Omniston widget page.
- `/token/ston` - TON to STON preset.
- `/token/usdt` - TON to USDt preset.
- `/token/ton` - USDt to TON preset.
- `/about` - short grant/demo explanation.
- `/.well-known/farcaster.json` - Farcaster Mini App manifest.
- `/tonconnect-manifest.json` - TonConnect manifest used by the widget.

## Local Setup

Use Node `22.11+` for the closest match to current Farcaster Mini App tooling. The repo includes `.nvmrc`.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000

NEXT_PUBLIC_STONFI_REFERRER_ADDRESS=
NEXT_PUBLIC_STONFI_REFERRER_FEE_BPS=

FARCASTER_ACCOUNT_ASSOCIATION=
FARCASTER_ACCOUNT_ASSOCIATION_HEADER=
FARCASTER_ACCOUNT_ASSOCIATION_PAYLOAD=
FARCASTER_ACCOUNT_ASSOCIATION_SIGNATURE=
```

`NEXT_PUBLIC_APP_URL` must be the public HTTPS deployment URL in production. It is used for Farcaster embeds, manifest image URLs, and TonConnect manifest links.

For a production-valid Farcaster Mini App, set the account association values in the deployment environment. You can use either `FARCASTER_ACCOUNT_ASSOCIATION` as the full JSON object or the three individual `HEADER`, `PAYLOAD`, and `SIGNATURE` variables.

STON.fi referrer variables are optional and are only passed to the widget when set.

## Deployment Notes

1. Deploy the app to an HTTPS domain.
2. Set `NEXT_PUBLIC_APP_URL` to that exact origin.
3. Generate and configure the Farcaster account association values.
4. Verify `/.well-known/farcaster.json`.
5. Share `/`, `/swap`, or `/token/ston` in a cast to test the Mini App launch flow.

## Grant Demo Notes

SwapCast demonstrates STON.fi widget distribution inside Farcaster:

- Farcaster users can discover a TON asset page from a cast.
- The Mini App opens inside the Farcaster client.
- SwapCast embeds the official Omniston widget rather than implementing routing.
- TonConnect is initialized through the widget's standalone integration flow.
- Share buttons compose a new cast with the current swap page URL.

Analytics are deliberately lightweight for MVP review. In development they log to the console and always dispatch a `swapcast:analytics` browser event that can be picked up by a later analytics adapter.

## Verification

```bash
npm run typecheck
npm run lint
npm run build
```

All three checks pass in this workspace. `npm install` may print Node engine warnings on Node 18 because modern Farcaster transitive packages target newer Node versions; use Node `22.11+` for the clean path.

## References

- STON.fi widget docs: https://docs.ston.fi/developer-section/widget/widget
- Farcaster Mini Apps getting started: https://miniapps.farcaster.xyz/docs/getting-started
- Farcaster sharing guide: https://miniapps.farcaster.xyz/docs/guides/sharing
- Farcaster `composeCast` action: https://miniapps.farcaster.xyz/docs/sdk/actions/compose-cast
- TON Docs USDT asset reference: https://docs.ton.org/v3/documentation/dapps/assets/usdt
