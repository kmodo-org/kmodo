"use client";
import React from "react";
import Link from "next/link";

interface ResourceProps {
    title: string;
    desc: string;
    image: string;
    link: string;
}

const Resource: React.FC<ResourceProps> = (props) => {
    return( 
        <div>
            <Link href={props.link}>
                <div className="w-52 h-52 sm:w-64 sm:h-64 bg-cover bg-center rounded-3xl p-4 text-justify space-y-1 transition-transform hover:scale-105 relative flex flex-col justify-end" style={{ backgroundImage: `url(${props.image})` }}>
                    <div className="absolute inset-0 bg-black/50 rounded-3xl"></div>
                    <div className="text-start  relative z-10 text-white font-['Open Sans'] font-bold lg:text-xl md:text-lg sm:text-base text-base">{props.title}</div>
                    <div className="text-start relative z-10 text-white font-['Open Sans'] font-light lg:text-lg md:text-base sm:text-xs text-xs text-left">{props.desc}</div>
                </div>
            </Link>
        </div>
    );
}

export { Resource };
