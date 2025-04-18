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

interface LearnMoreDialogProps {
  eventName: string;
  description: string;
  prizePool: string;
  categories: string;
}

export function LearnMoreDialog({ eventName, description, prizePool, categories }: LearnMoreDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-[#59BC89] hover:text-[#59BC89] hover:bg-[#59BC89]/10">
          Learn More
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#1A1B2E] border-white/5 text-white">
        <DialogHeader>
          <DialogTitle className="text-[#59BC89]">{eventName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-gray-300">{description}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <span>Prize Pool: {prizePool}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>{categories} Categories</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 