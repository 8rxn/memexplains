import { prisma } from "@/lib/db";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  console.log({ id });

  try {
    const memes = await prisma.memes.findMany({
      where: { userId: `${id}` },
      orderBy: { createdAt: "desc" },
    });

    return Response.json({ memes });
  } catch (error) {
    return Response.error();
  }
}
