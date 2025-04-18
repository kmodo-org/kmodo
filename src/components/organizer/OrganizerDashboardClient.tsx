"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function OrganizerDashboardClient({
  children,
  isOrganizer,
}: {
  children: React.ReactNode;
  isOrganizer: boolean;   // ← comes from the server
}) {
  const router = useRouter();

  // client‑side guard only if the server somehow let a non‑organizer through
  useEffect(() => {
    if (!isOrganizer) {
      toast.info("You need to apply to become an organizer first");
      router.push("/organizer/application");
    }
  }, [isOrganizer, router]);

  // (optional) show nothing while redirecting
  if (!isOrganizer) return null;

  return <>{children}</>;
}
