"use client"

import Link from "next/link"
import { useState } from "react"
import {
  CalendarDays,
  Clock3,
  MapPin,
  UserRound,
  ArrowRight,
  CheckCircle2,
  XCircle,
  ClipboardList,
  SlidersHorizontal,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

type RequestStatus =
  | "pending"
  | "accepted"
  | "rejected"

interface BookingRequest {
  id: number
  customer: string
  service: string
  plan: string
  date: string
  time: string
  frequency: string
  location: string
  address: string
  requirements: string
  received: string
  status: RequestStatus
}

const initialRequests: BookingRequest[] = [
  {
    id: 1,
    customer: "Aarav Shah",
    service: "Maid Services",
    plan: "Monthly",
    date: "Oct 15, 2026",
    time: "9:00 AM",
    frequency: "Monday – Saturday",
    location: "Andheri East, Mumbai",
    address: "Chakala, Andheri East",
    requirements:
      "Looking for regular home cleaning and kitchen assistance. Preferred morning availability.",
    received: "2 hours ago",
    status: "pending",
  },
  {
    id: 2,
    customer: "Riya Mehta",
    service: "Babysitting",
    plan: "Hourly",
    date: "Oct 16, 2026",
    time: "6:00 PM",
    frequency: "One-time",
    location: "Powai, Mumbai",
    address: "Hiranandani Gardens, Powai",
    requirements:
      "Evening babysitting for approximately three hours. Child is 4 years old.",
    received: "Yesterday",
    status: "pending",
  },
  {
    id: 3,
    customer: "Karan Patel",
    service: "Maid Services",
    plan: "Monthly",
    date: "Oct 18, 2026",
    time: "10:00 AM",
    frequency: "Monday – Friday",
    location: "Bandra West, Mumbai",
    address: "Pali Hill, Bandra West",
    requirements:
      "House cleaning, laundry and general household assistance.",
    received: "2 days ago",
    status: "accepted",
  },
  {
    id: 4,
    customer: "Sneha Rao",
    service: "Nanny Care",
    plan: "Yearly",
    date: "Sep 28, 2026",
    time: "8:00 AM",
    frequency: "Monday – Friday",
    location: "Andheri West, Mumbai",
    address: "Lokhandwala, Andheri West",
    requirements:
      "Long-term nanny care arrangement for a toddler.",
    received: "Sep 20, 2026",
    status: "rejected",
  },
]

export default function BookingRequestsPage() {
  const [requests, setRequests] =
    useState<BookingRequest[]>(initialRequests)

  const [filter, setFilter] = useState<
    "all" | "pending" | "accepted" | "rejected"
  >("all")

  const updateStatus = (
    id: number,
    status: "accepted" | "rejected"
  ) => {
    setRequests((current) =>
      current.map((request) =>
        request.id === id
          ? {
              ...request,
              status,
            }
          : request
      )
    )
  }

  const filteredRequests = requests.filter((request) => {
    if (filter === "all") return true

    return request.status === filter
  })

  const pendingCount = requests.filter(
    (request) => request.status === "pending"
  ).length

  const acceptedCount = requests.filter(
    (request) => request.status === "accepted"
  ).length

  return (
    <div className="min-h-screen">
      <div className="space-y-8 p-5 sm:p-8 lg:p-10">
        {/* Header */}
        <section className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium text-muted-foreground">
              Your Work
            </p>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Booking requests
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Review requests from households and decide which
              care arrangements work for you.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border px-4 py-2.5">
            <ClipboardList className="size-4" />

            <span className="text-sm font-medium">
              {pendingCount} pending
            </span>
          </div>
        </section>

        {/* Overview */}
        <section className="grid gap-4 sm:grid-cols-3">
          <SummaryCard
            label="All requests"
            value={requests.length}
            icon={ClipboardList}
          />

          <SummaryCard
            label="Pending response"
            value={pendingCount}
            icon={Clock3}
          />

          <SummaryCard
            label="Accepted"
            value={acceptedCount}
            icon={CheckCircle2}
          />
        </section>

        {/* Filters */}
        <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <FilterButton
              active={filter === "all"}
              onClick={() => setFilter("all")}
            >
              All
            </FilterButton>

            <FilterButton
              active={filter === "pending"}
              onClick={() => setFilter("pending")}
            >
              Pending
              {pendingCount > 0 && (
                <span className="ml-1.5 rounded-full bg-foreground px-1.5 py-0.5 text-[10px] text-background">
                  {pendingCount}
                </span>
              )}
            </FilterButton>

            <FilterButton
              active={filter === "accepted"}
              onClick={() => setFilter("accepted")}
            >
              Accepted
            </FilterButton>

            <FilterButton
              active={filter === "rejected"}
              onClick={() => setFilter("rejected")}
            >
              Rejected
            </FilterButton>
          </div>

          <Button variant="outline" size="sm">
            <SlidersHorizontal className="size-4" />
            Filters
          </Button>
        </section>

        {/* Requests */}
        <section className="space-y-4">
          {filteredRequests.length === 0 ? (
            <EmptyState filter={filter} />
          ) : (
            filteredRequests.map((request) => (
              <RequestItem
                key={request.id}
                request={request}
                onAccept={() =>
                  updateStatus(request.id, "accepted")
                }
                onReject={() =>
                  updateStatus(request.id, "rejected")
                }
              />
            ))
          )}
        </section>

        {/* Information */}
        <section className="rounded-2xl border bg-muted/30 p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-background">
              <ClipboardList className="size-5" />
            </div>

            <div>
              <h3 className="font-semibold">
                Before accepting a request
              </h3>

              <p className="mt-1 max-w-3xl text-sm leading-6 text-muted-foreground">
                Check the service type, schedule, location and
                household requirements carefully. Once you accept,
                the booking will move into your active services.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function RequestItem({
  request,
  onAccept,
  onReject,
}: {
  request: BookingRequest
  onAccept: () => void
  onReject: () => void
}) {
  return (
    <article className="rounded-2xl border bg-background">
      <div className="p-5 sm:p-6">
        {/* Top */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold">
              {request.customer
                .split(" ")
                .map((name) => name[0])
                .join("")}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-semibold">
                  {request.customer}
                </h2>

                <StatusBadge status={request.status} />
              </div>

              <p className="mt-1 text-sm text-muted-foreground">
                {request.service} · {request.plan}
              </p>

              <p className="mt-2 text-xs text-muted-foreground">
                Request received {request.received}
              </p>
            </div>
          </div>

          {request.status === "pending" && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={onReject}
              >
                <XCircle className="size-4" />
                Reject
              </Button>

              <Button onClick={onAccept}>
                <CheckCircle2 className="size-4" />
                Accept
              </Button>
            </div>
          )}
        </div>

        <Separator className="my-6" />

        {/* Details */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <DetailItem
            icon={CalendarDays}
            label="Start date"
            value={request.date}
          />

          <DetailItem
            icon={Clock3}
            label="Preferred time"
            value={request.time}
          />

          <DetailItem
            icon={CalendarDays}
            label="Frequency"
            value={request.frequency}
          />

          <DetailItem
            icon={MapPin}
            label="Location"
            value={request.location}
          />
        </div>

        {/* Requirements */}
        <div className="mt-6 rounded-xl bg-muted/40 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Household requirements
          </p>

          <p className="mt-2 text-sm leading-6">
            {request.requirements}
          </p>
        </div>

        {/* Bottom */}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <UserRound className="size-3.5" />
            Household request
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="justify-start sm:justify-center"
          >
            <Link
              href={`/helper/dashboard/requests/${request.id}`}
            >
              View full request
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  )
}

function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: string
}) {
  return (
    <div className="flex gap-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">
          {label}
        </p>

        <p className="mt-1 text-sm font-medium">
          {value}
        </p>
      </div>
    </div>
  )
}

function StatusBadge({
  status,
}: {
  status: RequestStatus
}) {
  if (status === "pending") {
    return (
      <Badge
        variant="outline"
        className="border-warning/30 bg-warning/10 text-warning"
      >
        Pending
      </Badge>
    )
  }

  if (status === "accepted") {
    return (
      <Badge
        variant="outline"
        className="border-success/30 bg-success/10 text-success"
      >
        Accepted
      </Badge>
    )
  }

  return (
    <Badge
      variant="outline"
      className="border-destructive/30 bg-destructive/10 text-destructive"
    >
      Rejected
    </Badge>
  )
}

function SummaryCard({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: number
  icon: React.ElementType
}) {
  return (
    <div className="rounded-2xl border p-5">
      <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
        <Icon className="size-5" />
      </div>

      <p className="mt-5 text-sm text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 text-2xl font-bold tracking-tight">
        {value}
      </p>
    </div>
  )
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <Button
      variant={active ? "default" : "outline"}
      size="sm"
      onClick={onClick}
      className="rounded-full"
    >
      {children}
    </Button>
  )
}

function EmptyState({
  filter,
}: {
  filter: "all" | "pending" | "accepted" | "rejected"
}) {
  const label =
    filter === "pending"
      ? "pending"
      : filter === "accepted"
        ? "accepted"
        : filter === "rejected"
          ? "rejected"
          : ""

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border px-6 py-16 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted">
        <ClipboardList className="size-5" />
      </div>

      <h3 className="mt-5 font-semibold">
        No {label} requests
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        {filter === "pending"
          ? "You don't have any booking requests waiting for your response."
          : "There are no booking requests in this category yet."}
      </p>
    </div>
  )
}