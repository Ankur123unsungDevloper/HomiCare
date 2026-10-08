"use client"

import {
  CheckCircle2,
  ChevronRight,
  Clock3,
  MessageSquareText,
  Star,
  UserRound,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

type PendingReview = {
  id: number
  helper: string
  service: string
  date: string
}

type SubmittedReview = {
  id: number
  helper: string
  service: string
  date: string
  rating: number
  comment: string
}

const pendingReviews: PendingReview[] = [
  {
    id: 1,
    helper: "Sunita Patil",
    service: "Maid Services",
    date: "September 30, 2026",
  },
]

const submittedReviews: SubmittedReview[] = [
  {
    id: 2,
    helper: "Meena Joshi",
    service: "Maid Services",
    date: "September 28, 2026",
    rating: 5,
    comment:
      "Very reliable and professional. The service was handled smoothly.",
  },
  {
    id: 3,
    helper: "Priya Sharma",
    service: "Nanny Care",
    date: "September 20, 2026",
    rating: 5,
    comment:
      "Great experience. Communication was clear and the care was dependable.",
  },
  {
    id: 4,
    helper: "Anita Verma",
    service: "Babysitting",
    date: "August 14, 2026",
    rating: 4,
    comment:
      "Good overall experience and very helpful during the service.",
  },
]

function Rating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${
            index < rating
              ? "fill-current"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  )
}

export default function ReviewsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">

      {/* Header */}
      <div>
        <p className="mb-2 text-sm font-medium text-muted-foreground">
          YOUR CARE
        </p>

        <h1 className="text-3xl font-bold tracking-tight">
          Reviews
        </h1>

        <p className="mt-2 max-w-2xl text-muted-foreground">
          Share your experience and help other households make
          informed care decisions.
        </p>
      </div>

      {/* Summary */}
      <section className="grid gap-4 sm:grid-cols-3">

        <div className="border bg-card p-5">
          <p className="text-sm text-muted-foreground">
            Reviews submitted
          </p>

          <p className="mt-2 text-3xl font-bold">
            11
          </p>
        </div>

        <div className="border bg-card p-5">
          <p className="text-sm text-muted-foreground">
            Awaiting review
          </p>

          <p className="mt-2 text-3xl font-bold">
            {pendingReviews.length}
          </p>
        </div>

        <div className="border bg-card p-5">
          <p className="text-sm text-muted-foreground">
            Average rating given
          </p>

          <div className="mt-2 flex items-center gap-2">
            <span className="text-3xl font-bold">
              4.7
            </span>

            <Star className="h-5 w-5 fill-current" />
          </div>
        </div>

      </section>

      {/* Pending reviews */}
      {pendingReviews.length > 0 && (
        <section>
          <div className="mb-5">
            <h2 className="text-xl font-bold">
              Your feedback is waiting
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Tell us how your recent care experience went.
            </p>
          </div>

          <div className="border bg-card">

            {pendingReviews.map((review, index) => (
              <div key={review.id}>

                <div className="p-5 sm:p-6">

                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex gap-4">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-muted">
                        <UserRound className="h-5 w-5 text-muted-foreground" />
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold">
                            {review.helper}
                          </h3>

                          <Badge
                            variant="outline"
                            className="rounded-full"
                          >
                            Review pending
                          </Badge>
                        </div>

                        <p className="mt-1 text-sm text-muted-foreground">
                          {review.service}
                        </p>

                        <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock3 className="h-3.5 w-3.5" />
                          {review.date}
                        </p>
                      </div>

                    </div>

                    <Button className="gap-2">
                      Write review
                      <ChevronRight className="h-4 w-4" />
                    </Button>

                  </div>

                </div>

                {index < pendingReviews.length - 1 && (
                  <Separator />
                )}

              </div>
            ))}

          </div>
        </section>
      )}

      {/* Submitted reviews */}
      <section>
        <div className="mb-5">
          <h2 className="text-xl font-bold">
            Your reviews
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Feedback you&apos;ve previously shared with HomiCare.
          </p>
        </div>

        <div className="space-y-4">

          {submittedReviews.map((review) => (
            <div
              key={review.id}
              className="border bg-card p-5 sm:p-6"
            >

              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                <div className="flex gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-muted">
                    <UserRound className="h-5 w-5 text-muted-foreground" />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {review.helper}
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {review.service}
                    </p>

                    <p className="mt-2 text-xs text-muted-foreground">
                      {review.date}
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-2">
                  <Rating rating={review.rating} />

                  <span className="text-sm font-medium">
                    {review.rating}.0
                  </span>
                </div>

              </div>

              <div className="mt-5 border-l-2 pl-4">
                <p className="text-sm leading-6 text-muted-foreground">
                  “{review.comment}”
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between">

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4" />
                  Review submitted
                </div>

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
          ))}

        </div>
      </section>

      {/* Why reviews */}
      <section className="flex flex-col gap-5 border bg-muted/40 p-6 sm:flex-row sm:items-center sm:p-8">

        <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-background">
          <MessageSquareText className="h-5 w-5" />
        </div>

        <div>
          <h2 className="font-semibold">
            Your experience matters
          </h2>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
            Honest feedback helps HomiCare maintain service quality
            and helps other households choose the right care for
            their needs.
          </p>
        </div>

      </section>

    </div>
  )
}