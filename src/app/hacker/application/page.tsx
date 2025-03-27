import { auth } from "~/server/auth";
import { api } from "~/trpc/server";
import { redirect } from "next/navigation";
import { InputForm } from "./components/inputform";

const allowedUserIds = new Set([
  "71181949-05ab-4011-a6c9-9f7f97d154e6", // daniel efres 
  "7052d1fe-bb96-4db4-9d90-0791d9a7b9c5", // carlos
  "6ad7e677-86c3-46d9-8041-9fff7e9f6132", // kai
  "094f333e-589e-4a6b-9a58-41893606fc06", // carfos
  "b00087f4-fbe1-465c-a74d-791d74278e7b", // eli
  "ec6e9191-6e59-49fa-a35a-71b99ce8b85e" // adrian
]);


export default async function MemberApplicationPage() {
    const session = await auth();
    const userId = session?.user?.id;
    const isHacker = await api.hacker.getHacker();

    if (session == null) { // if the user is not logged in, redirect to the landing page
        redirect("/");
    }
  
    if (isHacker) { // if the user is already a hacker, redirect to the dashboard
      return redirect("/dashboard");
    }

    if (!userId || !allowedUserIds.has(userId)) { // if user isnt a goat they are not allowed
      redirect("/");
    }

    if (session?.user) {
      void api.post.getLatest.prefetch();
    }
    

    return (
      <main className="px-8 py-4">
        <InputForm />
      </main>
    );
}


