"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { toast } from "sonner";

export function OrganizerDashboardClient({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: isOrganizer, isLoading } = api.hacker.isOrganizer.useQuery();

  useEffect(() => {
    if (!isLoading && isOrganizer === false) {
      toast.info("You need to apply to become an organizer first");
      router.push("/organizer/application");
    }
  }, [isOrganizer, isLoading, router]);

  // Show loading while checking organizer status
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#59BC89]"></div>
      </div>
    );
  }

  // Only render children if user is an organizer
  return <>{children}</>;
} 