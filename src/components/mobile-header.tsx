'use client';

import Image from "next/image";
import { Menu } from "lucide-react";

export function MobileHeader() {
  return (
    <div className="sticky top-0 z-30 bg-[#2D2647] p-4 border-b border-white/10">
      <div className="flex items-center justify-between">
        <Image src="/images/kmodoL.svg" width={120} height={120} alt="kmodo" className="w-auto h-12" />
        <button
          onClick={() => {
            const sidebar = document.getElementById('sidebar'); 
            sidebar?.classList.toggle('-translate-x-full');
          }}
          className="text-white p-2"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
} 