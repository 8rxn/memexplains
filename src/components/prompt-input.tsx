"use client";

import React, { useContext, useState } from "react";
import { useSession } from "next-auth/react";

import { ArrowUpRight, Loader2 } from "lucide-react";

import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { CreditsContext } from "./credits-provider";
import ApiKeyDialog from "./apikey-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

const PromptInput = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { creditCount, setCreditCount } = useContext(CreditsContext);

  console.log(creditCount);
  const { status, data } = useSession();
  const [meme, setMeme] = useState<any>();

  const createMeme = async () => {
    console.log({ creditCount });

    if (!prompt) {
      return;
    }

    if (creditCount == 0 && status !== "authenticated") {
      return;
    }
    
    let key = "";

    if (status !== "authenticated") {
      key = `${localStorage.getItem("x-api-key")}`;
    } else {
      //@ts-ignore
      key = data.user?.apiKey;
    }
    //@ts-ignore
    if (!key) {
      return;
    }

    setLoading(true);
    setMeme(null);

    let options = {
      method: "POST",
      headers: {
        //@ts-ignore
        "x-api-key": key,
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
      setCreditCount((prev: number) => prev - 1);
      const genMeme = await res.json();
      setMeme(genMeme);
    }

    setLoading(false);
  };

  return (
    <div
      className={`max-w-xl mx-auto mt-12 bg-neutral-800 rounded-lg text-neutral-100 dark:bg-neutral-900 dark:text-neutral-100 ${
        meme && "pb-1"
      } `}
    >
      <Dialog>
        <div className=" flex items-end  w-full relative">
          <Textarea
            placeholder="Imagine a Meme..."
            cols={1}
            className="px-4 bg-transparent py-2 focus:outline-none transition-colors ease-in disabled:cursor-not-allowed disabled:opacity-50"
            value={prompt}
            disabled={true}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const btn = document.querySelector("#prompt-submit");
                //@ts-ignore
                btn.click();
              }
            }}
            onChange={(e) => setPrompt(e.target.value)}
          />

          {creditCount == 0 && (
            <>
              <DialogTrigger id="prompt-submit" asChild disabled>
                <Button
                  className="absolute right-2 bottom-2 w-9 h-6 "
                  type="submit"
                  disabled={true}
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
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>You are Out of Credits! </DialogTitle>
                  <DialogDescription>
                    To continue using MemeXplains, purchase more credits.
                    <br />
                    This will allow me to keep building apps like this
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-between flex w-full">
                  <DialogClose asChild>
                    <Button type="button" variant="default">
                      Purchase Credits
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Share
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </>
          )}
          {creditCount == -1 && status !== "authenticated" && (
            <>
              <ApiKeyDialog loading={loading}></ApiKeyDialog>
            </>
          )}

          {(creditCount >= 1 ||
            localStorage.getItem("x-api-key"))  && (
            <Button
              id="prompt-submit"
              className="absolute right-2 bottom-2 w-9 h-6 "
              type="submit"
              disabled={true}
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
          )}
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
          <div className="bg-neutral-50 dark:bg-neutral-900 border z-20 flex flex-col sm:flex-row items-center mx-auto dark:border-neutral-800 border-neutral-300  rounded-lg w-fit my-2 text-gray-950 dark:text-gray-50 p-2 mb-2">
            <img
              alt="Meme"
              className="rounded-md "
              width={300}
              height={300}
              src={meme?.image}
            ></img>
            <span className="text-xs mt-4 px-2 font-mono">
              {meme?.prompt || "Your Awesome Meme Prompt"}
              <br />
              <Link
                href={
                  "https://twitter.com/intent/tweet?text=Loved%20this%20meme%20by%20memexplains%0A%0ACheckout%0Ahttps%3A%2F%2Fmemexplains.vercel.app%2Fmeme%3Fid%3D" +
                  meme.id +
                  "%0A"
                }
                className="self-end"
                target="_blank"
              >
                <Button className="" variant={"ghost"}>
                  Share on {`𝕏`}
                </Button>
              </Link>
            </span>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default PromptInput;
