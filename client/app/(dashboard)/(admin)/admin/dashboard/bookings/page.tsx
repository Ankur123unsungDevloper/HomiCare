"use client"

import * as React from "react"
import { useAuth } from "@clerk/nextjs"
import {
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  MapPin,
  MoreHorizontal,
  Search,
  UserRound,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Loader2,
  RefreshCw,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

/* ---------------------------------------------
   Types
--------------------------------------------- */

type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"

type Booking = {
  id: string
  serviceType: string
  planType: string
  assignmentType: "CUSTOMER_SELECTED" | "PLATFORM_ASSIGNED"
  status: BookingStatus
  startAt: string
  endAt: string | null
  address: string
  city: string
  area: string
  createdAt: string

  household: {
    id: string
    firstName: string | null
    lastName: string | null
    email: string
  }

  helper: {
    id: string
    firstName: string | null
    lastName: string | null
    email: string
  } | null
}

type BookingStatistics = {
  total: number
  pending: number
  confirmed: number
  inProgress: number
  completed: number
  cancelled: number
}

type Pagination = {
  page: number
  limit: number
  totalBookings: number
  totalPages: number
}

type BookingApiResponse = {
  success: boolean
  bookings: Booking[]
  statistics: BookingStatistics
  pagination: Pagination
}

type BookingStatusFilter =
  | "All"
  | "Pending"
  | "Confirmed"
  | "In Progress"
  | "Completed"
  | "Cancelled"

/* ---------------------------------------------
   Constants
--------------------------------------------- */

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"
).replace(/\/$/, "")

const statusFilters: BookingStatusFilter[] = [
  "All",
  "Pending",
  "Confirmed",
  "In Progress",
  "Completed",
  "Cancelled",
]

const statusToApiValue: Record<
  Exclude<BookingStatusFilter, "All">,
  BookingStatus
> = {
  Pending: "PENDING",
  Confirmed: "CONFIRMED",
  "In Progress": "IN_PROGRESS",
  Completed: "COMPLETED",
  Cancelled: "CANCELLED",
}

const apiStatusToLabel: Record<BookingStatus, BookingStatusFilter> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
}

/* ---------------------------------------------
   Helpers
--------------------------------------------- */

function getFullName(
  person: {
    firstName: string | null
    lastName: string | null
  } | null,
) {
  if (!person) return "Not assigned"

  const name = [person.firstName, person.lastName]
    .filter(Boolean)
    .join(" ")
    .trim()

  return name || "Name unavailable"
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date))
}

function formatTime(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(date))
}

function getLocation(booking: Booking) {
  return [booking.area, booking.city]
    .filter(Boolean)
    .join(", ")
}

function getBookingDisplayId(id: string) {
  return `BK-${id.slice(-8).toUpperCase()}`
}

/* ---------------------------------------------
   Main Page
--------------------------------------------- */

export default function AdminBookingsPage() {
  const { getToken } = useAuth()

  const [bookings, setBookings] = React.useState<Booking[]>([])
  const [statistics, setStatistics] = React.useState<BookingStatistics>({
    total: 0,
    pending: 0,
    confirmed: 0,
    inProgress: 0,
    completed: 0,
    cancelled: 0,
  })

  const [pagination, setPagination] = React.useState<Pagination>({
    page: 1,
    limit: 10,
    totalBookings: 0,
    totalPages: 0,
  })

  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] =
    React.useState<BookingStatusFilter>("All")

  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  /* ---------------------------------------------
     Fetch Bookings
  --------------------------------------------- */

  const fetchBookings = React.useCallback(
    async (signal?: AbortSignal) => {
      try {
        setLoading(true)
        setError(null)

        const token = await getToken()

        if (!token) {
          throw new Error("Authentication required. Please sign in again.")
        }

        const params = new URLSearchParams({
          page: String(pagination.page),
          limit: String(pagination.limit),
        })

        if (search.trim()) {
          params.set("search", search.trim())
        }

        if (statusFilter !== "All") {
          params.set("status", statusToApiValue[statusFilter])
        }

        const response = await fetch(
          `${API_URL}/api/admin/bookings?${params.toString()}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            signal,
            cache: "no-store",
          },
        )

        const data: BookingApiResponse & {
          message?: string
        } = await response.json()

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Unable to retrieve bookings.",
          )
        }

        setBookings(data.bookings)
        setStatistics(data.statistics)
        setPagination(data.pagination)
      } catch (error) {
        if (
          error instanceof Error &&
          error.name === "AbortError"
        ) {
          return
        }

        console.error("Fetching admin bookings failed:", error)

        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong while loading bookings.",
        )
      } finally {
        if (!signal?.aborted) {
          setLoading(false)
        }
      }
    },
    [
      getToken,
      pagination.page,
      pagination.limit,
      search,
      statusFilter,
    ],
  )

  React.useEffect(() => {
    const controller = new AbortController()

    const timeout = setTimeout(() => {
      fetchBookings(controller.signal)
    }, 300)

    return () => {
      clearTimeout(timeout)
      controller.abort()
    }
  }, [fetchBookings])

  /* ---------------------------------------------
     Filter Handling
  --------------------------------------------- */

  function handleStatusChange(status: BookingStatusFilter) {
    setStatusFilter(status)

    setPagination((previous) => ({
      ...previous,
      page: 1,
    }))
  }

  function handleSearchChange(value: string) {
    setSearch(value)

    setPagination((previous) => ({
      ...previous,
      page: 1,
    }))
  }

  const stats = {
    total: statistics.total,
    pending: statistics.pending,
    active: statistics.confirmed + statistics.inProgress,
    completed: statistics.completed,
    cancelled: statistics.cancelled,
  }

  /* ---------------------------------------------
     Render
  --------------------------------------------- */

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Booking Management
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Monitor household bookings, helper assignments and service activity.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => fetchBookings()}
          disabled={loading}
        >
          <RefreshCw
            className={`mr-2 size-4 ${loading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {/* Stats */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard
          label="Total bookings"
          value={stats.total}
          icon={CalendarDays}
        />

        <StatCard
          label="Pending"
          value={stats.pending}
          icon={Clock3}
          tone="warning"
        />

        <StatCard
          label="Active"
          value={stats.active}
          icon={UserRound}
        />

        <StatCard
          label="Completed"
          value={stats.completed}
          icon={CheckCircle2}
          tone="success"
        />

        <StatCard
          label="Cancelled"
          value={stats.cancelled}
          icon={XCircle}
          tone="danger"
        />
      </div>

      {/* Filters */}

      <section className="rounded-xl border bg-card">

        <div className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">

          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search booking, household, helper..."
              className="pl-9"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline">
                Status: {statusFilter}
                <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              {statusFilters.map((status) => (
                <DropdownMenuItem
                  key={status}
                  onClick={() => handleStatusChange(status)}
                >
                  {status}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

        </div>

        {/* Status Tabs */}

        <div className="flex gap-1 overflow-x-auto border-t px-4 pt-3">
          {statusFilters.map((status) => (
            <button
              key={status}
              onClick={() => handleStatusChange(status)}
              className={`whitespace-nowrap rounded-md px-3 py-2 text-sm transition-colors ${
                statusFilter === status
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Loading State */}

        {loading && (
          <div className="flex flex-col items-center justify-center gap-3 border-t p-12">
            <Loader2 className="size-8 animate-spin text-muted-foreground" />

            <p className="text-sm text-muted-foreground">
              Loading bookings...
            </p>
          </div>
        )}

        {/* Error State */}

        {!loading && error && (
          <div className="border-t p-12 text-center">
            <XCircle className="mx-auto size-8 text-destructive" />

            <h3 className="mt-3 font-medium">
              Unable to load bookings
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              {error}
            </p>

            <Button
              variant="outline"
              className="mt-4"
              onClick={() => fetchBookings()}
            >
              Try again
            </Button>
          </div>
        )}

        {/* Booking Content */}

        {!loading && !error && (
          <>
            {/* Desktop Table */}

            <div className="mt-3 hidden overflow-x-auto lg:block">
              <table className="w-full text-sm">

                <thead className="border-t bg-muted/30">
                  <tr>
                    <th className="px-5 py-3 text-left font-medium text-muted-foreground">
                      Booking
                    </th>

                    <th className="px-5 py-3 text-left font-medium text-muted-foreground">
                      Household
                    </th>

                    <th className="px-5 py-3 text-left font-medium text-muted-foreground">
                      Helper
                    </th>

                    <th className="px-5 py-3 text-left font-medium text-muted-foreground">
                      Service
                    </th>

                    <th className="px-5 py-3 text-left font-medium text-muted-foreground">
                      Schedule
                    </th>

                    <th className="px-5 py-3 text-left font-medium text-muted-foreground">
                      Status
                    </th>

                    <th className="px-5 py-3 text-right font-medium text-muted-foreground">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {bookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="border-t transition-colors hover:bg-muted/20"
                    >
                      <td className="px-5 py-4">
                        <p className="font-medium">
                          {getBookingDisplayId(booking.id)}
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {booking.assignmentType === "CUSTOMER_SELECTED"
                            ? "Customer selected"
                            : "Platform assigned"}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-medium">
                          {getFullName(booking.household)}
                        </p>

                        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="size-3" />
                          {getLocation(booking)}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-medium">
                          {getFullName(booking.helper)}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p>{booking.serviceType}</p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {booking.planType}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p>{formatDate(booking.startAt)}</p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {formatTime(booking.startAt)}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge
                          status={apiStatusToLabel[booking.status]}
                        />
                      </td>

                      <td className="px-5 py-4 text-right">
                        <BookingActions
                          booking={{
                            id: getBookingDisplayId(booking.id),
                            status: apiStatusToLabel[booking.status],
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

            {/* Mobile List */}

            <div className="divide-y lg:hidden">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="space-y-4 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">
                        {getBookingDisplayId(booking.id)}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {booking.assignmentType === "CUSTOMER_SELECTED"
                          ? "Customer selected"
                          : "Platform assigned"}
                      </p>
                    </div>

                    <StatusBadge
                      status={apiStatusToLabel[booking.status]}
                    />
                  </div>

                  <div className="space-y-2 text-sm">

                    <div>
                      <p className="text-xs text-muted-foreground">
                        Household
                      </p>

                      <p className="font-medium">
                        {getFullName(booking.household)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">
                        Helper
                      </p>

                      <p className="font-medium">
                        {getFullName(booking.helper)}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Service
                        </p>

                        <p>{booking.serviceType}</p>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">
                          Plan
                        </p>

                        <p>{booking.planType}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">
                        Schedule
                      </p>

                      <p>
                        {formatDate(booking.startAt)} ·{" "}
                        {formatTime(booking.startAt)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">
                        Location
                      </p>

                      <p>{getLocation(booking)}</p>
                      <p className="text-xs text-muted-foreground">
                        {booking.address}
                      </p>
                    </div>

                  </div>

                  <BookingActions
                    booking={{
                      id: getBookingDisplayId(booking.id),
                      status: apiStatusToLabel[booking.status],
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Empty State */}

            {bookings.length === 0 && (
              <div className="border-t p-12 text-center">
                <CalendarDays className="mx-auto size-8 text-muted-foreground" />

                <h3 className="mt-3 font-medium">
                  No bookings found
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  Try changing your search or booking status filter.
                </p>
              </div>
            )}

            {/* Pagination */}

            <div className="flex flex-col gap-4 border-t px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

              <p className="text-sm text-muted-foreground">
                Showing{" "}
                {pagination.totalBookings === 0
                  ? 0
                  : (pagination.page - 1) * pagination.limit + 1}
                {" "}to{" "}
                {Math.min(
                  pagination.page * pagination.limit,
                  pagination.totalBookings,
                )}
                {" "}of {pagination.totalBookings} bookings
              </p>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page <= 1 || loading}
                  onClick={() =>
                    setPagination((previous) => ({
                      ...previous,
                      page: previous.page - 1,
                    }))
                  }
                >
                  <ChevronLeft className="mr-1 size-4" />
                  Previous
                </Button>

                <span className="text-sm text-muted-foreground">
                  Page {pagination.page} of{" "}
                  {Math.max(1, pagination.totalPages)}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={
                    pagination.page >= pagination.totalPages || loading
                  }
                  onClick={() =>
                    setPagination((previous) => ({
                      ...previous,
                      page: previous.page + 1,
                    }))
                  }
                >
                  Next
                  <ChevronRight className="ml-1 size-4" />
                </Button>
              </div>

            </div>
          </>
        )}

      </section>

      {/* Admin Note */}

      <div className="rounded-xl border bg-muted/30 p-4">
        <p className="text-sm font-medium">
          Admin operations
        </p>

        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          Booking status, helper assignments, cancellations and service
          completion should be controlled through protected admin APIs.
        </p>
      </div>

    </div>
  )
}

/* ---------------------------------------------
   Stat Card
--------------------------------------------- */

function StatCard({
  label,
  value,
  icon: Icon,
  tone = "default",
}: {
  label: string
  value: number
  icon: React.ElementType
  tone?: "default" | "success" | "warning" | "danger"
}) {
  const iconClass = {
    default: "bg-muted text-foreground",
    success: "bg-green-50 text-green-700",
    warning: "bg-amber-50 text-amber-700",
    danger: "bg-red-50 text-red-700",
  }[tone]

  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {label}
        </p>

        <div
          className={`flex size-9 items-center justify-center rounded-lg ${iconClass}`}
        >
          <Icon className="size-4" />
        </div>
      </div>

      <p className="mt-3 text-2xl font-semibold tracking-tight">
        {value}
      </p>
    </div>
  )
}

/* ---------------------------------------------
   Status Badge
--------------------------------------------- */

function StatusBadge({
  status,
}: {
  status: BookingStatusFilter
}) {
  const styles: Record<
    Exclude<BookingStatusFilter, "All">,
    string
  > = {
    Pending: "border-amber-200 bg-amber-50 text-amber-700",
    Confirmed: "border-blue-200 bg-blue-50 text-blue-700",
    "In Progress": "border-purple-200 bg-purple-50 text-purple-700",
    Completed: "border-green-200 bg-green-50 text-green-700",
    Cancelled: "border-red-200 bg-red-50 text-red-700",
  }

  if (status === "All") return null

  return (
    <Badge variant="outline" className={styles[status]}>
      {status}
    </Badge>
  )
}

/* ---------------------------------------------
   Booking Actions
--------------------------------------------- */

function BookingActions({
  booking,
}: {
  booking: {
    id: string
    status: BookingStatusFilter
  }
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="size-4" />

          <span className="sr-only">
            Actions for {booking.id}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem disabled>
          View booking details
        </DropdownMenuItem>

        <DropdownMenuItem disabled>
          View household
        </DropdownMenuItem>

        <DropdownMenuItem disabled>
          View helper
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {booking.status === "Pending" && (
          <DropdownMenuItem disabled>
            Confirm booking
          </DropdownMenuItem>
        )}

        {booking.status !== "Cancelled" &&
          booking.status !== "Completed" && (
            <DropdownMenuItem
              disabled
              className="text-destructive focus:text-destructive"
            >
              Cancel booking
            </DropdownMenuItem>
          )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}