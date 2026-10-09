"use client"

import Link from "next/link"
import {
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Home,
  MapPin,
  UserRound,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

type ScheduleItem = {
  id: number
  household: string
  service: string
  plan: string
  time: string
  duration: string
  location: string
  status: "Confirmed" | "Completed"
}

const weekDays = [
  { day: "Mon", date: "12", active: false },
  { day: "Tue", date: "13", active: false },
  { day: "Wed", date: "14", active: true },
  { day: "Thu", date: "15", active: false },
  { day: "Fri", date: "16", active: false },
  { day: "Sat", date: "17", active: false },
  { day: "Sun", date: "18", active: false },
]

const schedule: ScheduleItem[] = [
  {
    id: 1,
    household: "Ankur Das",
    service: "Nanny Care",
    plan: "Monthly",
    time: "10:00 AM – 2:00 PM",
    duration: "4 hours",
    location: "Andheri West, Mumbai",
    status: "Confirmed",
  },
]

export default function HelperSchedulePage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      {/* Header */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            YOUR WORK
          </p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            My Schedule
          </h1>

          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Keep track of your upcoming services and daily commitments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" aria-label="Previous week">
            <ChevronLeft className="size-4" />
          </Button>

          <Button variant="outline" className="min-w-28">
            This week
          </Button>

          <Button variant="outline" size="icon" aria-label="Next week">
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      {/* Week selector */}
      <section className="mt-8 overflow-x-auto rounded-2xl border bg-background">
        <div className="grid min-w-162.5 grid-cols-7">
          {weekDays.map((day) => (
            <button
              key={day.date}
              type="button"
              className={`relative flex min-h-24 flex-col items-center justify-center border-r last:border-r-0 ${
                day.active
                  ? "bg-foreground text-background"
                  : "hover:bg-muted/40"
              }`}
            >
              <span
                className={`text-xs font-medium ${
                  day.active
                    ? "text-background/60"
                    : "text-muted-foreground"
                }`}
              >
                {day.day}
              </span>

              <span className="mt-1 text-xl font-semibold">
                {day.date}
              </span>

              {day.active && (
                <span className="absolute bottom-3 size-1.5 rounded-full bg-background" />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Selected day */}
      <section className="mt-8">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              WEDNESDAY, OCTOBER 14
            </p>
            <h2 className="mt-1 text-xl font-semibold">
              Today&apos;s schedule
            </h2>
          </div>

          <p className="text-sm text-muted-foreground">
            {schedule.length} scheduled service
          </p>
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border bg-background">
          {schedule.map((item, index) => (
            <div key={item.id}>
              <div className="p-5 sm:p-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  {/* Time */}
                  <div className="flex gap-4">
                    <div className="flex w-20 shrink-0 flex-col items-center justify-center rounded-xl bg-muted px-3 py-4">
                      <Clock3 className="size-4 text-muted-foreground" />
                      <span className="mt-2 text-xs font-medium">
                        10:00 AM
                      </span>
                      <span className="mt-0.5 text-[11px] text-muted-foreground">
                        4 hours
                      </span>
                    </div>

                    {/* Service */}
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold">
                          {item.service}
                        </h3>

                        <Badge
                          variant="outline"
                          className="border-success/20 bg-success/10 text-success"
                        >
                          <CheckCircle2 className="mr-1.5 size-3.5" />
                          {item.status}
                        </Badge>
                      </div>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.plan} service for {item.household}
                      </p>

                      <div className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                        <div className="flex items-center gap-2">
                          <UserRound className="size-4" />
                          {item.household}
                        </div>

                        <div className="flex items-center gap-2">
                          <MapPin className="size-4" />
                          {item.location}
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock3 className="size-4" />
                          {item.time}
                        </div>

                        <div className="flex items-center gap-2">
                          <Home className="size-4" />
                          {item.plan} arrangement
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" size="sm">
                    <Link href={`/helper/dashboard/services/${item.id}`}>
                      View service
                    </Link>
                  </Button>
                </div>
              </div>

              {index < schedule.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </section>

      {/* Week overview */}
      <section className="mt-10">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Week overview</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Your service commitments for the rest of the week.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border bg-background">
          {[
            {
              day: "Thursday",
              date: "15 Oct",
              household: "Ankur Das",
              service: "Nanny Care",
              time: "10:00 AM – 2:00 PM",
            },
            {
              day: "Friday",
              date: "16 Oct",
              household: "Ankur Das",
              service: "Nanny Care",
              time: "10:00 AM – 2:00 PM",
            },
            {
              day: "Saturday",
              date: "17 Oct",
              household: "Ankur Das",
              service: "Nanny Care",
              time: "10:00 AM – 2:00 PM",
            },
          ].map((item, index) => (
            <div key={item.date}>
              <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center">
                <div className="w-24 shrink-0">
                  <p className="text-sm font-medium">{item.day}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.date}
                  </p>
                </div>

                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {item.service}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {item.household} · {item.time}
                  </p>
                </div>

                <Badge variant="secondary">Scheduled</Badge>
              </div>

              {index < 2 && <Separator />}
            </div>
          ))}
        </div>
      </section>

      {/* Availability reminder */}
      <section className="mt-10 rounded-2xl bg-foreground p-6 text-background sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-background/60">
              AVAILABILITY
            </p>

            <h2 className="mt-2 text-xl font-semibold">
              Keep your schedule accurate.
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-background/65">
              Update your availability when your routine changes so new
              booking requests match the times you can actually provide care.
            </p>
          </div>

          <Button
            variant="secondary"
            className="shrink-0"
          >
            <Link href="/helper/dashboard/settings">
              Update availability
            </Link>
          </Button>
        </div>
      </section>

      {/* Note */}
      <div className="mt-6 flex items-start gap-3 rounded-xl border bg-muted/40 p-4">
        <CalendarDays className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

        <p className="text-xs leading-5 text-muted-foreground">
          Schedule information is based on your accepted service
          arrangements. If a household requests a change, review the service
          details before confirming the new timing.
        </p>
      </div>
    </main>
  )
}