import React from "react";
import { Skeleton } from "./ui/skeleton";

const CardSkeleton = () => {
  return (
    <div className="rounded-lg p-4 m-4 flex flex-col justify-between gap-2">
      <Skeleton className="w-88 h-[280px] " />
      <Skeleton className="w-80 h-[40px] " />
      <Skeleton className="w-72 h-[40px] " />
    </div>
  );
};

export default CardSkeleton;
