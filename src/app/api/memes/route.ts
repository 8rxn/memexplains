import { prisma } from "@/lib/db";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 10;

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const nextPointer = searchParams.get("next");
    console.log(nextPointer);
    const skip = nextPointer ? Number(nextPointer) * 15 : 0;

    console.log(skip);

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
        user: {
          select: {
            image: true,
          },
        },
      },
      orderBy: [{ createdAt: "desc" }],
      skip: skip,
      take: 15,
    });

    console.log(res);

    const memes = res.map((meme) => ({
      id: meme.id,
      image: meme.image,
      prompt: meme.prompt,
      upvotes: meme._count.Upvotes,
      upvoted: meme.Upvotes.map((upvote) => upvote.userId),
      userId: meme.userId,
      userImage: meme.user.image,
    }));

    memes.sort((a, b) => {
      return b.upvotes - a.upvotes;
    });

    return Response.json({ memes, more: memes.length === 15 });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
