import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";

import { Navbar } from "~/components/Navbar";
// Components 

export const metadata: Metadata = {
  title: "kmodo",
  description: "Hackathons Done Different",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider> 
        <Navbar /> {/* Navbar is included here */}
        {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
