import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MemeXplains - Get Actually Funny AI Memes",
  description: "Your AI Meme Maker",
  metadataBase: new URL("https://memexplains.vercel.app"),
  twitter: {
    site: "@rajxryan",
    card: "summary_large_image",
    images: ["/api/og?text=Get%20Actually%20Funny%20AI%20Memes"],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://memexplains.vercel.app",
    siteName: "MemeXplains",
    images: ["/api/og?text=Get%20Actually%20Funny%20AI%20Memes"],
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
