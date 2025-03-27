import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { api, HydrateClient } from "~/trpc/server";
import "~/styles/globals.css";
import Events from "~/components/events";

const events = api.hacker.getHacker();

export default async function EventsPage() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center bg-background p-8">
          
        {/* Rn just one card will be changed to dynamic cards with a fetch API */}
        <div className="pt-10">
          <Card className="bg-card">
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
                  className="w-full max-w-2xl mx-auto rounded-full px-6 py-5 bg-foreground text-black"
                />
                <Events />
              </CardContent>
            </div>
          </Card>
        </div>
      </main>
    </HydrateClient>
  );
}