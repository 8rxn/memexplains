import { ModeToggle } from "@/components/theme-toggle";
import { auth } from "@/auth";
import { SignIn } from "./sign-in-button";
import ProfileButton from "./profile-button";

type Props = {};

const NavRoutes = [{ title: "Create", path: "/create" }];

const Navbar = async (props: Props) => {
  const session = await auth();

  return (
    <nav className=" top-0 font-mono absolute w-full ">
      <div className="max-w-7xl mx-auto p-8 flex justify-between">
        <p>mexplains</p>
        <div className="flex gap-2">
          <ModeToggle></ModeToggle>
          <div>
            {session ? (
              <ProfileButton image={session.user?.image || ""} />
            ) : (
              <SignIn />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
