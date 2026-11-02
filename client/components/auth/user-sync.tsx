"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@clerk/nextjs";
import { syncUser } from "@/lib/api";

export default function UserSync() {
  const { isLoaded, isSignedIn, userId, getToken } = useAuth();

  const syncedUserId = useRef<string | null | undefined>(null);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !userId) {
      return;
    }

    if (syncedUserId.current === userId) {
      return;
    }

    let cancelled = false;

    async function synchronize() {
      try {
        const response = await syncUser(getToken);

        if (response.status < 200 || response.status >= 300) {
          console.error(
            "HomiCare user synchronization failed:",
            response.data,
          );
          return;
        }

        if (!cancelled) {
          syncedUserId.current = userId;
          console.info("HomiCare user synchronized successfully.");
        }
      } catch (error) {
        console.error(
          "HomiCare user synchronization failed:",
          error,
        );
      }
    }

    void synchronize();

    return () => {
      cancelled = true;
    };
  }, [isLoaded, isSignedIn, userId, getToken]);

  return null;
}