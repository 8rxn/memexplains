"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { CreditsContext } from "./credits-provider";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { DialogHeader } from "./ui/dialog";

const ProfileButton = ({
  image,
  id,
}: {
  image: string;
  credits: string;
  id: string;
}) => {
  const { creditCount } = useContext(CreditsContext);

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="rounded-full" size="icon">
            <Avatar>
              <AvatarFallback>You</AvatarFallback>
              <AvatarImage src={image} alt="User" />
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="font-bold" disabled>
            {creditCount} Credits ✨
          </DropdownMenuItem>
          <DialogTrigger className="w-full">
            <DropdownMenuItem>Get More</DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuSeparator></DropdownMenuSeparator>
          <DropdownMenuItem>Dashboard</DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              signOut();
            }}
            className="text-destructive "
          >
            SignOut
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Need More Credits?</DialogTitle>
          <DialogDescription>
            You can get more credits by sharing the app with your friends.
            Alternatively, you can buy more credits.
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
            Share X
          </Button>
        </DialogClose>
      </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileButton;
