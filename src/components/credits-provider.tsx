"use client"

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
  const [creditCount, setCreditCount] = useState<number>(0);

  const { data: session } = useSession();

  const fetchCredits = async () => {
    const res = await fetch("/api/user/credits", {
      method: "POST",
      body: JSON.stringify({ id: session?.user?.id }),
    });

    const data = await res.json();

    setCreditCount(data.credits);
  };

  useEffect(() => {
    fetchCredits();
  }, []);

  return (
    <CreditsContext.Provider value={{ creditCount, setCreditCount }}>
      {children}
    </CreditsContext.Provider>
  );
};
