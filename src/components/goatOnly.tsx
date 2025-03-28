import { redirect } from "next/navigation";
import { allowedUserIds } from "~/consts/goat";
import { auth } from "~/server/auth";

export default async function GoatOnly({ children }: { children: React.ReactNode }) {
    const session = await auth();
    const userId = session?.user?.id;

    if (!session) {
        redirect("/");
    }
    
    if (!userId || !allowedUserIds.has(userId)) {
        redirect("/");
    }

    return <>{children}</>;
}

