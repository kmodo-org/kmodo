import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { OrganizerSidebar } from "~/components/organizersidebar";
import { MobileHeader } from "~/components/mobile-header";
import { SupportTicket } from "~/components/support";
import { api } from "~/trpc/server";

export default async function OrganizerSupport() {
  const session = await auth();
  if (!session) redirect("/");

  const isOrganizer = await api.organizer.isOrganizer();
  if (!isOrganizer) redirect("/");

  return (
    <div className="flex min-h-screen bg-[#1A1B2E] text-white">
      <OrganizerSidebar
        userName={session.user.name ?? ""}
        userImage={session.user.image ?? null}
        isOrganizer={isOrganizer}
      />
      <div className="flex-1 lg:pl-0 overflow-y-auto lg:overflow-hidden">
        <div className="p-6 lg:p-10 h-full">
          
            <h1 className="text-3xl font-bold mb-6">Support</h1>
            <p className="text-gray-400 text-lg pb-10">
              Enter a support ticket to get help with any issues you may be facing. Our team is here to assist you!
            </p>
            <SupportTicket />
          </div>
        </div>
      </div>
  );
}
