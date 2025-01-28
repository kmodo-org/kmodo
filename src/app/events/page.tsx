import Image from "next/image";
import {HydrateClient } from "~/trpc/server";

export default async function Home() {

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#32324E] to-[#0a0a14] text-[#D9DBF1]">
        <div className="container flex flex-col items-center justify-center gap-6 px-4 py-16">
          <Image className="md:w-200 md:h-200" src="/kmodo.png" width={300} height={300} alt="kmodo" />
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            <span className="text-[#59BC89]">kmodo</span>
          </h1>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl">
              Currently under development.
            </p>
            <p className="text-4xl text-red-700">
              Events Page
            </p>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}