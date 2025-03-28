"use server";
import { signIn } from "~/server/auth";

export async function signInWithGithub() {
    await signIn("github", {
        redirectTo: "/hacker/application",
    });
}