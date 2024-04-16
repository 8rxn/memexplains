import React, { useState } from "react";
import { Button } from "./ui/button";
import { ArrowUpCircle } from "lucide-react";
import { Meme } from "../../types/meme";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";

type Props = {};

const MemeCard = ({
  meme,
  upvote,
  upvotable,
}: {
  meme: Meme;
  upvote: (data: { id: string; add: boolean }) => Promise<void>;
  upvotable: boolean;
}) => {
  const [prompt, setPrompt] = useState(meme?.prompt);
  const [canUpvote, setCanUpvote] = useState(upvotable);
  const [upvoteCount, setUpvoteCount] = useState(meme?.upvotes);
  // const [image, setImage] = useState(meme.image);
  return (
    <div
      key={meme?.id}
      className="bg-neutral-800 dark:bg-neutral-900 rounded-lg p-4 m-4 relative  max-h-fit flex flex-col items-start  text-gray-50 justify-between"
    >
      <div className="flex flex-col gap-2 w-full">
        <Image
          src={meme?.image}
          alt={meme.prompt + "image"}
          width={360}
          height={360}
          placeholder="blur"
          blurDataURL="data:image/webp;base64,UklGRsYFAABXRUJQVlA4ILoFAAAwHQCdASpkAGQAPpFAm0olo6KtqTW6SbASCWoAy5xRTN/T+cDZf89+DOj8QP21T2fMA8aT1ueYjzefSb6Bn9i/sfWefsB7AHlyey1+4f7btSS8YZoVkq2kNF7x39mTLrr3XXQfu9YyBfyqPvjFzpZeZNqCmBOBCLyYwFpR2uOrDv+D+A9w95pWbL37hzoIcS34M4XylEKbMYN6k6tBzyjg4BeFPTeM44lNiCVkhBlbmr1pvMNorJY8e/l1UzeEkQwfv6X9w7pGhHCIfZz/9FIntTRPgW8QqhpYBprgYonXU+YTAEwKk2onVLZLVTZt3OFrgAD+8pxdTf/zr3f8m9PvFIj71eAqAMawxn+w/cFQaRXuNjSfuJKwHZ6lCGGmh9IrJUrkdnKHdfk6neVD/F7NfoEP1+p2KgIPD/g3/FrRXzmCJMm+/JAu8tXJ0vHP+v/UznbbssIESAilYRxlV97U7YNKsVbIHLj23BL1UtfCHVrQMZEKaxqT9wZ2ZPZlDA+B6Z3JQ/2Ro9sl62s55ZnuRGLv29FSazS0PYHL8l1F9fIDBADMs/02bFljQDpGIN300z07kDCzBC2wD0fCXmYsBwsKexevJ5ljZnCkLNqq2NSd1xu6RPThS32cExN+BQy/VtQAeIicGIFQOUXQ/nvKntAke7/k2hfXovONtPvLuzFKOX/Bi/f/BjvYJa1G1GXacejqlvYt/yqWaqoG5+zS+7tR+P8npbf9T+xOj8Wf4xzlqJPDurVk/HpmYzYX0kdFVaxzC84WCtxGXo6fmkgTwyJvLhhO6My1ux6ZMbU5CauFKBscEeLiobu68HG+Ybym2EGi+YowKXc2xItX1Gu29OlmSNKYpzolc14jfjJnU27Evs48hRuK7Dq6VD0xF1lJu4pUINh0F5qJWHTlQoSrBpXMHwfD8pNn9RszzSKIb240CzxPQW5Gw1tO+SA9PY4XiRb/bgRdNa31ixncwsW04kiiH3AKxFmqWzK1YMHxnSmp+WpCx2ukA49ULp6ytB8TxPdmr19iMXujMGyxKCdSSKWhhCzX3ctJmpKXrXmNeitnicaLmxC5w/vFwBXEYz/9zOSVxk1505t5Z/lQcc4kiCakf0ouVKpCKyzLz7dF9rhXinbz1icw+Gtl3fVNKllr6Uvxf/mthvhJjkITzBzdhHdhYZ9OUQpXlx0qtsEtAMP18kbMBalnrYVIwrHoXNX9boIJCAC9Awcea5TFFGwRvSnrtHA3Jl1Z9fOpu3vWcAZ29C3Hv/6wqDnVNY//E/Gou0rLC5q6udHL5FI44MIFKyuMFtQsZPb2y/Eg0iH0MM2XKQVy1MXJcDDFKE/pFbnOCnisJTHCPirYtJr53dK8F6/6zJ2Oakuc/WcCh66+B8GH3ISQLrTFMLVGHrqrhbO3t4ZAuuCzMB8pNXeu9yy4SzKNcplMy+RAnnUGgkKDXgKZ7VfRlhwSSwnRtlA6aN3d/Ju8m2OdGbrmRcG3qyutr9ouYKd0k7Y7X4n7yyj89LGQwoDz0QlT1HdAt4I2If/xbQJ1zvdB2d0AeaNBdXKWANtvAlkMyzjv9Z94X83v8nGsdj0RFJFpjq1U+WgfzfFXGdFmd4DkQoa/bXPBjQfyDcHjAkvVAr5Nv63m0z8bkAQrvQHMokt9wHt0VpKoSMBcj1NmB2AHrJ3FcZEfj/R1pyBl10l6TsHi9G6YfxBYBrP8BN65hMrsci+FbMIDiSZBHI8sbDaXQeQBTOh6qqGpv4f/P3WdzZkldbhFxvTn+8JuYKvdjXp6nLoBF1kxPvd0szxqw05ilo+u3Np42yT9/wJfnGk9DO3ecPSnSEfczIomRyq0T9Y/j9Isa0ooMZ/9MiZjm1MFNw7diZ+HAzZpExyv92ups7qePxxCK3UnzSnhAutqsjs1rqY73Fs2w1D6cb2Lawt8qNmZ7RyOrcC/xxtnvwjqcMAAAA=="
          className={`rounded-lg mx-auto object-contain grid place-items-center `}
        />
        
        {/* <Skeleton className={"w-[360px] h-[360px]"} /> */}

        <h3
          className="bg-neutral-700 dark:bg-neutral-800 w-full p-2 rounded-lg hover:opacity-80 hover:cursor-pointer capitalize"
          onClick={() => {
            navigator.clipboard.writeText(meme.prompt);
            setPrompt("Copied to clipboard!");
            setTimeout(() => {
              setPrompt(meme?.prompt);
            }, 1000);
          }}
        >
          {prompt}
        </h3>
      </div>
      <div className="flex justify-between w-full mt-4">
        <Avatar>
          <AvatarImage src={meme.userImage} className=""></AvatarImage>
          <AvatarFallback>m</AvatarFallback>
        </Avatar>
        <Button
          variant="ghost"
          onClick={() => {
            setUpvoteCount(canUpvote ? upvoteCount + 1 : upvoteCount - 1);
            setCanUpvote((prev) => !prev);

            upvote({ add: canUpvote, id: meme?.id }).catch(() => {
              setUpvoteCount(canUpvote ? upvoteCount - 1 : upvoteCount + 1);
              setCanUpvote((prev) => !prev);
            });
          }}
          size={"sm"}
          className={`self-end ${
            canUpvote
              ? "text-primary-foreground "
              : "text-primary hover:text-primary "
          } `}
        >
          <ArrowUpCircle className={`w-3 h-3 `} />
          <span className="text-sm pl-2">{upvoteCount}</span>
        </Button>
      </div>
    </div>
  );
};

export default MemeCard;
