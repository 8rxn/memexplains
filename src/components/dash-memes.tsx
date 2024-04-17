"use client";
import { useState, useEffect } from "react";
import MemeCard from "./meme";
import { useSession } from "next-auth/react";
import { Meme } from "../../types/meme";
import CardSkeleton from "./card-skeleton";

const DashMemes = () => {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  const fetchMemes = async () => {
    if (!session?.user?.id) {
      return;
    }
    const res = await fetch(`/api/user/memes?id=${session?.user.id}`);
    const data = await res.json();
    setMemes(data.memes);
    setLoading(false);
  };

  const upvote = async (data: { id: string; add: boolean }) => {
    if (!session) {
      return Promise.reject();
    }

    const res = await fetch(`/api/user/memes`, {
      method: "GET",
      body: JSON.stringify({ userId: session.user?.id, ...data }),
    });

    if (res.ok) {
      return Promise.resolve();
    }

    return Promise.reject();
  };

  useEffect(() => {
    fetchMemes();
  }, [session]);

  return (
    <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 px-2 max-w-7xl w-full mx-auto mt-6">
      <div className="col-span-full px-6 my-2 ">
        <h2 className="font-semibold text-sm sm:text-xl lg:text-2xl ">
          Your Memes
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
              upvotable={!meme?.upvoted?.includes(`${session?.user?.id}`)}
            ></MemeCard>
          </>
        ))}
    </div>
  );
};

export default DashMemes;
