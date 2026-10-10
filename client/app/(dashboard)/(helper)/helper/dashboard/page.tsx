import Link from "next/link"
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  ShieldCheck,
  Star,
  Wallet,
  ClipboardList,
  BriefcaseBusiness,
  ChevronRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const upcomingServices = [
  {
    id: 1,
    customer: "Ankur Das",
    service: "Nanny Care",
    date: "Tomorrow",
    time: "10:00 AM",
    location: "Andheri West, Mumbai",
    status: "Confirmed",
  },
  {
    id: 2,
    customer: "Rahul Mehta",
    service: "Maid Services",
    date: "Oct 12, 2026",
    time: "9:00 AM",
    location: "Powai, Mumbai",
    status: "Confirmed",
  },
  {
    id: 3,
    customer: "Neha Kapoor",
    service: "Maid Services",
    date: "Oct 13, 2026",
    time: "11:00 AM",
    location: "Bandra West, Mumbai",
    status: "Confirmed",
  },
]

const requests = [
  {
    id: 1,
    customer: "Aarav Shah",
    service: "Maid Services",
    plan: "Monthly",
    date: "Oct 15, 2026",
    time: "9:00 AM",
    location: "Andheri East, Mumbai",
  },
  {
    id: 2,
    customer: "Riya Mehta",
    service: "Babysitting",
    plan: "Hourly",
    date: "Oct 16, 2026",
    time: "6:00 PM",
    location: "Powai, Mumbai",
  },
]

export default function HelperDashboardPage() {
  return (
    <div className="min-h-screen">
      <div className="space-y-8 p-5 sm:p-8 lg:p-10">
        {/* Header */}
        <section className="flex flex-col gap-8 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium text-muted-foreground">
              Helper Dashboard
            </p>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Good morning, Priya.
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              Here&apos;s what&apos;s happening with your HomiCare
              services today.
            </p>
          </div>

          <Link
            href="/helper/dashboard/requests"
            className="flex flex-col gap-8 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between"
          >
            <Button className="group inline-flex w-fit items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">
              View requests
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Button>
            </Link>
        </section>

        {/* Today's service */}
        <section className="overflow-hidden rounded-3xl bg-foreground text-background">
          <div className="grid lg:grid-cols-[1fr_auto]">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="mb-8 flex items-center gap-2">
                <span className="rounded-full bg-background/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                  Today&apos;s service
                </span>

                <span className="flex items-center gap-1.5 text-xs text-background/60">
                  <span className="size-1.5 rounded-full bg-background" />
                  Confirmed
                </span>
              </div>

              <div className="max-w-2xl">
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Nanny Care for Ankur Das
                </h2>

                <p className="mt-2 text-sm text-background/60">
                  Monthly care arrangement
                </p>
              </div>

              <div className="mt-8 grid gap-5 sm:grid-cols-3">
                <div>
                  <div className="mb-2 flex items-center gap-2 text-background/50">
                    <Clock3 className="size-4" />
                    <span className="text-xs">Time</span>
                  </div>

                  <p className="text-sm font-medium">
                    10:00 AM – 2:00 PM
                  </p>
                </div>

                <div>
                  <div className="mb-2 flex items-center gap-2 text-background/50">
                    <CalendarDays className="size-4" />
                    <span className="text-xs">Schedule</span>
                  </div>

                  <p className="text-sm font-medium">
                    Mon · Wed · Fri
                  </p>
                </div>

                <div>
                  <div className="mb-2 flex items-center gap-2 text-background/50">
                    <MapPin className="size-4" />
                    <span className="text-xs">Location</span>
                  </div>

                  <p className="text-sm font-medium">
                    Andheri West
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-end border-t border-background/10 p-6 lg:w-64 lg:border-l lg:border-t-0 lg:p-8">
              <Link href="/helper/dashboard/services">
                <Button
                  variant="secondary"
                  className="w-full"
                >
                    View service
                    <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={ClipboardList}
            label="Pending requests"
            value="2"
            description="Need your response"
          />

          <StatCard
            icon={CalendarDays}
            label="Upcoming services"
            value="6"
            description="Scheduled services"
          />

          <StatCard
            icon={BriefcaseBusiness}
            label="Active services"
            value="3"
            description="Current care arrangements"
          />

          <StatCard
            icon={Wallet}
            label="This month"
            value="₹18,500"
            description="Estimated earnings"
          />
        </section>

        {/* Main content */}
        <div className="grid gap-8 xl:grid-cols-[1fr_360px]">
          {/* Requests */}
          <section>
            <div className="mb-5 flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Needs your attention
                </p>

                <h2 className="mt-1 text-2xl font-bold tracking-tight">
                  Booking requests
                </h2>
              </div>

              <Link href="/helper/dashboard/requests">
                <Button
                  variant="ghost"
                  className="hidden sm:flex"
                >
                    View all
                    <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>

            <div className="divide-y rounded-2xl border">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="p-5 sm:p-6"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 gap-4">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                        {request.customer
                          .split(" ")
                          .map((name) => name[0])
                          .join("")}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold">
                            {request.customer}
                          </h3>

                          <Badge
                            variant="secondary"
                            className="font-medium"
                          >
                            New request
                          </Badge>
                        </div>

                        <p className="mt-1 text-sm text-muted-foreground">
                          {request.service} · {request.plan}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <CalendarDays className="size-3.5" />
                            {request.date}
                          </span>

                          <span className="flex items-center gap-1.5">
                            <Clock3 className="size-3.5" />
                            {request.time}
                          </span>

                          <span className="flex items-center gap-1.5">
                            <MapPin className="size-3.5" />
                            {request.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/helper/dashboard/requests/${request.id}`}
                    >
                      <Button variant="outline" className="shrink-0">
                          Review
                          <ChevronRight className="size-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

              <Link href="/helper/dashboard/requests">
            <Button
              variant="ghost"
              className="mt-3 w-full sm:hidden"
            >
                View all requests
                <ArrowRight className="size-4" />
            </Button>
              </Link>
          </section>

          {/* Right column */}
          <div className="space-y-8">
            {/* Verification */}
            <section className="rounded-2xl border p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-muted">
                    <ShieldCheck className="size-5" />
                  </div>

                  <h2 className="font-semibold">
                    Your profile is verified
                  </h2>

                  <p className="mt-1 text-sm leading-5 text-muted-foreground">
                    Your profile information has been verified and
                    is ready for households.
                  </p>
                </div>

                <CheckCircle2 className="size-5 shrink-0" />
              </div>

              <Separator className="my-5" />

              <div className="space-y-3">
                <VerificationItem label="Identity details" />
                <VerificationItem label="Profile information" />
                <VerificationItem label="Contact information" />
              </div>

              <Link href="/helper/dashboard/profile">
                <Button
                  variant="outline"
                  className="group inline-flex w-fit items-center gap-2 rounded-xl bg-background px-5 py-3 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5"
                >
                    Manage profile
                </Button>
              </Link>
            </section>

            {/* Rating */}
            <section className="rounded-2xl border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Your rating
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-3xl font-bold tracking-tight">
                      4.9
                    </span>

                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className="size-4 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-semibold">38</p>
                  <p className="text-xs text-muted-foreground">
                    reviews
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-5 text-muted-foreground">
                Great work. Consistent service helps build trust
                with households.
              </p>
            </section>
          </div>
        </div>

        {/* Upcoming schedule */}
        <section>
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                Your calendar
              </p>

              <h2 className="mt-1 text-2xl font-bold tracking-tight">
                Upcoming services
              </h2>
            </div>

            <Link href="/helper/dashboard/schedule">
              <Button variant="ghost">
                View schedule
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-3">
            {upcomingServices.map((service) => (
              <Link
                key={service.id}
                href="/helper/dashboard/schedule"
                className="group flex flex-col gap-4 rounded-2xl border p-5 transition-colors hover:bg-muted/40 sm:flex-row sm:items-center"
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted">
                  <CalendarDays className="size-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold">
                      {service.service}
                    </h3>

                    <Badge
                      variant="outline"
                      className="font-medium"
                    >
                      {service.status}
                    </Badge>
                  </div>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {service.customer}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm sm:text-right">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Date
                    </p>
                    <p className="font-medium">{service.date}</p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Time
                    </p>
                    <p className="font-medium">{service.time}</p>
                  </div>
                </div>

                <ChevronRight className="hidden size-5 text-muted-foreground transition-transform group-hover:translate-x-1 sm:block" />
              </Link>
            ))}
          </div>
        </section>

        {/* Trust reminder */}
        <section className="rounded-2xl border bg-muted/30 p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-background">
              <ShieldCheck className="size-5" />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold">
                Keep your profile up to date
              </h3>

              <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
                Accurate availability, service preferences and
                contact information help households find the right
                care arrangement.
              </p>
            </div>

            <Link href="/helper/dashboard/profile">
              <Button variant="outline">
                Update profile
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: React.ElementType
  label: string
  value: string
  description: string
}) {
  return (
    <div className="rounded-2xl border p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
          <Icon className="size-5" />
        </div>
      </div>

      <p className="mt-5 text-sm text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 text-2xl font-bold tracking-tight">
        {value}
      </p>

      <p className="mt-1 text-xs text-muted-foreground">
        {description}
      </p>
    </div>
  )
}

function VerificationItem({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <CheckCircle2 className="size-4 shrink-0" />

      <span className="text-sm text-muted-foreground">
        {label}
      </span>
    </div>
  )
}