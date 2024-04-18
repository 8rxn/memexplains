"use client";

import React, { createContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export const CreditsContext = createContext<{
  creditCount: number;
  setCreditCount: any;
}>({
  creditCount: 0,
  setCreditCount: () => {},
});
export const CreditsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [creditCount, setCreditCount] = useState<number>(-1);

  const { data: session } = useSession();

  if (!session) {
    () => {
      setCreditCount(-1);
    };
  }

  const fetchCredits = async () => {
    try {
      console.log({ session });

      const res = await fetch("/api/user/credits", {
        method: "POST",
        body: JSON.stringify({ id: session?.user?.id }),
      });

      const data = await res.json();
      setCreditCount(data.credits);
    } catch (error) {
      setCreditCount(-1);
    }
  };

  useEffect(() => {
    fetchCredits();
  }, [session]);

  useEffect(() => {
    console.log(creditCount);
  }, [creditCount]);

  return (
    <CreditsContext.Provider value={{ creditCount, setCreditCount }}>
      {children}
    </CreditsContext.Provider>
  );
};
