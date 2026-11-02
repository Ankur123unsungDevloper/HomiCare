"use client";

import { SignOutButton } from "@clerk/nextjs";

export default function SignOut() {
  return (
    <SignOutButton>
      <button type="button">
        Sign Out
      </button>
    </SignOutButton>
  );
}