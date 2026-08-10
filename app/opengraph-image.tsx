import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Faham | AI Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#000",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow orb */}
        <div
          style={{
            position: "absolute",
            top: -160,
            left: "50%",
            marginLeft: -350,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background: "rgba(0,198,255,0.10)",
            filter: "blur(120px)",
          }}
        />
        {/* Role chip */}
        <div
          style={{
            display: "flex",
            color: "rgba(0,198,255,0.65)",
            fontSize: 15,
            letterSpacing: 5,
            textTransform: "uppercase",
            marginBottom: 24,
            border: "1px solid rgba(0,198,255,0.2)",
            padding: "8px 20px",
            borderRadius: 999,
          }}
        >
          AI · ML · GenAI
        </div>
        {/* Name */}
        <div
          style={{
            color: "#fff",
            fontSize: 96,
            fontWeight: 900,
            letterSpacing: -4,
            lineHeight: 1,
            marginBottom: 20,
          }}
        >
          Faham
        </div>
        {/* Subtitle */}
        <div
          style={{
            color: "rgba(255,255,255,0.35)",
            fontSize: 26,
            fontWeight: 400,
            marginBottom: 48,
          }}
        >
          AI Software Engineer · San Jose, CA
        </div>
        {/* Domain */}
        <div
          style={{
            color: "rgba(0,198,255,0.45)",
            fontSize: 18,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          iamfaham.me
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
