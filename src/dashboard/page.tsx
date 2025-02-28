import Link from "next/link";
import Image from "next/image";
import { LatestPost } from "~/components/post";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { Button } from "../components/ui/button"; 

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-background">
        <div className="container flex flex-col items-center justify-center gap-6 px-4 py-16">

          
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl">
              Dashboard (for now ...)
            </p>
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-center text-2xl text-white">
                {session && <span>Logged in as {session.user?.name}</span>}
              </p>
            </div>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}