"use client"

import {
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  Star,
  UserRound,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

type HistoryItem = {
  id: number
  helper: string
  service: string
  plan: string
  date: string
  duration: string
  location: string
  rating?: number
  reviewed: boolean
}

const history: HistoryItem[] = [
  {
    id: 1,
    helper: "Meena Joshi",
    service: "Maid Services",
    plan: "Hourly",
    date: "September 28, 2026",
    duration: "3 hours",
    location: "Bandra West, Mumbai",
    rating: 5,
    reviewed: true,
  },
  {
    id: 2,
    helper: "Priya Sharma",
    service: "Nanny Care",
    plan: "Monthly",
    date: "September 20, 2026",
    duration: "Monthly service",
    location: "Andheri West, Mumbai",
    rating: 5,
    reviewed: true,
  },
  {
    id: 3,
    helper: "Sunita Patil",
    service: "Maid Services",
    plan: "Monthly",
    date: "August 31, 2026",
    duration: "Monthly service",
    location: "Powai, Mumbai",
    reviewed: false,
  },
  {
    id: 4,
    helper: "Anita Verma",
    service: "Babysitting",
    plan: "Hourly",
    date: "August 14, 2026",
    duration: "4 hours",
    location: "Andheri East, Mumbai",
    rating: 4,
    reviewed: true,
  },
]

export default function HistoryPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8">

      {/* Header */}
      <div>
        <p className="mb-2 text-sm font-medium text-muted-foreground">
          YOUR CARE
        </p>

        <h1 className="text-3xl font-bold tracking-tight">
          Care history
        </h1>

        <p className="mt-2 max-w-2xl text-muted-foreground">
          A record of the care services you&apos;ve received through
          HomiCare.
        </p>
      </div>

      {/* Summary */}
      <section className="grid gap-4 sm:grid-cols-3">

        <div className="border bg-card p-5">
          <p className="text-sm text-muted-foreground">
            Completed services
          </p>

          <p className="mt-2 text-3xl font-bold">
            12
          </p>
        </div>

        <div className="border bg-card p-5">
          <p className="text-sm text-muted-foreground">
            Different helpers
          </p>

          <p className="mt-2 text-3xl font-bold">
            4
          </p>
        </div>

        <div className="border bg-card p-5">
          <p className="text-sm text-muted-foreground">
            Reviews given
          </p>

          <p className="mt-2 text-3xl font-bold">
            11
          </p>
        </div>

      </section>

      {/* History list */}
      <section>
        <div className="mb-5">
          <h2 className="text-xl font-bold">
            Completed services
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Your previous care appointments and service arrangements.
          </p>
        </div>

        <div className="border bg-card">

          {history.map((item, index) => (
            <div key={item.id}>

              <div className="p-5 sm:p-6">

                {/* Main row */}
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                  <div className="flex gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-muted">
                      <UserRound className="h-5 w-5 text-muted-foreground" />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold">
                          {item.helper}
                        </h3>

                        <Badge
                          variant="outline"
                          className="rounded-full border-green-200 bg-green-50 text-green-700"
                        >
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          Completed
                        </Badge>
                      </div>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.service} · {item.plan}
                      </p>
                    </div>

                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-3 lg:min-w-45">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />

                    <div>
                      <p className="text-xs text-muted-foreground">
                        Service date
                      </p>

                      <p className="mt-1 text-sm font-medium">
                        {item.date}
                      </p>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-3 lg:min-w-35">
                    <Clock3 className="h-4 w-4 text-muted-foreground" />

                    <div>
                      <p className="text-xs text-muted-foreground">
                        Duration
                      </p>

                      <p className="mt-1 text-sm font-medium">
                        {item.duration}
                      </p>
                    </div>
                  </div>

                </div>

                <Separator className="my-5" />

                {/* Bottom row */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Location
                    </p>

                    <p className="mt-1 text-sm">
                      {item.location}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">

                    {item.reviewed ? (
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Star className="h-4 w-4 fill-current" />
                        <span>{item.rating}.0</span>
                        <span>· Reviewed</span>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                      >
                        <Star className="h-4 w-4" />
                        Leave review
                      </Button>
                    )}

                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1"
                    >
                      View details
                      <ChevronRight className="h-4 w-4" />
                    </Button>

                  </div>

                </div>

              </div>

              {index < history.length - 1 && (
                <Separator />
              )}

            </div>
          ))}

        </div>
      </section>

      {/* Records */}
      <section className="flex flex-col gap-5 border bg-muted/40 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">

        <div className="flex gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-background">
            <FileText className="h-5 w-5" />
          </div>

          <div>
            <h2 className="font-semibold">
              Your care records
            </h2>

            <p className="mt-1 max-w-xl text-sm leading-6 text-muted-foreground">
              HomiCare keeps your service history organized so you can
              easily review previous arrangements and care activity.
            </p>
          </div>
        </div>

        <Button variant="outline" className="shrink-0">
          View all records
        </Button>

      </section>

    </div>
  )
}