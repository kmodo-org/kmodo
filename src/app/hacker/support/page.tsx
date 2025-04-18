import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import SidebarWrapper from "~/components/sidebarwrapper";
import { SupportTicket } from "~/components/support";

export default async function HackerSupport() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen bg-[#1A1B2E] text-white">
      <SidebarWrapper
        userName={session.user.name ?? ""}
        userImage={session.user.image ?? null}
      />
      
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Support</h1>
        <p className="text-gray-400 text-lg pb-10">
          Enter a support ticket to get help with any issues you may be facing. Our team is here to assist you!
        </p>
        <SupportTicket />

      </div>

    </div>
  );
}
