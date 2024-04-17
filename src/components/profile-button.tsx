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
        <DropdownMenuItem>Get More</DropdownMenuItem>

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
  );
};

export default ProfileButton;
