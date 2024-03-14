import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/style/globals.css";
import { site } from "@/config/site";
import { env } from "@/env";
import { SiteHeader } from "@/components/layout/site-header";
import { NetworkLock } from "@/components/auth/network-lock";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production" ? site.url : "http://localhost:3000"
  ),
  title: `${site.title} | %s`,
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.title,
  },
  twitter: {
    card: "summary_large_image",
    site: site.twitter,
    creator: site.twitter,
  },
  keywords: site.keywords,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SiteHeader />
        <main className="py-4">{children}</main>

        {/* 
        This is a network lock, by default it will show an error if the logged
        in user is not on the same network as their browser extension. i.e if
        you are logged in on a mainnent account and you extension is on a 
        testnet account.

        You can also use this component to force the user to be on a specific
        network by providing either mainnet or testnet as a prop. For example
        
        <NetworkWarning mainnet/> will display a warning if the user is 
        on testnet
        */}

        <NetworkLock />
      </body>
    </html>
  );
}
