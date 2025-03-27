import { Calendar, Users, MapPin, TrendingUp } from "lucide-react";

interface EventOverviewProps {
  date: string;
  participants: string;
  location: string;
  timeUntilStart?: string;
  participantGrowth?: string;
  venueStatus?: string;
}

export function EventOverview({ 
  date, 
  participants, 
  location,
  timeUntilStart = "Starting in 2 weeks",
  participantGrowth = "+50 this week",
  venueStatus = "Venue ready" // will all be tracked in the future with db
}: EventOverviewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <div className="bg-white/5 rounded-xl p-6 border border-white/5">
        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-[#59BC89]/10 p-3 rounded-lg">
            <Calendar className="w-6 h-6 text-[#59BC89]" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Event Date</p>
            <p className="text-white text-xl font-semibold">{date}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-[#59BC89]">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm">{timeUntilStart}</span>
        </div>
      </div>

      <div className="bg-white/5 rounded-xl p-6 border border-white/5">
        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-[#59BC89]/10 p-3 rounded-lg">
            <Users className="w-6 h-6 text-[#59BC89]" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Participants</p>
            <p className="text-white text-xl font-semibold">{participants}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-[#59BC89]">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm">{participantGrowth}</span>
        </div>
      </div>
      <div className="bg-white/5 rounded-xl p-6 border border-white/5">
        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-[#59BC89]/10 p-3 rounded-lg">
            <MapPin className="w-6 h-6 text-[#59BC89]" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Location</p>
            <p className="text-white text-xl font-semibold">{location}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-[#59BC89]">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm">{venueStatus}</span>
        </div>
      </div>
    </div>
  );
} 