"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";

import { ArrowUpRight, Loader2 } from "lucide-react";

import { Input } from "./ui/input";
import { Button } from "./ui/button";

const PromptInput = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { status, data } = useSession();

  const [meme, setMeme] = useState<any>();

  const createMeme = async () => {
    if (!prompt) {
      return;
    }

    if (status !== "authenticated") {
      return;
    }
    //@ts-ignore
    if (!data.user?.apiKey) {
      return;
    }

    setLoading(true);
    setMeme(null);

    let options = {
      method: "POST",
      headers: {
        //@ts-ignore
        "x-api-key": data?.user.apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: prompt }),
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_GENERATION_ENDPOINT}`,
      options
    );

    if (res.status === 200) {
      setPrompt("");

      const genMeme = await res.json();
      setMeme(genMeme);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-12 bg-neutral-800 rounded-lg text-neutral-100 dark:bg-neutral-900 dark:text-neutral-100 ">
      <div className=" flex items-end  w-full relative">
        <Input
          placeholder="Imagine a Meme..."
          cols={1}
          className="px-4 bg-transparent py-2 focus:outline-none transition-colors ease-in disabled:cursor-not-allowed disabled:opacity-50"
          value={prompt}
          disabled={loading}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button
          className="absolute right-2 bottom-2 w-9 h-6 "
          type="submit"
          disabled={loading}
          onClick={createMeme}
        >
          {loading ? (
            <span>
              <Loader2 className="w-6 h-6 animate-spin"></Loader2>
            </span>
          ) : (
            <span className="text-neutral-100">
              <ArrowUpRight />
            </span>
          )}
        </Button>
      </div>
      {loading && (
        <div className="relative text-xs w-fit mx-auto lg:text-sm my-2 ">
          <p className="animate-[textAnimation_15s_infinite]">
            Cooking Your Meme 🍳
          </p>
          <p className="animate-[textAnimationDelay1_15s_infinite]">
            Creating AI Comedy 💻
          </p>
          <p className="animate-[textAnimationDelay2_15s_infinite]">
            All around the world 🪐
          </p>
        </div>
      )}
      {meme && (
        <div className="bg-neutral-50 dark:bg-neutral-900 border z-20 flex items-center mx-auto dark:border-neutral-800 border-neutral-300  rounded-lg w-fit my-2 text-gray-950 dark:text-gray-50">
          <img
            alt="Meme"
            className="rounded-md "
            width={256}
            src={meme?.image}
          ></img>
          <span className="text-xs mt-4 px-2 font-mono">{meme?.prompt}</span>
        </div>
      )}
    </div>
  );
};

export default PromptInput;
