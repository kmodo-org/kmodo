import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { redirect } from "next/navigation";

import { CountdownBanner } from "~/components/countdown";
import { OrganizerEventOverview } from "~/components/OrganizerEventOverview";
import { AttendeesCard } from "~/components/attendees";
import { ProjectsCard } from "~/components/projects";

import { MobileHeader } from "../../components/mobile-header";
import { OrganizerSidebar } from "~/components/organizersidebar";
import { OrganizerDashboardClient } from "~/components/organizer/OrganizerDashboardClient";

export default async function OrganizerDashboard() {
  /* ----- gate checks ----- */
  const session = await auth();
  if (!session) redirect("/");

  const isOrganizer = await api.organizer.isOrganizer();
  if (!isOrganizer) redirect("/");

  void api.post.getLatest.prefetch();

  /* ----- render ----- */
  return (
    <HydrateClient>
      <OrganizerDashboardClient isOrganizer={isOrganizer}>
        <div className="flex min-h-screen bg-[#1A1B2E] text-white">
          <OrganizerSidebar
            userName={session.user.name ?? ""}
            userImage={session.user.image ?? null}
            isOrganizer={isOrganizer}
          />
          <div className="flex-1 lg:pl-0 overflow-y-auto lg:overflow-hidden">
            <div className="lg:hidden">
              <MobileHeader />
            </div>
            <div className="grid gap-6 p-6 lg:p-10 grid-cols-1 lg:grid-cols-3">
              <div className="lg:col-span-3 pb-10">
                <CountdownBanner start="2025-05-23T10:00:00-04:00" />
              </div>
              <div className="lg:col-span-3">
                <OrganizerEventOverview
                  date="May 23 – 25 2025"
                  times="10 AM – 9 PM"
                  location="UCF Student Union"
                />
              </div>
              <div className="lg:col-span-3">
                <div className="grid gap-6 lg:grid-cols-2">
                  <AttendeesCard />
                  <ProjectsCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </OrganizerDashboardClient>
    </HydrateClient>
  );
}
