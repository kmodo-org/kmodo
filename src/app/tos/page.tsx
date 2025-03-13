import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import { api } from "~/trpc/server";
import TosSections from "./tosDetail/tos-sections";

export default async function Tos() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  // Prefetch data for the Terms of Service page
  void api.post.getLatest.prefetch();

  return (
    <div className="min-h-screen flex flex-col text-white pt-2">
      <header className="p-4 flex items-center justify-center">
        <div className="flex justify-center items-center">
          <Image
            src="/kmodoL.svg"
            alt="Kmodo Logo"
            width={512}
            height={256}
          />
        </div>
      </header>
      <h1 className="text-3xl md:text-7xl font-bold text-center">
        Terms of Service
      </h1>
      <main className="flex-grow flex flex-col items-center space-y-8">
        <Card className="w-full max-w-7xl shadow-none">
          <CardHeader className="px-4 py-3 sm:px-6 sm:py-4 text-center">
            <div className="w-full">
              <div className="text-xl sm:text-2xl font-bold">
                Last updated January 2025
              </div>
            </div>
            <CardTitle>
              <div className="mt-2 sm:mt-4 text-lg sm:text-2xl font-bold">
                Please read the Terms of Service before using Kmodo.
              </div>
            </CardTitle>
            <CardDescription>
              <div className="mt-2 sm:mt-4 text-base sm:text-lg text-white">
                By accessing or using our services, you agree to the following terms.
              </div>
            </CardDescription>
          </CardHeader>
          <TosSections />
        </Card>
      </main>

      <footer className="py-6">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <p className="text-sm">&copy; 2025 Kmodo. All rights reserved.</p>
          <div className="flex space-x-6 text-sm">
            <a className="hover:text-white">Privacy Policy</a>
            <a href="/tos" className="hover:text-white">
              Terms of Service
            </a>
            <a href="mailto:admin@kmodo.orhg" className="hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
