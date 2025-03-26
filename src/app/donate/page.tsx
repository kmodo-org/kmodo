import Link from "next/link";
import Image from "next/image";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { Button } from "~/components/ui/button";
import { redirect } from "next/navigation";

const allowedUserIds = new Set([
  "71181949-05ab-4011-a6c9-9f7f97d154e6", // daniel efres 
  "7052d1fe-bb96-4db4-9d90-0791d9a7b9c5", // carlos
  "6ad7e677-86c3-46d9-8041-9fff7e9f6132", // kai
  "094f333e-589e-4a6b-9a58-41893606fc06", // carfos
  "b00087f4-fbe1-465c-a74d-791d74278e7b", // eli
  "ec6e9191-6e59-49fa-a35a-71b99ce8b85e" // adrian
]);


export default async function DonatePage() {
  const session = await auth();
  const userId = session?.user?.id;

  // if (session?.user) {
  //   void api.post.getLatest.prefetch();
  // }

  return (
    <HydrateClient>

      <main className="flex min-h-screen flex-col items-center justify-center bg-background">
        <div className="container flex flex-col items-center justify-center gap-6 px-4 py-16">
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">Donate (for now ...)</p>
            <div className="flex flex-col items-center justify-center gap-4"></div>
          </div>
        </div>
      </main>
    </HydrateClient>
    );
  }