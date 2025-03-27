import Image from "next/image";
import { Button } from "src/components/ui/button";
import { Card, CardContent } from "src/components/ui/card";
// import { auth, signIn } from "~/server/auth";
import { signIn } from "~/server/auth";
// import { redirect } from "next/navigation";
// import { api } from "~/trpc/server";
import { FeatureBox } from "src/components/ui/featurebox";
import { CarouselFeatureBox } from "src/components/ui/carouselfeaturebox";
// import { GithubIcon } from "lucide-react";


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
    // const session = await auth();
    // const userId = session?.user?.id;
    
    // if (!userId || !allowedUserIds.has(userId)) {
    //     redirect("/");
    // }

    // if (session?.user) {
    //     void api.post.getLatest.prefetch();
    // }

    // border-red-400 border w-full

    return (
        
        <div className="flex min-h-screen flex-col">

            <Image className="object-contain w-full h-auto -mt-32 " src="/images/aboutus.png" width={2000} height={300} alt="title" />
            <div className=" absolute h-full flex flex-col lg:items-start md:items-start sm:items-center items-center  w-full 2xl:top-1/3 xl:top-52 md:top-40 sm:top-32 top-28 lg:ml-20 md:ml-10 sm:m-0 m-0">
                <div className="justify-left space-y-3 w-fit h-fit bg-[#2D2647] rounded-3xl bg-opacity-90 xl:p-16 lg:p-8 md:p-10 sm:p-8 p-8 shadow-2xl shadow-black  transition-transform hover:scale-105 sm:justify-center justify-center">
                    <div className="text-[#59BC89] font-['Exo'] font-extrabold leading-tight lg:text-6xl md:text-3xl sm:text-xl text-xl">HACKATHONS<br></br>DONE<br></br>DIFFERENT.</div>
                    <div className="text-white font-['Open Sans'] lg:text-xl md:text-lg sm:text-base text-base">TRANSFORMING THE FUTURE, ONE HACKATHON AT A TIME.</div>

                    <form className="p-[1.5px]">
                         <Button
                         size="lg"
                         className="p-2.5 text-white bg-[#4264AC] hover:bg-[#4264AC]/70 transition w-fit h-fit rounded-3xl lg:text-2xl md:text-xl sm:text-lg text-lg"
                          formAction={async () => {
                          "use server";
                           await signIn("github", {
                             redirectTo: "/hacker/application",
                           });
                          }}
                        >
                          JOIN NOW
                         </Button>
                    </form>

                 
                </div>
                
            </div>
            <div className="flex items-center justify-center w-full">
                <div className="h-fit lg:-translate-y-2/4 sm:-translate-y-1/4 translate-y-6 w-9/12 lg:space-y-4 sm:space-y-0 space-y-0 bg-white rounded-3xl lg:p-8 sm:p-4 p-4 shadow-2xl shadow-black transition-transform hover:scale-105">
                    <div className="text-center text-[#59BC89] font-['Exo'] font-extrabold lg:text-4xl md:text-2xl sm:text-xl text-xl">
                    BRINGING PEOPLE, PROJECTS, AND POSSIBILITIES TOGETHER
                    </div>
                    <div className="text-[#2D2647] font-['Open Sans'] font-light lg:text-xl md:text-base sm:text-sm text-sm">
                    We redefine the hackathon experience by fostering collaboration between hackers, organizers, and companies. Start your journey today to gain access to robust event organization tools, hackathon locaters, live group matching, project resources, direct communication, and more!
                    </div>
                    <div className="flex-row flex text-center justify-center text-[#4264AC] font-['Open Sans'] font-bold lg:text-2xl md:text-lg sm:text-base text-base">
                    <div className="w-1/3">10+ USERS</div>
                    <div className="w-1/3">1 EVENT</div>
                    <div className="w-1/3">0 COMPANIES</div>
                    </div>
                </div>
                </div>

            <div className="flex-col text-center items-center justify-center space-y-5">
                <div className="sm:translate-y-0 translate-y-16 sm:mr-52 sm:ml-52 mr-4 ml-4 text-center text-[#DBDBF1] font-['Exo'] font-extrabold lg:text-4xl md:text-2xl sm:text-xl text-xl">WHY SHOULD YOU CHOOSE KMODO?</div>
                <div className="sm:py-0 py-16 sm:mr-36 sm:ml-36 mr-4 ml-4 text-white lg:text-xl md:text-lg sm:text-base text-base font-['Open Sans'] font-light">Choose us for a seamless, all-in-one platform that enhances collaboration, streamlines event management, and connects the hackathon community like never before.</div>
                <div className="flex-row flex-wrap flex sm:p-5 p-0 gap-5 justify-center">
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
                    <CarouselItem className="" key={index}>
                    <div className="flex sm:p-12 p-10 w-full">
                        <Card className="shadow-none w-full ">
                        <CardContent className="flex sm:p-4 p-0 w-full transition-transform hover:scale-105">
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
                <CarouselPrevious className=" left-4 top-1/2 transform -translate-y-1/2 z-10 bg-[#4264AC] text-white p-2 rounded-full shadow-lg hover:bg-[#324f8c]" />
                <CarouselNext className=" right-4 top-1/2 transform -translate-y-1/2 z-10 bg-[#4264AC] text-white p-2 rounded-full shadow-lg hover:bg-[#324f8c]" />
            </Carousel>
            </div>

            <div className="h-44"></div>
            
            
            
        </div>

    );
  }

 