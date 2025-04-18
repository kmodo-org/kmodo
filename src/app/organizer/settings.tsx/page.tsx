import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { redirect } from "next/navigation";
import { MobileHeader } from "../../../components/mobile-header";
import { OrganizerSidebar } from "~/components/organizersidebar";
import { OrganizerDashboardClient } from "~/components/organizer/OrganizerDashboardClient";

export default async function OrganizerDashboard() {
  const session = await auth();
  if (!session) redirect("/");

  const isOrganizer = await api.organizer.isOrganizer();
  if (!isOrganizer) redirect("/");

  void api.post.getLatest.prefetch();

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
            <main>Hello this is settings</main>
          </div>
        </div>
      </OrganizerDashboardClient>
    </HydrateClient>
  );
}
