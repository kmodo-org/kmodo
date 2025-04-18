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
  Settings,
  Briefcase,
  Calendar1
} from "lucide-react";

interface SponsorSidebarProps {
    sponsorName: string;
    sponsorImage: string | null;
}

export function SponsorSideBar({ sponsorName, sponsorImage }: SponsorSidebarProps) {
//   const pathname = usePathname();

//   const isActive = (path: string) => pathname.startsWith(path);

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
          <div className="flex flex-col justify-between h-full bg-[#1A1B2E] p-6">
            <div className="mb-8 flex justify-center">
              <Link href="/">
                <Image src="/images/kmodoL.svg" width={160} height={160} alt="kmodo" className="w-auto h-24" />
              </Link>
            </div>

            {/* User Info */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-20 h-20 rounded-full overflow-hidden mb-4 ring-2 ring-[#59BC89]/20">
                <Image
                  src={sponsorImage ?? "/default-avatar.png"}
                  width={96}
                  height={96}
                  alt="Profile"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <p className="text-[#59BC89] font-bold text-lg text-center">{sponsorName}</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1">
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/"
                    className={`flex items-center py-2 px-4 rounded-lg text-white hover:text-[#59BC89] text-sm transition-color`}
                  >
                    <LayoutDashboard className="w-5 h-5 mr-3" />DASHBOARD
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className={"flex items-center py-2 px-4 rounded-lg text-white hover:text-[#59BC89] text-sm transition-color"}
                  >
                    <Briefcase className="w-5 h-5 mr-3" />
                    COMPANIES
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className={"flex items-center py-2 px-4 rounded-lg text-white hover:text-[#59BC89] text-sm transition-colors "}
                  >
                    <Calendar1 className="w-5 h-5 mr-3" />
                    EVENTS
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className={"flex items-center py-2 px-4 rounded-lg text-white hover:text-[#59BC89] text-sm transition-colors"}
                  >
                    <Settings className="w-5 h-5 mr-3" />
                    SETTINGS
                  </Link>
                </li>
                
              </ul>
            </nav>

            {/* Footer Buttons */}
            <div className="space-y-3 pt-4">
              
              <SignOutButton />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
