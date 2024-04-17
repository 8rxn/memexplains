import { prisma } from "@/lib/db";
import { ImageResponse } from "next/og";
import { type NextRequest } from "next/server";
// App router includes @vercel/og.
// No need to install it.

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 40,
          color: "black",
          background: "white",
          width: "100%",
          height: "100%",
          padding: "50px 200px",
          textAlign: "center",
          justifyContent: "between",
          alignItems: "center",
          display: "flex",
        }}
      >
        <div>
          <img
            src={`https://https://memes-cdn.rajaryan.work/uploads/${id}.webp`}
            style={{
              width: "600px",
              height: "600px",
              borderRadius: "10px",
              marginBottom: "10px",
              objectFit: "contain",
            }}
          />
        </div>
        Imagine Memes. MemeExplains
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
