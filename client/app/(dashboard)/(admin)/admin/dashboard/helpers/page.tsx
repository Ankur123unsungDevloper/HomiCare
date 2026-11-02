"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useAuth } from "@clerk/nextjs"
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileCheck2,
  MapPin,
  MoreHorizontal,
  Search,
  ShieldCheck,
  UserRound,
  XCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type VerificationStatus = "Pending" | "Verified" | "Rejected"
type HelperStatus = "Active" | "Pending" | "Suspended"

type Helper = {
  id: string
  name: string
  service: string
  location: string
  experience: string
  rating: number | null
  reviews: number | null
  verification: VerificationStatus
  status: HelperStatus | ""
  submitted: string
}

type HelperApplication = {
  id: string
  fullName?: string | null
  services?: string[] | null
  area?: string | null
  city?: string | null
  experience?: string | number | null
  status?: string | null
  createdAt?: string | null
}

const verificationFilters = [
  "All",
  "Pending",
  "Verified",
  "Rejected",
] as const

function VerificationBadge({ status }: { status: VerificationStatus }) {
  if (status === "Verified") {
    return (
      <Badge
        variant="outline"
        className="gap-1 border-emerald-200 bg-emerald-50 text-emerald-700"
      >
        <CheckCircle2 className="h-3 w-3" />
        Verified
      </Badge>
    )
  }

  if (status === "Rejected") {
    return (
      <Badge
        variant="outline"
        className="gap-1 border-red-200 bg-red-50 text-red-700"
      >
        <XCircle className="h-3 w-3" />
        Rejected
      </Badge>
    )
  }

  return (
    <Badge
      variant="outline"
      className="gap-1 border-amber-200 bg-amber-50 text-amber-700"
    >
      <Clock3 className="h-3 w-3" />
      Pending
    </Badge>
  )
}

function StatusBadge({ status }: { status: HelperStatus }) {
  const classes = {
    Active: "border-emerald-200 bg-emerald-50 text-emerald-700",
    Pending: "border-amber-200 bg-amber-50 text-amber-700",
    Suspended: "border-red-200 bg-red-50 text-red-700",
  }

  return (
    <Badge
      variant="outline"
      className={`font-medium ${classes[status]}`}
    >
      {status}
    </Badge>
  )
}

function HelperAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">
      {initials}
    </div>
  )
}

export default function AdminHelpersPage() {
  const { getToken } = useAuth()

  const [helpers, setHelpers] = useState<Helper[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [search, setSearch] = useState("")
  const [verification, setVerification] =
    useState<(typeof verificationFilters)[number]>("All")

  useEffect(() => {
    async function fetchHelpers() {
      try {
        setLoading(true)
        setError("")

        const token = await getToken()

        if (!token) {
          throw new Error("Authentication required")
        }

        const API_URL =
          process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"

        const response = await fetch(
          `${API_URL}/api/admin/helper-applications`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        const data = await response.json()

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Failed to fetch helper applications"
          )
        }

        const formattedHelpers: Helper[] = data.applications.map(
          (application: HelperApplication) => {
            const verification: VerificationStatus =
              application.status === "VERIFIED" ||
              application.status === "APPROVED"
                ? "Verified"
                : application.status === "REJECTED"
                  ? "Rejected"
                  : "Pending"

            return {
              id: application.id,
              name: application.fullName || "",
              service: application.services?.join(", ") || "",
              location: [application.area, application.city]
                .filter(Boolean)
                .join(", "),
              experience: application.experience
                ? `${application.experience} years`
                : "",
              rating: null,
              reviews: null,
              verification,
              status: "",
              submitted: application.createdAt
                ? new Date(application.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    }
                  )
                : "",
            }
          }
        )

        setHelpers(formattedHelpers)
      } catch (err) {
        console.error("Helper applications fetch error:", err)

        setError(
          err instanceof Error ? err.message : "Something went wrong"
        )
      } finally {
        setLoading(false)
      }
    }

    fetchHelpers()
  }, [getToken])

  const filteredHelpers = useMemo(() => {
    return helpers.filter((helper) => {
      const query = search.toLowerCase().trim()

      const matchesSearch =
        !query ||
        helper.name.toLowerCase().includes(query) ||
        helper.service.toLowerCase().includes(query) ||
        helper.location.toLowerCase().includes(query)

      const matchesVerification =
        verification === "All" || helper.verification === verification

      return matchesSearch && matchesVerification
    })
  }, [helpers, search, verification])

  const totalHelpers = helpers.length

  const pendingVerification = helpers.filter(
    (helper) => helper.verification === "Pending"
  ).length

  const verifiedHelpers = helpers.filter(
    (helper) => helper.verification === "Verified"
  ).length

  const rejectedHelpers = helpers.filter(
    (helper) => helper.verification === "Rejected"
  ).length

  const showList = !loading && !error

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <section className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            HELPER MANAGEMENT
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            Helpers
          </h1>

          <p className="mt-2 max-w-2xl text-muted-foreground">
            Review helper profiles, verification information, and
            account status.
          </p>
        </div>

        <Link href="/admin/dashboard/users">
          <Button variant="outline">
            View all users
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </section>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border bg-card p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
            <UserRound className="h-5 w-5" />
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            Total helpers
          </p>

          <p className="mt-1 text-3xl font-bold">{totalHelpers}</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Registered care providers
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
            <Clock3 className="h-5 w-5" />
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            Pending verification
          </p>

          <p className="mt-1 text-3xl font-bold">
            {pendingVerification}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Need admin review
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
            <ShieldCheck className="h-5 w-5" />
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            Verified helpers
          </p>

          <p className="mt-1 text-3xl font-bold">{verifiedHelpers}</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Approved profiles
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
            <FileCheck2 className="h-5 w-5" />
          </div>

          <p className="mt-5 text-sm text-muted-foreground">Rejected</p>

          <p className="mt-1 text-3xl font-bold">{rejectedHelpers}</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Profiles not approved
          </p>
        </div>
      </section>

      {/* Verification queue */}
      {pendingVerification > 0 && (
        <section className="rounded-2xl border bg-muted/30 p-5">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-background">
                <ShieldCheck className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-semibold">
                  Verification queue needs attention
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  {pendingVerification} helper profiles are waiting
                  for administrative review.
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={() => setVerification("Pending")}
            >
              Review pending
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      )}

      {/* Search and filters */}
      <section className="space-y-4">
        <div className="relative max-w-xl">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search helpers, services, or locations..."
            className="h-11 pl-10"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Verification
          </span>

          {verificationFilters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setVerification(item)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                verification === item
                  ? "border-foreground bg-foreground text-background"
                  : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* Helper table */}
      <section className="overflow-hidden rounded-2xl border bg-card">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div>
            <h2 className="font-semibold">Helper directory</h2>

            <p className="mt-1 text-xs text-muted-foreground">
              {filteredHelpers.length} helpers shown
            </p>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="px-5 py-16 text-center text-sm text-muted-foreground">
            Loading helper applications...
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="px-5 py-16 text-center">
            <p className="text-sm text-red-600">{error}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Please refresh the page and try again.
            </p>
          </div>
        )}

        {/* Desktop */}
        {showList && (
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30 text-left">
                  <th className="px-5 py-3 font-medium text-muted-foreground">
                    Helper
                  </th>
                  <th className="px-5 py-3 font-medium text-muted-foreground">
                    Service
                  </th>
                  <th className="px-5 py-3 font-medium text-muted-foreground">
                    Experience
                  </th>
                  <th className="px-5 py-3 font-medium text-muted-foreground">
                    Rating
                  </th>
                  <th className="px-5 py-3 font-medium text-muted-foreground">
                    Verification
                  </th>
                  <th className="px-5 py-3 font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="w-12 px-3 py-3" />
                </tr>
              </thead>

              <tbody>
                {filteredHelpers.map((helper) => (
                  <tr
                    key={helper.id}
                    className="border-b last:border-b-0 hover:bg-muted/20"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <HelperAvatar name={helper.name} />

                        <div>
                          <p className="font-medium">{helper.name}</p>

                          <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {helper.location}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {helper.service}
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {helper.experience}
                    </td>

                    <td className="px-5 py-4">
                      {helper.rating !== null && (
                        <span className="font-medium">
                          {helper.rating}
                        </span>
                      )}

                      {helper.reviews !== null && (
                        <span className="ml-1 text-xs text-muted-foreground">
                          ({helper.reviews})
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <VerificationBadge status={helper.verification} />
                    </td>

                    <td className="px-5 py-4">
                      {helper.status && (
                        <StatusBadge status={helper.status} />
                      )}
                    </td>

                    <td className="px-3 py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Link
                              href={`/admin/dashboard/helpers/${helper.id}`}
                            >
                              Review profile
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuItem>
                            View service history
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          {helper.status === "Suspended" ? (
                            <DropdownMenuItem>
                              Restore helper
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem>
                              Suspend helper
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Mobile */}
        {showList && (
          <div className="divide-y md:hidden">
            {filteredHelpers.map((helper) => (
              <div key={helper.id} className="p-4">
                <div className="flex gap-3">
                  <HelperAvatar name={helper.name} />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium">{helper.name}</p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {helper.service}
                        </p>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Link
                              href={`/admin/dashboard/helpers/${helper.id}`}
                            >
                              Review profile
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuItem>
                            View service history
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem>
                            {helper.status === "Suspended"
                              ? "Restore helper"
                              : "Suspend helper"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <VerificationBadge status={helper.verification} />

                      {helper.status && (
                        <StatusBadge status={helper.status} />
                      )}
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                      <span>{helper.experience}</span>

                      {helper.rating !== null && (
                        <span>
                          ★ {helper.rating}
                          {helper.reviews !== null &&
                            ` (${helper.reviews})`}
                        </span>
                      )}

                      <span className="col-span-2 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {helper.location}
                      </span>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4 w-full"
                    >
                      <Link
                        href={`/admin/dashboard/helpers/${helper.id}`}
                      >
                        Review profile
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filteredHelpers.length === 0 && (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>

            <h3 className="mt-4 font-semibold">No helpers found</h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Try changing your search or verification filter.
            </p>

            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearch("")
                setVerification("All")
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </section>

      {/* Verification policy */}
      <section className="rounded-2xl border bg-muted/30 p-5">
        <div className="flex gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />

          <div>
            <h3 className="font-semibold">Verification review</h3>

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Approval should only be granted after the required
              helper information has been reviewed according to
              HomiCare&apos;s verification policy. The dashboard should
              never treat UI status alone as proof of verification.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}