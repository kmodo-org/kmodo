"use client";
import React from "react";
import Image from "next/image";
import { Url } from "next/dist/shared/lib/router/router";

interface FeatureBoxProps {
    title: string;
    desc: string;
    image: string;
}

const FeatureBox: React.FC<FeatureBoxProps> = (props) => {
    return( 
        <div className="p-10">
            <div className="w-60 h-60 sm:w-64 sm:h-64 bg-[#4264AC] rounded-3xl p-4 text-justify space-y-1  transition-transform hover:scale-105">
                <div className="sm:w-20 w-16 h-16 sm:h-20 bg-[#DBDBF1] rounded-xl justify-items-center content-center items-center">
                    <Image className="" src={props.image} width={45} height={45} alt="uh oh" />
                </div>
                <div className="text-white font-['Open Sans'] font-bold lg:text-xl md:text-lg sm:text-base text-base">{props.title}</div>
                <div className="text-white font-['Open Sans'] font-light lg:text-lg md:text-base sm:text-xs text-xs text-left">{props.desc}</div>
            </div>

        </div>
    );
}
export { FeatureBox };
