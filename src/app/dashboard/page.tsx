import Link from "next/link";
import Image from "next/image";
import { auth, signOut } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { Button } from "~/components/ui/button";
import { redirect } from "next/navigation";
import { GithubIcon } from "lucide-react";

const allowedUserIds = new Set([
  "71181949-05ab-4011-a6c9-9f7f97d154e6", // daniel efres 
  "7052d1fe-bb96-4db4-9d90-0791d9a7b9c5", // carlos
  "6ad7e677-86c3-46d9-8041-9fff7e9f6132", // kai
  "094f333e-589e-4a6b-9a58-41893606fc06", // carfos
  "b00087f4-fbe1-465c-a74d-791d74278e7b", // eli
  "ec6e9191-6e59-49fa-a35a-71b99ce8b85e", // adrian
  "846fe944-93cd-4b07-8f47-bcd743f4ec39", // sam 
]);

export default async function Home() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!session) {
    redirect("/"); // if user is not signed up with github they are sent to landing
  }

  if (!userId || !allowedUserIds.has(userId)) {
    redirect("/"); // if user is not a goat they are sent to landing
  }

  const userApplication = await api.hacker.hasSubmittedForm();

  if (!userApplication) {
    redirect("/hacker/application");  // if user has not filled up the form for hacker (arent in hacker table) they are sent there
  }

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-background">
        <div className="container flex flex-col items-center justify-center gap-6 px-4 py-16">
          <Image className="md:w-200 md:h-200" src="/images/miragetsx.png" width={300} height={300} alt="kmodo" />
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">Dashboard (for now ...)</p>
            <form className="p-[1.5px]">
              <Button
                size="lg"
                className="rounded-full text-[#59BC89] text-md bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
                formAction={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                Log Out
              </Button>
            </form>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}

