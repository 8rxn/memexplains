import { prisma } from "@/lib/db";
import { ResolvingMetadata, Metadata } from "next";
import React from "react";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = searchParams.id;

  // fetch data
  const meme = await prisma.memes
    .findUnique({ where: { id: Number(id) } })
    .then((meme) => meme);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${meme?.prompt} | AI Memes - Meme Explains`,
    openGraph: {
      images: [
        `/api/og?img=${meme?.image}&text=${meme?.prompt}`,
        ...previousImages,
      ],
    },
  };
}

const Page = async (props: Props) => {
  const id = props.searchParams.id;

  const meme = await prisma.memes.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!meme) {
    return <div>Not found</div>;
  }

  return (
    <div className="bg-neutral-200 dark:bg-neutral-800 rounded-lg p-8 flex flex-col sm:flex-row justify-between gap-8 max-w-6xl mx-16 items-center">
      <img
        src={meme.image}
        width={300}
        height={300}
        className="rounded-sm"
        alt={meme.prompt}
      />
      <div>
        <h2 className="font-bold text-xl">#{meme.id}</h2>
        <h1 className="font-semibold text-lg">{meme.prompt}</h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          By {meme.user.name}
        </p>
      </div>
    </div>
  );
};

export default Page;
