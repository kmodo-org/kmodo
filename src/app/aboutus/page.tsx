import Image from "next/image";
import { Button } from "src/components/ui/button";
import { Card, CardContent } from "src/components/ui/card";
import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { api } from "~/trpc/server";
import { FeatureBox } from "src/components/ui/featurebox";
import { CarouselFeatureBox } from "src/components/ui/carouselfeaturebox";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "src/components/ui/carousel"

  const allowedUserIds = new Set([
    "71181949-05ab-4011-a6c9-9f7f97d154e6", // daniel efres 
    "7052d1fe-bb96-4db4-9d90-0791d9a7b9c5", // carlos
    "6ad7e677-86c3-46d9-8041-9fff7e9f6132", // kai
    "094f333e-589e-4a6b-9a58-41893606fc06", // carfos
    "b00087f4-fbe1-465c-a74d-791d74278e7b", // eli
    "ec6e9191-6e59-49fa-a35a-71b99ce8b85e" // adrian
  ]);

  const featureBoxList = [
    {title: "Easy Use", desc: "One site, one page to help everyone spend less time finding things out and spend more time hacking.", image: "/images/easyuse.png"},
    {title: "Organization", desc: "We help you organize your event dashboard to help personalize your hackathons.", image: "/images/organization.png"},
    {title: "Ranked", desc: "The ranked system helps bring a new competitive scene to hackathon events.", image: "/images/ranked.png"},
    {title: "Free-Use", desc: "Free use allows our users big or small, to plan, attend, or sponsor hackathons!", image: "/images/freeuse.png"}

  ]

  const carouselFeatureList = [
    {title: "EVENT ORGANIZATION TOOLKIT", desc: "Our tool empowers organizers to easily set up and manage hackathon events with intuitive features for creating event pages, setting schedules, and managing participant registrations. With real-time updates and customizable options, organizers can focus on fostering innovation while we handle the logistics.", image: "/images/eventorganizationtoolkit.png"},
    {title: "HACKER FINDER", desc: "This feature allows hackers to easily discover local hackathons and tech events based on their location and interests. Users can find nearby competitions, registration deadlines, and event details to stay engaged in the hackathon community.", image: "/images/hackerfinder.JPG"}
   
  ]

export default async function AboutUs() {  
    const session = await auth();
    const userId = session?.user?.id;
    
    if (!userId || !allowedUserIds.has(userId)) {
        redirect("/");
    }

    if (session?.user) {
        void api.post.getLatest.prefetch();
    }

    return (
        
        <div className="flex min-h-screen flex-col">

            <Image className="object-contain w-full h-auto " src="/images/aboutus.png" width={2000} height={300} alt="title" />
            <div className="absolute top-1/3 h-full flex flex-col items-center ml-20">
                <div className="justify-left space-y-3 w-fit h-fit bg-[#2D2647] rounded-3xl bg-opacity-90 p-8 shadow-2xl shadow-black  transition-transform hover:scale-105">
                    <div className="text-[#59BC89] font-['Exo'] font-extrabold text-6xl leading-tight">HACKATHONS<br></br>DONE<br></br>DIFFERENT.</div>
                    <div className="text-white text-xl font-['Open Sans']">TRANSFORMING THE FUTURE, ONE HACKATHON AT A TIME.</div>
                    <Button className="transition w-fit h-fit rounded-3xl text-2xl text-white bg-[#4264AC]  hover:bg-[#4264AC]/70">JOIN NOW</Button>
                </div>
                
            </div>
            <div className="flex items-start justify-center w-full">
                <div className="h-fit w-9/12 -translate-y-2/4 space-y-4 bg-white rounded-3xl p-8 shadow-2xl shadow-black  transition-transform hover:scale-105">
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
                <div className="flex-row flex space-x-5 justify-center">
                {featureBoxList.map((featurebox, index) => {
                    return(<FeatureBox key={index} title={featurebox.title} desc={featurebox.desc} image={featurebox.image}></FeatureBox>)

                })}
                </div>
                
            </div>

            <div className="h-44"></div>

            <div className="bg-[#4264AC] w-full p-6 h-fit text-white font-['Exo'] font-extrabold text-4xl text-center">WHAT TOOLS DOES KMODO OFFER?</div>
            <div className=""></div>

            <div className="flex justify-center items-center bg-white w-full h-fit">
            <Carousel className="flex h-full justify-between">
                <CarouselContent className="flex-row gap-4">
                {carouselFeatureList.map((carouselFeature, index) => (
                    <CarouselItem className="w-96" key={index}>
                    <div className="flex p-2 w-full">
                        <Card className="shadow-none w-full ">
                        <CardContent className="flex p-4 w-full transition-transform hover:scale-105">
                            <CarouselFeatureBox
                            title={carouselFeature.title}
                            desc={carouselFeature.desc}
                            image={carouselFeature.image}
                            />
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

            <div className="h-44"></div>
            
            
            
        </div>

    );
  }

 