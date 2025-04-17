'use client';

import { Button } from "~/components/ui/button";
import { handleSignOut } from "../server/api/routers/actions";

export function SignOutButton() {
  return (
    <form action={handleSignOut}>
      <Button
        size="sm"
        className="w-full text-[#59BC89] bg-white/10  hover:bg-[#59BC89]/20 border border-[#59BC89]/30 font-medium"
      >
        Log Out
      </Button>
    </form>
  );
}