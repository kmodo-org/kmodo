import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { HydrateClient } from "~/trpc/server";
import "~/styles/globals.css";
import Events from "~/components/events";

export default async function EventsPage() {
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