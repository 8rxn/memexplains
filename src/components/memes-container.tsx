"use client";

import React, { useEffect, useState } from "react";
import MemeCard from "./meme";
import { Meme } from "../../types/meme";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";

type Props = {};

const MemesContainer = (props: Props) => {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  const fetchMemes = async () => {
    setLoading(true);
    const res = await fetch("/api/memes");

    const fetchedMemes = await res.json();

    setMemes(fetchedMemes);
    setLoading(false);
  };

  const upvote = async (data: { id: string; add: boolean }) => {
    if (!session) {
      return Promise.reject();
    }

    const res = await fetch("/api/memes/upvote", {
      method: "POST",
      body: JSON.stringify({ userId: session.user?.id, ...data }),
    });

    if (res.ok) {
      return Promise.resolve();
    }

    return Promise.reject();
  };

  useEffect(() => {
    fetchMemes();
  }, []);

  return (
    <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {loading && (
        <>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </>
      )}
      {!loading &&
        memes.map((meme: Meme) => (
          <>
            
            <MemeCard
              upvote={upvote}
              key={meme.id}
              meme={meme}
              upvotable={!meme.upvoted.includes(`${session?.user?.id}`)}
            ></MemeCard>
          </>
        ))}
    </div>
  );
};

export default MemesContainer;

const CardSkeleton = () => {
  return (
    <div className="rounded-lg p-4 m-4 flex flex-col justify-between gap-2">
      <Skeleton className="w-88 h-[280px] " />
      <Skeleton className="w-80 h-[40px] " />
      <Skeleton className="w-72 h-[40px] " />
    </div>
  );
};
