"use client"

import Link from "next/link"
import {
  AlertTriangle,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  TrendingUp,
  UserRoundCheck,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const bookingActivity = [
  {
    customer: "Ankur Das",
    helper: "Priya Sharma",
    service: "Nanny Care",
    plan: "Monthly",
    date: "Oct 8, 2026",
    time: "10:00 AM",
    status: "Confirmed",
  },
  {
    customer: "Rahul Mehta",
    helper: "Sunita Patil",
    service: "Maid Services",
    plan: "Monthly",
    date: "Oct 12, 2026",
    time: "9:00 AM",
    status: "Pending",
  },
  {
    customer: "Neha Kapoor",
    helper: "Meena Joshi",
    service: "Maid Services",
    plan: "Hourly",
    date: "Oct 13, 2026",
    time: "11:00 AM",
    status: "Confirmed",
  },
  {
    customer: "Aarav Shah",
    helper: "Anita Verma",
    service: "Babysitting",
    plan: "Hourly",
    date: "Oct 14, 2026",
    time: "6:00 PM",
    status: "Pending",
  },
]

const verificationQueue = [
  {
    name: "Sunita Patil",
    service: "Maid Services",
    submitted: "Oct 7, 2026",
  },
  {
    name: "Kavita Rao",
    service: "Babysitting",
    submitted: "Oct 6, 2026",
  },
  {
    name: "Meena Kapoor",
    service: "Nanny Care",
    submitted: "Oct 5, 2026",
  },
]

const complaints = [
  {
    title: "Service timing issue",
    customer: "Rahul Mehta",
    priority: "Medium",
    date: "Oct 7, 2026",
  },
  {
    title: "Booking cancellation dispute",
    customer: "Neha Kapoor",
    priority: "High",
    date: "Oct 6, 2026",
  },
]

function StatusBadge({
  status,
}: {
  status: string
}) {
  if (status === "Confirmed") {
    return (
      <Badge
        variant="outline"
        className="border-emerald-200 bg-emerald-50 text-emerald-700"
      >
        <CheckCircle2 className="mr-1 h-3 w-3" />
        Confirmed
      </Badge>
    )
  }

  return (
    <Badge
      variant="outline"
      className="border-amber-200 bg-amber-50 text-amber-700"
    >
      <Clock3 className="mr-1 h-3 w-3" />
      Pending
    </Badge>
  )
}

function StatCard({
  label,
  value,
  description,
  icon: Icon,
  href,
}: {
  label: string
  value: string
  description: string
  icon: React.ElementType
  href: string
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border bg-card p-5 transition-colors hover:bg-muted/30"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
          <Icon className="h-5 w-5" />
        </div>

        <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
      </div>

      <p className="mt-5 text-sm text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 text-3xl font-bold tracking-tight">
        {value}
      </p>

      <p className="mt-1 text-xs text-muted-foreground">
        {description}
      </p>
    </Link>
  )
}

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <section className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            ADMINISTRATION
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            Good evening, Ankur.
          </h1>

          <p className="mt-2 max-w-2xl text-muted-foreground">
            Here&apos;s what&apos;s happening across HomiCare today.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          All systems operational
        </div>
      </section>

      {/* Key metrics */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total households"
          value="1,284"
          description="+8.4% from last month"
          icon={Users}
          href="/admin/dashboard/users"
        />

        <StatCard
          label="Verified helpers"
          value="486"
          description="12 awaiting verification"
          icon={UserRoundCheck}
          href="/admin/dashboard/helpers"
        />

        <StatCard
          label="Active bookings"
          value="327"
          description="24 scheduled today"
          icon={CalendarDays}
          href="/admin/dashboard/bookings"
        />

        <StatCard
          label="Pending complaints"
          value="7"
          description="2 marked high priority"
          icon={AlertTriangle}
          href="/admin/dashboard/complaints"
        />
      </section>

      {/* Attention banner */}
      <section className="rounded-2xl border bg-muted/30 p-5">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-background">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-semibold">
                12 helper profiles need verification.
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Review submitted verification information before
                approving these profiles.
              </p>
            </div>
          </div>

          <Button  variant="outline">
            <Link href="/admin/dashboard/helpers">
              Review helpers
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Main activity */}
      <section className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        {/* Bookings */}
        <div className="rounded-2xl border bg-card">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <div>
              <h2 className="font-semibold">
                Recent bookings
              </h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Latest activity across the platform
              </p>
            </div>

            <Button  variant="ghost" size="sm">
              <Link href="/admin/dashboard/bookings">
                View all
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="divide-y">
            {bookingActivity.map((booking, index) => (
              <div
                key={`${booking.customer}-${index}`}
                className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium">
                      {booking.service}
                    </p>

                    <span className="text-xs text-muted-foreground">
                      {booking.plan}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {booking.customer}{" "}
                    <span className="text-muted-foreground/50">
                      with
                    </span>{" "}
                    {booking.helper}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span>{booking.date}</span>
                    <span>{booking.time}</span>
                  </div>
                </div>

                <StatusBadge status={booking.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Verification queue */}
        <div className="rounded-2xl border bg-card">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <div>
              <h2 className="font-semibold">
                Verification queue
              </h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Helpers waiting for review
              </p>
            </div>

            <Badge variant="secondary">
              12 pending
            </Badge>
          </div>

          <div className="divide-y">
            {verificationQueue.map((helper) => (
              <Link
                key={helper.name}
                href="/admin/dashboard/helpers"
                className="group flex items-center gap-3 px-5 py-4 transition-colors hover:bg-muted/20"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                  {helper.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-medium">
                    {helper.name}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {helper.service} · Submitted{" "}
                    {helper.submitted}
                  </p>
                </div>

                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>

          <div className="border-t p-4">
            <Button  variant="outline" className="w-full">
              <Link href="/admin/dashboard/helpers">
                Open verification queue
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Today's operations */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
              <CalendarDays className="h-5 w-5" />
            </div>

            <span className="text-xs font-medium text-muted-foreground">
              TODAY
            </span>
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            Scheduled services
          </p>

          <p className="mt-1 text-3xl font-bold">
            24
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            19 confirmed · 5 pending
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
              <TrendingUp className="h-5 w-5" />
            </div>

            <span className="text-xs font-medium text-muted-foreground">
              THIS MONTH
            </span>
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            Completed services
          </p>

          <p className="mt-1 text-3xl font-bold">
            742
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            11.2% higher than last month
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <span className="text-xs font-medium text-muted-foreground">
              PLATFORM
            </span>
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            Helper verification rate
          </p>

          <p className="mt-1 text-3xl font-bold">
            94.8%
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Based on currently submitted profiles
          </p>
        </div>
      </section>

      {/* Complaints */}
      <section className="rounded-2xl border bg-card">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div>
            <h2 className="font-semibold">
              Complaints requiring attention
            </h2>

            <p className="mt-1 text-xs text-muted-foreground">
              Recent issues reported by HomiCare users
            </p>
          </div>

          <Button  variant="ghost" size="sm">
            <Link href="/admin/dashboard/complaints">
              Manage complaints
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="divide-y">
          {complaints.map((complaint) => (
            <div
              key={complaint.title}
              className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <AlertTriangle className="h-4 w-4" />
                </div>

                <div>
                  <p className="font-medium">
                    {complaint.title}
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Reported by {complaint.customer} ·{" "}
                    {complaint.date}
                  </p>
                </div>
              </div>

              <Badge
                variant="outline"
                className={
                  complaint.priority === "High"
                    ? "border-red-200 bg-red-50 text-red-700"
                    : "border-amber-200 bg-amber-50 text-amber-700"
                }
              >
                {complaint.priority} priority
              </Badge>
            </div>
          ))}
        </div>
      </section>

      {/* Admin reminder */}
      <section className="rounded-2xl border bg-muted/30 p-5">
        <div className="flex gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />

          <div>
            <h3 className="font-semibold">
              Administrative controls
            </h3>

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Dashboard figures and activity shown here are currently
              demonstration data. Once the backend is connected, these
              values should come from protected admin APIs with
              role-based authorization.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}