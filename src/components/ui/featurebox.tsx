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
        <div>
            <div className="w-60 h-60 bg-[#4264AC] rounded-3xl p-4 text-justify space-y-1  transition-transform hover:scale-105">
                <div className="w-20 h-20 bg-[#DBDBF1] rounded-xl justify-items-center content-center items-center">
                    <Image className="" src={props.image} width={45} height={45} alt="uh oh" />
                </div>
                <div className="text-white font-['Open Sans'] font-bold text-xl">{props.title}</div>
                <div className="text-white font-['Open Sans'] font-light text-l text-left">{props.desc}</div>
            </div>

        </div>
    );
}
export { FeatureBox };
