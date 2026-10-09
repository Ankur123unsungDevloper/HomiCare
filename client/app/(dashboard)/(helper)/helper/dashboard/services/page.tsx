"use client"

import Link from "next/link"
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Home,
  MapPin,
  MessageCircle,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

type ServiceStatus = "Active" | "Upcoming"

type Service = {
  id: number
  household: string
  service: string
  plan: string
  schedule: string
  nextService: string
  time: string
  startDate: string
  location: string
  status: ServiceStatus
  members: number
}

const services: Service[] = [
  {
    id: 1,
    household: "Ankur Das",
    service: "Nanny Care",
    plan: "Monthly",
    schedule: "Monday, Wednesday, Friday",
    nextService: "Tomorrow",
    time: "10:00 AM – 2:00 PM",
    startDate: "September 12, 2026",
    location: "Andheri West, Mumbai",
    status: "Active",
    members: 3,
  },
  {
    id: 2,
    household: "Karan Patel",
    service: "Maid Services",
    plan: "Monthly",
    schedule: "Monday – Friday",
    nextService: "October 18, 2026",
    time: "10:00 AM – 2:00 PM",
    startDate: "October 18, 2026",
    location: "Bandra West, Mumbai",
    status: "Upcoming",
    members: 4,
  },
  {
    id: 3,
    household: "Rahul Mehta",
    service: "Maid Services",
    plan: "Monthly",
    schedule: "Monday – Friday",
    nextService: "October 12, 2026",
    time: "9:00 AM – 1:00 PM",
    startDate: "October 12, 2026",
    location: "Powai, Mumbai",
    status: "Active",
    members: 2,
  },
]

function StatusBadge({ status }: { status: ServiceStatus }) {
  if (status === "Active") {
    return (
      <Badge
        variant="outline"
        className="border-success/20 bg-success/10 text-success"
      >
        <CheckCircle2 className="mr-1.5 size-3.5" />
        Active
      </Badge>
    )
  }

  return (
    <Badge
      variant="outline"
      className="border-warning/20 bg-warning/10 text-warning"
    >
      <Clock3 className="mr-1.5 size-3.5" />
      Upcoming
    </Badge>
  )
}

function ServiceItem({ service }: { service: Service }) {
  return (
    <div className="group p-5 transition-colors hover:bg-muted/30">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted">
            <Home className="size-5 text-foreground" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-foreground">
                {service.household}
              </h3>
              <StatusBadge status={service.status} />
            </div>

            <p className="mt-1 text-sm text-muted-foreground">
              {service.service} · {service.plan}
            </p>

            <div className="mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <CalendarDays className="size-4 shrink-0" />
                <span>{service.schedule}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock3 className="size-4 shrink-0" />
                <span>{service.time}</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="size-4 shrink-0" />
                <span>{service.location}</span>
              </div>

                <div className="flex items-center gap-2">
                  <Users className="size-4 shrink-0" />
                  <span>{service.members} household members</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 flex-col gap-2 sm:flex-row lg:flex-col">
            <Button size="sm">
            <Link href={`/helper/dashboard/services/${service.id}`}>
              View service
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>

          <Button
            variant="outline"
            size="sm"
          >
            <Link href={`/helper/dashboard/services/${service.id}/schedule`}>
              <CalendarDays className="mr-2 size-4" />
              View schedule
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-5 border-t pt-4">
        <div className="flex flex-col gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            Started {service.startDate}
          </span>

          <span>
            Next service:{" "}
            <span className="font-medium text-foreground">
              {service.nextService}
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default function HelperServicesPage() {
  const activeServices = services.filter(
    (service) => service.status === "Active"
  )

  const upcomingServices = services.filter(
    (service) => service.status === "Upcoming"
  )

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            YOUR WORK
          </p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            My Services
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Manage your active care arrangements, schedules, and household
            assignments.
          </p>
        </div>

        <Button variant="outline">
          <Link href="/helper/dashboard/requests">
            View booking requests
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </div>

      {/* Overview */}
      <section className="mt-8 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-3">
        <div className="bg-background p-5">
          <p className="text-sm text-muted-foreground">Active services</p>
          <p className="mt-2 text-3xl font-semibold">
            {activeServices.length}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Currently serving households
          </p>
        </div>

        <div className="bg-background p-5">
          <p className="text-sm text-muted-foreground">Upcoming services</p>
          <p className="mt-2 text-3xl font-semibold">
            {upcomingServices.length}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Starting soon
          </p>
        </div>

        <div className="bg-background p-5">
          <p className="text-sm text-muted-foreground">Completed services</p>
          <p className="mt-2 text-3xl font-semibold">24</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Across all households
          </p>
        </div>
      </section>

      {/* Active services */}
      <section className="mt-8">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-lg font-semibold">Current arrangements</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Households you are currently serving.
            </p>
          </div>

          <span className="text-sm text-muted-foreground">
            {activeServices.length} active
          </span>
        </div>

        <div className="overflow-hidden rounded-2xl border bg-background">
          {activeServices.length > 0 ? (
            activeServices.map((service, index) => (
              <div key={service.id}>
                <ServiceItem service={service} />
                {index < activeServices.length - 1 && <Separator />}
              </div>
            ))
          ) : (
            <div className="px-6 py-14 text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted">
                <Home className="size-5 text-muted-foreground" />
              </div>

              <h3 className="mt-4 font-semibold">
                No active services
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                Accepted booking requests will appear here once a service
                arrangement becomes active.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Upcoming */}
      <section className="mt-10">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Starting soon</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Accepted arrangements that have not started yet.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border bg-background">
          {upcomingServices.length > 0 ? (
            upcomingServices.map((service, index) => (
              <div key={service.id}>
                <ServiceItem service={service} />
                {index < upcomingServices.length - 1 && <Separator />}
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center">
              <p className="text-sm text-muted-foreground">
                No upcoming services.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Service management */}
      <section className="mt-10 grid gap-4 lg:grid-cols-[1fr_auto]">
        <div className="rounded-2xl bg-foreground p-6 text-background sm:p-7">
          <p className="text-sm font-medium text-background/60">
            SERVICE MANAGEMENT
          </p>

          <h2 className="mt-2 text-xl font-semibold">
            Keep every household arrangement organized.
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-background/65">
            View schedules, household requirements, service details, and
            communication in one place.
          </p>
        </div>

        <div className="rounded-2xl border bg-background p-6">
          <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
            <MessageCircle className="size-5" />
          </div>

          <h3 className="mt-4 font-semibold">
            Need to contact a household?
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Open a service to view its communication options.
          </p>
        </div>
      </section>

      {/* Trust note */}
      <div className="mt-8 flex items-start gap-3 rounded-xl border bg-muted/40 p-4">
        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />

        <p className="text-xs leading-5 text-muted-foreground">
          Keep your availability and service information up to date so
          households always have accurate information about your care
          arrangements.
        </p>
      </div>
    </main>
  )
}