import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET() {
  try {
    const res = await prisma.memes.findMany({
      include: {
        _count: {
          select: {
            Upvotes: true,
          },
        },
        Upvotes: {
          select: {
            userId: true,
          },
        },
      },
      orderBy: [{ createdAt: "desc" }],
    });

    return Response.json(res);
  } catch (error) {
    return Response.error();
  }
}
