import Image from "next/image";
import Link from "next/link";
import { Button } from "src/components/ui/button";
import { Card, CardContent } from "src/components/ui/card";
import { auth } from "~/server/auth";
import { api } from "~/trpc/server";
import { db } from "~/server/db";
import { FeatureBox } from "src/components/ui/featurebox";
import { CarouselFeatureBox } from "src/components/ui/carouselfeaturebox";
import { users, events, sponsors } from "~/server/db/schema";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/ui/footer";
import { count } from "drizzle-orm";
const ModoSvg = "/images/ModoStanding.svg";
const Computer = "/images/Computer.svg";
const Binary = "/images/Binary.svg";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "src/components/ui/carousel"

interface FeatureBoxItem {
  title: string;
  desc: string;
  image: string;
}

interface CarouselFeatureItem {
  title: string;
  desc: string;
  image: string;
}

async function getStats() {
    // Get total user count
    const usersCount = await db
      .select({ count: count() })
      .from(users)
      .then(res => res[0]?.count ?? 0);
      
    // Get total events count
    const eventsCount = await db
      .select({ count: count() })
      .from(events)
      .then(res => res[0]?.count ?? 0);
      
    // Get total companies/sponsors count
    const companiesCount = await db
      .select({ count: count() })
      .from(sponsors)
      .then(res => res[0]?.count ?? 0);
      
    return {
      usersCount,
      eventsCount,
      companiesCount
    };
}

export default async function AboutUs() {  
    const session = await auth();
    
    if (session?.user) {
        void api.post.getLatest.prefetch();
    }
    
    const { usersCount, eventsCount, companiesCount } = await getStats();
    
    // Format stats with a "+" symbol for display
    const formattedUserCount = `${usersCount}+`;
    const formattedEventCount = `${eventsCount}+`;
    const formattedCompanyCount = `${companiesCount}+`;

    const featureBoxList: FeatureBoxItem[] = [
        {title: "Easy Use", desc: "One site, one page to help everyone spend less time finding things out and spend more time hacking.", image: "/images/globe.svg"},
        {title: "Organization", desc: "We help you organize your event dashboard to help personalize your hackathons.", image: "/images/users.svg"},
        {title: "Ranked", desc: "The ranked system helps bring a new competitive scene to hackathon events.", image: "/images/award.svg"},
        {title: "Free-Use", desc: "Free use allows our users big or small, to plan, attend, or sponsor hackathons!", image: "/images/circle-check.svg"}
    ];

    const carouselFeatureList: CarouselFeatureItem[] = [
        {title: "EVENT ORGANIZATION TOOLKIT", desc: "Our tool empowers organizers to easily set up and manage hackathon events with intuitive features for creating event pages, setting schedules, and managing participant registrations. With real-time updates and customizable options, organizers can focus on fostering innovation while we handle the logistics.", image: "/images/eventorganizationtoolkit.png"},
        {title: "HACKER FINDER", desc: "This feature allows hackers to easily discover local hackathons and tech events based on their location and interests. Users can find nearby competitions, registration deadlines, and event details to stay engaged in the hackathon community.", image: "/images/hackerfinder.JPG"}
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#2D2647] text-white">
            <Navbar />
            <section className="relative flex items-center justify-center h-auto">
                <div className="container mx-auto px-4 z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="text-center lg:text-left lg:pr-12">
                        <h1 className="text-[#59BC89] font-extrabold leading-tight text-xl md:text-6xl lg:text-8xl mb-6">
                            Hackathons<br />Done Different.
                        </h1>
                        <p className="text-white text-xl mb-8 font-light max-w-xl mx-auto lg:mx-0">
                            Transforming the future, one hackathon at a time. Join our platform and experience a new way to collaborate, innovate, and compete.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link href="/hacker" className="w-full sm:w-auto">
                                <Button size="lg" className="bg-[#59BC89] text-white hover:bg-[#4ca975] text-lg px-8 py-6">
                                    Join Now
                                </Button>
                            </Link>
                            <Link href="/aboutus" className="w-full sm:w-auto">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border border-white text-white bg-transparent hover:bg-white hover:text-black text-lg px-8 py-6 transition-colors duration-300"
                                >
                                    Learn More
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="relative top-10 lg:top-0 flex justify-center items-center">
                        <Image
                            src={Computer}
                            alt="Computer Image"
                            width={600}
                            height={400}
                            className="w-full h-full object-contain"
                        />
                        <Image
                            src={ModoSvg}
                            alt="KMODO Logo"
                            width={400}
                            height={400}
                            className="absolute inset-0 m-auto w-2/4 h-auto object-contain z-10 translate-y-44 translate-x-44"
                        />
                        <Image
                            src={Binary}
                            alt="Binary"
                            width={400}
                            height={400}
                            className="absolute inset-0 m-auto w-1/2 h-auto object-contain z-10 translate-y-44 -translate-x-44"
                        />
                    </div>
                </div>
            </section>
            
            <div className="h-48 md:h-64 w-full"></div>
            
            <div className="flex items-center justify-center w-full ">
                <div className="h-fit lg:-translate-y-2/4 sm:-translate-y-1/4 translate-y-6 w-9/12 lg:space-y-4 sm:space-y-0 space-y-0 bg-white rounded-3xl lg:p-8 sm:p-4 p-4 shadow-2xl shadow-black transition-transform hover:scale-105">
                    <div className="text-center text-[#59BC89] font-extrabold lg:text-4xl md:text-2xl sm:text-xl text-xl">
                        BRINGING PEOPLE, PROJECTS, AND POSSIBILITIES TOGETHER
                    </div>
                    <div className="text-[#2D2647] font-['Open Sans'] font-light lg:text-xl text-center md:text-base sm:text-sm text-sm">
                        We redefine the hackathon experience by fostering collaboration between hackers, organizers, and companies...
                    </div>
                    <div className="flex flex-row text-center justify-center text-[#4264AC] font-['Open Sans'] font-bold lg:text-2xl md:text-lg sm:text-base text-base">
                        <div className="w-1/3">{formattedUserCount} USERS</div>
                        <div className="w-1/3">{formattedEventCount} EVENTS</div>
                        <div className="w-1/3">{formattedCompanyCount} COMPANIES</div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col text-center items-center justify-center space-y-5">
                <div className="sm:translate-y-0 translate-y-16 sm:mr-52 sm:ml-52 mr-4 ml-4 text-center text-[#DBDBF1] font-extrabold lg:text-4xl md:text-2xl sm:text-xl text-xl">
                    WHY SHOULD YOU CHOOSE KMODO?
                </div>
                <div className="sm:py-0 py-16 sm:mr-36 sm:ml-36 mr-4 ml-4 text-white lg:text-xl md:text-lg sm:text-base text-base font-['Open Sans'] font-light">
                    Choose us for a seamless, all-in-one platform that enhances collaboration...
                </div>
                <div className="flex flex-wrap justify-center sm:p-5 p-0 gap-5">
                    {featureBoxList.map((featurebox: FeatureBoxItem, index: number) => (
                        <div key={index} className="flex flex-col justify-center items-center w-full sm:w-auto">
                            <FeatureBox title={featurebox.title} desc={featurebox.desc} image={featurebox.image} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-[#4264AC] w-full p-6 h-fit text-white font-extrabold text-4xl text-center">
                WHAT TOOLS DOES KMODO OFFER?
            </div>

            <div className="flex justify-center items-center bg-white w-full h-fit">
                <Carousel className="flex h-full justify-between">
                    <CarouselContent className="flex-row gap-4">
                        {carouselFeatureList.map((carouselFeature: CarouselFeatureItem, index: number) => (
                            <CarouselItem key={index}>
                                <div className="flex sm:p-12 p-10 w-full">
                                    <Card className="shadow-none w-full">
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
                    <CarouselPrevious className="left-4 top-1/2 transform -translate-y-1/2 z-10 bg-[#4264AC] text-white p-2 rounded-full shadow-lg hover:bg-[#324f8c]" />
                    <CarouselNext className="right-4 top-1/2 transform -translate-y-1/2 z-10 bg-[#4264AC] text-white p-2 rounded-full shadow-lg hover:bg-[#324f8c]" />
                </Carousel>
            </div>
            <Footer />
        </div>
    );
}

 