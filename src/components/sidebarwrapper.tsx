"use client";

import { Sidebar } from "~/components/sidebar";
import { api } from "~/trpc/react";

interface SidebarWrapperProps {
  userName: string;
  userImage: string | null;
}

export default function SidebarWrapper({ userName, userImage }: SidebarWrapperProps) {
  const { data: isOrganizer } = api.hacker.isOrganizer.useQuery();

  return (
    <Sidebar
      userName={userName}
      userImage={userImage}
      isOrganizer={isOrganizer ?? false}
    />
  );
}
