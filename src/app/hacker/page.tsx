import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { redirect } from "next/navigation";
import { MobileHeader } from "../../components/mobile-header";
import SidebarWrapper from "~/components/sidebarwrapper";
import { EventOverview } from "../../components/event-overview";
import { EventDetails } from "../../components/event-details";
import { ProgressSection } from "../../components/progress-section";
import { NoHackathonView } from "../../components/no-hackathon-view";

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const session = await auth();
  const userId = session?.user?.id;

  if (!session) {
    redirect("/");
  }

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  // TEMP fake hackathon check — replace with real DB logic later
  const hasHackathon = params.test === "with-hackathon";

  const currentEvent = hasHackathon
    ? {
        name: "KnightHacks VIII",
        date: "Oct 25-27, 2025",
        location: "UCF",
        participants: "500+",
        description: "Join us for a weekend at KnightHacks VIII",
        schedule: [
          { time: "5:00 PM", event: "Check-in Opens" },
          { time: "6:30 PM", event: "Opening Ceremony" },
          { time: "7:30 PM", event: "Team Formation" },
          { time: "8:00 PM", event: "Hacking Begins" },
        ],
        timeUntilStart: "Starting in 2 weeks",
        participantGrowth: "+50 this week",
        venueStatus: "Venue ready",
      }
    : null;

  return (
    <HydrateClient>
      <div className="flex min-h-screen bg-[#1A1B2E] text-white">
        <SidebarWrapper
          userName={session.user.name ?? ""}
          userImage={session.user.image ?? null}
        />

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
