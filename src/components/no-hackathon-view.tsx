import { Button } from "~/components/ui/button";
import { Calendar, Search, Users, Trophy, Target, Award, Star, ChevronRight, FileText } from "lucide-react";
import Link from "next/link";

export function NoHackathonView() { // will all be adjusted down the line with db to ensure no static data
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
          <p className="text-2xl font-bold text-white">0</p>
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
