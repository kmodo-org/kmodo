import { redirect } from "next/navigation";
import { allowedUserIds } from "~/consts/goat";
import { auth } from "~/server/auth";

export default async function Hide() {
  const session = await auth();
  const userId = session?.user?.id;

  if (session == null) { // if the user is not logged in, redirect to the landing page
    redirect("/");
  }
    
  if (!userId || !allowedUserIds.has(userId)) { // if user isnt a goat they are not allowed
    redirect("/");
  }

}
