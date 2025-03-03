import { auth } from "~/server/auth";
import { api } from "~/trpc/server";
import { redirect } from "next/navigation";
import { InputForm } from "./components/inputform";

export default async function MemberApplicationPage() {
    const session = await auth();

    if (session == null) { // if the user is not logged in, redirect to the landing page
        redirect("/");
    }
  
    const isHacker = await api.hacker.getHacker();
  
    if (isHacker) { // if the user is already a hacker, redirect to the dashboard
      return redirect("/dashboard");
    }
  
    return (
      <main className="px-8 py-4">
        <InputForm />
      </main>
    );
}


