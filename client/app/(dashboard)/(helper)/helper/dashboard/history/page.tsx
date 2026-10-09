"use client"

import Link from "next/link"
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Home,
  MapPin,
  Star,
  UserRound,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

type HistoryItem = {
  id: number
  household: string
  service: string
  plan: string
  date: string
  duration: string
  location: string
  rating: number
  review: string | null
}

const history: HistoryItem[] = [
  {
    id: 1,
    household: "Meena Kapoor",
    service: "Maid Services",
    plan: "Hourly",
    date: "September 28, 2026",
    duration: "4 hours",
    location: "Bandra West, Mumbai",
    rating: 5,
    review: "Excellent work and very professional.",
  },
  {
    id: 2,
    household: "Rahul Mehta",
    service: "Maid Services",
    plan: "Monthly",
    date: "September 25, 2026",
    duration: "4 hours",
    location: "Powai, Mumbai",
    rating: 5,
    review: "Very happy with the service.",
  },
  {
    id: 3,
    household: "Neha Kapoor",
    service: "Babysitting",
    plan: "Hourly",
    date: "September 18, 2026",
    duration: "5 hours",
    location: "Andheri West, Mumbai",
    rating: 4,
    review: null,
  },
  {
    id: 4,
    household: "Aarav Shah",
    service: "Maid Services",
    plan: "Monthly",
    date: "September 12, 2026",
    duration: "4 hours",
    location: "Andheri East, Mumbai",
    rating: 5,
    review: "Reliable and careful with all household tasks.",
  },
]

function Rating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`size-3.5 ${
            star <= rating
              ? "fill-current text-foreground"
              : "text-muted-foreground/30"
          }`}
        />
      ))}

      <span className="ml-1 text-xs font-medium">{rating}.0</span>
    </div>
  )
}

function HistoryRow({ item }: { item: HistoryItem }) {
  return (
    <div className="p-5 sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted">
            <Home className="size-5" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold">
                {item.household}
              </h3>

              <Badge
                variant="outline"
                className="border-success/20 bg-success/10 text-success"
              >
                <CheckCircle2 className="mr-1.5 size-3.5" />
                Completed
              </Badge>
            </div>

            <p className="mt-1 text-sm text-muted-foreground">
              {item.service} · {item.plan}
            </p>

            <div className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <CalendarDays className="size-4 shrink-0" />
                {item.date}
              </div>

              <div className="flex items-center gap-2">
                <Clock3 className="size-4 shrink-0" />
                {item.duration}
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="size-4 shrink-0" />
                {item.location}
              </div>

              <div className="flex items-center gap-2">
                <UserRound className="size-4 shrink-0" />
                {item.household}
              </div>
            </div>
          </div>
        </div>

        <Button variant="outline" size="sm">
          <Link href={`/helper/dashboard/history/${item.id}`}>
            View details
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </div>

      <div className="mt-5 border-t pt-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Rating rating={item.rating} />

          {item.review ? (
            <p className="max-w-xl text-xs text-muted-foreground sm:text-right">
              “{item.review}”
            </p>
          ) : (
            <span className="text-xs text-muted-foreground">
              No household review yet
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default function HelperHistoryPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-muted-foreground">
          YOUR WORK
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          Service History
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Review the households you have served and your completed care
          arrangements.
        </p>
      </div>

      {/* Overview */}
      <section className="mt-8 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-3">
        <div className="bg-background p-5">
          <p className="text-sm text-muted-foreground">
            Completed services
          </p>

          <p className="mt-2 text-3xl font-semibold">24</p>

          <p className="mt-1 text-xs text-muted-foreground">
            All completed arrangements
          </p>
        </div>

        <div className="bg-background p-5">
          <p className="text-sm text-muted-foreground">
            Households served
          </p>

          <p className="mt-2 text-3xl font-semibold">8</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Different households
          </p>
        </div>

        <div className="bg-background p-5">
          <p className="text-sm text-muted-foreground">
            Average rating
          </p>

          <div className="mt-2 flex items-center gap-2">
            <p className="text-3xl font-semibold">4.9</p>

            <div className="flex items-center">
              <Star className="size-4 fill-current" />
            </div>
          </div>

          <p className="mt-1 text-xs text-muted-foreground">
            Based on household feedback
          </p>
        </div>
      </section>

      {/* History */}
      <section className="mt-8">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              Completed services
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Your recent completed work.
            </p>
          </div>

          <span className="text-sm text-muted-foreground">
            {history.length} shown
          </span>
        </div>

        <div className="overflow-hidden rounded-2xl border bg-background">
          {history.map((item, index) => (
            <div key={item.id}>
              <HistoryRow item={item} />

              {index < history.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </section>

      {/* Performance */}
      <section className="mt-10 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border bg-background p-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
              <Star className="size-5" />
            </div>

            <div>
              <p className="text-sm font-medium">
                Household feedback
              </p>

              <p className="text-xs text-muted-foreground">
                Your service quality
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-end gap-3">
            <span className="text-4xl font-semibold">4.9</span>

            <div className="pb-1">
              <Rating rating={5} />
              <p className="mt-1 text-xs text-muted-foreground">
                Average household rating
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-background p-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
              <CheckCircle2 className="size-5" />
            </div>

            <div>
              <p className="text-sm font-medium">
                Service reliability
              </p>

              <p className="text-xs text-muted-foreground">
                Based on completed arrangements
              </p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Completion rate
              </span>

              <span className="font-semibold">98%</span>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[98%] rounded-full bg-foreground" />
            </div>

            <p className="mt-2 text-xs text-muted-foreground">
              Keep your availability updated to maintain reliable service.
            </p>
          </div>
        </div>
      </section>

      {/* Information */}
      <section className="mt-10 rounded-2xl bg-foreground p-6 text-background sm:p-7">
        <p className="text-sm font-medium text-background/60">
          YOUR SERVICE RECORD
        </p>

        <h2 className="mt-2 text-xl font-semibold">
          A history of your work, all in one place.
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-background/65">
          Completed service records help you keep track of the households
          you have worked with, service dates, and feedback received.
        </p>
      </section>

      {/* Trust note */}
      <div className="mt-6 flex items-start gap-3 rounded-xl border bg-muted/40 p-4">
        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />

        <p className="text-xs leading-5 text-muted-foreground">
          Service history is maintained as part of your HomiCare profile.
          Keep your profile and service information accurate for households
          reviewing your experience.
        </p>
      </div>
    </main>
  )
}