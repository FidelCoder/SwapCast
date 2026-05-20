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
          background:
            "linear-gradient(135deg, #37d6b3 0%, #1f8fff 55%, #ff6f61 100%)",
          color: "#ffffff",
          fontFamily: "Inter, Arial, sans-serif",
          fontSize: "300px",
          fontWeight: 900
        }}
      >
        SC
      </div>
    ),
    {
      width: 1024,
      height: 1024
    }
  );
}

