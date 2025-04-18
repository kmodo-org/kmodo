"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { HelpCircle } from "lucide-react";
import { usePathname } from "next/navigation";

export function SupportTicket() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pathname = usePathname();

  const isOrganizer = pathname?.includes("/organizer");
  const isHacker = pathname?.includes("/hacker");

  const getThemeColors = () => {
    if (isHacker) {
      return {
        primary: "#59BC89",
        bg: "bg-[#59BC89]/10",
        text: "text-[#59BC89]",
        hover: "hover:bg-[#59BC89]/80",
        button: "bg-[#59BC89] hover:bg-white hover:text-[#59BC89] hover:font-bold",
      };
    }
    if (isOrganizer) {
      return {
        primary: "#FF6B6B",
        bg: "bg-[#FF6B6B]/10",
        text: "text-[#FF6B6B]",
        hover: "hover:bg-[#FF6B6B]/80",
        button: "bg-[#FF6B6B] hover:bg-white hover:text-[#FF6B6B] hover:font-bold",
      };
    }
    return {
      primary: "#59BC89",
      bg: "bg-[#59BC89]/10",
      text: "text-[#59BC89]",
      hover: "hover:bg-[#59BC89]/80",
      button: "bg-[#59BC89] hover:bg-white hover:text-[#59BC89] hover:font-bold",
    };
  };

  const colors = getThemeColors();

  const createTicket = api.support.create.useMutation({
    onSuccess: () => {
      toast.success("Support ticket submitted successfully");
      setTitle("");
      setDescription("");
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to submit support ticket");
      setIsSubmitting(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    createTicket.mutate({
      title: title.trim(),
      description: description.trim(),
      type: isOrganizer ? "organizer" : "hacker",
    });
  };

  return (
    <div className="w-full bg-white/5 rounded-xl p-6 border border-white/5">
      <div className="flex items-center space-x-4 mb-6">
        <div className={`${colors.bg} p-3 rounded-lg`}>
          <HelpCircle className={`w-6 h-6 ${colors.text}`} />
        </div>
        <div>
          <p className="text-gray-400 text-sm">Support</p>
          <h3 className={`${colors.text} font-semibold text-lg`}>Submit a Support Ticket</h3>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium text-gray-300">
            Title
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Brief description of your issue"
            disabled={isSubmitting}
            className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium text-gray-300">
            Description
          </label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detailed description of your issue"
            className="min-h-[150px] bg-white/5 border-white/10 text-white placeholder:text-gray-500"
            disabled={isSubmitting}
          />
        </div>

        <Button
          type="submit"
          className={`w-full text-white transition-colors ${colors.button}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Ticket"}
        </Button>
      </form>
    </div>
  );
}