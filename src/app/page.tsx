import { ModeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-64 p-24 font-mono bg-gradient-to-r from-blue-700/10 to-red-600/10">
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-7xl">Hello Next.js Template!</h1>
        <h2 className="text-3xl mt-6">
          Includes - Tailwind CSS, Shadcn, Typescript, Next-themes, Theme Toggle 
        </h2>
      </div>
      <ModeToggle></ModeToggle>
    </main>
  );
}
