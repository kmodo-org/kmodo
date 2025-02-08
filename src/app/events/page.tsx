import Image from "next/image";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
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