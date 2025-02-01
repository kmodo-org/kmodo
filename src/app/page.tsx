import Link from "next/link";
import Image from "next/image";
import { LatestPost } from "~/app/_components/post";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  //const hello = await api.post.hello({ text: "WIP" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

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

            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-center text-2xl text-white">
                {session && <span>Logged in as {session.user?.name}</span>}
              </p>
              <Link
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
                className="rounded-full text-[#59BC89] bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              >
                {session ? "Sign out" : "Sign in"}
              </Link>
            </div>
          </div>

          {session?.user && <LatestPost />}
        </div>
      </main>
    </HydrateClient>
  );
}