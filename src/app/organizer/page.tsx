import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { redirect } from "next/navigation";
import { MobileHeader } from "../../components/mobile-header";
import { EventOverview } from "../../components/event-overview";
import { EventDetails } from "../../components/event-details";
import { ProgressSection } from "../../components/progress-section";
import { NoHackathonView } from "../../components/no-hackathon-view";
import { OrganizerSidebar } from "~/components/organizersidebar";
import { OrganizerDashboardClient } from "~/components/organizer/OrganizerDashboardClient";


interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function OrganizerDashboard({ searchParams }: PageProps) {
  const params = await searchParams;
  const session = await auth();

  if (session == null) { // if the user is not logged in, redirect to the landing page
    redirect("/");
  }

  // Note: organizer status will be checked on the client-side
  // and redirect to application page if needed
    
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
      <OrganizerDashboardClient>
        <div className="flex min-h-screen bg-[#1A1B2E] text-white">
          {session ? (
            <OrganizerSidebar userName={session.user.name ?? ""}
             userImage={session.user.image ?? null} />
          ) : null}
          
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
      </OrganizerDashboardClient>
    </HydrateClient>
  );
}
