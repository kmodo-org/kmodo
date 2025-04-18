"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { Button } from "src/components/ui/button";
import { signIn, useSession } from "next-auth/react";

const routes: { title: string; href: string }[] = [
  { title: "EVENTS",    href: "/events" },
  { title: "RESOURCES", href: "/resources" },
  { title: "SPONSORS",  href: "/sponsors" },  
];

const Navbar: React.FC = () => {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const signInWithGithub = () => void signIn("github");

  return (
    <div className="relative flex items-center justify-between h-32 w-full bg-gradient-to-t from-transparent to-black/70 lg:pr-14 md:pr-10 sm:pr-2 lg:pl-8 py-5">
      <div className="flex w-full justify-between m-6">
        <Link href="/" className="shrink-0">
          <Image
            src="/images/kmodoL.svg"
            alt="Kmodo logo"
            width={150}
            height={150}
            className="object-contain"
          />
        </Link>

        <nav className="hidden sm:flex">
          {routes.map(({ title, href }) => (
            <Link
              key={href}
              href={href}
              className="hover:text-[#59BC89] transition text-white inline-flex items-center lg:px-5 md:px-3 sm:px-1.5 lg:text-base md:text-sm sm:text-xs"
            >
              {title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="hidden sm:flex items-center gap-2">
        {session?.user ? (
          <Link href="/hacker">
            <Button
              size="lg"
              className="w-full bg-white text-[#59BC89] hover:bg-destructive-foreground hover:text-accent"
            >
              Dashboard
            </Button>
          </Link>
        ) : (
          <form action={signInWithGithub}>
            <Button
              size="lg"
              className="w-full bg-white text-[#59BC89] hover:bg-destructive-foreground hover:text-accent"
            >
              SIGN IN
            </Button>
          </form>
        )}
      </div>

      {menuOpen && <MobileMenu toggleMenu={toggleMenu} />}
      <button onClick={toggleMenu} className="sm:hidden bg-white mr-5 z-50">
        {menuOpen ? (
          <XMarkIcon className="h-7 w-7 fixed -translate-x-7 -translate-y-3.5" />
        ) : (
          <Bars3Icon className="h-7 w-7" />
        )}
      </button>
    </div>
  );
};

const MobileMenu: React.FC<{ toggleMenu: () => void }> = ({ toggleMenu }) => (
  <div className="fixed inset-0 z-40 bg-[#4264AC] flex flex-col px-4 py-12 gap-1">
    {routes.map(({ title, href }) => (
      <Link
        key={href}
        href={href}
        onClick={toggleMenu}
        className="text-white text-sm h-10 flex items-center w-full hover:text-[#59BC89] transition-colors"
      >
        {title}
      </Link>
    ))}

    <Link href="/login" className="w-full">
      <Button onClick={toggleMenu} variant="secondary" size="sm" className="w-full">
        Log In
      </Button>
    </Link>
    <Link href="/signup" className="w-full">
      <Button
        onClick={toggleMenu}
        variant="default"
        size="sm"
        className="w-full bg-[#59BC89] hover:bg-[#59BC89]"
      >
        Sign Up
      </Button>
    </Link>
  </div>
);

export { Navbar };
