import React from "react";

type Props = {};

const MemeCard = ({
  meme,
  upvote,
}: {
  meme: { id: string; image: string; prompt: string };
  upvote: (data: {
    id: string;
    add: boolean;
  }) => Promise<void>;
}) => {
  return (
    <div
      key={meme?.id}
      className="bg-neutral-800 dark:bg-neutral-900 rounded-lg p-4 m-4"
    >
      <img
        src={meme?.image}
        // alt={meme.title}
        className="rounded-lg w-96 h-fit mx-auto"
      />
      {meme?.prompt}

      {meme?.id}
      <button
        type="submit"
        onClick={() => {
          upvote({ add: true, id: meme?.id});
        }}
      >
        up
      </button>
    </div>
  );
};

export default MemeCard;
