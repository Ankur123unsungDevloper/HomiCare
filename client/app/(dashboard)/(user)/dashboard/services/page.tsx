"use client"

import {
  CalendarClock,
  CheckCircle2,
  Clock3,
  HeartHandshake,
  MoreHorizontal,
  UserRound,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

type Service = {
  id: number
  helper: string
  service: string
  plan: "Monthly" | "Yearly" | "Hourly"
  schedule: string
  nextService: string
  time: string
  started: string
  status: "Active" | "Paused"
}

const services: Service[] = [
  {
    id: 1,
    helper: "Priya Sharma",
    service: "Nanny Care",
    plan: "Monthly",
    schedule: "Monday – Saturday",
    nextService: "Tomorrow",
    time: "10:00 AM",
    started: "September 12, 2026",
    status: "Active",
  },
  {
    id: 2,
    helper: "Sunita Patil",
    service: "Maid Services",
    plan: "Monthly",
    schedule: "Monday – Friday",
    nextService: "Oct 12, 2026",
    time: "9:00 AM",
    started: "August 05, 2026",
    status: "Active",
  },
]

export default function ServicesPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">

      {/* Header */}
      <div>
        <p className="mb-2 text-sm font-medium text-muted-foreground">
          YOUR CARE
        </p>

        <h1 className="text-3xl font-bold tracking-tight">
          My services
        </h1>

        <p className="mt-2 max-w-2xl text-muted-foreground">
          Manage your ongoing care arrangements and see what&apos;s
          scheduled next.
        </p>
      </div>

      {/* Overview */}
      <section className="grid gap-4 sm:grid-cols-3">

        <div className="border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center bg-muted">
              <HeartHandshake className="h-4 w-4" />
            </div>

            <p className="text-sm text-muted-foreground">
              Active services
            </p>
          </div>

          <p className="mt-4 text-3xl font-bold">
            2
          </p>
        </div>

        <div className="border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center bg-muted">
              <CalendarClock className="h-4 w-4" />
            </div>

            <p className="text-sm text-muted-foreground">
              Next service
            </p>
          </div>

          <p className="mt-4 text-lg font-bold">
            Tomorrow
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            10:00 AM · Nanny Care
          </p>
        </div>

        <div className="border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center bg-muted">
              <CheckCircle2 className="h-4 w-4" />
            </div>

            <p className="text-sm text-muted-foreground">
              Services completed
            </p>
          </div>

          <p className="mt-4 text-3xl font-bold">
            12
          </p>
        </div>

      </section>

      {/* Active services */}
      <section>
        <div className="mb-5">
          <h2 className="text-xl font-bold">
            Active services
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Your currently active care arrangements.
          </p>
        </div>

        <div className="space-y-4">

          {services.map((service) => (
            <div
              key={service.id}
              className="border bg-card"
            >
              <div className="p-5 sm:p-6">

                {/* Service heading */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-muted">
                      <UserRound className="h-5 w-5 text-muted-foreground" />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold">
                          {service.helper}
                        </h3>

                        <Badge
                          variant="outline"
                          className="rounded-full border-green-200 bg-green-50 px-2.5 text-green-700"
                        >
                          {service.status}
                        </Badge>
                      </div>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {service.service} · {service.plan} plan
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 self-end sm:self-auto"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>

                </div>

                <Separator className="my-5" />

                {/* Service information */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Schedule
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      {service.schedule}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Next service
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      {service.nextService}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Service time
                    </p>

                    <p className="mt-1 flex items-center gap-1.5 text-sm font-medium">
                      <Clock3 className="h-3.5 w-3.5 text-muted-foreground" />
                      {service.time}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Started
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      {service.started}
                    </p>
                  </div>

                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button size="sm">
                    View service
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                  >
                    View schedule
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                  >
                    Contact helper
                  </Button>
                </div>

              </div>
            </div>
          ))}

        </div>
      </section>

      {/* Service management */}
      <section className="border bg-muted/40 p-6 sm:p-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Manage your care
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            Need to make a change?
          </h2>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            You can review your service schedule, contact your helper,
            or request changes to an existing arrangement.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Button variant="outline">
              View care history
            </Button>

            <Button variant="ghost">
              Help & support
            </Button>
          </div>
        </div>
      </section>

      {/* Empty-state concept for future backend */}
      {services.length === 0 && (
        <div className="border border-dashed p-12 text-center">
          <HeartHandshake className="mx-auto h-8 w-8 text-muted-foreground" />

          <h3 className="mt-4 font-semibold">
            No active services
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Once a booking is accepted and becomes active, it will
            appear here.
          </p>

          <Button className="mt-5">
            Find care
          </Button>
        </div>
      )}

    </div>
  )
}