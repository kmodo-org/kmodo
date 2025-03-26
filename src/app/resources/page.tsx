"use client";
// basically, the next header thing is a server side component BUT this is a client page so client conflicts with server but apparently i need this to be a client page in order to use react useState so whoops

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Resource } from "src/components/ui/resource";

import { redirect } from "next/navigation";
import { api, HydrateClient } from "~/trpc/server";
import { auth } from "~/server/auth";


type Resource = {
  title: string;
  image: string;
  desc: string;
  tag: string;
  link: string;
};

const allowedUserIds = new Set([
  "71181949-05ab-4011-a6c9-9f7f97d154e6", // daniel efres 
  "7052d1fe-bb96-4db4-9d90-0791d9a7b9c5", // carlos
  "6ad7e677-86c3-46d9-8041-9fff7e9f6132", // kai
  "094f333e-589e-4a6b-9a58-41893606fc06", // carfos
  "b00087f4-fbe1-465c-a74d-791d74278e7b", // eli
  "ec6e9191-6e59-49fa-a35a-71b99ce8b85e" // adrian
]);

const resources: Resource[] = [
  { title: "How to Run a Successful Hackathon", image: "/images/howtorunahackathon.png", desc: "Step-by-step guide on running hackathons by Joshua Tauberer", tag: "test", link: "https://hackathon.guide/"},
  { title: "Awesome Hackathon Projects", image: "/images/listofcoolprojects.png", desc: "This is a curated list of awesome hackathon projects.", tag: "test", link: "https://github.com/Olanetsoft/awesome-hackathon-projects"},
  { title: "Maxwell", image: "/images/maxwell.png", desc: " ", tag: "test", link: "https://www.youtube.com/watch?v=l8W98L94gw8"}
];

export default function ResourcesPage() {

  //  const session = await auth();
  //      const userId = session?.user?.id;
     
  //      if (!userId || !allowedUserIds.has(userId)) {
  //        redirect("/");
  //      }
     
  //      if (session?.user) {
  //        void api.post.getLatest.prefetch();
  //      }

  const [showCard, setShowCard] = useState<boolean[]>(new Array(resources.length).fill(true)); 
  const [input, setInput] = useState<string>(""); 

  const display = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  const update = (input: string): void => {
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
  };

  const clear = (): void => {
    setShowCard(new Array(resources.length).fill(true));
    setInput("");
  };

  return (
      <div className="flex min-h-screen flex-col">
        <div className="">
          
            <Image className="translate-x-1/4 rounded-2xl object-contain w-7/12 h-auto" src="/images/resources.JPG" width={1000} height={10000} alt=""></Image>

          <div className="flex translate-x-3/4 -translate-y-96 bg-white h-fit w-1/2 flex-col items-start justify-start p-8 rounded-2xl">
            <div className="text-[#59BC89] font-['Exo'] font-extrabold text-6xl">HACKATHON RESOURCES</div>
            <div className="text-[#59BC89] font-['Open Sans'] text-xl">
              With over 3 resources outsourced from industry professionals and hacking experts, KMODO is the most comprehensive hackathon guide out there.
            </div>
          </div>
        </div>

        <div className="m-20 flex flex-col items-center w-full">
          <div className="flex flex-row space-x-5 w-5/6 justify-center">
            <input className="rounded-lg h-11 w-1/2" type="text" placeholder="Ex: idea brainstorming" onChange={display} value={input}></input>
            <button className="p-2 text-white bg-[#4264AC] hover:bg-[#4264AC]/70 transition w-fit h-fit rounded-lg lg:text-lg md:text-base sm:text-sm text-sm" onClick={() => update(input)}>SEARCH</button>
            <button className="p-2 text-white bg-[#4264AC] hover:bg-[#4264AC]/70 transition w-fit h-fit rounded-lg lg:text-lg md:text-base sm:text-sm text-sm" onClick={clear}>CLEAR</button>

          </div>
          

          <div className="flex flex-wrap gap-5 justify-center mt-10">
            {resources.map((card, index) => {
              return (
                showCard[index] && (
                  <Resource key={index} title={card.title} desc={card.desc} image={card.image} link={card.link} />
                )
              );
            })}
          </div>
        </div>
      </div>
  );
}
