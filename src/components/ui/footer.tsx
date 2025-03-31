"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Github, Instagram, Linkedin, Twitter } from 'lucide-react';

const socials: { title: string; href: string; icon: React.ReactNode }[] = [
    { title: "linkedin", href: "https://www.linkedin.com/company/kmodo/", icon: <Linkedin className="w-5 h-5 text-white" /> },
    { title: "x", href: "https://x.com/hack_kmodo", icon: <Twitter className="w-5 h-5 text-white" /> },
    { title: "instagram", href: "https://www.instagram.com/hack.kmodo/", icon: <Instagram className="w-5 h-5 text-white" /> },
    { title: "github", href: "https://github.com/kmodo-org", icon: <Github className="w-5 h-5 text-white" /> },
]; 

const Footer: React.FC = () => {
    return (
        <div className="relative justify-center items-center justify-items-center w-full">
            <div className="w-full h-fit p-[0.25] bg-[#59BC89]"></div>
            <div className="flex flex-row justify-between">
                <div className="flex flex-col py-6 px-5 lg:px-10">
                    <Link href="/">
                        <Image className="object-contain" src="/images/kmodoL.svg" alt="My Icon" width={150} height={150} />
                    </Link>
                    <div className="text-white text-sm font-extralight font-['Open Sans']">Hacking Done Differently.</div>
                </div>
                <div className="h-70 p-[0.25] bg-[#59BC89]"></div>
                <div className="flex flex-col py-10 px-5 lg:px-10">
                    <div className="text-white font-bold text-sm">ABOUT KMODO</div>
                    <Link href={"/aboutus"} className="w-full font-extralight sm:w-auto text-white text-sm font-['Open Sans']">about</Link>
                    <Link href={"/"} className="w-full sm:w-auto font-extralight text-white text-sm font-['Open Sans']">contact us</Link>  
                </div>
                <div className="flex flex-col py-10 px-5 lg:px-10">
                    <div className="text-white font-bold text-sm font-['Open Sans']">LEGAL</div>
                    <Link href={"/tos"} className="w-full sm:w-auto font-extralight text-white text-sm font-['Open Sans']">terms of service</Link>
                    <Link href={"/"} className="w-full sm:w-auto font-extralight text-white text-sm font-['Open Sans']">privacy</Link>
                </div>
                <div className="flex flex-col py-10 px-5 md:px-10 font-['Open Sans'] text-white text-sm font-bold">SOCIAL
                    {socials.map((social, key) => {
                        return (
                            <Link key={key} href={social.href} className="m-1">
                                {social.icon}
                            </Link>
                        );
                    })}
                </div>
                <div className="flex flex-col py-10 px-5 lg:px-10">
                    <div className="text-white font-bold text-sm font-['Open Sans']">RESOURCES</div>
                    <Link href={"/resources"} className="w-full sm:w-auto font-['Open Sans'] text-white text-sm font-extralight">resources</Link>
                </div>
            </div>
        </div>
    );
};

export { Footer };
