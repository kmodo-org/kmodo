"use client";
import React from "react";
import Image from "next/image";

interface FeatureBoxProps {
    title: string;
    desc: string;
    image: string;
}

const CarouselFeatureBox: React.FC<FeatureBoxProps> = (props) => {
    return( 
        <div>
            <div className="flex place-items-center place-content-center justify-items-center content-center items-center justify-center space-x-4">
                <Image className="flex-shrink-0 rounded-2xl" src={props.image} width={300} height={300} alt="uh oh" />
                <div className="flex flex-col">
                    <div className="text-[#4264AC] font-['Open Sans'] font-bold text-3xl">{props.title}</div>
                    <div className="text-[#4264AC] font-['Open Sans'] font-light text-l text-left">{props.desc}</div>
                </div>
                
            </div>

        </div>
    );
}
export { CarouselFeatureBox };
