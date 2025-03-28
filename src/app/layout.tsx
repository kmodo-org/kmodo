import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { SessionProvider } from "next-auth/react"; 

import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/ui/footer";

export const metadata: Metadata = {
  title: "kmodo",
  description: "Hackathons Done Different",
  icons: [{ rel: "icon", url: "/icon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <SessionProvider>
          <TRPCReactProvider>
            <div className="flex flex-col min-h-screen">
              <main className="flex flex-1 flex-col">{children}</main>
            </div>
          </TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
