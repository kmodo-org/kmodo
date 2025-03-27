import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";

// import { redirect } from "next/navigation";
// import { api, HydrateClient } from "~/trpc/server";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {

  // const session = await auth();
  //     const userId = session?.user?.id;
    
  //     if (!userId || !allowedUserIds.has(userId)) {
  //       redirect("/");
  //     }
    
  //     if (session?.user) {
  //       void api.post.getLatest.prefetch();
  //     }

  return (

    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center bg-background p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">HACK SEASON</h1>
          <p className="text-muted-foreground text-lg">
            FIND HACKATHONS ACROSS THE WORLD!
          </p>
        </div>

        <Input
          placeholder="Search hackathons..."
          className="w-full max-w-2xl mx-auto rounded-full px-6 py-5"
        />

        <EventCards />
      </main>
    </HydrateClient>
  );
}