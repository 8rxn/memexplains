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
import { useEffect, useState } from "react";

const ProfileButton = ({
  image,
  credits,
  id,
}: {
  image: string;
  credits: string;
  id: string;
}) => {
  const [creditCount, setCreditCount] = useState(credits);

  const fetchCredits = async () => {
    const res = await fetch("/api/user/credits", {
      method: "POST",
      body: JSON.stringify({ id: id }),
    });

    const data = await res.json();

    setCreditCount(data.credits);
  };

  useEffect(() => {
    fetchCredits();
  }, []);

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
          {credits} Credits ✨
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
