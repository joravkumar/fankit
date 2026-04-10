// import { ImageResponse } from "next/og";
import { ImageResponse } from "@vercel/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 48,
        background: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      My Preview Image 🚀
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
