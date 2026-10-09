"use client"

import { useUser } from "@clerk/nextjs"

import { ROLE_ROUTES, ROLES } from "@/lib/auth/roles"

// Where a signed-in household user should land to apply as a helper.
// Change this to whatever route you build for the helper application.
const HELPER_ONBOARDING = "/helper/dashboard"

export function useBecomeHelperHref() {
  const { isLoaded, isSignedIn, user } = useUser()

  // Clerk hasn't finished loading yet. Fall back to the onboarding route;
  // the middleware will send a signed-out visitor to sign in anyway.
  if (!isLoaded) return HELPER_ONBOARDING

  // Not signed in -> sign up first, then come back to the helper page.
  if (!isSignedIn) {
    return `/sign-up?redirect_url=${encodeURIComponent(HELPER_ONBOARDING)}`
  }

  // Already a helper -> no need to apply again, go to their dashboard.
  if (user.publicMetadata?.role === ROLES.HELPER) {
    return ROLE_ROUTES.HELPER
  }

  // Signed in as a household user -> helper application page.
  return HELPER_ONBOARDING
}