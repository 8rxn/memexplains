"use client";

import { useContext, useState } from "react";
import { CreditsContext } from "./credits-provider";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { createCheckoutSession } from "@/actions/stripe";

type Props = {};

const Credits = (props: Props) => {
  const { creditCount } = useContext(CreditsContext);
  const [amount, setAmount] = useState(2);

  const formAction = async (data: FormData): Promise<void> => {
    console.log("went");
    const { url } = await createCheckoutSession({
      amount: amount.toString(),
    });

    window.location.assign(url as string);
  };
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold">Credits: {creditCount}</h1>
      Buy more credits to create more memes!
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"default"}>Buy Credits</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Get More</DialogTitle>
            <DialogDescription>
              Purchase More Credits = More AI memes
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="w-full">
            <div className="grid grid-cols-4 items-center gap-4 w-full">
              <Label htmlFor="amount" className="text-right font-bold ">
                Amount
              </Label>
              <Input
                id="amount"
                min={1}
                max={3}
                name="amount"
                type="number"
                step={0.5}
                value={amount}
                onChange={(e) => {
                  setAmount(Number(e?.target?.value));
                }}
                className="col-span-3"
              />
            </div>
            <Button variant={"outline"} disabled>
              USD
            </Button>
          </DialogFooter>
          <DialogFooter className="w-full">
            <div className="grid grid-cols-5 items-center gap-4 w-full">
              <Label
                htmlFor="amount"
                className="text-right font-bold text-opacity-80 "
              >
                Credits
              </Label>
              <Input
                id="amount"
                disabled
                value={`${Number(amount * 2)}`}
                className="col-span-4"
              />
            </div>
          </DialogFooter>

          {/* <DialogClose  asChild className=""> */}
          <form action={formAction}>
            <Button type="submit" variant={"secondary"} className="">
              Checkout
            </Button>
          </form>

          {/* </DialogClose> */}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Credits;
