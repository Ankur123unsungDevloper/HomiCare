"use client"

import Link from "next/link"
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  IndianRupee,
  Info,
  ReceiptText,
  Wallet,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

type EarningItem = {
  id: number
  household: string
  service: string
  date: string
  duration: string
  amount: string
  status: "Completed" | "Pending"
}

const earnings: EarningItem[] = [
  {
    id: 1,
    household: "Ankur Das",
    service: "Nanny Care",
    date: "October 7, 2026",
    duration: "4 hours",
    amount: "₹1,200",
    status: "Completed",
  },
  {
    id: 2,
    household: "Rahul Mehta",
    service: "Maid Services",
    date: "October 6, 2026",
    duration: "4 hours",
    amount: "₹1,000",
    status: "Completed",
  },
  {
    id: 3,
    household: "Ankur Das",
    service: "Nanny Care",
    date: "October 5, 2026",
    duration: "4 hours",
    amount: "₹1,200",
    status: "Completed",
  },
  {
    id: 4,
    household: "Rahul Mehta",
    service: "Maid Services",
    date: "October 4, 2026",
    duration: "4 hours",
    amount: "₹1,000",
    status: "Pending",
  },
]

export default function HelperEarningsPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            YOUR WORK
          </p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            Earnings
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            View your service earnings and completed work records.
          </p>
        </div>

        <Button variant="outline">
          <Link href="/helper/dashboard/history">
            View service history
            <ArrowUpRight className="ml-2 size-4" />
          </Link>
        </Button>
      </div>

      {/* Current earnings */}
      <section className="mt-8 overflow-hidden rounded-2xl bg-foreground text-background">
        <div className="grid lg:grid-cols-[1.3fr_1fr]">
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-2 text-background/60">
              <Wallet className="size-4" />
              <span className="text-sm font-medium">
                OCTOBER 2026
              </span>
            </div>

            <p className="mt-6 text-sm text-background/60">
              Total earnings
            </p>

            <div className="mt-1 flex items-center gap-1">
              <IndianRupee className="size-6" />
              <span className="text-4xl font-semibold tracking-tight sm:text-5xl">
                18,500
              </span>
            </div>

            <p className="mt-3 max-w-md text-sm leading-6 text-background/60">
              Earnings shown here are based on your recorded HomiCare
              services for the selected period.
            </p>
          </div>

          <div className="border-t border-background/10 p-6 lg:border-l lg:border-t-0 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              <div>
                <p className="text-sm text-background/50">
                  Completed services
                </p>
                <p className="mt-1 text-2xl font-semibold">
                  18
                </p>
              </div>

              <div>
                <p className="text-sm text-background/50">
                  Pending earnings
                </p>
                <p className="mt-1 text-2xl font-semibold">
                  ₹2,000
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mt-6 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-3">
        <div className="bg-background p-5">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
              <CheckCircle2 className="size-4" />
            </div>

            <p className="text-sm text-muted-foreground">
              Completed
            </p>
          </div>

          <p className="mt-4 text-2xl font-semibold">
            ₹16,500
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Confirmed completed services
          </p>
        </div>

        <div className="bg-background p-5">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
              <Clock3 className="size-4" />
            </div>

            <p className="text-sm text-muted-foreground">
              Pending
            </p>
          </div>

          <p className="mt-4 text-2xl font-semibold">
            ₹2,000
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Awaiting completion confirmation
          </p>
        </div>

        <div className="bg-background p-5">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
              <CalendarDays className="size-4" />
            </div>

            <p className="text-sm text-muted-foreground">
              Services
            </p>
          </div>

          <p className="mt-4 text-2xl font-semibold">
            18
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Completed this month
          </p>
        </div>
      </section>

      {/* Period selector */}
      <section className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Earnings activity
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Recent service-based earnings.
          </p>
        </div>

        <div className="flex rounded-lg border bg-background p-1">
          <Button
            variant="secondary"
            size="sm"
            className="h-8"
          >
            This month
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="h-8"
          >
            Last month
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="h-8"
          >
            All time
          </Button>
        </div>
      </section>

      {/* Earnings list */}
      <section className="mt-4 overflow-hidden rounded-2xl border bg-background">
        {earnings.map((item, index) => (
          <div key={item.id}>
            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex min-w-0 gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                  <ReceiptText className="size-4" />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-medium">
                      {item.service}
                    </h3>

                    <Badge
                      variant="outline"
                      className={
                        item.status === "Completed"
                          ? "border-success/20 bg-success/10 text-success"
                          : "border-warning/20 bg-warning/10 text-warning"
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.household}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span>{item.date}</span>
                    <span>{item.duration}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <span className="text-lg font-semibold">
                  {item.amount}
                </span>

                {item.status === "Completed" ? (
                  <ArrowUpRight className="size-4 text-success" />
                ) : (
                  <Clock3 className="size-4 text-warning" />
                )}
              </div>
            </div>

            {index < earnings.length - 1 && <Separator />}
          </div>
        ))}
      </section>

      {/* Earnings breakdown */}
      <section className="mt-10 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border bg-background p-6">
          <p className="text-sm font-medium">
            Earnings by service
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Nanny Care
                </span>
                <span className="font-medium">
                  ₹10,500
                </span>
              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[64%] rounded-full bg-foreground" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Maid Services
                </span>
                <span className="font-medium">
                  ₹6,000
                </span>
              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[36%] rounded-full bg-foreground" />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-background p-6">
          <p className="text-sm font-medium">
            Earnings summary
          </p>

          <div className="mt-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Service earnings
              </span>

              <span className="font-medium">
                ₹18,500
              </span>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Completed
              </span>

              <span className="font-medium text-success">
                ₹16,500
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Pending
              </span>

              <span className="font-medium text-warning">
                ₹2,000
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Phase 1 notice */}
      <section className="mt-10 rounded-2xl border bg-muted/40 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 size-5 shrink-0 text-muted-foreground" />

          <div>
            <h3 className="font-semibold">
              Earnings are view-only for now
            </h3>

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Your current HomiCare account lets you review service
              earnings and payment status. Payout management, bank
              details, and withdrawals will be added in a later phase.
            </p>
          </div>
        </div>
      </section>

      {/* Trust note */}
      <div className="mt-6 flex items-start gap-3 rounded-xl border bg-background p-4">
        <IndianRupee className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

        <p className="text-xs leading-5 text-muted-foreground">
          Earnings shown in this dashboard are demonstration data for
          the current UI implementation and will be connected to actual
          service records later.
        </p>
      </div>
    </main>
  )
}