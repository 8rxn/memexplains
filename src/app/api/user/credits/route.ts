import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const { id } = await request.json();

  try {
    const user = await prisma.user.findFirst({
      where: { id: id },
    });

    console.log(user?.credits);

    return Response.json({ credits: user?.credits });
  } catch (error) {
    return Response.error();
  }
}
