import { signIn } from "@/auth";
import { Button } from "./ui/button";

export function SignIn({ children }: { children?: React.ReactNode }) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
      className="w-full"
    >
      <Button type="submit" variant={"outline"} className="w-full">
        {children}
      </Button>
    </form>
  );
}
