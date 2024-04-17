"use client";

import { ArrowUpCircle } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";

type Props = {
  meme: { upvotes: number; id: string };
  upvotable: boolean;
};

const UpvoteButton = ({ meme, upvotable }: Props) => {
  const { data: session } = useSession();
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
  const [canUpvote, setCanUpvote] = React.useState(upvotable);
  const [upvoteCount, setUpvoteCount] = React.useState(meme?.upvotes);
  return (
    <Button
      variant="ghost"
      onClick={() => {
        setUpvoteCount(canUpvote ? upvoteCount + 1 : upvoteCount - 1);
        setCanUpvote((prev) => !prev);

        upvote({ add: canUpvote, id: meme?.id }).catch(() => {
          setUpvoteCount(canUpvote ? upvoteCount - 1 : upvoteCount + 1);
          setCanUpvote((prev) => !prev);
        });
      }}
      size={"sm"}
      className={`self-end ${
        canUpvote
          ? "text-primary-foreground "
          : "text-primary hover:text-primary "
      } `}
    >
      <ArrowUpCircle className={`w-3 h-3 `} />
      <span className="text-sm pl-2">{upvoteCount}</span>
    </Button>
  );
};

export default UpvoteButton;
