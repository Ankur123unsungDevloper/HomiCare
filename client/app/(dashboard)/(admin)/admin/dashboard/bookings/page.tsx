"use client"

import * as React from "react"
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

type BookingStatus =
  | "Pending"
  | "Confirmed"
  | "In Progress"
  | "Completed"
  | "Cancelled"

type Booking = {
  id: string
  household: string
  helper: string
  service: string
  plan: string
  date: string
  time: string
  location: string
  status: BookingStatus
  amount: string
}

const bookings: Booking[] = [
  {
    id: "BK-1048",
    household: "Rahul Mehta",
    helper: "Priya Sharma",
    service: "Maid Services",
    plan: "Monthly",
    date: "08 Oct 2026",
    time: "09:00 AM",
    location: "Andheri West, Mumbai",
    status: "Confirmed",
    amount: "₹12,000",
  },
  {
    id: "BK-1047",
    household: "Neha Kapoor",
    helper: "Sunita Patil",
    service: "Nanny Care",
    plan: "Monthly",
    date: "08 Oct 2026",
    time: "10:30 AM",
    location: "Powai, Mumbai",
    status: "In Progress",
    amount: "₹18,500",
  },
  {
    id: "BK-1046",
    household: "Amit Shah",
    helper: "Meena Joshi",
    service: "Babysitting",
    plan: "Hourly",
    date: "08 Oct 2026",
    time: "04:00 PM",
    location: "Bandra West, Mumbai",
    status: "Pending",
    amount: "₹450/hr",
  },
  {
    id: "BK-1045",
    household: "Priya Nair",
    helper: "Kavita Rao",
    service: "Maid Services",
    plan: "Yearly",
    date: "07 Oct 2026",
    time: "08:30 AM",
    location: "Viman Nagar, Pune",
    status: "Completed",
    amount: "₹1,25,000",
  },
  {
    id: "BK-1044",
    household: "Sanjay Kulkarni",
    helper: "Anita Verma",
    service: "Elder Care",
    plan: "Monthly",
    date: "07 Oct 2026",
    time: "11:00 AM",
    location: "Kothrud, Pune",
    status: "Completed",
    amount: "₹15,000",
  },
  {
    id: "BK-1043",
    household: "Riya Desai",
    helper: "Rita Deshmukh",
    service: "Babysitting",
    plan: "Hourly",
    date: "06 Oct 2026",
    time: "06:00 PM",
    location: "Thane West, Mumbai",
    status: "Cancelled",
    amount: "₹500/hr",
  },
  {
    id: "BK-1042",
    household: "Karan Patel",
    helper: "Meena Kapoor",
    service: "Maid Services",
    plan: "Monthly",
    date: "06 Oct 2026",
    time: "09:30 AM",
    location: "Goregaon East, Mumbai",
    status: "Confirmed",
    amount: "₹11,500",
  },
  {
    id: "BK-1041",
    household: "Sneha Joshi",
    helper: "Priya Sharma",
    service: "Maid Services",
    plan: "Monthly",
    date: "05 Oct 2026",
    time: "08:00 AM",
    location: "Malad West, Mumbai",
    status: "Completed",
    amount: "₹12,000",
  },
]

const statusFilters = [
  "All",
  "Pending",
  "Confirmed",
  "In Progress",
  "Completed",
  "Cancelled",
] as const

export default function AdminBookingsPage() {
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("All")

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.id.toLowerCase().includes(search.toLowerCase()) ||
      booking.household.toLowerCase().includes(search.toLowerCase()) ||
      booking.helper.toLowerCase().includes(search.toLowerCase()) ||
      booking.service.toLowerCase().includes(search.toLowerCase()) ||
      booking.location.toLowerCase().includes(search.toLowerCase())

    const matchesStatus =
      statusFilter === "All" || booking.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "Pending").length,
    active: bookings.filter(
      (b) => b.status === "Confirmed" || b.status === "In Progress",
    ).length,
    completed: bookings.filter((b) => b.status === "Completed").length,
    cancelled: bookings.filter((b) => b.status === "Cancelled").length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Booking Management
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Monitor household bookings, helper assignments and service activity.
        </p>
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
              onChange={(e) => setSearch(e.target.value)}
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
                  onClick={() => setStatusFilter(status)}
                >
                  {status}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Status tabs */}
        <div className="flex gap-1 overflow-x-auto border-t px-4 pt-3">
          {statusFilters.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
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

        {/* Desktop table */}
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
              {filteredBookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-t transition-colors hover:bg-muted/20"
                >
                  <td className="px-5 py-4">
                    <p className="font-medium">{booking.id}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {booking.amount}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-medium">{booking.household}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="size-3" />
                      {booking.location}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-medium">{booking.helper}</p>
                  </td>

                  <td className="px-5 py-4">
                    <p>{booking.service}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {booking.plan}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <p>{booking.date}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {booking.time}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={booking.status} />
                  </td>

                  <td className="px-5 py-4 text-right">
                    <BookingActions booking={booking} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile list */}
        <div className="divide-y lg:hidden">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="space-y-4 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{booking.id}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {booking.amount}
                  </p>
                </div>

                <StatusBadge status={booking.status} />
              </div>

              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Household</p>
                  <p className="font-medium">{booking.household}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Helper</p>
                  <p className="font-medium">{booking.helper}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Service</p>
                    <p>{booking.service}</p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">Plan</p>
                    <p>{booking.plan}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Schedule</p>
                  <p>
                    {booking.date} · {booking.time}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p>{booking.location}</p>
                </div>
              </div>

              <BookingActions booking={booking} />
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredBookings.length === 0 && (
          <div className="border-t p-12 text-center">
            <CalendarDays className="mx-auto size-8 text-muted-foreground" />

            <h3 className="mt-3 font-medium">No bookings found</h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Try changing your search or booking status filter.
            </p>
          </div>
        )}

        <div className="border-t px-5 py-4 text-sm text-muted-foreground">
          Showing {filteredBookings.length} of {bookings.length} bookings
        </div>
      </section>

      {/* Admin note */}
      <div className="rounded-xl border bg-muted/30 p-4">
        <p className="text-sm font-medium">Admin operations</p>

        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          Booking status, helper assignments, cancellations and service
          completion should be controlled through protected admin APIs once
          the backend is connected.
        </p>
      </div>
    </div>
  )
}

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
        <p className="text-sm text-muted-foreground">{label}</p>

        <div
          className={`flex size-9 items-center justify-center rounded-lg ${iconClass}`}
        >
          <Icon className="size-4" />
        </div>
      </div>

      <p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p>
    </div>
  )
}

function StatusBadge({ status }: { status: BookingStatus }) {
  const styles: Record<BookingStatus, string> = {
    Pending: "border-amber-200 bg-amber-50 text-amber-700",
    Confirmed: "border-blue-200 bg-blue-50 text-blue-700",
    "In Progress": "border-purple-200 bg-purple-50 text-purple-700",
    Completed: "border-green-200 bg-green-50 text-green-700",
    Cancelled: "border-red-200 bg-red-50 text-red-700",
  }

  return (
    <Badge variant="outline" className={styles[status]}>
      {status}
    </Badge>
  )
}

function BookingActions({ booking }: { booking: Booking }) {
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
        <DropdownMenuItem>
          View booking details
        </DropdownMenuItem>

        <DropdownMenuItem>
          View household
        </DropdownMenuItem>

        <DropdownMenuItem>
          View helper
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {booking.status === "Pending" && (
          <DropdownMenuItem>
            Confirm booking
          </DropdownMenuItem>
        )}

        {booking.status !== "Cancelled" &&
          booking.status !== "Completed" && (
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              Cancel booking
            </DropdownMenuItem>
          )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}