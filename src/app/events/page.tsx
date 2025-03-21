import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";

import { redirect } from "next/navigation";
import { api, HydrateClient } from "~/trpc/server";
import { auth } from "~/server/auth";


const allowedUserIds = new Set([
  "71181949-05ab-4011-a6c9-9f7f97d154e6", // daniel efres 
  "7052d1fe-bb96-4db4-9d90-0791d9a7b9c5", // carlos
  "6ad7e677-86c3-46d9-8041-9fff7e9f6132", // kai
  "094f333e-589e-4a6b-9a58-41893606fc06", // carfos
  "b00087f4-fbe1-465c-a74d-791d74278e7b", // eli
  "ec6e9191-6e59-49fa-a35a-71b99ce8b85e" // adrian
]);

export default async function Home() {

  const session = await auth();
      const userId = session?.user?.id;
    
      if (!userId || !allowedUserIds.has(userId)) {
        redirect("/");
      }
    
      if (session?.user) {
        void api.post.getLatest.prefetch();
      }

  return (

    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center bg-background p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">HACK SEASON</h1>
          <p className="text-muted-foreground text-lg">FIND HACKATHONS ACROSS THE WORLD!</p>
        </div>

          <Input 
            placeholder="Search hackathons..." 
            className="w-full max-w-2xl mx-auto rounded-full px-6 py-5"
          />


        {/* Rn just one card will be changed to dynamic cards with a fetch API */}
        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle>Events</CardTitle>
            <CardDescription>
              Find hackathons across the world!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Coming soon...</p>
          </CardContent>
          <CardFooter>
          </CardFooter>
        </Card>
      </main>
    </HydrateClient>
  );
}