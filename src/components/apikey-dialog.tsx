import {
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Loader2, ArrowUpRight } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { DialogHeader } from "./ui/dialog";
import { Input } from "./ui/input";
import Link from "next/link";

type Props = { loading: boolean };

const ApiKeyDialog = ({ loading }: Props) => {
  const [apiKey, setApiKey] = useState("");
  return (
    <>
      <>
        <DialogTrigger id="prompt-submit" asChild>
          <Button
            className="absolute right-2 bottom-2 w-9 h-6 "
            type="submit"
            disabled={loading}
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
            <DialogTitle>You are not Signed in </DialogTitle>
            <DialogDescription>
              To use MemeXplains, please sign in or use your own API Key.
              <br />
              This will allow me to keep building apps like this
            </DialogDescription>
          </DialogHeader>
          <DialogHeader className="w-full flex flex-col items-center gap-4">
            <Link href="/auth/sigin">
              <Button type="button" variant="default">
                Sign In
              </Button>
            </Link>

            <p className="font-bold opacity-25 mx-auto w-fit">
              -------------OR-------------
            </p>
            <div className="grid grid-cols-6 gap-2 items-center">
              <Label htmlFor="apikey" className=" col-span-full">
                Your Open AI api key
              </Label>
              <Input
                id="apiKey"
                name="apiKey"
                placeholder="sk_live_...."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="col-span-4"
              ></Input>
              <DialogClose
                asChild
                className="col-span-2"
                disabled={apiKey.length < 1}
                onClick={() => {
                  if (apiKey.length > 0) {
                    localStorage.setItem("x-api-key", apiKey);
                  }
                }}
              >
                <Button type="button" variant="default">
                  Use API Key
                </Button>
              </DialogClose>
            </div>
          </DialogHeader>
        </DialogContent>
      </>
    </>
  );
};

export default ApiKeyDialog;
