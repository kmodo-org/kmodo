'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "~/components/ui/button";
import {
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";
import { SignOutButton } from "./sign-out-button";
import { 
  LayoutDashboard,  
  Users, 
  Calendar, 
  Settings, 
  Gem,
} from "lucide-react";

interface SidebarProps {
  userName: string;
  userImage: string | null;
}

export function OrganizerSidebar({ userName, userImage }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/organizer') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <div
      id="sidebar"
      className="fixed inset-y-0 left-0 z-50 w-72 -translate-x-full transform bg-[#1A1B2E] border-r border-white/5 transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-auto lg:z-0"
    >
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-screen rounded-lg hidden lg:flex"
      >
        <ResizablePanel defaultSize={20} minSize={15} maxSize={25}>
          <div className="h-full bg-[#1A1B2E] p-6 flex flex-col">
            <div className="mb-8 flex justify-center">
              <Link href="/">
                <Image src="/images/kmodoL.svg" width={160} height={160} alt="kmodo" className="w-auto h-24" />
              </Link>
            </div>
            
            <div className="flex flex-col items-center mb-8">
              <div className="w-20 h-20 rounded-full overflow-hidden mb-4 ring-2 ring-[#59BC89]/20">
                <Image
                  src={userImage ?? "/default-avatar.png"}
                  width={96}
                  height={96}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <p className="text-[#59BC89] font-bold text-lg">{userName}</p>
              </div>
            </div>

            <nav className="flex-1">
              <ul className="space-y-1">
                <li>
                  <Link 
                    href="/organizer" 
                    className={`flex items-center py-2 px-4 rounded-lg text-sm transition-colors ${
                      isActive('/organizer') 
                        ? 'text-[#59BC89] bg-white/5' 
                        : 'text-[#D9DBF1] hover:bg-white/5 hover:text-[#59BC89]'
                    }`}
                  >
                    <LayoutDashboard className="w-5 h-5 mr-3" />
                    DASHBOARD
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/organizer/event" 
                    className={`flex items-center py-2 px-4 rounded-lg text-sm transition-colors ${
                      isActive('/organizer/event') 
                        ? 'text-[#59BC89] bg-white/5' 
                        : 'text-[#D9DBF1] hover:bg-white/5 hover:text-[#59BC89]'
                    }`}
                  >
                    <Calendar className="w-5 h-5 mr-3" />
                    EVENT
                  </Link>   
                </li>
                <li>
                  <Link 
                    href="/organizer/members" 
                    className={`flex items-center py-2 px-4 rounded-lg text-sm transition-colors ${
                      isActive('/organizer/member') 
                        ? 'text-[#59BC89] bg-white/5' 
                        : 'text-[#D9DBF1] hover:bg-white/5 hover:text-[#59BC89]'
                    }`}
                  >
                    <Users className="w-5 h-5 mr-3" />
                    MEMBERS
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/organizer/sponsors" 
                    className={`flex items-center py-2 px-4 rounded-lg text-sm transition-colors ${
                      isActive('/organizer/sponsors') 
                        ? 'text-[#59BC89] bg-white/5' 
                        : 'text-[#D9DBF1] hover:bg-white/5 hover:text-[#59BC89]'
                    }`}
                  >
                    <Gem className="w-5 h-5 mr-3" />
                    SPONSORS
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/organizer/settings" 
                    className={`flex items-center py-2 px-4 rounded-lg text-sm transition-colors ${
                      isActive('/organizer/settings') 
                        ? 'text-[#59BC89] bg-white/5' 
                        : 'text-[#D9DBF1] hover:bg-white/5 hover:text-[#59BC89]'
                    }`}
                  >
                    <Settings className="w-5 h-5 mr-3" />
                    SETTINGS
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="mt-4 mb-4">
              <Link href="/hacker">
                <Button
                  size="sm"
                  className="w-full text-[#791c1c] bg-[#59BC89]/10 hover:bg-[#59BC89]/20 border border-[#59BC89]/30 font-medium"
                >
                  Back to Hacker Dashboard
                </Button>
              </Link>
            </div>
            <SignOutButton />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
} 