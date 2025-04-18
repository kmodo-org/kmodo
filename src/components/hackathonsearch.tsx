"use client";
import React, { useEffect, useState } from "react";
// import Link from "next/link";
import Image from "next/image";
import { Input } from "src/components/ui/input";
import { api } from "~/trpc/react";
import { Events } from "src/components/events";
import { Button } from "src/components/ui/button";

const HackathonSearch: React.FC = () => {
  const { data: events } = api.hacker.getEvents.useQuery();

  const [showCard, setShowCard] = useState<boolean[]>([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    if (events) {
      setShowCard(new Array(events.length).fill(true));
    }
  }, [events]);

  const display = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  const update = (reg: boolean, input: string): void => {
    if (reg) {
      const keywords = input.split(" ").map((keyword) => keyword.toLowerCase());

      const updatedShowCard = events?.map((event) => {
        let hasKeyword = false;

        keywords.forEach((keyword) => {
          if (
            event.name.toLowerCase().includes(keyword) ??
            event.description?.toLowerCase().includes(keyword)
          ) {
            hasKeyword = true;
          }
        });

        return hasKeyword;
      });

      if (updatedShowCard) {
        setShowCard(updatedShowCard);
      }
    }
  };

  const clear = (): void => {
    setShowCard(new Array(events?.length).fill(true));
    setInput("");
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="bg-destructive w-3/4 p-10  rounded-xl shadow-black transition-transform">
        <div className="flex flex-row space-x-5 w-full justify-center place-items-center">
          <Input
            className="z-10 rounded-lg h-11 w-1/2 sm:w-1/2 md:w-1/2 bg-white text-[#59BC89] file:text-base md:text-base text-base font-['Open Sans']"
            type="text"
            placeholder="Ex: Knight Hacks"
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

          <Button
            className="p-1 z-10 text-white font-['Open Sans'] bg-[#59BC89] hover:bg-[#59BC89]/70 transition w-fit h-fit rounded-lg text-base"
            onClick={clear}
          >
            CLEAR
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-5 justify-center my-10">
        {events?.map((event, index) => {
          return (
            showCard[index] && (
              <Events
                key={index}
                title={event.name}
                desc={event.description ?? ""}
                date={event.date}
                starttime={event.starttime}
                endtime={event.endtime}
                school={event.school ?? "Unknown School"}
                location={event.location}
                id={event.id}
              />
            )
          );
        })}
      </div>
    </div>
  );
};

export { HackathonSearch };