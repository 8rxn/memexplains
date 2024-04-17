import { ModeToggle } from "@/components/theme-toggle";
import { auth } from "@/auth";
import { SignIn } from "./sign-in-button";
import ProfileButton from "./profile-button";
import Link from "next/link";

type Props = {};

const NavRoutes = [{ title: "Create", path: "/create" }];

const Navbar = async (props: Props) => {
  const session = await auth();

  return (
    <nav className=" top-0 font-mono absolute w-full ">
      <div className="max-w-7xl mx-auto p-8 flex justify-between">
        <Link href="/#">
          <p>mexplains</p>
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
              <SignIn>Join in</SignIn>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
