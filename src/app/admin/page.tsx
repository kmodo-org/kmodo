import { HydrateClient } from "~/trpc/server";
import "~/styles/globals.css";
import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { allowedUserIds } from "~/consts/goat";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/ui/footer";
import { AdminDashboard } from "~/components/admin/adminDashboard";

export default async function AdminPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (session == null) { // if the user is not logged in, redirect to the landing page
      redirect("/");
    }
  
  if (!userId || !allowedUserIds.has(userId)) { // if user isnt a goat they are not allowed
     redirect("/");
  }

  return (
    <HydrateClient>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <AdminDashboard />
        </main>
        <Footer />
      </div>
    </HydrateClient>
  );
}