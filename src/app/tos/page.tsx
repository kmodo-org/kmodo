import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { Card, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import TosChecked from "../tos/tosDetail/tos-checked";
import { api} from "~/trpc/server";
import TosSections from "../tos/tosDetail/tos-sections";

export default async function Tos() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  } else {
    void api.post.getLatest.prefetch();
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold mb-2">Terms of Service</CardTitle>
          <CardDescription className="text-lg">
            Last Updated: February, 2025
          </CardDescription>
        </CardHeader>
        <TosSections />
        <TosChecked />
      </Card>
    </div>
  );
}