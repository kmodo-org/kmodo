import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { allowedUserIds } from "~/consts/goat";
import { redirect } from "next/navigation";
import { api, HydrateClient } from "~/trpc/server";
import "~/styles/globals.css";
import Events from "~/components/events";
import { auth } from "~/server/auth";


export default async function EventsPage() {

  const session = await auth();
  const userId = session?.user?.id;

  if (session == null) { // if the user is not logged in, redirect to the landing page
      redirect("/");
    }
  
    if (!userId || !allowedUserIds.has(userId)) { // if user isnt a goat they are not allowed
       redirect("/");
    }
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center p-8 bg-secondary">
        <Card>
          <div className="p-6">
            <CardHeader className="items-center">
              <CardTitle className="mb-2 items-center">
                <span className="items-center text-accent text-5xl font-bold tracking-tight">HACKATHONS</span>
              </CardTitle>
              <CardDescription>
                <div className="text-center mb-8">
                  <p className="text-foreground text-lg font-bold">FIND HACKATHONS ACROSS THE WORLD!</p>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Search hackathons..."
                className="w-full max-w-2xl mx-auto rounded-full px-6 py-5 bg-destructive text-black"
              />
              <Events />
            </CardContent>
          </div>
        </Card>
      </main>
    </HydrateClient>
  );
}