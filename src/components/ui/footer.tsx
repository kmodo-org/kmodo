"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { Button } from "src/components/ui/button";

const socials: { title: string; href: string }[] = [
    { title: "linkedin", href: "/images/linkedin.png" }, 
    { title: "x", href: "/images/twitter.png" }, 
    { title: "instagram", href: "/images/instagram.png" },
    { title: "github", href: "/images/github.png" },
]; 

const Footer: React.FC = () => {
    return (
        <div className="relative justify-center items-center justify-items-center w-full">
            <div className="w-11/12 h-fit p-[0.25] bg-[#59BC89]"></div>
            

            <div className="flex flex-row justify-between">
                <div className="flex flex-col py-10 px-5 lg:px-10">
                    <Image className="object-contain" src="/images/kmodoL.svg" alt="My Icon" width={150} height={150} />
                    <div className="text-white text-sm  font-extralight font-['Open Sans']">Hacking Done Differently.</div>

                </div>

                <div className="h-44 p-[0.25] bg-[#59BC89]"></div>
                <div className="flex flex-col py-14 px-5  lg:px-10">
                    <div className="text-white font-bold text-sm">ABOUT KMODO</div>
                    <Link href={"/aboutus"} className="w-full font-extralight  sm:w-auto text-white text-sm font-['Open Sans']">about</Link>
                    <Link href={"/"} className="w-full sm:w-auto font-extralight  text-white text-sm font-['Open Sans']">contact us</Link>
                    <Link href={"/"} className="w-full sm:w-auto font-extralight  text-white text-sm font-['Open Sans']">who are we</Link>
                    
                </div>

                <div className="flex flex-col py-14 px-5  lg:px-10">
                    <div className="text-white font-bold text-sm font-['Open Sans']">LEGAL</div>
                    <Link href={"/"} className="w-full sm:w-auto font-extralight  text-white text-sm font-['Open Sans']">terms of service</Link>
                    <Link href={"/"} className="w-full sm:w-auto font-extralight  text-white text-sm font-['Open Sans']">privacy</Link>
                    
                </div>

                <div className="flex flex-col py-14 px-5  md:px-10 font-['Open Sans'] text-white text-sm font-bold">SOCIAL
                    {socials.map((social, key)=> {
                        return(
                            <Image key={key} className="w-5 h-auto m-1" src={social.href} alt={social.title} width={1000} height={1000} />

                        );

                    })}
                </div>

                <div className="flex flex-col py-14 px-5  lg:px-10">
                    <div className="text-white font-bold text-sm font-['Open Sans'] ">RESOURCES</div>
                    <Link href={"/resources"} className="w-full sm:w-auto font-['Open Sans'] text-white text-sm font-extralight ">resource finder</Link>
                    
                </div>

               

            </div>

        </div>

    );

}

export { Footer };
