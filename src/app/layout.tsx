import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";

// Components 
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
        <TRPCReactProvider> 
        <Navbar /> 
        {children}
        <Footer />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
