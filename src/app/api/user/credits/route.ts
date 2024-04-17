import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 10;


export async function POST(request: Request) {
  const { id } = await request.json();

  try {
    const user = await prisma.user.findFirst({
      where: { id: id },
    });


    return Response.json({ credits: user?.credits });
  } catch (error) {
    return Response.error();
  }
}
