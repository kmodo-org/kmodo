import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import SidebarWrapper from "~/components/sidebarwrapper";

export default async function FindTeam() {
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
        <h1 className="text-3xl font-bold mb-6">Ranked</h1>
        <p className="text-gray-400 text-lg">
          Ranked hackathons are a great way to showcase your skills and compete with others!
        </p>
      </div>
    </div>
  );
}
