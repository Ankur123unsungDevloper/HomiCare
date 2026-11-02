"use client";

import { useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { syncUser, testProtectedApi } from "@/lib/api";

export default function ApiTestPage() {
const { isLoaded, isSignedIn, getToken } = useAuth();
const { user } = useUser();

const [result, setResult] = useState("");
const [loading, setLoading] = useState(false);

async function handleProtectedTest() {
setLoading(true);
setResult("");

try {
  const response = await testProtectedApi(getToken);

  setResult(
    `HTTP Status: ${response.status}\n\n${JSON.stringify(
      response.data,
      null,
      2,
    )}`,
  );
} catch (error) {
  setResult(
    error instanceof Error ? error.message : "An unexpected error occurred.",
  );
} finally {
  setLoading(false);
}

}

async function handleSyncUser() {
setLoading(true);
setResult("");

try {
  if (!user) {
    throw new Error("Clerk user profile is unavailable.");
  }

  const email = user.primaryEmailAddress?.emailAddress;

  if (!email) {
    throw new Error("Your Clerk account does not have a primary email.");
  }

  const response = await syncUser(getToken);

  setResult(
    `HTTP Status: ${response.status}\n\n${JSON.stringify(
      response.data,
      null,
      2,
    )}`,
  );
} catch (error) {
  setResult(
    error instanceof Error ? error.message : "An unexpected error occurred.",
  );
} finally {
  setLoading(false);
}

}

if (!isLoaded) {
return <p className="p-8">Loading authentication...</p>;
}

return ( <main className="mx-auto max-w-2xl space-y-5 p-8"> <h1 className="text-2xl font-bold">
HomiCare API Tests </h1>

  <p>
    Clerk status: {isSignedIn ? "Signed in" : "Not signed in"}
  </p>

  <div className="flex flex-wrap gap-3">
    <button
      type="button"
      onClick={handleProtectedTest}
      disabled={!isSignedIn || loading}
      className="rounded-md bg-black px-4 py-2 text-white disabled:opacity-50"
    >
      Test Protected API
    </button>

    <button
      type="button"
      onClick={handleSyncUser}
      disabled={!isSignedIn || !user || loading}
      className="rounded-md bg-green-700 px-4 py-2 text-white disabled:opacity-50"
    >
      Sync User to Database
    </button>
  </div>

  {result && (
    <pre className="overflow-auto whitespace-pre-wrap rounded-md bg-gray-100 p-4 text-sm text-black">
      {result}
    </pre>
  )}
</main>

);
}
