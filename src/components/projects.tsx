"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "./ui/carousel";

import { Card } from "./ui/card";

export function ProjectsCard() {
  return (
    <Card>
    <div className="bg-white/5 rounded-xl p-6 border border-white/5">
      <h2 className="text-xl font-semibold  text-[#a72828]">Projects</h2>

      <Carousel className="w-full">
        <CarouselContent>
          {[1, 2, 3].map((n) => (
            <CarouselItem
              key={n}
              className="flex flex-col items-center justify-center h-56"
            >
              <span className="text-3xl font-bold mb-2">#{n}</span>
              <p className="text-sm opacity-70">Coming soon…</p>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
      </div>
    </Card>
  );
}
