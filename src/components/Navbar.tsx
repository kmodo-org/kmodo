"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { Button } from "src/components/ui/button";
import { signIn, useSession } from "next-auth/react";  


const routes: { title: string; href: string }[] = [
  { title: "EVENTS", href: "/events" },
  { title: "RESOURCES", href: "/resources" }
];

const Navbar: React.FC = () => {
  const { data: session } = useSession();  
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const signInWithGithub = () => {
    void signIn("github");
  };
  

  return (
    <div className="relative flex items-center justify-between h-32 w-full bg-gradient-to-t from-transparent to-black/70 lg:pr-14 md:pr-10 sm:pr-2 lg:pl-8 py-5">
      <div className="flex w-full justify-between m-6">
        <div className="flex justify-start items-center space-x-4">
          <Link href={"/"} className="shrink-0">
            <Image className="object-contain" src="/images/kmodoL.svg" alt="My Icon" width={150} height={150} />
          </Link>
        </div>

        <div className="justify-end justify-items-end sm:flex hidden">
          {routes.map((route, index) => (
            <Link
              key={index}
              href={route.href}
              className="hover:text-[#59BC89] transition text-white items-center inline-flex lg:px-5 md:px-3 sm:px-1.5 lg:text-base md:text-sm sm:text-xs"
            >
              {route.title}
            </Link>
          ))}
        </div>
      </div>

      <div className="hidden items-center gap-2 sm:flex cursor-pointer">
        {session?.user ? (
          <Link href="/hacker" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="text-[#59BC89] lg:text-base md:text-sm sm:text-xs transition w-full bg-white hover:bg-destructive-foreground hover:text-accent"
            >
              Dashboard
            </Button>
          </Link>
        ) : (
          <form action={signInWithGithub} className="w-full sm:w-auto">
            <Button
              size="lg"
              className="text-[#59BC89] transition w-full bg-white hover:bg-destructive-foreground hover:text-accent "
            >
              SIGN IN
            </Button>
          </form>
        )}
      </div>

      {menuOpen && <MobileMenu toggleMenu={toggleMenu} />}

      <button onClick={toggleMenu} className="sm:hidden bg-white mr-5 z-50">
        {menuOpen ? (
          <XMarkIcon className="h-7 w-7 fixed bg-white -translate-x-7 -translate-y-3.5 z-50" />
        ) : (
          <Bars3Icon className="h-7 w-7" />
        )}
      </button>
    </div>
  );
};

const MobileMenu: React.FC<{ toggleMenu: () => void }> = ({ toggleMenu }) => {
  return (
    <div className="fixed inset-0 flex flex-col z-40 bg-[#4264AC] h-fit">
      <div className="flex w-full grow flex-col gap-1 px-4 pb-2 py-12">
        {routes.map((route, index) => (
          <Link
            key={index}
            href={route.href}
            onClick={toggleMenu}
            className="hover:text-[#59BC89] text-white inline-flex h-10 w-full items-center text-sm transition-colors"
          >
            {route.title}
          </Link>
        ))}
        <Link href={"/login"} className="w-full">
          <Button
            onClick={toggleMenu}
            variant="secondary"
            size="sm"
            className="w-full"
          >
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
    </div>
  );
};

export { Navbar };
