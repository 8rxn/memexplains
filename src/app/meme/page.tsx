import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import UpvoteButton from "@/components/upvote-button";
import { prisma } from "@/lib/db";
import { ResolvingMetadata, Metadata } from "next";
import Link from "next/link";
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
  const session = await auth();

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
      _count: {
        select: {
          Upvotes: true,
        },
      },
      Upvotes: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!meme) {
    return <div>Not found</div>;
  }

  return (
    <div className="bg-neutral-200 dark:bg-neutral-800 relative rounded-lg p-8 flex flex-col sm:flex-row justify-between gap-8 max-w-6xl mx-16 items-center">
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

      {session?.user?.id && (
        <UpvoteButton
          meme={{ upvotes: meme._count.Upvotes, id: meme.id.toString() }}
          upvotable={
            meme.Upvotes.find((upvote) => upvote.userId === session?.user?.id)
              ? false
              : true
          }
        />
      )}
      <div>
        <Link
          href={
            "https://twitter.com/intent/tweet?text=Loved%20this%20meme%20by%20memexplains%0A%0ACheckout%20https%3A%2F%2Fmemexplains.vercel.app%2Fmeme%3Fid%3D" +
            meme.id
          }
          target="_blank"
        >
          <Button className="absolute top-2 right-2" variant={"link"}>
            Share on {`𝕏`}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
