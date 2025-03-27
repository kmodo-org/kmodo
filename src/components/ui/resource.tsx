"use client";
import React from "react";
import Link from "next/link";

interface ResourceProps {
    title: string;
    desc: string;
    image: string;
    link: string;
    tag: string;
}

const Resource: React.FC<ResourceProps> = (props) => {
    return( 
        <div>
            <Link href={props.link}>
                <div className="w-72 h-72 bg-cover bg-center rounded-3xl p-4 text-justify space-y-1 transition-transform hover:scale-105 relative flex flex-col justify-end" style={{ backgroundImage: `url(${props.image})` }}>
                    <div className="absolute inset-0 bg-black/50 rounded-3xl"></div>
                    <div className="text-start  relative z-10 text-white font-['Open Sans'] font-bold lg:text-xl md:text-lg sm:text-base text-base">{props.title}</div>
                    <div className="text-start relative z-10 text-white font-['Open Sans'] font-light lg:text-lg md:text-base sm:text-xs text-xs text-left">{props.desc}</div>
                    { props.tag && <div className="font-bold z-10 bg-[#59BC89] text-sm text-white rounded-lg w-fit h-fit p-2">{props.tag}</div> }
                </div>
            </Link>
        </div>
    );
}

export { Resource };
