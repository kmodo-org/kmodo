import Link from "next/link";
import Image from "next/image";
import { auth, signIn } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { Button } from "~/components/ui/button";

export default async function Home() {
  const session = await auth();
  if (session?.user) {
    void api.post.getLatest.prefetch();
  }
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-background">
        <div className="container flex flex-col items-center justify-center gap-6 px-4 py-16">
          <Image className="md:w-200 md:h-200" src="/kmodo.png" width={300} height={300} alt="kmodo" />
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            <span className="text-[#59BC89]">kmodo</span> 
          </h1>
          <div className="flex flex-col items-center gap-2 ">
            <p className="text-2xl pb-5 text-white">
              Currently under development.
            </p>
            <div className="flex flex-col items-center justify-center gap-4">
            {session?.user ? (
              <Link href="/dashboard">
                <Button size="lg" className="rounded-full text-[#59BC89] text-md bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20">
                  Go to Dashboard
                </Button>
              </Link>
              ) : (
              <form action="/api/auth/signin">
                <Button
                  size="lg"
                  className="rounded-full text-[#59BC89] text-md bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
                >
                  Sign in with GitHub!
                </Button>
              </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}