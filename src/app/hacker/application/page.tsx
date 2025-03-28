import { auth } from "~/server/auth";
import { api } from "~/trpc/server";
import { redirect } from "next/navigation";
import { InputForm } from "./components/inputform";
import { allowedUserIds } from "~/consts/goat";
import Hide from "~/components/goatOnly";

export default async function MemberApplicationPage() {
    const session = await auth();
    const userId = session?.user?.id;
    const isHacker = await api.hacker.getHacker();

    <Hide /> 
  
    if (isHacker) { // if the user is already a hacker, redirect to the dashboard
      return redirect("/dashboard");
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


