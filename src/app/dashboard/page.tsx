import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { redirect } from "next/navigation";
import { MobileHeader } from "./components/mobile-header";
import { Sidebar } from "./components/sidebar";
import { EventOverview } from "./components/event-overview";
import { EventDetails } from "./components/event-details";
import { ProgressSection } from "./components/progress-section";
import { NoHackathonView } from "./components/no-hackathon-view";

const allowedUserIds = new Set([
  "71181949-05ab-4011-a6c9-9f7f97d154e6", // daniel efres 
  "7052d1fe-bb96-4db4-9d90-0791d9a7b9c5", // carlos
  "6ad7e677-86c3-46d9-8041-9fff7e9f6132", // kai
  "094f333e-589e-4a6b-9a58-41893606fc06", // carfos
  "b00087f4-fbe1-465c-a74d-791d74278e7b", // eli
  "ec6e9191-6e59-49fa-a35a-71b99ce8b85e" // adrian
]);

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function Home({ searchParams }: PageProps) {
  const session = await auth();
  const userId = session?.user?.id;
  const params = await searchParams;

  if (session == null) { // if the user is not logged in, redirect to the landing page
    redirect("/");
  }

  // if (!userId || !allowedUserIds.has(userId)) { // if user isnt a goat they are not allowed
  //   redirect("/");
  // }

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  // Temp hackathon check
  const hasHackathon = params.test === "with-hackathon";
  
  const currentEvent = hasHackathon ? {
    name: "KnightHacks VIII",
    date: "Oct 25-27, 2025",
    location: "UCF",
    participants: "500+",
    description: "Join us for a weekend at KnightHacks VIII", // all of ts will be deleted after we incorporate the real data from the db
    schedule: [
      { time: "5:00 PM", event: "Check-in Opens" },
      { time: "6:30 PM", event: "Opening Ceremony" },
      { time: "7:30 PM", event: "Team Formation" },
      { time: "8:00 PM", event: "Hacking Begins" },
    ],
    timeUntilStart: "Starting in 2 weeks", // will be tracker
    participantGrowth: "+50 this week", // will be tracker
    venueStatus: "Venue ready" // will be tracker
  } : null;

  return (
    <HydrateClient>
      <div className="flex min-h-screen bg-[#1A1B2E] text-white">
        <Sidebar userName={session.user.name ?? ""}
         userImage={session.user.image ?? null} />
        
        <div className="flex-1 lg:pl-0 overflow-y-auto lg:overflow-hidden">
          <div className="lg:hidden">
            <MobileHeader />
          </div>

          <div className="p-6 lg:p-8">
            {currentEvent ? (
              <>
                <EventOverview
                  date={currentEvent.date}
                  participants={currentEvent.participants}
                  location={currentEvent.location}
                  timeUntilStart={currentEvent.timeUntilStart}
                  participantGrowth={currentEvent.participantGrowth}
                  venueStatus={currentEvent.venueStatus}
                />

                <EventDetails
                  name={currentEvent.name}
                  description={currentEvent.description}
                  schedule={currentEvent.schedule}
                />

                <ProgressSection />
              </>
            ) : (
              <NoHackathonView />
            )}
          </div>
        </div>
      </div>
    </HydrateClient>
  );
}
