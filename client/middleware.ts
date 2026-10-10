import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
])

const isHouseholdRoute = createRouteMatcher([
  "/dashboard(.*)",
])

const isHelperRoute = createRouteMatcher([
  "/helper/dashboard(.*)",
])

const isAdminRoute = createRouteMatcher([
  "/admin/dashboard(.*)",
])

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) {
    return
  }

  const { userId } = await auth()

  if (!userId) {
    return (await auth()).redirectToSignIn({
      returnBackUrl: req.url,
    })
  }

  /*
   * Role checking will be added after the user's role
   * is stored in Clerk metadata.
   *
   * For now, authentication protects the dashboards.
   */

  if (
    isHouseholdRoute(req) ||
    isHelperRoute(req) ||
    isAdminRoute(req)
  ) {
    return
  }
})

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}