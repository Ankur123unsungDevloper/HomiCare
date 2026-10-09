"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useState } from "react"
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Home,
  MapPin,
  ShieldCheck,
  UserRound,
  XCircle,
  MessageCircle,
  FileText,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const request = {
  id: 1,
  customer: "Aarav Shah",
  service: "Maid Services",
  plan: "Monthly",
  startDate: "October 15, 2026",
  time: "9:00 AM",
  duration: "4 hours per day",
  frequency: "Monday – Saturday",
  location: "Andheri East, Mumbai",
  address: "Chakala, Andheri East",
  received: "2 hours ago",
  requirements:
    "Looking for regular home cleaning and kitchen assistance. Preferred morning availability.",
  household: {
    members: "3 members",
    homeType: "2 BHK apartment",
  },
}

export default function BookingRequestDetailsPage() {
  const params = useParams()

  const [status, setStatus] = useState<
    "pending" | "accepted" | "rejected"
  >("pending")

  const [processing, setProcessing] = useState(false)

  const handleDecision = (
    nextStatus: "accepted" | "rejected"
  ) => {
    setProcessing(true)

    setTimeout(() => {
      setStatus(nextStatus)
      setProcessing(false)
    }, 400)
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl space-y-8 p-5 sm:p-8 lg:p-10">
        {/* Back */}
        <Link
          href="/helper/dashboard/requests"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to booking requests
        </Link>

        {/* Header */}
        <section className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge
                variant={
                  status === "pending"
                    ? "outline"
                    : status === "accepted"
                      ? "default"
                      : "destructive"
                }
              >
                {status === "pending"
                  ? "Pending response"
                  : status === "accepted"
                    ? "Accepted"
                    : "Rejected"}
              </Badge>

              <span className="text-sm text-muted-foreground">
                Request #{params.id}
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {request.service}
            </h1>

            <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
              Review the household&apos;s requirements and
              schedule before deciding whether to accept this
              request.
            </p>
          </div>

          {status === "pending" && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                disabled={processing}
                onClick={() => handleDecision("rejected")}
              >
                <XCircle className="size-4" />
                Reject
              </Button>

              <Button
                disabled={processing}
                onClick={() => handleDecision("accepted")}
              >
                <CheckCircle2 className="size-4" />
                Accept request
              </Button>
            </div>
          )}
        </section>

        {/* Decision banner */}
        {status !== "pending" && (
          <section
            className={`rounded-2xl border p-5 ${
              status === "accepted"
                ? "bg-success/5"
                : "bg-destructive/5"
            }`}
          >
            <div className="flex items-start gap-3">
              {status === "accepted" ? (
                <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
              ) : (
                <XCircle className="mt-0.5 size-5 shrink-0" />
              )}

              <div>
                <h2 className="font-semibold">
                  {status === "accepted"
                    ? "Request accepted"
                    : "Request rejected"}
                </h2>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {status === "accepted"
                    ? "This booking will now appear in your active services."
                    : "This request has been marked as rejected and will no longer require your response."}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Customer */}
        <section className="rounded-2xl border p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-muted text-lg font-semibold">
              AS
            </div>

            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                Household
              </p>

              <h2 className="mt-1 text-xl font-semibold">
                {request.customer}
              </h2>

              <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <UserRound className="size-4" />
                  {request.household.members}
                </span>

                <span className="flex items-center gap-1.5">
                  <Home className="size-4" />
                  {request.household.homeType}
                </span>
              </div>
            </div>

            <Button variant="outline">
              <MessageCircle className="size-4" />
              Contact household
            </Button>
          </div>
        </section>

        {/* Main details */}
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-8">
            {/* Service details */}
            <section className="rounded-2xl border p-6 sm:p-8">
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Service details
                </p>

                <h2 className="mt-1 text-xl font-bold tracking-tight">
                  What the household is requesting
                </h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <Detail
                  icon={Home}
                  label="Service"
                  value={request.service}
                />

                <Detail
                  icon={FileText}
                  label="Plan"
                  value={request.plan}
                />

                <Detail
                  icon={CalendarDays}
                  label="Start date"
                  value={request.startDate}
                />

                <Detail
                  icon={Clock3}
                  label="Preferred time"
                  value={request.time}
                />

                <Detail
                  icon={Clock3}
                  label="Duration"
                  value={request.duration}
                />

                <Detail
                  icon={CalendarDays}
                  label="Frequency"
                  value={request.frequency}
                />
              </div>
            </section>

            {/* Location */}
            <section className="rounded-2xl border p-6 sm:p-8">
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Service location
                </p>

                <h2 className="mt-1 text-xl font-bold tracking-tight">
                  Where the service will take place
                </h2>
              </div>

              <div className="flex gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted">
                  <MapPin className="size-5" />
                </div>

                <div>
                  <p className="font-medium">
                    {request.location}
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {request.address}
                  </p>
                </div>
              </div>
            </section>

            {/* Requirements */}
            <section className="rounded-2xl border p-6 sm:p-8">
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Household requirements
                </p>

                <h2 className="mt-1 text-xl font-bold tracking-tight">
                  What they need help with
                </h2>
              </div>

              <div className="rounded-xl bg-muted/40 p-5">
                <p className="text-sm leading-7">
                  {request.requirements}
                </p>
              </div>
            </section>
          </div>

          {/* Side panel */}
          <aside className="space-y-5">
            <div className="sticky top-6 rounded-2xl border p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                Your decision
              </p>

              <h2 className="mt-2 text-xl font-bold tracking-tight">
                {status === "pending"
                  ? "Does this request work for you?"
                  : status === "accepted"
                    ? "Request accepted"
                    : "Request rejected"}
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {status === "pending"
                  ? "Make sure the schedule, location and requirements fit your availability before accepting."
                  : status === "accepted"
                    ? "You can now find this arrangement in your active services."
                    : "The household request has been declined."}
              </p>

              <Separator className="my-6" />

              <div className="space-y-4">
                <DecisionRow
                  label="Service"
                  value={request.service}
                />

                <DecisionRow
                  label="Plan"
                  value={request.plan}
                />

                <DecisionRow
                  label="Start"
                  value={request.startDate}
                />

                <DecisionRow
                  label="Schedule"
                  value={request.frequency}
                />
              </div>

              {status === "pending" && (
                <>
                  <Separator className="my-6" />

                  <div className="space-y-2">
                    <Button
                      className="w-full"
                      disabled={processing}
                      onClick={() =>
                        handleDecision("accepted")
                      }
                    >
                      <CheckCircle2 className="size-4" />
                      Accept request
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full"
                      disabled={processing}
                      onClick={() =>
                        handleDecision("rejected")
                      }
                    >
                      <XCircle className="size-4" />
                      Reject request
                    </Button>
                  </div>
                </>
              )}
            </div>

            {/* Trust note */}
            <div className="rounded-2xl border bg-muted/30 p-5">
              <div className="flex gap-3">
                <ShieldCheck className="mt-0.5 size-5 shrink-0" />

                <div>
                  <p className="text-sm font-semibold">
                    Your profile is verified
                  </p>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Households see your verified profile information
                    when choosing care.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

function Detail({
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
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted">
        <Icon className="size-4" />
      </div>

      <div>
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

function DecisionRow({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-sm text-muted-foreground">
        {label}
      </span>

      <span className="text-right text-sm font-medium">
        {value}
      </span>
    </div>
  )
}