import Footer from "@/components/footer";
import Hero from "@/components/hero";
import { SignIn } from "@/components/sign-in-button";
import "@/auth";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="min-h-screen">
      <Hero></Hero>

      <div>{session ? <SignIn /> : <SignIn />}</div>
      <Footer></Footer>
    </main>
  );
}
