import React from "react";
import { Button } from "./ui/button";
import { GithubIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="px-4 mt-16">
      <div className="max-w-7xl mx-auto p-8   flex justify-between items-center min-h-40  border  border-neutral-200 dark:border-neutral-800 rounded-lg">
        <div>
          <h2 className="font-extrabold">Meme Explains</h2>
          <span className=" mt-8">
            <span className="mr-4 mb-2">Have Suggestions?</span>

            <Link href={"mailto:me@rajaryan.work"} target="_blank">
              <Button variant={"outline"}>Suggest Improvements</Button>
            </Link>
          </span>
        </div>
        <Link href="https://twitter.com/rajxryan" target="_blank">
          <span>
            <TwitterIcon className="w-6 h-6 inline-block" />
            {"/"}
          </span>
          <span className="font-bold text-lg">8rxn</span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
