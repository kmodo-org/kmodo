import Image from "next/image";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "~/components/ui/card";
import {HydrateClient } from "~/trpc/server";

export default async function Home() {

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-background">
        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle>Events</CardTitle>
            <CardDescription>
              A list of events
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