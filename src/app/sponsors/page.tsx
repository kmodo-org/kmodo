import {Card, CardContent, CardDescription, CardHeader, CardTitle, } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import CompanyCards from "~/components/companies";
import { Footer } from "~/components/ui/footer";
import { Navbar } from "~/components/Navbar";

export default function sponsors() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start text-black">
      <Navbar />
      <Card className="max-w-screen w-full overflow-hidden rounded-lg drop-shadow-2xl">
        <div className="m-8 rounded-lg bg-[#1a1b2e] p-6">
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

          <CardContent className="flex flex-col items-center gap-4">
            <Input
              placeholder="Search companies..."
              className="mx-auto w-full max-w-2xl rounded-full bg-destructive px-6 py-5 text-black"
            />
            <CompanyCards />
          </CardContent>
        </div>
      </Card>
      <Footer />
    </div>
  );
}
