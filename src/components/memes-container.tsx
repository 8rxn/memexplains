"use client";

import React, { useEffect, useState } from "react";
import MemeCard from "./meme";
import { Meme } from "../../types/meme";
import CardSkeleton from "./card-skeleton";
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
    <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 px-2">
      <div className="col-span-full px-6 my-2">
        <h2 className="font-semibold text-sm sm:text-xl lg:text-2xl ">
          Top AI Memes from the Community{" "}
        </h2>
      </div>

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
