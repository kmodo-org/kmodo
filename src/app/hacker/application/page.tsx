import { auth } from "~/server/auth";
import { api } from "~/trpc/server";
import { redirect } from "next/navigation";
import { InputForm } from "../../../components/inputform";

export default async function MemberApplicationPage() {
    const session = await auth();
   

    if (session?.user) {
      void api.post.getLatest.prefetch();
    }
    
    return (
      <main className="px-8 py-4">
        <InputForm />
      </main>
    );
}


