'use client';

import { Button } from "~/components/ui/button";
import { handleSignOut } from "../server/api/routers/actions";

export function RedSignoutButton() {
  return (
    <form action={handleSignOut}>
      <Button
        size="sm"
        className="w-full text-[#a72828] bg-white/5  hover:bg-[#a72828]/20 border border-[#a72828]/30 font-medium"
      >
        Log Out
      </Button>
    </form>
  );
}