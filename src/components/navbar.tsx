import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "./ui/button";
import Link from "next/link";

type Props = {};

const NavRoutes = [{ title: "Create", path: "/create" }];

const Navbar = (props: Props) => {
  return <nav className=" top-0 font-mono absolute w-full ">
    <div className="max-w-7xl mx-auto p-8 flex justify-between">
      <p>
        mexplains
      </p>

      <ModeToggle></ModeToggle>
    </div>
  </nav>;
};

export default Navbar;
