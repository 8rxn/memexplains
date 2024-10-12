"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import MemeCard from "./meme";
import { Meme } from "../../types/meme";
import CardSkeleton from "./card-skeleton";
import { useSession } from "next-auth/react";

type Props = {};

const MemesContainer = (props: Props) => {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [loading, setLoading] = useState(true);
  const [next, setNext] = useState(0);
  const { data: session } = useSession();

  const ref = useRef(null);

  const fetchMemes = async ({ next = 0 }: { next?: number }) => {
    setLoading(true);
    const res = await fetch("/api/memes?next=" + next);

    const fetchedMemes = await res.json();

    if (memes.length < 1) {
      setMemes(fetchedMemes.memes);
    } else {
      setMemes([...memes, ...fetchedMemes.memes]);
    }
    setLoading(false);
    if (!fetchedMemes.more) {
      setNext(-1);
    }
    console.log({ memes });
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

  const debounce = (func: () => void, delay: number) => {
    let inDebounce: NodeJS.Timeout;
    return function () {
      //@ts-ignore
      const context = this;
      const args = arguments;
      clearTimeout(inDebounce);
      //@ts-ignore
      inDebounce = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const handleScroll = debounce(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      !loading
    ) {
      if (next < 0) {
        return;
      }
      setNext((prev) => prev + 1);
    }
  }, 100);

  useEffect(() => {
    fetchMemes({});
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll, loading]);

  useEffect(() => {
    if (next > 0) {
      fetchMemes({ next: next });
    }
  }, [next]);

  return (
    <div
      ref={ref}
      className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 px-2"
      id="memes"
    >
      <div className="col-span-full px-6 my-2">
        <h2 className="font-semibold text-sm sm:text-xl lg:text-2xl " >
          Top AI Memes from the Community{" "}
        </h2>
      </div>

      {memes &&
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
    </div>
  );
};

export default MemesContainer;
