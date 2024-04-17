import { prisma } from "@/lib/db";
import { ImageResponse } from "next/og";
import { type NextRequest } from "next/server";
// App router includes @vercel/og.
// No need to install it.

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("id") || "1";

  const meme = await prisma.memes.findFirst({ where: { id: parseInt(query) } });

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
        }}
      >
        <img src={meme?.image} />
        <p>{meme?.prompt}</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
