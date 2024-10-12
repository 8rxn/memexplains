"use client";
import { motion } from "framer-motion";
import { Highlight } from "@/components/hero-highlight";

import Image from "next/image";
import { BackgroundBeams } from "./background-beams";
import { Button } from "./ui/button";
import PromptInput from "./prompt-input";

const Hero = () => {
  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto mb-24"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl tracking-widest">
          MemeXplains
        </h1>
        <h2>
          <Highlight className="text-black dark:text-white">
            Actually Funny
          </Highlight>{" "}
          AI generated memes
        </h2>
        <p className="text-sm px-4 md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 mt-12 font-normal leading-loose">
          Explain{" "}
          <span className="group dark:bg-red-500/10 bg-red-500/30 p-2 rounded-lg hover:bg-red-500/50 dark:hover:bg-red-500/50 transition-colors ease-in cursor-pointer relative ">
            <span className="peer">Situations</span>
            <TooltipCard src="https://memes-cdn.rajaryan.work/uploads/24-RCB-fan-expecting-RCB-to-win.webp">
              RCB fan expecting RCB to win
            </TooltipCard>
          </span>
          ,{" "}
          <span className="dark:bg-yellow-500/10 bg-yellow-500/30 p-2 rounded-lg hover:bg-yellow-500/50 dark:hover:bg-yellow-500/50 transition-colors ease-in cursor-pointer group relative ">
            <span className="peer">Events</span>
            <TooltipCard src="https://memes-cdn.rajaryan.work/uploads/23-blockchain-developer-buying-the-dip.webp">
              Blockchain developer buying the dip
            </TooltipCard>
          </span>
          ,{" "}
          <span className="dark:bg-green-500/10 bg-green-500/30 p-2 rounded-lg hover:bg-green-500/50 dark:hover:bg-green-500/50 max-h-fit transition-colors ease-in cursor-pointer relative group">
            <span className="peer break-keep">Historical Figures</span>
            <TooltipCard src="https://memes-cdn.rajaryan.work/uploads/49-Albert-Einstein.webp">
              Albert Einstein
            </TooltipCard>
          </span>{" "}
          as memes using GPT-4 and Dalle3
        </p>
        <p className="font-mono text-xs mt-4">
          The generational server is currently facing issues. Checkout the
          previous results below with the prompt used
        </p>
        <PromptInput />
      </motion.div>

      <BackgroundBeams />
    </>
  );
};

export default Hero;

const TooltipCard = ({
  src,
  children,
}: {
  src: string;
  children: React.ReactNode;
}) => {
  return (
    <span className="bg-neutral-50 dark:bg-neutral-900 border z-20 translate-y-[-50%] dark:border-neutral-800 border-neutral-300  rounded-lg min-h-fit min-w-48 pb-2  peer-hover:scale-y-100 hover:scale-y-100  hover:translate-y-0 peer-hover:translate-y-0  scale-y-0 transition-transform ease-in-out  absolute top-[120%] sm:left-0 right-0 tooltip-container">
      <img alt="Meme" className="rounded-md" src={src}></img>
      <span className="text-xs mt-4 px-2 font-mono">{children}</span>
    </span>
  );
};
