import { ImageResponse } from "next/og";

export const runtime = "edge";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f7fb",
          color: "#101318",
          fontFamily: "Inter, Arial, sans-serif",
          fontSize: "74px",
          fontWeight: 900
        }}
      >
        SwapCast
      </div>
    ),
    {
      width: 1024,
      height: 1024
    }
  );
}

