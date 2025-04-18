import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import SidebarWrapper from "~/components/sidebarwrapper";

export default async function Settings() {
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
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
      </div>
    </div>
  );
}
