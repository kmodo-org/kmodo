import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { HydrateClient } from "~/trpc/server";
import "~/styles/globals.css";
import Events from "~/components/events";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/ui/footer";
import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { allowedUserIds } from "~/consts/goat";

export default async function EventsPage() {

  // const session = await auth();
  // const userId = session?.user?.id;

  // if (session == null) { // if the user is not logged in, redirect to the landing page
  //     redirect("/");
  //   }
  
  //   if (!userId || !allowedUserIds.has(userId)) { // if user isnt a goat they are not allowed
  //      redirect("/");
  //   }
  return (
    <HydrateClient>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex flex-col items-center p-8">
          <Card className="w-full max-w-screen shadow-lg rounded-lg overflow-hidden bg-secondary">
            <div className="p-6">
              <CardHeader className="items-center text-center">
                <CardTitle className="mb-2 text-accent text-5xl font-bold tracking-tight">
                  HACKATHONS
                </CardTitle>
                <CardDescription>
                  <p className="text-foreground text-lg font-bold">
                    FIND HACKATHONS ACROSS THE WORLD!
                  </p>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <Input
                  placeholder="Search hackathons..."
                  className="w-full max-w-2xl mx-auto rounded-full px-6 py-5 bg-destructive text-black"
                />
                <Events />
              </CardContent>
            </div>
          </Card>
        </main>
        <Footer />
      </div>
    </HydrateClient>
  );
}