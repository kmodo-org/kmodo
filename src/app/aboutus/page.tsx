import Link from "next/link";
import Image from "next/image";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { Button } from "~/components/ui/button";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/ui/footer";

export default async function AboutUs() {
  const session = await auth();
  if (session?.user) {
    void api.post.getLatest.prefetch();
  }
  return (
    <HydrateClient>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex min-h-screen flex-col items-center bg-background">
          <div className="container px-4 py-16 max-w-6xl">
            <div className="p-10 rounded-2xl mb-16 flex flex-col items-center text-center">
              <div className="flex flex-col items-center mb-6">
              <Image className="rounded-lg" src="/images/team.JPG" alt="team" width={800} height={500} />
              </div>
              <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem] mt-6 text-white">
              <span className="text-[#59BC89]">About Us</span>
              </h1>
              <p className="text-xl mt-8 max-w-3xl text-white">
                            We&apos;re the team behind Knight Hacks, on a mission to revolutionize how hackathons are organized and run.
                            </p>
            </div>

            {/* Mission Section */}
            <section className="mb-20">
              <h2 className="text-3xl font-bold mb-8 text-[#59BC89]">Our Mission</h2>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="text-lg mb-6">
                    At kmodo, we believe that every organization and community should have access to powerful, free tools to host amazing hackathons.
                  </p>
                  <p className="text-lg mb-6">
                                      We&apos;re on a mission to open source the entire hackathon management process, making it accessible for RSOs and organizations of all sizes to create transformative technical events.
                                    </p>
                  <p className="text-lg">
                    Our platform is built by hackathon organizers, for hackathon organizers - because we understand the unique challenges you face.
                  </p>
                </div>
                <div className="bg-white/5 p-8 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-[#59BC89]">The Problem</h3>
                  <p className="mb-4">
                    There are currently no free, comprehensive solutions for self-hosting hackathons. Existing platforms are either expensive, limited in features, or difficult to customize.
                  </p>
                  <p>
                                      We&apos;ve experienced these pain points firsthand as Knight Hacks organizers, which inspired us to build kmodo - the solution we wish we had.
                                    </p>
                </div>
              </div>
            </section>

            {/* Team Section */}
            <section className="mb-20">
              <h2 className="text-3xl font-bold mb-12 text-[#59BC89] text-center">Meet Our Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                <div className="flex flex-col items-center">
                    <div className="relative w-48 h-48 bg-white/10 rounded-full mb-4 overflow-hidden">
                    <Image src="/images/Adrian.JPG" alt="Team Member 1" fill className="object-cover" />
                    </div>
                  <h3 className="text-xl font-semibold">Adrian Osorio Blanchard</h3>
                  <p className="text-[#59BC89]">Founding Member</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="relative w-48 h-48 bg-white/10 rounded-full mb-4 overflow-hidden">
                    <Image src="/images/Daniel.JPG" alt="Team Member 1" fill className="object-cover" />
                    </div>
                  <h3 className="text-xl font-semibold">Daniel Efres</h3>
                  <p className="text-[#59BC89]">Founding Member</p>
                </div>
                
                <div className="flex flex-col items-center">
                <div className="relative w-48 h-48 bg-white/10 rounded-full mb-4 overflow-hidden">
                    <Image src="/images/Carlos.JPG" alt="Team Member 1" fill className="object-cover" />
                    </div>
                  <h3 className="text-xl font-semibold">Carlos Catala</h3>
                  <p className="text-[#59BC89]">Founding Member</p>
                </div>

                <div className="flex flex-col items-center">
                <div className="relative w-48 h-48 bg-white/10 rounded-full mb-4 overflow-hidden">
                    <Image src="/images/Carfos.JPG" alt="Team Member 1" fill className="object-cover" />
                    </div>
                  <h3 className="text-xl font-semibold">Carlos Lopez</h3>
                  <p className="text-[#59BC89]">Founding Member</p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="relative w-48 h-48 bg-white/10 rounded-full mb-4 overflow-hidden">
                    <Image src="/images/Kai.jpg" alt="Team Member 1" fill className="object-cover" />
                    </div>
                  <h3 className="text-xl font-semibold">Kai Sprunger</h3>
                  <p className="text-[#59BC89]">Founding Member</p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="relative w-48 h-48 bg-white/10 rounded-full mb-4 overflow-hidden">
                    <Image src="/images/Sam.JPG" alt="Team Member 1" fill className="object-cover" />
                    </div>
                  <h3 className="text-xl font-semibold">Samuel Borges</h3>
                  <p className="text-[#59BC89]">Founding Member</p>
                </div>

              </div>
            </section>

            <section className="text-center pb-16">
              <h2 className="text-3xl font-bold mb-8 text-[#59BC89]">Join Our Mission</h2>
              <p className="text-lg mb-8 max-w-3xl mx-auto">
                              Help us make hackathon management accessible to everyone. Whether you&apos;re a hacker, organizer, or supporter, there&apos;s a place for you in the kmodo community.
                            </p>
              <div className="flex justify-center">
                <Link href={session?.user ? "/hacker" : "/"}>
                  <Button size="lg" className="rounded-full text-[#59BC89] text-md bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20">
                    {session?.user ? "Go to Dashboard" : "Get Started"}
                  </Button>
                </Link>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </HydrateClient>
  );
}