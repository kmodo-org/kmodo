'use client';

import { Clock, Users, Code2 } from "lucide-react";

// will also be modified to pull from db later
export function ProgressSection() {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[#59BC89] font-semibold text-lg">Your Progress</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/5 rounded-lg p-4 border border-white/5 hover:bg-white/10 transition-colors">
          <div className="flex items-center space-x-3 mb-2">
            <Clock className="w-5 h-5 text-[#59BC89]" />
            <p className="text-gray-400 text-sm">Time Remaining</p>
          </div>
          <p className="text-white text-xl font-semibold">00:00:00</p>
        </div>

        <div className="bg-white/5 rounded-lg p-4 border border-white/5 hover:bg-white/10 transition-colors">
          <div className="flex items-center space-x-3 mb-2">
            <Users className="w-5 h-5 text-[#59BC89]" />
            <p className="text-gray-400 text-sm">Team Members</p>
          </div>
          <p className="text-white text-xl font-semibold">4/4</p>
        </div>

        <div className="bg-white/5 rounded-lg p-4 border border-white/5 hover:bg-white/10 transition-colors">
          <div className="flex items-center space-x-3 mb-2">
            <Code2 className="w-5 h-5 text-[#59BC89]" />
            <p className="text-gray-400 text-sm">Submissions</p>
          </div>
          <p className="text-white text-xl font-semibold">In Progress</p>
        </div>
      </div>
    </div>
  );
} 