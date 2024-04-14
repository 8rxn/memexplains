import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        <Navbar></Navbar>
        {children}
      </SessionProvider>
    </ThemeProvider>
  );
}
