import { Clock, Award, Trophy } from "lucide-react";
import { LearnMoreDialog } from "./learn-more-dialog";
import { ScheduleDialog } from "./schedule-dialog";

interface EventDetailsProps {
  name: string;
  description: string;
  schedule: Array<{ time: string; event: string }>;
}

export function EventDetails({ name, description, schedule }: EventDetailsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white/5 rounded-xl p-6 border border-white/5">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[#59BC89] font-semibold text-lg">{name}</h3>
          <LearnMoreDialog
            eventName={name}
            description={description}
            prizePool="$100,000,000,000" //ts will all change once we get the query working
            categories="3"
          />
        </div>
        <p className="text-gray-300 leading-relaxed mb-4">{description}</p>
        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <Award className="w-4 h-4" />
            <span>Prize Pool: $100,000,000,000</span>
          </div>
          <div className="flex items-center space-x-1">
            <Trophy className="w-4 h-4" />
            <span>3 Categories</span>
          </div>
        </div>
      </div>
      <div className="bg-white/5 rounded-xl p-6 border border-white/5">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[#59BC89] font-semibold text-lg">Today&#39;s Schedule</h3>
          <ScheduleDialog schedule={schedule} />
        </div>
        <div className="space-y-4">
          {schedule.map((item, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="bg-[#59BC89]/10 p-2 rounded-lg">
                <Clock className="w-5 h-5 text-[#59BC89]" />
              </div>
              <div>
                <p className="text-white font-medium">{item.time}</p>
                <p className="text-gray-400">{item.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 