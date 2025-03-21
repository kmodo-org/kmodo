"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { Button } from "src/components/ui/button";

// 4 big booms 
const routes: { title: string; href: string }[] = [
    { title: "ABOUT US", href: "/aboutus" }, // boom
    { title: "EVENTS", href: "/events" }, // boom
    { title: "RESOURCES", href: "/resources" }, // boom
    { title: "DONATE", href: "/donate" }, // boom
]; 

  const Navbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
  
    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };
  
    return (   
      <div className="flex items-center justify-between h-32 w-full bg-gradient-to-t from-transparent to-black pr-14 pl-8 absolute">   
        <div className="flex w-full justify-between m-6">
          <div className="flex justify-start items-center space-x-4 ">   
          <Link href={"/"} className="shrink-0">
          <Image className="object-contain" src="/images/kmodoL.svg" alt="My Icon" width={150} height={150} />
          </Link>
          </div>
          <div className="flex justify-end justify-items-end">
            {routes.map((route, index) => (
              <Link
                key={index}
                href={route.href}
                className={"hover:text-[#59BC89] transition text-white items-center inline-flex px-5"} 
              >
                {route.title}
              </Link>
            ))}
          </div>
        </div>
  
        <div className="hidden items-center gap-2 sm:flex cursor-pointer">
          <Link href={"/api/auth/signin"} className="w-full sm:w-auto">
            <Button variant="secondary" size="sm" className="text-[#59BC89] transition w-full bg-white hover:bg-slate-300">
             SIGN IN
            </Button>
          </Link>
          <Link href="/api/auth/signin" className="w-full sm:w-auto">
            <Button variant="default" size="sm" className="transition w-full bg-[#4264AC] hover:bg-[#324f8c]">
              SIGN UP
            </Button>
          </Link>
        </div>
  
        {menuOpen && <MobileMenu toggleMenu={toggleMenu} />}
  
        <button onClick={toggleMenu} className="sm:hidden bg-white">
          {menuOpen ? (
            <XMarkIcon className="h-7 w-7" />
          ) : (
            <Bars3Icon className="h-7 w-7" />
          )}
        </button>
      </div>
    );
  };
  
  const MobileMenu: React.FC<{ toggleMenu: () => void }> = ({ toggleMenu }) => {
    return (
      <div className="absolute right-0 top-16 flex h-[calc(100vh-64px)] w-full flex-col">
        <div className="bg-background  flex w-full grow flex-col gap-1 px-4 pb-2 sm:hidden">
          {routes.map((route, index) => (
            <Link
              key={index}
              href={route.href}
              onClick={toggleMenu}
              className={`hover:text-accent-foreground text-muted-foreground inline-flex h-10 w-full items-center text-sm transition-colors sm:w-auto`}
            >
              {route.title}
            </Link>
          ))}
          <Link href={"/login"} className="w-full sm:w-auto">
            <Button
              onClick={toggleMenu}
              variant="secondary"
              size="sm"
              className="w-full"
            >
              Log In
            </Button>
          </Link>
          <Link href="/signup" className="w-full sm:w-auto">
            <Button
              onClick={toggleMenu}
              variant="default"
              size="sm"
              className="w-full"
            >
              Sign Up
            </Button>
          </Link>
        </div>
        <div className="bg-background/60 h-screen w-full sm:hidden" />
      </div>
    );
  };
  
  export { Navbar };