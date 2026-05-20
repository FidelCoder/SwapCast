import { ImageResponse } from "next/og";
import { APP_NAME } from "@/lib/app";

export const runtime = "edge";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "STON.fi swaps inside Farcaster";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #f5f7fb 0%, #ffffff 54%, #e9f3ff 100%)",
          color: "#101318",
          fontFamily: "Inter, Arial, sans-serif",
          padding: "72px"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div
            style={{
              width: "96px",
              height: "96px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "22px",
              background:
                "linear-gradient(135deg, #37d6b3 0%, #1f8fff 56%, #ff6f61 100%)",
              color: "#ffffff",
              fontSize: "34px",
              fontWeight: 900
            }}
          >
            SC
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "38px", fontWeight: 900 }}>
              {APP_NAME}
            </span>
            <span style={{ color: "#596170", fontSize: "26px" }}>
              Farcaster Mini App
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            maxWidth: "910px",
            fontSize: "76px",
            fontWeight: 900,
            lineHeight: 1.02
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#596170",
            fontSize: "28px",
            fontWeight: 800
          }}
        >
          <span>TON assets</span>
          <span>STON.fi Omniston widget</span>
          <span>Shareable casts</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 800
    }
  );
}

