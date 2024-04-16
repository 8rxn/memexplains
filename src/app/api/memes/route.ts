import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 10;

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
        user: {
          select: {
            image: true,
          },
        },
      },
      orderBy: [{ createdAt: "desc" }],
    });

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

    return Response.json(memes);
  } catch (error) {
    return Response.error();
  }
}
