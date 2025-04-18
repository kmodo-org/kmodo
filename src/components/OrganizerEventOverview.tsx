"use client";

import { Calendar, MapPin, Clock, TrendingUp } from "lucide-react";

/** Hard‑coded stub until your DB is wired up */
interface OrganizerEventOverviewProps {
  date: string;
  /** e.g. "10 AM – 6 PM" */
  times: string;
  location: string;
  timeUntilStart?: string;
  venueStatus?: string;
}

export function OrganizerEventOverview({
  date,
  times,
  location,
  timeUntilStart = "Starting in 3 weeks",
  venueStatus = "Venue ready",
}: OrganizerEventOverviewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <div className="bg-white/5 rounded-xl p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-[#a72828]/10 p-3 rounded-lg">
            <Calendar className="w-6 h-6 text-[#a72828]" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Event Date</p>
            <p className="text-white text-xl font-semibold">{date}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-[#a72828]">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm">{timeUntilStart}</span>
        </div>
      </div>

      <div className="bg-white/5 rounded-xl p-6">
    <div className="flex items-center space-x-4 mb-4">
      <div className="bg-[#a72828]/10 p-3 rounded-lg">
        <Clock className="w-6 h-6 text-[#a72828]" />
      </div>
      <div>
        <p className="text-gray-400 text-sm">Times</p>
        <p className="text-white text-xl font-semibold">{times}</p>
      </div>
    </div>
      <div className="flex items-center space-x-2 text-[#a72828]">
        <TrendingUp className="w-4 h-4" />
        <span className="text-sm">Schedule Finalized</span>
      </div>
    </div>

      <div className="bg-white/5 rounded-xl p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-[#a72828]/10 p-3 rounded-lg">
            <MapPin className="w-6 h-6 text-[#a72828]" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Location</p>
            <p className="text-white text-xl font-semibold">{location}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-[#a72828]">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm">{venueStatus}</span>
        </div>
      </div>
    </div>
  );
}
