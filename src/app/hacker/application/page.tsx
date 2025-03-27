import { auth } from "~/server/auth";
import { api } from "~/trpc/server";
import { redirect } from "next/navigation";
import { InputForm } from "./components/inputform";
import { allowedUserIds } from "~/consts/goat";

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


