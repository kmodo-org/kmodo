// ✅ SERVER COMPONENT — no "use client"
import { Sidebar } from "~/components/sidebar";
import { api } from "~/trpc/server";

interface SidebarWrapperProps {
  userName: string;
  userImage: string | null;
}

export default async function SidebarWrapper({
  userName,
  userImage,
}: SidebarWrapperProps) {
    
  const isOrganizer = await api.organizer.isOrganizer(); 

  return (
    <Sidebar
      userName={userName}
      userImage={userImage}
      isOrganizer={isOrganizer}
    />
  );
}
