import { Button } from "~/components/ui/button";
import { Calendar, Search, Users, Trophy, Target, Award, Star, ChevronRight, FileText } from "lucide-react";
import Link from "next/link";
import { db } from "~/server/db";
import { users, events } from "~/server/db/schema";
import { count, eq, desc, sql } from "drizzle-orm";
import Image from "next/image";

async function getStats(userId?: string) {
  // Get total hackathons participated (placeholder for now)
  const participated = userId ? 0 : 0;
      
  // Get all events (we'll handle the "upcoming" filtering in JavaScript)
  const allEvents = await db
    .select({
      id: events.id,
      name: events.name,
      date: events.date,
      startTime: events.starttime,
      endTime: events.endtime,
      location: events.location,
    })
    .from(events)
    .orderBy(events.date);
  
  // Filter to only include upcoming events (date >= today)
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to beginning of day
  
  const upcomingEvents = allEvents
    .filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= today;
    })
    .slice(0, 3); // Limit to 3 events
      
  return {
    participated,
    upcomingEvents
  };
}

export async function NoHackathonView({ userId }: { userId?: string }) {
  const { participated, upcomingEvents } = await getStats(userId);

  const formatDate = (date: Date | string) => {
    const dateObj = date instanceof Date ? date : new Date(date);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }).format(dateObj);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pt-4 px-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Welcome!</h1>
          <p className="text-gray-400 mt-2">Ready to find your next hackathon?</p>
        </div>
        <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-4 w-full sm:w-auto">
          <Link href="/events" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-[#59BC89] hover:bg-[#59BC89]/90 text-white whitespace-nowrap text-sm">
              <Search className="w-4 h-4 mr-2" />
              Browse Events
            </Button>
          </Link>
          <Link href="/find-team" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-[#59BC89] hover:bg-[#59BC89]/90 text-white whitespace-nowrap text-sm">
              <Users className="w-4 h-4 mr-2" />
              Find Team
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400">Total Hackathons</h3>
            <Trophy className="w-5 h-5 text-[#59BC89]" />
          </div>
          <p className="text-2xl font-bold text-white">{participated}</p>
        </div>
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400">Wins</h3>
            <Award className="w-5 h-5 text-[#59BC89]" />
          </div>
          <p className="text-2xl font-bold text-white">0</p>
        </div>
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400">Global Rank</h3>
            <Target className="w-5 h-5 text-[#59BC89]" />
          </div>
          <p className="text-2xl font-bold text-white">-</p>
        </div>
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400">Points</h3>
            <Star className="w-5 h-5 text-[#59BC89]" />
          </div>
          <p className="text-2xl font-bold text-white">0</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        <div className="bg-white/5 rounded-xl p-6 border border-white/10 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Upcoming Events</h2>
            <Link href="/events" className="text-[#59BC89] hover:text-[#59BC89]/90 text-sm flex items-center">
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          {upcomingEvents.length > 0 ? (
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <Link href={`/events/${event.id}`} key={event.id}>
                  <div className="bg-white/5 hover:bg-white/10 p-4 rounded-lg border border-white/10 transition-colors flex items-center">
                    <div className="mr-4 flex-shrink-0">
                      <div className="w-12 h-12 bg-[#59BC89]/20 rounded-md flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-[#59BC89]" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium truncate">{event.name}</h3>
                      <p className="text-gray-400 text-sm">
                        {formatDate(event.date)} at {event.location}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </Link>
              ))}
              
              <Link href="/events">
                <Button variant="outline" className="w-full mt-4 border-white/10 text-white hover:bg-white/5 hover:text-white">
                  View All Events
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[calc(100%-3rem)]">
              <div className="bg-[#59BC89]/10 p-6 rounded-full mb-6">
                <Calendar className="w-12 h-12 text-[#59BC89]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No Upcoming Events</h3>
              <p className="text-gray-400 mb-6 text-center">
                Browse our events to find your next hackathon
              </p>
              <Link href="/events">
                <Button className="bg-[#59BC89] hover:bg-[#59BC89]/90 text-white">
                  <Search className="w-5 h-5 mr-2" />
                  Browse Events
                </Button>
              </Link>
            </div>
          )}
        </div>

        <div className="bg-white/5 rounded-xl p-6 border border-white/10 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Find Your Team</h2>
            <Link href="/find-team" className="text-[#59BC89] hover:text-[#59BC89]/90 text-sm flex items-center">
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center h-[calc(100%-3rem)] ">
            <div className="bg-[#59BC89]/10 p-6 rounded-full mb-6 ">
              <Users className="w-12 h-12 text-[#59BC89]" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Start Building Your Team</h3>
            <p className="text-gray-400 mb-6 text-center">
              Connect with other hackers and form your dream team
            </p>
            <Link href="/find-team">
              <Button className="bg-[#59BC89] hover:bg-[#59BC89]/90 text-white">
                <Users className="w-5 h-5 mr-2" />
                Find Team
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white/5 rounded-xl p-6 border  border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Your Applications</h2>
        </div>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="bg-[#59BC89]/10 p-6 rounded-full mb-6">
            <FileText className="w-12 h-12 text-[#59BC89]" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No Applications Yet</h3>
          <p className="text-gray-400 mb-6 text-center">
            Apply to hackathons to showcase your skills and earn points
          </p>
          <Link href="/events">
            <Button className="bg-[#59BC89] hover:bg-[#59BC89]/90 text-white">
              <Search className="w-5 h-5 mr-2" />
              Find Hackathons
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
