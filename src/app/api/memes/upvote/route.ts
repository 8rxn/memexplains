import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  console.log("entry");

  const { id, userId, add } = await request.json();

  console.log("entry2");

  console.log({ id, userId, add });

  const memeOriginal = await prisma.memes.findFirst({
    where: { id: id },
    include: { Upvotes: { select: { userId } } },
  });

  let meme;
  try {
    if (add) {
      if (memeOriginal?.Upvotes.includes(userId)) {
        return Response.json({ error: "Can't upvote, already added" });
      }
      meme = await prisma.upvotes.create({
        data: {
          memeId: id,
          userId: userId,
        },
      });
    } else {
      if (!memeOriginal?.Upvotes.includes(userId)) {
        return Response.json({ error: "Can't remove, not voted yet" });
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
