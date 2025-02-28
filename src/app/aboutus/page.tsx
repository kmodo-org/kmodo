import Link from "next/link";
import Image from "next/image";
import { LatestPost } from "~/components/post";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { Button } from "src/components/ui/button";
import { Card, CardContent } from "src/components/ui/card";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "src/components/ui/carousel"

export default async function Home() {
    const session = await auth();
  
    return (
        
        <div className="flex min-h-screen flex-col">
            <Image className="object-contain w-full h-auto " src="/aboutus.png" width={2000} height={300} alt="title" />
            <div className="absolute top-1/3 h-full flex flex-col items-center ml-20">
                <div className="justify-left space-y-3 w-fit h-fit bg-[#2D2647] rounded-3xl bg-opacity-90 p-8 shadow-2xl shadow-black">
                    <div className="text-[#59BC89] font-['Exo'] font-extrabold text-6xl leading-tight">HACKATHONS<br></br>DONE<br></br>DIFFERENT.</div>
                    <div className="text-white text-xl font-['Open Sans']">TRANSFORMING THE FUTURE, ONE HACKATHON AT A TIME.</div>
                    <Button className="transition w-fit h-fit rounded-3xl text-2xl text-white bg-[#4264AC]  hover:bg-[#4264AC]/70">JOIN NOW</Button>
                </div>
                
            </div>
            <div className="flex items-center justify-center w-full">
                <div className="h-fit w-9/12 -translate-y-2/4 space-y-4 bg-white rounded-3xl p-8 shadow-2xl shadow-black">
                    <div className="text-center text-[#59BC89] font-['Exo'] font-extrabold text-4xl ">BRINGING PEOPLE, PROJECTS, AND POSSIBILITIES TOGETHER</div>
                    <div className="text-[#2D2647] text-xl font-['Open Sans'] font-light">We redefine the hackathon experience by fostering collaboration between hackers, organizers, and companies. Start your journey today to gain access to robust event organization tools, hackathon locaters, live group matching, project resources, direct communication, and more!</div>
                    <div className="flex-row flex space-x-48 justify-center text-[#4264AC] font-['Open Sans'] font-bold text-2xl">
                        <div className="">10+ USERS</div>
                        <div className="">1 EVENT</div>
                        <div className="">0 COMPANIES</div>
                    </div>
                </div>
            </div>

            <div className="flex-col text-center items-center justify-center mr-52 ml-52 space-y-5">
                <div className="text-center text-[#DBDBF1] font-['Exo'] font-extrabold text-4xl ">WHY SHOULD YOU CHOOSE KMODO?</div>
                <div className="text-white text-xl font-['Open Sans'] font-light">Choose us for a seamless, all-in-one platform that enhances collaboration, streamlines event management, and connects the hackathon community like never before.</div>
                <div className="flex-row flex space-x-5 justify-center ">
                    <div className="w-60 h-60 bg-[#4264AC] rounded-3xl p-4">
                        <div className="text-white font-['Open Sans'] font-bold text-xl">Easy Use</div>
                        <div className="text-white font-['Open Sans'] font-light text-l text-left">One site, one page to help everyone spend less time finding things out and spend more time hacking.</div>
                    </div>
                    <div className="w-60 h-60 bg-[#4264AC] rounded-3xl p-4">
                        <div className="text-white font-['Open Sans'] font-bold text-xl">Organization</div>
                        <div className="text-white font-['Open Sans'] font-light text-l text-left">We help you organize your event dashboard to help personalize your hackathons.</div>
                    </div>
                    <div className="w-60 h-60 bg-[#4264AC] rounded-3xl p-4">
                        <div className="text-white font-['Open Sans'] font-bold text-xl">Ranked</div>
                        <div className="text-white font-['Open Sans'] font-light text-l text-left">The ranked system helps bring a new competitive scene to hackathon events.</div>
                    </div>
                    <div className="w-60 h-60 bg-[#4264AC] rounded-3xl p-4">
                        <div className="text-white font-['Open Sans'] font-bold text-xl">Free-Use</div>
                        <div className="text-white font-['Open Sans'] font-light text-l text-left">Free use allows our users big or small, to plan, attend, or sponsor hackathons!</div>
                    </div>
                    
                </div>
            </div>

            <div className="h-44"></div>

            <div className="bg-[#4264AC] w-full p-6 h-fit text-white font-['Exo'] font-extrabold text-4xl text-center">WHAT TOOLS DOES KMODO OFFER?</div>
            <div className=""></div>

            <div className="flex justify-center items-center bg-white w-full h-70">
                <Carousel className="h-full justify-between">
                <CarouselContent className="">
                    {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem className="w-full" key={index}>
                        <div className="p-1 w-full">
                        <Card className=" shadow-none w-full">
                            <CardContent className="flex aspect-square items-center justify-center p-6 w-full">
                            <span className="text-4xl font-semibold">{index + 1}</span>
                            </CardContent>
                        </Card>
                        </div>
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
                </Carousel>
            </div>
            
        </div>

    );
  }