import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Navbar></Navbar>
      {children}
    </ThemeProvider>
  );
}
