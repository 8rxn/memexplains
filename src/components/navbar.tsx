import { ModeToggle } from "@/components/theme-toggle";
import { auth } from "@/auth";
import { SignIn } from "./sign-in-button";
import ProfileButton from "./profile-button";
import Link from "next/link";
import { Button } from "./ui/button";

type Props = {};

const Navbar = async (props: Props) => {
  const session = await auth();

  return (
    <nav className=" top-0 font-mono absolute w-full ">
      <div className="max-w-7xl mx-auto p-8 flex justify-between">
        <Link href="/#">
          <p>MemeXplains</p>
        </Link>
        <div className="flex gap-2">
          <ModeToggle></ModeToggle>
          <div>
            {session ? (
              <ProfileButton
                //@ts-ignore
                credits={session.user?.credits || ""}
                image={session.user?.image || ""}
                id={session.user?.id || ""}
              />
            ) : (
              <Link href={"/auth/signin"}>
                <Button variant="outline" >
                  Sign in
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
