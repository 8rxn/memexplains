import { CreditsProvider } from "@/components/credits-provider";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <CreditsProvider>
          <Navbar></Navbar>
          {children}
        </CreditsProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
