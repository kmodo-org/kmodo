"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import CompanyCards from "~/components/companies";
import { Footer } from "~/components/ui/footer";
import { Navbar } from "~/components/Navbar";
import { api } from "~/trpc/react";

export default function Sponsors() {
  const { data: isSponsor, isLoading } = api.sponsor.isSponsor.useQuery();

  return (
    <div className="flex min-h-screen flex-col items-center text-black">
      <Navbar />

      <Card className="w-full max-w-screen overflow-hidden rounded-lg drop-shadow-2xl pb-32">
        <div className="m-8 rounded-lg p-6">
          <CardHeader className="items-center text-center">
            <CardTitle className="mb-2 text-5xl font-bold tracking-tight text-accent">
              SPONSORS
            </CardTitle>
            <CardDescription>
              <p className="text-lg font-bold text-foreground">
                LIST OF ALL SPONSORS!
              </p>
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col items-center">
            <Input
              placeholder="Search companies..."
              className="mx-auto w-full max-w-2xl rounded-full bg-destructive px-6 py-5 text-black"
            />

            <div className="w-full max-w-7xl mt-6">
              <CompanyCards />
            </div>

            {!isLoading && (
              <Link
                href="/sponsor"
                className="mt-48 inline-block rounded-lg bg-[#59BC89] px-6 py-4 font-semibold text-white hover:bg-[#4aa276]"
              >
                {isSponsor ? "SPONSOR DASHBOARD" : "BECOME A SPONSOR!"}
              </Link>
            )}
          </CardContent>
        </div>
      </Card>

      <Footer />
    </div>
  );
}
