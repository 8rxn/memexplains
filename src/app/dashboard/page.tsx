import { auth } from "@/auth";
import Credits from "@/components/credits";
import DashMemes from "@/components/dash-memes";
import { Input } from "@/components/ui/input";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const Page = async (props: Props) => {
  const session = await auth();

  if (!session) {
    return redirect("/auth/signin");
  }

  const memeCount = await prisma.memes.count({
    where: { userId: session?.user?.id },
  });

  return (
    <>
      <div className="flex flex-col items-center sm:flex-row  sm:items-end gap-8 justify-between">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8  ">
          <div className=" my-2">
            <h1 className="text-4xl font-bold">
              Welcome, {session?.user?.name}
            </h1>
          </div>
          <div className="dark:bg-neutral-800 bg-neutral-300 p-4 rounded-lg border border-neutral-900">
            <p className="text-lg">You are a great meme explainer!</p>
            <p className="text-lg">
              You have created <span className="text-primary">{memeCount}</span>{" "}
              memes here.
            </p>
          </div>
          <div className="dark:bg-neutral-800 bg-neutral-300 border-neutral-900 border flex flex-col justify-between p-4 rounded-lg">
            <h2 className="text-3xl font-semibold p-3 rounded-lg ">
              Your API key
            </h2>
            <Input
              disabled
              className="w-[340px] transparent disabled:text-neutral-950 disabled:dark:text-neutral-50"
              // @ts-ignore2
              value={session?.user?.apiKey}
            ></Input>
          </div>
          <div>
            <Credits></Credits>
          </div>
        </div>
      </div>
      <div>
        <DashMemes></DashMemes>
      </div>
    </>
  );
};

export default Page;
