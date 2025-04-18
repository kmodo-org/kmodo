'use client';

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { ChevronRight } from "lucide-react";

interface ScheduleDialogProps {
  schedule: Array<{ time: string; event: string }>;
}
// god shad is so op
export function ScheduleDialog({ schedule }: ScheduleDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-[#59BC89] hover:text-[#59BC89] hover:bg-[#59BC89]/10">
          Full Schedule
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#1A1B2E] border-white/5 text-white">
        <DialogHeader>
          <DialogTitle className="text-[#59BC89]">Full Schedule</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {schedule.map((item, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="bg-[#59BC89]/10 p-2 rounded-lg">
                <span className="text-[#59BC89]">{item.time}</span>
              </div>
              <div>
                <p className="text-white font-medium">{item.event}</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
} 