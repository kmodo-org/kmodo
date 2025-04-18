"use client";
// basically, the next header thing is a server side component BUT this is a client page so client conflicts with server but apparently i need this to be a client page in order to use react useState so whoops

// import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Resource } from "src/components/ui/resource";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/ui/footer";

// import { redirect } from "next/navigation";
// import { api, HydrateClient } from "~/trpc/server";
// import { auth } from "~/server/auth";

import { Button } from "src/components/ui/button"

import {
  NavigationMenu,
  NavigationMenuContent,
  // NavigationMenuIndicator,
  NavigationMenuItem,
  // NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  // NavigationMenuViewport,
} from "src/components/ui/navigation-menu";

import { Input } from "src/components/ui/input";

type Resource = {
  title: string;
  image: string;
  desc: string;
  tag: string;
  link: string;
};

// will add more resources, maybe we can put in db?
const resources: Resource[] = [
  { title: "How to Run a Successful Hackathon", image: "/images/howtorunahackathon.png", desc: "Step-by-step guide on running hackathons by Joshua Tauberer", tag: "ORGANIZATION", link: "https://hackathon.guide/"},
  { title: "Awesome Hackathon Projects", image: "/images/listofcoolprojects.png", desc: "This is a curated list of awesome hackathon projects.", tag: "BRAINSTORMING", link: "https://github.com/Olanetsoft/awesome-hackathon-projects"},
  { title: "Maxwell", image: "/images/maxwell.png", desc: " ", tag: "", link: "https://www.youtube.com/watch?v=l8W98L94gw8"}
];

export default function ResourcesPage() {

  // const session = await auth();
  //     const userId = session?.user?.id;
  
  //     if (session == null) { // if the user is not logged in, redirect to the landing page
  //         redirect("/");
  //       }
      
  //       if (!userId || !allowedUserIds.has(userId)) { // if user isnt a goat they are not allowed
  //          redirect("/");
  //       }

  const [showCard, setShowCard] = useState<boolean[]>(new Array(resources.length).fill(true)); 
  const [input, setInput] = useState<string>(""); 

  const display = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  const update = (reg: boolean, input: string): void => {

    if(reg) {
      const keywords = input.split(" ").map((keyword) => keyword.toLowerCase()); 


      const updatedShowCard = resources.map((resource) => {
        let hasKeyword = false;
  
        keywords.forEach((keyword) => {
          if(resource.title.toLowerCase().includes(keyword) || resource.desc.toLowerCase().includes(keyword)) {
            hasKeyword=true;
          }
  
        })
  
        return hasKeyword;
  
      });
  
      setShowCard(updatedShowCard);
    } else {
      const updatedShowCard = resources.map((resource) => {
        let hasKeyword = false;
        
        if(resource.tag.toLowerCase().includes(input.toLowerCase())) {
          hasKeyword=true;
        }

        return hasKeyword;
    
      });
  
      setShowCard(updatedShowCard);
    }
  };

  const clear = (): void => {
    setShowCard(new Array(resources.length).fill(true));
    setInput("");
  };
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <Image
          className="object-contain w-full h-auto -mt-32"
          src="/images/resources.JPG"
          width={2000}
          height={300}
          alt="title"
        />
        <div className="absolute h-full flex flex-col lg:items-start items-center w-full 2xl:top-1/3 xl:top-52 md:top-40 sm:top-32 top-28 lg:ml-20 sm:m-0 m-0">
          <div className="flex lg:translate-x-3/4 lg:translate-y-1/4 bg-white h-fit lg:w-1/2 flex-col items-start justify-start p-5 ml-5 mr-5 rounded-2xl w-11/12 md:w-3/4 shadow-2xl shadow-black transition-transform hover:scale-105 bg-opacity-90">
            <div className="text-[#59BC89] font-extrabold xl:text-6xl lg:text-5xl md:text-3xl sm:text-3xl text-3xl">
              HACKATHON RESOURCES
            </div>
            <div className="text-[#59BC89] font-['Open Sans'] lg:text-xl md:text-lg sm:text-base text-base">
              With over 3 resources outsourced from industry professionals and hacking experts, KMODO is the most comprehensive hackathon guide out there.
            </div>
          </div>
        </div>
  
        <div className="flex flex-col items-center w-full">
          <div className="bg-white w-3/4 p-10 -translate-y-1/2 rounded-xl shadow-black transition-transform">
            <div className="flex flex-row space-x-5 w-full justify-center place-items-center">
              <Input
                className="z-10 rounded-lg h-11 w-1/2 sm:w-1/2 md:w-1/2 bg-white text-[#59BC89] file:text-base md:text-base text-base font-['Open Sans']"
                type="text"
                placeholder="Ex: idea brainstorming"
                onChange={display}
                value={input}
              />
              <button
                className="z-10 transition-transform hover:scale-110"
                type="submit"
                onClick={() => update(true, input)}
              >
                <Image
                  className=""
                  src="/images/magnifyingglass.png"
                  width={30}
                  height={30}
                  alt="SUBMIT"
                />
              </button>
  
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-white hover:bg-slate-100 text-[#59BC89] hover:text-[#59BC89] focus:text-accent-foreground-[#59BC89] font-['Open Sans']">
                      TAGS
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <Button
                        className="z-10 block w-full px-4 py-2 my-2 bg-[#59BC89] border rounded-md shadow-sm text-white font-bold transition-all duration-200 hover:bg-[#59BC89]/70 hover:shadow-md font-['Open Sans']"
                        onClick={() => update(false, "organization")}
                        type="submit"
                      >
                        ORGANIZATION
                      </Button>
                      <Button
                        className="z-10 block w-full px-4 py-2 my-2 bg-[#4264AC] border rounded-md shadow-sm text-white font-bold font-['Open Sans'] transition-all duration-200 hover:bg-[#4264AC]/70 hover:shadow-md"
                        onClick={() => update(false, "brainstorming")}
                        type="submit"
                      >
                        BRAINSTORMING
                      </Button>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
  
              <Button
                className="p-1 z-10 text-white font-['Open Sans'] bg-[#59BC89] hover:bg-[#59BC89]/70 transition w-fit h-fit rounded-lg text-base"
                onClick={clear}
              >
                CLEAR
              </Button>
            </div>
          </div>
  
          <div className="flex flex-wrap gap-5 justify-center mt-10">
            {resources.map((card, index) => {
              return (
                showCard[index] && (
                  <Resource
                    key={index}
                    title={card.title}
                    desc={card.desc}
                    image={card.image}
                    link={card.link}
                    tag={card.tag}
                  />
                )
              );
            })}
          </div>
  
          <div className="my-44"></div>
        </div>
      </main>
      < Footer />
    </div>
  );
}
