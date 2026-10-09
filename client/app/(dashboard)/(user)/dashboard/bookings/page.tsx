/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import {
  CalendarDays,
  Clock3,
  MapPin,
  MoreHorizontal,
  UserRound,
  CheckCircle2,
  CircleAlert,
  XCircle,
  ArrowRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

type BookingStatus =
  | "Pending"
  | "Confirmed"
  | "Active"
  | "Completed"
  | "Cancelled"

type Booking = {
  id: number
  helper: string
  service: string
  plan: string
  date: string
  time: string
  location: string
  status: BookingStatus
}

const bookings: Booking[] = [
  {
    id: 1,
    helper: "Priya Sharma",
    service: "Nanny Care",
    plan: "Monthly",
    date: "Tomorrow",
    time: "10:00 AM",
    location: "Andheri West, Mumbai",
    status: "Confirmed",
  },
  {
    id: 2,
    helper: "Sunita Patil",
    service: "Maid Services",
    plan: "Monthly",
    date: "Oct 12, 2026",
    time: "9:00 AM",
    location: "Powai, Mumbai",
    status: "Pending",
  },
  {
    id: 3,
    helper: "Meena Joshi",
    service: "Maid Services",
    plan: "Hourly",
    date: "Sep 28, 2026",
    time: "11:00 AM",
    location: "Bandra West, Mumbai",
    status: "Completed",
  },
  {
    id: 4,
    helper: "Anita Verma",
    service: "Babysitting",
    plan: "Hourly",
    date: "Sep 20, 2026",
    time: "6:00 PM",
    location: "Andheri East, Mumbai",
    status: "Cancelled",
  },
]

const filters = [
  "All",
  "Upcoming",
  "Pending",
  "Active",
  "Completed",
  "Cancelled",
]

function StatusBadge({ status }: { status: BookingStatus }) {
  const styles = {
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Confirmed: "bg-green-50 text-green-700 border-green-200",
    Active: "bg-blue-50 text-blue-700 border-blue-200",
    Completed: "bg-neutral-100 text-neutral-700 border-neutral-200",
    Cancelled: "bg-red-50 text-red-700 border-red-200",
  }

  return (
    <Badge
      variant="outline"
      className={`rounded-full px-3 py-1 font-medium ${styles[status]}`}
    >
      {status}
    </Badge>
  )
}

function StatusIcon({ status }: { status: BookingStatus }) {
  if (status === "Pending") {
    return <CircleAlert className="h-4 w-4" />
  }

  if (status === "Cancelled") {
    return <XCircle className="h-4 w-4" />
  }

  return <CheckCircle2 className="h-4 w-4" />
}

export default function BookingsPage() {
  const [activeFilter, setActiveFilter] = useState("All")

  const filteredBookings =
    activeFilter === "All"
      ? bookings
      : bookings.filter((booking) => booking.status === activeFilter)

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">

      {/* Header */}
      <div>
        <p className="mb-2 text-sm font-medium text-muted-foreground">
          YOUR CARE
        </p>

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              My bookings
            </h1>

            <p className="mt-2 max-w-2xl text-muted-foreground">
              Keep track of your care requests, upcoming services, and
              previous bookings.
            </p>
          </div>

          <Button className="gap-2">
            Find care
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Booking overview */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="border bg-card p-5">
          <p className="text-sm text-muted-foreground">
            Total bookings
          </p>
          <p className="mt-2 text-3xl font-bold">
            4
          </p>
        </div>

        <div className="border bg-card p-5">
          <p className="text-sm text-muted-foreground">
            Upcoming
          </p>
          <p className="mt-2 text-3xl font-bold">
            1
          </p>
        </div>

        <div className="border bg-card p-5">
          <p className="text-sm text-muted-foreground">
            Pending
          </p>
          <p className="mt-2 text-3xl font-bold">
            1
          </p>
        </div>

        <div className="border bg-card p-5">
          <p className="text-sm text-muted-foreground">
            Completed
          </p>
          <p className="mt-2 text-3xl font-bold">
            1
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b">
        <div className="flex gap-6 overflow-x-auto">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`relative whitespace-nowrap pb-4 text-sm font-medium transition-colors ${
                activeFilter === filter
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {filter}

              {activeFilter === filter && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-foreground" />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Bookings */}
      <section className="space-y-4">
        {filteredBookings.map((booking) => (
          <div
            key={booking.id}
            className="border bg-card transition-shadow hover:shadow-sm"
          >
            <div className="p-5 sm:p-6">

              {/* Top */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-muted">
                    <UserRound className="h-5 w-5 text-muted-foreground" />
                  </div>

                  <div>
                    <h2 className="font-semibold">
                      {booking.helper}
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {booking.service} · {booking.plan}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <StatusBadge status={booking.status} />

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Separator className="my-5" />

              {/* Details */}
              <div className="grid gap-4 sm:grid-cols-3">

                <div className="flex items-start gap-3">
                  <CalendarDays className="mt-0.5 h-4 w-4 text-muted-foreground" />

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Date
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      {booking.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock3 className="mt-0.5 h-4 w-4 text-muted-foreground" />

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Time
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      {booking.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Location
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      {booking.location}
                    </p>
                  </div>
                </div>

              </div>

              {/* Status message */}
              {booking.status === "Pending" && (
                <div className="mt-5 flex items-start gap-3 border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                  <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />

                  <p>
                    Your booking request has been sent. You&apos;ll be
                    notified when the helper responds.
                  </p>
                </div>
              )}

              {booking.status === "Confirmed" && (
                <div className="mt-5 flex items-start gap-3 border border-green-200 bg-green-50 p-4 text-sm text-green-800">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />

                  <p>
                    Your booking is confirmed. Your care service is
                    scheduled and ready to go.
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="mt-5 flex flex-wrap gap-3">
                <Button variant="outline" size="sm">
                  View booking
                </Button>

                {booking.status === "Pending" && (
                  <Button variant="ghost" size="sm">
                    Cancel request
                  </Button>
                )}

                {booking.status === "Confirmed" && (
                  <Button variant="ghost" size="sm">
                    Contact helper
                  </Button>
                )}

                {booking.status === "Completed" && (
                  <Button variant="ghost" size="sm">
                    Leave review
                  </Button>
                )}
              </div>

            </div>
          </div>
        ))}

        {/* Empty state */}
        {filteredBookings.length === 0 && (
          <div className="border border-dashed p-12 text-center">
            <CalendarDays className="mx-auto h-8 w-8 text-muted-foreground" />

            <h3 className="mt-4 font-semibold">
              No bookings found
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              You don&apos;t have any bookings in this category yet.
            </p>

            <Button className="mt-5">
              Find care
            </Button>
          </div>
        )}
      </section>

    </div>
  )
}