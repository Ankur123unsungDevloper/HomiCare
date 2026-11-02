"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export default function AuthRedirectPage() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      router.replace("/sign-in");
      return;
    }

    let cancelled = false;

    async function redirectByRole() {
      try {
        const token = await getToken();

        if (!token) {
          throw new Error("No authentication token available.");
        }

        const response = await fetch(`${API_URL}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ?? "Unable to retrieve account role.",
          );
        }

        const destinations: Record<string, string> = {
          USER: "/dashboard",
          HELPER: "/helper/dashboard",
          ADMIN: "/admin/dashboard",
        };

        const destination = destinations[data.role];

        if (!destination) {
          throw new Error("Unknown account role.");
        }

        if (!cancelled) {
          router.replace(destination);
        }
      } catch (error) {
        console.error("Role-based redirect failed:", error);

        if (!cancelled) {
          router.replace("/sign-in");
        }
      }
    }

    void redirectByRole();

    return () => {
      cancelled = true;
    };
  }, [isLoaded, isSignedIn, getToken, router]);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <p>Checking your account and preparing your dashboard...</p>
    </main>
  );
}