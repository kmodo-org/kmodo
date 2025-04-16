'use server';

import { signOut } from "~/server/auth";

export async function handleSignOut() {
  await signOut({ redirectTo: "/" });
} 