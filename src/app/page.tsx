import Footer from "@/components/footer";
import Hero from "@/components/hero";
import MemesContainer from "@/components/memes-container";

export default async function Home() {
  return (
    <main className="min-h-screen">
      <Hero></Hero>

      <MemesContainer></MemesContainer>
      <Footer></Footer>
    </main>
  );
}
