import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MemeXplains - Get Actually Funny AI Memes",
  description:
    "Make actually good Memes using AI. Explain Situations, Events, Historical Figures or anything as memes using GPT-4 and Dalle3",
  metadataBase: new URL("https://memexplains.vercel.app"),
  twitter: {
    site: "@rajxryan",
    card: "summary_large_image",
    images: ["/api/og?text=Maybe%20Funny%20AI%20Memes%20👾"],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://memexplains.vercel.app",
    siteName: "MemeXplains",
    images: ["/api/og?text=Maybe%20Funny%20AI%20Memes%20👾"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex flex-col min-h-screen items-center justify-center pt-24 pb-12">
          {children}
        </main>
      </body>
    </html>
  );
}
