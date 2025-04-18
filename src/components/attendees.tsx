"use client";

import { Users, CheckCircle, TrendingUp } from "lucide-react";
import { Card } from "./card";

// import { api } from "~/trpc/react"; // uncomment when wired up

interface AttendeesCardProps {
  totalRegistered?: number;
  totalAccepted?: number;
  weeklyGrowth?: string;
}

export function AttendeesCard({
  totalRegistered = 500,  // temporary placeholder
  totalAccepted   = 320,  // temporary placeholder
  weeklyGrowth    = "+25 this week",
}: AttendeesCardProps) {
  /* When the query works:
  const { data: stats } = api.organizer.attendees.counts.useQuery();
  totalRegistered = stats?.totalRegistered ?? 0;
  totalAccepted   = stats?.totalAccepted   ?? 0;
  */

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-6 text-[#a72828]">Attendees</h2>
      <div className="flex items-center space-x-4 mb-6">
        <div className="bg-[#a72828]/10 p-3 rounded-lg">
          <Users className="w-6 h-6 text-[#a72828]" />
        </div>
        <div>
          <p className="text-gray-400 text-sm">Registered</p>
          <p className="text-white text-xl font-semibold">{totalRegistered}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="bg-[#a72828]/10 p-3 rounded-lg">
          <CheckCircle className="w-6 h-6 text-[#a72828]" />
        </div>
        <div>
          <p className="text-gray-400 text-sm">Accepted</p>
          <p className="text-white text-xl font-semibold">{totalAccepted}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2 mt-6 text-[#a72828]">
        <TrendingUp className="w-4 h-4" />
        <span className="text-sm">{weeklyGrowth}</span>
      </div>
    </Card>
  );
}
