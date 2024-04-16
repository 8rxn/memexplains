import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  console.log("entry");

  const { id, userId, add } = await request.json();

  console.log("entry2");

  console.log({ id, userId, add });

  const memeOriginal = await prisma.memes.findFirst({
    where: { id: id },
    include: { Upvotes: { select: { userId: true } } },
  });

  let meme;
  try {
    if (add) {
      if (memeOriginal?.Upvotes.find((upvote) => upvote.userId === userId)) {
        return Response.json({ error: "Already upvoted" }, { status: 400 });
      }
      meme = await prisma.upvotes.create({
        data: {
          memeId: id,
          userId: userId,
        },
      });
    } else {
      if (!memeOriginal?.Upvotes.find((upvote) => upvote.userId === userId)) {
        return Response.json({ error: "Not upvoted" }, { status: 400 });
      }
      meme = await prisma.upvotes.deleteMany({
        where: {
          AND: [{ memeId: id }, { userId: userId }],
        },
      });
    }

    console.log(meme);

    if (!meme) {
      console.log("Meme Not Found");
      throw new Error("Meme not found");
    }

    const upvotes = await prisma.upvotes.count({ where: { memeId: id } });

    return Response.json({ upvotes: upvotes });
  } catch (error) {
    return Response.error();
  }
}
